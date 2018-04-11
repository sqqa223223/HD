//配置路径
require.config({
	paths : {
		'jquery' : 'jquery-1.8.3.min',
		'cookie' : 'jquery.cookie',
		'index' : 'index',
	}
})
//代码的出入口，相当于c语言中的main函数
require(['jquery','cookie','index'],function($,cookie,index){
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
				
			},100)			
		})
	$(function(){
//首页---------------------------------

	//大吸顶
		$(window).scroll(function(){
			if($(window).scrollTop() > 600){
				$("#float_box").fadeIn();
			}else{
				$("#float_box").fadeOut();
			}
		})
		$(window).scroll(function(){
			if($(window).scrollTop() > 600){
				$("#search").css("display","block");
			}else{
				$("#search").css("display","none");
			}
		})
	//友情链接效果
	index.linkRun();
		//轮播图
		function autoPlay(){
			var $pics = $("#pic_box>div");
			var $lis = $("#circle li");
			var index = 0;
			var timer = setInterval(paly,2000);
			function paly(){
				index++;
				for (var  i = 0; i < $lis.size(); i++) {
					$lis.eq(i).removeClass("active");
					$pics.eq(i).fadeOut();
				}
				if(index == $lis.size()){
					index=0;
				}
				$lis.eq(index).addClass("active");
				$pics.eq(index).fadeIn();
			}
			for (let  j = 0;j < $lis.size(); j++){
				$lis.eq(j).mouseenter(function(){
					clearInterval(timer);
					index = j-1;	//因为index++，所以要减一
					paly();
				})
				$lis.eq(j).mouseleave(function(){
					timer = setInterval(paly,2000);
				})
			}
		}
		autoPlay();		
		//互联网
		for(let i = 0; i < $("#internet .int_left ul li").size(); i++){
			$("#internet .int_left ul li").eq(i).hover(function(){
				$("#internet .int_left ul li i img").eq(i).css("zIndex",3);
			},function(){
				$("#internet .int_left ul li i img").eq(i).css("zIndex",1);	
			})
		}
		//tab菜单
		function tab_01(){
			var $lis = $("#title ul li");
			var $tabs = $("#internet .tab");
			for(let i = 0; i < $lis.size();i++){
				$lis.eq(i).mouseenter(function(){
					for(var j = 0; j < $lis.size(); j++){
						$lis.eq(j).removeClass("active");
						$tabs.eq(j).css("display","none");
					}
					$(this).addClass("active");
					$tabs.eq(i).css("display","block");
				})
			}
		}
		tab_01();
		function tab_02(){
			var $lis = $("#newProduct .newproduct_list li");
			var $tabs = $("#newProduct .newproduct_box");
			var index = 0;
			var timer = setInterval(paly,4000);
			function paly(){
				index++;
				for (var  i = 0; i < $lis.size(); i++) {
					$lis.eq(i).removeClass("active");
					$tabs.eq(i).fadeOut();
				}
				if(index == $lis.size()){
					index=0;
				}
				$lis.eq(index).addClass("active");
				$tabs.eq(index).fadeIn();
			}
			for (let  j = 0;j < $lis.size(); j++){
				$lis.eq(j).mouseenter(function(){
					clearInterval(timer);
					index = j-1;	//因为index++，所以要减一
					paly();
				})
				$lis.eq(j).mouseleave(function(){
					timer = setInterval(paly,4000);
				})
			}
		}
		tab_02();
		//手风琴
		function hotProduct(){
			var $lis = $("#shoufengqin>li");
			var $hs = $("#shoufengqin li h3");
			for(let i = 0; i < $lis.size();i++){
				$lis.eq(i).mouseenter(function(){
					for(var j = 0; j < $lis.size(); j++){
						$lis.eq(j).removeClass("active");
						$hs.eq(j).css("display","block");
					}
					$hs.eq(i).css("display","none");					
					$(this).addClass("active");
				})
			}
		}
		hotProduct();	
	})
})
