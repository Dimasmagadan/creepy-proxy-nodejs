<?php
require_once dirname(__FILE__).'/lib.php';
header('Content-Type:application/javascript');
?>
<?php if(isset($_COOKIE["user"])): ?>
var _auth = true;
<?php else: ?>
var _auth = false;
<?php endif ?>
var _service = <?php echo delivery() ?>;
var _skiptranslate = <?php echo showTranslate($_GET['alias']) ? '1': '0' ?>;