(function(){

	var _util = window.LSP.utilities;
	var _models = window.LSP.models;
	
	_util.register('model', 'easyask', (function(){

		var _dictionary = 'nslonestarpercussion';
		//var _dictionary = 'EcomDemo';
		//var _hostname = 'http://easyaskqa.easyaskondemand.com';
		var _hostname = 'http://gooasdfadfsd.com';
		
		var _this = $.extend({}, _models.api);

		var _sessionId;

		// Extends the generic API
		return $.extend(_this, {
			_url : function(controller, payload){
				return _hostname + '/EasyAsk/apps/Advisor.jsp';
			},
			_payload : function(controller, payload){
				return $.extend({
					currentpage : controller.getCurrentPage(),
					forcepage : 1,
					ResultsPerPage : controller.getResultsPerPage(),
					defsortcols : (controller.getSort() === '-default-' ? '' : controller.getSort()),
					CatPath : (payload.path ? [controller.getPath(), payload.path].join('////') : controller.getPath()),
					indexed : 1, 
					rootprods : 1,
					oneshot : 0,
					sessionID : _sessionId,
					defarrangeby : '///NONE///',
					disp : 'json',
					dct : _dictionary
				}, payload);
			},
			_isSuccess : function(responseData){
				return (responseData || {}).returnCode === 0;
			},
			_afterSuccess : function(responseData){
				_sessionId = responseData.sessionID;
				
				responseData.source.navPath._lsp = responseData.source.navPath._lsp || {};
				responseData.source.navPath._lsp.categoryNodes = _this.getCategoryNodes(responseData.source);

				return responseData;
			},

			getCategoryNodes : function(easyAskDataSourceObject){
				
				var categoryNodes = [];

				for(var i = 0; i < easyAskDataSourceObject.navPath.navPathNodeList.length; i++){
					if(easyAskDataSourceObject.navPath.navPathNodeList[i].navNodePathType === 1){
						categoryNodes.push(easyAskDataSourceObject.navPath.navPathNodeList[i]);
					}
				}

				return categoryNodes;

			}
		});

	}()));
	
}())


