var repl = require("repl");
var docMgr = require('./documentManager');
var dms = repl.start({
  prompt: 'dmsCli>'
});
//set repl context to file where methods are located
dms.context.docMgr = docMgr;
