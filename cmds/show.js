const  {displayAllTasks, displayTask} = require('../lib/taskManager');

module.exports = (args) => {
    const ora = require('ora')
    const spinner = ora().start()
    var CamSDK = require('camunda-bpm-sdk-js');
    var Table = require('cli-table');
    var inquirer = require('inquirer');
    // var fs = require('fs');
    // var path = require('path');
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
      var taskService               = new camClient.resource('task');
      const lib = require('../lib/constants')
    try {
        const task = args.task || args.t
        const process = args.process || args.p
        if(process){
            listProcessInstances();
        }
        else if (task){
            // getAllTask()
            displayAllTasks()
            // listTasksByFilter()
        }
        
    
        spinner.stop()
    
     
      } catch (err) {
        spinner.stop()
    
        console.error(err)
      }

      function getAllTask  ()  {
        

        async function getGithubData() {
          let res = await axios.get('https://api.github.com/users/KrunalLathiya');
          console.log(res.data.login);
        }
        
        getGithubData();
        taskService.list();
      } 

    function listProcessInstances() {
        // get the list of process instances
        processInstanceService.list({}, function (err, instances) {
          util.thr(err);
      
          // collect the relevant process definitions in a array (suitable for CamSDK.utils.series())
          var processDefinitionRequests = {};
          instances.forEach(function (instance) {
            if (!processDefinitionRequests[instance.definitionId]) {
              processDefinitionRequests[instance.definitionId] = function (cb) {
                processDefinitionService.get(instance.definitionId, cb);
              };
            }
          });
      
          // perform the requests for the process definitions
          CamSDK.utils.series(processDefinitionRequests, function (err, definitions) {
            util.thr(err);
      
            var table = new Table({
              head: [
                'Instance ID',
                'Process name',
                'Version',
                'Description'
              ],
              colWidths: [
                60,
                38,
                10,
                40
              ]
            });
      
            instances.forEach(function (instance) {
                // console.log(definitions[instance.definitionId].id)
                // console.log(instance.id)
              var definition = definitions[instance.definitionId];
              var id = definitions[instance.definitionId].id
              table.push([
               id,
                definition.name || '',
                definition.version || '',
                definition.description || ''
              ]);
            });
      
            console.log(table.toString());
          });
        });
      }
      
      

     
      
      function listTasksByFilter() {
        // list the tasks filters
        filterService.list({
          resourceType: 'Task'
        }, function (err, filterResults) {
          util.thr(err);
            console.log("filter res: ",filterResults)
          // format the results to suite the inquirer choices
          var filters = filterResults.map(function (filter) {
            return {
              value: filter.id,
              name: filter.name
            };
          });
      
          // ask for which filter the tasks should be listed
          inquirer.prompt([
            {
              type: 'list',
              name: 'filterId',
              message: 'For which filter do you want the tasks?',
              choices: filters
            }
          ], function (answers) {
            var selectedFilter = util.byId(filterResults, answers.filterId);
      
            // get the filtered results
            // filterService.getTasks(selectedFilter.id, function (err, taskResults) {
                filterService.getTasks(selectedFilter.id, function (err, taskResults) {
                console.log("creating filter id: "+ selectedFilter.id);
              util.thr(err);
      
              console.log("task results", taskResults)
              var count = (taskResults._embedded && taskResults._embedded.task) ? taskResults._embedded.task.length : 0;
      
              if (!count) {
                return console.log('No task for filter  "' + selectedFilter.name + '"');
              }
      
              var table = new Table({
                head: [
                  'Task ID',
                  'Process name',
                  'Task name', 
                  'Status',
		  'Assignee'
                ],
                colWidths: [
                  38,
                  38,
                  38,
		  24,
                  24
                ]
              });
      
              taskResults._embedded.task.forEach(function (task) {
                //   console.log(task);
                table.push([
                  task.id || '',
                  task._embedded.processDefinition && task._embedded.processDefinition[0].name || '',
                  task.name || '', 
		  task.assignee || '',
		  task.delegationState || 'not started'
                ]);
              });
      
              console.log(table.toString());
            });
          });
        });
      }
  }
