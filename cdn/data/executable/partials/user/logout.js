catalogi = jQuery.noConflict(true);

catalogi(function(){
	catalogi('#_logout_partial #_close').click(function(){
		top.postMessage({action: 'closeColorbox'},'*');
		top.postMessage({action: 'location', url: 'http://cdn.catalogi.ru/executable/actions/_user.php'},'*');
	});
});