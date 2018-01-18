const gulp = require("gulp");
const imageminm = require("gulp-imagemin");
const connect = require("gulp-connect");
const uglify = require("gulp-uglify");
const minifyhtml = require("gulp-minify-html");
const minifycss = require("gulp-minify-css");
const autoprefixer = require('gulp-autoprefixer');
const gulpUtil = require("gulp-util");//报错在源代码位置,即使不用在terminal里面也会显示报错位置
const babel = require("gulp-babel");
const px2rem = require('gulp-px2rem-plugin');//这个计算和之前写的有些不一样，用了这个就要引用公共的utils.js的rem的计算
gulp.task('gulpUtil', function(){
  return gulp.src('src/**/*.js')
 .pipe(babel()) //babel这里是转ed6 包含babel, bablel-core, babel-preset-es2015
   .pipe(uglify().on('error', function(err){
          console.log(err);
          this.emit('end');
  }))
  .pipe(gulp.dest('')) //dest到根目录下
  .pipe(connect.reload())
})


gulp.task("watch",function(){
  gulp.watch("src/**/*.js",["gulpUtil"])
})

/*server*/
gulp.task("server",function(){
  connect.server({
      root:"/",
      port:"8002",
      livereload:true/*热替换（功能为即时刷新）*/
  })
})
gulp.task("default",["server","watch"])