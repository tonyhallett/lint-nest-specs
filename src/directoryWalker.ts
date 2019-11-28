import * as fs from 'fs';
import * as path from 'path';
export type Filter = (f:string) => boolean;
const includeAllFilter = (f:string) => true;
export const walk = function(dir:string, done:any, fileFilter:Filter = includeAllFilter, folderFilter:Filter = includeAllFilter) {
  var results:string[] = [];
  fs.readdir(dir, function(err, list) {
    if (err) return done(err);
    var i = 0;
    (function next() {
      var file = list[i++];
      if (!file) return done(null, results);
      file = path.resolve(dir, file);
      fs.stat(file, function(err, stat) {
        if (stat && stat.isDirectory()) {
          if(folderFilter(file)){
            walk(file, function(err:any, res:string) {
              results = results.concat(res);
              next();
            }, fileFilter, folderFilter);
          }else{
            next();
          }
          
        } else {
          if(fileFilter(file)){
            results.push(file);
          }
          next();
        }
      });
    })();
  });
};