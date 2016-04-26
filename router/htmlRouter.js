var express=require("express");
var router=express.Router();

router.get("/qian",util.createPage_byGet,function(req,res,next){
	newtypeModule.newsList_order_time(0,req.page.getStar(),req.page.pageCount).on("success",function(results,fields){
		req.page.totalPage=Math.ceil(results[2][0].count/req.page.pageCount);
		req.page.data=results[0];
		req.page.typedata=results[4];
		res.render("html/qian_hou.html",{pages:req.page});
	}).on("error",function(err){
		return next(err);
	});
});

router.get("/hou",util.createPage_byGet,function(req,res,next){
	newtypeModule.newsList_order_time(0,req.page.getStar(),req.page.pageCount).on("success",function(results,fields){
		req.page.totalPage=Math.ceil(results[3][0].count/req.page.pageCount);
		req.page.data=results[1];
		req.page.typedata=results[5];
		res.render("html/qian_hou.html",{pages:req.page});
	}).on("error",function(err){
		return next(err);
	});
});

router.get("/qian/type",util.createPage_byGet,function(req,res,next){
	newtypeModule.newsList_byTypename(0,req.query.type).on("success",function(results,fields){
		req.page.data=results[0];
		req.page.typedata=results[1];
		res.render("html/qian_hou.html",{pages:req.page});
	}).on("error",function(err){
		return next(err);
	});
});

router.get("/hou/type",util.createPage_byGet,function(req,res,next){
	newtypeModule.newsList_byTypename(0,req.query.type).on("success",function(results,fields){
		req.page.data=results[0];
		req.page.typedata=results[2];
		res.render("html/qian_hou.html",{pages:req.page});
	}).on("error",function(err){
		return next(err);
	});
});

router.get("/qian/archive",function(req,res,next){
	newtypeModule.newsList_byNid(req.query.nid).on("success",function(results,fields){
		res.render("html/archive.html",{contents:results[0]});
	}).on("error",function(err){
		return next(err);
	});
});

router.get("/hou/archive",function(req,res,next){
	newtypeModule.newsList_byNid(req.query.nid).on("success",function(results,fields){
		res.render("html/archive.html",{contents:results[0]});
	}).on("error",function(err){
		return next(err);
	});
});

module.exports=router;
