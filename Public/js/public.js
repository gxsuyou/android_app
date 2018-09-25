var ENV = "dev";
//测试环境
if(ENV == "dev") {
	//发开模式
	var config = {
		img: "http://img.oneyouxi.com.cn/",
		apk: "http://apk.oneyouxi.com.cn/",
		//	data: "http://192.168.2.156:8877/",
		//	data:"http://192.168.2.108:8877/",
		//  data:"http://192.168.2.117:8877/",
		//	data:"http://182.61.26.179:8877/",
		//	data:"http://192.168.0.207:8877/",
		//	data:"http://192.168.0.67:8877/",
		//	data:"http://192.168.0.207:8877/",
		data: "http://182.61.26.179:8877/",
		base64: "http://base64.oneyouxi.com.cn/",
		//	url_upload:"http://182.61.26.179:8878/",
		url_upload:"https://admin.oneyouxi.com.cn/",
		//	url_upload:"http://192.168.0.207:8878/",
		wgtUrl: "https://admin.oneyouxi.com.cn/www/test/APK/H5C62934A.wgt"
	}
} else {
	//正式模式
	var config = {
		img: "http://img.oneyouxi.com.cn/",
		apk: "http://apk.oneyouxi.com.cn/",
		data: "http://onetest.oneyouxi.com.cn/",
		base64: "http://base64.oneyouxi.com.cn/",
		url_upload: "https://admin.oneyouxi.com.cn/",
		wgtUrl: "https://admin.oneyouxi.com.cn/www/APK/H5C62934A.wgt"
	}
}

var userInfostr = window.localStorage.getItem("userInfo")
var userInfojson = eval('(' + userInfostr + ')')
if(userInfojson) {
	var userId = userInfojson.id
} else {
	var userId = 0
}

function activeBell() {
	if(userId) {
		$.ajax({
			type: "get",
			url: config.data + "news/getTip",
			async: true,
			data: {
				"userId": userId
			},
			success: function(data) {
				if(data.state == 1) {
					$(".bell").addClass("bell_active");
				} else {
					$(".bell").removeClass("bell_active");
				}
			}
		});
	}
}

var wgtVer = null;
var total_height;
var totalSize;

$(function() {
	mui.plusReady(function() {
		total_height = plus.navigator.getStatusbarHeight() + 45;
		$('.before_header').css({
			"height": total_height - 45 + "px",
			"width": "100%"
		});
		$('.header_box').next().css("margin-top", total_height + "px");

	})
});