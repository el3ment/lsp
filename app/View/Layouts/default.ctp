
<!--
add ids to labels
-->
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
	<?php
        echo $this->Html->css(array('complete'));
	?>
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



