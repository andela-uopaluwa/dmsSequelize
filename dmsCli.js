var repl = require("repl");
var documentManager = require('./documentManager');
var dms = repl.start({
  prompt: 'dmsCli> '
});

dms.context.documentManager = documentManager;