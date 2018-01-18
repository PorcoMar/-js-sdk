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
gulp.task("copy-html",function(){
  return gulp.src("src/**/*.html")
  .pipe(minifyhtml())
  .pipe(gulp.dest(""))
  .pipe(connect.reload())
})
gulp.task("autoprefixer",()=>{ 
  return gulp.src(['src/**/*.css'])
  .pipe(autoprefixer({
    browsers:["last 2 versions"],//主流浏览器的最新两个版本
    cascade:false //是否美化属性值 默认：true
  }))
  .pipe(minifycss())
    .pipe(px2rem())
  .pipe(gulp.dest(""))
  .pipe(connect.reload())
})
gulp.task("copy-img",function(){
  return gulp.src("public/orignalmage/**/*.{jpg,png,jpeg,gif,ico}")
  .pipe(imageminm({
      optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
      progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
      interlaced: true, //类型：Boolean 默认：false 隔行扫描gif进行渲染
      multipass: true //类型：Boolean 默认：false 多次优化svg直到完全优化
  })) //压缩这一步如果不行就重新下载 cnpm i gulp-imagemin --save-dev
  .pipe(gulp.dest("public/images"))
  .pipe(connect.reload())
})

gulp.task("watch",function(){
  gulp.watch("src/**/*.js",["gulpUtil"])
  gulp.watch("src/**/*.html",["copy-html"])
  gulp.watch("src/**/*.css",["autoprefixer"])
  gulp.watch("public/orignalmage/**/*.{jpg,png,gif,jpeg,ico}",['copy-img'])
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