<div class='page-category span12 container'>
	<div class='row'>
		<div class='span9 body pull-right'>
			<h1>Sticks &amp; Mallets</h1>
			<div class='row-fluid section head'>
				<div class='content'>
					<div class='description'>This is a description of the stuff it apparently can be really long and satisfyling full of information. <strong>look</strong> I can even use <em>styles</em> and <a href=''>links</a>This is a description of the stuff it apparently can be really long and</a></div>
					<ul class='links'>
						<li><a href=''>Link 1</a></li>
						<li><a href=''>Link 2</a></li>
					</ul>
				</div>
				
			<a href='' class='b2 action btn-strong'>Search All →</a>
				<img class='representativeImage' src='http://www.promotesystems.com/press/gps/images/05_on_cam_transp.png' width='280' height='280' />
			</div>
			<div class='section categories'>
				<h2>Shop By Category</h2>
				<div class='content'>
					<ul class='categories'>
						<?php for($i = 0; $i < 20; $i++){ ?>
						<li class='category'>
							<a href='' class='title'>
								<?php if($i % 2){ ?>
									<img src='http://s1.lonestarpercussion.com/resize/http://www.lonestarpercussion.com/ATA-Cases-thumb.jpg.120x120'>
								<?php }else{ ?>
									<img src='http://s1.lonestarpercussion.com/resize/images/Hi%20Hats/AAMediumHats_Sabian.jpg.120x120'>
								<?php } ?>
								<h3 class='icon-24-chevronRight icon-mobileOnly'><?php if($i % 7){ ?> Mallets <?php }else{ ?> Hardware, Parts, & Accessories <?php } ?></h3>
							</a>
							<!--<ul class='links'>
								<li><a href=''>Sub Category</a></li>
								<li><a href=''>Sub Category</a></li>
								<li><a href=''>Sub Category</a></li>
								<li><a href=''>Sub Category</a></li>
								<li><a href=''>Sub Category</a></li>
								<li class='more'><a href=''>View All</a></li>
							</ul>-->
						</li>
						<?php } ?>
					</ul>
				</div>
			</div>
			<div class='section reviews hidden-phone'>
				<h2>Shop By Rating</h2>
				<div class='content'>
					<ul class='grid'>
						<li>
							<a href='' class='review icon-24-chevronRight icon-mobileAndTabletOnly'>
								<div class='aggregateReviews' itemprop="review" itemscope itemtype="http://data-vocabulary.org/Review-aggregate">
									<span itemprop="rating" data-reviews-aggregateRating='2' class='reviewAggregateRating'>1 & 2-Star Reviews</span>
								</div>
								<div class='h4 label'>Didn't Like it</div>
								<span class='h6 details'>1 & 2 Star Reviews</span>
							</a>
						</li>
						<li>
							<a href='' class='review icon-24-chevronRight icon-mobileAndTabletOnly'>
								<div class='aggregateReviews' itemprop="review" itemscope itemtype="http://data-vocabulary.org/Review-aggregate">
									<span itemprop="rating" data-reviews-aggregateRating='3' class='reviewAggregateRating'>3-Star Reviews</span>
								</div>
								<div class='h4 label'>Liked It</div>
								<span class='h6 details'>3 Star Reviews</span>
							</a>
						</li>
						<li>
							<a href='' class='review icon-24-chevronRight icon-mobileAndTabletOnly'>
								<div class='aggregateReviews' itemprop="review" itemscope itemtype="http://data-vocabulary.org/Review-aggregate">
									<span itemprop="rating" data-reviews-aggregateRating='4' class='reviewAggregateRating'>4-Star Reviews</span>
								</div>
								<div class='h4 label'>Really Loved It</div>
								<span class='h6 details'>4 Star Reviews</span>
							</a>
						</li>
						<li>
							<a href='' class='review icon-24-chevronRight icon-mobileAndTabletOnly'>
								<div class='aggregateReviews' itemprop="review" itemscope itemtype="http://data-vocabulary.org/Review-aggregate">
									<span itemprop="rating" data-reviews-aggregateRating='5' class='reviewAggregateRating'>5-Star Reviews</span>
								</div>
								<div class='h4 label'>Loved It</div>
								<span class='h6 details'>5 Star Reviews</span>
							</a>
						</li>
					</ul>
				</div>
			</div>

			<div class='row-fluid'>
				<?php echo $this->element('dynamicSuggestions'); ?>
			</div>

			<div class='section brands'>
				<!--<button class="b3 toggleList icon-24-toggleHide visible-phone reveal-parent" data-reveal-children="brandsList">Toggle Refinement Panel</button>-->
				<h2>Brands</h2>
				<div id='brandsList' class='content'>
					<ul class='grid'>
						<?php for($i = 0; $i < 20; $i++){ ?>
						<li class='brand'>
							<a href='#'>
								<img src='http://placehold.it/120x74' alt='Innovative Percussion'/>
							</a>
						</li>
						<?php } ?>
					</ul>
				</div>
			</div>
		</div>
		<div class='refinements hidden-phone'>
			<div class='span3 navigationLinks panel disengaged'>
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