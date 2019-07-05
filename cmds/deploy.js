
module.exports = (args) => {
    var CamSDK = require('camunda-bpm-sdk-js');
    var inquirer = require('inquirer');
    var deployDir =  __dirname + '/../bpmn';
    var camClient = new CamSDK.Client({
      mock: false,
      // the following URL does not need authentication,
      // but the tradeof is that some requests will fail
      // e.g.: some filters use the reference to the user performing the request
      apiUri: 'http://localhost:8080/engine-rest'
    });
    
    var util = require('../util')
    var deploymentService         = new camClient.resource('deployment');;
    const lib = require('../lib/constants')
    try{
           // clear the terminal
      console.log('\u001B[2J\u001B[0;0f');
      inquirer.prompt([
        {
          type: 'list',
          name: 'action',
          message: 'What do you want to perform?',
          choices: [
            {
              value: 'deploy',
              name: 'Deploy process'
            },
            new inquirer.Separator(),
            {
              value: 'leave',
              name: 'Leave the interface'
            }
          ]
        },
    
    
    
        {
          when: function (answers) {
            return answers.action === 'deploy';
          },
          type: 'input',
          name: 'deploymentName',
          message: 'How should the deployment be named?',
          validate: util.notEmpty
        },
        {
          when: function (answers) {
            return answers.action === 'deploy';
          },
          type: 'confirm',
          name: 'enableDuplicateFiltering',
          message: 'Should the duplicates be filtered?',
          default: false
        },
        {
          when: function (answers) {
            return answers.action === 'deploy';
          },
          type: 'confirm',
          name: 'deployChangedOnly',
          message: 'Should only the changed processes be deployed?',
          default: false
        },
        {
          when: function (answers) {
            return answers.action === 'deploy';
          },
          type: 'input',
          name: 'dirPath',
          message: 'In which directory are the files to be deployed?',
          default: deployDir
        }
      ], function(answers) {
        switch (answers.action) {
          case 'deploy':
            deployProcesses(answers);
            break;

          case 'leave':
            console.log('\u001B[2J\u001B[0;0f');
            return;
    
          default:
            home('that... should not happen');
        }
      });
        


        }

    catch(err){
        console.log(err)
    }

    function deployProcesses(options) {
        // get the files of the choosed direcory
        lib.fs.readdir(options.dirPath, function (err, dirFiles) {
          util.thr(err);
      
          // store the path to be used as default value next time it's used
        //   deployDir = options.dirPath;
      
          inquirer.prompt([
            {
              type: 'checkbox',
              name: 'files',
              message: 'Which files do you want to deploy? (Space to confirm selection)',
              choices: dirFiles,
              validate: function (input) {
                return !!input.length;
              }
            }
          ], function (answers) {
            // collect the content of the choosed files to be then uploaded
            CamSDK.utils.series(util.readFiles(options.dirPath, answers.files), function (err, files) {
              util.thr(err);
      
              console.info(Object.keys(files).length + ' files will be deployed');
      
              // create a deployment with...
              deploymentService.create({
                // ... the settings
                deploymentName:           options.deploymentName,
                enableDuplicateFiltering: options.enableDuplicateFiltering,
                deployChangedOnly:        options.deployChangedOnly,
                // ... and the files
                files:                    util.toArray(files)
              }, function (err, deployment) {
                util.thr(err);
      
               console.log('deployment "' + deployment.name + '" succeeded, ' + deployment.deploymentTime);
              });
            });
          });
        });
      }
} 