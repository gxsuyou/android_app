var tu_id = null;
mui.plusReady(function() {

	var n = plus.webview.currentWebview();
	tu_id = n.tu_id
	var gameId = n.game_id
	var packagename;
	//	alert(game_id)
	var hasno
	$.ajax({
		type: "get",
		url: config.data + "game/getGameById",
		async: true,
		data: {
			gameId: gameId,
			sys: 2
		},
		success: function(data) {
			//			alert(JSON.stringify(data))
			var game = data.gameDetail;
			 packagename = game.game_packagename
			hasno = plus.runtime.isApplicationExist({
				pname: game.game_packagename,
				action: ''
			})
			//			alert(hasno)
		}
	})

	$(".me_voulan img").attr("src", n.icon_href)
	$(".me_voulan span").text(n.game_name)
	var mask = mui.createMask(function() {
		//		return false
	}); //callback为用户点击蒙版时自动执行的回调；
    alert(3)
	$("body").on("tap", ".me_tochar", function() {
		alert(hasno)
		if(hasno == false) {
			//			"下载游戏"
			mask.show()
			$(".me_downcontents").css("display", "block")
			return false
		}

		var playerId = $(".playerId").val()
		var phoneNum = $(".phoneNum").val()
		var playDir = $(".playDir").val()
		if(playerId == "" || phoneNum == "") {
			mui.toast("请输入必要信息")
			return false;
		}
		if(phoneNum.length > 15) {
			mui.toast("请输入准确号码")
			return false;
		}
		alert(packagename)
		if(plus.os.name == "Android") {
			plus.runtime.launchApplication({
				pname: packagename,
				extra: {
					//									url: "http://www.html5plus.org"
				}
			}, function(e) {
				//								installApp('_downloads/' + game.game_name + '.apk')
			});
		}
		return false;

		$.ajax({
			type: "post",
			url: config.data + "game/getUseTicket",
			async: true,
			data: {
				uid: userId,
				tu_id: tu_id,
				game_user: playerId,
				game_area: playDir,
				tel: phoneNum
			},
			success: function(data) {
				if(data.state == 1) {
					mui.toast("提交，正在审核中。")
					setTimeout(function(){
//						if(plus.os.name == "Android") {
//							plus.runtime.launchApplication({
//								pname: packagename,
//								extra: {
//									//									url: "http://www.html5plus.org"
//								}
//							}, function(e) {
//								//								installApp('_downloads/' + game.game_name + '.apk')
//							});
//						}
					},4000)
				}
			}
		})

	})

	$("body").on("tap", ".me_downgo", function() {
		mui.openWindow({
			url: '../../html/game/game_detail.html',
			id: 'game_detail.html',
			extras: {
				gameId: gameId
			}
		})
	})
	$("body").on("tap", ".me_downclose", function() {

		mask.close(); //关闭遮罩
		$(".me_downcontents").css("display", "none")
	})
})