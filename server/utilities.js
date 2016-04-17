/*
  Utility Module for functions
 */
var _ = require('underscore');

/////////////////////////////////////////////
//Socket helper functions
/////////////////////////////////////////////
exports.findEmail = function(socketId, loggedIn) {
  _.each(loggedIn, function(email) {
    if(loggedIn[email] === socketID) {
      return email;
    };
  });
};

exports.findUser = function(db, email) {
  db.query('SELECT id FROM users WHERE email = ?', email)
  .then(function(id){
    console.log(id);
    return id;
  });
};


//use table joining
exports.eventBroadcast = function(io, db, event, loggedIn, data) {
  //DB query events - find event ID
  db.query('SELECT id FROM events WHERE name = ?', event, function(err, eventID) {
    if (err) {
      console.log('failing at: server SELECT id from events WHERE name = event Call', err);
      return;
    };
    //DB query users - all users that match
    db.query('SELECT user_id FROM events_users WHERE event_id = ?', eventID, function(err, userArray) {
      if (err) {
        console.log('failing at: SELECT user_id FROM events_users WHERE event_id = eventID', err);
        return;
      };
      //broadcast to each individual in the array
      _.each(userArray, function(id) {
        db.query('SELECT email FROM users WHERE id = ?', id, function(err, email) {
          if (err) {
            console.log('SELECT email FROM users WHERE id =', id, err);
            return;
          };

          if(loggedIn[email]) {
          io.to(loggedIn[email]).emit('eventUpdate', data);
          }
        })
      });
    })
  });
};

//Time Functions //////////////////
exports.mysqlDate = function() {
  return (new Date()).toISOString().substring(0, 10);
};

exports.mysqlDatetime = function() {
  return (new Date()).toISOString().substring(0, 19).replace('T', ' ');
};
