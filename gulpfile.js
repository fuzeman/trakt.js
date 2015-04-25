var gulp = require('gulp');
var rjs = require('requirejs');

gulp.task('requirejs', function() {
  rjs.optimize({
    // All paths will be relative to this baseUrl.
    baseUrl: 'src',
    // Tells r.js that you want everything in one file.
    out: 'dist/trakt.js',
    // CommonJS packages
    packages: [
      { name: 'when', location: '../bower_components/when', main: 'when' }
    ],
    // Set paths for modules (shortcut alias for "include").
    paths: {
      almond: '../bower_components/almond/almond',
      httpinvoke: '../bower_components/httpinvoke/httpinvoke-commonjs'
    },
    // Include "almond" and "trakt" into the final file
    // specified in "out" property.
    include: ['almond', 'trakt'],
    // Wrapper for AMD, CommonJS and Browser compatibility.
    wrap: {
      startFile: 'src/_start.js',
      endFile: 'src/_end.js'
    },
    // Minify the file.
    optimize: 'uglify2',
    // Strip comments.
    preserveLicenseComments: false,
    // Add source maps for the original modules.
    generateSourceMaps: true
  });
});

gulp.task('watch', function() {
  gulp.watch('src/**/*.js', ['requirejs']);
});

gulp.task('default', ['requirejs', 'watch']);
