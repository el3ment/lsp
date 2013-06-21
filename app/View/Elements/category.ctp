<div class='page-category span12 container'>
	<div class='row'>
		<div class='span9 body pull-right'>
			<h1>Sticks &amp; Mallets</h1>
			<div class='row-fluid section head hidden-phone'>
				<div class='content'>
					<div class='description'>This is a description of the stuff it apparently can be really long and satisfyling full of information. <strong>look</strong> I can even use <em>styles</em> and <a href=''>links</a>This is a description of the stuff it apparently can be really long and</a></div>
					<ul class='links withChevron'>
						<li><a href=''>Link 1</a></li>
						<li><a href=''>Link 2</a></li>
					</ul>
				</div>
				
			<a href='' class='b2 action btn-strong'>Search All →</a>
				<img class='representativeImage' src='http://www.promotesystems.com/press/gps/images/05_on_cam_transp.png' width='280' height='280' />
			</div>
			<div class='section categories'>
				<h2 class='hidden-phone'>Shop By Category</h2>
				<div class='content'>
					<ul>
						<li class='category'>
							<a href='' class='title'>
									<img src='http://www.promotesystems.com/press/gps/images/05_on_cam_transp.png' width='120' height='120'>
									<h3 class='icon-24-chevronRight icon-mobileOnly'>Title</h3>
							</a>
						</li>
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
		
</div>