
const CamSDK = require('camunda-bpm-sdk-js');
const camClient = new CamSDK.Client({
    mock: false,
    // the following URL does not need authentication,
    // but the tradeof is that some requests will fail
    // e.g.: some filters use the reference to the user performing the request
    apiUri: 'http://localhost:8080/engine-rest'
  });
const AbstractClientResource = require('camunda-bpm-sdk-js/lib/api-client/abstract-client-resource');
const APIURL = 'http://localhost:8080/engine-rest/task/';
const axios = require('axios');
var Table = require('cli-table');
var inquirer = require('inquirer');

module.exports = () => {


}

    function  displayAllTasks() {
        // console.log(this);
        var taskList;
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
          
        axios.get(APIURL).then((results)=>{
             taskList = results.data.map(element => {
                var task = {}
                 
               var pid = element.processDefinitionId ? element.processDefinitionId : '';
               task.processName = pid ? pid.split(':')[0] : '';
               task.name = element.name;
               task.delegationState = element.delegationState;
               task.id = element.id; 
	       task.assignee = element.assignee;
		return task;
             });

             taskList.forEach(element => {
                table.push([
                    element.id || '',
                    element.processName || '',
                    element.name || '',
		    element.delegationState || 'not started',
		    element.assignee || ""
                  ]);
                }); 
           
            

             console.log(table.toString()) 
        
            // console.log(taskList)
        }).catch((error)=>{
            console.log(error);
                })


                return taskList;
        }
    
    function updateTask(params){
        // console.log("params", params)
    if(params.id){
        axios.put(APIURL+ params.id, params.data).then((result)=>{
            if(result.status === 204)
            {    displayAllTasks();
                console.log("Task successfully updated!");
           
        }
        }).catch((error)=>{console.log(error)})
    }
    
    else{
    return null;
    }
    }

    function completeTask(params){
        variables =  params.data.variables ? params.data.variables: {}
        if(params.id){
            axios.post(APIURL+ params.id + "/complete", variables).then((result)=>{
                if(result.status === 204)
                {    displayAllTasks();
                    console.log("Task successfully updated!");
               
            }
            }).catch((error)=>{console.log(error)})
        }
        
        else{
        return null;
        }
    }
    
  function  displayTask (params) {
    // console.log(params)
    }

   async function getTask(taskId){
       return await axios.get(APIURL+ taskId)
    }

    async function createTaskList (){
        var taskList;
          return await axios.get(APIURL)
            
    }
    
module.exports.displayAllTasks = displayAllTasks;
module.exports.displayTask = displayTask;
module.exports.updateTask = updateTask;
module.exports.getTask = getTask;
module.exports.completeTask = completeTask;
