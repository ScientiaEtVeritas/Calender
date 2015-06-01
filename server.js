var express = require('express');
var app = express();
var config = {};
config.port = process.argv[2] || 63242;

app.use(express.static('public'));

var server = app.listen(config.port, function () {

    console.log("\n**Server started**");
    console.log("\n************************************");
    console.log("File located in: " + process.argv[1]);
    console.log("Port: " + config.port);
    console.log("************************************");

    console.log(' ___       _              _\n'+
    '|  _> ___ | | ___ ._ _  _| | ___  _ _\n'+
    '| <__<_> || |/ ._>| \' |/ . |/ ._>| \'_>\n'+
    '`___/<___||_|\___. |_|_| \___| \___.|_|\n');

    console.log("************************************");
    console.log("************************************");

});
