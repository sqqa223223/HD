//配置路径
require.config({
	paths : {
		'jquery' : 'jquery-1.8.3.min',
		'cookie' : 'jquery.cookie',
		'details'	: 'details'
	}
})
//代码的出入口，相当于c语言中的main函数
require(['jquery','cookie','details'],function($,cookie,details){
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
			var $container = $("#magnifier .magnifier_container");	
			var $small = $("#magnifier .images_cover");
			var $big = $("#magnifier .magnifier_big_pic_01");
			var $smallImg = $("#magnifier .images_cover>img");
			var $bigImg = $("#magnifier .magnifier_big_pic_01>img")
			var $move = $("#magnifier .move_view");
			var $smallPics = $("#magnifier .magnifier_small_pics li");
			for(let i = 0; i < $smallPics.size(); i++){
				$smallPics.eq(i).click(function(){
					var img_url = $(this).children().children().attr("src");
					$smallImg.attr("src",img_url);
					$bigImg.attr("src",img_url);
				})
			}
			$small.mouseenter(function(){
				$move.fadeIn();
				$big.fadeIn();
			})
			$small.mouseleave(function(){
				$move.fadeOut();
				$big.fadeOut();
			})
			$small.mousemove(function(event){
				var x = event.pageX-$move.width()/2-$container.offset().left;
				var y = event.pageY-$move.height()/2-$container.offset().top;
				var maxL = $container.width()-$move.width();
				var maxT = $small.height()-$move.height();
				x = x < 0 ? 0 : (x > maxL ? maxL : x);  //左右边界处理
				y = y < 0 ? 0 : (y > maxT ? maxT : y);  //上下边界处理
				$move.css("left",x+"px");
				$move.css("top",y+"px");
				
				var bigImgLeft = $bigImg.width()/$small.width()*x;
				var bigImgTop = $bigImg.height()/$small.height()*y;
				$bigImg.css("left",-bigImgLeft+"px");
				$bigImg.css("top",-bigImgTop+"px");
			})
			
			//选择尺码
			var $size = $("#magnifier .magnifier_big_pic .big_middle .size a");
			var $color = $("#magnifier .magnifier_big_pic .big_middle .color a");
			var $tips = $("#magnifier .magnifier_big_pic .big_middle .tips span");
			var txt_size,txt_color;
			for(let j = 0; j < $size.size(); j++){
				$size.eq(j).click(function(){
					$(this).addClass("active");
					$(this).siblings().removeClass("active");
					txt_size = $(this).text();
					$tips.eq(0).html(txt_size);
				})
				$color.eq(j).click(function(){
					$(this).addClass("active");
					$(this).siblings().removeClass("active");
					txt_color = $(this).text();
					$tips.eq(1).html(txt_color);
				})
			}
			
			//选择数量
//			alert($('#num').val());
			var num = $('#num').val();
			$("#decrease").click(function(){
				num--;
				if(num <= 1){
					num = 1;
				}
				$('#num').val(num);
			})
			$("#increase").click(function(){
				num++;
				$('#num').val(num);
			})
			
			
			//二维码
			$("#wei").mouseenter(function(){
				$("#ewm").css("display","block")
			})
			$("#wei").mouseleave(function(){
				$("#ewm").css("display","none")
			})
			
			//加入购物车
			$("#join_car").click(function(){
				var goodId = $("#goodId").html();
				var goodSrc = $("#thumbnail").children().children().attr("src");
				var goodTitle = $("#goodTitle").html();
				var goodColor = $tips.eq(1).html();
				var goodSize = $tips.eq(0).html();
				var goodOldPrice = $("#del").html();
				var goodNewPrice = $("#newPrice").html();
				var goodNum = parseInt($("#num").val());
				var goodTips = $("#goodTips").html();
				//设计以下结构的对象来处理商品信息，以商品的id为键，商品的其他信息为值
//				{
//					'商品货号':{
//						src : "../img/1488384280733217263.jpg",
//						'标题':"韩都衣舍2017夏装新百搭女背心女修身紧身短款小吊带TK8113",
//						'颜色':'白色',
//						'尺寸':'S',
//						'原价':'177',
//						'售价':'48',
//						'数量':'2',
//						'备注':'【暖冬钜惠】全场通用满299减20/满499减50/满599减80/满799减120/满999减200！可在商品详情页内领取优惠券！'
//					}
//				}
				
				//获取cookie中的信息，如果cookie中没有信息会返回一个undefined，我所需的是一个字符串类型的数据。所以将他转成一个空字符串，保持数据类型一致
				var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
				//将字符串转成对象
				var cartObj = convertCartStrToObj(cartStr);
				
				//判断该商品是否已经在购物车中存在
				if(goodId in cartObj){
					//如果已经存在，那么该商品的数量直接加现在的数量
					cartObj[goodId].num += parseInt($("#num").val());
				}else{
					//如果不存在，那么僵新商品的数量存入
					cartObj[goodId] = {
						'src' : goodSrc,
						'title' : goodTitle,
						'color' : goodColor,
						'size' : goodSize,
						'oldPrice' : goodOldPrice,
						'newPrice' : goodNewPrice,
						'num' : goodNum,
						'tips' : goodTips
					};
				}
				//将新商品的信息存回cookie
				//将对象转为字符串
				cartStr = convertObjToCartStr(cartObj);
				//存入cookie
				$.cookie("cart",cartStr,{expires : 7,path:"/"});
				location.href="shopping.html";
			})
			function convertCartStrToObj(cartStr){
				//如果是空字符串，即没有购物车信息，那么购物车为空，直接返回一个空对象
				if(!cartStr){
					return {};
				}
				var goods = cartStr.split(":");
				var obj = {};
				for(var i = 0; i < goods.length; i++){
					var data = goods[i].split(",");
					//以商品的id为健，商品的其他信息为值，这个值也设计为一个对象
					obj[data[0]] = {
						src : data[1],
						title : data[2],
						color : data[3],
						size : data[4],
						oldPrice : data[5],
						newPrice : data[6],
						num : parseInt(data[7]),
						tips : data[8]
					}
				}
				return obj;
			}
			function convertObjToCartStr(obj) {
				var cartStr = "";
				for(var id in obj) {
					if(cartStr) {
						cartStr += ":";
					}
					cartStr += id + "," + obj[id].src + "," + obj[id].title + "," + obj[id].color + "," + obj[id].size+ "," + obj[id].oldPrice+ "," + obj[id].newPrice+ "," + obj[id].num+ "," + obj[id].tips;
				}
				return cartStr;
			}
		})
})