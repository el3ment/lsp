(function(){

	var _util = window.LSP.utilities;
	var _models = window.LSP.models;
	
	_util.register('model', 'netsuite', (function(){

		var _this = $.extend({}, _models.api);

		return $.extend(_this, {
			_url : function(controller, payload){
				var url = 'https://system.sandbox.netsuite.com/app/site/hosting/scriptlet.nl';
				url = (payload.method.match('getUPS') ? 'http://static.lonestarpercussion.com/shipping/' + payload.method : url);
				
				return url;
			},
			_payload : function(controller, payload){
				return $.extend(payload, {
					method : payload.method,
					deploy : 'customdeploy1',
					script : 'customscriptlspapi'
				});
			},
			request : function(controller, eventName, method, data){
				return this._request('GET', 'jsonp', controller, eventName, method, data);
			}
		});

	}()));
	

}())