module.exports=wechat("personal_blog").text(function (message, req, res, next) {
	var message = re
  if(req.message.content=="fuck"){
  	res.reply("funck");
  	res.reply([{
  	title:"点击进入博客",
  	url:"http://120.27.119.46/wechat.html"
  }]);
  }
  
  
}).image(function (message, req, res, next) {
 
}).voice(function (message, req, res, next) {
 
}).video(function (message, req, res, next) {
  
}).shortvideo(function (message, req, res, next) {
 
}).location(function (message, req, res, next) {
  
}).link(function (message, req, res, next) {
 
}).event(function (message, req, res, next) {
 	if(message.event=="subscribe"){
 		res.reply("欢迎来到我的个人博客");
 	}
}).device_text(function (message, req, res, next) {
  
}).device_event(function (message, req, res, next) {
}).middlewarify();
