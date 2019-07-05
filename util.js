/*************\
 * Utilities *
\*************/
var Table = require('cli-table');
var fs = require('fs');
var path = require('path');
module.exports = {

     notEmpty(input) {
        return !!input;
      },
      
       byId(objs, id) {
        var keys = Object.keys(objs);
        for (var k in keys) {
          if (objs[keys[k]].id === id) {
            return objs[keys[k]];
          }
        }
      },
      
       toArray(obj) {
        var arr = [];
        Object.keys(obj).forEach(function (key) {
          arr.push(obj[key]);
        });
        return arr;
      },
      
       thr(err) {
        if (err) {
            console.log(err)
          throw err;
        }
      },
      
      // returns an array of functions reading the content of files.
      // To be used in CamSDK.utils.series()
       readFiles(dirPath, filenames) {
        return filenames.map(function (filename) {
          return function (cb) {
            fs.readFile(path.join(dirPath, filename), function (err, content) {
              if (err) { return cb(err); }
      
              cb(null, {
                name:    filename,
                content: content.toString()
              });
            });
          };
        });
      }
      
}



