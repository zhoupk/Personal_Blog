var adminModule=function(){};

adminModule.prototype.login=function(uname,pwd){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('select * from admin where admin_name=? and admin_password=?',[uname,pwd],function(err,results,fields){
			
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

adminModule.prototype.list=function(){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('select * from admin',function(err,results,fields){
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

adminModule.prototype.insert=function(aname,pwd){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('insert into admin values(default,?,?,0)',[aname,pwd],function(err,results,fields){
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

adminModule.prototype.check=function(aname){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('select * from admin where admin_name=?',[aname],function(err,results,fields){
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

adminModule.prototype.del=function(uid){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('delete from admin where admin_id=?',[uid],function(err,results,fields){
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

adminModule.prototype.adminUpdate=function(uid,uname,upassword){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('update admin set admin_name=?,admin_password=? where admin_id=?',[uname,upassword,uid],function(err,results,fields){
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
	return new adminModule();
};
