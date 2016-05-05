//OPEN LINK
function onlinekat_open(linkContent, linkTarget, payload) {

		switch(linkTarget){
			case  "_javascript":
			{
				linkContent = "http://www.faibels.catalogi.ru/faibels/de/s?_sb=true&query="+linkContent;
				window.open(linkContent, "_top");
				break;
			}
      case  "text":
			{
				linkContent = "http://www.faibels.catalogi.ru/faibels/de/s?_sb=true&query="+linkContent;
				window.open(linkContent, "_top");
				break;
			}
			case "_deeplink":
			{
				window.open(linkContent, "_blank");
				break;
			}
			case "_webpage":
			{
				window.open(linkContent, "_blank");
				break;
			}
			case "_self":
			{
				window.open(linkContent, "_self");
				break;
			}
			case "_blank":
			{
				window.open(linkContent, "_blank");
				break;
			}
			case "_popup":
			{
				window.open(linkContent, '_blank','width=800,height=600,menubar=no,status=no,locationbar=no,scrollbars=no,resizable=yes');
				break;
			}
			default:
			{
				if (window.opener) {
					try {
						window.opener.location.href = linkContent;
						window.opener.focus();
					}
					catch (e) {
						window.open(linkContent, linkTarget);
					}
				}
				else {
					window.open(linkContent, linkTarget);
				}
			}//end default
		}//and switch
}
function addToBasket(linkContent) {
		console.log(linkContent);
		top.location.href = 'http://www.faibels.catalogi.ru/shop/s?query='+linkContent+'&searchSubmit=&fulltext-search=true&fromSearch=true';
}
function sendInformationToAnalytics(category, action, opt_label)
{
	_gaq.push(['_trackEvent', category, action, opt_label]);
}