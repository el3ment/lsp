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
						
						// IE has 'type' as a read-only attribute, jquery will complain
						// try{
						// 	// $('input[size="6"][maxlength="6"]')
						// 	// 	.attr('type', 'number')
						// 	// 	.attr('min', '0')
						// 	// 	.off('.submitter')
						// 	_app.controllers.netsuite.attachEnterKey();
						// }catch(e){}

					},
					onEnterRegister : function(e, data){

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

});

}());
