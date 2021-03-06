var newsId;
var page = 0;
var userId = localStorage.getItem("userId") || 22;
var commentId;
var targetCommentId;
var targetUserId;
mui.init({
	swipeBack: true, //启用右滑关闭功能
	beforeback: function() {　　
		//获得父页面的webview
		var list = plus.webview.getWebviewById('news_post.html');　　 //触发父页面的自定义事件(refresh),从而进行刷新
		mui.fire(list, 'refresh');
		//返回true,继续页面关闭逻辑
		return true;
	},
	pullRefresh: {
		container: ".news_allComments", //下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
		up: {
			height: 50, //可选.默认50.触发上拉加载拖动距离
			auto: true, //可选,默认false.自动上拉加载一次
			contentrefresh: "正在加载...", //可选，正在加载状态时，上拉加载控件上显示的标题内容
			contentnomore: '没有更多评论了', //可选，请求完毕若没有更多数据时显示的提醒内容；
			callback: up //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		},
		down: {
			style: 'circle', //必选，下拉刷新样式，目前支持原生5+ ‘circle’ 样式
			color: '#2BD009', //可选，默认“#2BD009” 下拉刷新控件颜色
			height: '50px', //可选,默认50px.下拉刷新控件的高度,
			range: '100px', //可选 默认100px,控件可下拉拖拽的范围
			offset: '0px', //可选 默认0px,下拉刷新控件的起始位置
			auto: false, //可选,默认false.首次加载自动上拉刷新一次
			callback: down //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		}

	}

})
$(function() {
	face_contents.get()
	var face_to = 1;
	$("body").on("mousedown", ".face", function(e) {
		e.preventDefault()
		if(face_to == 1) {
			face_to = 0
			$(".faceContent").css("display", "block")
			$(".news_post_commentContents").css("padding-bottom", "8.2rem")
		} else {
			face_to = 1
			$(".faceContent").css("display", "none")
			$(".news_post_commentContents").css("padding-bottom", "0rem")
		}
	})
	$("body").on("mousedown", ".faceContent>div", function(e) {
		e.preventDefault()
		var str = $(this).attr("data-id")
		var tc = document.querySelector(".news_secondComment_input")
		var tclen = tc.value.length;
		tc.focus()
		if(typeof document.selection != "undefined") {
			document.selection.createRange().text = str;
		} else {
			tc.value = tc.value.substr(0, tc.selectionStart) + str + tc.value.substring(tc.selectionStart, tclen);
		}
	})
	mui.plusReady(function() {
		var self = plus.webview.currentWebview();
		newsId = self.newsId;
		commentId = self.commentId;
		targetUserId = self.targetUserId;
		firstImg = self.firstImg;
		title = self.title;
		//获取一级评论

		$.ajax({
			type: "get",
			url: config.data + "news/getCommentById",
			async: true,
			data: {
				"commentId": commentId
			},
			success: function(data) {
				if(data.state) {
					var c = data.comment;
					if(c.portrait == 0 || c.portrait == null) {
						portrait = "../../Public/image/morentouxiang.png";
					} else {
						portrait = c.portrait;
					}
					$('.news_post_commentContent_head').css('background-image', "url(" + encodeURI(portrait) + ")")
					$('.news_post_commentContent').attr("data-id", c.id);
					$('.news_post_commentContent').attr("data-userId", c.user_id);
					$('.comment_userOne').text(c.nick_name);
					$('.comment_contentOne').html(c.content);
					$('.timeOne').text(c.add_time);
					$('.comment_summary').attr('data-id', c.newsid);

					if(c.news_img) {
						$('.comment_summary_img').css('background-image', 'url(' + config.img + encodeURI(c.news_img) + ')')
					} else {
						$('.comment_summary_img').css('background-image', 'url(../../Public/image/link.png)')
					}
					$('.comment_summary_art').text(c.news_title)
					targetCommentId = $('.news_post_commentContent').attr("data-id");
					targetUserId = $('.news_post_commentContent').attr("data-userId");
				}
			}
		});

		$('body').on('tap', '.comment_summary', function() {
			var newsId = $(this).attr('data-id');
			mui.openWindow({
				url: "news_post.html",
				id: "news_post.html",
				createNew: true,
				extras: {
					newsId: newsId,
				}
			})
		})

		//		获取一级评论结束	

		$('body').on('tap', '.news_post_commentContent', function() {
			$('.news_secondComment_input').focus();
			targetUserId = $(this).attr("data-userId")
		})

		/* 删除二级评论  */
		$("body").on("tap", ".comment_dele", function() {
			var id = $(this).attr("data-id")
			plus.nativeUI.confirm("删除评论", function(e) {
				if(e.index == 0) {
					$.ajax({
						type: "get",
						url: config.data + "news/delMyComment",
						async: true,
						data: {
							uid: userId,
							id: id
						},
						success: function(data) {
							if(data.state == 1) {
								mui.toast("删除成功")
								window.location.reload()
							} else {
								mui.toast("删除失败")
							}
						}
					})
				}
			})
		})

		//		点击发布
		$('.publish').click(function() {
			var content = $(this).prev().prev().val();
			if(content) {
				$.ajax({
					type: "get",
					url: config.data + "news/comment",
					async: true,
					data: {
						"targetCommentId": targetCommentId,
						"userId": userId,
						"series": 2,
						"content": content,
						"targetUserId": targetUserId,
						"news_img": firstImg,
						"newsid": newsId,
						"news_title": title
					},
					success: function(data) {
						if(data.state == "1") {
							mui.toast("评论成功")
							$('.news_secondComment_input').val("");
							$('.news_post_secondcommentContents').children().empty();
							$(".news_post_commentContents").css("padding-bottom", "0rem")
							page = 0;
							up();
						} else {
							mui.toast("失败")
						}
						$(".faceContent").css("display", "none")
					}
				});
			} else {
				mui.toast("发送内容不能为空")
			}
		})
		//点击发布结束	
	})
	//ready结束
})

//(function())结束

function up() {
	//		获取二级评论
	page++;
	$.ajax({
		type: "get",
		url: config.data + "news/getNewsCommentTowByPage",
		async: true,
		data: {
			"parentId": commentId,
			"page": page
		},
		success: function(data) {
			if(data.state) {
				var com = data.comment;
				var div = "";
				var portrait;
				for(var i = 0; i < com.length; i++) {
					var ifHidden = com[i].targetUserNickName || "hidden";

					if(com[i].portrait == 0 || com[i].portrait == null) {
						portrait = "../../Public/image/morentouxiang.png";
					} else {
						portrait = com[i].portrait;
					}

					if(com[i].user_id == userId) {
						var comment_dele = "<div class='font_12 fl color_7fcadf comment_dele' data-id='" + com[i].id + "'>删除</div>"
					} else {
						var comment_dele = "&nbsp;"
					}

					div +=
						"<div class='news_post_commentContent ofh' style='border-top: 1px solid #e6ebec;margin-top: 0;border-bottom: 0;' data-id='" + com[i].id + "' data-userId='" + com[i].selfUserId + "' >" +
						"<div class='news_post_commentContent_head fl' style='background-image: url(" + encodeURI(portrait) + ");'></div>" +
						"<div class='news_post_commentContent_content fl'>" +
						"<div class='comment_user font_12'>" +
						"<span>" + com[i].selfNickName + "</span>" +
						//										"<span style='color: #7A7A7A;' class='"+ ifHidden +"'>回复</span>"+
						//										"<span class='"+ ifHidden +"'>"+ ifHidden + "</span>"+
						"</div>" +
						"<div class='comment_content font_14'>" + com[i].content + "</div>" +
						"<div class='comment_info ofh'>" +
						"<div class='font_12 color_9e9e9e fl'>" + com[i].add_time + "</div>" +
						comment_dele +
						"</div>" +
						"</div>" +
						"</div>"
				}

				$('.news_post_secondcommentContents').append(div);
				var num = $(".news_post_secondcommentContents>div").length;
				$(".news_allReply").text("全部回复 ( " + num + " )");
				if(com.length < 10) {
					mui('.news_allComments').pullRefresh().endPullupToRefresh(true);

				} else {

					mui('.news_allComments').pullRefresh().endPullupToRefresh(false);

				}
			}
		}
	});

	//		获取二级评论结束
}

function down() {
	window.location.reload();
	setTimeout(function() {
		mui('.news_allComments').pullRefresh().endPulldown(true);
	}, 1000)
}