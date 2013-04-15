(function(){
    
    var _util = window.LSP.utilities;
    
	_util.register('controller', 'checkout', function(){
        
		var _this = {};
        var _app = window.LSP;
        var _assets = _app.assets;
        var _api = _app.models.cart;
        var _util = _app.utilities;
		
        var _completedSteps = [];
		
        _this =  {
            events : {
				checkout : {
					
					onLogin : function(e, data){
						
						console.log('Login');
						
						_this.proceedTo('shipping');
						
						// Update the address data from the server, then
						// get an updated cart summary
						
						_this.updateCart();
						_this.updateShippingMethods();
					},
					
					onLoginAsGuest : function(e, data){
						
						console.log('Login as Guest');
						
						_this.proceedTo('shipping');
						
						_this.updateCart();
						_this.updateShippingMethods();
					},
					
					onApplyPromoCode : function(e, data){
						// Access the promo code string via
						// $('input[name="promo"]')[0].value
						// if there are other input elements you might need to refine the
						// selector a bit more
						
						console.log('Apply Promo Code');
						
					},
					
					onApplyGiftCard : function(e, data){
						console.log('Apply Gift Card');
						_this.updateCart();
					},
					
					onUpdateShippingMethod : function(e, data){
						_this.updateCart();
					},
					
					onUpdateZipcode : function(e, data){
						if(_this.hasChosenShippingMethod()){
							$.when(
								_this.updateShippingMethods()
							).done(function(serverResponse){
								_this.updateCart();
							});
						}else{
							_this.updateShippingMethods();
						}
					},
					
					onUpdateCountry : function(e, data){
						
						_this.updateShippingMethods();
						
						// We'll probably need to change some of the form
						// labels -- for example, if you pick "afganistan"
						// you won't have a 'zip code' but you'll have
						// a 'postal code'... to be honest, I'm not sure how
						// netsuite handles this, or how many different address forms
						// we could have - but this is where we would do it
						
						// when it comes time to do this, let's talk about it
					},
					
					onUpdateBillingAddress : function(e, data){
						
						// This funtion gets fired when the user unchecks, or checks
						// the Billing Address is Same As Shipping Address checkbox
						// Perhaps you don't need to do anything here - but the
						// function get's called in case you do
						
						console.log('Update Billing Address');
						
					},
					
					onSaveShipping : function(e, data){
						
						// Fired when the Continue button is clicked after Shipping
						
						console.log('Save Shipping');
						
						$.when(
							_this.saveShippingData()
						).done(function(serverResponse){
							
							// Update the shipping summary
							var summaryHTML = _util.parseMicroTemplate('templates-shipping-summary', serverResponse);
							$('#shippingSummary').html(summaryHTML);
							_app.controllers.application.attachEvents($('#shippingSummary'));
				
							// Hide the input panel
							_this.toggleStepVisability('shipping');
					
							// Move to billing
							_this.proceedTo('billing');
							
						})
						
					},
					
					onEditShipping : function(e, data){
						// Fired when the Edit link is clicked on the shipping summary
					
						$('#shippingSummary').addClass('hide');
						_this.toggleStepVisability('shipping');
					},
					
					onSaveBilling : function(e, data){
						
						// Fired when the Continue button is clicked after Billing
						
						console.log('Save Billing');
						
						$.when(
							_this.saveBillingData()
						).done(function(serverResponse){
							
							// Update the shipping summary
							var summaryHTML = _util.parseMicroTemplate('templates-billing-summary', serverResponse);
							$('#billingSummary').html(summaryHTML);
							_app.controllers.application.attachEvents($('#billingSummary'));
				
							// Hide the input panel
							_this.toggleStepVisability('billing');
					
							// Move to billing
							_this.proceedTo('review');
							
						})
						
					},
					
					onEditBilling : function(e, data){
					
						// Fired when the Edit link is clicked on the billing summary
					
						$('#billingSummary').addClass('hide');
						_this.toggleStepVisability('billing');
					},
					
					onFinishOrder : function(e, data){
						
						// Fired when the Place Order button is pressed
						
						console.log('Finish Order');
						// There are two ways to do finish the order
						//		1. Submit the form in a standard way
						// 		   in this case, this function can be used for any last-minute changes or validations
						//		2. Ajax the form
						//		   in this case, this function preps the data, and sends it off.
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
						// This fires when all controllers have been loaded
						// the dom is ready
                    },
                    onInit : function(e, data){
                    	// this fires when this controller has been loaded
						// but the dom isn't ready yet
                    }
                }
            },
            
			assets : { },
			
			/* Process Centered Methods */
			proceedTo : function(stepName){
				if($.inArray(stepName, _completedSteps) < 0){
					
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
			
			showLoading : function(){
				console.log('Loading');
				$('.page-checkout').addClass('loading');
			},
			
			hideLoading : function(){
				console.log('Not Loading');
				$('.page-checkout').removeClass('loading');
			},

	
			/* Functionality Centered Methods */
			hasChosenShippingMethod : function(){
				return $('#checkoutForm input[name="shipping.method"]').is(':checked');
			},
			
			saveShippingData : function(){
				// Process the data, send to server, return a deferred object with the server response
				// you'll want to return a .promise() object, and then resolve when the ajax request returns
				// look at /models/api.js for a really robust example
				// I prefer abstracting all of this stuff out to a model (like api) and then just returning
				// the result of those calls... for example, /plugins/definitions.js has functions
				// that just say "return _api.request(methodName, arguments);" because the model returns
				// a deferred object.
				
				// i'm resolving this right away for testing... in your code there will be a delay, during
				// which a loading screen will show
				
				_this.showLoading();
				
				var deferred = $.Deferred();
				// build an object of stuff you need to send to the server, formToObjectis found in /vendors/form2js.js
				// it's arguments look like formToObject(element, delimeter, skipEmpty)
				// we use period delimeters (the default) so you can always leave it null
				var checkoutForm = _util.formToObject($('#checkoutForm')[0], null, false);
				
				$.when(
					// Make API request here
					// _api.request(controller, eventName, method, data)
					// ex. _api.request(_this, 'saveShippingData', 'saveShippingData', checkoutForm)
					// the event name will help fire some events like onAPISaveShippingDataSuccess and
					// onAPISaveShippingDataFailure etc... in almost every case, the method and the eventName
					// will be the same thing.
					
					_api.request(_this, 'saveShippingData', 'saveShippingData', checkoutForm['shipping'])
					
				).done(function(serverResponse){
					
					var serverResponse = checkoutForm; // For testing, I'll just 'return' the form values as they are
					
					_this.hideLoading();
					
					// Resolve the deferred object so calling functions can have callbacks if they want
					deferred.resolve(serverResponse);
					
				});
				
				return deferred.promise();
			},
			
			saveBillingData : function(data){
				
				// process the data, send to server, return a deferred object with server response
				
				_this.showLoading();
				var deferred = $.Deferred();
				var checkoutForm = _util.formToObject($('#checkoutForm')[0], null, false);
				
				$.when(
					// Make API request here
				).done(function(serverResponse){
					
					var serverResponse = checkoutForm; // eventually use something the server sends back
					
					_this.hideLoading();
					
					// Resolve the deferred object so calling functions can have callbacks if they want
					deferred.resolve(serverResponse);
					
				});
				
				return deferred.promise();

			},
			
			updateCart : function(data){
				
				console.log('Update Shipping Amount In Cart, re-render summary');
				
				// Get country and zip code, then
				// Send a request to the server, return a Deferred object
				
				var deferred = $.Deferred();
				var checkoutForm = _util.formToObject($('#checkoutForm')[0], null, false);
				
				$.when(
					// Make API request here using data
				).done(function(serverResponse){
					
					// This is an example you could use for the cart
					// perhaps you format it like this on the server
					// or you can change the format and update the
					// microtemplate
					
					var exampleServerResponse = {
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
						
					_this.renderCartSummary(exampleServerResponse);
						
					// Resolve the deferred object so calling functions can have callbacks if they want
					deferred.resolve(exampleServerResponse);
					
				});
				
				return deferred.promise();
			},
			
			renderCartSummary : function(cartData){
				var summaryHTML = _util.parseMicroTemplate('templates-checkout-summary', cartData);
				$('#checkoutSummary').html(summaryHTML);
				_app.controllers.application.attachEvents($('#checkoutSummary'));
			},
			
			updateShippingMethods : function(cartData){
				
				// Send a request to the server, return a Deferred object
				var deferred = $.Deferred();
				var data = {stuff : true};
				
				$.when(
					// Make API request here using data
				).done(function(serverResponse){
					
					// Like cart summary, this is an example of the data... we can
					// reformat it if needbe, just update the template to reflect the new
					// property names
					
					var exampleServerResponse= [
						{
							title : 'Standard Shipping',
							delay : '3-5 days',
							arrivesBy : 'Tuesday', // We could calculate this in the template...
							amount : 13.23
						},
						{
							title : 'Express Shipping',
							delay : '2-3 days',
							arrivesBy : 'Saturday', // We could calculate this in the template...
							amount : 13.23
						},
						{
							title : 'Overnight Shipping',
							delay : '1-2 days',
							arrivesBy : 'Thursday', // We could calculate this in the template...
							amount : 13.23
						}
					];
					
					_this.renderShippingMethods(exampleServerResponse);
						
					// Resolve the deferred object so calling functions can have callbacks if they
					// want
					deferred.resolve(exampleServerResponse);
					
				});
				
				return deferred;
			},
			
			renderShippingMethods : function(shippingMethodData){
				var summaryHTML = _util.parseMicroTemplate('template-checkout-shippingMethods', shippingMethodData);
				$('#shippingMethods').html(summaryHTML);
				_app.controllers.application.attachEvents($('#shippingMethods'));
			}
        };
        
        return _this;
    }());

})();