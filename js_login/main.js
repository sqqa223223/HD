//配置路径
require.config({
	paths : {
		'jquery' : 'jquery-1.8.3.min',
		'cookie' : 'jquery.cookie',
		'login'	: 'login'
	}
})
//代码的出入口，相当于c语言中的main函数
require(['jquery','cookie','login'],function($,cookie,login){
	//ajax导入头部和尾部
		$("#top").load('public.html #top');
		$("#header").load('public.html #header');
		$("#footer").load('public.html #footer');
		$(document).ready(function(){
			setTimeout(function(){
				function netBox(){			
						$('#net_nav').mouseenter(function(){
							$("#web_box").css("display","block");
						})
						$('#net_nav').mouseleave(function(){
							$("#web_box").css("display","none");
						})
					}
					netBox();
					//全部商品分类
				function product(){
	//				alert($("#product_list li"))
					var $lis = $("#header #product_list li");
					var $boxs =$("#pro_all .showBox");
					for (let j = 0;j < $lis.size(); j++){
						$lis.eq(j).mouseenter(function(){	
							$lis.eq(j).addClass("active");
							$boxs.eq(j).fadeIn();
						})
						$lis.eq(j).mouseleave(function(){
							for (var  i = 0; i < $lis.size(); i++) {
								$lis.eq(i).removeClass("active");
								$boxs.eq(i).fadeOut();
							}
						})
					}
				}			
				product();
			
				function show(){		
					$("#header #product_list").css("display","none");
					$("#header #pro_all .first").hover(function(){
						$("#product_list").css("display","block");
					},function(){
						$("#header #product_list").css("display","none");				
					})				
				}
				show();
			},100)
			
		})
		
		$(function(){
			//登录验证			
			//登录验证码
			function createYzm(){
				var str = "0123456789qwertyuiopasdfghjklzxcvbnm";
				var str2 = "";
				for(var i = 0; i < 5; i++){
					var index = parseInt(Math.random()*str.length);
					str2 += str[index]; 
				}
				$("#yzm_tel").html(str2);				
			}
			window.onload = createYzm();
			var duiImg = `<img src="../img/dui.png" />`;
			var cuoImg = `<img src="../img/cuo.png" />`;
			$("#yzm_tel")[0].onclick = createYzm;
			var $yzmInfo = $("#yzmInfo_tel");
			function checkYzm(){
				if($("#yzm_val").val() == ""){
					$yzmInfo.html(cuoImg);
					return false;
				}
				if($("#yzm_val").val() != $("#yzm_tel").html()){
					$yzmInfo.html(cuoImg);
					return false;
				}
				$yzmInfo.html(duiImg);
				return true;
			}
			$("#yzm_val")[0].onblur = checkYzm;
			$("#yzm_val").focus(function(){
				$("#yzm_val").val("");
				$yzmInfo.html("");
			})
			$("#tel_email").focus(function(){
				$("#tel_email").val("");
			})
			$("#psd").focus(function(){
				$("#psd").val("");
			})
			$("#login").click(function(){
				checkYzm();
				//取出在cookie中存在的注册信息
				var loginStr = $.cookie("login") ? $.cookie("login") : "";
				if(!loginStr){
					alert("您还没有注册!");
					createYzm();
					$("#tel_email").val("");
					$("#psd").val("");
					$("#yzm_val").val("");
					return;
				}else{
					var loginObj = convertCartStrToObj(loginStr);
					//遍历所有的电话号码
					for(var tel_Number in loginObj){
						var info = loginObj[tel_Number];
					}
//					if($("#tel_email").val() != tel_Number){alert("您还没有注册")}
					if($("#tel_email").val() == tel_Number && $("#psd").val() == info.psd && checkYzm()==true){
						location.href = "index.html";
					}else if($("#tel_email").val() != tel_Number){
						alert("您还没有注册");
						createYzm();
						$("#tel_email").val("");
						$("#psd").val("");
						$("#yzm_val").val("");
					}else{
						alert("用户名或密码错误");
						createYzm();
						$("#tel_email").val("");
						$("#psd").val(""); 
						$("#yzm_val").val("");
					}
				}
				function convertCartStrToObj(loginStr){
					//如果是空字符串，即他的没有注册信息，直接返回一个空对象
					if(!loginStr){
						return {};
					}
					return JSON.parse(loginStr);
				}
			})
			
		})
	
})