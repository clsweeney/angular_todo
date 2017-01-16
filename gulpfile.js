var gulp          = require('gulp');
var notify        = require('gulp-notify');
var del 		  = require('del');
var source        = require('vinyl-source-stream');
var browserify    = require('browserify');
var babelify      = require('babelify');
var ngAnnotate    = require('browserify-ngannotate');
var browserSync   = require('browser-sync').create();
var rename        = require('gulp-rename');
var templateCache = require('gulp-angular-templatecache');
var uglify        = require('gulp-uglify');
var merge         = require('merge-stream');
var sourcemaps = require('gulp-sourcemaps');
var buffer = require('vinyl-buffer');
var RevAll = require('gulp-rev-all');
var execSync = require('child_process').execSync;
var replace = require('gulp-replace');
var revdel = require('gulp-rev-delete-original');

// Where our files are located
var jsFiles   = "src/js/**/*.js";
var viewFiles = "src/js/**/*.html";

var interceptErrors = function(error) {
  var args = Array.prototype.slice.call(arguments);

  // Send error to notification center with gulp-notify
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  // Keep gulp from hanging on this task
  this.emit('end');
};


gulp.task('browserify', ['views'], function() {
  return browserify('./src/js/app.js')
      .transform(babelify, {presets: ["es2015"]})
      .transform(ngAnnotate)
      .bundle()
      .on('error', interceptErrors)
      //Pass desired output filename to vinyl-source-stream
      .pipe(source('main.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({loadMaps: true}))
      .pipe(sourcemaps.write('./'))
      // Start piping stream to tasks!
      .pipe(gulp.dest('./build/'));
});

gulp.task('html', function() {
  return gulp.src("src/index.html")
      .on('error', interceptErrors)
      .pipe(gulp.dest('./build/'));
});

gulp.task('css', function() {
	  return gulp.src("css/local.css")
	      .on('error', interceptErrors)
	      .pipe(gulp.dest('./build/'));
	});

gulp.task('views', function() {
  return gulp.src(viewFiles)
      .pipe(templateCache({
        standalone: true
      }))
      .on('error', interceptErrors)
      .pipe(rename("app.templates.js"))
      .pipe(gulp.dest('./src/js/config/'));
});

// This task is used for building production ready
// minified JS/CSS files into the dist/ folder
gulp.task('build', ['html', 'css', 'browserify'], function() {
  var html = gulp.src("build/index.html")
                 .pipe(gulp.dest('./dist/'));

  var js = gulp.src("build/main.js")
               .pipe(uglify())
               .pipe(gulp.dest('./dist/'));
  
  var css = gulp.src("build/local.css")
  				.pipe(gulp.dest('./dist/'));
 

  return merge(html,css,js);
});

gulp.task('default', ['html', 'css', 'browserify'], function() {

  browserSync.init(['./build/**/**.**'], {
    server: "./build",
    port: 4000,
    notify: false,
    ui: {
      port: 4001
    },
    browser: "google chrome"
  });

  gulp.watch("src/index.html", ['html']);
  gulp.watch(viewFiles, ['views']);
  gulp.watch(jsFiles, ['browserify']);
  gulp.watch("css/local.css", ['css']);
});

gulp.task('version-build', ['build'], function() {
        var revAll = new RevAll({
            dontRenameFile: [/^\/favicon.ico$/g, /^\/index.html/g, /^\/env-.*js$/g]
        } );
        var gitHash = process.env.BUILD_VCS_NUMBER ? process.env.BUILD_VCS_NUMBER : execSync( "git rev-list --max-count=1 HEAD").toString();
        var gitBranch = execSync( "git rev-parse --abbrev-ref HEAD").toString();

        return gulp.src('dist/**')
        	.pipe(replace('TODOS:VersionUnknown', gitHash.trim(), { skipBinary: true }))
            .pipe(replace('TODOS:BranchUnknown', gitBranch.trim(), { skipBinary: true }))
            .pipe(revAll.revision())
            .pipe(revdel())
            .pipe(gulp.dest('dist'))
});

//clean the dist folder
gulp.task('clean-dist', function(cb){
    return del(['dist/**/*']);
    cb();
});

gulp.task('dist', ['version-build'], function() {
	});

