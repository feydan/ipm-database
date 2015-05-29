// Include gulp
var gulp = require('gulp'); 

// Include Our Plugins
var jshint = require('gulp-jshint');
//var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var browserify = require('gulp-browserify');
var react = require('gulp-react');

//Compile jsx
gulp.task('jsx', function () {
    return gulp.src('common/*/*.js')
        .pipe(react())
        .pipe(gulp.dest('lib'));
});

// Lint Task
gulp.task('lint', ['jsx'], function() {
    return gulp.src('lib/components/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

//Browserify
gulp.task('scripts', ['lint','jsx'], function() {
    // Single entry point to browserify 
    gulp.src('browser/index.js')
        .pipe(browserify({
          insertGlobals : true,
          debug : !gulp.env.production
        }))
        .pipe(rename('bundle.js'))
        .pipe(gulp.dest('./public/js'));
});

// // Concatenate & Minify JS
// gulp.task('scripts', function() {
//     return gulp.src('js/*.js')
//         .pipe(concat('all.js'))
//         .pipe(gulp.dest('dist'))
//         .pipe(rename('all.min.js'))
//         .pipe(uglify())
//         .pipe(gulp.dest('dist'));
// });

// Watch Files For Changes
gulp.task('watch', ['lint','jsx','scripts'], function() {
    gulp.watch('common/components/*.js', ['lint', 'jsx', 'scripts']);
});

// Default Task
gulp.task('default', ['lint', 'jsx', 'scripts', 'watch']);