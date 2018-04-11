//配置路径
require.config({
	paths : {
		'jquery' : 'jquery-1.8.3.min',
		'cookie' : 'jquery.cookie',
		'list'	: 'list'
	}
})
//代码的出入口，相当于c语言中的main函数
require(['jquery','cookie','list'],function($,cookie,list){
	//ajax导入头部和尾部
		$("#top").load('public.html #top');
		$("#header").load('public.html #header');
		$("#footer").load('public.html #footer');
		$("#float_box").load('public.html #float_box');	
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
			$(window).scroll(function(){
				if($(window).scrollTop() > 600){
					$("#float_box").fadeIn();
				}else{
					$("#float_box").fadeOut();
				}
			})
		})
})