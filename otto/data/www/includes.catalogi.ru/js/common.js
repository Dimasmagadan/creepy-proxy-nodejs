catalogi = jQuery.noConflict(true);

catalogi.updatedWnd = false;
catalogi.updateCode = "";

catalogi.basket = {
  add: function(product){
    //catalogi('#_basket').effect('shake', {distance: 5});
    catalogi.ajax({
      url: '/header/actions/_order_add.php',
      type: 'post',
      data: product,
      success: function(data){
        if(parseInt(data) > 0){
          catalogi.basket.change();
          catalogi.basket.update();
          catalogi('#_basket').trigger('click');
        }else{
          alert('Ошибка сервера! Попробуйте добавить заказ позднее.');
        }
      },
      error: function(data){
        console.log(data)
      }
    });
  },

  addFit: function(products){
    //catalogi('#_basket').effect('shake', {distance: 5});
    catalogi.ajax({
      url: '/header/actions/_order_add_fit.php',
      type: 'post',
      data: {
        products: JSON.stringify(products)
      },
      success: function(data){
        if(parseInt(data) > 0){
          catalogi.basket.change();
          catalogi.basket.update();
          catalogi('#_basket').trigger('click');
        }else{
          alert('Ошибка сервера! Попробуйте добавить заказ позднее.');
        }
      },
      error: function(data){
        console.log(data)
      }
    });
  },

  del: function(id, accept){
		catalogi.ajax({
		  url: '/header/actions/_order_del.php',
      type: 'post',
      data:{
        id: id
      },
      success: function(data){
        if(parseInt(data) > 0){ 
          catalogi.basket.change();
          catalogi.basket.count();
          if(typeof accept  == "function"){
            accept();
          }      
        }else{
          alert('Ошибка сервера! Попробуйте удалить заказ позднее.');
        }
      },
      error: function(data){
        console.log(data)
      }
		});
  },

  update: function(){
    catalogi('#_order_partial').trigger('_order_update');
    catalogi.basket.count();
  },

  change: function(){
    catalogi.cookie("last_order_add_page", window.location.toString(), {domain: "catalogi.ru", path: "/"});
    catalogi.cookie("updateCode", Math.random(), {domain: "catalogi.ru", path: "/"});
  },

  count: function(){
    catalogi('#_basket span').load('/header/actions/_order_count.php');
  }
}

catalogi.subscribe = function(){
  console.log(catalogi.cookie('_subscribe'));
  if(!catalogi.cookie('_subscribe')){
    setTimeout(function(){
      catalogi.cookie('_subscribe', '1', {path: '/'});
      catalogi.colorbox({
        iframe: true,
        href: '/header/partials/subscribe.php',
        innerWidth: 580,
        innerHeight: 480
      });      
    },1000);
    
  }
};

catalogi.init = function(){
  // color box
  catalogi('#_shops_block_link').colorbox({
    iframe: true,
    innerWidth: 820,
    innerHeight: 530
  });

  catalogi('#_catalogs_block_link').colorbox({
    iframe: true,
    innerWidth: 820,
    innerHeight: 530
  });

  catalogi('#_delivery_link').colorbox({
    iframe: true,
    innerWidth: catalogi(document).width() < 300 ? 192: 410,
    innerHeight: 250
  });

  catalogi('#_pay_link').colorbox({
    iframe: true,
    innerWidth: catalogi(document).width() < 300 ? 192: 410,
    innerHeight: 250
  });

  catalogi('#size_table_link').colorbox({
    iframe: true,
    innerWidth: 780,
    innerHeight: 520
  });

  catalogi('#_basket').colorbox({
    href: '/header/partials/order.php',
    initialWidth: 190
  });

  catalogi('#_login_link').colorbox();
  catalogi('#_logout_link').colorbox({
    onCleanup: function(){
      window.location.href = '/header/actions/_user.php';
    }
  });
};

  var isAlert = false;
	catalogi(window).focus(function(){
	 if(!isAlert){
     isAlert = true;
	 }
		if(catalogi.updatedWnd){
		  return;
		}

		catalogi.updatedWnd = true;

    if(catalogi.cookie("isAuth") == 'true'){
      if(catalogi('#_login_link').is('a')){
        window.location.reload(true);
      }
    }

    if(catalogi.cookie("isAuth") == 'false'){
      if(catalogi('#_logout_link').is('a')){
        window.location.reload(true);
      }
    }

    if(catalogi.updateCode!=catalogi.cookie("updateCode")){
      catalogi.updateCode = catalogi.cookie("updateCode");
      catalogi.basket.update();
    }
	});

	catalogi(window).blur(function(){
    isAlert = false;
		if(!catalogi.updatedWnd){
		  return;
		}

		catalogi.updatedWnd = false;
	});