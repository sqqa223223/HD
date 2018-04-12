//配置路径
require.config({
	paths : {
		'jquery' : 'jquery-1.8.3.min',
		'cookie' : 'jquery.cookie',
		'shopping'	: 'shopping'
	}
})
//代码的出入口，相当于c语言中的main函数
require(['jquery','cookie','shopping'],function($,cookie,shopping){
	//ajax导入头部和尾部
		$("#top").load('public.html #top');
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
			//取出在cookie中存在的购物车信息
			var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
			if(!cartStr){
				$("#shopping_car_arrow").css("display","block");
			}else{
				$("#shopping_car_arrow").css("display","none");
				$("#shopping_car_bottom_bg").css("display","block");
				$("#shopping_car_bottom_right").css("display","block");
				$("#cartGoodsList").css("display","block");
				var cartObj = convertCartStrToObj(cartStr);
				//遍历所有商品生成html添加到购物车列表中去
				for(var id in cartObj){
					//商品信息对象
					var good = cartObj[id];
					var str = `
						<ul id="brand_cart_1" good_id="${id}">          
				      	<li id="rec-6891505">				            
				            <div class="cbg shop_product">
				                <div class="shop_product_pic">
				                    <a href="details.html" target="_blank" title="韩都衣舍2017夏装新百搭女背心女修身紧身短款小吊带TK8113婏">
				                        <img src="${good.src}" alt="韩都衣舍2017夏装新百搭女背心女修身紧身短款小吊带TK8113婏">
				                    </a>
				                </div>
				                <div class="shop_product_name">
				                    <a href="details.html" title="韩都衣舍2017夏装新百搭女背心女修身紧身短款小吊带TK8113婏" target="_blank"> ${good.title} </a>
				                </div>
				                <div class="shop_product_size">
				                    <span style="margin-right: 10px;">颜色:${good.color} &nbsp;&nbsp;&nbsp;尺码:${good.size}</span>
				                </div>
				            </div>
				            <div class="cbg shop_product_money">
				            	<div class="cprice">
				            		<del style="color: #999;">￥${good.oldPrice}</del><br />
				            		<span style="font-size: 14px;">¥${good.newPrice} </span>
				            	</div>
				            </div>
				            <div class="cbg shop_product_number">
				                <span class="amount-widget" id="J_AmountWidget">
				                    <span class="decrease">-</span>
				                    <span class="increase">+</span>
				                    <input type="text" name="goods_number" class="text" title="请输入购买量" value="${good.num}">                    
				                </span>				               
				            </div>
				            <div class="cbg shop_product_money00">￥<span id="shop_product_money00">${good.num*good.newPrice}</sapn></div>
				            <div class="cbg shop_product_close">
				                <div class="middle">
				                    <a href="#"> 移入收藏夹</a><br />
				                    <a href="javascript:;" class="delete"> 删除</a>
				                </div>
				            </div>
				            <div class="cbg shop_product_tip">
				                <div class="middle">
				                	<a href="details.html" target="_blank">
				                		<span style="color: #C80A28;">${good.tips}</span>
				                	</a>
				                </div>
				            </div>  
				        </li>       
					</ul> 
					`;
					$(str).appendTo($("#cartGoodsList"));
					
					
					var num = parseInt($("#goods_allnum").html());
					num += good.num;
					$("#goods_allnum").html(num);
					
					var money = parseInt($("#total_Price01").html());
					money += parseInt(good.num*good.newPrice);
					$("#total_Price01").html(money);
					$("#totalAmount").html(money);
				}
				//给每个商品添加从购物车删除的事件
				$("#rec-6891505 .shop_product_close .delete").click(function(){
					//在页面上将商品信息删除，顺便获取一个该商品的id
					var id = $(this).parents("#brand_cart_1").remove().attr("good_id");
					//从cookie中将该商品删除,否则刷新页面时还会出现
					var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
					var cartObj = convertCartStrToObj(cartStr);
					delete cartObj[id];
					
					//将删除后的cookie重新初始化,否则刷新页面还在
					$.cookie('cart', convertObjToCartStr(cartObj), {
						expires: 7,
						path: "/"
					});
					//重新获取小计和数量相加
					var $moneys = $(".shop_product_money00 span");
					var $nums = $("#J_AmountWidget input");

					var money = 0,num=0;
					for(var i = 0; i < $moneys.size(); i++){
						money += parseInt($moneys.eq(i).html());
						num += parseInt($nums.eq(i).val());
					}
					$("#total_Price01").html(money);
					$("#totalAmount").html(money);
					$("#goods_allnum").html(num);
				})
				
				//给增加按钮添加点击事件
				$("#J_AmountWidget .increase").click(function(){
					var id = $(this).parents("#brand_cart_1").attr("good_id");
					var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
					var cartObj = convertCartStrToObj(cartStr);
					cartObj[id].num += 1;
					//将页面上显示的数量加1
					$(this).siblings("input").val("" + cartObj[id].num);
					
					//更新页面的小计
					$(this).parents(".cbg").siblings('.shop_product_money00').children().html(cartObj[id].num * cartObj[id].newPrice + "");
					
					//将信息放回cookie
					$.cookie('cart', convertObjToCartStr(cartObj), {
						expires: 7,
						path: "/"
					});
					
					var $moneys = $(".shop_product_money00 span");
					var $nums = $("#J_AmountWidget input");
					var money = 0,num = 0;
					for(var i = 0; i < $moneys.size(); i++){
						money += parseInt($moneys.eq(i).html());
						num += parseInt($nums.eq(i).val());
					}
					$("#total_Price01").html(money);
					$("#totalAmount").html(money);
					$("#goods_allnum").html(num);
				})
				//给减少按钮添加事件
				$("#J_AmountWidget .decrease").click(function(){
					var id = $(this).parents("#brand_cart_1").attr("good_id");
					var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
					var cartObj = convertCartStrToObj(cartStr);
					if(cartObj[id].num > 1){ //商品数量减少不能少于1
						cartObj[id].num -= 1;
						//将页面上显示的数量加1
						$(this).siblings("input").val("" + cartObj[id].num);
						
						//更新页面的小计
						$(this).parents(".cbg").siblings('.shop_product_money00').children().html(cartObj[id].num * cartObj[id].newPrice + "");
						var money = $("#shop_product_money00").html();
						$("#total_Price01").html(money);
						$("#totalAmount").html(money);
						//将信息放回cookie
						$.cookie('cart', convertObjToCartStr(cartObj), {
							expires: 7,
							path: "/"
						});
						//重新获取小计相加
						var $moneys = $(".shop_product_money00 span");
						var $nums = $("#J_AmountWidget input");
						var money = 0,num = 0;
						for(var i = 0; i < $moneys.size(); i++){
							money += parseInt($moneys.eq(i).html());
							num += parseInt($nums.eq(i).val());
						}
						$("#total_Price01").html(money);
						$("#totalAmount").html(money);
						$("#goods_allnum").html(num);
					}
				});
				//修改数量
				$("#J_AmountWidget input").blur(function(){
					var id = $(this).parents("#brand_cart_1").attr("good_id");
					var cartStr = $.cookie("cart") ? $.cookie("cart") : "";
					var cartObj = convertCartStrToObj(cartStr);
					//判断用户输入是否合法
					var pattern = /^\d+$/;
					if(!pattern.test($(this).val())){
						cartObj[id].num = 1;
						$(this).val("1");
					}else{
						//修改一下数量
						cartObj[id].num = parseInt($(this).val());
					}
					$(this).val("" + cartObj[id].num);
					
					//更新页面的小计
					$(this).parents(".cbg").siblings('.shop_product_money00').children().html(cartObj[id].num * cartObj[id].newPrice + "");
					//将信息放回cookie
					$.cookie('cart', convertObjToCartStr(cartObj), {
						expires: 7,
						path: "/"
					});
					var $moneys = $(".shop_product_money00 span");
					var $nums = $("#J_AmountWidget input");
					var money = 0, num = 0;
					for(var i = 0; i < $moneys.size(); i++){
						money += parseInt($moneys.eq(i).html());
						num += parseInt($nums.eq(i).val());
					}
					$("#total_Price01").html(money);
					$("#totalAmount").html(money);
					$("#goods_allnum").html(num);
				})	
			}
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