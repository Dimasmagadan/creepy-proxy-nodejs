<?php
require_once dirname(__FILE__).'/../lib/joomla.php';
$content = joomla::loadContent($_GET['alias']);
$content = preg_replace("/(href=\")/is", "href=\"http:\\/\\/catalogi.ru/", $content);
?>
<style>
  #_content_parser{
    font-family: Arial, Helvetica, sans-serif;
  }

  #_content_parser ._scroll{
    width: 394px;
    height: 210px;
    outline: none;
  }
  
  #_content_parser ._scroll ._content{
    width: 384px;
  }
</style>
<div id="_content_parser" class="notranslate">
  <div class="_scroll">
    <div class="_content">
      <?php echo $content['text'] ?>
    </div>
  </div>
</div>

<script language="javascript">
  // Прокрутка
  catalogi('#_content_parser ._scroll').jScrollPane({autoReinitialise: false});

  // При открытии всплывающего блока
  function initPartial(){
    catalogi('#_content_parser ._scroll').data('jsp').reinitialise();
  };

  // При закрытии всплывающего блока
  function closePartial(){
    
  };
</script>
