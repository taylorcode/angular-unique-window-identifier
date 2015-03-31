var gulp = require('gulp'),
    jasmine = require('gulp-jasmine'),
    babel = require('gulp-babel'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    bundlerJs = require('bundler-js'),
    packageFilename = 'unique-window-identifier';
 
gulp.task('test', function () {
    return gulp.src('spec/test.js')
        .pipe(jasmine());
});

gulp.task('bundle', function () {
    bundlerJs({
        appScript: './src/module.js',
        outputFile: packageFilename + '.js',
        dest: 'dist'
    });
});

gulp.task('default', ['bundle']);
