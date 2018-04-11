define(function(){
	function linkRun(){
		var orun_box = $(".run_box")[0];
		var orun_01 = $(".run_01")[0];
		var orun_02 = $(".run_02")[0];
		$(".run_02").html($(".run_01").html()); 
		function Marquee(){
			if(orun_02.offsetWidth-orun_box.scrollLeft<=0){
				orun_box.scrollLeft -= orun_01.offsetWidth;
			}else{
				orun_box.scrollLeft++;
			}
		}
		var timer = setInterval(Marquee,10);
		orun_box.onmouseenter = function(){
			clearInterval(timer);
		}
		orun_box.onmouseleave = function(){
			clearInterval(timer);
			timer = setInterval(Marquee,10);
		}
	}
	
	return{
		linkRun : linkRun
	}
})