<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	
	<?php
        echo $this->Html->css(array('vendors/bootstrap/bootstrap','complete'));
	?>
	<link rel="stylesheet" href="css/vendors/touch_carousel/touchcarousel.css" />
	<link rel="stylesheet" href="css/vendors/touch_carousel/three-d-skin/three-d-skin.css" />	


    <script type='text/javascript' src='js/vendors/jquery/jquery-1.9.1.js'></script>
    <script type='text/javascript' src='js/vendors/touch_carousel/jquery.touchcarousel-1.2.js'></script>
    <script type='text/javascript' src='js/vendors/json2/json2.js'></script>
    <script type='text/javascript' src='js/vendors/form2js/form2js.js'></script>
    <script type='text/javascript' src='js/utilities/global.js'></script>
	
	<script type='text/javascript' src='js/controllers/plugins/reveal.js'></script>
	<script type='text/javascript' src='js/controllers/plugins/suggestions.js'></script>
	<script type='text/javascript' src='js/models/cart.js'></script>
        
    
	
	<script type='text/javascript' src='js/vendors/jcookie/jcookie.js'></script>
	<script type='text/javascript' src='js/models/api.js'></script>
		
	<script type='text/javascript' src='js/assets/history.js'></script>
    <script type='text/javascript' src='js/assets/listEncoder.js'></script>
        
    <script type='text/javascript' src='js/controllers/plugins/badges.js'></script>
    <script type='text/javascript' src='js/controllers/plugins/compare.js'></script>
    <script type='text/javascript' src='js/controllers/plugins/definitions.js'></script>
    
    <script type='text/javascript' src='js/controllers/plugins/validation.js'></script>
    
    
    <script type='text/javascript' src='js/controllers/reviews.js'></script>
    <script type='text/javascript' src='js/controllers/shipping.js'></script>
    <script type='text/javascript' src='js/controllers/account.js'></script>
    <script type='text/javascript' src='js/controllers/product.js'></script>
	<script type='text/javascript' src='js/controllers/list.js'></script>
	
	<!--g
	<script type='text/javascript' src='js/vendors/jqzoom/jqzoom.js'></script>
	<link rel='stylesheet' type='text/css' href='js/vendors/jqzoom/jqzoom.css'>
	<script type='text/javascript' src='js/controllers/plugins/zoom.js'></script>
	-->
    <script type='text/javascript' src='js/controllers/checkout.js'></script>
    <script type='text/javascript' src='js/controllers/application.js'></script>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,800' rel='stylesheet' type='text/css' />
</head>
    <body>
		
        <?php echo $this->element('header'); ?>
        
		<?php echo $this->fetch('content'); ?>
		
		<?php echo $this->element('footer'); ?>
        
    </body>
</html>


<div class='testing-sqlDump'>
    <?php echo $this->element('sql_dump'); ?>
</div>



