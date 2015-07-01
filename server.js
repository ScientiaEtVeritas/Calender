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
var Event = mongoose.model('Event');

var io = require('socket.io')(server);
var currentDate = new Date().toLocaleString();
/*
User.find().remove().exec();
Event.find().remove().exec();
*/
io.on('connection', function(socket){
    socket.on('login', function(data) {
        socket.facebook = data;
	socket.facebook && console.log(currentDate + ": ***User " + socket.facebook.id + " named " + socket.facebook.name + " is connected***");

	User.find({ facebookID : socket.facebook.id }, function (err, docs) {
		if (err) return console.error(err);
		if(docs.length == 0) {
	                console.log(currentDate + ': ***User ' + socket.facebook.name + ' saved in database***');
        	        var currentUser = new User();
                	currentUser.facebookID = socket.facebook.id;
               	 	currentUser.name = socket.facebook.name;
                	currentUser.save(function(err, currentUser) {
                		if (err) return console.error(err);
			})
        	} else {
                	console.log(currentDate + ': ***User ' + socket.facebook.name + ' not saved - already in database***');
        	};


	});
	var eventsString = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>"+
		"<?xml-stylesheet type=\"text/xsl\" href=\"CalTest.xsl\"?>"+
		"<calendar>";
	User.find({facebookID : socket.facebook.id}, function (err, currentUser)
	{
		if (err) return console.error(err);
		if(currentUser.length > 0)
		{
		var userID = currentUser[0]._id;
		Event.find({userID : userID}, function (err2, events)
		{
			if (err2) return console.error(err2);
			events.forEach(function(currentEvent)
			{
				eventsString += '<event>';
				eventsString += '<title>' + currentEvent.title + '</title>';
				eventsString += '<place>' + currentEvent.place + '</place>';
				eventsString += '<startd>' + currentEvent.startd + '</startd>';
				eventsString += '<startm>' + currentEvent.startm + '</startm>';
				eventsString += '<starty>' + currentEvent.starty + '</starty>';
				eventsString += '<endd>' + currentEvent.endd + '</endd>';
				eventsString += '<endm>' + currentEvent.endm + '</endm>';
				eventsString += '<endy>' + currentEvent.endy + '</endy>';
				eventsString += '<startts>' + currentEvent.startts + '</startts>';
				eventsString += '<starttm>' + currentEvent.starttm + '</starttm>';
				eventsString += '<endts>' + currentEvent.endts + '</endts>';
				eventsString += '<endtm>' + currentEvent.endtm + '</endtm>';
				eventsString += '<per>' + currentEvent.per + '</per>';
				eventsString += '</event>';
			});
		eventsString += '</calendar>';
        	if(eventsString.indexOf("<event>") != -1)
		{
			socket.emit("data", eventsString);
		}
		});	
		}
	});
    });

	socket.on('newAppointment', function(docs)
		{
		var startDate = new Date(docs.start);
		var endDate = new Date(docs.end);
		var title = docs.title;
		var place = docs.place;
		var per = docs.per;
		var newEvent = new Event();
		User.find({facebookID : socket.facebook.id}, function (err, user)
		{
			if (err) return console.error(err);
			console.log('user ' + user[0]._id);
			newEvent.userID = user[0]._id;
			newEvent.title = title;
                	newEvent.place = place;
                	newEvent.startd = startDate.getDate();
                	newEvent.startm = (startDate.getMonth() + 1);
                	newEvent.starty = startDate.getFullYear();
                	newEvent.endd = endDate.getDate();
                	newEvent.endm = (endDate.getMonth() + 1);
                	newEvent.endy = endDate.getFullYear();
                	newEvent.startts = startDate.getHours();
			newEvent.starttm = startDate.getMinutes();
			newEvent.endts = endDate.getHours();
			newEvent.endtm = endDate.getMinutes(); 
			newEvent.per = per;
			newEvent.save(function(err2, newEvent) {
                        if(err2) {
                        	return console.error(err2);
                        } else
                        {
                        	console.log(currentDate + ': ***Event ' + newEvent.title + ' saved in database (User: ' + socket.facebook.name + ')***');
                        }
                	});
		});	
	});

    	socket.on('disconnect', function(){
        	socket.facebook && console.log(currentDate + ": ***User " + socket.facebook.id + " named " + socket.facebook.name + " is disconnected***");
    	});
});


/*User.find().exec(function (err, userlist) {
       	console.log(userlist);
});

User.find().remove().exec();*/
