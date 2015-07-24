var gulp         = require('gulp');
var less         = require("gulp-less");
var cleancss     = new (require("less-plugin-clean-css"))({ advanced: true });
var autoprefixer = require("gulp-autoprefixer");
var spawn        = require('child_process').spawn;
var browserify   = require("browserify");
var source       = require('vinyl-source-stream');
var buffer       = require('vinyl-buffer');
var rename       = require('gulp-rename');
var glob       = require('glob');

///////////////////////////////////////////////////////////////////////////////

require("./gulp/SUI.js");

///////////////////////////////////////////////////////////////////////////////

gulp.task("default", ["BPA-watch"]);
gulp.task("build" , ["SUI-build", "BPA-build"]);
gulp.task("less", css);
gulp.task("js", js);

gulp.task("BPA-build", ["SUI-extract", "less", "js"]);
gulp.task("BPA-watch", ["BPA-build"], watch);

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////

function js(){

  browserify({
    // debug: true,
    entries: ['./src/js/bonaparte.js']
  })
  .bundle()
  .pipe(source('bonaparte.js'))
  .pipe(buffer())
  .pipe(gulp.dest('./dist'));


  // var tags = glob.sync('./src/js/tags/*.js');

}

///////////////////////////////////////////////////////////////////////////////

function css(){
  return gulp.src('./src/less/bonaparte.less')
    .pipe(less({
      plugins : [cleancss]
    }))
    .pipe(autoprefixer())
    // .pipe(rename("bonaparte.css"))
    .pipe(gulp.dest('./dist/')); 
}

///////////////////////////////////////////////////////////////////////////////

function watch(){
  gulp.watch(["./src/less/**/*.less"], ["less"]);
  gulp.watch(["./src/js/**/*.js"], ["js"]);
};


