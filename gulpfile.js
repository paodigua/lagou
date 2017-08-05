/* 在安装好gulp及其插件后
 */
/*引入gulp主模块 */
var gulp = require('gulp');
/*使用$用于引入gulp插件*/
var $ = require("gulp-load-plugins")();

var open = require("open");

/*用于定义源代码目录  dev调试环境  proPath 生产环境*/
var app = {
	srcPath: "src/",
	devPath: "build/",
	proPath: "dist/"
};
/* task 新建任务
 * src  导入文件          文件夹名/星星/星  代码导入（ 遍历方式） 该文件夹下所有文件
*
	pipe 操作文件 *
	dest 写入操作 *
*/
/* lib任务: 将bower_components下所有下载的软件复制一份到vendor文件夹下 */
gulp.task("lib", function() {
	gulp.src("bower_components/**/*.js")
		.pipe(gulp.dest(app.devPath + "vendor"))
		.pipe(gulp.dest(app.proPath + "vendor"))
		.pipe($.connect.reload());
});

gulp.task("html", function() {
	gulp.src(app.srcPath + "**/*.html")
		.pipe(gulp.dest(app.devPath))
		.pipe(gulp.dest(app.proPath))
		.pipe($.connect.reload());

});

gulp.task("json", function() {
	gulp.src(app.srcPath + "data/**/*.json")
		.pipe(gulp.dest(app.devPath + "data"))
		.pipe(gulp.dest(app.proPath + "data"))
		.pipe($.connect.reload());
});
/*$.less 将导入的less文件编译成css文件
 * $.cssmin 压缩css文件
 * 
 * $.concat('index.js') 将导入的文件合并到一个文件里
 * $.uglify 将文件压缩
 * $.imagemin  图片压缩 
 * $.connect.server({}) 配置服务器端数据 
 * $.connect.reload() 重新加载服务器连接（会刷新浏览器页面）
 * 
 * */
gulp.task("less", function() {
	gulp.src(app.srcPath + "style/index.less")
		.pipe($.less())
		.pipe(gulp.dest(app.devPath + "css"))
		.pipe($.cssmin())
		.pipe(gulp.dest(app.proPath + "css"))
		.pipe($.connect.reload());
});

gulp.task("js", function() {
	gulp.src(app.srcPath + "script/**/*.js")
		.pipe($.concat("index.js"))
		.pipe(gulp.dest(app.devPath + "js"))
		.pipe($.uglify())
		.pipe(gulp.dest(app.proPath + "js"))
		.pipe($.connect.reload());
});

gulp.task("image", function() {
	gulp.src(app.srcPath + "image/**/*")
		.pipe(gulp.dest(app.devPath + "image"))
		.pipe($.imagemin())
		.pipe(gulp.dest(app.proPath + "image"))
		.pipe($.connect.reload());
});
/*总任务执行上面所有复制操作*/
gulp.task("build", ["lib", "html", "less", "json", "js", "image"]);

/*清除操作*/
gulp.task("clean", function() {
	gulp.src([app.devPath, app.proPath])
		.pipe($.clean());

});

/*watch 监听文件变化 ，[]内为变化时要执行的操作*/
gulp.task("serve", ["build"], function() {
	$.connect.server({
		root: [app.devPath],
		livereload: true,
		port: 8090
	});
	open("http://localhost:8090");

	gulp.watch("bower_components/**/*", ["lib"]);
	gulp.watch(app.srcPath + "**/*.html", ["html"]);
	gulp.watch(app.srcPath + "data/**/*.json", ["json"]);
	gulp.watch(app.srcPath + "style/index.less", ["less"]);
	gulp.watch(app.srcPath + "script/**/*.js", ["js"]);
	gulp.watch(app.srcPath + "image/**/*", ["image"]);

});
/*命令行输入gulp时，默认进行的操作*/
gulp.task("default", ["serve"]);