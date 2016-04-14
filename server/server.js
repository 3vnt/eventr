//////////////////////////////////////////////
//Server Dependencies
//////////////////////////////////////////////
var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var _ = require('underscore');
var mysql = require('promise-mysql');
var util = require('./utilities');

//Modifiable Settings
var port = 8080;

//Temp Authentication ///////////////////////
var loggedIn = {};

/////////////////////////////////////////////
//Database
/////////////////////////////////////////////
var db;

mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'eventr',
}).then(function(database){
  db = database;
  console.log('successful connection');
});

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
    db.query("INSERT INTO users SET ?" , newUser)
      .then(function() {
        loggedIn[signupData.email] = socket.id;
        socket.emit('success');
    });
  });


  //Login Listener
  socket.on('login', function(loginData) {
    //save into socket loggedIn user array
    db.query('SELECT password FROM users WHERE email = ?', loginData.email)
      .then(function(data){
        if (data[0].password === loginData.password) {
          loggedIn[loginData.email] = socket.id;
          socket.emit('authenticated', {});
        };
      }).catch(function(err) {
        console.log(err);
        socket.emit('noUser')
    });
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

    var userEmail = util.findEmail(socket.id, loggedIn);

    var event = {
        created_at: util.mysqlDatetime(),
        updated_at: util.mysqlDatetime(),
        event_name: data.name,
        response_deadline: data.response_deadline,
        total_cost: data.cost,
        event_host: util.findUser(db, userEmail),
    };

    db.query('INSERT INTO events SET ?', event, function(err, data) {
      if (err) {
        console.log('failing at server INSERT Call', err);
        return;
      };

    });
  });

  //util.eventBroadcast(io, db, event, loggedIn, data);

});


/////////////////////////////////////////////
///Server init
////////////////////////////////////////////
server.listen(port);

///Exportation
module.exports = app;
