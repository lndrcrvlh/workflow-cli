    const axios = require('axios')
    const APIURL = 'http://localhost:8080/engine-rest/process-definition/';
    module.exports = () => {


    }

     function listProcessInstances () {
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
                38,
                38,
                10,
                40
              ]
            });
      
            instances.forEach(function (instance) {
              var definition = definitions[instance.definitionId];
              table.push([
                instance.id,
                definition.name || '',
                definition.version || '',
                definition.description || ''
              ]);
            });
      
            console.log(table.toString());
          });
        });
      }

     async function deleteProcessInstance(pID){
         console.log("PID",pID)
       return axios.delete(APIURL+pID+"?cascade=true")
      }

module.exports.deleteProcessInstance = deleteProcessInstance;

