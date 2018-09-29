page = 0

function up() {
	page++
	$.ajax({
		type: "get",
		url: config.data + "game/getGameByMsg",
		async: true,
		data: {
			sys: 2,
			page: page,
			type: "",
			sort: "sort3",
		},
		success: function(data) {
			var g = data.game;
			if(data.state) {
				var list = '';
				for(var i = 0; i < g.length; i++) {
					var signs = '';
					if(g[i].tagList && g[i].tagList !== "null") {
						var downloadToggle = plus.runtime.isApplicationExist({
							pname: g[i].game_packagename,
							action: ''
						});
						if(downloadToggle) {
							var buttonDown = "打开";
						} else {
							var buttonDown = "下载";
						}

						list +=
							"<li class='game_list ofh' data-id='" + g[i].id + "'>" +
							"<div class='color_9e9e9e fl game_listScore'>" + (i + 1 + (page - 1) * 20) + "</div>" +
							"<div class='game_listImg fl' style='background-image: url(" + config.img + encodeURI(g[i].icon) + ");'></div>" +
							"<div class='fl' style='margin-top: 1.25rem;margin-left: 0.875rem;'>" +
							"<div class='font_14 overflow'>" + g[i].game_name + "</div>" +
							"<div class='font_12'>" +
							"</div>" +
							"<div class='font_12 color_green all_voucher_show'  data-name='"+g[i].game_name+"'  data-id='" + g[i].id + "'>" +
							"<img style='width:6.5rem;' src='../../Public/image/voucher_icon.png'  />" +
							"<div class='open_voucher'>领取更多抵用券<span>></span></div>" +
							"</div>" +
							"</div>" +
							"<div class='fr game_listDownload font_14 color_white backgroundColor_green tac' data-id='" + g[i].id + "'>"+ buttonDown+"</div>" +
							"</li>"
					}
				}

				$('.game_lists').append(list);
				$('.game_recommend_stars').each(function() {
					var score = $(this).find('.game_recommend_starScore').eq(0).text()
					var starNum = Math.round(score)
					if(starNum % 2 == 0) {
						var starFinal = (starNum / 2 - 1);
						$(this).children('.game_recommend_star').eq(starFinal).addClass('game_list_star_active')
						$(this).children('.game_recommend_star').eq(starFinal).prevAll('.game_recommend_star').addClass('game_list_star_active')
					} else {
						var starFinal = ((starNum - 1) / 2)
						$(this).children('.game_recommend_star').eq(starFinal).prevAll('.game_recommend_star').addClass('game_list_star_active')
						$(this).children('.game_recommend_star').eq(starFinal).addClass('game_list_star_half')
					}
				})

				if(g.length < 20) {

					mui('.list_game').pullRefresh().endPullupToRefresh(true);

				} else {
					mui('.list_game').pullRefresh().endPullupToRefresh(false);
				}

			}
		}
	})
}

$(function(){
	var sharew;
	var h;	
	$('body').on('tap', '.game_list,.game_listDownload', function() {
		mui.openWindow({
			url: "game_detail.html",
			id: "game_detail.html",
			extras: {
				gameId: $(this).attr('data-id')
			}
		});
	})
	$('body').on('tap','.all_voucher_show', function(event) {
		event.stopPropagation()	
		var gameId=$(this).attr("data-id")   
	    var name=$(this).attr("data-name")
		var href = "game_getvoucher.html"
		sharew = plus.webview.create(href, "game_getvoucher.html", {
			width: '100%',
			height: '100%',
			top: 0,
			zindex: 0,
			opacity: 1,
			background: 'transparent',
			scrollIndicator: 'none',
			scalable: false,
			popGesture: 'none',
		}, {
			info: {
				gameName:name,
				gameId:gameId
			}
		});
		sharew.addEventListener("loaded", function() {
			sharew.show('fade-in', 0);
		}, false);

		h = plus.webview.currentWebview();
		h.setStyle({
			mask: "rgba(0,0,0,0.5)"
		});
	})
	

})



function down() {
	location.reload()
}