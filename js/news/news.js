var newArray = [];
$(function() {
	mui.plusReady(function() {
		$('.header_box').next().css("margin-top", 0);
		$('.bell').css("top", total_height - 40 + "px");
		$('.search').css("top", total_height - 40 + "px");
		$('.one').css("top", total_height - 34 + "px");
	})
	getHeaderimg();
	$.ajax({
		type: "get",
		url: config.data + "news/getNewsByPage",
		async: true,
		data: {
			"page": page
		},
		timeout: 20000,
		success: function(data) {
			if(data.state) {
				var n = data.news;
				if(n[0].game_id) {
					$('.news_artAlone > .news_art').attr(
						"data-gameId", n[0].game_id
					)
				} else {
					$('.news_artAlone > .news_art .news_img_content .news_img_header').addClass('hidden')
				}
				$('.news_artAlone > .news_art').attr("data-id", n[0].id)

				var news_img_1 = new Image();
				news_img_1.onload = function() {
					$('.news_artAlone > .news_art > .news_img').css("background-image", "url(" + config.img + encodeURI(n[0].img) + ")")
				}
				news_img_1.src = config.img + encodeURI(n[0].img)

				//$('.news_artAlone > .news_art > .news_img').css("background-image", "url(" + config.img + encodeURI(n[0].img) + ")")

				$('.news_artAlone > .news_art  .news_img_header').css("background-image", "url(" + config.img + encodeURI(n[0].icon) + ")")
				$('.news_artAlone > .news_art  .news_art_viewNum').text(n[0].browse)
				$('.news_artAlone > .news_art  .news_art_praisePoint').text(n[0].agree)
				$('.news_artAlone > .news_art  .new_art_name').text(n[0].game_name)
				$('.news_artAlone > .news_art  .news_art_art').text(n[0].title)
				$('.news_artAlone > .news_art  .news_art_time').text(n[0].add_time)

				if(n[1].game_id) {
					$('.news_art2').attr({
						"data-gameId": n[1].game_id
					})
				} else {
					$('.news_art2 > .news_art .news_img_content').addClass('hidden')
				}
				$('.news_art2').attr('data-id', n[1].id)
				//$('.news_art2 > .news_img').css("background-image", "url(" + config.img + encodeURI(n[1].img) + ")")
				var news_img_2 = new Image()
				news_img_2.onload = function() {
					$('.news_art2 > .news_img').css("background-image", "url(" + config.img + encodeURI(n[1].img) + ")")
				}
				news_img_2.src = config.img + encodeURI(n[1].img)
				$('.news_art2  .news_img_header').css("background-image", "url(" + config.img + encodeURI(n[1].icon) + ")")
				$('.news_art2  .news_art_viewNum').text(n[1].browse)
				$('.news_art2  .news_art_praisePoint').text(n[1].agree)
				$('.news_art2  .new_art_name').text(n[1].game_name)
				$('.news_art2  .news_art_art').text(n[1].title)
				$('.news_art2  .news_art_time').text(n[1].add_time)

				var div = "";
				for(var i = 2; i < n.length; i++) {
					newArray.push({
						src: config.img + encodeURI(n[i].img),
						img: new Image()
					});
					//overflow
					if(n[i].game_id) {
						div +=
							"<div class='news_art ofh' style='margin-top: 0.75rem;margin-bottom: 0.2rem;' data-id = '" + n[i].id + "' data-gameId = '" + n[i].game_id + "'>" +
							"<div class='news_img' >" +
							"<div class='news_img_content color_white'>" +
							"<div class='news_img_header fl' style='background-image:url(" + config.img + encodeURI(n[i].icon) + ")'></div>" +
							"<div class='fl  new_art_name font_14 '>" + n[i].game_name + "</div>" +
							"<div class='fr font_12' style='margin-top: 1.75rem;'>" +
							"<div class='fr news_art_viewNum' style='width: 1.8rem;'>" + n[i].browse + "</div>" +
							"<div class='fr news_art_view'></div>" +
							"</div>" +
							"</div>" +
							"</div>" +
							"<div class='news_art_content'>" +
							"<div class='news_art_art font_14 font_bold fl ofh'>" +
							n[i].title +

							"</div>" +

							"</div>" +

							"<div class='news_art_time font_12'>" +
							n[i].add_time +
							"</div>" +

							"</div>"
					} else {
						div +=
							"<div class='news_art ofh' style='margin-top: 0.75rem;margin-bottom: 0.2rem;' data-id = '" + n[i].id + "' data-gameId = '" + n[i].game_id + "'>" +
							"<div class='news_img' >" +
							"<div class='news_img_content color_white'>" +
							"<div class='news_img_header fl' style='background-image:url(" + config.img + encodeURI(n[i].icon) + ")'></div>" +
							"<div class='fr font_12' style='margin-top: 1.75rem;'>" +

							"<div class='fr news_art_viewNum' style='width: 1.8rem;'>" + n[i].browse + "</div>" +
							"<div class='fr news_art_view'></div>" +
							"</div>" +
							"</div>" +
							"</div>" +
							"<div class='news_art_content'>" +
							"<div class='news_art_art font_14 font_bold fl ofh'>" +
							n[i].title +

							"</div>" +

							"</div>" +

							"<div class='news_art_time font_12'>" +
							n[i].add_time +
							"</div>" +

							"</div>"

					}

				}
				$('.news_art_list').append(div)
				newArray.forEach(function(item, value) {
					item.img.onload = function() {
						$('.news_art_list .news_img').eq(value).css('background-image', "url(" + item.src + "");
					}
					item.img.src = item.src
				})
			} else {

			}
		},
		error: function(e) {
			var errorHTML = "<div class='errorContent'><img style='width:138px;height:180px;' src='../../Public/image/notonline.png' /></div>";
			$("#news_content").remove();
			$('body').append(errorHTML);
		}
	});

	$.ajax({
		type: "get",
		url: config.data + "news/getSlideGame",
		async: true,
		success: function(data) {
			if(data.state) {
				var h = "";
				var g = data.gameList;
				for(var i = 0; i < g.length; i++) {
					h +=
						"<div class='news_newGame_content' data-id ='" + g[i].id + "'>" +
						"<div class='news_newGame_contentImg' style='background-image:url(" + config.img + encodeURI(g[i].game_title_img) + ")'></div>" +
						"<div class='news_newGame_contentArt font_12'>" +
						"<span class='h_name'>" + g[i].game_name + "</span>" +
						"<span class='fr'>" + g[i].grade + "</span>" +
						"<span class='news_newGame_contentArtstar fr'></span>" +

						"</div>" +
						"</div>"
				}
				$('.news_newGame_contents').append(h)

			}
		}
	});

	$('#news_content').css("margin-top", "0")

	$('.search').click(function() {
		mui.openWindow({
			url: "news_search.html",
			id: "news_search.html"
		})
	})

	$('body').on("tap", ".bell", function() {
		userId == 0 ?
			mui.openWindow({
				url: "../user/login.html",
				id: "login.html"
			}) :
			mui.openWindow({
				url: "news_center.html",
				id: "news_center.html"
			});
	})

	$('body').on("tap", ".news_art,.news_art2", function() {
		var th = $(this);
		var id = th.attr('data-id');
		$.ajax({
			type: "get",
			url: config.data + "news/updateNewsBrowse",
			async: true,
			data: {
				id: id
			},
			success: function(data) {

				if(data.state) {

					th.find('.news_art_viewNum').eq(0).text(data.browse);

				} else {

				}
			}
		});
		mui.openWindow({
			url: "news_post.html",
			id: "news_post.html",
			extras: {
				newsId: id,
				gameId: th.attr("data-gameId")
			}
		})

	})
	$('.game').click(function() {
		mui.openWindow({
			url: "../game/game_detail.html",
			id: "../game/game_detail.html",
			extras: {
				gameId: $(this).attr('data-id')
			}

		})
	})
	$('body').on('click', '.news_newGame_contents > .news_newGame_content', function() {
		mui.openWindow({
			url: "../game/game_detail.html",
			id: "../game/game_detail.html",
			extras: {
				gameId: $(this).attr('data-id')
			}

		})
	})

})

/* 顶部的头图 */
function getHeaderimg() {
	$.ajax({
		type: "get",
		url: config.data + "news/getHeadGame",
		async: true,
		success: function(data) {
			var g = data.game;
			if(data.state) {
				var img = new Image();
				img.onload = function() {
					$('.game').css("background-image", "url(" + img.src + ")")
				}
				img.src = config.img + g.img
				$('.game_header').css("background-image", "url(" + config.img + encodeURI(g.icon) + ")")
				$('.game_name').text(g.game_name)
				$('.game_datail').text(g.game_recommend)
				$('.new_score').text(g.grade)
				$('.game').attr("data-id", g.id)

			}
		}
	})
}