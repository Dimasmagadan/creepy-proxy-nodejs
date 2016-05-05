catalogi = jQuery.noConflict(true);

function remove(id, accept){
  catalogi.ajax({
    url: 'http://cdn.catalogi.ru/executable/actions/_order_del.php',
    type: 'post',
    data:{
      id: id
    },
    success: function(data){
      if(parseInt(data) > 0){
        if(typeof accept  == "function"){
		
          // Обновление кукиз
          catalogi.cookie("last_order_add_page", window.location.toString(), {domain: "catalogi.ru", path: "/"});
          catalogi.cookie("updateCode", Math.random(), {domain: "catalogi.ru", path: "/"});

          top.postMessage({action: 'count'},'*');
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
}

function update(){
  catalogi('#_order_partial table').load('http://cdn.catalogi.ru/executable/actions/_order_get.php', function(){
    catalogi(this).find('.delete').each(function(){
      catalogi(this).bind('click', function(){
        var tr = catalogi(this).parents('tr');
        remove(tr.attr('class'), function(){
          tr.remove();
        });
		//tr.remove();
        return false;
      });
    });
  });
}

catalogi(function(){
  catalogi('#_order_partial > div').jScrollPane({autoReinitialise: true});
  catalogi('#_order_partial .delete').on("click", function(){
	var id = catalogi(this).closest('tr').attr('class');
	catalogi("tr."+id).css("background", "#eee");
	remove(id, function(){
		catalogi("tr."+id).remove();
	});
    return false
  });

  /***
   * Обработка команд с ifame
   **/
  catalogi(window).on('message', function(event){
    switch(event.originalEvent.data.action){
      case 'update':
        update();
        break
    }
    console.log(event.originalEvent.data);
  });


  // Обраотка фокуса стр.
  catalogi(window).focus(function(){
    if(catalogi.updatedWnd){
      return;
    }

    catalogi.updatedWnd = true;

    if(catalogi.cookie("isAuth") == 'true' && '_auth' in window && !_auth){
      window.location.reload(true);
    }

    if(catalogi.cookie("isAuth") == 'false' && '_auth' in window && _auth){
      window.location.reload(true);
    }

    if(catalogi.updateCode!=catalogi.cookie("updateCode")){
      catalogi.updateCode = catalogi.cookie("updateCode");
      top.postMessage({action: 'count'},'*');
      update();
    }
  });

  catalogi(window).blur(function(){
    if(!catalogi.updatedWnd){
      return;
    }

    catalogi.updatedWnd = false;
  });
});