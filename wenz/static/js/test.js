(function(){
		
		var loadScript = function(script) {
			$.ajax({
				method : 'GET',
				url : script,
				dataType : 'text'
			}).done( function(data){
				$.globalEval(data);
			});
		};
		var init = function(){
			var readyFunctions = $('#readyFunctions').html();
			var readyJs;
			
			if(checkDevice.isIE8()){
				readyJs = readyFunctions.slice(4, readyFunctions.length-4);
			} else {
				readyJs = readyFunctions.slice(2, readyFunctions.length-2);
			}
			
			$.globalEval(readyJs);
			
			
			try {
				loadScript('/static/js/Product.min.js?201604211623');
			} catch(e) {
				if(window.console){
					console.log(e);
				}
			}
			
		}
		try {
		
				$.getScript('/static/js/kmo.min.js?201604211623',init);
			
		} catch(e) {
			if(window.console){
				console.log(e);
			}
		}
	})();
