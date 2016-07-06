var express=require("express");
var router=express.Router();

router.all("/index",function(req,res,next){
	res.render("admin/admin.html",{username:req.session.admin.admin_name});
});

router.post("/list",function(req,res,next){
	adminModule.list().on("success",function(results,fields){
		//这是服务器端渲染的做法,将页面渲染后再发给客户端,优点是易于搜索引擎搜索,缺点是给服务器端造成压力
		res.json(results);
	}).on("error",function(err){
		return next(err);
	});
});

router.post("/addAdminer",function(req,res,next){
	adminModule.insert(req.body.aname,req.body.pwd).on("success",function(results,fields){
		if(results.insertId){
			res.json(info.message.success);
		}else{
			res.json(info.error.addadminererror);
		}	
	}).on("error",function(err){
		return next(err);
	});
});

router.post("/adminCheck",function(req,res,next){
	adminModule.check(req.body.aname).on("success",function(results,fields){
		if(results.length==0){
			res.json(info.message.success);
		}else{
			res.json(info.error.checkerror);
		}	
	}).on("error",function(err){
		return next(err);
	});
});

router.post("/adminDel",function(req,res,next){
	adminModule.del(req.body.uid).on("success",function(results,fields){
		if(results.affectedRows==1){
			res.json(info.message.success);
		}else{
			res.json(info.error.adminDelError);
		}	
	}).on("error",function(err){
		return next(err);
	});
});

router.post("/adminUpdate",function(req,res,next){
	adminModule.adminUpdate(req.body.updateid,req.body.uname,req.body.upassword).on("success",function(results,fields){
			res.json(info.message.success);
	}).on("error",function(err){
		return next(err);
	});
});
module.exports=router;