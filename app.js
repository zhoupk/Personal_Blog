//引入第三方模块
var express=require("express");
var bodyparser=require("body-parser");
var session = require("express-session");
var mysql = require("mysql");
var path=require("path");
var events=require("events");
var log4js=require("log4js");

//将模块放到全局
global.log=log4js.getLogger("logInfo");
global.mysql=mysql;
global.events=events;
global.rootPath=__dirname;

//引入自定义模块
var util=require("./util/util.js");
global.info=util.loadConfig("info");//错误配置信息


//加载日志配置文件
log4js.configure("config/log4js.json");

//配置服务器
var app=express();

//配置post请求
app.use(bodyparser.urlencoded({
	extended: false
}));
//使用session中间件
app.use(session({
	secret: "!@34",
	cookie: {
		maxAge: 1000 * 60 * 60
	},
	resave: true,
	saveUninitialized: false,
	rolling: true
}));

//设置静态文件
app.use(express.static("public"));

//设置首页
app.get("/", function() {
	res.redirect("index.html");
});

//设置404错误页面
app.use(function(req, res, next) {
  res.status(404).redirect("404.html");
});

//设置500错误页面
app.use(function(err, req, res, next) {
  console.error(err.stack);
  log.error(err.stack);
  res.status(500).redirect("500.html");
});

//设置错误守护
process.on("uncaughtException",function(err){
	console.log(err.stack);
	log.error(err.stack);
});

//开启服务器
var server = app.listen(80, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('服务器开启成功 http://%s:%s', host, port);
});