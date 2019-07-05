const  {displayAllTasks, displayTask, updateTask, getTask, completeTask} = require('../lib/taskManager')

module.exports = (args) => {
    const ora = require('ora');
    const spinner = ora().start();
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
      const APIURL = 'http://localhost:8080/engine-rest/task/'
      var util = require('../util')
     
      var filterService             = new camClient.resource('filter');
      var taskService               = new camClient.resource('task');
      const lib = require('../lib/constants')
      const axios = require('axios');
    try {
        var params = {}
        // console.log(args)
        if(args.id || args.i)
        update().then(()=>{
            spinner.stop()
        }).catch((error) =>{
            console.log(error)
        })
        
   

    }
    catch(err){
        console.log(err)

    }

   async function checkFields(args){
       var task = {}
       var params = {}
       var data = {}
       var delegationState = args.state || args.s;
       var description = args.description || args.d;
       var name = args.name || args.n;

    task = await getTask(args.id).then((result) =>{
        // console.log(result.data)
        return result.data

      
    }).catch((error) => {
        console.log(error)
    })
    //    console.log("task",task)
  

 
    if(delegationState)
    data.delegationState = delegationState;
    else //#endregion
    data.delegationState = task.delegationState
    if(description)
    data.description = description;
    else 
    data.description = task.description
    if(name)
    data.name = name
    else 
    data.name = task.name


    params.id = args.id; 
    params.data = data;
    // console.log("params",params)
    return params
   }

    async function update ()  {
        params = checkFields(args).then((result) => {
            if(result.data.delegationState === "RESOLVED")
            {
                console.log("calling RESOLVE")
                completeTask(result)
            }
           
            else
            updateTask(result)
           }
           );
    } 
}