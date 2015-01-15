(function(){

define(['utilities/global', 'controllers/application'], function(){
	
	var _util = window.LSP.utilities;
	
	_util.register('controller', 'checkout', (function(){
		
		var _this = {};
		var _app = window.LSP;
		var _assets = _app.assets;
		var _util = _app.utilities;
		
		var _state = {};
		var _mainTable = 'body .span12 > table';
		
		_this =  {
			events : {
				checkout : {
					onInit : function(e, data){
						
						LSP.config = LSP.config || {};

						_this.setPage(LSP.config.setPage);
					},
					onEnterCart : function(e, data){
						// Remove 'empty' links - they create a state in history
						// that is annoying to overcome
						var timeout;
						$('a[href="#"]').attr('href', null);
						$('input[name="checkout"]').attr('formnovalidate', true).click(function(){
							//console.log('Input Clicked.')
							setTimeout(function(){ clearTimeout(timeout); }, 1000);
						}).parent().click(function(){
							//console.log('Container Clicked');
							timeout = setTimeout(function(){
								_gaq.push(['_trackEvent', 'cart', 'error', '5 seconds have passed since clicking proceed to checkout']);
							}, 5000);
						});

						// Hide the "options" td if they are empty
						$('td.uir-list-row-cell:nth-child(4):not(:contains(":"))').addClass('hidden-phone');
						
						// Extended Cart Upgrades
						if($('.extcartborder').length){
							$('tr[id*=carttablerow] ~ tr:not([id])').addClass('tablefooter').last().addClass('total')
							var rows = $('.tablefooter');
							$(rows[0]).addClass('footerMerch')
							$(rows[1]).addClass('footerTax')
							$(rows[2]).addClass('footerShip')
							$(rows[3]).addClass('footerOther')
							$(rows[4]).addClass('footerTotal')
					
							$('.footerTotal b:contains("Subtotal"):last').text("Order Total");

							var countryInput = $('select[name="country"]').detach().wrap('<div class="shipInput countryInput"></div>').parent();
							var zipInput = $('#zip').detach().wrap('<div class="shipInput zipInput"></div>').parent();
							
							var carrierInput = $('#shippingcarrierselect').detach().wrap('<div class="shipInput carrierInput"></div>').parent();
							var carrierChoices = $("<table class='carrierChoices'></table>");
							$('input[type="radio"][name="sShipMeth"]').parent().wrap("<tr></tr>").parent().prependTo(carrierChoices);

							var shipLine = $('.footerShip > td:first-child').attr('colspan', '0').attr('style', 'display:none!important;').next().attr('colspan', '6');

							$('.footerMerch .texttable:not(:last-child)').remove()
							$('.footerMerch td:first-child').attr('colspan', '6');
							$('.footerTotal .extcartborder').remove();
							$('.footerTotal .extcarttotal').attr('colspan', '6');

							// Add new inputs
							$('<input id="countryforminput" name="country" type="hidden">').prependTo('form[name="cart"]')
							$('<input id="zipforminput" name="zip" type="hidden">').prependTo('form[name="cart"]')
							$('<input id="shippingcarrierforminput" name="shippingcarrierselect" type="hidden">').prependTo('form[name="cart"]')
							$('<input id="shipmethforminput" name="sShipMeth" type="hidden">').prependTo('form[name="cart"]')


							if($('select option[selected]', carrierInput).text().replace(/^\s\s*/, '').replace(/\s\s*$/, '') == 'More')
								$(carrierChoices).attr('style', 'display: none !important;');

							$('option:contains("More")', carrierInput).text("Standard (2-6 Days)");

							$(zipInput).prependTo(shipLine);
							$(countryInput).prependTo(shipLine);
							$(carrierInput).prependTo(shipLine);
							$(carrierChoices).appendTo(shipLine);
							$('b', shipLine).replaceWith($('<div class="label">Shipping<div class="details" style="font-weight:normal !important;">Enter your zip code</div></div>'))

							$('select', carrierInput).attr('onchange', '').on('change', function(){
								
								$('#shippingcarrierforminput').val($(this).val());

								if($(this).val() == 'nonups'){
									eval($('.footerShip script').html().replace("&sShipMeth=", "&sShipMeth=51489"));
								}

								shippingSelectOnChange();
							});

							$(':input', countryInput).on('change', function(){ 
								$('#countryforminput').val($(this).val());
							});
							$('#countryforminput').val($(':input', countryInput).val());
							$('#shipmethforminput').val($('input[type="radio"][name="sShipMeth"][checked]').val());
							$('#zipforminput').val($(':input', zipInput).val());
							$('#shippingcarrierforminput').val($(':input', carrierInput).val())

							$(':input', countryInput).on('change', function(){
								$('#recalc').click();
							});

							$(':input', zipInput).on('change', function(){ 
								$('#zipforminput').val($(this).val());
							});

							$('.zipInput input').on('blur', function(){
								$('#recalc').click();
							});

							$('#tbl_recalc').attr('style', 'display: none;');
							$('input[size="6"], .zipInput input').one("keydown", function(){ $('#tbl_recalc').attr('style', ''); })

						}
						
						$('html').attr('data-path', 'http://www.lonestarpercussion.com/cart');

						// Prepare the CSS files for https
						//googleAsyncCSSLoader('https:' + CDN + '/min/css/platform.css?v=' + VERSION);
						//googleAsyncCSSLoader('https:' + CDN + '/min/css/core.css?v=' + VERSION);

					},
					onEnterSignup : function(e, data){

						// Add label to label text so you can click on the text and engage the checkbox
						$('#emailsubscribe_fs_lbl').wrap('<label for="#emailsubscribe_fs"></label>');

						// Remove random space (can't be identified via CSS selectors safely)
						$("td:contains('Your password hint')").prev().addClass('hidden-phone');

					},
					onEnterAddress : function(e, data){
						if($('.greytitle').is(':contains("Shipping")')){
							_this.setPage('shippingAddress');
						}else{
							_this.setPage('billingAddress');
						}
					},
					onEnterShippingAddress : function(e, data){
						$(_mainTable + ' > tbody > tr > td > table > tbody > tr.portletHandle:first-child + .noprint + .portletHandle:not(:has(#address))')
							.css({height : '0px', visibility : 'hidden'}); // we do this rather than display: none because 
																		   // we need the margin-top to still work to make space for the timeline
					},
					onEnterBillingAddress : function(e, data){

					},
					onEnterShippingMethod : function(e, data){
						$('#kReferralCode, #applycoupon').attr('tabindex', -1);
					},
					onEnterPayment : function(e, data){
						$('input[name="gc"], #applygift').attr('tabindex', -1);

						// VWO Test "Enhanced Payment" Promotion
						$('#stepSlider').prependTo('.page-generic:first').wrap('<table><tr height="25"><td></td></tr></table>'); // Move slider

						// Set up structure
						$('#paymeth > table').parent().parent().addClass('row-fluid');
						$('#paymeth > table').addClass('span8').attr('style', '');
						$('<div class="span4 rightColumn pull-right"><div class="orderSummary"></div>').insertBefore('#paymeth > table')
						$(".cart").prependTo(".orderSummary");
						
						// Move/Add BSA
						$('.adForPaymentPage *[class*="bsa-"]').appendTo(".rightColumn").parent().removeClass("hide");

						// Hide Gift Card
						if($('.newGiftCardRow').length == 0)
						  $('<tr class="newGiftCardRow"><td class="smalltextnolink" align="right" style="padding-top:10px;"><input id="giftCardCheckbox" type="checkbox" style="float:right;position:relative;top:10px;" onclick="window.toggleGiftCard()"></td><td style="padding-top:20px;">Do you have a gift card?<div class="details">Redeeming a Gift Card is easy!</div></tr>').insertBefore('input[name="sIssueNo"]');

						$('td:contains("Apply a Gift Card"):last').attr('style', 'visibility: hidden;')
						  $('.greytitle:contains("Gift Card"):last').attr('style', 'display: none !important;').parent().prev().attr('style', 'display: none !important;');
						$('tr:contains("Apply a Gift Card"):last').addClass('giftCardRow');
						$('tr:contains("If you have a gift card"):last').attr('style', 'display: none !important;');
						$('input[name="sValidFromYr"] ~ tr:contains("Invalid"):last table').attr('style', 'margin: 20px 5px 10px 160px;');
						

						window.toggleGiftCard = function(){
						  if($('#giftCardCheckbox').is(':checked')){
						    $('.giftCardRow').attr('style', '');
						    $('#giftCardCheckbox').prop('checked', true);
						  }else
						    $('.giftCardRow').attr('style', 'display: none !important;');
						}

						window.toggleGiftCard();

						if($('input[name="gc"]').val().length > 0){
						  $('.giftCardRow').show();
						  $('tr:contains("Do you"):last').attr('style', 'display: none !important;');
						}

						// Hide Security Code Help Text
						$('tr:contains("For most credit"):last').attr('style', 'display: none !important;');

						// Review Notice
						if($('.notice:contains("You will")').length == 0)
						  $('<div class="notice" style="position: absolute;bottom: -110px;height: 100px;">You won&#39;t be charged yet<span class="details">You will review and place your order on the next page</span></div>').prependTo("#paymeth > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td")
						// END VWO Promotion


					},
					onEnterReview : function(e, data){

						// Remove blank line before help text
						$('td:contains("If you have an offer or promotion code, enter it here")').prev().addClass('hidden-phone');


						// Hide options td (used for matricies) if they are empty
						$('td.uir-list-row-cell:nth-child(4):not(:contains(":"))').addClass('hidden-phone');
					},
					onEnterThankYou : function(e, data){
						
						var cartTable = $(_mainTable + ' > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:first-child + tr > td > table,'
										+ '#checkout table table table > tbody > tr:first-child + tr > td > table:not(.texttable table)').attr('id', 'carttable') // IE selector
						
						$('> tbody > tr:first-child', cartTable).attr('id', 'carttableheader');
						
						$('> tbody > tr:first-child ~ tr', cartTable).not('tr[id]')
							.each(function(i, e){ 
								$(e).attr('id', 'carttablerow' + i); 
							});

						$('#ordersummary_total .texttablert:first-child b').text('Total');

						$(_mainTable).addClass('nscheckout-receipt'); // page-specific hook
   
						_gaq.push(['_trackTrans']);
					},
					onEnter : function(e, data){
						try{
							$('input[name*="email"]:not([type="checkbox"])').attr('type', 'email');
							$('input[name*="zip"], input[name*="phone"], input[name*="sCardNum"], input[name*="ccsecuritycode"]').attr('type', 'tel');
							$('input:not([type])').attr('type', 'text');
							_app.controllers.netsuite.attachEnterKey();
						}catch(e){ }

						// TODO : check and see if we can add setPage code in the Enter Shipping Address header customize text rather
						// than doing the generic 'address' call we are currently doing
						
						// Avoid address/shipping/billing confusion
						if(data.pageName !== 'address'){
							_gaq.push(['_set', 'title', 'Checkout - ' + data.pageName]);
							_gaq.push(['_trackPageview', '/checkout/' + data.pageName]);
						}
					}
				},
				application : {
					onAttachEvents : function(e, data){
						// this fires whenever html is parsed into the document
						// it gets fired once onDomReady, and again every
						// time HTML is injected into the page - use it
						// to hook up custom checkout events
					},
					onReady : function(e, data){
					},
					onInit : function(e, data){
						// this fires when this controller has been loaded
						// but the dom isn't ready yet
					}
				}
			},
			
			assets : { },

			setPage : function(pageName){
				_state.page = pageName;


				console.log('Firing Page Event : ' + _util.camelCase('on-enter-' + pageName));

				$(_this).triggerHandler(_util.camelCase('on-enter'), {selector : $(document), pageName : pageName});
				$(_this).triggerHandler(_util.camelCase('on-enter-' + pageName), {selector : $(document)});
				$(_mainTable).addClass('nscheckout-' + pageName);
			}

		};

		return _this;
	}()));

	for(var i = 0; i < ((((LSP.config || {}).checkout || {}).page) || []).length; i++){
		LSP.controllers.checkout.setPage(LSP.config.checkout.page[i]);
	}

});

}());
