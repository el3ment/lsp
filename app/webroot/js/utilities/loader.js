(function(){

	window.LSP = window.LSP || {};
	window.LSP.utilities = window.LSP.utilities || {};

	// require.config({
	//     baseUrl: '//d2bghjaa5qmp6f.cloudfront.net/min/js',
	// });

// components
// 	ads
// 	badges
// 	definitions
// 	suggestions
// 		touchcarousel
// 	validation
// 	product
// 		jqzoom
// 		reviews
// 			form2js
// 			formatdate
// 			model.netsuite
// 	netsuite
// 		model.netsuite
// 	shipping
// 	wishlist
// 	home

	var loadMap = {
		home : {
			element : '.page-home',
			js : ['controllers/home'],
			//css : ['pages/home.css'],
			priority : 'critical'
		},
		netsuite : {
			element : '#handle_loginMainPortlet, #handle_cartMainPortlet',
			js : ['controllers/netsuite', 'controllers/checkout', 'vendors/netsuite/interface'],
			//css : ['ns-checkout.css'],
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
			//css : ['pages/product.css'],
			priority : 'critical'},
		// search : {
		// 	element : 'input[name="search"], a[href*="search"], *[data-action="destoryAndLoadCategory"]',
		// 	//minjs : ['combined/search'],
		// 	js : ['plugins/search', 'models/api', 'models/easyask'],
		// 	//css : ['pages/search.css'],
		// 	priority : (document.location.href.indexOf('search') > 0 ? 'critical' : 'secondary')},
		wishlist : {
			element : '.page-wishlist, .wishlist-messages',
			js : ['controllers/wishlist'],
			css : ['pages/wishlist.css'],
			priority : (document.location.href.indexOf('Wishlist') > 0 ? 'critical' : 'secondary')
		},
		// categoryBlocks : {
		// 	element : '.categories',
		// 	//css : ['components/categoryBlocks.css'],
		// 	priority : 'critical'},
		// cart : {
		// 	element : '#handle_cartMainPortlet',
		// 	//css : ['ns-checkout.css'],
		// 	priority : 'critical'},
		reviews : {
			element : '.aggregateReviews, .page-generic .reviews',
			js : ['controllers/reviews'],
			//css : ['components/reviews.css'],
			priority : 'secondary'
		},
		trackOrder : {
			element : '.page-trackOrder',
			js : ['controllers/shipping'],
			//css : ['pages/shipping.css'],
			priority : 'critical'
		},
		badges : {
			element : '*[data-badge]', 
			js : ['plugins/badges'],
			//css : ['components/badges.css'],
			priority : 'secondary'
		},
		// clearable : {
		// 	element : '.clearable',
		// 	js : ['plugins/clearable'],
		// 	//css : ['components/clearable.css'],
		// 	priority : 'secondary'},
		definitions : {
			element : '*[data-def]',
			js : ['plugins/definitions'],
			//css : ['components/definitions.css'],
			priority : 'secondary'},
		// flyout : {
		// 	element : '.flyout',
		// 	js : ['plugins/flyout'],
		// 	//css : ['components/flyout.css'],
		// 	priority : 'secondary'},
		// reveal : {
		// 	element : '*[data-reveal-children]',
		// 	js : ['plugins/reveal'],
		// 	//css : ['components/reveal.css'],
		// 	priority : 'secondary'},
		suggestions : {
			element : '.dynamicItemSuggestions',
			js : ['plugins/suggestions'],
			//css : ['components/dynamicSuggestions.css'],
			priority : 'secondary'},
		validation : {
			element : '*[class*="validation-"]',
			js : ['plugins/validation'],
			priority : 'secondary'},
		zoom : {
			element : '#zoom-mainImage',
			js : ['vendors/jqzoom/jqzoom'],
			//css : ['vendors/jqzoom/jqzoom.css'],
			priority : 'secondary'},
		ads : {
			element : '*[class*="bsa-"], .productAd',
			js : ['plugins/ads'],
			//css : ['components/ads.css'],
			priority : 'secondary'},
		category : {
			element : '.page-category',
			js : ['controllers/category'],
			//css : ['pages/category.css'],
			priority : 'critical'},
		schoolCategory : {
			element : '.page-school-category',
			js : ['controllers/category'],
			//css : ['pages/school-category.css'],
			priority : 'critical'},
		checkout : {
			element : '.header.small',
			js : ['controllers/checkout', 'controllers/netsuite'],
			//css : ['ns-checkout.css'],
			priority : 'critical'},
		// touchcarousel : {
		// 	element : '.touchcarousel',
		// 	js : ['vendors/touchcarousel/touchcarousel'],
		// 	css : ['vendors/touch_carousel/touchcarousel.css'],
		// 	priority : 'critical'
		// },
		// byline : {
		// 	element : '.byline',
		// 	css : ['combined/byline.css']
		// },
		// contact : {
		// 	element : '.block',
		// 	css : ['components/contact.css']
		// },
		// table : {
		// 	element : 'table.table',
		// 	css : ['components/table.css']
		// },
		// relatedItems : {
		// 	element : '.relatedItems',
		// 	css : ['components/relatedItems.css']
		// },
		// refinements : {
		// 	element : '.refinements',
		// 	css : ['components/refinements.css']
		// },
		// addToCart : {
		// 	element: '.addToCart',
		// 	css : ['components/addToCart.css']
		// },
		// zebraTable : {
		// 	element: 'table.zebra',
		// 	css : ['components/zebraTable.css']
		// },
		// validation : {
		// 	css : ['combined/belowFold.css']
		// },
		// notice : {
		// 	// .notice
		// },
		// panel : {

		// },
		// newsletter : {
		// 	css : ['combined/belowFold.css']
		// },
		// limitElements : {
		// 	css : ['combined/belowFold.css']
		// },
	};

	var IS_MINIFIED_SOURCE = require.toUrl('').indexOf('min') > 0;

	window.LSP.utilities.loader = {
		
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

			var scripts = (priorityObject.critical || []).concat(priorityObject.secondary || []);

			require(scripts, function(){
				(callback || function(){ })();
			});
		},
		getStylesheetUrls : function(){
			var existingLinks = document.getElementsByTagName('link');
			var existingStylesheets = [];

			for(var i = 0; i < existingLinks.length; i++){
				existingStylesheets.push(existingLinks[i].href.replace(/https?\:/, ''));
			}

			return existingStylesheets;
		},
		loadCSS : function(stylesheetArray){
			
			var existingStylesheets = this.getStylesheetUrls();

			for(var i = 0; i < stylesheetArray.length; i++){

				var url = CDN + '/min/css/' + stylesheetArray[i] + '?v=' + VERSION;
				
				if(existingStylesheets.indexOf(url) === -1){
					googleAsyncCSSLoader(url);
				}
			}
		}
	};
	

	window.LSP.utilities.loader.loadJS({critical: ["jquery", "combined/core"]});
	
	// These files take a few seconds to download when loaded this way, so if they contain 
	// above-the-fold assets they are included directly in the template, but every page should load them all
	// This speeds up subsequent pages, as well as ensures that any rouge assets still render properly
	window.LSP.utilities.loader.loadCSS(['combined/category.css', 'combined/home.css', 'combined/product.css', 'combined/search.css', 'ns-checkout.css']);


	
}());