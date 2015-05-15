(function(){

define(['utilities/global', 'models/netsuite', 'controllers/application'], function(){

	var _util = window.LSP.utilities;
	
	var shipping = (function(){
		var _this = {};
		var _app = window.LSP;
		var _api = _app.models.netsuite;
		var _settings = {
			bodyNoTrackingNumbersFoundClass : 'shipping-noTrackingNumbersFound',
			trackingNumberSelector : '.testOnly-trackingNumbers'
		};
		
		_this = {
			name : 'shipping',
			events : {
				application : {
					onAttachEvents : function(e, data){
						$('#search-orders-form', data.selector).bind('submit', function(e){
							_this.handleSubmit({
								orderNumber : $('.page-trackOrder input[name="orderNumber"]').val() || '',
								billingZip : $('.page-trackOrder input[name="billingZip"]').val() || ''
							});
							e.preventDefault();
							return false;
						});
					}
				}
			},
			assets : {},
			handleSubmit : function(formObject){
				// if(formObject.search.substr(0, 2).toUpperCase() === '1Z'){
				// 	_this.redirectToUPS(formObject.search);
				// }else{
					// Probably a Sales Order
					//_this.clearTrackingNumbers();
					$('#responseTable').addClass('loading');
					$('#responseTable table').hide();
					$.when(_this.requestTrackingNumber(formObject.orderNumber, formObject.billingZip))
					.done(function(response){
						_this.renderTrackingData(_this.parseAPIResponse(response.response.data));
						//_this.getTrackingData(((response.response.data || {}).trackingnumbers || '').toUpperCase());
					}).fail(function(response){
						$('#responseTable').html($('#templates-trackOrder-error').html());
					}).always(function(){
						$('#responseTable').removeClass('loading');
					});
				//}
			},

			renderTrackingData : function(renderObject){
				var html = _util.parseMicroTemplate('templates-trackingResponse', renderObject);
				$('#responseTable').html(html);
			},

			parseAPIResponse : function(rawResponse){

				var trackingNumbersArray = rawResponse.trackingnumbers.split('<BR>');
				var parsedResponse = [];

				for(var i = 0; i < trackingNumbersArray.length; i++){
					
					var carrier = _this.getCarrierFromTrackingNumber(trackingNumbersArray[i]);

					parsedResponse.push({
						orderId : rawResponse.internalid.value,
						orderDate : rawResponse.trandate,
						orderNumber : rawResponse.number,
						orderEmail : rawResponse.email,
						trackingNumber : trackingNumbersArray[i],
						trackingUrl : (carrier == 'ups' ? 
							'http://wwwapps.ups.com/ietracking/tracking.cgi?tracknum=' +  trackingNumbersArray[i] :
							'https://tools.usps.com/go/TrackConfirmAction.action?tLabels=' + trackingNumbersArray[i]), 
						carrier : carrier
					});
				}
				
				return parsedResponse;
			
			},

			getCarrierFromTrackingNumber : function(trackingNumber){

				if(trackingNumber.substr(0, 2).toUpperCase() == '1Z')
					return 'ups';
				else
					return 'usps';

			},
			
			// getTrackingData : function(trackingNumbers){
			// 	if(trackingNumbers.length !== 0){


			// 		var trackingNumbersArray = trackingNumbers.split(' ');
			// 		for(var i = 0; i < trackingNumbersArray.length; i++){


			// 			if(_this.isUPSTrackingNumber(trackingNumbersArray[i]))
			// 				// handle ups
			// 			if(_this.isUSPSTrackingNumber(trackingNumbersArray[i]))
			// 				// handle usps

			// 			$.when(_this.requestUPSTrackingData(trackingNumbersArray[i]))
			// 			.done(function(response){
			// 				_this.displayTrackingData(response.response.data);
			// 			}).fail(function(response){
			// 				$('body').addClass(_settings.bodyNoTrackingNumbersFoundClass);
			// 			});
			// 		}



			// 	}else{
			// 		$('body').addClass(_settings.bodyNoTrackingNumbersFoundClass);
			// 	}
			// },
			
			// clearTrackingNumbers : function(){
			// 	$(_settings.trackingNumberSelector).html('');
			// 	$('body').removeClass(_settings.bodyNoTrackingNumbersFoundClass);
			// },
			
			// displayTrackingData : function(trackingData){
			// 	console.log(trackingData);
			// 	$(_settings.trackingNumberSelector).append(JSON.stringify(trackingData));
			// },
			
			requestTrackingNumber : function(number, zip){
				return _api.request(_this, 'getTrackingNumber', 'getTrackingNumber', {orderNumber : $.trim(number), billingZip : $.trim(zip)});
			},
			
			// requestUPSTrackingData : function(trackingNumber){
			// 	return _api.request(_this, 'getUPSTrackingData', 'getUPSTrackingData', {trackingNumber : trackingNumber});
			// }
		};

		return _this;
	})();
	
	_util.register('controller', 'shipping', shipping);

});
	
})();