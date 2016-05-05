catalogi = jQuery.noConflict(true);

catalogi(function(){
  catalogi("#_login_partial form").validationEngine({promptPosition: 'topLeft', focusFirstField : false});

  catalogi("#_login_partial form").submit(function(){
    isValid = catalogi(this).validationEngine('validate');
    if(isValid){
      catalogi.ajax({
        url: 'http://cdn.catalogi.ru/executable/actions/_user.php',
        type: 'post',
        data:{
          login: catalogi('#_login_partial input[type="text"]').val(),
          password: catalogi('#_login_partial input[type="password"]').val(),
          remember: catalogi('#_login_partial input[type="checkbox"]')[0].checked
        },
        success: function(data){
          if(parseInt(data)>0){
            top.postMessage({action: 'location', url: '/'},'*');
          }else{
            catalogi("#_login_partial form").validationEngine('showPrompt', 'Нет такого пользователя', 'load')
          }
        },
        error: function(data){
          alert('error')
        }
      });      
    }
    return false;
  });

  catalogi('#_login_partial ._forgote').click(function(){
    top.postMessage({action: 'forgot'},'*');
  });
});
  