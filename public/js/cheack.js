(function(){
	$.validata={};
	$.validata.isempty=function(str){
		var reg=/\S/;
		return reg.test(str);
	}
	$.validata.isemail=function(str){
		var reg=/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		return reg.test(str);
	}
	
	$.fn.loginalert=function(type,msg){
		var alert_type;
		var title;
		if(type=="warning"){
			alert_type="alert-warning";
			title="警告:";
		}else if(type=="error"){
			alert_type="alert-danger";
			title="错误:";
		}else if(type=="success"){
			alert_type="alert-success";
			title="成功:";
		}
		var html="<div class='alert "+ alert_type +"'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>x</button><strong>"+title+"</strong>"+msg+"</div>";
		$(this).prepend(html).find(".alert").delay(1000*3).fadeOut(function(){
			$(this).remove();
		});
	}
	
	$.blog_ajax=function(option){
	    return $.ajax(option).fail(function(obj,status,err){
			if(obj.status=="500"){
				window.location.href="500.html";
			}else if(obj.status=="404"){
				window.location.href="404.html";
			}else{
					$("#errorinfo").loginalert("error","服务器出错,正在处理");
			}
		});
	};
	
	$.htmlinner=function(html){
		$("#typeoptionlist").html(html);
	};
	
	$.pageChange=function(html){
		$("#adminMain").find(".panel").removeClass("pt-page-rotateSlideIn").addClass("pt-page-rotateSlideOut");
		setTimeout(function(){$("#adminMain").html(html).find(".panel").addClass("pt-page-rotateSlideIn");},1000);
	};
	
	$.modal=function(title,content){
		$("#modalInfo #modalInfotitle").html(title);
		$("#modalInfo #modalInfocontent").html("<p>"+content+"</p>");
		$("#modalInfo").modal();
	};
	
	(function(window,factory){
		factory(window);
	})(window,function(window){
		window.M={};
		
		M.adminList=function(){
			$.blog_ajax({
			type:"post",
			url:"/admin/admin/list",
			dataType:"json"
			}).done(function(results){
				var html=ejs.render($("#adminList").html(),{users:results});
				$.pageChange(html);		
			});
		};
		
		M.newtypeList=function(){
			$.blog_ajax({
			type:"post",
			url:"/admin/news/newtypeList",
			dataType:"json"
			}).done(function(types){
				var html=ejs.render($("#newtypeList").html(),{type:types});
				$.pageChange(html);		
			});
		};
		
		M.newsList=function(data){
			$.blog_ajax({
			type:"post",
			url:"/admin/news/newsList",
			data:data,
			dataType:"json"
			}).done(function(page){
				var html=ejs.render($("#newsList").html(),{page:page});
				$.pageChange(html);		
			});
		};
		
		M.adminUpdatelist=function(data){
			$.blog_ajax({
			type:"post",
			url:"/admin/admin/adminUpdatelist",
			data:data,
			dataType:"json"
			}).done(function(result){
				var html=ejs.render($("#adminUpdate").html(),{result:result});
				$.pageChange(html);		
			});
		};
		
		M.imgaddList=function(){
			var html=ejs.render($("#imgAdd").html());
			$.pageChange(html);	
		};
		
		M.getType=function(){
		return	$.blog_ajax({
			type:"post",
			url:"/admin/news/newtypeList",
			dataType:"json"
			});
		};
		
		M.loginOut=function(){
		return	$.blog_ajax({
			type:"post",
			url:"/login/loginOut",
			dataType:"json",
			async:true
		});
		};
		
		
		M.adminAdd=function(data){
		return $.blog_ajax({
			type:"post",
			url:"/admin/admin/addAdminer",
			data:data,
			dataType:"json",
			async:true
		});
		};
		
		M.adminCheck=function(data){
		return	$.blog_ajax({
			type:"post",
			url:"/admin/admin/adminCheck",
			data:data,
			dataType:"json",
			async:true
		});
		};
		
		M.adminDel=function(data){
		return	$.blog_ajax({
			type:"post",
			url:"/admin/admin/adminDel",
			data:data,
			dataType:"json",
			async:true
		});
		};
		
		
		
		M.newtypeAdd=function(data){
		return $.blog_ajax({
			type:"post",
			url:"/admin/news/newtypeAdd",
			data:data,
			dataType:"json",
			async:true
		});
		};
		
		M.newtypeDel=function(data){
		return	$.blog_ajax({
			type:"post",
			url:"/admin/news/newtypeDel",
			data:data,
			dataType:"json",
			async:true
		});
		};
		
		M.newAdd=function(data){
		return $.blog_ajax({
			type:"post",
			url:"/admin/news/newAdd",
			data:data,
			dataType:"json",
			async:true
		});
		};
		
		
	});
	
	$.cookie={};
	$.cookie.getCookie=function(name){
		var cookie=decodeURIComponent(decodeURIComponent(document.cookie));
		var index=cookie.indexOf(name);
		if(index==-1){
			return false;
		}
		var start=index+name.length+1;
		var end=cookie.indexOf(";",start);
		end=end==-1?cookie.length:end;
		return cookie.slice(start,end);
	}
})()
