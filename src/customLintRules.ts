import * as path from 'path';
export interface CustomLintRule{
  configPath:string,
  isCatchRule: boolean
}
export const customLintRules:[CustomLintRule,CustomLintRule] = [
  {
    configPath:path.join(__dirname,'tslintjson','no-expect-in-catch.tslint.json'),
    isCatchRule:true
  },
  {
    configPath:path.join(__dirname,'tslintjson','chai-terminated.tslint.json'),
    isCatchRule:false
  }
]
