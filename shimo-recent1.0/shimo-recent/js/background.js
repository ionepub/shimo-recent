var openOnNew=false;
$(document).ready(function(){
	try{
		openOnNew=parseInt(localStorage['openOnNew']) > 0 ? true : false;
	}catch(c){}

	chrome.extension.onMessage.addListener(function(request, sender, sendResponse) {
		if(request.cmd=='changeOpen'){
			var checked = request.checked;
			localStorage['openOnNew'] = checked ? 1 : 0;
			chrome.storage.local.set({'openOnNew': localStorage['openOnNew']});
		}
	})

});
