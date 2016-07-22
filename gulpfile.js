
//加载插件
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');


//创建任务
//括号里填的的是要压缩的文件的路径
//压缩html
gulp.task(src('htmlys',function(){
	gulp.src('src/html/gugeo.html');//路径
		.pipe(htmlmin());
		.pipe(gulp.dest('dist/html')/*s输出的路径和文件*/)
}）;

//压缩js
gulp.task("jsys",function(){
	gulp.src([arr])//要压缩多个传人数组，用引号括起来，，
	/*
		列：
		src/java.js;
	 */

})