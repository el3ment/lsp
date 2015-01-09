<div class='page-home span12 container'>

	<div class='row'>
		<div id='mainSlider' class='touchcarousel'>
			<ul class='touchcarousel-container'>
				<li class='ad touchcarousel-item'>Product 1</li>
				<li class='ad touchcarousel-item'>Product 2</li>
				<li class='ad touchcarousel-item'>Product 3</li>
			</ul>
		</div>
	</div>

	<div class='row-fluid section'>
		<a href='' class='productAd span6'>
			<div class='productImage'> <!-- TODO : add badges -->
				<img src='http://www.promotesystems.com/press/gps/images/05_on_cam_transp.png' width='190' height='190' />
			</div>
			<div class='content'>
				<div class='h2 title'>Boss A3D Metronome</div>
				<div class='description'>This is the description of the product. It can have <strong>strong</strong> words and other descritions. You might even have a <span class='b5'>link</span> or two. 
				</div>
				<span class='b5 action'>Check it out</span>
			</div>
		</a>
		<a href='' class='businessAd span6 businessAd-shipping visible-desktop'>
			<div class='content'>
				<div class='h2 title'>Boss A3D Metronome</div>
				<div class='description'>This is the description of the product. It can have <strong>strong</strong> words and other descritions. You might even have a <span class='b5'>link</span> or two. 
				</div>
				<span class='b5 action'>Check it out</span>
			</div>
		</a>
	</div>
	<div class='row span12 section featuredCategories hidden-phone'>
		<h2 class='h1'>Featured Categories</h2>
		<ul class='categories'>
			<?php for($i = 0; $i < 12; $i++){ ?>
			<li class='category'>
				<a href='' class='title'>
					<?php if($i % 2){ ?>
						<img src='http://s1.lonestarpercussion.com/resize/http://www.lonestarpercussion.com/ATA-Cases-thumb.jpg.120x120'>
					<?php }else{ ?>
						<img src='http://s1.lonestarpercussion.com/resize/images/Hi%20Hats/AAMediumHats_Sabian.jpg.120x120'>
					<?php } ?>
					<h3>Mallets</h3>
				</a>
				<ul class='links'>
					<li><a href=''>Sub Category</a></li>
					<li><a href=''>Sub Category</a></li>
					<li><a href=''>Sub Category</a></li>
					<li><a href=''>Sub Category</a></li>
					<li><a href=''>Sub Category</a></li>
					<li class='more'><a href=''>View All</a></li>
				</ul>
			</li>
			<?php } ?>
		</ul>
	</div>
</div>