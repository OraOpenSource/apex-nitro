var path = require('path');
var execSync = require('child_process').execSync;

var childProcess = execSync(
    'sql apex_test/apex_test@einstein.insum.intranet:1523/dev1250 @' +
    path.resolve(__dirname, '../sqlcl/script') + // script to execute
    ' ' +
    path.resolve(__dirname, '../sqlcl/distUpload.js') + // param &1
    ' ' +
    'material-apex' // param &2

    , { encoding: 'utf8' }
);

console.log(childProcess);
