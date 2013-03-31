<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <?php echo $this->Html->charset(); ?>
	<title>
		<?php echo $title_for_layout; ?>
	</title>
	<?php
		echo $this->Html->meta('icon');
		echo $this->fetch('meta');
		echo $this->fetch('css');
        echo $this->Html->css(array('complete'));
	?>
    <link href='http://fonts.googleapis.com/css?family=Open+Sans:400,600,800' rel='stylesheet' type='text/css' />

</head>
<body id='page-home' ontouchstart=''>
    <style> 
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
    <?php echo $this->Session->flash(); ?>

	<?php echo $this->fetch('content'); ?>
    
	<div class='testing-sqlDump'>
        <?php echo $this->element('sql_dump'); ?>
    </div>
</body>
</html>

