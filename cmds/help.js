const menus = {
    main: `
      workflow [command] <options>
  
      show ............... show processes 
      version ............ show package version
      help ............... show help menu for a command
      deploy ............. deploy a process definition
      menu ............... show interface menu
      start .............. start a proccess instance
      version ............ show package version
      help ............... show help menu for a command
      update ............. update a task
      delete ............. delete a process instance`
      
      ,
  
    show: `
      workflow show <options>
  
      -t, -task, ...... show tasks
      -p, -process ... show processes 
      `,
    start: `
      workflow start <options>
      
      -all, -a ....start all processes`,

    delete: `
    workflow delete <options>
    --id .......... the id of the process instance
    --name, n ..... the name of the process instance
    --all, -a ..... delete all process instances`,

    deploy: `
    workflow deploy 
    `,
    update: `
    workflow update <options>
    --id, -i .............. the id of the task to update
    --state, -s............ change the state of the task to this value
    --name, -n ............ The name of the task
    --description, -d ..... the description of the task    
    `
  }
  
  module.exports = (args) => {
    const subCmd = args._[0] === 'help'
      ? args._[1]
      : args._[0]
  
    console.log(menus[subCmd] || menus.main)
  }