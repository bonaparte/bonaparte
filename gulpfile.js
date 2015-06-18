var gulp         = require('gulp');
var spawn = require('child_process').spawn;

// var watch         = require('gulp-watch');

///////////////////////////////////////////////////////////////////////////////

gulp.task("default", ["watch"]);
gulp.task("build", build);
gulp.task("watch", ["extract"], watch);
gulp.task("watchBP", watchBP);
gulp.task("extract", extract);
// gulp.task("build", ["copy"], build);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function build(){

  gulp.src('./dist/theme/bonaparte/**/*')
    .pipe(gulp.dest('./ui/src/themes/bonaparte')); 
   
  gulp.src('./dist/examples/**/*')
    .pipe(gulp.dest('./ui/examples')); 

  gulp.src('./dist/theme.config')
    .pipe(gulp.dest('./ui/src')); 

  gulp.src('./dist/semantic.json')
    .pipe(gulp.dest('./ui')); 

 
  process.chdir("./ui/");

  var build = spawn('gulp', ["build"]);
  build.stdout.on('data', function(data) {
    if (data) {
        console.log(data.toString())
    }
  });

  // build.on("close", function(){
  //   gulp.start("extract");
  // });
}

///////////////////////////////////////////////////////////////////////////////

function extract(){
  gulp.src("./ui/src/themes/bonaparte/**/*")
    .pipe(gulp.dest('./dist/theme/bonaparte')); 
   
  gulp.src('./ui/examples/**/*')
    .pipe(gulp.dest('./dist/examples')); 

  gulp.src('./ui/src/theme.config')
    .pipe(gulp.dest('./dist/')); 

  gulp.src('./ui/semantic.json')
    .pipe(gulp.dest('./dist')); 

  gulp.src('./ui/dist/**/*')
    .pipe(gulp.dest('./dist/dist'));
}

///////////////////////////////////////////////////////////////////////////////

function watch(){

  // spawn watcher
  spawn('gulp', ["watchBP"]).stdout.on('data', function(data) {

    if (data) {
        console.log(data.toString())
    }
  });

 
  // cd to ui and spawn watcher
  process.chdir("./ui/");

  var build = spawn('gulp', ["watch"]);
  build.stdout.on('data', function(data) {
    if (data) {
        console.log(data.toString())
    }
  });

};

///////////////////////////////////////////////////////////////////////////////

function watchBP(){

  // gulp.watch(["./ui/src/themes/bonaparte/**/*",'./ui/examples/**/*', './ui/src/theme.config'], ["extract"]);
  gulp.watch(["./ui/dist/semantic.min.css"], ["extract"]);

}



