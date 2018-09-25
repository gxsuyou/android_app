mui.plusReady(function() {

	var mask = mui.createMask(function(){
//		return false
	});//callback为用户点击蒙版时自动执行的回调；
     
    $("body").on("tap",".me_tochar",function(){
    	//		var playerId=$(".playerId").val()
//		var phoneNum=$(".phoneNum").val()
//		var playDir=$(".playDir").val()
//		alert(playerId)
    	mask.show()
    	$(".me_downcontents").css("display","block")
    })
    $("body").on("tap",".me_downclose",function(){
    	mask.close();//关闭遮罩
    	$(".me_downcontents").css("display","none")
    })
})