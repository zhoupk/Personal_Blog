var express=require("express");
var router=express.Router();

router.post("/",function(req,res,next){
	if(req.body.vcode != req.session.captcha){
		res.json(info.error.vcodeerror);
		res.end();
		return;
	}
	adminModule.login(req.body.username,req.body.password).on("success",function(results,fields){
		if(results.length==0){
			res.json(info.error.loginerror);
		}else{
			req.session.admin=results[0];
			res.json(info.message.success);
		}
	}).on("error",function(err){
		return next(err);
	});
});
router.post("/loginOut",function(req,res,next){
	delete req.session.admin;
	res.redirect(info.message.success);
});
router.get("/captch",function(req,res){
	var num="";
	for(var i = 0; i < 4;i++){
		num+= Math.floor(Math.random()*10); 
	}
	req.session.captcha=num;
	var p = new captchapng(85,35,parseInt(num)); // width,height,numeric captcha
        p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
        p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
		var img = p.getBase64();
        var imgbase64 = new Buffer(img,'base64');
        res.status(200).set('Content-Type','image/png').send(imgbase64).end();
});
module.exports=router;
