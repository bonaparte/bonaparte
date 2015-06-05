var gulp         = require('gulp');

var SUI_watch    = require("./SUI/tasks/watch");
var SUI_build    = require("./SUI/tasks/build");
///////////////////////////////////////////////////////////////////////////////

gulp.task("default", ["watch"]);
gulp.task("copy", copy);
gulp.task("watch", ["copy"] watch);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function copy(){

  gulp.src('./bonaparte')
    .pipe(gulp.dest('./SUI/src/themes')); 
   
  gulp.src('./examples')
    .pipe(gulp.dest('./SUI/examples')); 
   
}

function watch(){
  gulp.watch(["./examples/**/*", "./bonaparte/**/*"], ["copy"]);

  gulp.start(SUI_watch);
};
