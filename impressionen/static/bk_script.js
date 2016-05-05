/*
** Bl�tterkatalog Integration Script
** *********************************
**
** 1) 	addToCart(artno, shopsessionid)
**	Wird bei Linktyp "Artikel in Warenkorb legen"
**	aufgerufen.
**
**
** 2) 	blaetterkatalogflip(newPage)
**	Bl�ttert auf die gegebene Seite
**	Wird bei Linktyp "Gehe zu Seite" verwendet.
**
**	TODO: Kann optional verwendet werden
**	      um mittels
**
**	<a href="javascript:blaetterkatalogflip(5)">Gehe zu Seite 5</a>
**
**	den Bl�tterkatalog umzubl�ttern.
**	(Beispiel: Auf Kapitel-Startseite bl�ttern)
**
** 3)   gotoURL(myURL)
**   	Wird bei Linktyp "Externer Link" und
**	von addToCart aufgerufen
**
*/
	/**
	*/
	function trackPageHit(page) {
	}

	function addToCart(artno, shopsessionid)
	{
	   var destinationURL = shopBase + shopURL + shopSessionIDParameterName + shopsessionid + shopArticleIDParameterName + artno + shopURLPostfix;

	   if (shopDebug) alert("ShopSessionID: "+shopsessionid+"\nArtikel "+artno+" in Detailansicht Shop aufrufen\n\nSHOP URL: "+destinationURL);


	   if (!shopDebug) gotoURL(destinationURL);

	}


	/**
	*  bl�ttert auf die entsprechende seite um
	*  setzt voraus, dass der bl�tterkatalog in
	*  dem fenster noch geladen ist
	*/
	function blaetterkatalogflip(newPage)
	{
		flashCommand('jump_to_id', newPage)
	}


	/**
	* sprint zu einer URL
	* Ziel: Shop-Fenster
	*/
	function gotoURL( myURL )
	{
		if (myURL.indexOf("mailto:")!=-1) {
			location.href=myURL;
			return;
		}
		if (myURL.indexOf("http://")!=0 && myURL.indexOf("https://")!=0 && myURL.indexOf("mailto:")!=0) {
			myURL = "http://"+myURL;
		}
		try {
			if ( typeof( opener ) == "undefined" || typeof( opener ) == "unknown" ||
			    	typeof( opener.name ) == "undefined" || typeof( opener.name ) == "unknown" )
			{
				if ( shopFenster.closed )
				{
					shopFenster = window.open( myURL, "shop", "" );
					shopFenster.focus();
				}
				else
				{
					shopFenster.location.href=myURL;
					shopFenster.focus();
				}
			}
			else
			{
				opener.location.href = myURL;
				opener.blatterkatalogPopup = window;
				opener.focus();
			}
		}
		catch ( Exception )
		{
			// if( opener && !opener.closed )
			// {
			// 	opener.location.href = myURL;
			// 	opener.focus();
			// }
			// else
			// {
				try {
					if ( shopFenster.closed )
					{
						shopFenster = window.open( myURL, "shop", "" );
						shopFenster.focus();
					}
					else
					{
						shopFenster.location.href = myURL;
						shopFenster.focus();
					}
				}
				catch ( Exception )
				{
						shopFenster = window.open( myURL, "shop", "" );
						shopFenster.focus();
				}
			// }
		}
	}

	/**
	 * getFlashPath() ermittelt das Flash-Objekt
	 */
	function getFlashPath()
	{
    	if ( document.all )
    	{
	        //ie
	        return document.bkflash;
    	}
    	else
    	{
	        //safari
	        var ffilm = document.getElementById( "bkflash" );
	        try
	        {
	            flashfilm.SetVariable( "tst", "1" );
	       	}
	       	catch ( Exception )
	       	{
	            //firefox
            	ffilm = document.embeds["bkflash"];
            }
            return ffilm;
	    }
	}



	/////////////////////////////////////
	// Funktion zum externen Aufruf der Flash-Commands
	// id => 'jump_to_id'
	// par => pageid
	// aufruf mit z.b. flashCommand('jump_to_id', 5)
	/////////////////////////////////////
	function flashCommand( id, par )
	{
		try
		{
		    var movie = getFlashPath();
		    movie.SetVariable( "jscommand", id + "|" + par );
		}
	    catch( Exception )
	    {
	      	document.getElementById("bkflash").SetVariable( "jscommand", id + "|" + par );
	    }
	}


	function getURLParam( strParamName, defaultBKValue )
	{
		var strReturn = " ";
		var strHref = window.location.href;

		var i = strHref.indexOf( strParamName );

		if ( i > 0 )
		{
			var j = strHref.indexOf( "=", i + 1 );
			if ( j > 0 )
			{
				var endPos = strHref.length;
				var k = strHref.indexOf( "?", j + 1 );
				var l = strHref.indexOf( "&", j + 1 );
				if ( k > 0 && l > 0 )
				{
					if ( k < l )
					{
						endPos = k;
					}
					else
					{
						endPos = l;
					}
				}
				else if ( k > 0 )
				{
				  endPos = k;
				}
				else if ( l > 0 )
				{
				  endPos = l;
				}

				strReturn = strHref.substring( j + 1 , endPos );
			}
		}

		if (strReturn == "" || strReturn == " ")
		{
			if (defaultBKValue)
			{
				return defaultBKValue;
			}
		}

		return strReturn;
	}

	window.onerror = stoperror;

	function stoperror( a )
	{
  		return false;
	}
