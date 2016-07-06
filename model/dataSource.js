var dataSource=function(){
	this.pool=mysql.createPool({
		connectionLimit : 20,
  		host     : '127.0.0.1',
 		user     : 'root',
  		password : '',
  		database : 'personal_blog',
  		multipleStatements: true
});
};

dataSource.prototype.getcon=function(){
	var emitter=new events.EventEmitter();
	this.pool.getConnection(function(err, connection){
		if(err){
			return emitter.emit("error",err);
		}else{
			emitter.emit("success",connection);
		}
		
	});
	return emitter;
};

module.exports=function(){
	return new dataSource();
}

