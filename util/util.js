var fs=require("fs");
var path=require("path");
exports.loadConfig=function(configName){
	var path=rootPath+"/"+"config/"+configName+".json";
	var data=fs.readFileSync(path);
	return JSON.parse(data);//将json格式的内容转化为String格式
};

exports.islogin=function(req,res,next){
	
	if(!req.session.admin){
		res.redirect("/login.html");
	}else{
		next();
	}
	
};

exports.createPage=function(req,res,next){
	var page={
		"pageCount":4,
		"curPage":1,
		"totalPage":0,
		"pageData":{},
		"getStar":function(){
			return (this.curPage-1)*this.pageCount;
		}
	};
	
	page.curPage=req.body.curPage?req.body.curPage:1;
	req.page=page;
	next();
};

exports.createPage_byGet=function(req,res,next){
	var page={
		"pageCount":2,
		"curPage":1,
		"totalPage":0,
		"pageData":{},
		"getStar":function(){
			return (this.curPage-1)*this.pageCount;
		}
	};
	
	page.curPage=req.query.curPage?req.query.curPage:1;
	req.page=page;
	next();
};


exports.upfile=function(req,res,next){
	console.log(req.file);
	var extname=path.extname(req.file.originalname);
	var imgurl="/upfile/"+new Date().getTime()+extname;
	var frpath= global.rootPath+"/"+req.file.path;
	var fopath=global.rootPath+"/public/upfile/"+new Date().getTime()+extname;
	var fr=fs.createReadStream(frpath);
	var fo=fs.createWriteStream(fopath);
	fr.pipe(fo);
	fs.unlink(frpath,function(err){
		if(err){
			return next(err);
		}
	});
	
	pictureModule.insert(new Date().getTime()+extname,imgurl,req.body.pid).on("success",function(results,fields){
		if(results.insertId){
			res.json(info.message.success);
		}else{
			res.json(info.error.imagesAddError);
		}	
	}).on("error",function(err){
		return next(err);
	});

};

exports.htmloption_del=function(str){
	 var regexstr = /<[^>]*>/; 
	strreplace=Regex.Replace(str, regexstr, string.Empty, RegexOptions.IgnoreCase);
	return strreplace;
}
