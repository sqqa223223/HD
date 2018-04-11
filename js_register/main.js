//配置路径
require.config({
	paths : {
		'jquery' : 'jquery-1.8.3.min',
		'cookie' : 'jquery.cookie',
		'register'	: 'register'
	}
})
//代码的出入口，相当于c语言中的main函数
require(['jquery','cookie','register'],function($,cookie,register){
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
			//		alert($("#product_list li"))
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
			//选择注册方式
			var $btns = $("#choice_register_ways>a");
			var $message_box = $("#message_box>div")
			for(let i = 0; i < 2; i++){
				$btns.eq(i).click(function(){
					$(this).addClass("tel");
					$(this).siblings().removeClass("tel");
					$message_box.eq(i).addClass("show");
					$message_box.eq(i).siblings().removeClass("show");
				})
			}
			var duiImg = `<img src="../img/dui.png" />`;
			var cuoImg = `<img src="../img/cuo.png" />`;
			//手机号表单验证
			
			var $telInfo = $("#tel_num_Info");
			function checkTel(){				
				if($("#tel_num").val() == ""){
					$telInfo.html(cuoImg);
					return false;
				}
				var reg = /^1\d{10}$/;
				if(reg.test($("#tel_num").val()) == false){
					$telInfo.html(cuoImg);
					return false;
				}
				$telInfo.html(duiImg);
				return true;
			}
			$("#tel_num")[0].onblur = checkTel;
			$("#tel_num").focus(function(){
				$("#tel_num").val("");
				$("#tel_num_Info").html("请输入您的手机号");
			})
			
			//验证码
			
			function createYzm(){
				var str = "0123456789qwertyuiopasdfghjklzxcvbnm";
				var str2 = "";
				for(var i = 0; i < 5; i++){
					var index = parseInt(Math.random()*str.length);
					str2 += str[index]; 
				}
				$("#yzm_tel").html(str2);				
			}
			$("#send_yzm").click(function(){
				$("#yzm_tel").css("display","block");
				createYzm();
			})
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
				$yzmInfo.html("请输入验证码");
			})
			
			//密码
			
			var $psdInfo = $("#psd_tel_Info");
			function checkPsd(){
				if($("#psd").val() == ""){
					$psdInfo.html(cuoImg);
					return false;
				}
				var reg = /^\w{6,16}$/;
				if(reg.test($("#psd").val()) == false){					
					$psdInfo.html(cuoImg);
					return false;
				}
				$psdInfo.html(duiImg);
				return true;
			}
			$("#psd")[0].onblur = checkPsd;
			$("#psd").focus(function(){
				$("#psd").val("");				
				$psdInfo.html("请设置您的密码");
			})
			
			//再次确认密码
			var $aginPsdInfo = $("#agin_psd_tel_Info");
			function aginCheckPsd(){
				$("#aginPsd").val()
				if($("#aginPsd").val() == ""){
					$aginPsdInfo.html(cuoImg);
					return false;
				}
				if($("#aginPsd").val() != $("#psd").val()){
					$aginPsdInfo.html(cuoImg);
					return false;
				}
				$aginPsdInfo.html(duiImg)
				return true;
			}
			$("#aginPsd")[0].onblur = aginCheckPsd;
			$("#aginPsd").focus(function(){
				$("#aginPsd").val("");
				$aginPsdInfo.html("请再次确认密码");
			})
			
			//统一验证
			$("#agree").click(function(){
				checkTel();
				checkYzm();
				checkPsd();
				aginCheckPsd();
				if(checkPsd()==true && checkTel()==true && checkYzm()==true && aginCheckPsd()==true){
//					$.cookie("tel",$("#tel_num").val(),{expires : 7,path:"/"});
//					$.cookie("psd",$("#psd").val(),{expires : 7,path:"/"});
					//获取cookie中的信息
					//如果cookie中没有信息会返回一个undefined ,我所须是一个字符串类型的数据，所以将它转成一个“”空字符串。保持数据类型一致。
					var loginStr = $.cookie("login") ? $.cookie("login") : "";
					var loginObj = convertCartStrToObj(loginStr);
					function convertCartStrToObj(loginStr){
						//如果是空字符串，即他的没有注册信息，直接返回一个空对象
						if(!loginStr){
							return {};
						}
						return JSON.parse(loginStr);
					}
					var tel_Number = $("#tel_num").val();
					var psd = $("#psd").val();
					if(tel_Number in loginObj){
						
					}else{
						loginObj[tel_Number] = {
							"psd" : psd
						};
					}
					loginStr = JSON.stringify(loginObj);
					$.cookie("login",loginStr,{expires : 7,path:"/"});
					
					alert("注册成功!")
					location.href = "login.html";	
				}

			})
		})
})