jQuery(function($){
	$(".smallPic").on('click','img',function(){
		var img = $('<img />').attr("src",$(this).attr("src"));
		$(".bigPic").html(img);
		console.log(img[0],$(this).attr("src"),$(".bigPic")[0])
	})
	
	$(".guowunav").on("click","li",function(){
		var that = $(this);
		//当前高亮；
		that.siblings().removeClass("active");
		that.addClass("active");
		
		
		//切换页面
		$(this).parent().siblings().removeClass("show").eq(that.index()-1).addClass("show");
		
	})
	
	/*================点击返回顶部================================================================================================*/
	var $back = $('#back');	
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
	
	/*=======================点击数量加减=================*/
	
	var $input = $("#shuLiang");
	$input.next().click(function(){
		var num = $input.val();
		if(num==""){
			$input.val(1);
		}else{
			num++;
			$input.val(num);
		}
	})
	
	$input.prev().click(function(){
		var num = $input.val();
		if(num=="" || num<=0){
			$input.val(0);
		}else{
			num--;
			$input.val(num);
		}
	})
	
	

	/*==========存入cookie============*/
	var val= {};
	var current;
	var num=0;
	val.name = "haisheng";
	var kaiguan = false;
	//document.cookie = 'haisheng={"name":"海参","num":"3","danjia":"335","src":"../css/img/f1c71a771c0146ea8504a2dd6ade7bf5.jpg"}';
	$("#jiaru").click(function(){
		var oldcookie = document.cookie;
		
	//获取oldcookie;判断是否已有
		
		
		//console.log(oldcookie);
		if(oldcookie){
			$.each(oldcookie.split("; "),function(idx,val){
				if(val.split("=")[0] == "haisheng"){
					
					//存储已存在的cookie;方便累积
					current = JSON.parse(val.split("=")[1]);
					shuliang = Number(current.num);
					kaiguan = true;
					
					//console.log(kaiguan,shuliang)
				};
					
			})
		}
		var num = Number($input.val());
		//如果已存在就累积
		if(kaiguan){
			num+=shuliang;
			val.num = num;
		}else{
			val.num = num;
		}
			val.danjia = $("#danjia").text().substring(1); 
			val.miaoshu = $("#miaoshu").text();
			val.src = $("#src").attr("src");
			_cookie = "haisheng"+"="+JSON.stringify(val);
			document.cookie = _cookie;
			//console.log(document.cookie)
	});
	
	/*==========点击购买=============*/
	$("#guomai").click(function(){
		location.href="car.html";
	})
	
	/*****************放大镜效果**********/
	//console.log($(".bigPic").offsetLeft());
	var $bgpic = $(".bigPic");
	//划入生成
	var $fd;
	var touming;
	var offset = $bgpic.offset();
	var big;
	//console.log(offset.left,offset.top)
	$bgpic.mouseenter(function(){
		
	var src = $bgpic.children("img").attr("src");
		$fd = $("<div/>").css({
					width:300,
					height:300,
					position:"absolute",
					left:640,
					top:300,
					background:"#0ff",
					overflow:"hidden"
				}).appendTo("body");
		big = $("<img/>").attr("src",src).css({
			width:920,
			height:920,
			position:"absolute",
		}).appendTo($fd);
		//生成透明层
		touming  = $("<div/>").css({
			width:50,
			height:50,
			opacity:.5,
			background:"#ccc",
			fontSize:100,
			position:"absolute"
		}).appendTo($bgpic);
		$(document).mousemove(function(e){
			//鼠标跟随，
			var _left = e.pageX-offset.left+75;
			var _top = e.pageY-offset.top+12;
			touming.css({
				left:_left,
				top:_top
			});
			big.css({
				left:-_left,
				top:-_top
			})
		});
	}).mouseleave(function(){
		
		//移开删除
		$fd.remove();
		touming.remove();
	});
		
	
	
	
});







/*1。效果，图片闪烁效果，

	大范围效果，难点：如何控控制大范围

2，回到顶部，应用stop属性，

	超出一定范围隐藏，所有页面都有

3.轮播图，

	应用插件，难点修改样式，

	更改插件js 代码，


	插件应用的是克隆技术，

	为了符合页面要求应该使用生成技术

4.排序：
	主要用到服务器json数据请求，

		难点： 如何排序 两层循环，外循环循环数组，内循环控制数据；

		碰到的问题：当遇到相同的数据会重复执行，导致页面输出重复的商品，

		解决：每匹配到一个，就重置一个，保证匹配不重复
		
5.购物车：

	主要用到，存入获取cookie数据技术，元素生成技术，

	生成的元素和样式相冲突，调整很麻烦*/

