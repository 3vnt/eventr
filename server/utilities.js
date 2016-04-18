/*
  Utility Module for functions
 */
var _ = require('underscore');

/////////////////////////////////////////////
//Socket helper functions
/////////////////////////////////////////////
exports.findEmail = function(socketId, loggedIn) {
  _.each(loggedIn, function(email) {
    if(loggedIn[email] === socketId) {
      console.log(email);
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
