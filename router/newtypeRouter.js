var express=require("express");
var router=express.Router();

router.post("/newtypeList",function(req,res,next){
	newtypeModule.newtypeList().on("success",function(results,fields){
		res.json(results);
	}).on("error",function(err){
		return next(err);
	});
});

router.post("/newtypeAdd",function(req,res,next){
	newtypeModule.insert(req.body.tname,req.body.parent_typeid).on("success",function(results,fields){
		if(results.insertId){
			res.json(info.message.success);
		}else{
			res.json(info.error.addadminererror);
		}	
	}).on("error",function(err){
		return next(err);
	});
});	
router.post("/newtypeDel",function(req,res,next){
	newtypeModule.del(req.body.tid).on("success",function(results,fields){
		if(results.affectedRows==1){
			res.json(info.message.success);
		}else{
			res.json(info.error.adminDelError);
		}	
	}).on("error",function(err){
		return next(err);
	});
});

router.post("/newsList",util.createPage,function(req,res,next){
	newtypeModule.newsList(req.page.getStar(),req.page.pageCount).on("success",function(results,fields){
		req.page.totalPage=Math.ceil(results[0][0].count/req.page.pageCount);
		req.page.data=results[1];
		res.json(req.page);
	}).on("error",function(err){
		return next(err);
	});
});

router.post("/newAdd",function(req,res,next){
	newtypeModule.newInsert(req.body.ntitle,req.body.ncontent,req.session.admin.admin_id,req.body.ntypeid).on("success",function(results,fields){
		if(results.insertId){
			res.json(info.message.success);
		}else{
			res.json(info.error.addadminererror);
		}	
	}).on("error",function(err){
		return next(err);
	});
});	

module.exports=router;