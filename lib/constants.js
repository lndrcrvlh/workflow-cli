module.exports = {

     CamSDK : require('camunda-bpm-sdk-js'),
     inquirer : require('inquirer'),
     Table : require('cli-table'),
     fs : require('fs'),
     path : require('path'),
     deployDir :  __dirname + '/../bpmn',
    //  camClient : new this.CamSDK.Client({
    //   mock: false,
    //   // the following URL does not need authentication,
    //   // but the tradeof is that some requests will fail
    //   // e.g.: some filters use the reference to the user performing the request
    //   apiUri: 'http://localhost:8080/engine-rest'
    // }),
    
    //  util : require('../util'),
    
    //  processDefinitionService  : new camClient.resource('process-definition'),
    //  processInstanceService    : new camClient.resource('process-instance'),
    //  filterService             : new camClient.resource('filter'),
    //  deploymentService         : new camClient.resource('deployment'),
    //  taskService               : new camClient.resource('task'),
    
     /*************\
    //   * 
     * "Routing" *
    \*************/
    //  home: (splash) => {
    //   // clear the terminal
    //   console.log('\u001B[2J\u001B[0;0f');
    
    //   if (splash) {
    //     console.log(splash);
    //   }
    
    //   inquirer.prompt([
    //     {
    //       type: 'list',
    //       name: 'action',
    //       message: 'What do you want to perform?',
    //       choices: [
    //         {
    //           value: 'deploy',
    //           name: 'Deploy process'
    //         },
    //         {
    //           value: 'start-process',
    //           name: 'Start a process'
    //         },
    //         {
    //             value: 'start-all-processes',
    //             name: 'Start all processes'
    //           },
    //         {
    //           value: 'list-process-instance',
    //           name: 'List process instances'
    //         },
    //         new inquirer.Separator(),
    //         {
    //           value: 'list-tasks-by-filter',
    //           name: 'List tasks by filter'
    //         },
    //         new inquirer.Separator(),
    //         {
    //           value: 'leave',
    //           name: 'Leave the interface'
    //         }
    //       ]
    //     },
    
    
    
    //     {
    //       when: function (answers) {
    //         return answers.action === 'deploy';
    //       },
    //       type: 'input',
    //       name: 'deploymentName',
    //       message: 'How should the deployment be named?',
    //       validate: util.notEmpty
    //     },
    //     {
    //       when: function (answers) {
    //         return answers.action === 'deploy';
    //       },
    //       type: 'confirm',
    //       name: 'enableDuplicateFiltering',
    //       message: 'Should the duplicates be filtered?',
    //       default: false
    //     },
    //     {
    //       when: function (answers) {
    //         return answers.action === 'deploy';
    //       },
    //       type: 'confirm',
    //       name: 'deployChangedOnly',
    //       message: 'Should only the changed processes be deployed?',
    //       default: false
    //     },
    //     {
    //       when: function (answers) {
    //         return answers.action === 'deploy';
    //       },
    //       type: 'input',
    //       name: 'dirPath',
    //       message: 'In which directory are the files to be deployed?',
    //       default: deployDir
    //     }
    //   ], function(answers) {
    //     switch (answers.action) {
    //       case 'deploy':
    //         deployProcesses(answers);
    //         break;
    
    //       case 'start-process':
    //         startProcess();
    //         break;
        
    //     case 'start-process':
    //         startAllProcesses();
    //         break;
            
    
    //       case 'list-process-instance':
    //         listProcessInstances();
    //         break;
    
    //       case 'list-tasks-by-filter':
    //         listTasksByFilter();
    //         break;
    
    //       case 'leave':
    //         console.log('\u001B[2J\u001B[0;0f');
    //         return;
    
    //       default:
    //         home('that... should not happen');
    //     }
    //   });
    // }
    
  
  
  
}