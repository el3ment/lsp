(function(){
	
	var _util = window.LSP.utilities;
	
	var account = (function(){
		var _this = {};
		var _app = window.LSP;
		var _assets = _app.assets;
		
		_this = {
			
			events : {
				application : {
					onReady : function(e, data){},
					onInit : function(e, data){}
				}
			},
			
			assets : {},
			
			getCurrentCustomerId : function(){
				return 8989;
			}
		};
		
		return _this;
	})();
	
	_util.register('controller', 'account', account);

})();