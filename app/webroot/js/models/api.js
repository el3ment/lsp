(function(){
	
	var _app = window.LSP;
	var _util = _app.utilities;

	// This is a generic API model that can be extended to overwrite : 
	//      _url - returns the url for the service
	//      _payload - formats the payload as nessesary
	//      _isSuccess - often services will not use HTTP status codes to
	//                   return actual request success/failure - you can write custom
	//                   logic here that will 'fail' a successful query
	//
	// Use like : $.extend({ _url : function(payload){ console.log('custom code'); }, _app.models.api)

	_util.register('model', 'api', {
		
		_timeout : 15000,

		_url : function(payload){
			return '';
		},
		_payload : function(payload){
			return payload;
		},
		_isSuccess : function(responseData){
			return (responseData || {}).success === true;
		},
		_afterSuccess : function(responseData){
			return responseData;
		},
		_request : function(type, dataType, controller, eventName, payload, passthrough){
		
			var result = $.Deferred();
			var eventData = {};
			
			$.support.cors = true;

			eventData.xhrData = {
				type : type,
				url : this._url(controller, payload),
				data : this._payload(controller, payload),
				crossDomain : true,
				dataType : dataType,
				context : this,
				timeout : this._timeout,
				passthrough : $.extend({}, passthrough)
			};
			
			// TODO : use $.extend

			// for(var key in payload){
			// 	if(payload.hasOwnProperty(key)){ eventData.xhrData.data[key] = payload[key]; } 
			// } // Merge objects
			
			console.log('API Request Sent via ' + eventName, eventData.xhrData);
			
			$(_app.controllers.application).triggerHandler('onBeforeAPICall', eventData);
			$(controller).triggerHandler('onBeforeAPICall', eventData);
			$(controller).triggerHandler(_util.camelCase('on-Before-API-'+eventName+'-call'), eventData);
			
			$.ajax(eventData.xhrData).done(function(responseData){
				
				eventData.serverResponse = responseData; // raw response needs a differnt property name
				try{
					eventData.response = $.parseJSON(responseData);
				}catch(e){
					eventData.response = responseData;
				}   

				if(this._isSuccess(responseData)){
					eventData.response = this._afterSuccess(eventData.response);
					result.resolve(eventData);
				}else{
					eventData.error = 'invalidFormat';
					result.reject(eventData);
				}
				
			}).fail(function(responseData){

				// jQuery dosen't auto-parse JSON data for failures
				eventData.serverResponse = responseData; // raw response needs a differnt property name
				try{
					eventData.response = $.parseJSON(responseData.responseText);
				}catch(e){
					eventData.response = responseData;
				}
				
				result.reject(eventData);
				
			}).always(function(){
				console.log('API Response Recieved via ' + eventName, eventData);
			});


			// By seperating the logic like this -- it allows us to "fail" a success HTTP response (see the .done() method above)
			$.when(result).done(function(responseData){
				
				// Fire onAfterMethodSuccess event
				// Fire mb.controllers.application's onAfterAPICallSuccess
				$(_app.controllers.application).triggerHandler('onAfterAPICallSuccess', responseData);
				$(controller).triggerHandler('onAfterAPICallSuccess', responseData);
				$(controller).triggerHandler(_util.camelCase('on-after-API-'+eventName+'-success'), responseData);
				// $('body').addClass(controller.name + '-downloadSuccess');
				
			}).fail(function(responseData){
				
				// Fire onAfterMethodFailure event
				// Fire mb.controllers.application's onAfterAPICallFailure
				$(_app.controllers.application).triggerHandler('onAfterAPICallFailure', responseData);
				$(controller).triggerHandler('onAfterAPICallFailure', responseData);
				$(controller).triggerHandler(_util.camelCase('on-after-API-'+eventName+'-failure'), responseData);
				// $('body').addClass(controller.name + '-downloadFailure');
				
			}).always(function(responseData){
				
				$(_app.controllers.application).triggerHandler('onAfterAPICall', responseData);
				$(controller).triggerHandler('onAfterAPICall', responseData);
				$(controller).triggerHandler(_util.camelCase('on-after-API-'+eventName), responseData);
				// $('body').removeClass(controller.name + '-downloadWaiting');
				
			});

			return result.promise();
		},

		request : function(controller, eventName, method, data){
			return this._request('GET', 'jsonp', controller, eventName, method, data);
		}
	});
	
})();