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
		if(results.length){
			req.page.data=results[0];
		req.page.typedata=results[1];
		res.render("html/qian_hou.html",{pages:req.page});
		}else{
			res.render("html/nosearch.html",{result:{errorsearch:"没有对应内容，敬请期待"}});
		}
		
	}).on("error",function(err){
		return next(err);
	});
});

router.get("/hou/type",util.createPage_byGet,function(req,res,next){
	newtypeModule.newsList_byTypename(0,req.query.type).on("success",function(results,fields){
		if(results){
			req.page.data=results[0];
		req.page.typedata=results[2];
		res.render("html/qian_hou.html",{pages:req.page});
		}
		
	}).on("error",function(err){
		return next(err);
	});
});

router.get("/qian/archive",function(req,res,next){
	newtypeModule.newsList_byNid(req.query.nid).on("success",function(results,fields){
		req.session.nid=req.query.nid;
		res.render("html/archive.html",{contents:results[0][0]});
	}).on("error",function(err){
		return next(err);
	});
});

router.get("/photo",function(req,res,next){
	pictureModule.photo_show().on("success",function(results,fields){
		res.render("html/photo.html",{photos:results});
	}).on("error",function(err){
		return next(err);
	});
});

router.get("/picture",function(req,res,next){
	pictureModule.picture_show(req.query.pid).on("success",function(results,fields){
		res.render("html/picture.html",{pictures:results});
	}).on("error",function(err){
		return next(err);
	});
});

router.get("/hou/archive",function(req,res,next){
	newtypeModule.newsList_byNid(req.query.nid).on("success",function(results,fields){
		req.session.nid=req.query.nid;
		res.render("html/archive.html",{contents:results[0][0]});
	}).on("error",function(err){
		return next(err);
	});
});

router.post("/search",function(req,res,next){
	newtypeModule.newsList_byTitle(0,req.body.search_blog).on("success",function(results,fields){
		if(results.length>0){
			res.render("html/search.html",{pages:results});
		}else{
			console.log(results.length);
			res.render("html/nosearch.html",{result:{errorsearch:"没有找到您要的结果！"}});
		}
	}).on("error",function(err){
		return next(err);
	});
});

router.post("/hotlist",function(req,res,next){
	newtypeModule.newsList_hotlist().on("success",function(results,fields){
		res.json(results);
	}).on("error",function(err){
		return next(err);
	});
});

router.post("/commentcontent",function(req,res,next){
	newtypeModule.commentlist(1,req.session.nid).on("success",function(results,fields){
			res.json(results);
	}).on("error",function(err){
		return next(err);
	});
});
router.post("/commentAdd",function(req,res,next){
	newtypeModule.commentAdd(req.body.cname,req.body.ccontent,req.session.nid,0).on("success",function(results,fields){
		
	}).on("error",function(err){
		return next(err);
	});
});

router.get("/comment",function(req,res,next){
	newtypeModule.commentlist(2).on("success",function(results,fields){
			res.render("html/comment.html",{commenttitles: results});
	}).on("error",function(err){
		return next(err);
	});
});

router.post("/commentGetbytitle",function(req,res,next){
	newtypeModule.commentlist(1,req.body.id).on("success",function(results,fields){
			res.json(results);
	}).on("error",function(err){
		return next(err);
	});
});
module.exports=router;
