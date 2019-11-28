import { walk, Filter } from "./directoryWalker";
import * as path from 'path';

export interface Tests{
  tests:string[],
  isIntegration:boolean
}
function getTests(folder:string, folderFilter?:Filter){
  return new Promise<string[]>((resolve,reject)=>{
    walk(folder,(e:any,tests:string[])=>{
      if(e){
        reject(e);
      }else{
        resolve(tests);
      }
    },f=>f.endsWith('.spec.ts'),folderFilter)
  });
}
export function getIntegrationTests(nestPath:string){
  return getTests(path.join(nestPath,'integration'),(f:string) => {
    return !f.includes('node_modules');
  });
}
export function getPackagesTests(nestPath:string){
  return getTests(path.join(nestPath,'packages'));
}
export async function getAllTests(nestPath:string){
  const allTests: [Tests,Tests] = [
    {
      tests:await getIntegrationTests(nestPath),
      isIntegration:true
    },
    {
      tests: await getPackagesTests(nestPath),
      isIntegration: false
    }
  ];
  return allTests;
}
//#endregion