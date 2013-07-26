(function(){
	
	var _util = window.LSP.utilities;
	
	_util.register('controller', 'checkout', (function(){
		
		var _this = {};
		var _app = window.LSP;
		var _assets = _app.assets;
		var _api = _app.models.cart;
		var _util = _app.utilities;
		
		var _state = {};
		var _mainTable = 'body .span12 > table';
		
		_this =  {
			events : {
				checkout : {
					onEnterCart : function(e, data){
						// Remove 'empty' links - they create a state in history
						// that is annoying to overcome
						$('a[href="#"]').attr('href', null);
						$('input[size="6"][maxlength="6"]')
							.attr('type', 'number')
							.attr('min', '0')

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

						$(_mainTable).addClass('nscheckout-receipt'); // page-specific hook
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

				$(_this).triggerHandler(_util.camelCase('on-enter-' + pageName), {selector : $(document)});
				$(_mainTable).addClass('nscheckout-' + pageName);
			}

		};
		
		return _this;
	}()));

}());