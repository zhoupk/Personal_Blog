var express=require("express");
var router=express.Router();

//查看所有资讯类型 
router.all("/newtype",function(req,res,next){
	newtypeModule.newtypeList().on("success",function(results,fields){
		res.send(req.query.cb+'('+JSON.stringify(results)+')');
	}).on("error",function(err){
		return next(err);
	});
});

//根据类型查列表
router.all("/newlist/:tid",function(req,res,next){
	newtypeModule.getNewsByTid(req.params.tid).on("success",function(results,fields){
		res.send(req.query.cb+'('+JSON.stringify(results)+')');
	}).on("error",function(err){
		return next(err);
	});
});

//根据文章编号查文章
router.all("/newdatil/:nid",function(req,res,next){
	newtypeModule.getNewsByNid(req.params.nid).on("success",function(results,fields){
		res.send(req.query.cb+'('+JSON.stringify(results)+')');
	}).on("error",function(err){
		return next(err);
	});
});

module.exports=router;
