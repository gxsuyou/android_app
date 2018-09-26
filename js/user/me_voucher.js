mui.plusReady(function() {
	$("body").on("tap", ".mui-table-view-cell", function() {
		var show = $(this).find(".voucher_contents").css("display")
		if(show == "none") {
			$(this).find(".voucher_contents").css("display", "block")
		} else {
			$(this).find(".voucher_contents").css("display", "none")
		}

	})

	$("body").on("tap", ".voucher_contents", function(e) {
		e.stopPropagation()
		mui.openWindow({
			url: "me_checkvoucher.html",
			id: "me_checkvoucher.html"
		})
	})
	
	/* 未使用的优惠券  */
	$("body").on("tap",".voucher_nav>div:first-child",function(){
		$(".voucher_nav>div:last-child").removeClass("border_bottom color_green")
		$(this).addClass("border_bottom color_green")
		$("#voucher_nouse").css("display","block")
		$("#voucher_use").css("display","none")
		
	})
	
	/* 使用的优惠券  */
	$("body").on("tap",".voucher_nav>div:last-child",function(){
		$(".voucher_nav>div:first-child").removeClass("border_bottom color_green")
		$(this).addClass("border_bottom color_green")
		$("#voucher_nouse").css("display","none")
		$("#voucher_use").css("display","block")
	})
	
	/*到使用规则*/
	$("body").on("tap",".userule",function(){
		mui.openWindow({
			url:"voucher_userule.html",
			id:"voucher_userule.html"
		})
	})
	
	
	
})