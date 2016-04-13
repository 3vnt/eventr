/*
  Utility Module for functions
 */



//Time Functions //////////////////
exports.mysqlDate = function() {
  return (new Date()).toISOString().substring(0, 10);
};

exports.mysqlDatetime = function() {
  return (new Date()).toISOString().substring(0, 19).replace('T', ' ');
}
