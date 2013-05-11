<div class='page-category span12 container'>
	<div class='row'>
		<div class='span9 body pull-right'>
			<h1>Sticks &amp; Mallets</h1>
			<div class='section prices'>
				<h2>Shop By Price</h2>
				<div class='content'>
					<ul class='grid'>
						<li><a href='#'>$0-$20</a></li>
						<li><a href='#'>$20-$40</a></li>
						<li><a href='#'>$40-$80</a></li>
						<li><a href='#'>$80-$120</a></li>
					</ul>
				</div>
			</div>
			<div class='section categories'>
				<h2>Categories</h2>
				<div class='content'>
					<ul class='grid'>
						<?php srand(); ?>
						<?php for($i = 0; $i < 20; $i++){ ?>
						<li>
							<a href='#' class='highlightOnHover'>
								<img src='http://s4.lonestarpercussion.com/resize/images/product-image/Pearl-VBL984PC-Shellpack.jpg.120x120' />
								<span class='title'>Brushes & Bundles & Other Things Long</span>
							</a>
						</li>
						<?php } ?>
					</ul>
				</div>
			</div>
			<div class='section brands'>
				<h2>Brands</h2>
				<div class='content'>
					<ul class='grid'>
						<?php for($i = 0; $i < 20; $i++){ ?>
						<li>
							<a href='#'>
								<img src='http://placehold.it/120x40' />
								<span class='title'>Brushes & Bundles</span>
							</a>
						</li>
						<?php } ?>
					</ul>
				</div>
			</div>
		</div>
		<div class='refinements'>
			<div class='span3 navigationLinks panel disengaged'>
				<h2>Refine Your Results</h2>
				<div class='section links'>
	                <h4 data-reveal-children='refinement-categories'>Categories</h4>
	                <div class='toggleRefinements'><button class='b4 icon-16-toggleHide' data-reveal-children='refinement-categories'>Toggle Refinement Group</button></div>
					<div id='refinement-categories' class='content reveal-isOpen'>
						<a href='' class='link2'>Combination & Specialty</a>
						<a href='' class='link2'>Names of Another Category</a>
						<a href='' class='link2'>Marching Equipment</a>
						<a href='' class='link2'>Other Stuff</a>
						<a href='' class='link2 leftLinkBold'>Category</a>
						<a href='' class='link3'>These are sub categories</a>
						<a href='' class='link3'>More Subcategories</a>
						<a href='' class='link3'>The Who</a>
						<a href='' class='link2'>Black Sabbath</a>
						<a href='' class='link2'>Tool</a>
						<a href='' class='link2'>Slayer</a>
						<a href='' class='link2'>Backstreet Boys</a>
						<a href='' class='link2'>It's My Jam</a>
					</div>
				</div>
				<div class='section links'>
	                <h4 data-reveal-children='refinement-<?php echo $i; ?>'>Supplies</h4>
	                <div class='toggleRefinements'><button class='b4 icon-16-toggleHide' data-reveal-children='refinement-brands'>Toggle Refinement Group</button></div>
					<div id='refinement-brands' class='content'>
						<a href='' class='link2'>Combination & Specialty</a>
						<a href='' class='link2'>Names of Another Category</a>
						<a href='' class='link2'>Marching Equipment</a>
						<a href='' class='link2'>Other Stuff</a>
					</div>
				</div>
				<div class='section brands'>
	                <h4 data-reveal-children='refinement-<?php echo $i; ?>'>Brands</h4>
	                <div class='toggleRefinements'><button class='b4 icon-16-toggleHide <?php echo ($i % 2) ? "reveal-isOpen" : ""; ?>' data-reveal-children='refinement-<?php echo $i; ?>'>Toggle Refinement Group</button></div>
					<div id='refinement-<?php echo $i; ?>' class='<?php echo ($i % 2) ? "reveal-isOpen" : ""; ?>'>
						<div class="refinementList">
			                <ul>
			                    <li class='field'>
			                        <input id='refinement-<?php echo $i; ?>-0' type='checkbox' />
			                        <label for='refinement-<?php echo $i; ?>-0'>Vibraphone Mallets With a Really Long Name&nbsp;<span class='details'>(22)</span></label>
			                    </li>
			                    <li class='field'>
			                        <input id='refinement-<?php echo $i; ?>-1' type='checkbox' />
			                        <label for='refinement-<?php echo $i; ?>-1'>Vibraphone Mallets <span class='details'>(22)</span></label>
			                    </li>
			                    <li class='field'>
			                        <input id='refinement-<?php echo $i; ?>-2' type='checkbox' />
			                        <label for='refinement-<?php echo $i; ?>-2'>Vibraphone Mallets <span class='details'>(22)</span></label>
			                    </li>
			                    <li class='field'>
			                        <input id='refinement-<?php echo $i; ?>-3' type='checkbox' />
			                        <label for='refinement-<?php echo $i; ?>-3'>Vibraphone Mallets <span class='details'>(22)</span></label>
			                    </li>
			                </ul>
			            </div>
		                <button class='b5 loadMore'>See More (10)</button>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>