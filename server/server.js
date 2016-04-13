//////////////////////////////////////////////
//Server Dependencies
//////////////////////////////////////////////
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var _ = require('underscore');
var mysql = require('mysql');
var util = require('./utilities');

//Modifiable Settings
var port = 8080;

//Temp Authentication ///////////////////////

var loggedIn = {};

/////////////////////////////////////////////
//Database
/////////////////////////////////////////////

var db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'eventr',
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

  //Signup Listener
  socket.on('signup', function(signupData) {
    var newUser = {
      username: signupData.username,
      email: signupData.email,
      password: signupData.password,
      created_at: util.mysqlDatetime(),   //need to be reformatted -> currently hardcoded
    };
    db.query("INSERT INTO users SET ?" , newUser, function(err, result) {
        if (err) {
          console.log(err);
          socket.emit('failed');
          return;
        };
        loggedIn[signupData.email] = socket.id;
        socket.emit('success');
    });
  });


  //Login Listener
  socket.on('login', function(loginData) {
    //save into socket loggedIn user array

    db.query('SELECT password FROM users WHERE email = ?', loginData.email, function(err, data) {
      if (err) {
        console.log(err);
        socket.emit('noUser');
        return;
      }
      console.log(data[0]);
      if (data[0].password === loginData.password) {
        loggedIn[loginData.email] = socket.id;
        socket.emit('authenticated', {});
        return;
      }
      socket.emit('invalidPassword');
    });

    //do something to save stuff onto database;
  });

  //Logout Listener
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
    var event = {
        created_at: util.mysqlDatetime(),
        updated_at: util.mysqlDatetime(),
        name: data.name,
        date: '??',
        location: data.location,
        total_cost: data.cost,
        event_host: '??',
    };

    db.query('INSERT INTO events SET ?', event, function(err, data) {
      if (err) {
        console.log('failing at server INSERT Call', err);
        return;
      };
      util.eventBroadcast(io, db, data, loggedIn, data);
    });
  });

});


/////////////////////////////////////////////
///Server init
////////////////////////////////////////////
server.listen(port);

///Exportation
module.exports = app;
