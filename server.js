var express = require('express');
var app = express();
var config = {};
var mongoose = require('mongoose');
var fs = require('fs');

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

fs.readdirSync(__dirname + '/models').forEach(function(filename) {
        if (~filename.indexOf('.js')) require(__dirname + '/models/' + filename)
});
var User = mongoose.model('User');

var io = require('socket.io')(server);

io.on('connection', function(socket){
    socket.on('login', function(data) {
        socket.facebook = data;
        socket.emit("data", "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+
"<?xml-stylesheet type=\"text/xsl\" href=\"CalTest.xsl\"?>"+
"<calendar>"+
	"<event>"+
		"<title>Mein Ereignis</title>"+
		"<place>Karlsruhe</place>"+
		"<startd>20</startd>"+
		"<startm>11</startm>"+
		"<starty>2015</starty>"+
		"<endd>20</endd>"+
		"<endm>11</endm>"+
		"<endy>2015</endy>"+
		"<startts>10</startts>"+
		"<starttm>00</starttm>"+
		"<starttse>00</starttse>"+
		"<endts>11</endts>"+
		"<endtm>00</endtm>"+
		"<endtse>00</endtse>"+
	"</event>"+
	"<event>"+
		"<title>Mein Ereignis</title>"+
		"<place>Karlsruhe</place>"+
		"<startd>20</startd>"+
		"<startm>06</startm>"+
		"<starty>2015</starty>"+
		"<endd>22</endd>"+
		"<endm>06</endm>"+
		"<endy>2015</endy>"+
		"<startts>10</startts>"+
		"<starttm>00</starttm>"+
		"<starttse>00</starttse>"+
		"<endts>11</endts>"+
		"<endtm>00</endtm>"+
		"<endtse>00</endtse>"+
	"</event>"+
	"<event>"+
		"<title>Mein Ereignis 2</title>"+
		"<place>Karlsruhe</place>"+
		"<startd>22</startd>"+
		"<startm>06</startm>"+
		"<starty>2015</starty>"+
		"<endd>22</endd>"+
		"<endm>06</endm>"+
		"<endy>2015</endy>"+
		"<startts>10</startts>"+
		"<starttm>00</starttm>"+
		"<starttse>00</starttse>"+
		"<endts>11</endts>"+
		"<endtm>00</endtm>"+
		"<endtse>00</endtse>"+
	"</event>"+
"</calendar>");
       	socket.facebook && console.log("***User " + socket.facebook.id + " named " + socket.facebook.name + " is connected***");
    
	User.find({ facebookID : socket.facebook.id }, function (err, docs) {
		if (err) return console.error(err);
		if(docs.length == 0) {
	                console.log('User ' + socket.facebook.name + ' saved...');
        	        var currentUser = new User();
                	currentUser.facebookID = socket.facebook.id;
               	 	currentUser.name = socket.facebook.name;
                	currentUser.save(function(err, currentUser) {
                		if (err) return console.error(err);
			})
        	} else {
                	console.log('User ' + socket.facebook.name + ' not saved...');
        	};
	});

});

    socket.on('disconnect', function(){
        socket.facebook && console.log("***User " + socket.facebook.id + " named " + socket.facebook.name + " is disconnected***");
    });
});


/*User.find().exec(function (err, userlist) {
       	console.log(userlist);
});

User.find().remove().exec();*/
