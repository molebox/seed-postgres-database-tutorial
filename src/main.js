const faker = require('faker');
const fs = require('fs');
const fastcsv = require("fast-csv");
const db = require('./db');

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

    // Iterate x number of times and write a new line to the csv file using the createTranslation function
    for (let index = 0; index < 10; index++) {
      stream.write(createTranslation(), 'utf-8')
    }
    stream.end();
}

async function example() {

  await writeToCsvFile()

  let stream = fs.createReadStream(output);
  let csvData = [];
  let csvStream = fastcsv
    .parse()
    // triggered when a new record is parsed, we then add it to the data array
    .on("data", function(data) {
      csvData.push(data);
    })
    // once parsing is finished and all the data is added to the array we can then insert it into the db table
    .on("end", function() {

      // The insert statement
      const query = "INSERT INTO translations (key, lang, content) VALUES ($1, $2, $3)";

      db.connect((err, client, done) => {
        if (err) throw err;
        try {
          csvData.forEach(row => {
            client.query(query, row, (err, res) => {
              if (err) {
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

stream.pipe(csvStream);
}

example()