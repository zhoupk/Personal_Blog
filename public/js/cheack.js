(function() {
	$.validata = {};
	$.validata.isempty = function(str) {
		var reg = /\S/;
		return reg.test(str);
	}
	$.validata.isemail = function(str) {
		var reg = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
		return reg.test(str);
	}

	$.fn.loginalert = function(type, msg) {
		var alert_type;
		var title;
		if (type == "warning") {
			alert_type = "alert-warning";
			title = "警告:";
		} else if (type == "error") {
			alert_type = "alert-danger";
			title = "错误:";
		} else if (type == "success") {
			alert_type = "alert-success";
			title = "成功:";
		}
		var html = "<div class='alert " + alert_type + "'><button type='button' class='close' data-dismiss='alert' aria-hidden='true'>x</button><strong>" + title + "</strong>" + msg + "</div>";
		$(this).prepend(html).find(".alert").delay(1000 * 3).fadeOut(function() {
			$(this).remove();
		});
	}

	$.blog_ajax = function(option) {
		return $.ajax(option).fail(function(obj, status, err) {
			if (obj.status == "500") {
				window.location.href = "500.html";
			} else if (obj.status == "404") {
				window.location.href = "404.html";
			} else {
				$("#errorinfo").loginalert("error", "服务器出错,正在处理");
			}
		});
	};

	$.pageChange = function(html) {
		$("#adminMain").find(".panel").removeClass("pt-page-rotateSlideIn").addClass("pt-page-rotateSlideOut");
		setTimeout(function() {
			$("#adminMain").html(html).find(".panel").addClass("pt-page-rotateSlideIn");
		}, 1000);
	};

	$.modal = function(title, content) {
		$("#modalInfo #modalInfotitle").html(title);
		$("#modalInfo #modalInfocontent").html("<p>" + content + "</p>");
		$("#modalInfo").modal();
	};
	$.pencil=function(){
		$("#adminMain .glyphicon-pencil").click(function(){
		var arr=new Array();
		
		for(var i=0;i < $(this).parents("tr").find("td").length;i++){
			arr[i]=$(this).parents("tr").find("td")[i];
			var inner=arr[i].innerHTML.replace(/(^\s*)|(\s*$)/g, "");
			inner="<input type='text' name='td"+i+"' value='"+inner+"'>";
			arr[i].innerHTML=inner;	
		}
		$(this).parent().find("div").attr("style","display:block");
		$(this).remove();
		
	});
	};
	
	(function(window, factory) {
		factory(window);
	})(window, function(window) {
		window.M = {};

		M.adminList = function() {
			$.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/admin/admin/list",
				dataType: "json"
				
			}).done(function(results) {
				var html = ejs.render($("#adminList").html(), {
					users: results
				});
				$.pageChange(html);
			});
		};

		M.newtypeList = function() {
			$.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/admin/news/newtypeList",
				dataType: "json"
				
			}).done(function(types) {
				var html = ejs.render($("#newtypeList").html(), {
					type: types
				});
				$.pageChange(html);
			});
		};
M.newUpdatelist = function(data) {
			$.blog_ajax({
				type: "post",
				url: "/admin/news/newUpdatelist",
				data:data,
				dataType: "json"
				
			}).done(function(result) {
				var html = ejs.render($("#newUpdate").html(), {
					results: result
				});
				$.pageChange(html);
			});
		};
		M.newsList = function(data) {
			$.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/admin/news/newsList",
				data: data,
				dataType: "json"
			}).done(function(page) {
				var html = ejs.render($("#newsList").html(), {
					page: page
				});
				$.pageChange(html);
			});
		};
		M.commentList = function() {
			$.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/admin/news/commentList", 
				dataType: "json"
			}).done(function(results) {
				var html = ejs.render($("#commentList").html(), {
					comments: results
				});
				$.pageChange(html);
			});
		};

		M.adminUpdate = function(data) {
			return $.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/admin/admin/adminUpdate",
				data: data,
				dataType: "json"
			});
		};
		M.newtypeUpdate = function(data) {
					return $.blog_ajax({
						timeout:100000,
						type: "post",
						url: "/admin/news/newtypeUpdate",
						data: data,
						dataType: "json"
					});
				};
		M.photoUpdate= function(data) {
					return $.blog_ajax({
						type: "post",
						url: "/admin/picture/photoUpdate",
						data: data,
						dataType: "json"
					});
				};		
		M.imgList = function() {
			$.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/admin/picture/imgList",
				dataType: "json"
			}).done(function(result) {
				var html = ejs.render($("#imgList").html(), {
					imgs: result
				});
				$.pageChange(html);
			});
		};

		M.photoList = function() {
			$.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/admin/picture/photoList",
				dataType: "json"
			}).done(function(result) {
				var html = ejs.render($("#photoList").html(), {
					photos: result
				});
				$.pageChange(html);
			});
		};
		M.commentGetbytitle = function(data) {
			$.blog_ajax({
				type: "post",
				url: "/html/commentGetbytitle",
				dataType: "json",
				data:data
			}).done(function(result) {
				var html = ejs.render($("#comment_content").html(), {
					comments: result
				});
				$("#theonecomment").html(html);
			});
		};
		
		M.commentinput = function() {
			var html = ejs.render($("#comment_input").html());
			$("#commentinput").html(html);
		};
		M.commentcontent = function() {
			$.blog_ajax({
				
				type: "post",
				url: "/html/commentcontent",
				dataType: "json"
				
			}).done(function(results) {
				var html = ejs.render($("#comment_content").html(), {
					comments: results
				});
				$("#commentcontent").html(html);
			});
		};
		M.commentDel = function(data) {
			return $.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/admin/news/commentDel",
				data: data,
				dataType: "json"
				
			});
		};
		M.searchinner = function() {
			var html = ejs.render($("#searchmodel").html());
			$("#searchinner").html(html);
		};
		M.hotlistinner = function() {
			$.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/html/hotlist",
				dataType: "json"
			}).done(function(results) {
				var html = ejs.render($("#hotlist").html(), {
					contents: results
				});
				$("#hotcontent").html(html);
			});
		};
		M.getimgName = function() {
			return $.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/admin/picture/photoList", 
				dataType: "json"
			});
		};
		M.getType = function() {
			return $.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/admin/news/newtypeList",
				dataType: "json"
			});
		};

		M.loginOut = function() {
			return $.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/login/loginOut",
				dataType: "json"
				
			});
		};


		M.adminAdd = function(data) {
			return $.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/admin/admin/addAdminer",
				data: data,
				dataType: "json"
				
			});
		};

		M.adminCheck = function(data) {
			return $.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/admin/admin/adminCheck",
				data: data,
				dataType: "json"
			
			});
		};

		M.adminDel = function(data) {
			return $.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/admin/admin/adminDel",
				data: data,
				dataType: "json"
				
			});
		};

		M.photoAdd = function(data) {
			return $.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/admin/picture/photoAdd",
				data: data,
				dataType: "json"
				
			});
		};

		M.newtypeAdd = function(data) {
			return $.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/admin/news/newtypeAdd",
				data: data,
				dataType: "json"
				
			});
		};

		M.newtypeDel = function(data) {
			return $.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/admin/news/newtypeDel",
				data: data,
				dataType: "json"
			
			});
		};

		M.newAdd = function(data) {
			return $.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/admin/news/newAdd",
				data: data,
				dataType: "json"
				
			});
		};

		M.newDel = function(data) {
			return $.blog_ajax({
				timeout:100000,
				type: "post",
				url: "/admin/news/newDel",
				data: data,
				dataType: "json"
				
			});
		};

		M.commentAdd = function(data) {
			return $.blog_ajax({
			
				type: "post",
				url: "/html/commentAdd",
				data: data,
				dataType: "json"
			
			});
		};
	});

	$.cookie = {};
	$.cookie.getCookie = function(name) {
		var cookie = decodeURIComponent(decodeURIComponent(document.cookie));
		var index = cookie.indexOf(name);
		if (index == -1) {
			return false;
		}
		var start = index + name.length + 1;
		var end = cookie.indexOf(";", start);
		end = end == -1 ? cookie.length : end;
		return cookie.slice(start, end);
	}
})()