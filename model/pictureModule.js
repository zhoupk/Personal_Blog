var pictureModule=function(){};

pictureModule.prototype.list=function(){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('select *,substring(addtime,1,20) as time from images i,photos p where i.pid=p.pid ',function(err,results,fields){
			if(err){
				return emitter.emit("error",err);
			}
			emitter.emit("success",results,fields);
			connection.release();
		}).on("error",function(err){
			emitter.emit("error",err);
			connection.release();
		});
		return emitter;
	});
	return emitter;
};

pictureModule.prototype.photoList=function(){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('select *,substring(paddtime,1,20) as time from photos',function(err,results,fields){
			if(err){
				return emitter.emit("error",err);
			}
			emitter.emit("success",results,fields);
			connection.release();
		}).on("error",function(err){
			emitter.emit("error",err);
			connection.release();
		});
		return emitter;
	});
	return emitter;
};

pictureModule.prototype.insert=function(imgname,imgurl,pid){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('insert into images values(default,?,?,now(),?)',[imgname,imgurl,pid],function(err,results,fields){
			if(err){
				return emitter.emit("error",err);
			}
			emitter.emit("success",results,fields);
			connection.release();
		}).on("error",function(err){
			emitter.emit("error",err);
			connection.release();
		});
		return emitter;
	});
	return emitter;
};

pictureModule.prototype.photoinsert=function(pname){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('insert into photos values(default,?,now())',[pname],function(err,results,fields){
			if(err){
				return emitter.emit("error",err);
			}
			emitter.emit("success",results,fields);
			connection.release();
		}).on("error",function(err){
			emitter.emit("error",err);
			connection.release();
		});
		return emitter;
	});
	return emitter;
};

pictureModule.prototype.photo_show=function(){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query(' select *,substring(p.paddtime,1,20) as time from images i,photos p where i.pid=p.pid group by pname;',function(err,results,fields){
			if(err){
				return emitter.emit("error",err);
			}
			emitter.emit("success",results,fields);
			connection.release();
		}).on("error",function(err){
			emitter.emit("error",err);
			connection.release();
		});
		return emitter;
	});
	return emitter;
};

pictureModule.prototype.picture_show=function(pid){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('select * from images i,photos p where i.pid=p.pid and p.pid=?;',[parseInt(pid)],function(err,results,fields){
			if(err){
				return emitter.emit("error",err);
			}
			emitter.emit("success",results,fields);
			connection.release();
		}).on("error",function(err){
			emitter.emit("error",err);
			connection.release();
		});
		return emitter;
	});
	return emitter;
};

pictureModule.prototype.photoUpdate=function(id,pname){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('update photos set pname=? where pid=?',[pname,id],function(err,results,fields){
			if(err){
				return emitter.emit("error",err);
			}
			emitter.emit("success",results,fields);
			connection.release();
		}).on("error",function(err){
			emitter.emit("error",err);
			connection.release();
		});
		return emitter;
	});
	return emitter;
};

module.exports=function(){
	return new pictureModule();
};
