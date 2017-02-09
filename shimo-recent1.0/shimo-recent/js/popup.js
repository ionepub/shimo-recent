$(document).ready(function(){
	$("#checkbox").change(function(){
		var checked = $(this).is(':checked');

		chrome.extension.sendMessage({cmd: "changeOpen", checked: checked},function(response) {
			// do nothing
		});
	})
	
	chrome.storage.local.get('openOnNew', function(valueArray) {
        var openOnNew = parseInt(valueArray.openOnNew);
        if(openOnNew > 0){
        	// 勾选
        	$("#checkbox").attr("checked", true);
        }else{
        	$("#checkbox").attr("checked", false);
        }
	});

});