var strategyId;
$(function() {
   
	var h = $(window).height()
	$(window).resize(function() {
		var changeHeight = $(window).height()
		if(changeHeight < h) {
			$('.show_imgs,.img_num').addClass('hidden')
			$('.choose_img').css('bottom', '0')
			$('.choose_game').css('bottom', '2.625rem')
		} else {
			$('.show_imgs,.img_num').removeClass('hidden')
			$('.choose_img').css('bottom', '10.625rem')
			$('.choose_game').css('bottom', '13.25rem')
		}
	});

	$('body').on('tap', '.delete_img', function() {
		$(this).parent().parent('.show_imgcontent').remove()
	})
	/* 退出保存数据 */
	$("body").on("tap", ".mui-back", function() {

		var val = $("#strategy_textarea").val()
		localStorage.setItem("strategyVal_" + strategyId, val)
		if(plus.webview.getWebviewById("strategy_details.html")) {
			var wobj = plus.webview.getWebviewById("strategy_details.html");
		} else {
			var wobj = plus.webview.getWebviewById("me_works.html");
		}
		mui.fire(wobj, 'reload', {})
		
		mui.back()
	})

	mui.plusReady(function() {

		$('body').on('focus', "#strategy_textarea", function() {

			//    	$('.choose_img').css("bottom",'-500px')
		});
		var self = plus.webview.currentWebview();
		 strategyId = self.strategyId;
		var proId = self.proId;
		var target_img = self.target_img;
		var target_title = self.target_title;
		var strategyVal = localStorage.getItem("strategyVal_" + strategyId)
        $("#strategy_textarea").css("height", "auto")
		if(strategyVal) {
			$("#strategy_textarea").val(strategyVal)
		}

		$("body").on("tap", ".choose", function() {
			$(".faceContent").css("display", "none")
			$(".show_imgs").css("display", "block")
			$(".choose_img").css("bottom", "10.625rem")
			if(mui.os.plus) {
				var buttonTit = [

					{
						title: "从手机相册选择"
					}
				];

				plus.nativeUI.actionSheet({
					title: "上传图片",
					cancel: "取消",
					buttons: buttonTit
				}, function(b) { /*actionSheet 按钮点击事件*/
					switch(b.index) {
						case 0:
							break;
						case 1:
							galleryImgs(); /*打开相册*/
							break;
						default:
							break;
					}
				})
			}
		})

		face_contents.get()

		
		window.onresize = function() {
			changeTextContent()
		}
		function changeTextContent() {		
			var _body = $("body").height()
			var _chooseC = $(".choose_img").height()
			var _header = $(".header_box").height()

			//		console.log("全局" + _body)
			//		console.log("下部" + _chooseC)
			//		console.log("头部" + _header)

			var _remain = _body - _chooseC - _header

			//console.log(_remain) //被减去剩余的空间
			var _textarea = $("#strategy_textarea").height()
			//console.log(_textarea) //text的高度
 
			//如果剩余空间大于text的高度
			if(_remain < _textarea) {
				//打开并聚焦修改高度
				$("#strategy_textarea").css("height", _remain)
                 console.log("打开并聚焦修改高度")
			} else {
				//关闭不聚焦修改高度
				$("#strategy_textarea").css("height", "auto")
			}
		}

		var face_t = 1;
		$("body").on("mousedown", ".face", function(e) {
			//var _body = $("body").height()
			e.preventDefault();
			var _body = $("body").height()
			var isFocus
			console.log(_body)
			//小于600的高度则判断为聚焦否则失焦
//			console.log( window.screen.availHeight)
			_body < 600 ? isFocus = true : isFocus = false;
			if(face_t == 1) {
				face_t = 0; //出现			
				$(".faceContent").css("display", "block")
				$(".show_imgs").css("display", "none")
				if(true == isFocus) {
					$(".choose_img").css("bottom", "0rem")
				} else {
					$(".choose_img").css("bottom", "2.425rem")
				}

			} else {
				face_t = 1; //消失			
				$(".faceContent").css("display", "none")
				$(".show_imgs").css("display", "none")
				if(true == isFocus) {
					$(".choose_img").css("bottom", "0rem")
				} else {
					$(".choose_img").css("bottom", "10.625rem")
				}

			}

			changeTextContent()
		})
		/* 插入图片 */
		$("body").on("mousedown", ".faceContent div", function(e) {
			 e.preventDefault();
			var textarea_num = $("#strategy_textarea").val().length
			if(textarea_num >= 200) {
				mui.toast("输入字符只能输入200个字")
				return false;
			}
			var str = $(this).attr("data-id")
			var tc = document.querySelector("#strategy_textarea")
			var tclen = tc.value.length;
			tc.focus();
			if(typeof document.selection != "undefined") {
				document.selection.createRange().text = str;
			} else {
				tc.value = tc.value.substr(0, tc.selectionStart) + str + tc.value.substring(tc.selectionStart, tclen);
			}

		})

		$('.publish').click(function() {
			mui.toast("正在发送，请稍候")
			var content = $('#strategy_textarea').val();
			if(content) {
				$.ajax({
					type: "post",
					url: config.data + "strategy/strategyComment",
					async: true,
					data: {
						userId: userId,
						content: content,
						targetCommentId: strategyId,
						targetUserId: proId,
						series: 1,
						target_img: target_img,
						targetid: strategyId,
						target_title: target_title
					},
					success: function(data) {
						if(data.state) {
							mui.toast("评论成功")
							localStorage.setItem("strategyVal_" + strategyId,"")
							var commentId = data.commentId;
							if($('.show_imgs').find('.show_imgcontent').length >= 1) {

								$('.show_imgcontent').each(function(index) {

									var imgPath = $(this).attr('data-src');

									// 上传图片
									upLoad(commentId, 'startegyComment/commentId' + commentId + '/img' + index, imgPath)

								});
							} else {

								mui.back()
							}

						} else {

						}
					}
				});
			} else {
				mui.toast("内容不能为空")
			}
		})

	})

})
// 从相册中选择图片   
function galleryImgs() {
	// 从相册中选择图片  
	plus.gallery.pick(function(path) {

		var token;

		if($('.show_imgs > .show_imgcontent').length < 1) {
			var div =
				"<div class='show_imgcontent' data-src = '" + path + "'>" +
				"<div class='img_box'>" +
				"<img class='show_img'  data-preview-group='2' data-preview-src='' src='" + path + "'>" +
				"</img>" +
				"<div class='delete_img'></div>" +
				"</div>" +
				"</div>";
			$('.show_imgs').append(div)

		} else {
			mui.toast("只能发送一张图片，请确认您要发的图片")
		}

	}, function(e) {
		console.log("取消选择图片");
	}, {
		filter: "image",
		system: false,

	});
}

//	选择图片结束

//上传图片
function upLoad(commentId, key, path) {
	getUpToken('img', key, function(token) {
		var url = "http://upload-z2.qiniup.com/";
		var uploader = plus.uploader.createUpload(url, {
			method: "post"
		}, function(t, status) {
			if(status == 200) {
				console.log(JSON.parse(t.responseText).key)
				$.ajax({
					type: "get",
					url: config.data + "strategy/updateCommentImg",
					async: true,
					data: {
						commentId: commentId,
						img: JSON.parse(t.responseText).key
					},
					success: function(data) {
						$('.show_imgs').children().remove();
						$('textarea').val("");
						mui.back();
					}
				});
			} else {
				console.log("上传失败 - ", status);
				mui.toast("上传图片失败")
			}

		});

		uploader.addData("key", key);
		uploader.addData("token", token);
		uploader.addFile(path, {
			"key": "file"
		}); // 固定值，千万不要改！！！！！！
		uploader.start();
	})
}

function getUpToken(scope, key, callback) {
	$.ajax({
		type: "get",
		url: config.data + "users/getUptokenByMsg",
		async: true,
		data: {
			scope: scope,
			key: key
		},
		success: function(data) {
			token = data.upToken;
			return callback(token)
		}
	});
}
//上传到七牛的function结束