<!DOCTYPE>
<html>
<head>
    <link rel='stylesheet' type='text/css' href='js/styles/application.css'>
    <link rel='stylesheet' type='text/css' href='js/styles/badges.css'> 
    <link rel='stylesheet' type='text/css' href='js/styles/reviews.css'> 
    <link rel='stylesheet' type='text/css' href='js/styles/definitions.css'>
    <link rel='stylesheet' type='text/css' href='js/styles/shipping.css'>
    <link rel='stylesheet' type='text/css' href='js/styles/validation.css'>
    <link rel='stylesheet' type='text/css' href='js/styles/reveal.css'>
    <link rel='stylesheet' type='text/css' href='js/styles/compare.css'>
    <link rel='stylesheet' type='text/css' href='js/styles/list.css'>
    <link rel='stylesheet' type='text/css' href='js/styles/specifications.css'>
</head>
<body>

	<h1>Lists</h1>
	<div class='list-showWhenDownloadWaiting'>Loading!</div>
    <div class='list-showWhenDownloadSuccess'>Success Message</div>
    <div class='list-showWhenDownloadFailure'>Failure Message</div>
    <div class='list-showWhenNoWishlistsFound'>No dice my friend, we couldn't find any results</div>
	
	<h2>Search Wishlists</h2>
	<script id='templates-wishlist-searchItem' type='text/html'>
		<li>
			<#=JSON.stringify(this) #>
		</li>
	</script>
	<ul id='list-wishlist-searchParent'>
	</ul>
    <form id='list-wishlist-searchForm'>
        Email Address / Name : <input type='text' name='searchValue' value='rpottorff@gmail.com'>
        <input type='submit' name='submit'>
    </form>
	
	
	
	<h2>My Wishlists</h2>
	
	<button data-controller='list' data-action='removeWishlistItem' data-itemId='1234' data-options='none'>Remove Wishlist Item</button>
	<form>
		<input type='hidden' name='itemId' value='1234'>
		<input type='hidden' name='itemOptions' value='testOptions'>
		<!--  optional <input type='hidden' name='quantity' value='1'> -->
		<input type='hidden' name='wishlistItemComment' value='this is a comment'>
		<button type='button' data-controller='list' data-action='addItemToWishlist'>Add To Wishlist</button>
	</form>
	<script id='templates-list-wishlist-item' type='text/html'>
		<li>Item : 
			<#=JSON.stringify(this) #>
		</li>
	</script>
	<ul id='list-wishlist-parent'>
	</ul>
	
	<h2>Product List (Cart Share)</h2>
	<script id='templates-list-item' type='text/html'>
		<li class=''>
			<#=JSON.stringify(this) #>
		</li>
	</script>
	<ul id='list-parent'>
	</ul>
	
	
	
	<h1>Specifications</h1>
	<div class='specifications-showWhenDownloadWaiting'>Loading!</div>
    <div class='specifications-showWhenDownloadSuccess'>Success Message</div>
    <div class='specifications-showWhenDownloadFailure'>Failure Message</div>
	<script id='templates-specifications-table' type='text/html'>
		<table class='specifications-table'>
			<# for(var attribute in this){ #>
				<# if(attribute.charAt(0) !== '_'){ #>
					<tr class='specifications-table-<#=LSP.utilities.camelCase(attribute) #>'>
						<td class='name'><#=attribute #></td>
						<# for(var i = 0; i < this[attribute].length; i++){ #>
							<td class='data'><#=((this[attribute][i] || {}).text ? this[attribute][i].text : this[attribute][i]) #></td>
						<# } #>
					</tr>
				<# } #>
			<# } #>
		</table>
	</script>
	
	<h1>Compare</h1>
	<div class='compare-showWhenDownloadWaiting'>Loading!</div>
    <div class='compare-showWhenDownloadSuccess'>Success Message</div>
    <div class='compare-showWhenDownloadFailure'>Failure Message</div>
	<script id='templates-compare-table' type='text/html'>
		<table class='compare-table'>
			<# for(var attribute in this){ #>
				<# if(attribute.charAt(0) !== '_'){ #>
					<tr class='compare-table-<#=LSP.utilities.camelCase(attribute) #> <#=(this[attribute].similar ? 'compare-similar' : '') #>'>
						<td class='name'><#=attribute #></td>
						<# for(var i = 0; i < this[attribute].cells.length; i++){ #>
							<td class='data'><#=((this[attribute].cells[i] || {}).text ? this[attribute].cells[i].text : this[attribute].cells[i]) #></td>
						<# } #>
					</tr>
				<# } #>
			<# } #>
		</table>
	</script>
	

	
    <h1>Reveal</h1>
    <!-- Add childIds seperated by spaces, and the reveal widget will handle toggling the css classes -->
    <div data-reveal-children='productSpecs child2 child3'>
    	Product Specs
    	
        <div id='productSpecs'>Specs!!</div>
	    <div id='child2'>Reveal Child 2</div>
	    <div id='child3'>
	    	<div data-reveal-children='subchild1'>
	    		Sub Parent
	    		<div id='subchild1'>Sub Child 1</div>
	    	</div>
	    </div>
    </div>


    <h1>Validation</h1>
    <form>
    Required / Alpha Only : <input type='text' class='validation-required validation-alphaOnly'>
    Email Address : <input type='text' class='validation-emailAddress'>
    <input type='submit'>
    </form>

    <h1>Definitions</h1>
	<script id='templates-definitons-display' type='text/html'>
		<div class='definitions-display'>
			<#=JSON.stringify(this) #>
		</div>
	</script>
    <div class='definitions-showWhenDownloadWaiting'>Loading!</div>
    <div class='definitions-showWhenDownloadSuccess'>Success Message</div>
    <div class='definitions-showWhenDownloadFailure'>Failure Message</div>
    <!-- if data-slug is not present, it will autogenerate one based on the content -->
    <span data-def>test</span>
    <span class='definitions-hasDefinition'>It's a me, mario!</span>
    <span class='definitions-hasDefinition' data-slug='test'>widget</span>
    <br><br><br>
    
    <h1>Mouseover Zoom</h1>
    <!-- The href will become the zoomed image -->
    <!-- Width / Height are NOT required attributes, everything else is -->
    <!-- <ul> and <li> elements are not required, but class/data-targetZoom are required on a container object for thumbnail links -->
    <!-- data-prezoomimage is on the <a> element, not the <img> element-->
    <a id='zoom-mainImage' href='http://s3.lonestarpercussion.com/resize/images/Offworld%20Percussion/Offworld-V3-Gold-full.jpg' data-asset='mouseoverZoom'>
        <img src='http://s3.lonestarpercussion.com/resize/images/Offworld%20Percussion/Offworld-V3-Gold-full.jpg.225x225' width='225' height='225'>
    </a>
    <ul class='zoom-thumbnails' data-targetZoomId='zoom-mainImage'>
        <li>
            <a href='http://s3.lonestarpercussion.com/resize/images/Offworld%20Percussion/Offworld-V3-Gold-full.jpg' data-prezoomimage='http://s3.lonestarpercussion.com/resize/images/Offworld%20Percussion/Offworld-V3-Gold-full.jpg.225x225'>
                <img src='http://s3.lonestarpercussion.com/resize/images/Offworld%20Percussion/Offworld-V3-Gold-full.jpg.50x50' width='50' height='50'>
            </a>
        </li>
        <li>
            <a href='http://s4.lonestarpercussion.com/resize/images/Offworld%20Percussion/Offworld-V3-Gold-alt1-full.jpg' data-prezoomimage='http://s4.lonestarpercussion.com/resize/images/Offworld%20Percussion/Offworld-V3-Gold-alt1-full.jpg.225x225'>
                <img src='http://s4.lonestarpercussion.com/resize/images/Offworld%20Percussion/Offworld-V3-Gold-alt1-full.jpg.50x50' width='50' height='50'>
            </a>
        </li>
    </ul>
    
    <h1>Badges</h1>
    <div class='badges-productImage' data-badge='new'>
        <!-- A new element will be added here with class 'badge' and 'badge-badgeNameHere' -->
        <img src='https://images.google.com/intl/en_ALL/images/logos/images_logo_lg.gif'>
    </div>
    
    <h1>Previously Viewed history</h1>
    <div id='testOnly-previouslyViewedTest'>
    </div>
    <!-- History -->
    <!-- Because we don't have access to the Body tag, this is how we will tell our history
    maker what type of page we are on. Place any type of element with data-pagetype and data-productid anywhere on the page
    and it will work -->
    <!-- to get a list of history ask controllers.history.getProductHistory() - it will include the current one -->
    <span data-pagetype='product' data-id='123456' data-name='IP240' data-price='25.35'>The product to be added is ID#123456, IP240</span>
    
    
    <h1>Availablity</h1>
    <div id='testOnly-inventoryOptionsTest'></div>
    
    <h1>Search</h1>
    <input type='text' data-asset='globalSearch'>
    
    <h1>Merchandizing</h1>
    <div data-asset='merchandisingZone' data-zone='related'></div>
    <div data-asset='merchandisingZone' data-zone='popular'></div>
    
    
    
    <h1>Reviews</h1>
    <div class='reviews-showWhenDownloadWaiting'>Loading!</div>
    <div class='reviews-showWhenDownloadSuccess'>Success Message</div>
    <div class='reviews-showWhenDownloadFailure'>Failure Message</div>
    <form id='reviews-inputForm' method='GET' enctype='multipart/form-data' action='https://forms.sandbox.netsuite.com/app/site/crm/externalcustrecordpage.nl'>
        Title : <input name='custrecordreviewtitle' type='text'>
        Message : <textarea name='custrecordreviewmessage'></textarea>
        Rating : <input name='custrecordreviewrating' type='text' class='validation-numericOnly'>
        Reviewer : <input name='custrecordreviewreviewer' type='text'>
        
        City : <input name='custrecordreviewcity' type='text'>
        State : <select name='custrecordreivewstate'>
            <option>ZZ</option>
            <option>AL</option>
        </select>
        
        Profile Options :
            <!-- class='hide' is handled automatically by checking the appropraite data-childId checkbox -->
            <input name='custrecordreviewprofile[0].title' data-childId='reviewProfileTime-Drummer' type='checkbox' value='Drummer'>Drummer
            <div id='reviewProfileTime-Drummer' class='hide'> 
                <input name='custrecordreviewprofile[0].time' class='time validation-numericOnly' type='text' value=''> # Years
            </div>
            
            <input name='custrecordreviewprofile[1].title' data-childId='reviewProfileTime-Teacher' type='checkbox' value='Teacher'>Drummer
            <div id='reviewProfileTime-Teacher' class='hide'>
                <input name='custrecordreviewprofile[1].time' class='time validation-numericOnly' type='text' value=''> # Years
            </div>
            
            <input name='custrecordreviewprofile[2].title' data-childId='reviewProfileTime-Student' type='checkbox' value='Student'>Drummer
            <div id='reviewProfileTime-Student' class='hide'>
                <input name='custrecordreviewprofile[2].time' class='time validation-numericOnly' type='text' value=''> # Years
            </div>
            
        Pros : <textarea name='custrecordreviewpros'></textarea>
        Cons : <textarea name='custrecordreviewcons'></textarea>
        Email : <input name='custrecordreviewemail' type='text'>
        <input type='submit' name='submit'>
        
        <!-- Additional required fields -->
        <input name='custrecordreviewnsitemid' type='hidden' value='1234'>
        <input name='compid' type='hidden' value='665798'>
        <input name='formid' type='hidden' value='7'>
        <input name='id' type='hidden' value=''>
        <input name='h' type='hidden' value='d3813cb3ea01d43ae673'>
        <input name='rectype' type='hidden' value='32'>
        <input name='whence' type='hidden' value=''>
        <input name='submitted' type='hidden'>
    </form>
    <!-- Review template can use
        <custrecordreviewstatus>
        <custrecordreviewdatecreated>
        <custrecordreviewnsitemid>
        <custrecordreviewcustomerid>
        <custrecordreviewreviewer>
        <custrecordreviewlocation>
        <custrecordreviewrating>
        <custrecordreviewmessage>
        <custrecordreviewtitle>
        <custrecordreviewemail>
        <custrecordreviewpros>
        <custrecordreviewcons>
        <custrecordreviewcity>
        <custrecordreviewstate>
        <custrecordreviewerprofile>
    as data-->
    <h1>Track Order</h1>
    <div class='shipping-showWhenDownloadWaiting'>Loading!</div>
    <div class='shipping-showWhenDownloadSuccess'>Success Message</div>
    <div class='shipping-showWhenDownloadFailure'>Failure Message</div>
    <div class='shipping-showWhenNoTrackingNumbersFound'>No dice my friend, we couldn't find a tracking number</div>
    <div class='testOnly-trackingNumbers'></div>
    <form id='shipping-inputForm'>
        Sales # / Tracking Number : <input type='text' name='search' value='93614'>
        Email Address : <input type='text' name='emailAddress' class='validation-emailAddress' value=''>
        <input type='submit' name='submit'>
    </form>

</body>
</html>