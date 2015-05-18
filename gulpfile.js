/*globals require */
var gulp = require('turris-gulp-tasks')([
    'serve',
    'build',
    'debug',
    'test',
], require('./buildConfig.js'));

gulp.task('default', ['debug', 'serve']);
gulp.task('deploy', ['build']);
