(function(){
	
	var _util = window.LSP.utilities;
	
	var listEncoder = function(controllerName, assetName, config){
		var _this = {};
		var _app = window.LSP;
		var _util = _app.utilities;
		var _settings = {
				itemSeperator : '/',
				propertySeperator : '-'
			};
		
		_this =  {
			name : 'listEncoder',
			// Encode quantity, and id in base64, stringify them by using unique seperators
			// decode them by spliting it up, and re-encoding to base 10;
			// Used for quantity / itemid's
			decode : function(encodedContents){
				if(encodedContents){
					var items = encodedContents.split(_settings.itemSeperator);
					var contents = [];
					
					for(var i = 0; i < items.length; i++){
						var item = items[i].split(_settings.propertySeperator);
						contents.push({quantity : _util.base64.decode(item[0]), id : _util.base64.decode(item[1])});
					}
					
					return contents;
				}
				return false;
			},
			encode : function(contents){
				var encodedUnits = [];
				for(var i = 0; i < contents.length; i++){
					encodedUnits.push(_util.base64.encode(contents[i].quantity) + _settings.propertySeperator + _util.base64.encode(contents[i].id));
				}
				return encodedUnits.join(_settings.itemSeperator);
			}
		};
		
		return _this;
	};
	
	_util.register('asset', 'listEncoder', listEncoder);
	
})(); 