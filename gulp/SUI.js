var gulp         = require('gulp');
var spawn = require('child_process').spawn;


// var watch         = require('gulp-watch');

///////////////////////////////////////////////////////////////////////////////

gulp.task("SUI-build", build);
gulp.task("SUI-watch", ["SUI-extract"], watch);
gulp.task("SUI-extractor", extractor);
gulp.task("SUI-extract", extract);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function build(){

  gulp.src('./SUI/custom/theme/bonaparte/**/*')
    .pipe(gulp.dest('./SUI/ui/src/themes/bonaparte')); 
   
  gulp.src('./SUI/custom/examples/**/*')
    .pipe(gulp.dest('./SUI/ui/examples')); 

  gulp.src('./SUI/custom/theme.config')
    .pipe(gulp.dest('./SUI/ui/src')); 

  gulp.src('./SUI/custom/semantic.json')
    .pipe(gulp.dest('./SUI/ui')); 

 
  process.chdir("./SUI/ui/");

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
  
  // Move changes to custom/

  gulp.src("./SUI/ui/src/themes/bonaparte/**/*")
    .pipe(gulp.dest('./SUI/custom/theme/bonaparte')); 
   
  // gulp.src('./SUI/ui/examples/**/*')
  //   .pipe(gulp.dest('./SUI/custom/examples')); 

  gulp.src('./SUI/ui/src/theme.config')
    .pipe(gulp.dest('./SUI/custom/')); 

  gulp.src('./SUI/ui/semantic.json')
    .pipe(gulp.dest('./SUI/custom')); 

  // gulp.src('./SUI/ui/dist/**/*')
  //   .pipe(gulp.dest('./SUI/custom/dist'));


  // Move distribution files to dist/

  gulp.src('./SUI/ui/dist/**/*')
    .pipe(gulp.dest('./dist/SUI'));

}


///////////////////////////////////////////////////////////////////////////////

function extractor(){

  // gulp.watch(["./ui/src/themes/bonaparte/**/*",'./ui/examples/**/*', './ui/src/theme.config'], ["extract"]);
  gulp.watch(["./SUI/ui/dist/semantic.min.css"], ["SUI-extract"]);

}

///////////////////////////////////////////////////////////////////////////////

function watch(){

  // spawn watcher
  spawn('gulp', ["SUI-extractor"]).stdout.on('data', function(data) {

    if (data) {
        console.log(data.toString())
    }
  });

 
  // cd to ui and spawn watcher
  process.chdir("./SUI/ui/");

  var build = spawn('gulp', ["watch"]);
  build.stdout.on('data', function(data) {
    if (data) {
        console.log(data.toString())
    }
  });

};



