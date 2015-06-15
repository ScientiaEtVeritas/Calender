# Calender
## Installation

You need node.js for installing Calender.
First clone it from GitHub and then install dependencies.

```
git clone git@github.com:ScientiaEtVeritas/Calender.git
cd Calender
npm install
```

You also need a MangoDB database to connect with.

## Start and Configuration

For starting the MongoDB navigate in your Bash to the bin-directory of MongoDB and execute the following line:

```
mongod
```

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
