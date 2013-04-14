(function(){
    
    var _util = window.LSP.utilities;
    
    var cart = function(){
        var _this = {};
        var _app = window.LSP;
        var _assets = _app.assets;
        var _api = _app.models.api;
        var _util = _app.utilities;
        var _cartContents = [{quantity : 2, id : 34103}, {id : 2217, quantity: 23}];
        var _completedSteps = [];
		
        _this =  {
            events : {
				cart : {
					onLogin : function(e, data){
						alert('Login (cart.js : 17)');
						_this.proceedTo('shipping');
						_this.renderCheckoutSummary(); // After updating the address
						
					},
					onLoginAsGuest : function(e, data){
						alert('Login as Guest (cart.js : 20)');
						_this.proceedTo('shipping');
						_this.renderCheckoutSummary(); // After updating the address
					},
					onApplyPromoCode : function(e, data){
						// Access the promo code string via
						// $('input[name="promo"]')[0].value
						// if there are other input elements you might need to refine the
						// selector a bit more
						alert('Apply Promo Code (cart.js : 17)');
					},
					onApplyGiftCard : function(e, data){
						alert('Apply Gift Card (cart.js : 24)');
					},
					onUpdateShippingMethod : function(e, data){
						_this.updateShippingAmount();
					},
					onUpdateZipcode : function(e, data){
						_this.updateShippingAmount();
					},
					onUpdateCountry : function(e, data){
						_this.updateShippingAmount();
					},
					onUpdateBillingAddress : function(e, data){
						alert('Update Billing Address (cart.js : 36)');
					},
					
					// Fired when the Continue button is clicked after Shipping
					onSaveShipping : function(e, data){
						
						alert('Save Shipping (cart.js : 53)');
						
						_this.showLoading();
						var data = {stuff : true};
						
						$.when(
							_this.saveShippingData(data)
						).done(function(serverResponse){

							var summaryHTML = _util.parseMicroTemplate('templates-shipping-summary', data);
							$('#shippingSummary').html(summaryHTML);
							_app.controllers.application.attachEvents($('#shippingSummary'));
						
							_this.toggleStepVisability('shipping');
							$('.page-checkout').addClass('finishedShipping');
							_this.proceedTo('billing');
							
							_this.hideLoading();
							
						});
						
					},
					
					// Fired when the Edit link is clicked on the shipping summary
					onEditShipping : function(e, data){
						$('#shippingSummary').addClass('hide');
						_this.toggleStepVisability('shipping');
					},
					
					// Fired when the Continue button is clicked after Billing
					onSaveBilling : function(e, data){
						
						alert('Save Billing (cart.js : 53)');
						
						_this.showLoading();
						var data = {stuff : true};
						
						$.when(
							_this.saveBillingData(data)
						).done(function(serverResponse){

							var summaryHTML = _util.parseMicroTemplate('templates-billing-summary', data);
							$('#billingSummary').html(summaryHTML);
							_app.controllers.application.attachEvents($('#billingSummary'));
						
							_this.toggleStepVisability('billing');
							_this.proceedTo('review');
							
							_this.hideLoading();	
							
						});
						
					},
					
					// Fired when the Edit link is clicked on the billing summary
					onEditBilling : function(e, data){
						$('#billingSummary').addClass('hide');
						_this.toggleStepVisability('billing');
					},
					
					onFinishOrder : function(e, data){
						alert('Finish Order (cart.js : 78)');
						// There are two ways to do finish the order
						//		1. Submit the form in a standard way
						// 		   in this case, this function can be used for any last-minute changes or validations
						//		2. Ajax the form
						//		   in this case, this function preps the data, and sends it off.
					}
				},
                application : {
                    onReady : function(e, data){
                    	//console.error(_this.assets.listEncoder.encode(_cartContents));
                    	//console.error(_this.assets.listEncoder.decode(_this.assets.listEncoder.encode(_cartContents)));
                    },
                    onInit : function(e, data){}
                }
            },
            assets : {
            	listEncoder : new _assets.listEncoder(_this, 'listEncoder')
            },
			
			proceedTo : function(stepName){
				if(_completedSteps.indexOf(stepName) == -1){
					
					// Do these things only once per step
					_completedSteps.push(stepName);
					$('.steps .active').removeClass('active');
					$('.steps .' + stepName).addClass('active completed');
					
					switch(stepName){
						case 'shipping' : // Proceed to shipping
							$('#shippingInputPanel').removeClass('hide');
							$('#loginPanels').addClass('hide');
							break;
							
						case 'billing' : // The user has moved away from shipping to payment
							$("#billingInputPanel").removeClass('hide');
							$('button[data-action="saveShipping"]').html("Save Shipping");
							$('button[data-action="saveShipping"].hide').removeClass('hide');
							break;
							
						case 'review' : // Do stuff here that needs to be done after billing is complete
							$('button[data-action="saveBilling"]').html("Save Billing");
							$('button[data-action="finishOrder"]').removeClass('hide');
							$('button[data-action="saveBilling"].hide').removeClass('hide');
							$('.advertisement').addClass('hide');
							break;
					}
				}
			},
			
			showLoading : function(){
				console.log('Loading');
				$('.page-checkout').addClass('loading');
			},
			hideLoading : function(){
				console.log('Not Loading');
				$('.page-checkout').removeClass('loading');
			},
			
			saveShippingData : function(data){
				// Process the data, send to server, return a deferred object with the server response
				// you'll want to return a .promise() object, and then resolve when the ajax request returns
				// look at /models/api.js for a really robust example
				// I prefer abstracting all of this stuff out to a model (like api) and then just returning
				// the result of those calls... for example, /plugins/definitions.js has functions
				// that just say "return _api.request(methodName, arguments);" because the model returns
				// a deferred object.
				
				// i'm resolving this right away for testing... in your code there will be a delay, during
				// which a loading screen will show
				return $.Deferred().resolve({data:'stuff'});
			},
			
			saveBillingData : function(data){
				// process the data, send to server, return a deferred object with server response
				return $.Deferred().resolve({data:'stuff'});
			},
			
			toggleStepVisability : function(stepName){
				
				var panel = $('#' + stepName + 'InputPanel');
				var summary = $('#' + stepName + 'Summary');
				
				if(panel.hasClass('hide')){
					// Show Panel, Hide Summary
					panel.removeClass('hide');
					summary.addClass('hide');
					$('button[data-action="finishOrder"]').addClass('hide');
				}else{
					// Show Summary, Hide Panel
					panel.addClass('hide');
					summary.removeClass('hide');
					if($('#shippingInputPanel').hasClass('hide') && $('#billingInputPanel').hasClass('hide')){
						$('button[data-action="finishOrder"]').removeClass('hide');	
					}
				}
				
			},
			
			updateShippingAmount : function(){
				alert('Update Shipping Method (cart.js : 51)');
			},
			
			renderCheckoutSummary : function(){
				
				// This is an example you could use for the cart
				// perhaps you format it like this on the server
				// or you can change the format and update the
				// microtemplate
				var cartData = {
					totals : {
						merchandise : {
							value : 14.00
						},
						shipping : {
							method : 'Standard Shipping',
							value : 10.00
						},
						tax : {
							value : 15.00
						},
						total : {
							value : 16.00
						}
					},
					products : [
						{
							title : "this is a product title",
							quantity : 3,
							mpn : "IP240",
							extendedPrice : 22.00,
							options : "Red Sparkle Finish, Chrome Hardware",
							status :{
								description : "Ships Seperately",
								slug : "seperately"
							}
						},{
							title : "this is a product title",
							quantity : 3,
							mpn : "IP240",
							extendedPrice : 22.00,
							options : "Red Sparkle Finish, Chrome Hardware",
							status :{
								description : "Ships Seperately",
								slug : "seperately"
							}
							
						}
					]};
				var summaryHTML = _util.parseMicroTemplate('templates-checkout-summary', cartData);
				$('#checkoutSummary').html(summaryHTML);
			}
        };
        
        return _this;
    }();
    
    _util.register('controller', 'cart', cart);

})();