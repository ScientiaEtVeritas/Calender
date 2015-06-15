var express = require('express');
var app = express();
var config = {};
var mongoose = require('mongoose');

config.port = process.argv[2] || 63242;

config.db = {
    user: process.env["db_user"] || "",
    password: process.env["db_pw"] || "",
    host: process.env["db_host"] || "localhost",
    port: process.env["db_port"] || "27017",
    path: process.env["db_name"] || "calender"
};

config.db.url = 'mongodb://' + config.db.user + ':' + config.db.password + '@' + config.db.host + ':' + config.db.port + "/" + config.db.path;

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

    mongoose.connect(config.db.url, {auth:{authdb:'admin'}}, function(err) {
        if(err) {
            console.log("\n************************************");
            console.log("DATABASE ERROR");
            console.log("Tried to connect with: " + config.db.url);
            console.log("************************************");
            throw err;
        }
        console.log("\n************************************");
        console.log("You successfully connected to Database");
        console.log(config.db.url);
        console.log("************************************");
    });

});

var io = require('socket.io')(server);

io.on('connection', function(socket){
    socket.on('login', function(data) {
        socket.facebook = data;
       socket.facebook && console.log("***User " + socket.facebook.id + " named " + socket.facebook.name + " is connected***");
    });

    socket.on('disconnect', function(){
        socket.facebook && console.log("***User " + socket.facebook.id + " named " + socket.facebook.name + " is disconnected***");
    });
});