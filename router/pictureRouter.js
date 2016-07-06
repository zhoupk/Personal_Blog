var express=require("express");
var router=express.Router();

router.post("/imgList",function(req,res,next){
	pictureModule.list().on("success",function(results,fields){
		//这是服务器端渲染的做法,将页面渲染后再发给客户端,优点是易于搜索引擎搜索,缺点是给服务器端造成压力
		res.json(results);
		
	}).on("error",function(err){
		return next(err);
	});
});


router.post("/photoList",function(req,res,next){
	pictureModule.photoList().on("success",function(results,fields){
		//这是服务器端渲染的做法,将页面渲染后再发给客户端,优点是易于搜索引擎搜索,缺点是给服务器端造成压力
		res.json(results);
		
	}).on("error",function(err){
		return next(err);
	});
});


router.post("/photoAdd",function(req,res,next){
	console.log(req.body.pname);
	console.log("123");
	pictureModule.photoinsert(req.body.pname).on("success",function(results,fields){
		if(results.insertId){
			res.json(info.message.success);
		}else{
			res.json(info.error.imagesAddError);
		}	
	}).on("error",function(err){
		return next(err);
	});
});

router.post("/photoUpdate",function(req,res,next){
	pictureModule.photoUpdate(req.body.updateid,req.body.pname).on("success",function(results,fields){
			res.json(info.message.success);
	}).on("error",function(err){
		return next(err);
	});
});

module.exports=router;