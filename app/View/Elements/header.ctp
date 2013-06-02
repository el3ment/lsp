<div class='header span12 container'>
	<div class='navbar'>
		<ul class='span12 utilityLinks'> 
			<li><a class="b5 icon-24-texas-grey icon" href="#">our store</a></li>
			<li><a class="b5 icon-24-box-grey" href="#">track order</a></li>
			<li><a class="b5 icon-24-card-grey" href="#">gift cards</a></li>
			<li><a class="b5 icon-24-chat-grey" href="#">contact us</a></li>
			<li data-reveal-children='accountFlyout' class='reveal-closed reveal-showOnMouseover reveal-noAnimation'>
				<a class="b5 icon-24-account-grey" href="#">hi, username</a>
				<ul id='accountFlyout' class='sublist reveal-closed'>
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
		<li class='departments'><a id='flyoutControlButton' data-reveal-children='mainFlyout' class='reveal-context-phone reveal-closed b1 icon-24-star-black highlight-icon dropdown'>Shop By <strong>Department</strong></a></li>
		<li class='cart'><a class='b3 icon-24-cart-white highlight-icon'>Your <strong>Cart</strong> <span class='count'>2</span></a></li>
		<li class='wishlist'><a class='b3 icon-24-heart-white highlight-icon'><strong>Wish</strong> List</a></li>
		<li id='searchBar' class='search'>
			<div id='searchBarContainer' class='reveal-closed-phone'>
				<div>
					<input type='text' class='clearable autocomplete search' placeholder='e.g. Sticks, Pearl, 16" Drum Head"'/>
					<button class='b2 icon-24-magnify-black icon-only'>Search</button>
				</div>
			</div>
		</li>
		<li class='mobileSearch visible-phone'>
			<button class='b3 reveal-closed-phone' data-reveal-children='searchBarContainer'>Toggle Search</button>
		</li>
	</ul>

	<div id='breadcrumbs' class='breadcrumbs'>
		<ul class='span12 breadcrumbLinks'>
			<li><a href='#'>Sticks &amp; Mallets</a></li>
			<li><a href='#'>Mallets</a></li>
			<li class='active'><a href='#'>IP240</a></li>
		</ul>
	</div>
</div>

<?php
	$flyout = 
			array(
				"Latin World & Effects" => 
						array(
							"Latin Percussion" =>
								array(
									"Bongos",
									"Congas",
									"Cajons",
									"Timbales",
									"Shakers",
									"Maracas",
									"Cowbells",
									"Cabasas & Guiros",
									"Claves",
									"Triangles"
								),
							"World Percussion" =>
								array(
									"Djembes",
									"Doumbeks",
									"Frame Drums",
									"Steel Drums (Pans)",
									"Shekeres",
									"Caxixi",
									"Brazilian (Samba) Percussion",
									"All World Percussion"
								),
							"Shop by Region" =>
								array(
									"Latin/Afro-Cuban Percussion",
									"Brazilian (Samba) Percussion",
									"African Percussion",
									"Asian Percussion",
									"Middle Eastern Percussion",
									"Caribbean Percussion",
									"European Percussion"
								),
							"Metal And Wood Sounds" =>
								array(
									"Tambourines",
									"Finger Cymbals",
									"Wind Chimes",
									"Ribbon Crashers",
									"Wood Blocks",
									"Whips (Slapsticks)",
									"All Metallic Sounds",
									"All Wooden Sounds"
								),
							"Special Effects" =>
								array(
									"Whistles",
									"Bird Calls",
									"Ratchets",
									"Rainsticks",
									"Car Horns",
									"Vibraslaps & Rattle Sounds",
									"Nature Sound Effects",
									"Industrial Sound Effects"
								)
						),
				"Stands & Hardware" => 
						array(
							"Stands" =>
								array(
									"Cymbal Straight Stands",
									"Cymbal Boom Stands",
									"Hi Hat Stands",
									"Snare Drum Stands",
									"Tom Stands",
									"Hardware Bundles",
									"Conga Stands",
									"Bongo Stands",
									"Trap Tables",
									"All Stands"
								),
							"Hardware" =>
								array(
									"Bass Drum Pedals",
									"Thrones",
									"Carts, Frames & Racks",
									"Cymbal Mounts",
									"Tom Mounts",
									"Cowbell Mounts",
									"Latin, World & Effect Mounts",
									"Microphone Mounts",
									"All Adapters & Mounts"
								),
							"Parts & Upgrades" =>
								array(
									"Cymbal Essentials",
									"Cymbal Quick-Release Toppers",
									"Hoops & Rims",
									"Tension Rods & Lugs",
									"Snare Wires",
									"Snare Strainers & Throws",
									"Replacement Parts"
								),
							"Live Sound & Recording" =>
								array(
									"Speakers",
									"Consoles & Mixers",
									"Cables",
									"Microphones",
									"Audio Recorders",
									"All Live Sound & Recording"
								)
						),
				  "Sheet Music & Books" => 
						array(
							"Solos" =>
								array(
									"Marimba Solos",
									"Marimba Solo Collections",
									"Vibraphone Solos",
									"Snare Drum Solos",
									"Snare Drum Solo Collections",
									"Timpani Solos",
									"Multi-Percussion Solos",
									"All Solos"
								),
							"Duets & Ensembles" =>
								array(
									"Keyboard Duets",
									"Multi-Percussion Duets",
									"All Duets",
									"------------------------",
									"Full Percussion Ensembles",
									"Ensembles Without Keyboards",
									"Keyboard-Only Ensembles",
									"Ensembles w/Rhythm Section",
									"Steel Band Ensembles",
									"Holiday Ensembles",
									"Novelty Ensembles",
									"All Ensembles"
								),
							"Books" =>
								array(
									"Drum Set Method Books",
									"Snare Drum Method Books",
									"Marimba Method Books",
									"Timpani Method Books",
									"Latin & World Method Books",
									"All Method Books",
									"----------------------------",
									"Sight-Reading Books",
									"Pedagogy & Reference Books",
									"Orchestral Excerpt Books",
									"History Books"
								),
							"Marching Percussion" =>
								array(
									"Cadences",
									"Features",
									"Exercises & Warm Ups",
									"Rudimental Snare Solos",
									"Tenor Solos"
								)
						),
				"Practice & Classroom" => 
						array(
							"Practice Pads" =>
								array(
									"Snare Practice Pads",
									"Tenor Practice Pads",
									"Marching Bass Practice Pads",
									"Practice Drum Sets",
									"Bass Pedal Practice Pads"
								),
							"Beginning Percussion" =>
								array(
									"Practice Keyboards",
									"Rental Keyboards",
									"Bell Kits",
									"Snare Kits",
									"All Beginner Kits"
								),
							"Practice Gear" =>
								array(
									"Metronomes & Tuners",
									"Practice Sticks",
									"Pad Laminates",
									"Drum Set Mutes",
									"Silent Practice Heads",
									"Music Stands"
								),
							"Elementary Music & Orff" =>
								array(
									"Drums",
									"Boomwhackers",
									"Recorders",
									"Keyboards & Bells",
									"Handbells",
									"Rhythm Instruments",
									"Steel Drums (Pans)",
									"Sticks & Mallets",
									"----------------------------",
									"Orff Drums",
									"Orff Keyboards",
									"Orff Rhythm Instruments",
									"Orff Sticks & Mallets"
								)
						),
				"Keyboard Instruments" => 
						array(
							"Keyboard Instruments" =>
								array(
									"Marimbas",
									"Vibraphones",
									"Xylophones",
									"Bells (Glockenspiels)",
									"Chimes",
									"Crotales",
									"Aluphones",
									"Synthesizers & Digital Pianos",
									"Xylosynths",
									"Rental Keyboards"
								),
							"Practice & Beginning Keyboards" =>
								array(
									"Beginner Bell Kits",
									"Practice Marimbas",
									"Practice Xylophones",
									"Orff Keyboards",
									"Elementary Music Keyboards"
								),
							"Accessories & Hardware" =>
								array(
									"Cases",
									"Covers",
									"Field Frames",
									"Keyboard Stands",
									"Keyboard Mounts",
									"Keyboard Parts"
								)
						),
					"Marching" => 
						array(
							"Instruments" =>
								array(
									"Snare Drums",
									"Tenors",
									"Bass Drums",
									"Marching Cymbals",
									"Pipe Band Drums",
									"Marching Keyboards",
									"Marching Brass"
								),
							"Cases & Accessories" =>
								array(
									"Cases & Covers",
									"Stick Tape",
									"Earplugs",
									"Snare Scoops",
									"Stick Bags",
									"Hoop Guards",
									"Bass Muffle Strips",
									"All Marching Accessories"
								),
							"Hardware" =>
								array(
									"Carriers",
									"Stands",
									"Carts & Field Frames",
									"Percussion Racks",
									"Hoops & Rims",
									"All Marching Parts"
								),
							"Amplification" =>
								array(
									"Speakers",
									"Consoles & Mixers",
									"Cables",
									"Microphones",
									"Microphone Mounts"
								),
						),
				"Concert" => 
						array(
							"Drums" =>
								array(
									"Concert Snare Drums",
									"Field Drums",
									"Concert Toms",
									"Concert Bass Drums",
									"Timpani"
								),
							"Handheld & Auxiliary" =>
								array(
									"Tambourines",
									"Triangles",
									"Wood Blocks",
									"Temple Blocks",
									"Castanets",
									"Wind Chimes",
									"Ratchets",
									"Whips (Slapsticks)",
									"Flexatones",
									"Vibraslaps",
									"Claves",
									"Sleigh Bells",
									"Finger Cymbals",
									"All Auxiliary Instruments"
								),
							"Accessories & Hardware" =>
								array(
									"Triangle Clips",
									"Beeswax",
									"Hand Cymbal Cradles",
									"Percussion Cabinets",
									"Concert Bass Drum Stands",
									"Gong Stands",
									"Trap Tables"
								)
						),
				"Drums & Drum Sets" => 
						array(
							"Drum Sets & Electronic Drums" =>
								array(
									"Drum Sets",
									"Junior Drum Sets",
									"Snare Drums",
									"Toms",
									"Floor Toms",
									"Bass Drums",
									"Electronic Drums"
								),
							"Marching Drums" =>
								array(
									"Marching Snare Drums",
									"Marching Tenors",
									"Marching Bass Drums",
									"Pipe Band Drums"
								),
							"Concert Drums" =>
								array(
									"Concert Snare Drums",
									"Field Drums",
									"Concert Toms",
									"Concert Bass Drums",
									"Timpani"
								),
							"Latin & World Drums" =>
								array(
									"Bongos",
									"Cajons",
									"Congas",
									"Djembes",
									"Timbales",
									"Steel Drums (Pans)",
									"Brazilian (Samba) Drums",
									"All Latin & World Drums"
								)
						),
				"Drum Heads" => 
						array(
							"Drum Set" =>
								array(
									"Snare Drum Heads",
									"Tom Heads",
									"Bass Drum Heads",
									"Drum Set Pre-Packs"
								),
							"Marching" =>
								array(
									"Marching Snare Drum Heads",
									"Marching Tenor Heads",
									"Marching Bass Drum Heads"
								),
							"Concert" =>
								array(
									"Concert Snare Drum Heads",
									"Concert Tom Heads",
									"Concert Bass Drum Heads",
									"Timpani Heads",
									"Tambourine Heads"
								),
							"World & Specialty" =>
								array(
									"Bongo Heads",
									"Conga Heads",
									"Timbale Heads",
									"Djembe Heads",
									"Brazilian (Samba) Heads",
									"Practice Heads",
									"All World & Specialty Heads"
								)
						),
				"Cymbals & Gongs" => 
						array(
							"Cymbals" =>
								array(
									"Crash Cymbals",
									"Ride Cymbals",
									"Hi Hat Cymbals",
									"Crash/Ride Cymbals",
									"Boxed Sets",
									"--------------------------",
									"China Cymbals",
									"Splash Cymbals",
									"Effect Cymbals",
									"Electronic Cymbals",
									"--------------------------",
									"Suspended Cymbals",
									"Orchestral Hand Cymbals",
									"--------------------------",
									"Marching Crash Cymbals",
									"Refurbished Cymbals",
									"Clearance Cymbals",
									"All Cymbals"
								),
							"Gongs" =>
								array(
									"Symphonic Gongs (Tam-Tams)",
									"Wind Gongs",
									"Button Gongs",
									"Opera Gongs",
									"Gong Sheets",
									"Decorative Gongs",
									"All Gongs"
								),
							"Accessories" =>
								array(
									"Felts",
									"Sleeves",
									"Pads",
									"Straps",
									"Polish",
									"Sizzles",
									"All Cymbal & Gong Accessories"
								)
						),
				"Sticks & Mallets" => 
						array(
							"Sticks" =>
								array(
									"Drum Set Sticks",
									"Brushes",
									"Bundle Sticks",
									"---------------------------",
									"Concert Snare Drum Sticks",
									"Hybrid Sticks",
									"Jingle Sticks",
									"Practice Sticks",
									"Stick & Mallet Bundles"
								),
							"Marching & World" =>
								array(
									"Marching Snare Drum Sticks",
									"Marching Tenor Sticks & Mallets",
									"Marching Bass Drum Mallets",
									"Front Ensemble Keyboard Mallets",
									"-----------------------------",
									"Timbale Sticks",
									"Steel Drum Mallets",
									"All World Sticks & Mallets"
								),
							"Mallets" =>
								array(
									"Marimba Mallets",
									"Vibraphone Mallets",
									"Bell (Glockenspiel) Mallets",
									"Xylophone Mallets",
									"Bell/Xylophone Mallets",
									"All Keyboard Mallets",
									"--------------------------",
									"Timpani Mallets",
									"Triangle Beaters",
									"Concert Bass Drum Mallets",
									"Gong (Tam-Tam Mallets)",
									"Chime Mallets",
									"Combination & Specialty Mallets",
									"Stick & Mallet Bundles"
								),
							"Accessories" =>
								array(
									"Stick Tape",
									"Mallet Wrap",
									"Stick & Mallet Bags",
									"Replacement Felts & Heads"
								)
						),
				"Accessories & Cases" => 
						array(
							"Hard Cases" =>
								array(
									"Snare Drum Cases",
									"Tom Cases",
									"Bass Drum Cases",
									"Marching Drum Cases",
									"Cymbal Cases",
									"Hardware Cases",
									"All Hard Cases"
								),
							"Bags, Soft Cases & Covers" =>
								array(
									"Stick & Mallet Bags",
									"Snare Drum Cases & Bags",
									"Tom Cases & Bags",
									"Bass Drum Cases & Bags",
									"Cymbal Bags",
									"Hardware Bags",
									"All Soft Cases & Bags",
									"-----------------------------",
									"Instrument Covers"
								),
							"Accessories" =>
								array(
									"Stick Tape",
									"Drum Keys",
									"Ear Protection",
									"All Performance Accessories",
									"------------------------------",
									"Bass Drum Head Patches",
									"Drum Rugs",
									"Drum Polish",
									"Mutes & Muffles",
									"All Drum Set Accessories",
									"---------------------------------",
									"Cymbal Straps",
									"Quick-Release Toppers",
									"Cymbal Felts",
									"Cymbal Sleeves",
									"All Cymbal & Gong Accessories"
								),
							"Apparel & Gifts" =>
								array(
									"Shirts",
									"Hoodies",
									"Hats, Gloves, & Trinkets",
									"Gifts & Novelties"
								)
						)
			);
?>

<div id='mainFlyout' class='departmentDropdown reveal-closed reveal-context-phone'>
	<div class='wrapper container span12'>
		<ul class='topLevel'>
			<?php foreach($flyout as $title => $groups){ ?>
				<li class='collection'>
					<div class='flyoutTitle reveal-context-phone reveal-closed-phone' data-reveal-children='flyout-<?php echo Inflector::slug($title) ?>'>
						<div class='h3'><?php echo $title ?></div>
						<div class='details'>Subtext</div>
					</div>
					<div id='flyout-<?php echo Inflector::slug($title) ?>' class='flyout reveal-closed-phone reveal-context-phone'>
						<ul class='container'>
							<li class='column'>
								<?php foreach($groups as $groupName => $links){ ?>
								<div class='list'>
									<span class='h3 reveal-context-phone reveal-closed-phone' data-reveal-children='flyout-<?php echo Inflector::slug($title) ?>-<?php echo Inflector::slug($groupName) ?>'><?php echo $groupName ?></span>
									<ul id='flyout-<?php echo Inflector::slug($title) ?>-<?php echo Inflector::slug($groupName) ?>' class='links reveal-closed-phone'>
										<?php foreach($links as $link){ ?>
											<li class='link'><a href=''><?php echo $link; ?></a></li>
										<?php } ?>
									</ul>
								</div>
								<?php } ?>
							</li>
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


