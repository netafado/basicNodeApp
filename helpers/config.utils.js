const fs  = require('fs');

exports.logFile = (msg, path)=>{
    fs.appendFileSync(path,  `Error msg: ${msg}` );
}