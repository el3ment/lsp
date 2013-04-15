var _api = {}; // This allows other API methods to call one another
_api = {
	
	 /*

		Put your methods you want to be able to call  as members 
	 	the _api object here.
		these will corrospond to 'method' argument in the 
		_api.request() call in /models/cart.js client side

		for example....

		getTrackingNumber : function(requestParameters){
	 		return [123, 4141];
	 	},

		getMatrixOptions : function(requestParameters){ },

		yourCustomMethods : function(requestParameters){ },

		anotherCustomMethod : function(requestParameters){ }
	
		This basically helps to unify the request and response formats.
	 	and because they are unified, we can be more robust on the client
	 	side.. every api request is a deferred object, etc..
	 
	 
	 	This file will be a RESTlet in NetSuite.. you'll write
	 	any requests you need to make to handle things like
	 	
		saveShippingData
	 	saveBillingData
	 	(or maybe just saveOrderDetails that does both)
	 	getShippingMethods
	 	etc..
	 
	 	The customcheckout netsuite code is a HUGE mess but it's accessable
	 	I'm hoping we can just pull out what stuff we use and add it here
	 	rather than trying to re-wire the netsuite referencecart api
	
	*/
	
	
};

function parseRequest(request, response){
	var requestParameters = _util.getRequestParameters(request);
	var responseData = _api[requestParameters.method](requestParameters);
	var returnData = {};
	
	if(responseData !== false){
		returnData.success = true;
		returnData.data = responseData;
	}else{
		returnData.success = false;
	}
	
	response.write(JSON.stringify(returnData));
	
	return;
}
