var
  // modules
    gulp = require('gulp'),
    concat = require('gulp-concat'),
    deporder = require('gulp-deporder'),
    stripdebug = require('gulp-strip-debug'),
    uglify = require('gulp-uglify'),
    // development mode?
    devBuild = (process.env.NODE_ENV !== 'production'),

    // folders
    folder = {
        src: 'src/',
        build: 'build/'
    }
;

gulp.task('js', function() {

  var jsbuild = gulp.src(folder.src)
    .pipe(deporder())
    .pipe(concat('dist.js'));

  if (!devBuild) {
    jsbuild = jsbuild
      .pipe(stripdebug())
      .pipe(uglify());
  }

  return jsbuild.pipe(gulp.dest(folder.build));

});

gulp.task('watch', function() {
  // javascript changes
  gulp.watch(folder.src, ['js']);

});

gulp.task('run', ['js']);
gulp.task('default', ['run', 'watch']);