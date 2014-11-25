(function(){
	
define(['utilities/global', 'controllers/application'], function(){

	var _util = window.LSP.utilities;
	
	var shipping = (function(){
		var _this = {};
		var _app = window.LSP;
		var _api = _app.models.api;
		var _settings = {
			bodyNoTrackingNumbersFoundClass : 'shipping-noTrackingNumbersFound',
			trackingNumberSelector : '.testOnly-trackingNumbers'
		};
		
		_this = {
			name : 'shipping',
			events : {
				application : {
					onAttachEvents : function(e, data){
						$('form#shipping-inputForm').bind('submit', function(e){
							e.preventDefault();
							return false;
						}).bind('afterValidation', function(e){
							_this.submit(_util.formToObject(this, null, false));
						});
					}
				}
			},
			assets : {},
			submit : function(formObject){
				if(formObject.search.substr(0, 2).toUpperCase() === '1Z'){
					_this.redirectToUPS(formObject.search);
				}else{
					// Probably a Sales Order
					_this.clearTrackingNumbers();
					$.when(_this.requestTrackingNumber(formObject.search, formObject.emailAddress))
					.done(function(response){
						_this.getTrackingData(((response.response.data || {}).trackingnumbers || '').toUpperCase());
					});
				}
			},
			
			getTrackingData : function(trackingNumbers){
				if(trackingNumbers.length !== 0){
					var trackingNumbersArray = trackingNumbers.split(' ');
					for(var i = 0; i < trackingNumbersArray.length; i++){
						$.when(_this.requestTrackingData(trackingNumbersArray[i]))
						.done(function(response){
							_this.displayTrackingData(response.response.data);
						}).fail(function(response){
							$('body').addClass(_settings.bodyNoTrackingNumbersFoundClass);
						});
					}
				}else{
					$('body').addClass(_settings.bodyNoTrackingNumbersFoundClass);
				}
			},
			
			clearTrackingNumbers : function(){
				$(_settings.trackingNumberSelector).html('');
				$('body').removeClass(_settings.bodyNoTrackingNumbersFoundClass);
			},
			
			displayTrackingData : function(trackingData){
				console.log(trackingData);
				$(_settings.trackingNumberSelector).append(JSON.stringify(trackingData));
			},
			
			requestTrackingNumber : function(salesOrderNumber, emailAddress){
				return _api.request(_this, 'getTrackingNumber', 'getTrackingNumber', {salesOrderNumber : salesOrderNumber.replace(/[^0-9]+/, ''), emailAddress : $.trim(emailAddress)});
			},
			
			requestTrackingData : function(trackingNumber){
				return _api.request(_this, 'getUPSTrackingData', 'getUPSTrackingData', {trackingNumber : trackingNumber});
			}
		};

		return _this;
	})();
	
	_util.register('controller', 'shipping', shipping);

});
	
})();