const minimist = require('minimist')

module.exports = () => {
  const args = minimist(process.argv.slice(2))

  let cmd = args._[0] || 'help'

  if (args.version || args.v) {
    cmd = 'version'
  }

  if (args.help || args.h) {
    cmd = 'help'
  }

  switch (cmd) {
    case 'menu':
      require('./cmds/menu')(args)
      break
    case 'deploy':
        require('./cmds/deploy')(args)
        break
    case 'show':
        require('./cmds/show')(args)
        break
    case 'version':
        require('./cmds/version')(args)
        break
    case 'start':
        require('./cmds/start')(args)
        break
    case 'delete':
        require('./cmds/delete')(args)
        break        
    case 'help':
      require('./cmds/help')(args)
      break
    case 'update':
      require('./cmds/update')(args)
      break;
    default:
      console.error(`"${cmd}" is not a valid command!`)
      break
  }
}