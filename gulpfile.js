var gulp         = require('gulp');
var spawn = require('child_process').spawn;

// var watch         = require('gulp-watch');

///////////////////////////////////////////////////////////////////////////////

gulp.task("default", ["watch"]);
gulp.task("install", install);
gulp.task("watch", ["extract"], watch);
gulp.task("watchBP", watchBP);
gulp.task("extract", extract);
// gulp.task("build", ["copy"], build);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function install(){

  gulp.src('./dist/bonaparte/**/*')
    .pipe(gulp.dest('./SUI/src/themes/bonaparte')); 
   
  gulp.src('./dist/examples/**/*')
    .pipe(gulp.dest('./SUI/examples')); 

  gulp.src('./dist/theme.config')
    .pipe(gulp.dest('./SUI/src')); 

}

///////////////////////////////////////////////////////////////////////////////

function extract(){
  gulp.src("./SUI/src/themes/bonaparte/**/*")
    .pipe(gulp.dest('./dist/bonaparte')); 
   
  gulp.src('./SUI/examples/**/*')
    .pipe(gulp.dest('./dist/examples')); 

  gulp.src('./SUI/src/theme.config')
    .pipe(gulp.dest('./dist/')); 
}

///////////////////////////////////////////////////////////////////////////////

function watch(){

  // spawn watcher
  spawn('gulp', ["watchBP"]).stdout.on('data', function(data) {
    if (data) {
        console.log(data.toString())
    }
  });
  

  // cd to SUI and spawn watcher
  process.chdir("./SUI/");

  spawn('gulp', ["watch"]).stdout.on('data', function(data) {
    if (data) {
        console.log(data.toString())
    }
  });

};

///////////////////////////////////////////////////////////////////////////////


function watchBP(){

  gulp.watch(["./SUI/src/themes/bonaparte/**/*",'./SUI/examples/**/*', './SUI/src/theme.config'], ["extract"]);

}
