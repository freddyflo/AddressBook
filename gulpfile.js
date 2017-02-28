var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var pkg = require('./package.json');



/* location of modules */
var paths = {
    js: [
        'node_modules/jquery/dist/jquery.min.js',
        'node_modules/bootstrap/dist/js/bootstrap.min.js',
        'node_modules/angular/angular.min.js',
        'node_modules/angular-animate/angular-animate.min.js',
        'node_modules/angular-resource/angular-resource.min.js',
        'node_modules/angular-route/angular-route.min.js',
        'node_modules/angular-sanitize/angular-sanitize.min.js',
        'node_modules/angular-strap/dist/angular-strap.min.js',
        'node_modules/angular-strap/dist/angular-strap.tpl.js',
        'contactmanager/js/controller.js'
        
  
    ]
};

/* uglify tasks  */
gulp.task('uglify', function(){

        gulp.src(paths.js)
        .pipe(concat(pkg.name+'.js'))
        .pipe(uglify())
        .pipe(gulp.dest('contactmanager/js/build'));

});


/* watch task */
gulp.task('watch', function(){
   gulp.watch(paths.js, ['uglify']) ;
});


/* default task */
gulp.task('default', ['uglify']);