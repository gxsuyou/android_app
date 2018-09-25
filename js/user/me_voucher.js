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
})