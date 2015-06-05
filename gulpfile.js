var gulp         = require('gulp');
// var watch         = require('gulp-watch');

///////////////////////////////////////////////////////////////////////////////

gulp.task("default", ["watch"]);
gulp.task("copy", copy);
gulp.task("copyTheme", copyTheme);
gulp.task("watch", ["copy"], watch);
// gulp.task("build", ["copy"], build);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

///////////////////////////////////////////////////////////////////////////////

function copy(){

  gulp.src('./bonaparte/**/*')
    .pipe(gulp.dest('./SUI/src/themes/bonaparte')); 
   
  gulp.src('./examples/**/*')
    .pipe(gulp.dest('./SUI/examples')); 
}

function copyTheme(){
  gulp.src('./theme.config')
    .pipe(gulp.dest('./SUI/src')); 
   
}

///////////////////////////////////////////////////////////////////////////////

function watch(){
  gulp.watch(["./examples/**/*", "./bonaparte/**/*"], ["copy"]);
  gulp.watch([ "/theme.config"], ["copyTheme"]);
};
