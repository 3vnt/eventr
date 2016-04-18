/*
  Utility Module for functions
 */
var _ = require('underscore');

// mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   database: 'eventr',

// })

/////////////////////////////////////////////
//Socket helper functions
/////////////////////////////////////////////
exports.findEmail = function(socketid, loggedIn) {
  for (var key in loggedIn) {
    if(loggedIn[key] === socketid) {
      return key;
    }
  };
};

exports.findUser = function(db, email) {
  return db.query('SELECT id FROM users WHERE email = ?', email);
  // .then(function(id){
  //   console.log(id);
  //   return id;
  // }).catch(function(err){
  //   console.log('user not found');
  // });
};

//Broadcast to all users that are logged in to that event;
exports.eventBroadcast = function(io, db, eventID, loggedIn, data) {
  db.query('SELECT * FROM events_users WHERE event_id = ?', eventID)
    .then(function(users){
      //For each user in the event
      _.each(users, function(id) {
        console.log('the ids', id.user_id);
        db.query('SELECT email FROM users WHERE id = ?', id.user_id)
          .then(function(data) {
            var email = data[0].email;
            //then check if they are logged in
            if(loggedIn[email]) {
              //if yes then broadcast to them something specific
              //io.sockets.emit('eventUpdate', data);
              io.sockets.connected[loggedIn[email]].emit('eventUpdate', data);
            }
          })
    });
  });
};

//Time Functions //////////////////
exports.mysqlDate = function() {
  return (new Date()).toISOString().substring(0, 10);
};

exports.mysqlDatetime = function() {
  return (new Date()).toISOString().substring(0, 19).replace('T', ' ');
};

//MYSQL Functions

exports.createEvents_Users = function(db, userID, eventID) {
  var temp = {
    user_id: userID,
    event_id: eventID,
  }
  return db.query('INSERT INTO events_users SET ?', temp);
};

exports.createQuestion = function(db, util, text, eventID, hostID, choicesObject, friends) {
  var length = Object.keys(friends).length + 1;
  var question = {
    created_at: util.mysqlDatetime(),
    text: text,
    creator_id: hostID,
    event_id: eventID,
  };

  return db.query('INSERT INTO questions SET ?', question)
    .then(function(data){
      var questionID = data.insertId;
      _.each(choicesObject, function(item) {
        var choice = {
          question_id: questionID,
          text: item,
          maxVotes: length,
        };
        db.query('INSERT INTO choices SET ?', choice)
          .then(function(data){
            var choiceID = data.insertId;
            var host = {
              user_id: hostID,
              choices_id: choiceID,
              vote_time: util.mysqlDatetime(),
            };
            db.query('INSERT INTO users_choices SET ?', host);
            _.each(friends, function(email) {
              util.findUser(db, email)
              .then(function(friendID) {
                var temp = {
                  user_id: friendID[0].id,
                  choices_id: choiceID,
                  vote_time: util.mysqlDatetime(),
                }
                db.query('INSERT INTO users_choices SET ?', temp);
              });
            })
          });
      });
    });
};
