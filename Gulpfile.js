process.env.NODE_ENV = 'test';
process.env.MYSQL = {
  host: 'http://127.0.0.1:3306',
  user: 'root',
  password: 'a'
};
process.env.JWT_SECRET = 'SECRET'; // for future use

var gulp = require('gulp');
var sync = require('browser-sync');
var nodemon = require('gulp-nodemon');
var util = require('gulp-util');

var paths = {
  server: ['server/**/*.js'],
  client: {
    js: ['client/**/*.js'],
    css: ['client/**/*.css']
  }
};

gulp.task('start', function () {
  nodemon({
    script: './server/server.js',
    ignore: 'node_modules/**/*.js'
  })
});

gulp.task('', function () {});