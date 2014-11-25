var assert = require('assert');
require('webdrivercss').init(browser, {
    // example options
    screenshotRoot: 'tests/webdriver/baseline',
    failedComparisonsRoot: 'tests/webdriver/diffs',
    misMatchTolerance: 0.05,
    screenWidth: browser.options.desiredCapabilities.screenWidth,
    exclude: ['img[src*="cloudfront"]','img[src*="lonestarpercussion"]']
});


var tests = [
	{
	 name : 'chrome',
	 waitFor : '#mainFlyout',
	 url : ['/'],
	 components : ['.header', '.footer .well', '.footer .banner', '.newsletter', 'li.hideIfLoggedIn', 'li[data-reveal-children="contactFlyout"]:hover', 'li[data-reveal-children="contactFlyout"]', '#mainFlyout .topLevel']
	},
	{
	 name : 'home',
	 url : ['/'],
	 components : ['.footer .well', '.productAd', '.ad.touchcarousel-item', '.category']
	},
	{
		name : 'product',
		url : ['/Sticks-Mallets/Marimba-Mallets/Innovative-Percussion-IP240.html'],
		// interactAfterContext : function(casper){
		// 	casper.then(function(){
		// 		try{ casper.click('button[data-reveal-children="productSpecifications"].reveal-closed'); }catch(e){ }
		// 	}).then(function(){
		// 		try{ casper.click('button[data-reveal-children="returns"].reveal-closed'); }catch(e){ }
		// 	}).then(function(){
		// 		try{ casper.click('button[data-reveal-children*="addReviewForm"].reveal-closed'); }catch(e){ }
		// 	});
		// },
		components : ['html', '.addToCart', '.media', '.information', '.dynamicItemSuggestions','.relatedItems', '#productReviews', '#addReviewForm', '#productSpecifications', '#returns']
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
		beforeTest : function(){
			this.click('.addToCart button.b1');
		},
		afterTest : function(){
			this.click('input[type="submit"][onclick*="vid"]');
		},
		components : ['html']
	},
	{
		name : 'checkout-2-guest-login',
		afterTest : function(){
			this.click('input[name="register"]');
		},
		components : ['html']
	},
	{
		name : 'checkout-3-account',
		afterTest : function(){
			this.setValue('input[name="name"]', 'Test McTesterson Jr.');
			this.setValue('input[name="email"]', 'test@McTesterson.com');
			this.submitForm('form#newcust');
		},
		components : ['html']
	},
	{
		name : 'checkout-4-shipping',
		afterTest : function(){
			this.click('#defaultbilling_fs_inp');
			this.setValue('input[name="attention_input"]', 'Test McTesterson');
			this.setValue('input[name="addr1"]', '10611 Control Place');
			this.setValue('input[name="city"]', 'Dallas');
			this.selectByValue('select[name="dropdownstate"]', 'TX');
			this.setValue('input[name="zip"]', '75150');
			this.setValue('input[name="phone"]', '(469) 766-4616');
			this.click('#submitter');

		},
		components : ['html']
	},
	{
		name : 'checkout-5-billing',
		afterTest : function(){
			this.click('#use');
		},
		components : ['html']
	},
	{
		name : 'checkout-6-method',
		// Sometimes it will skip the checkout method.. still unsure why
		// specifying the url ensures we get the method page
		//url : ['https://checkout.netsuite.com/s.nl/c.665798/sc.4/category.shipping/.f'],
		afterTest : function(){
			this.click('#submitter');
		},
		components : ['html']
	},
	{
		name : 'checkout-7-payment',
		afterTest : function(){
			this.click('input[type="radio"][name="sPayMeth"][value="5,1,1555641112"]');
			this.setValue('input[name="sCardNum"]', '373983429450865');
			this.selectByValue('select[name="sExpMo"]', '09');
			this.selectByValue('select[name="sExpYr"]', '2020');
			this.setValue('input[name="sCardName"]', 'Test McTesterson');
			this.setValue('input[name="ccsecuritycode"]', '123');
			this.submitForm('form#paymeth');
		},
		components : ['html']
	},
	{
		name : 'checkout-8-review',
		components : ['html']
	}
	
];

function camelCase(string){
	var fcamelCase = function( all, letter ) {
		return ( letter + '' ).toUpperCase();
	};
	var fLowerCase = function(all, letter){
		return (letter + '').toLowerCase();
	};
	return string.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, fcamelCase ).replace(/^([A-Z]){1}/, fLowerCase);  
}

function parseElements(componentArray){
	var returnArray = [];
	
	for(var i = 0; i < componentArray.length; i++){
		returnArray.push({name : camelCase(componentArray[i]), elem : componentArray[i]});
	}

	return returnArray;
}

for(var i = 0; i < tests.length; i++){

	var test = tests[i];

	describe('Parent Test : ' + browser.options.desiredCapabilities.browserName + ' : ' + test.name + ' elements', function(){

		it(test.name + ' elements look the same', function(test){
			return function(done){
				var urls = test.url ? test.url : [null];

				for(var j = 0; j < urls.length; j++){

					var url = urls[j];

					if(url){
						browser.url('http://lonestarpercussion.com' + url);
					}

					browser.execute(function(){
						if(window.jQuery){
							$("*[data-src]").trigger("unveil");
						}
					});

					var elements = parseElements(test.components);
					var title = camelCase((url || 'url-index-' + j).replace('/', '-').replace('\..*', ''));
						title = title.length > 0 ? title : 'home';
					var version = browser.options.desiredCapabilities.version || 'edge';
					var browserName = browser.options.desiredCapabilities.browserName;
					var testName = browserName + '-' + version + '-' + test.name + '-' + title;

					browser.call(test.beforeTest || function(){});

					if(test.waitFor){
						browser.waitForVisible(test.waitFor, 5000, function(err, res){
							if(err){
								console.warn(test.waitFor + ' was not visible');
							}
						});
					}

					browser.webdrivercss(testName, elements, function(err, res){
						describe(testName, function(){

							for (var test in res) {
								if(res.hasOwnProperty(test)){

									for(var i = 0; i < res[test].length; i++){
										it(test + ' looks the same', function(component){
											return function(){
												assert(component.isWithinMisMatchTolerance);
											};
											
										}(res[test][i]));
									}
								}
							}
						});
					});

					browser.call(test.afterTest || function(){});

				}

				browser.call(done);
			};
		}(test));
	});
};

browser.call(function(){

})