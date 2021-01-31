const faker = require('faker');
const fs = require('fs');
const fastcsv = require("fast-csv");
const db = require('./db');
const contains = require('validator/lib/contains');
const args = require('minimist')(process.argv.slice(2))

// The path to write the csv file to
const output = './src/output.csv';

// Create a stream to write to the csv file
const stream = fs.createWriteStream(output)

// Create some fake data using the faker lib. Returns a template string to be inserted into a csv file as a single line
function createTranslation() {
  const key = faker.address.country();
  const lang = faker.address.countryCode();
  const content = faker.random.word();

  return `${key},${lang},${content}\n`;
}

async function writeToCsvFile() {
    // The user can specify how many rows they want to create (yarn seed --rows=20), if they dont specify anything then defaults to 10
    let rows = args['rows'] || 10;
    // Iterate x number of times and write a new line to the csv file using the createTranslation function
    for (let index = 0; index < rows; index++) {
      stream.write(createTranslation(), 'utf-8')
    }
    stream.end();
}

function insertFromCsv() {
  let csvData = [];
  return fastcsv
    .parse()
    // validate that the column key doesn't contain any commas, as some countries do. This will break our insertion as it would be treated as an extra column and our table expects only 3 columns
    .validate((data) => !contains(',', data[0]))
    // triggered when a new record is parsed, we then add it to the data array
    .on("data", (data) => {
      csvData.push(data);
    })
    // once parsing is finished and all the data is added to the array we can then insert it into the db table
    .on("end", () => {
      // The insert statement
      const query = "INSERT INTO translations (key, lang, content) VALUES ($1, $2, $3)";
      // Connect to the db instance
      db.connect((err, client, done) => {
        if (err) throw err;
        try {
          // loop over the lines stored in the csv file
          csvData.forEach(row => {
            // For each line we run the insert query with the row providing the column values
            client.query(query, row, (err, res) => {
              if (err) {
                // We can just console.log any errors
                console.log(err.stack);
              } else {
                console.log("inserted " + res.rowCount + " row:", row);
              }
            });
          });
        } finally {
          done();
        }
      });
    });
}

async function seed() {
  await writeToCsvFile()
  let stream = fs.createReadStream(output);
  stream.pipe(insertFromCsv());
}

seed()