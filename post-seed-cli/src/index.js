const {Command, flags} = require('@oclif/command')

class PostSeedCliCommand extends Command {
  async run() {
    const {flags} = this.parse(PostSeedCliCommand)
    const name = flags.name || 'world'
    this.log(`hello ${name} from .\\src\\index.js`)
  }
}

PostSeedCliCommand.description = `Describe the command here
...
Extra documentation goes here
`

PostSeedCliCommand.flags = {
  // add --version flag to show CLI version
  version: flags.version({char: 'v'}),
  // add --help flag to show CLI version
  help: flags.help({char: 'h'}),
  name: flags.string({char: 'n', description: 'name to print'}),
}

module.exports = PostSeedCliCommand
