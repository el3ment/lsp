(function(){


define(['utilities/global', 'controllers/application', 'models/api'], function(){


	var _util = window.LSP.utilities;
	var _models = window.LSP.models;
	_util.register('model', 'netsuite', (function(){

		var _this = $.extend({}, _models.api);

	return $.extend(_this, {
			_url : function(controller, payload){
				var url = 'https://forms.netsuite.com/app/site/hosting/scriptlet.nl';
				url = (payload.method.match('getUPS') ? 'https://d2bghjaa5qmp6f.cloudfront.net/shipping/' + payload.method : url);
				
				return url;
			},
			_payload : function(controller, payload){
				return $.extend(payload.data, {
					method : payload.method,
					deploy : '1',
					script : '25',
					h : '55cda7fb2a0d8a937f00',
					compid : '665798'
				});
			},
			request : function(controller, eventName, method, data){
				return this._request('GET', 'jsonp', controller, eventName, {data : data, method : method});

			}
		});

	}()));
	
});

}());