(function(){
	
	var _util = window.LSP.utilities;
	
	var api = (function(){
		var _this = {};
		var _app = window.LSP;
		
		_this =  {
			events : {},
			assets : {},
			buildRequestURL : function(method){
				var url = 'https://system.sandbox.netsuite.com/app/site/hosting/scriptlet.nl';
				url = (method.match('getUPS') ? 'http://static.lonestarpercussion.com/shipping/'+method : url);
				
				return url;
			},
			request : function(controller, eventName, method, data){
				
			// https://system.sandbox.netsuite.com/app/site/hosting/scriptlet.nl?script=customscript_api
			// &deploy=customdeploy_api&method=getTrackingNumber&salesOrderNumber=1234
				var result = $.Deferred();
				var eventData = {};
				eventData.xhrData = {
					type: 'GET',
					url: _this.buildRequestURL(method),
					data: {
						method : method,
						deploy : 'customdeploy_api',
						script : 'customscript_api'
						//random : Math.floor(Math.random() * 10000) // For Caching
					}
				};
				for(var key in data){
					if(data.hasOwnProperty(key)){ eventData.xhrData.data[key] = data[key]; } 
				} // Merge objects
				
				$('body').addClass(controller.name + '-downloadWaiting');
				$('body').removeClass(controller.name + '-downloadSuccess'); // In case we are resubmitting
				$('body').removeClass(controller.name + '-downloadFailure'); // In case we are resubmitting
				console.log('API Request Sent to ' + method, eventData.xhrData);
				$.ajax(eventData.xhrData).done(function(responseData){
					 
					eventData.serverResponse = responseData; // raw response needs a differnt property name
					try{
						eventData.response = $.parseJSON(responseData);
					}catch(e){
						eventData.response = responseData;
					}	

					if(typeof (eventData.response || {}).success !== 'undefined' || (eventData.response || {}).success === true){
						result.resolve(eventData);
					}else{
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
					console.log('API Response Recieved from ' + method, eventData);
				});
				
				
				// By seperating the logic like this -- it allows us to "fail" a success HTTP response (see the .done() method above)
				$.when(result).done(function(responseData){
					
					// Fire onAfterMethodSuccess event
					// Fire mb.controllers.application's onAfterAPICallSuccess
					$(_app.controllers.application).triggerHandler('onAfterAPICallSuccess', responseData);
					$(controller).triggerHandler(_util.camelCase('on-after-API-'+eventName+'-success'), responseData);
					$('body').addClass(controller.name + '-downloadSuccess');
					
				}).fail(function(responseData){
					
					// Fire onAfterMethodFailure event
					// Fire mb.controllers.application's onAfterAPICallFailure
					$(_app.controllers.application).triggerHandler('onAfterAPICallFailure', responseData);
					$(controller).triggerHandler(_util.camelCase('on-after-API-'+eventName+'-failure'), responseData);
					$('body').addClass(controller.name + '-downloadFailure');
					
				}).always(function(responseData){
					
					$(_app.controllers.application).triggerHandler('onAfterAPICall', responseData);
					$(controller).triggerHandler(_util.camelCase('on-after-API-'+eventName), responseData);
					$('body').removeClass(controller.name + '-downloadWaiting');
					
				});

				return result.promise();
			}
		};

		return _this;
	}());
	
	_util.register('model', 'api', api);
	
})();