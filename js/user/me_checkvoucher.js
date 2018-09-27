var tu_id = null;
mui.plusReady(function() {

	var n = plus.webview.currentWebview();
	tu_id = n.tu_id

	$(".me_voulan img").attr("src", n.icon_href)
	$(".me_voulan span").text(n.game_name)
	var mask = mui.createMask(function() {
		//		return false
	}); //callback为用户点击蒙版时自动执行的回调；

	$("body").on("tap", ".me_tochar", function() {	
		var playerId = $(".playerId").val()
		var phoneNum = $(".phoneNum").val()
		var playDir = $(".playDir").val()
		if(playerId==""||phoneNum==""){
			mui.toast("请输入必要信息")
			return false;
		}
		if(phoneNum.length>15){
			mui.toast("请输入准确号码")
			return false;
		}

		$.ajax({
			type: "post",
			url: config.data + "game/getUseTicket",
			async: true,
			data: {
				uid: userId,
				tu_id:tu_id,
				game_user:playerId,
				game_area:playDir,
				tel:phoneNum
			},
			success: function(data){
				if(data.state==1){
					mui.toast("提交，正在审核中。")
				}
			}
		})

		return false;
		mask.show()
		$(".me_downcontents").css("display", "block")
	})
	$("body").on("tap", ".me_downclose", function() {

		mask.close(); //关闭遮罩
		$(".me_downcontents").css("display", "none")
	})
})