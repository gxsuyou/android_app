//$(function() {
	mui.plusReady(function() {
		
		

		$.ajax({
			type: "get",
			url: config.data+"user/getUserMyCoin",
			async: true,
			data: {
				uid:userId
			},
			success: function(data){
				alert(JSON.stringify(data))
//				if(data.state==1){
//					mui.toast("提交，正在审核中。")
//				}
			}
		})


		
		$("body").on("tap", ".topheadright", function() {
			alert(1)
		})
		$("body").on("tap", ".me_goldInforight", function() {
			mui.openWindow({
			   url:"me_withdraw.html",
			   id:"me_withdraw.html",
			})

		})
		$("body").on("tap", ".voucher_header", function() {

			var no = $(this).siblings(".voucher_getgoldcontent").css("display")

			if(no == "none") {
				$(this).find("a").removeClass("mui-icon-arrowdown")
				$(this).find("a").addClass("mui-icon-arrowup")
				$(this).siblings(".voucher_getgoldcontent").css("display", "flex")
			}else{
				$(this).find("a").removeClass("mui-icon-arrowup")
				$(this).find("a").addClass("mui-icon-arrowdown")
				$(this).siblings(".voucher_getgoldcontent").css("display", "none")
			}

		})

	})
//})