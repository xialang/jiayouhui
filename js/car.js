jQuery(function($){
	var kaiguan = false;
	
	
	document.cookie = 'meinv={"name":"meinv","num":12,"danjia":"669.00","miaoshu":"月亮湾进口野生即食海参滋补组 250克/包（10只/包）*12包","src":"../css/img/meinv.jpg"}';
	document.cookie = 'meinv2={"name":"meinv","num":12,"danjia":"469.00","miaoshu":"月亮湾进口野生即食海参滋补组 250克/包（10只/包）*12包","src":"../css/img/meinv2.jpg"}';
	var oldcookie = document.cookie;
	//如果购物购物车里有东西
	
	if(oldcookie){
		var $Tb = $("#Tb");
		var tr = "";
		$.each(oldcookie.split("; "),function(idx,val){
			
			//筛选出购物车需要的cookie;
			if(val.indexOf("../css/im")!=-1){
				console.log(val)
					var jason = JSON.parse(val.split("=")[1]);
					
					//生成字符串
					tr+='<tr><td><input type="checkbox" /></td><td><img src="'+jason.src+'" /><p>'+jason.miaoshu+'</p></td><td><span>￥'+jason.danjia+'</span></td><td><i class="pad10" data="jia">+</i><input class="text" type="text" value="'+jason.num+'"/><i data="jian">-</i></td><td><em>3820.00</em></td><td><b>删除</b></td></tr>';
		
			}
			
		})
		//写入Tbody;
			$Tb.html(tr);
			kaiguan=true;
	}
	
	//商品写入后
	
	if(kaiguan){
		//全选全不选
		var $all = $("#all");
		var $check = $("tbody :checkbox");
		
		
		
		$all.click(function(){
			$check.prop("checked",$all.prop("checked"))
		});
		
		$all.prop("checked",$(""))
		
		//数量加	
		$(".cartable").on("click",'tbody [data="jia"]',function(){
			jiajian($(this));

		});
		
		//数量加减	
		$(".cartable").on("click",'tbody [data="jian"]',function(){
			jiajian($(this));
		});
		
		//删除
		$(".cartable").on("click","tbody b",function(){
			$(this).closest("tr").remove();
		})
		
		//所用文本框
		var $inputz = $("tbody :text")
	
		function jiajian($that){
			
			var $tr = $that.closest("tr");
			
			var danjia = Number($tr.find("span").text().substring(1));
			var $xiaoji = $tr.find("em");
			
	
				if($that.attr("data")=="jia"){
					var $input = $that.next();
					var num = $input.val();
					if(num){
						num++;
					}
					
				}else{
					var $input = $that.prev();
					var num = $input.val();
					num--;
					if(num<0 && num){
						num=0;
					}
				}
				
					$input.val(num);
					$xiaoji.text(danjia*Number(num));
					var $zongliang = $(".pad20");
					var sub=0;
					
					//统计数量;
					$.each($inputz,function(ind,val){
						//console.log($(val));
						
						sub+= Number($(val).val());
						
					});
					
					//计算总价
					var $zonjia = $("tbody em");
					var zonjia=0;
					$.each($zonjia,function(idx,val){
						zonjia+=Number($(val).text());
					})
					$zongliang.text("已选择"+sub+"件商品");
					$(".fs30").text("应付"+zonjia+"元");
		}
		
		//删除选中项
		$(".closs").click(function(){
			var shanchu = $("tbody :checked");
			$.each(shanchu,function(idx,val){
				$(val).closest("tr").remove();
			})
		})
		
		//处理全选
		$check.click(function(){console.log($("tbody :checked").length==$check.length);
			$all.prop("chceked",$("tbody :checked").length==$check.length);
		})
		
	}

	

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





	
})





































