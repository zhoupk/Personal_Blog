var newtypeModule=function(){};

newtypeModule.prototype.newtypeList=function(){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('select *,(select count(*) from news n where n.typeid=t.typeid) as count from type t',function(err,results,fields){
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


newtypeModule.prototype.insert=function(tname,parent_typeid){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('insert into type values(default,?,?,1)',[tname,parent_typeid],function(err,results,fields){
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

newtypeModule.prototype.del=function(id,n){
	var emitter=new events.EventEmitter();
	
	dataSource.getcon().on("success",function(connection){
		var sql;
		if(n==0){
			sql='delete from type where typeid=?';
		}else if(n==1){
			sql='delete from news where nid=?';
		}else if(n==2){
			sql='delete from comment where cid=?'
		}
		connection.query(sql,[id],function(err,results,fields){
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
			connection.release();
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
			connection.release();
		}).on("error",function(err){
			emitter.emit("error",err);
			connection.release();
		});
		return emitter;
	});
	return emitter;
};
newtypeModule.prototype.newsList_hotlist=function(){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){ 
		var sql="select n.nid,n.title,n.readCount,t.parent_typeid from news n,type t where n.typeid=t.typeid order by readCount desc limit 0,6";
		connection.query(sql,function(err,results,fields){
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

newtypeModule.prototype.commentAdd=function(cname,ccontent,nid,parent_id){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){ 
		var sql="insert into comment values(default,?,?,?,?,now())";
		connection.query(sql,[cname,ccontent,nid,parent_id],function(err,results,fields){
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
newtypeModule.prototype.commentlist=function(flag,nid){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		var sql;
		if(flag==0){
			sql="select c.*,substring(c.caddtime,1,20) as time,n.title,n.nid from comment c,news n where c.nid=n.nid";
		}else if(flag==1){
			sql="select *,substring(caddtime,1,20) as time from comment where nid=?";

		}else if(flag==2){
			sql="select n.title,n.nid from comment c,news n where c.nid=n.nid group by c.nid";
		}
		
		connection.query(sql,[nid],function(err,results,fields){
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
			connection.release();
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
		var sql_readCout_add="update news set readCount=readCount+1 where nid=?";
		var sql=sql_nid+";"+sql_readCout_add;
		connection.query(sql,[nid,nid],function(err,results,fields){
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

newtypeModule.prototype.newsList_byTitle=function(flag,title){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		var sql_title="select n.*,a.admin_name as aname,t.typename as tname,t.parent_typeid as ptype,substring(n.addtime,1,20) as time from news n,admin a,type t where n.admin_id=a.admin_id and n.typeid=t.typeid and n.title like ? ";
		connection.query(sql_title,["%"+title+"%"],function(err,results,fields){
			if(err){
				return emitter.emit("error",err);
			}
			if(flag==0){
						for(var i=0;i<results.length;i++){
						var trimed=trimhtml(results[i].content,{limit:130});
						strre=trimed.html;
						results[i].content=strre;
					}
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

newtypeModule.prototype.newInsert=function(title,content,aid,typeid){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('insert into news values(default,?,?,?,now(),?,0)',[title,content,aid,typeid],function(err,results,fields){
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

newtypeModule.prototype.getNewsByTid=function(tid){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('select * from news where typeid=?',[tid],function(err,results,fields){
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

newtypeModule.prototype.getNewsByNid=function(nid){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('select n.*,t.typename from news n,type t where n.typeid=t.typeid and nid=?',[nid],function(err,results,fields){
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

newtypeModule.prototype.newtypeUpdate=function(tid,ptype,parentid){
	var emitter=new events.EventEmitter();
	dataSource.getcon().on("success",function(connection){
		connection.query('update type set typename=?,parent_typeid=? where typeid=?',[ptype,parentid,tid],function(err,results,fields){
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
	return new newtypeModule();
};