$(function(){
	if($("#header-wrap").size() == 0){
		return false;
	}

	// 顶部最近文档工具条
	var headerWrap = '<div id="appHeaderWrap">'
					+ '<ul>'
					+ '</ul>'
					+ '</div>'
					+ '<div id="appHeaderTitle" data-show="false">最近文档</div>';
	$("#header-wrap").eq(0).before(headerWrap);
	
	// 检查屏幕宽度，决定显示的文档数
	// 最大显示12个
	var docNum = 12;
	var winWidth = $(window).width();
	if(winWidth < 1584){
		docNum = parseInt(winWidth / 132);
		$("#appHeaderWrap ul").css("width", docNum * 132);
	}

	// 是否新窗口打开
	var openOnNew = 0;
	chrome.storage.local.get('openOnNew', function(valueArray) {
        openOnNew = parseInt(valueArray.openOnNew);
	});

	// 获取最近文档列表数据
	var hideRecentWrap = '<div id="hideRecentWrap"></div>';
	$("body").eq(0).append(hideRecentWrap);

	$.get("https://shimo.im/recent", function(data){
		var list = data.match(/tempCurrentFile:(.*)authorized/)[1];
		list += 'authorized":true}]}';
		list = JSON.parse(list);
		
		var recentDocStr = "";

		if(list.children.length > 0){
			for(var i = 0; i < list.children.length; i++){
				var item = list.children[i];
				var docItem = {
					guid: item.guid,
					name: item.name,
					type: item.type
				}
				if(i < docNum){
					recentDocStr += getTemplate(docItem);
				}
			}
		}

		$("#appHeaderWrap").eq(0).find("ul").html(recentDocStr);
	})

	$("#appHeaderTitle").click(function(){
		var isShow = $(this).data("show");
		if(isShow == "true"){
			// 收起
			$(this).data("show","false").animate({
				'top':'0px'
			}, "fast");
			$("#appHeaderWrap").slideUp("fast");
		}else{
			// 展开
			$("#appHeaderWrap").slideDown("fast");
			$(this).data("show","true").animate({
				'top':'140px'
			}, "fast");
		}
	})

	function getTemplate(item){
		var openOnNewStr = openOnNew > 0 ? ' target="_blank" ' : " ";
		if(item.type == 0){
			return '<li class="doc"><a href="https://shimo.im/doc/'+ item.guid +'" title="'+ item.name +'" '+ openOnNewStr +'><i></i><span>'+ item.name +'</span></a></li>';
		}else if(item.type == -1){
			return '<li class="xls"><a href="https://shimo.im/spreadsheet/'+ item.guid +'" title="'+ item.name +'" '+ openOnNewStr +'><i></i><span>'+ item.name +'</span></a></li>';
		}else{
			return '';
		}
	}

})