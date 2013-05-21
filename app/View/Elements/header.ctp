<div class='header span12 container'>
	<div class='navbar'>
		<ul class='span12 utilityLinks'> 
			<li><a class="b5 icon-24-texas-grey icon" href="#">our store</a></li>
			<li><a class="b5 icon-24-box-grey" href="#">track order</a></li>
			<li><a class="b5 icon-24-card-grey" href="#">gift cards</a></li>
			<li><a class="b5 icon-24-chat-grey" href="#">contact us</a></li>
			<li data-reveal-children='accountFlyout' class='reveal-showOnMouseover reveal-noAnimation'>
				<a class="b5 icon-24-account-grey" href="#">hi, username</a>
				<ul id='accountFlyout' class='sublist'>
					<li><a href=''>My Account <span class='details'>Subtext</span></a></li>
					<li><a href=''>My Account <span class='details'>Subtext</span></a></li>
					<li class='last'><a href=''>My Account <span class='details'>Subtext</span></a></li>
				</ul>
			</li>
			<!-- these are in reverse order for IE7 basically, we had to use float-right, which reorders them -->
		</ul>
	</div>

	<div class='well span12'>
		<a href='#' class='image-logoCircle logo'>Lone Star Percussion</a>
		<span class='established'>Established <span class='icon-24-star-yellow'>1978</span></span>
		<span class='tagline'>We Speak Drum <span class='icon-24-phone-yellow'>1-866-792-0143</span></span>
	</div> 
	
	<ul class='shopbar span12'> 
		<li class='departments'><a id='flyoutControlButton' data-reveal-children='mainFlyout' class='b1 icon-24-star-black highlight-icon dropdown reveal-waitToInitialize'>Shop By <strong>Department</strong></a></li>
		<li class='cart'><a class='b3 icon-24-cart-white highlight-icon'>Your <strong>Cart</strong> <span class='count'>2</span></a></li>
		<li class='wishlist'><a class='b3 icon-24-heart-white highlight-icon'><strong>Wish</strong> List</a></li>
		<li id='searchBar' class='search'>
			<div id='searchBarContainer' class='reveal-openOnlyDesktop'>
				<div>
					<input type='text' class='autocomplete search' placeholder='e.g. Sticks, Pearl, 16" Drum Head"'/>
					<button class='b2 icon-24-magnify-black icon-only'>Search</button>
				</div>
			</div>
		</li>
		<li class='mobileSearch visible-phone'><button class='b3' data-reveal-children='searchBarContainer'>Toggle Search</button></li>
	</ul>

	<div class='breadcrumbs'>
		<ul class='span12 breadcrumbLinks'>
			<li><a href='#'>Sticks &amp; Mallets</a></li>
			<li><a href='#'>Mallets</a></li>
			<li class='active'><a href='#'>IP240</a></li>
		</ul>
	</div>
</div>

<div id='mainFlyout' class='departmentDropdown'>
	<div class='wrapper container span12'>
		<ul class='topLevel'>
			<?php for($i = 0; $i < 12; $i++){ ?>
			<li class='collection'>
				<div class='flyoutTitle' data-reveal-children='flyout-<?php echo $i ?>'>
					<div class='h3'>Sticks &amp; Mallets</div>
					<?php if($i > 6 ){ ?> <div class='details'>Subtext</div> <?php } ?>
				</div>
				<div id='flyout-<?php echo $i ?>' class='flyout'>
					<ul class='container'>
						<?php for($k = 0; $k < 3; $k++){ ?>
						<li class='group'>
							<div class='h2' data-reveal-children='flyout-<?php echo $i.'-'.$k; ?>'>Group Name <?php echo $i; ?></div>
							<ul id='flyout-<?php echo $i.'-'.$k; ?>' class='lists'>
								<?php for($j = 0; $j < 3; $j++){ ?>
								<li class='list'>
									<span class='h3' data-reveal-children='flyout-<?php echo $i.'-'.$k.'-'.$j; ?>'>List Name</span>
									<ul id='flyout-<?php echo $i.'-'.$k.'-'.$j; ?>' class='links'>
										<li class='link'><a href=''>Link 1</a></li>
										<li class='link'><a href=''>Link 1</a></li>
									</ul>
								</li>
								<?php } ?>
							</ul>
						</li>
						<?php } ?>
						<li class='advertisement'>
							<a href='' class='ad'>
								<div class='content'>
									<span class='h3 name'>Innovative IP240 Marimba Mallets</span>
									<div class='price h3'>$79.00 <span class='productGrouping details'>per pair</span></div>
								</div>
								<img class='productImage' src='http://th08.deviantart.net/fs71/PRE/f/2010/006/8/e/Jester_Transparent_PNG_by_AbsurdWordPreferred.png'/>
							</a>
						</li>
					</ul>
				</div>
			</li>
			<?php } ?>
		</ul>
	</div>
</div>
