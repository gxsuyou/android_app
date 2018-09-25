$(function() {
	if(!window.localStorage.getItem("rememberUser")) {
		var img = "../../Public/image/morentouxiang.png";
		$(".me_img").css("background-image", "url(" + img + ")");
		$('.me_username').text("未登录");

		$(document.body).on('tap', function() {
			mui.openWindow({
				url: 'login.html',
				id: 'login.html'
			})
		})
	} else {
		$('.me_share').click(function() {
			openShare()
		})
		var userInfostr = window.localStorage.getItem("userInfo");
		var userInfojson = eval('(' + userInfostr + ')');
		var id = userInfojson.id;
		$.ajax({
			type: "get",
			url: config.data + "users/getUserMsgById",
			async: true,
			data: {
				"id": userInfojson.id
			},
			timeout: 20000,
			success: function(data) {
				if(data.state) {
					$(".me_getgold").text(data.user.coin)
					$('.onlyId').text("ID:" + data.user.only_id);
					if(data.user.portrait != 0) {
						img = data.user.portrait;
						alert
					} else {
						img = "../../Public/image/morentouxiang.png";
					}

					$(".me_img").css("background-image", "url(" + img + ")")
					$('.me_username').text(data.user.nick_name);
				} else {

				}
			}
		});

		$('.me_img').click(function() {
			mui.openWindow({
				url: 'profile.html',
				id: 'profile.html'
			})
		})

		$('.me_newscenter').children("li").eq(0).click(function() {
			mui.openWindow({
				url: "../news/news_center.html",
				id: "../news/news_center.html",

			})
		})
		$('.me_play').children("li").eq(0).click(function() {
			mui.openWindow({
				url: "me_game.html",
				id: "me_game.html"
			})
		})
		$('.me_play').children("li").eq(1).click(function() {
			mui.openWindow({
				url: "me_works.html",
				id: "me_works.html"
			})
		})
		$('.me_play').children("li").eq(2).click(function() {
			mui.openWindow({
				url: "me_collection.html",
				id: "me_collection.html"
			})
		})

		$('.me_us').children("li").eq(1).click(function() {
			mui.openWindow({
				url: "about_us.html",
				id: "about_us.html"
			})
		})
		$('.me_us').children("li").eq(0).click(function() {
			mui.openWindow({
				url: "me_feedBack.html",
				id: "me_feedBack.html"
			})
		})
		$('.me_headerset').click(function() {
			mui.openWindow({
				url: "set_list.html",
				id: "set_list.html"
			})
		})

	}
	//if结束
	$('.me_share').click(function() {
		$(this).addClass("move")
		setTimeout(function() {
			$(".me_share").removeClass("move")
		}, 400)
	})

	$('.me_headerset').click(function() {
		$(this).addClass("move")
		setTimeout(function() {
			$(".me_headerset").removeClass("move")
		}, 400)
	})

	$('.me_voucher').click(function() {
		if(userId) {
			mui.openWindow({
				url: "me_voucher.html",
				id: "me_voucher.html"
			})
		} else {
			mui.toast("请登录")
		}
	})
	$(".me_qiandao").click(function() {
		var text = $(this).children("div:last-child").text()
		if(userId && text == "签到") {

			$.ajax({
				type: "get",
				url: config.data + "users/getSign",
				async: true,
				data: {
					uid: userId
				},
				success: function(data) {
					if(data.state == 1) {
						$(this).children("div:last-child").text("已签到")
						$(this).children("div:first-child").find("img").css("display", "none")
						$(this).children("div:first-child").append('<img src="../../Public/image/me_alrdao.png"/>')
					} else if(data.state == 2) {
						//不允许重复签到
					} else {

					}
					mui.toast(data.info)
				}
			})

		} else {
			mui.toast("请登录")
		}
	})
})