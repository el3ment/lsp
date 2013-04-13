
<!--
add ids to labels
-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<?php
        echo $this->Html->css(array('complete'));
        echo $this->Html->css(array('vendors/unsemantic/unsemantic-grid-responsive'));
	?>
	
    <script type='text/javascript' src='js/vendors/json2/json2.js'></script>
    <script type='text/javascript' src='https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js'></script>
    
    <script type='text/javascript' src='js/utilities/global.js'></script>
    
    <script type='text/javascript' src='js/vendors/jqzoom/jqzoom.js'></script>
    <script type='text/javascript' src='js/vendors/form2js/form2js.js'></script>
    <script type='text/javascript' src='js/vendors/jcookie/jcookie.js'></script>
    
    <script type='text/javascript' src='js/models/api.js'></script>
        
    <script type='text/javascript' src='js/assets/history.js'></script>
    <script type='text/javascript' src='js/assets/listEncoder.js'></script>
        
    <script type='text/javascript' src='js/controllers/plugins/badges.js'></script>
    <script type='text/javascript' src='js/controllers/plugins/compare.js'></script>
    <script type='text/javascript' src='js/controllers/plugins/definitions.js'></script>
    <script type='text/javascript' src='js/controllers/plugins/reveal.js'></script>
    <script type='text/javascript' src='js/controllers/plugins/validation.js'></script>
    <script type='text/javascript' src='js/controllers/plugins/zoom.js'></script>
    
    <script type='text/javascript' src='js/controllers/reviews.js'></script>
    <script type='text/javascript' src='js/controllers/shipping.js'></script>
    <script type='text/javascript' src='js/controllers/account.js'></script>
    <script type='text/javascript' src='js/controllers/product.js'></script>
    <script type='text/javascript' src='js/controllers/cart.js'></script>
    <script type='text/javascript' src='js/controllers/list.js'></script>
    <script type='text/javascript' src='js/controllers/application.js'></script>
    
    <link rel='stylesheet' type='text/css' href='js/vendors/jqzoom/jqzoom.css'> 
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,800' rel='stylesheet' type='text/css' />
</head>
    <body>
		
	    <style> 
			/* This is a holdover until we can find a permanent and more attractive solution
			   I was having a tough time making this work when it was included in the CSS files */
		    @font-face {
		        font-family: 'League Gothic';
		        src: url('../files/leaguegothic-regular-webfont.eot');
		        src: url('../files/leaguegothic-regular-webfont.eot?#iefix') format('embedded-opentype'),
		             url('../files/leaguegothic-regular-webfont.woff') format('woff'),
		             url('../files/leaguegothic-regular-webfont.ttf') format('truetype'),
		             url('../files/leaguegothic-regular-webfont.svg#league_gothicregular') format('svg');
		        font-weight: normal;
		        font-style: normal;
		    }
	    </style>
		
        <?php echo $this->element('header'); ?>
        
		<?php echo $this->fetch('content'); ?>
		
		<?php echo $this->element('footer'); ?>
        
    </body>
</html>


<div class='testing-sqlDump'>
    <?php echo $this->element('sql_dump'); ?>
</div>



