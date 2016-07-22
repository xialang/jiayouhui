jQuery(function($){
	var $back = $('#back');
	var $tishi = $("#tishi");
	var $mima = $("#mima");
	var yongHuK  = $("#haoma1");
	var kaiguan = false;
	var oldcookie = document.cookie;
	var vip = "";
	var num;
	console.log($mima[0],oldcookie);
	
//判断是否已经注册
$("#haoma1").blur(function(){
	num = $("#haoma1").val();console.log(num);
	//判断格式是否正确
	var regnum = /^(135)([\d]{7})$/;
	if(!regnum.test(num)){
		$tishi.html("输入有误哦！");
		return false;
	}else{
		//判断是否已经注册
		$.each(oldcookie.split("; "),function(idx,val){
			if(val.split("=")[0]==num){
				kaiguan = true;
				vip = JSON.parse(val.split("=")[1]);
			}
		})
	}
	//没有注册则提示	
	if(!kaiguan){
		$tishi.html("您还没注册哦！")
	}
})

$("#denLu").click(function(e){
	console.log(kaiguan)
	if(kaiguan && $("#checkes").prop("checked")){
		$mima.val(vip.mima);
		
		//快速登录跳转
		document.cookie='yonghu='+num+"已登录; path/";
		location.href="../index.html";
	}else if($mima.val()==vip.mima){
		
		//非快速登录
		document.cookie='yonghu='+num+"已登录; path/";
		location.href="../index.html";
	}
	
	e.preventDefault();
	
})
//快速登录



/*	$("#haoma1").blur(function(){
		var kaiguan = false;
		if(oldcookie){
			$.each(oldcookie.split("; "),function(idx,val){
				if(num == val.split("=")[0]){
					kaiguan = true;
				};
			});
		}
		//如果已经注册
		if(kaiguan){
			$.each(oldcookie,function(idx,val){
				
				if(num == val.split("=")[0]){
					$mima.val(JSON.parse(val.split("=")[1]).mima);console.log(JSON.parse(val.split("="))[1]);
					console.log(JSON.parse(val.split("=")[1]).mima)
					return false;
				}
			})
		}else{
			$tishi.text("您还没注册哦").addClass("tishi")
		}
	})*/
	
	
	//遍历cookie;判断是否已注册
	
	
	
	
	
	
	/*================点击返回顶部================================================================================================*/
	
	$(window).on('scroll',function(){
		var nscrollTop = $(window).scrollTop();
		nscrollTop>300?$back.show():$back.hide();
	});
	/*===========点击返回顶部==========*/
	$('#backnav').on('click',function(e){
	
		$back[0].timer = setInterval(function(){
			
			var nscrollTop = $(window).scrollTop()-50;
			
				$(window).scrollTop(nscrollTop);
				if(nscrollTop<=0){clearInterval($back[0].timer)};
		},10)
		e.preventDefault();
	});	
	
	
	
	
})




