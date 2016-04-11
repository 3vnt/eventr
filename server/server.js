//////////////////////////////////////////////
//Server Dependencies
//////////////////////////////////////////////
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var _ = require('underscore');
var mysql = require('mysql');

//Modifiable Settings
var port = 8080;

//Temp Authentication ///////////////////////

var loggedIn = {};

/////////////////////////////////////////////
//Database
/////////////////////////////////////////////

var db = mysql.createConnection({
  host: "localhost",
  user: 'root',
  database: "eventr",
});

//Testing
db.connect(function(err) {
  if (err) {
    console.log('Connection Error:  ', err);
    return;
  }
  console.log('Successful Connection');
})

//
// var db = openDatabase();
// db.transaction(function(tx) {
//   tx.executeSql('')
// })

//////////////////////////////////////////////
///Express Controllers
//////////////////////////////////////////////

app.use(express.static(__dirname + '/../client'));


//////////////////////////////////////////////
///Socket Controllers
//////////////////////////////////////////////

//Controllers -> might need to move someplace els
io.on('connection', function(socket) {

  socket.on('signup', function(signupData) {
    console.log('received');
    var date = new Date();
    db.query("INSERT INTO users (username, created_at, email, password) Values (?, ?, ?, ?);",
      signupData.username, date, signupData.email, signupData.password,
      function(err, result) {
        if (err) {
          console.log(err);
          socket.emit('failed');
          return;
        };
        socket.emit('success');
      });
  });

  socket.on('login', function(loginData) {
    //save into socket loggedIn user array
    console.log("socket object", socket);
    console.log("ID", socket.id);
    loggedIn[loginData.email] = socket.id;
    //do something to save stuff onto database;
  });

  socket.on('logout', function() {
    for (var key in loggedIn) {
      if (loggedIn[key] === socket.id) {
        delete loggedIn[key];
      }
    }
  });


  ////createEvent View
  socket.on('addEvent', function(data) {
    //Store data into database;
    //tell everyone that is online of the change //broadcast to everyone (MVP!);
      //use the people in the data
      //find their usenames
      //braodcast to the sockets with those username of instant changes
  });

});


/////////////////////////////////////////////
///Server init
////////////////////////////////////////////
server.listen(port);

///Exportation
module.exports = app;
