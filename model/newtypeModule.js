var newtypeModule=function(){};

newtypeModule.prototype.newtypeList=function(){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('select *,(select count(*) from news n where n.typeid=t.typeid) as count from type t',function(err,results,fields){
			if(err){
				return emitter.emit("error",err);
			}
			
			emitter.emit("success",results,fields);
		}).on("error",function(err){
			emitter.emit("error",err);
			connection.release();
		});
		return emitter;
	});
	return emitter;
};


newtypeModule.prototype.insert=function(tname,parent_typeid){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('insert into type values(default,?,?,1)',[tname,parent_typeid],function(err,results,fields){
			if(err){
				return emitter.emit("error",err);
			}
			emitter.emit("success",results,fields);
		}).on("error",function(err){
			emitter.emit("error",err);
			connection.release();
		});
		return emitter;
	});
	return emitter;
};

newtypeModule.prototype.del=function(tid){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('delete from type where typeid=?',[tid],function(err,results,fields){
			if(err){
				return emitter.emit("error",err);
			}
			emitter.emit("success",results,fields);
		}).on("error",function(err){
			emitter.emit("error",err);
			connection.release();
		});
		return emitter;
	});
	return emitter;
};

newtypeModule.prototype.newsList=function(Star,pageCount){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		var sqlcount="select count(*) as count from news n,admin a,type t where n.admin_id=a.admin_id and n.typeid=t.typeid";
		var sqldata="select n.*,a.admin_name as aname,t.typename as tname from news n,admin a,type t where n.admin_id=a.admin_id and n.typeid=t.typeid limit ?,?";
		var sql=sqlcount+";"+sqldata;
		connection.query(sql,[Star,pageCount],function(err,results,fields){
			if(err){
				return emitter.emit("error",err);
			}
			emitter.emit("success",results,fields);
		}).on("error",function(err){
			emitter.emit("error",err);
			connection.release();
		});
		return emitter;
	});
	return emitter;
};

newtypeModule.prototype.newsList_order_time=function(flag,Star,pageCount){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		var len;
		var strreplace;
		var strend; 
		var sql_qian_data="select n.*,a.admin_name as aname,t.typename as tname,t.parent_typeid as ptype,substring(n.addtime,1,20) as time from news n,admin a,type t where n.admin_id=a.admin_id and n.typeid=t.typeid and t.parent_typeid = 0 order by n.addtime desc limit ?,?";
		var sql_hou_data="select n.*,a.admin_name as aname,t.typename as tname,t.parent_typeid as ptype,substring(n.addtime,1,20) as time from news n,admin a,type t where n.admin_id=a.admin_id and n.typeid=t.typeid and t.parent_typeid = 1 order by n.addtime desc limit ?,?";
		var sqlcount1="select count(*) as count from news n,admin a,type t where n.admin_id=a.admin_id and n.typeid=t.typeid and t.parent_typeid=0";
		var sqlcount2="select count(*) as count from news n,admin a,type t where n.admin_id=a.admin_id and n.typeid=t.typeid and t.parent_typeid=1";
		var sql_type0="select typeid,parent_typeid as pid,typename from type where parent_typeid=0";
		var sql_type1="select typeid,parent_typeid as pid,typename from type where parent_typeid=1";
		var sql=sql_qian_data+";"+sql_hou_data+";"+sqlcount1+";"+sqlcount2+";"+sql_type0+";"+sql_type1;
		connection.query(sql,[Star,pageCount,Star,pageCount],function(err,results,fields){
			if(err){
				return emitter.emit("error",err);
			}
			if(flag==0){
				for(var i=0;i<2;i++){
					len=results[i].length>4?4:results[i].length;
					for(var j=0;j<len;j++){
						var trimed=trimhtml(results[i][j].content,{limit:130});
						strreplace=trimed.html;
						results[i][j].content=strreplace;
					}
				}
				
			}
			emitter.emit("success",results,fields);
		}).on("error",function(err){
			emitter.emit("error",err);
			connection.release();
		});
		return emitter;
	});
	return emitter;
};

newtypeModule.prototype.newsList_byTypename=function(flag,type){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		var sql_type="select n.*,a.admin_name as aname,t.typename as tname,t.parent_typeid as ptype,substring(n.addtime,1,20) as time from news n,admin a,type t where n.admin_id=a.admin_id and n.typeid=t.typeid and t.typename=? order by n.addtime desc";
		var sql_type0="select typeid,parent_typeid as pid,typename from type where parent_typeid=0";
		var sql_type1="select typeid,parent_typeid as pid,typename from type where parent_typeid=1";
		var sql=sql_type+";"+sql_type0+";"+sql_type1;
		connection.query(sql,[type],function(err,results,fields){
			if(err){
				return emitter.emit("error",err);
			}
			if(flag==0){
						for(var i=0;i<results[0].length;i++){
						var trimed=trimhtml(results[0][i].content,{limit:130});
						strre=trimed.html;
						results[0][i].content=strre;
					}
			}
			emitter.emit("success",results,fields);
		}).on("error",function(err){
			emitter.emit("error",err);
			connection.release();
		});
		return emitter;
	});
	return emitter;
};		
newtypeModule.prototype.newsList_byNid=function(nid){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		var sql_nid="select n.*,a.admin_name as aname,t.typename as tname,t.parent_typeid as ptype,substring(n.addtime,1,20) as time from news n,admin a,type t where n.admin_id=a.admin_id and n.typeid=t.typeid and n.nid=?";
		connection.query(sql_nid,[nid],function(err,results,fields){
			if(err){
				return emitter.emit("error",err);
			}
			emitter.emit("success",results,fields);
		}).on("error",function(err){
			emitter.emit("error",err);
			connection.release();
		});
		return emitter;
	});
	return emitter;
};

newtypeModule.prototype.newInsert=function(title,content,aid,typeid){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('insert into news values(default,?,?,?,now(),?)',[title,content,aid,typeid],function(err,results,fields){
			if(err){
				return emitter.emit("error",err);
			}
			emitter.emit("success",results,fields);
		}).on("error",function(err){
			emitter.emit("error",err);
			connection.release();
		});
		return emitter;
	});
	return emitter;
};

newtypeModule.prototype.getNewsByTid=function(tid){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('select * from news where typeid=?',[tid],function(err,results,fields){
			if(err){
				return emitter.emit("error",err);
			}
			emitter.emit("success",results,fields);
		}).on("error",function(err){
			emitter.emit("error",err);
			connection.release();
		});
		return emitter;
	});
	return emitter;
};

newtypeModule.prototype.getNewsByNid=function(nid){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('select * from news where nid=?',[nid],function(err,results,fields){
			if(err){
				return emitter.emit("error",err);
			}
			emitter.emit("success",results,fields);
		}).on("error",function(err){
			emitter.emit("error",err);
			connection.release();
		});
		return emitter;
	});
	return emitter;
};

module.exports=function(){
	return new newtypeModule();
};