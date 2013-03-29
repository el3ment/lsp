(function(){
    
    var _util = window.LSP.utilities;
    
    var compare = function(){
        var _parentController = {};
        var _lsp = window.LSP;
        var _assets = _lsp.assets;
        var _api = _lsp.models.lspapi;
        var _requestedItemIds = [];
        
        _parentController =  {
            events : {
                application : {
                    onReady : function(e, data){
                    	if(_requestedItemIds.length > 0){
	                    	$.when(_parentController.getItems(_requestedItemIds)).done(function(response){
	                    		var sortedData = _parentController.sort(response.response.data);
	                    		var tableHTML = _util.parseMicroTemplate('templates-compare-table', _parentController.diff(_util.tablify(sortedData)));
	                    		$('#templates-compare-table').replaceWith(tableHTML);
	                    	});
                    	}// else there is no 'ids' parameter
                    },
                    onInit : function(e, data){
                    	var urlParameters = _util.getURLParameters();
                    	try{
                    		_requestedItemIds = JSON.parse(urlParameters.ids);
                    	}catch(e){ }
                    }
                }
            },
            assets : {},
            getItems : function(ids){
            	ids = (typeof ids === 'string' ? [ids] : ids);
            	return _api.request(_parentController, 'getItems', 'getItems', {ids : JSON.stringify(ids)});
            },
            sort : function(responseData){
            	// Put things in the order they were requested in
            	responseData.sort(function(x, y){
            		return $.inArray(parseInt(x._internalid.value), _requestedItemIds) > $.inArray(parseInt(y._internalid.value), _requestedItemIds) ;
            	});
            	return responseData;
            },
            diff : function(tabledData){
            	for(var attribute in tabledData){
            		var similar = true;
            		for(var i = 1; i < tabledData[attribute].length; i++){
            			if(attribute.charAt(0) !== '_'){
	            			var valueOne = (((tabledData[attribute][i-1] || {}).value ? (tabledData[attribute][i-1] || {}).value : tabledData[attribute][i-1]) || '');
	            			var valueTwo = (((tabledData[attribute][i] || {}).value ? (tabledData[attribute][i] || {}).value : tabledData[attribute][i]) || '');
	            			// Turn similar false if they don't equal each other (the && similar keeps it from overwriting false to true)
	            			similar = (valueOne === valueTwo && similar);
            			}else{
            				similar = null; // private fields are neither similar nor different
            			}
            		}
            			
            		tabledData[attribute] = {similar : similar, cells : tabledData[attribute]};
            	}
            	
            	return tabledData;
            }
        };
        
        return _parentController;
    }();
    
    _util.register('controller', 'compare', compare);

})();