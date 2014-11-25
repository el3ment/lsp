var phantomcss = require('/Users/robert/Projects/LoneStarPercussion/node_modules/phantomcss/phantomcss.js');

phantomcss.init({
	screenshotRoot: '/Users/robert/Projects/LoneStarPercussion/tests/phantomcss/baseline',
	failedComparisonsRoot: '/Users/robert/Projects/LoneStarPercussion/tests/phantomcss/failures',
	comparisonResultRoot: '/Users/robert/Projects/LoneStarPercussion/tests/phantomcss/results',
	// casper: casper,
	libraryRoot: '/Users/robert/Projects/LoneStarPercussion/node_modules/phantomcss',
	// fileNameGetter: function overide_file_naming(){},
	// onPass: function passCallback(){},
	// onFail: function failCallback(){},
	// onTimeout: function timeoutCallback(){},
	// onComplete: function completeCallback(){},
	// hideElements: '#thing.selector',
	addLabelToFailedImage: true,
	// outputSettings: {
	//  errorColor: {
	//      red: 255,
	//      green: 255,
	//      blue: 0
	//  },
	//  errorType: 'movement',
	//  transparency: 0.3
	//}
});

var contexts = [
	{
		name: 'desktop-large',
		width: 1800,
		height: 980
	},
	{
		name: 'desktop-medium',
		width: 1170,
		height: 768
	},
	{
		name: 'desktop-small',
		width: 970,
		height: 600
	},
	{
		name: 'tablet',
		width: 750,
		height: 920
	},
	{
		name: 'mobile',
		width: 365,
		height: 400
	},
	{
		name: 'iphone',
		width: 320,
		height: 352
	}
];

var componentTests = [
	{
	 name : 'chrome',
	 waitFor : '#mainFlyout',
	 url : ['/', '/Sticks-Mallets/Marimba-Mallets/Innovative-Percussion-IP240.html', '/cart', '/Sticks-Mallets', '/Our-Location.html'],
	 components : ['.header', '.footer .well', '.footer .banner', '.newsletter', 'li.hideIfLoggedIn', 'li[data-reveal-children="contactFlyout"]:hover', 'li[data-reveal-children="contactFlyout"]', '#mainFlyout .topLevel']
	},
	{
	 name : 'home',
	 url : ['/'],
	 components : ['html:optional', '.category', '.productAd', '.ad.touchcarousel-item']
	},
	{
		name : 'product',
		url : ['/Sticks-Mallets/Marimba-Mallets/Innovative-Percussion-IP240.html'],
		interactAfterContext : function(casper){
			casper.then(function(){
				try{ casper.click('button[data-reveal-children="productSpecifications"].reveal-closed'); }catch(e){ }
			}).then(function(){
				try{ casper.click('button[data-reveal-children="returns"].reveal-closed'); }catch(e){ }
			}).then(function(){
				try{ casper.click('button[data-reveal-children*="addReviewForm"].reveal-closed'); }catch(e){ }
			});
		},
		components : ['html:optional', '.addToCart', '.media', '.information', '.dynamicItemSuggestions','.relatedItems', '#productReviews', '#addReviewForm', '#productSpecifications', '#returns']
	},
	{
		name : 'category',
		url : ['/Sticks-Mallets'],
		components : ['.navigationLinks', '.body .head', '.category', '.category:hover','.categories.section']
	},{
		name : 'category-school-parent',
		url : ['/Schools'],
		components : ['*[class*="bsa-"].right', '*[class*="bsa-"].newsletter', '.body .head', '.category', '.category:hover','.content']
	},{
		name : 'category-school-child',
		url : ['/Schools'],
		components : ['.body .head', '.body .content', '.category:hover', '*[class*="bsa-"].right', '.bsa-newsletter']
	},{
		name : 'information-items',
		url : ['/Marimba-Rentals.html','/Drum-Repair.html','/Scholarships.html','/Lone-Star-Percussion-Return-Policy.html','/International-Shipping.html','/Link-Sitemap.html','/About-Lone-Star-Percussion.html','/Search-Wishlist.html'],
		components : ['.page-generic']
	},{
		name : 'contact-forms',
		url : ['/School-Bids.html','/Contact-Us-Form.html'],
		components : ['.page-generic']
	},{
		name : 'our-location',
		url : ['/Our-Location.html'],
		components : ['.panel.engaged', '.contact']
	},{
		name : 'product-discontinued',
		url : ['/Evans-20-Inches-EQ1-Clear-Bass-Head-BD20GB1.html'],
		components : ['.addToCart', '.images']
	},{
		name : 'kit-package',
		url : ['Latin-World-Effects/Samba-Instrument-Bundles/Meinl-Samba-Package-12-Players.html'],
		components : ['.addToCart', '.media', '.information', '.relatedItems', '#productReviews']
	},{
		name : 'product-video',
		url : ['/Stands-Hardware/Multi-Instrument-Mounts/Black-Swamp-RecPlate-RecPlate-Multi-Percussion-MultiPlate.html'],
		components : ['.videos']
	},{
		name : 'product-bare',
		url : ['/Stands-Hardware/Multi-Instrument-Mounts/Meinl-CSM-L-Large-Cajon-Side-Mount.html'],
		components : ['.page-generic']
	},{
		name : 'definitions',
		url : ['/Drums-Drum-Sets/Drum-Sets/Mapex-AR504S-Armory-5-Piece-Fusion-Drum-Set-Shell-Pack-20-Bass-10-12-14-Toms-14-Snare.html'],
		components : ['.description']
	},{
		name : 'badges-special-features',
		url : ['/Cymbals-Gongs/Crash-Cymbals/Meinl-B19MTC-B-HS-19-Hand-Selected-Byzance-Traditional-Medium-Thin-Crash-with-Brilliant-Finish.html'],
		components : ['*[data-badge].badges-text', '.images *[data-badge]']
	},{
		name : 'product-out-of-stock',
		url : ['/Stands-Hardware/Parts/Roc-n-Soc-W-B-V-Vinyl-Back-Rest.html'],
		components : ['.addToCart']
	},{
		name : 'search-list',
		waitFor : '.entry',
		url : ['/#/~search/keywords/mallets/page/1'],
		components : ['html', '.refineResults', '.entry']
	},{
		name : 'search-grid',
		url : ['/#/~search/keywords/mallets/page/1/view/gridView'],
		waitFor : '.entry',
		components : ['html', '.entry', '.entry:hover']
	},
	{
		name : 'checkout-1-cart',
		url : ['/Sticks-Mallets/Marimba-Mallets/Innovative-Percussion-IP240.html'],
		interactBeforeContext : function(casper){
			casper.then(function(){
				casper.click('.addToCart button.b1');
			})//.waitForUrl('/.*cart.*/');
		},
		interactAfterScreenshot : function(){
			casper.then(function(){
				casper.click('input[type="submit"][onclick*="vid"]');
			})//.waitForUrl('netsuite');

		},
		components : ['html']
	},
	{
		name : 'checkout-2-guest-login',
		interactAfterScreenshot : function(casper){
			casper.then(function(){
				casper.click('input[name="register"]');
			});
		},
		components : ['html']
	},
	{
		name : 'checkout-3-account',
		interactAfterScreenshot : function(casper){
			casper.then(function(){
				this.fill('form#newcust', {
					'name': 'Test McTesterson Jr.',
					'email': 'test@McTesterson.com'
				}, true);
				
			})		
		},
		components : ['html']
	},
	{
		name : 'checkout-4-shipping',
		interactAfterScreenshot : function(casper){
			//console.log('190')
			casper.then(function(){
				//console.log('fill form')
				// Uncheck default billing
				casper.click('#defaultbilling_fs_inp');

				this.fill('form#main_form', {
					'attention_input': 'Test McTesterson',
					'addr1': '10611 Control Place',
					'city': 'Dallas',
					//'country': 'US',
					'dropdownstate': 'TX',
					'zip': '75150',
					'phone': '(469) 766-4616'
				}, true);
			});
			casper.then(function(){
				//console.log('207 - click')
				casper.click('#submitter');
			})

		},
		components : ['html']
	},
	{
		name : 'checkout-5-billing',
		interactAfterScreenshot : function(casper){
			//console.log('217 - click use')
			casper.click('#use');
		},
		components : ['html']
	},
	{
		name : 'checkout-6-method',
		// Sometimes it will skip the checkout method.. still unsure why
		// specifying the url ensures we get the method page
		//url : ['https://checkout.netsuite.com/s.nl/c.665798/sc.4/category.shipping/.f'],
		interactAfterScreenshot : function(casper){
			casper.then(function(){
				casper.click('#submitter');
			})
		},
		components : ['html']
	},
	{
		name : 'checkout-7-payment',
		interactAfterScreenshot : function(casper){
			casper.then(function(){
				// Select Visa
				casper.click('input[type="radio"][name="sPayMeth"][value="5,1,1555641112"]');
				
				casper.fill('form#paymeth', {
					'sCardNum' : '373983429450865',
					'sExpMo' : '09',
					'sExpYr' : '2020',
					'sCardName' : 'Test McTesterson',
					'ccsecuritycode' : '123',
				}, true);
			});

		},
		components : ['html']
	},
	{
		name : 'checkout-8-review',
		components : ['html']
	}
	
];

casper.start()

for(var componentTestIndex = 0; componentTestIndex < componentTests.length; componentTestIndex++){
	
	var test = componentTests[componentTestIndex];

	test.url = test.url || [null]; // Use the test array if avaliable, or a single instance

	for(var urlIndex = 0; urlIndex < test.url.length; urlIndex++){

		if(test.url[urlIndex]){

			var urlToLoad = test.url[urlIndex].indexOf('http://') > 0 
				? test.url[urlIndex] 
				: 'http://lonestarpercussion.com' + test.url[urlIndex]
			
			casper.thenOpen(urlToLoad);

			// CasperJS won't load url fragments (hashes) on it's own so we manually set it.
			// https://github.com/n1k0/casperjs/issues/468#issuecomment-61148668
			if(test.url[urlIndex].indexOf('#') > 0){
				casper.thenEvaluate(function(path){
					window.location.hash = path.replace(/.*#/, '');
				}, test.url[urlIndex])
			}else{
				casper.thenEvaluate(function(path){
					window.location.hash = '';
				});
			}
		}

		casper.then(function(test){
			return function(){
				//console.log('interactBeforeContext ' + test.name);
				if(test.interactBeforeContext){
					test.interactBeforeContext(casper);
				}
			}
		}(test));
			
		for(var contextIndex = 0; contextIndex < contexts.length; contextIndex++){

			var context = contexts[contextIndex];

			casper.then(function(context){
				return function(){
					casper.viewport(context.width, context.height);
				}
			}(context));


			casper.then(function(test){
				return function(){
					if(test.interactAfterContext){
						test.interactAfterContext(casper);
					}
				}
			}(test));


			casper.then(function a(test, context){

				return function(){
					//console.log('context!')
					for(var j = 0; j < test.components.length; j++){
						
						var selector = test.components[j].replace(/\:optional/g, '');

						casper.mouse.move('html'); // Reset the mouse

						if(selector.indexOf(':hover') > 0){
							
							casper.then(function(selector){
								return function(){
									casper.mouse.move(selector.replace(/\:hover.*/, ''));
								}
							}(selector));

							selector = selector.replace(':hover', '');
						}

						casper.then(function b(selector, context, test, j){

							return function(){
								var bounds = casper.getElementBounds(selector);
								if(casper.visible(selector) && (bounds.width + bounds.height) > 10){
									casper.waitForSelector((test.waitFor || 'html'), function(selector, context, test, j){
										return function(){
											//console.log('screenshot!')
											phantomcss.screenshot(selector, (test.name + '-' + ((test.url || []).length > 1 ? casper.getTitle().replace('Lone Star Percussion', '') : '') + '-' + context.name + '-' + test.components[j]).replace(/\W/g, '-').replace(/-{1,}/g, '-'));
										}
									}(selector, context, test, j), function(selector, context, test, j){
										return function(){
											casper.test.fail('Expected selector ' + selector + ' times out. Test:' + test.name + '  Context:' + context.name + ' Url:' + casper.getCurrentUrl());
										}
									}(selector, context, test, j));

								}else{
									//casper.test.comment('Warning : "' + selector + '" was not visible and therefore not tested. Test:' + test.name + '  Context:' + context.name + ' Url:' + casper.getCurrentUrl());
								}
							}
						}(selector, context, test, j));

						if(test.interactAfterContext){
							test.interactAfterContext(casper);
						}

						
					}

				}
			}(test, context));
		}

		casper.then(function(test){
			
			return function(){
				//console.log('interactAfterScreenshot - ' + test.name);
				if(test.interactAfterScreenshot){
					test.interactAfterScreenshot(casper);
				}
			}
		}(test));

	}
}

casper.then( function now_check_the_screenshots(){
	// compare screenshots
	phantomcss.compareAll();
});

casper.then( function end_it(){
	casper.test.done();
});

casper.run(function(){
	phantom.exit(phantomcss.getExitStatus());
});
