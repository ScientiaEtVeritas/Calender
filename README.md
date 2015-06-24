# Calender

## General

### Technologies:
* Presentation: HTML, CSS, JavaScript (jQuery, xslt.js)
* Server: node.js (express, mongoose)
* Client-Server-Communication: Socket.IO, XML/XSLT
* Database: MongoDB

### Functions
* different views: month view, week view, day view
* loading different views without reloading the page
* displaying appointments in all views
* color highlighting of present day, weekends and outside of the month days
* login/registration procedure via Facebook
* addition of appointments depending of user logged in, on hover effect
* jump to the present day
* show calender week
* keyboard support (shortcuts)
* data keeping

## Installation

You need node.js for installing Calender.
First clone it from GitHub and then install dependencies.

```
git clone https://github.com/ScientiaEtVeritas/Calender.git
cd Calender
npm install
```

You also need a MangoDB database to connect with.

## Start and Configuration

You can optionally set some env. variables to set the configuration of the connection to MongoDB.
For Windows see the following lines.

```
SET db_name=<name>
SET db_host=<host>
SET db_port=<port>
SET db_user=<user>
SET db_pw=<password>
```

The default MongoDB-URL is **mongodb://localhost:27017/calender**.

To execute the Calender app on node.js you have to be in your Calender directory and execute the following line. You can optionally set your port.

```
node server.js <port>
```

or

```
npm start
```

Type in your browser's address bar **http://localhost:port** to see the website.

The port defaults to 63242.

## Error Handling

- Please ignore the bson-error if it appears on installation or starting the Calender.

```
js-bson: Failed to load c++ bson extension, using pure JS version
{ [Error: Cannot find module '../build/Release/bson'] code: 'MODULE_NOT_FOUND' }
```

- If you get a database error, please make sure that you've installed MongoDB and it is running: For starting the MongoDB navigate in your bash to the bin-directory of MongoDB and execute the following line:

```
mongod
```

- In case of the following error, please install all modules with **npm install**.

```Error: Cannot find module '<module>'```

Make sure you are running the application on the default port to test the Facebook login. If you don't want to run on that port please change the App-ID of Facebook in the *index.html* to your own application.
