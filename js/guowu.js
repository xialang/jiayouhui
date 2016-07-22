jQuery(function($){
	var num = 1;
	var $dl = $("#dl");
	var $list =$("#ac-list");
	var $navgouwu = $("#fanye");
	var $tanchuang = $(".chang");
	var $zhezhao = $("#zhezhao");
	var $jisuan = $("#jisuan");
	var $paixu = $jisuan.siblings();
	var $a = $navgouwu.find("a");
	var axiaoliang = [];
	var jiage = [];
	var aJason;
	var $back = $('#back');
	$back.hide();
	//变高
	$('#dl').on("click","span",function(){
		var $dl = $(this).siblings();
		var width = $dl.css("height");
		if($(this).hasClass("show")){
			$dl.animate({height:58});
			$(this).removeClass("show").html("更多");
		}else{
			$dl.animate({height:174});
			$(this).addClass("show").html("收起");
		}
		
	});
	
	//初始化页面
	qingshu();
	$navgouwu.on("click","a",function(){
		num = $(this).text();
		
		 $(this).addClass("hong").siblings("a").removeClass("hong");
		 
		qingshu();
		
	});
	
	//点击下一页
	$("#next4").click(function(){
		num++;
		if(num>3){
			num = 1;
		}
		$a.eq(num-1).addClass("hong").siblings("a").removeClass("hong");
		qingshu();
		shanshou();
	});
	
	//点击上一页
	$("#prev4").click(function(){
		num--;
		if(num<1){
			num = 3;
		}
		$a.eq(num-1).addClass("hong").siblings("a").removeClass("hong");
		qingshu();
		shanshou();
	});
	

	//请求数据
	function qingshu(){
		$.ajax({
			url:"/js/ajax"+num+".json",
			dataType:"json",
			success:function(data){
				var li = "";
				aJason = data;
				$.each(data, function(idx,val) {    
					li+= ('<li><a><img class="smalpic" src="../css/img/feiji.png"/><a href="xiangqing.html"><img class="shan" src="'+val.src+'"></a><b>'+ val.miaoshu+'</b><p><i>'+val.oldjia+'</i>'+val.jia+'<span class="fr"></span>'+'</p><font>月销量'+val.xiaoliang+'</font></a></li>');
					axiaoliang.push(val.xiaoliang);	
					jiage.push(val.jia);
				});
				$list.empty().html(li);
				shanshou();
			},
			
		});
		
	}
	
/*====================没有的更多页面则弹窗=================*/
	$("#yes").on("click",function(){
	 	num =  $navgouwu.find("input").val();
	 	
	 	//获取窗口的宽高然弹窗居中
	 	var left  = $(window).outerWidth()/2-250+$(window).scrollLeft();
	 	var top = $(window).outerHeight()/2-330+$(window).scrollTop();
	 	
		$a.eq(num-1).addClass("hong").siblings("a").removeClass("hong");
	 	//如果没有则弹窗
	 	if(num>3 || num<1){
	 		
	 	//弹窗
	 	 $tanchuang.css({
	 			"left":left,
	 			"top":top,
	 			"display":"block"
	 		});
	 		$zhezhao.css({display:"block",
	 			width:$(document).width(),
	 			height:$(document).height()
	 		})
	 		
	 }else{
	 		qingshu()
	 	}

	 })
	
	
	
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
/*======================图片闪烁的效果======================================================================================*/
shanshou();

function shanshou(){
		$('.shan').mouseover(function(){
		$(this).css('opacity','.5').stop().animate({opacity:1},1000);
	});
}


/*==================点击关闭弹窗=========================*/
	$tanchuang.children("a").click(function(e){
		$zhezhao.css({"display":"none"});
		$tanchuang.css({"display":"none"});
		
		e.preventDefault();
	});
	
	//销量排序
	$paixu.eq(1).click(function(){
		//当前高亮；
		$paixu.css({"background":"transparent"});
		$(this).css({"background":"#fff"});
		
		pailie(axiaoliang,"xiaoliang");
		shanshou();
		
	});
	
	//价格排序
	$paixu.eq(3).click(function(){
		//当前高亮；
		$paixu.css({"background":"transparent"});
		$(this).css({"background":"#fff"});
		
		pailie(jiage,"jia");
		shanshou();
	})
	
	//根据价格范围排序

	var $input = $jisuan.children();
	
	$input.last().click(function(e){
		var min = $input.first().val();
		var max = $input.eq(2).val();
		var reg = /^[0-9]+$/;
		var li = "";
		console.log(reg.test(max),reg.test(min));
		if(!reg.test(max) || !reg.test(min)){
			return false;
		}else{
			
			//请求数据
			shuju();
			
			$.each(aJason,function(idx,val){
				if(Number(val.jia)>=Number(min) && Number(val.jia)<Number(max)){
					li+= '<li><a><img class="smalpic" src="../css/img/feiji.png"/><img class="shan" src="'+val.src+'"><b>'+ val.miaoshu+'</b><p><i>'+val.oldjia+'</i>'+val.jia+'<span class="fr"></span>'+'</p><font>月销量'+val.xiaoliang+'</font></a></li>';
					val.jia = -1;
				}
			});
			if(li==""){
				return false;
			}else{
				$list.empty().html(li);
			}
		}
		shanshou();
		e.preventDefault();
		
	})
		
	
	
	//排列；
	function pailie(arr,sattr){
		
		var li = '';
		
		pai(arr);
		//请求数据
		shuju();
		
		//按销量写入页面；
		for(var i = 0;i<aJason.length;i++){
			console.log(aJason[i])
		}
		
		for(var i=0;i<arr.length;i++){
			$.each(aJason, function(idx,val) { 
				if(sattr=="xiaoliang"){
					if(arr[i] == val.xiaoliang){
						li+= '<li><a><img class="smalpic" src="../css/img/feiji.png"/><img class="shan" src="'+val.src+'"><b>'+ val.miaoshu+'</b><p><i>'+val.oldjia+'</i>'+val.jia+'<span class="fr"></span>'+'</p><font>月销量'+val.xiaoliang+'</font></a></li>';
						
						val.xiaoliang = -1;
					}
				}else if(sattr=="jia"){
					if(arr[i] == val.jia){
						li+= '<li><a><img class="smalpic" src="../css/img/feiji.png"/><img class="shan" src="'+val.src+'"><b>'+ val.miaoshu+'</b><p><i>'+val.oldjia+'</i>'+val.jia+'<span class="fr"></span>'+'</p><font>月销量'+val.xiaoliang+'</font></a></li>';
						
						val.jia = -1;
					}
				}
					
			});
		}
		//写入页面
		$list.empty().html(li);
		//console.log(axiaoliang.length);
	}
	
	//请求数据
	function shuju(){
		$.ajax({
			url:"/js/ajax"+num+".json",
			dataType:"json",
			success:function(data){
					aJason = data; 
					$.each(data, function(idx,val) {    
					//li+= ('<li><a><img class="smalpic" src="../css/img/feiji.png"/><img class="shan" src="'+val.src+'"><b>'+ val.miaoshu+'</b><p><i>'+val.oldjia+'</i>'+val.jia+'<span class="fr"></span>'+'</p><font>月销量'+val.xiaoliang+'</font></a></li>');
					axiaoliang.push(val.xiaoliang);	
					jiage.push(val.jia);
				});
				}
			})
	}
	
	function pai(arr){
		var j = arr.length;
		
		for(var n=0;n<arr.length;n++){
		
			//console.log(j);
			for(var i=1;i<j;i++){
				if(Number(arr[i])<Number(arr[i-1])){
					var tem = arr[i-1];
					arr[i-1] = arr[i];
					arr[i] = tem;
				}
				
			}
			j--;
		}
	}
/*======================live-list无缝轮播==========================================================================================*/
	
	
//遍历UL;
var $box = $(".box");
var $ul = $box.children().filter('ul');
var now = 0;

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
	
})



























