 <div class='page-search span12 container'>
	<div class='title span9'>
		<h1 id='pageName'>Vibraphone Mallets</h1>
		<span class='details'>
			<strong><span class='numberOfResults'>302</span> Items</strong>
			<span class='totalPages'>8</span>
		</span>
	</div>
	<div class='searchRefinementsAndResults' data-controller='search'>
		<div id='refinementForm' class='refinements span3'>
			<div id='selectedRefinements'>
				<!-- You've Selected -->
			</div>
			<div class='refineResults panel disengaged'>
				<button class='b3 icon-24-toggleHide visible-phone reveal-closed-phone' data-reveal-children='attributeList'>Toggle Refinement Panel</button>
				<span class='toggleLabel visible-phone'>Refine Results:</span>
				<h2 data-reveal-children='attributeList'>Refine <span class='hidden-tablet'>Your</span> Results</h2>
				<div id='attributeList' class='reveal-closed-phone'>
					<div id='searchRefinements'>
						<!-- Refinements -->
					</div>
					<div data-reveal-children='attributeList' class='b1 close visible-phone reveal-closed-phone'>Apply Filters</div>
				</div>
			</div>
		</div>
		<div id='resultsContainer' class='results listView span9'>

			<ul class='tabs'>
				<li><button class='b5 icon-24-compact' data-action='showCompactView'>Compact View</button></li>
				<li><button class='b5 icon-24-list' data-action='showDetailsView'>Details View</button></li>
			</ul>
			<div class='head'>
				<ul class='controls'>
					<li class='compare'><button class='b2' data-action='compare'>Compare <span class='count'>(2)</span></button></li>
			
					<li class='pagination'>
						<button class='b3 icon-24-leftArrow button-circle' data-action='previousPage'>Previous Page</button>
						<span class='pageCount details'>Page <span class='currentPageNumber'>3</span> of <span class='totalPages'>8</span></span>
						<button class='b3 icon-24-rightArrow button-circle' data-action='nextPage'>Next Page</button>
					</li>
					<li class='control-pagination-itemCount'>
						<label for='control-pagination-itemCount'>Items:</label>
						<select id='control-pagination-itemCount' data-action='itemsPerPage'>
							<option value='20'>20</option>
							<option value='50'>50</option>
							<option value='All'>All</option>
						</select>
					</li>
					<li class='control-pagination-sort'>
						<label for='control-pagination-sort-top'>Sort:</label>
						<select id='control-pagination-sort-top' data-action='sort'>
							<option selected="selected" value="-default-">Recommended</option>
							<option value="Store Description,t">Name (A-Z)</option>
							<option value="Store Description,f">Name (Z-A)</option>
							<option value="Online Price,t">Price ($-$$$)</option>
							<option value="Online Price,f">Price ($$$-$)</option>
							<!--<option value="Manufacturer,t">Manufacturer (A-Z)</option>
							<option value="Manufacturer,f">Manufacturer (Z-A)</option>-->
						</select>
					</li>
				</ul>
			</div>
			<div id='searchEntries' class='searchResults section entries'>
				<!-- Search Results -->
			</div>
			<div class='foot'>
				<ul class='controls'>
					<li><button class='b2 compare' data-action='compare'>Compare <span class='count'>(2)</span></button></li>
				
					 <li class='pagination'>
						<button class='b3 icon-24-leftArrow button-circle' data-action='previousPage'>Previous Page</button>
						<span class='pageCount details'>Page <span class='currentPageNumber'>3</span> of <span class='totalPages'>8</span></span>
						<button class='b3 icon-24-rightArrow button-circle' data-action='nextPage'>Next Page</button>
					</li>
					<li class='control-pagination-itemCount'>
						<label for='control-pagination-itemCount-bottom'>Items:</label>
						<select id='control-pagination-itemCount-bottom' data-action='itemsPerPage'>
							<option value='20'>20</option>
							<option value='50'>50</option>
							<option value='All'>All</option>
						</select>
					</li>
					<li class='control-pagination-sort'>
						<label for='control-pagination-sort-bottom'>Sort:</label>
						<select id='control-pagination-sort-bottom' data-action-'sort'>
							<option selected="selected" value="-default-">Recommended</option>
							<option value="Store_Description,t">Name (A-Z)</option>
							<option value="Store_Description,f">Name (Z-A)</option>
							<option value="Price,t">Price ($-$$$)</option>
							<option value="Price,f">Price ($$$-$)</option>
						</select>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>

<script id='templates-search-breadcrumbs' type='text/html'>
	<ul class="span12 breadcrumbLinks">
		<# for(var i = 0; i < this.navPath._lsp.categoryNodes.length; i++){ #>
			<li class='<#=(i === this.navPath._lsp.categoryNodes.length -1 ? 'active' : '') #>'><a href="#<#=this.navPath._lsp.categoryNodes.url #>"><#=this.navPath._lsp.categoryNodes[i].value #></a></li>
		<# } #>
	</ul>
</script>

<script id='templates-search-selectedRefinements' type='text/html'>
	<div class='selectedFilters panel engaged'>
		<h2>Youve Selected</h2>
		<ul class='section'>

			<#	/* Print just the last category */
				for(var i = this.navPath.navPathNodeList.length - 1; i >= 1; i--){ #>
				<# if(this.navPath.navPathNodeList[i].navNodePathType === 1){ #>
					<li>
						<button class='b5 icon-24-close category' data-action='removeFilter' data-previousNodePath='<#=this.navPath.navPathNodeList[i-1].path #>'>
							<#=this.navPath.navPathNodeList[i].value #>
						</button>
					</li>
					<# break; #>
				<# } #>
			<# } #>

			<#	/* Just the attributes */
				for(var i = 0; i < this.navPath.navPathNodeList.length; i++){ #>
				<# if(this.navPath.navPathNodeList[i].navNodePathType !== 1){ #>
					<li>
						<button class='b5 icon-24-close attribute' data-action='removeFilter' data-path='<#=this.navPath.navPathNodeList[i].path #>'>
							<#=this.navPath.navPathNodeList[i].value #>
						</button>
					</li>
				<# } #>
			<# } #>
		</ul>
		<button class='b5' data-action='clearAllRefinements'>Clear All Selected</button>
	</div>
</script>

<script id='templates-search-checkboxListEntry' type='text/html'>
	<li class='field'>
		<input 
			data-action='filterAttribute' 
			name='<#=this.section.name #>[]' 
			value='<#=this.item.attributeValue #>' 
			id='refinement-<#=this.section.name #>-<#=this.itemIndex #>' type='checkbox' />
		
		<label for='refinement-<#=this.section.name #>-<#=this.itemIndex #>'><#=this.item.attributeValue #>&nbsp;<span class='details'>(<#=this.item.productCount #>)</span></label>
	</li>
</script>

<script id='templates-search-categoryListEntry' type='text/html'>
	<li>
		<button class='b5' data-action='loadCategory' data-categoryId='<#=this.item.name #>'><#=this.item.name #></button>
	</li>
</script>

<script id='templates-search-refinementSection' type='text/html'>
	
	<# var revealState = (this.isOpen ? 'reveal-open' : 'reveal-closed'); #>

	<div class='section <#=(this.id === 'categories' ? 'links' : '') #>'>
		<h4 data-reveal-children='refinement-<#=this.id #>-container' class=' reveal-closed-phone <#=revealState #>'><#=this.name #></h4>
		<div class='toggleRefinements'>
			<button class='b4 icon-16-toggleHide reveal-closed-phone <#=revealState #>' data-reveal-children='refinement-<#=this.id #>-container'>Toggle Refinement Group</button>
		</div>
		<div id='refinement-<#=this.id #>-container' class='content reveal-closed-phone <#=revealState #>'>
			<ul>
				<# for(var i = 0; i < initialListSize; i++){ #>
					<#=_util.parseMicroTemplate(this.entryTemplateId, {
						section : this,
						itemIndex : i,
						item : this.entries[i]}) #>
				<# } #>
			</ul>
			<div id='refinement-<#=this.id #>-more' class='reveal-closed'>
				<ul>
					<# for(var i = initialListSize; i < this.entries.length; i++){ #>
						<#=_util.parseMicroTemplate(this.entryTemplateId, {
							section : this,
							itemIndex : i,
							item : this.entries[i]}) #>
					<# } #>
				</ul>
			</div>
			<# if(this.entries.length - this.initialListSize > 0){ #>
				<button class='b5 loadMore reveal-closed' data-reveal-children='refinement-<#=this.id #>-more'>See More (<#=this.entries.length - this.initialListSize #>)</button>
			<# } #>
		</div>
	</div>
</script>

<script id='templates-search-refinements' type='text/html'>
	<#	if(this.categories){ #>
		<#	var initialSize = (this.categories.isInitDispLimited ? this.categories.initialCategoryList.length : this.categories.categoryList.length); #>

		<#=_util.parseMicroTemplate('templates-search-refinementSection', {
			name : 'Categories',
			id : 'categories',
			isOpen : true,
			entries : categories.categoryList,
			initialListSize : initialSize,
			entryTemplateId : 'templates-search-categoryListEntry'
		}) #>

	<# } #>
	

	<# for(var i = 0; i < this.attributes.attribute.length; i++){ #>
	
		<# var attribute = this.attributes.attribute[i]; #>
		<# var initialSize = (attribute.isInitDispLimited ? attribute.initDispLimit : attribute.attributeValueList.length); #>
	
		<#=_util.parseMicroTemplate('templates-search-refinementSection', {
			name : attribute.name,
			id : 'refinement-' + i,
			isOpen : true,
			entries : attribute.attributeValueList,
			initialListSize : initialSize,
			entryTemplateId : 'templates-search-checkboxListEntry'
		}) #>

	<# } #>
</script>

<script id='templates-search-entries' type='text/html'>
	<ul class='listScope'>
	<# for(var i = 0; i < this.products.items.length; i++){ #>
	<# var item = this.products.items[i]; #>
		<li class='entry productScope'>
			<form>
				<ul class='addToCart panel'>
					<li class='price'>
						<span class='productPrice'><#=item.Online_Price #></span>
						<span class='productGrouping'>each</span>
						<span class='details'>List : <span class='productMsrp'><#=item.price #></span>, You Save: <span class='productDiscount'>$21.05</span>!</span>
					</li>
					<li class='productAvailability' data-method='seperately'>
						<span class='status'>
							<# if(item.Available > 0){ #> In Stock <# }else{ #> Not In Stock <# } #>
							<span class='visible-desktop'>:</span>
						</span>
						<span class='shortStatus'>Two Finishes In Stock</span>
						<span class='details'><#=item.stock_message #> <a href='#' class='method'>Standard Shipping</a></span>
					</li>
					<li class='option'>
						<label>Finish:</label>
						<select>
							<option>Red</option>    
						</select>
					</li>
					<li class='quantity hidden-phone'>
						<label>Quantity:</label>
						<input class='scroller' type='number' min='1' value='1' />
					</li>
					<li class='action'>
						<button class='b1'>Add To Cart</button>
					</li>
				</ul>
			</form>
			<div data-badge='<#=item.badge #>' class='thumbnail'><img src='<#=item.Image_1_URL #>.220x220' /></div>
			<span class='field compare details'>
				<input type='checkbox' />
				<button class='b5'>Compare Now</button>
			</span>
			<span class='productName'><#=item.Featured_Description #></span>  
			<span class='details model'>Model Number #<span class='productMpn'><#=item.model_number #></span></span>
			<# if(item.number_of_reviews){ #>
				<div class='aggregateReviews'>
					<span data-reviews-aggregateRating='3' class='reviewAggregateRating'><#=item.review_average #></span>
					<a href='#' class='reviewCountLabel details'><span class='reviewReviewCount'><#=item.number_of_reviews #></span> reviews</a>
				</div>
			<# } #>
			<div class='features details'>
				<h6>Overview</h6>
				<ul class='list'>
					<li><#=item.Feature1 #></li>
					<li><#=item.Feature2 #></li>
					<li><#=item.Feature3 #></li>
					<li><#=item.Feature4 #></li>
					<li><#=item.Feature5 #></li>
					<li><#=item.Feature6 #></li>
				</ul>
			</div>
		</li>
	<# } #>
	</ul>
</script>