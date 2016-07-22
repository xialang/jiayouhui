


jQuery(function($){
	var $baodan = $("#list")
	var $zhubtn = $('#yanzheng');
	var $input = $baodan.find("input");
	var $em4 = $zhubtn.siblings("em");
	var $haoma = $("#haoma1");
	var $em1 = $haoma.siblings("em");
	var $mimaK = $baodan.find('[data-mima="mima"]');
	var $em2 = $mimaK.siblings("em");
	var $queRenK = $baodan.find('[data-mima="mima2"]');
	var $em3 = $queRenK.siblings("em");
	var val = {};
	var chek = $("#check");
	var $em5 = $("#mg10");
	var $back = $('#back');
	var $btn = $("#zhuce")
	document.cookie='13567792345 = {"num":"13467792345","mima":"123456","mima2":"123456"}';	
// 生成验证码
var arr = '0123456789abcdefg';
var ma = "";
 
for(var i=0;i<4;i++){
	ma+=arr[parseInt(Math.random()*arr.length)];
}
$zhubtn.val(ma);
//点击验证
$btn.click(function(){
	//获取cookie;
	var oldCookie = document.cookie;
	var kaiguan = true;
	//获取各个输入框的值
	var num  = $haoma.val();
	
	//判断是否已经注册
	$.each(oldCookie.split("; "),function(idx,val){
		if(val.split("=")[0]==num){
			$em1.text("该号码已经注册").removeClass().addClass("acti");
			kaiguan = false;
			return false;
		}
	})
	//如果没注册
	if(kaiguan){
		//只能135开头空的11位不能为空；
		var regnum = /^(135)([\d]{7})$/;
		if(!regnum.test(num)){
			$em1.text("只能是135开头，长度11").removeClass().addClass("acti");
			return false;
		}else{
			$em1.addClass().css("display","block").removeClass().addClass("yin").html("");
		}
		
		
		
		//获取密码框的值
		var mima = $mimaK.val();
		
		//密码只能是6-16位的数字字母下划线
		var regmima = /^[\w]{6,16}$/;
		if(!regmima.test(mima)){
			$em2.text("密码有误哦！").removeClass().addClass("acti");
			$mimaK.val("");
			return false;
		}else{
			$em2.addClass().css("display","block").removeClass().addClass("yin").html("");
		}
		
		//确认密码$queRenK.val() == mima
		if($queRenK.val() == mima && $queRenK.val()!=""){
			$em3.addClass().css("display","block").removeClass().addClass("yin").html("");
		}else{
			$em3.text("确认有误哦！").removeClass().addClass("acti");
			return false;
		}
		
		//验证
		if($zhubtn.val()==ma){
			$em4.addClass().css("display","block").removeClass().addClass("yin").html("");
		}else{
			$em3.text("验证码错误！").removeClass().addClass("acti");
			return false;
		}
		if($("#check").prop("checked")){
			val.num = num;
			val.mima = mima;
			_cookie =num+"="+JSON.stringify(val)+"; path/";
			//写入cookie
			document.cookie = _cookie;
			
			$em5.text("注册成功！").removeClass().addClass("acti");
			
		}else{
			$em5.text("还没阅读协议哦！").removeClass().addClass("acti");
		}
		
		
		
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
	
/*========================================*/	
	
	
	
})	

		
	












