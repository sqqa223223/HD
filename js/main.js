//配置路径
require.config({
	paths : {
		'jquery' : 'jquery-1.8.3.min',
		'cookie' : 'jquery.cookie',
		'index' : 'index.min',
	}
})
//代码的出入口，相当于c语言中的main函数
require(['jquery','cookie','index'],function($,cookie,index){
	$(function(){
		//友情链接效果
		index.linkRun();
	})
})
