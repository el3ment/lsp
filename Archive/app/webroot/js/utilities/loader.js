(function(){

	window.LSP = window.LSP || {};
	window.LSP.utilities = window.LSP.utilities || {};

	// require.config({
	//     baseUrl: '//d2bghjaa5qmp6f.cloudfront.net/min/js',
	// });

	var loadMap = {
		home : {
			element : '.page-home',
			js : ['controllers/home', 'plugins/flyout'],
			//css : ['pages/home.css'],
			priority : 'critical'},
		netsuite : {
			element : '#handle_loginMainPortlet, #handle_cartMainPortlet',
			js : ['controllers/netsuite', 'controllers/checkout', 'vendors/netsuite/interface'],
			css : ['ns-checkout.css'],
			priority : 'critical'
		},
		// netsuiteSecondary : {
		// 	element : '#handle_loginMainPortlet, #handle_cartMainPortlet',
		// 	js : ['vendors/netsuite/interface'],
		// 	css : ['ns-checkout.css'],
		// 	priority : 'critical'
		// },
		product : {
			element : '.page-productDetail, .productScope, *[data-controller="product"]',
			js : ['controllers/product'],
			css : ['pages/product.css'],
			priority : 'critical'},
		search : {
			element : 'input[name="search"], a[href*="search"], *[data-action="destoryAndLoadCategory"]',
			//minjs : ['combined/search'],
			js : ['plugins/search', 'models/api', 'models/easyask'],
			css : ['pages/search.css'],
			priority : (document.location.href.indexOf('search') > 0 ? 'critical' : 'secondary')},
		wishlist : {
			element : '.page-wishlist, .wishlist-messages',
			js : ['controllers/wishlist'],
			css : ['pages/wishlist.css'],
			priority : (document.location.href.indexOf('Wishlist') > 0 ? 'critical' : 'secondary')
		},
		categoryBlocks : {
			element : '.categories',
			css : ['components/categoryBlocks.css'],
			priority : 'critical'},
		cart : {
			element : '#handle_cartMainPortlet',
			css : ['ns-checkout.css'],
			priority : 'critical'},
		reviews : {
			element : '.aggregateReviews, .page-generic .reviews',
			js : ['controllers/reviews'],
			css : ['components/reviews.css'],
			priority : 'secondary'
		},
		trackOrder : {
			element : '.page-trackOrder',
			js : ['controllers/shipping'],
			css : ['pages/shipping.css'],
			priority : 'critical'
		},
		badges : {
			element : '*[data-badge]', 
			js : ['plugins/badges'],
			css : ['components/badges.css'],
			priority : 'secondary'
		},
		clearable : {
			element : '.clearable',
			js : ['plugins/clearable'],
			css : ['components/clearable.css'],
			priority : 'secondary'},
		definitions : {
			element : '*[data-def]',
			js : ['plugins/definitions'],
			css : ['components/definitions.css'],
			priority : 'secondary'},
		flyout : {
			element : '.flyout',
			js : ['plugins/flyout'],
			priority : 'secondary'},
		reveal : {
			element : '*[data-reveal-children]',
			js : ['plugins/reveal'],
			css : ['components/reveal.css'],
			priority : 'secondary'},
		suggestions : {
			element : '.dynamicItemSuggestions',
			js : ['plugins/suggestions'],
			css : ['components/dynamicSuggestions.css'],
			priority : 'secondary'},
		validation : {
			element : '*[class*="validation-"]',
			js : ['plugins/validation'],
			priority : 'secondary'},
		zoom : {
			element : '#zoom-mainImage',
			js : ['vendors/jqzoom/jqzoom'],
			css : ['vendors/jqzoom/jqzoom.css'],
			priority : 'secondary'},
		ads : {
			element : '*[class*="bsa-"], .productAd',
			js : ['plugins/ads'],
			css : ['components/ads.css'],
			priority : 'secondary'},
		category : {
			element : '.page-category',
			js : ['controllers/category'],
			css : ['pages/category.css'],
			priority : 'critical'},
		schoolCategory : {
			element : '.page-school-category',
			js : ['controllers/category'],
			css : ['pages/school-category.css'],
			priority : 'critical'},
		checkout : {
			element : '.header.small',
			js : ['controllers/checkout', 'controllers/netsuite'],
			css : ['ns-checkout.css'],
			priority : 'critical'},
		touchcarousel : {
			element : '.touchcarousel',
			js : ['vendors/touchcarousel/touchcarousel'],
			css : ['vendors/touch_carousel/touchcarousel.css'],
			priority : 'critical'
		},
		byline : {
			element : '.byline',
			css : ['components/byline.css']
		}
	};

	var IS_MINIFIED_SOURCE = require.toUrl('').indexOf('min') > 0;

	window.LSP.utilities.loader = {
		
		loadedCSS : [],

		load : function(element){

			var jsDependencies = {};
			var cssDependencies = [];

			for (var component in loadMap) {
				if(loadMap.hasOwnProperty(component)){
					var e = loadMap[component];

					if($(e.element, element).length > 0 || e.always){
						if(e.js && e.minjs)
							e.js = (IS_MINIFIED_SOURCE ? e.minjs : e.js);

						if(e.js){
							jsDependencies[e.priority] = jsDependencies[e.priority] || [];
							jsDependencies[e.priority] = jsDependencies[e.priority].concat(e.js);
						}

						if(e.css)
							cssDependencies = cssDependencies.concat(e.css);
					}
				}
			}

			this.loadJS(jsDependencies);			

			if(cssDependencies.length > 0){
				//console.log('Attempting to load:', cssDependencies);
				this.loadCSS($(cssDependencies).not(this.loadedCSS).get()); // Load the difference between loadedCSS and cssDependencies
			}
		},
		loadJS : function(priorityObject, callback){
			require(priorityObject.critical || [], function a(priorityObject){
				
				return function(){
					console.log('Primary loaded', priorityObject);

					$(function loadSecondaryJS(){
							
						console.log('Loaded Secondary:', priorityObject.secondary);
						
						require(priorityObject.secondary || [], function b(){
							(callback || function(){})();
						});
					});
				}
			}(priorityObject));	
		},
		loadCSS : function(stylesheetArray){
			for(var i = 0; i < stylesheetArray.length; i++){

				var url = CDN + '/min/css/' + stylesheetArray[i] + '?v=' + VERSION;
				
				console.log('loaded ' + url);

				if($('link[href*="'+url+'"]').length === 0){
					if (document.createStyleSheet){ // For IE8
						document.createStyleSheet(url);
					}else{
						$('<link rel="stylesheet" type="text/css" href="' + url + '" />').prependTo('head'); 
					}
				}

				this.loadedCSS.push(stylesheetArray[i]); // Store the value
			}
		}
	};
	
	window.LSP.utilities.loader.loadJS({critical : ['jquery', 'utilities/global', 'controllers/application']});
	//window.LSP.utilities.loader.loadCSS('components.css')

}());