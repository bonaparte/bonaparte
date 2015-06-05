var gulp         = require('gulp');
// var watch         = require('gulp-watch');

///////////////////////////////////////////////////////////////////////////////

gulp.task("default", ["watch"]);
gulp.task("install", install);
gulp.task("watch", ["save"], watch);
gulp.task("save", save);
// gulp.task("build", ["copy"], build);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function install(){

  gulp.src('./bonaparte/**/*')
    .pipe(gulp.dest('./SUI/src/themes/bonaparte')); 
   
  gulp.src('./examples/**/*')
    .pipe(gulp.dest('./SUI/examples')); 

  gulp.src('./theme.config')
    .pipe(gulp.dest('./SUI/src')); 

}

///////////////////////////////////////////////////////////////////////////////

function save(){
  gulp.src("./SUI/src/themes/bonaparte/**/*")
    .pipe(gulp.dest('./bonaparte')); 
   
  gulp.src('./SUI/examples/**/*')
    .pipe(gulp.dest('./examples')); 

  gulp.src('./SUI/src/theme.config')
    .pipe(gulp.dest('./')); 
}

///////////////////////////////////////////////////////////////////////////////

function watch(){
  gulp.watch(["./SUI/src/themes/bonaparte/**/*",'./SUI/examples/**/*', './SUI/src/theme.config'], ["save"]);
};
