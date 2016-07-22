jQuery(function($){
	
	var $box = $(".box")
	var bLE = false;
/*================轮播图=====================================================================================================*/
	$('.focus').arSlide({showSmall:true,showButton:true});
	
	//document.cookie='yonghu={'+1+"}"+"; path/";
	
	/*==========显示登录状态============*/
	var oldcookie = document.cookie;
	var $a = $("#topLogin");
	if(oldcookie){
		$.each(oldcookie.split("; "),function(idx,val){
				var jason = val.split("=");
				if(jason[0]=="yonghu"){
					$a.html(jason[1]);
					bLE = true;
					var time = new Date();
					var timer = new Date(time.setDate(time.getDate()-1));
					
					//登录完成删除cookie;
					document.cookie = 'yonghu={'+1+'}'+"; expires"+"="+timer; 
				};
		})
	}
		
/*===========登录和未登录===========================================================================================*/
	if(bLE){
		$(".yes").removeClass("active");
		$(".no").addClass("active");
	};
	
/*======================图片闪烁的效果======================================================================================*/
	
	$('.shan').mouseover(function(){
		$(this).css('opacity','.5').stop().animate({opacity:1},1000)
	});
	
/*======================live-list无缝轮播==========================================================================================*/
	
	
		
//遍历UL;
var $ul = $box.children().filter('ul');
var now = 0;
var $box = $(".box");

$.each($ul,function() {
	var $list = $(this);
	var next =$(this).next();
	var prev =next.next();
	//点击下一张
	next.click(function(e){
		var len =  $list.children().length/5;
		//获取li的宽度；
		var width = $list.children().eq(0).outerWidth(true);
		now++;
		if(now>=len){
			now = 2;
			$list.css({left:-width*5})
		};
		var nleft =-now*width*5;
		$list.stop().animate({left:nleft});
	
		e.preventDefault();
	})
	//点击上一张
	prev.click(function(e){
		var len =  $list.children().length/5;
		//获取li的宽度；
		var width = $list.children().eq(0).outerWidth(true);
		now--;
		if(now<=0){
			now=len-3;
			$list.css({left:-width*5*(len-2)});
		};
		var nleft =-now*width*5;
		$list.stop().animate({left:nleft});
		e.preventDefault();
	})
	
});
		
		

	

/*================点击返回顶部================================================================================================*/
var $back = $('#back');	
$back.hide();
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
/*==================小轮播==================================================================================================================*/
var $list2 = $(".box2").children().filter("ul");
$.each($list2,function(){
	var $list2 = $(this);
	var $li = $list2.children().filter("li");
	var len = $li.length;
	var now = 0;
	var $p = $("<p/>");
	$list2.css({position:"relative"});
	//console.log(len);
	for(var i=1;i<len+1;i++){
		$("<span/>").addClass("show").text(i).appendTo($p);
	};
	var span = $p.children();
	$p.css({
		position:"absolute",
		bottom:10,
		"text-align":"center",
		width:"100%"		
	}).appendTo($list2);
	//if(len==1){return false};
	$list2.timer = setInterval(function(){
		now++;
		if(now>=len){
			now=0;
		}
		span.eq(now).addClass("hide").siblings().removeClass("hide")
		$li.eq(now).stop().animate({opacity:1}).siblings("li").stop().animate({opacity:0});
	},2000)
})
		
/********===================倒计时效果=====================*/
var time = new Date();

var endtime = new Date(time.setSeconds(time.getSeconds()+3))
//获取页面元素
var $i = $('#time').children();
//h获取秒数
var miaoshu = parseInt(endtime.getTime()/1000)-parseInt((new Date()).getTime()/1000);

var timer = setInterval(function(){
	miaoshu--;
	//计算小时数
	var hour = parseInt(miaoshu/60/60);
	$i.first().text(hour);
	//计算分钟数
	var mins = parseInt(miaoshu/60%60);
	$i.eq(1).text(mins);
	//计算秒数
	var miao = parseInt(miaoshu%60);
	$i.eq(2).text(miao);
	if(miaoshu<=0){
		clearInterval(timer);
		$i.empty().css({"font-size":"12px"}).text("over");
	};
},1000)



});

