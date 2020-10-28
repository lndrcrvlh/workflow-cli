module.exports = (args) => {
    const ora = require('ora')
    const spinner = ora().start()
    var CamSDK = require('camunda-bpm-sdk-js');
    var inquirer = require('inquirer');
    var Table = require('cli-table');
    var fs = require('fs');
    var path = require('path');

    var camClient = new CamSDK.Client({
      mock: false,
      // the following URL does not need authentication,
      // but the tradeof is that some requests will fail
      // e.g.: some filters use the reference to the user performing the request
      apiUri: 'http://localhost:8080/engine-rest'
    });
    
    var util = require('../util')
    
    var processDefinitionService  = new camClient.resource('process-definition');
    var processInstanceService    = new camClient.resource('process-instance');
    var filterService             = new camClient.resource('filter');

    
    const all = args.all || args.a
    try {
    if(all){
      startAllProcesses();
    }
    else {
      startProcess();
    }
    

    spinner.stop()

 
  } catch (err) {
    spinner.stop()

    console.error(err)
  }


    function startProcess() {
        // get the list of available process definitions
        processDefinitionService.list({}, function (err, results) {
          util.thr(err);
      
          // make the results suitable for inquirer choices
          var definitions = results.items.map(function (definition) {
            return {
              value: definition.id,
              name: definition.name || definition.key || definition.id
            };
          });
      
          // ask which process should be started
          inquirer.prompt([
            {
              type: 'list',
              name: 'processDefinitionId',
              message: 'Which process should be started?',
              choices: definitions
            }
          ], function (answers) {
            // start the choosed process definition
           
            pID = answers.processDefinitionId.split(':')[2]
            console.log(pID)
            processDefinitionService.start({
              id:  answers.processDefinitionId
            }, function (err) {
              util.thr(err);
      
              console.log('Process started');
            });
          });
        });
      }
      
      function startAllProcesses() {
          // get the list of available process definitions
          processDefinitionService.list({}, function (err, results) {
            util.thr(err);
        
            // make the results suitable for inquirer choices
            var definitions = results.items.map(function (definition) {
              return {
                value: definition.id,
                name: definition.name || definition.key || definition.id
              };
            });
        
            definitions.forEach((process) => {
              processDefinitionService.submit({
                  id: process.processDefinitionId
                }, function (err) {
                  util.thr(err);
          
                  home(`Process ${process} started`);
               })
            });
            // ask which process should be started
          //   inquirer.prompt([
          //     {
          //       type: 'list',
          //       name: 'processDefinitionId',
          //       message: 'Which process should be started?',
          //       choices: definitions
          //     }
          //   ], function (answers) {
          //     // start the choosed process definition
          //     processDefinitionService.submit({
          //       id: answers.processDefinitionId
          //     }, function (err) {
          //       util.thr(err);
        
          //       home('Process started');
          //     });
          //   });
          });
        }
}