import { logWithSpace } from './logHelper';
import { getAllTests } from './getTests';
import { lintTestFiles } from './linter';
import { customLintRules } from './customLintRules';


export async function lintTerminatedAndCatch(nestPath:string){
  const allTests = await getAllTests(nestPath);

  allTests.forEach(tests => {
    logWithSpace(`${tests.tests.length} ${tests.isIntegration?'integration':'unit'} tests`);
    customLintRules.forEach(lr => {
      logWithSpace(`applying ${lr.isCatchRule?'catch':'unterminated'} rule`);
      const numTotalErrorsOrWarnings = lintTestFiles(tests.tests,lr.configPath);
      logWithSpace('total errors or warnings: ' + numTotalErrorsOrWarnings);
    })
  })
}
function getNestPath(){
  const args = process.argv;
  if(args.length===3){
    return args[2];
  }
  if(process.env.NestPath){
    return process.env.NestPath;
  }
  throw new Error('Nest path required via command line argument or env variable NestPath');
}
(async () => {
  try {
      await lintTerminatedAndCatch(getNestPath());
  } catch (e) {
    console.log("Linting nest failed");
    console.log(e.message);
  }
})();