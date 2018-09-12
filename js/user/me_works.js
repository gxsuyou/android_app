var msg;
$(function() {
	//	$('body').click(function(){
	//		mui.openWindow({
	//			url:"strategy_add.html"
	//		})
	//	})
    $('body').on('tap', '.strategy_content_classify', function(e) {
		e.stopPropagation()
		var msg = $(this).text();
		mui.openWindow({
			url: "../strategy/strategy_search_result.html",
			id: "strategy_search_result.html",
			extras: {
				msg: msg
			}
		})
	})
	window.addEventListener('reload', function() {
		// mui.fire()传过来的额外的参数，在event.detail中；
		window.location.reload();
		// var param = detail.param;
		// 执行相应的ajax或者操作DOM等操作
	});

	$('body').on('tap', '.strategy_content', function() {
		var strategyId = $(this).attr('data-id');
		mui.openWindow({
			url: "../strategy/strategy_details.html",
			id: "strategy_details.html",
			extras: {
				strategyId: strategyId,
				anchor: true
			}
		})
	})

	$('body').on('longtap','.strategy_content',function() {
		var strategyId  = $(this).attr('data-id');
		var btnarr = ["确定", "取消"];
		mui.confirm("你确定删除这条攻略吗？", "操作提示", btnarr, function(e) {
			if(e.index == 0) {
				$.ajax({
					type:"get",
					url:config.data + "strategy/strategyDelete",
					async:true,
					data:{
						strategyId:strategyId
					},
					success:function(data){
						if (data.state) {
							mui.alert("删除成功！", "操作提示", "确定");
							location.reload()
						} else{
							mui.alert("删除失败！", "操作提示", "确定");
						}
					}
				});
				
			} else {
				
			}
		});
	})

})