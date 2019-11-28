import { Linter } from 'tslint';
import { loadConfigurationFromPath } from 'tslint/lib/configuration';
import { logWithSpace } from './logHelper';
import * as fs from 'fs';

function getLinter(){
  return new Linter({formatter:'stylish', fix:false});
}

export function lintTestFiles(testFiles:string[],configFilePath:string){
  let totalNumErrorsOrWarnings=0;
  let config = loadConfigurationFromPath(configFilePath);

  testFiles.forEach(f=>{
    const linter = getLinter();
    linter.lint(f, fs.readFileSync(f).toString(),config);
    const lintResult = linter.getResult();
    const numErrorsOrWarnings = lintResult.errorCount + lintResult.warningCount;
    if(numErrorsOrWarnings>0){
      totalNumErrorsOrWarnings += numErrorsOrWarnings;
      logWithSpace(lintResult.output);
    }
  });
  return totalNumErrorsOrWarnings;
}