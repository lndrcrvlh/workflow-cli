const  {displayAllTasks, displayTask, updateTask, getTask} = require('../lib/taskManager')
const {deleteProcessInstance} = require('../lib/processManager')
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
        var id = args.id || args.i
        console.log(id)
            if(id)
            deleteProcess(id);
        }
        catch(err){
            console.log(err)
        }

    function deleteProcess (id){
        deleteProcessInstance(id).then((result) => {
            console.log(result.status)
        }).catch((error) => {
            console.log(error)
        })

    }
}

