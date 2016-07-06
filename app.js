//引入第三方模块
var express=require("express");
var bodyparser=require("body-parser");
var session = require("express-session");
var mysql = require("mysql");
var path=require("path");
var events=require("events");
var log4js=require("log4js");
var ejs=require("ejs");
var captchapng = require("captchapng");
var wechat=require("wechat");
var multer=require("multer");
var trimhtml=require("trim-html");
var upload = multer({ dest: 'uploads/' });//创建一个临时文件夹用于存储图片
//将模块放到全局
global.log=log4js.getLogger("logInfo");
global.mysql=mysql;
global.events=events;
global.rootPath=__dirname;
global.wechat=wechat;
global.trimhtml=trimhtml;
global.captchapng=captchapng;


//引入自定义模块
var util=require("./util/util.js");
global.util=util;
global.info=util.loadConfig("info");//错误配置信息

var loginRouter=require("./router/loginRouter.js");
var adminRouter=require("./router/adminRouter.js");
var pictureRouter=require("./router/pictureRouter.js");
var newtypeRouter=require("./router/newtypeRouter.js");
var apiRouter=require("./router/apiRouter.js");
var htmlRouter=require("./router/htmlRouter.js");
var wechatmodule=require("./router/wechat.js");

global.dataSource=require("./model/dataSource.js")(); //数据库连接
global.adminModule=require("./model/adminModule.js")(); //管理员数据库语句的执行
global.newtypeModule=require("./model/newtypeModule.js")();
global.pictureModule=require("./model/pictureModule.js")();//博文类型数据库语句的执行-----dataSource+adminMoudle+adminRouter=操作数据库并返回成功与否结果
//加载日志配置文件
log4js.configure("config/log4js.json");

//配置服务器
var app=express();

//设置模板引擎,adminUser.html为模板,adminRouter.js获取数据库数据后,用
//res.render("admin/adminUser.html",{users:results});将模板与数据绑定
ejs.delimiter="$";//定义边界符
app.set("views",path.join(__dirname,"views"));//告诉服务器模板文件放在rootPath+views文件夹中
app.engine("html",ejs.__express);//注册html模板引擎
app.set("view engine","html");//将模版引擎设置为html

//配置post请求
app.use(bodyparser.json({limit: '50mb'}));
app.use(bodyparser.urlencoded({
	limit: '50mb',
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

//路由
app.use("/login",loginRouter);
app.use("/admin",util.islogin);
app.use("/admin/admin",adminRouter);
app.use("/admin/news",newtypeRouter);
app.use("/admin/picture",pictureRouter);
app.use("/html",htmlRouter);
//手机，App接口路由
app.use("/API",apiRouter);
//微信路由
app.use(express.query());
app.use("/wechat",wechatmodule);

app.post('/upfiles', upload.single('upfile'),util.upfile);//upload.single('upfile')确定是name='upfile'的图片被上传了.utile.upfile函数实现图片放置指定目录并删除临时目录uploads中的图片

//设置首页
app.get("/", function(req,res,next){
	newtypeModule.newsList_order_time(0,0,4).on("success",function(results,fields){
		res.render("html/index.html",{contents:results});
	}).on("error",function(err){
		return next(err);
	});
});

//设置404错误页面
app.use(function(req, res, next) {
	if(req.xhr){
		res.status(404).end();
	}else{
		res.status(404).redirect("/404.html");
	}
  
});

//设置500错误页面
app.use(function(err, req, res, next) {
  console.error(err.stack);
  log.error(err.stack);
  if(req.xhr){
		res.status(500);
	}else{
		 res.status(500).redirect("/500.html");
	}
 
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



