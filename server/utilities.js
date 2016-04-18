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
exports.eventBroadcast = function(io, db, event, loggedIn, data) {
  //DB query events - find event ID
  db.query('SELECT id FROM events WHERE name = ?', event)
    .then(function(eventID){
      console.log('id', data);
      //Find All User ID that matches the event
      db.query('SELECT user_id FROM events_users WHERE event_id = ?', eventID)
      .then(function(userID){
        //For each user in the event
        _.each(userID, function(id) {
          //Find their emails
          db.query('SELECT email FROM users WHERE id = ?', id)
            .then(function(email) {
              //then check if they are logged in
              if(loggedIn[email]) {
                //if yes then broadcast to them something specific
                io.to(loggedIn[email]).emit('eventupdate', data);
              }
            })
        });
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
          isWinningChoice: 0,
        };
        db.query('INSERT INTO choices SET ?', choice)
          .then(function(data){
            var choiceID = data.insertId;
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
