(function(){
    
    var _util = window.LSP.utilities;
    
    var inventoryOptions = function(controllerName, assetName, config){
        var _parentAsset = {};
        var _lsp = window.LSP;
        var _api = _lsp.models.lspapi;
        
        _parentAsset =  {
        	name : 'inventoryOptions',
            events : {
                application : {
                    onAttachEvents : function(e, data){
                    },
                    onReady : function(e, data){
                    	$.when(_parentAsset.getMatrixOptions(34103))
                    	.done(function(response){
                    		$('#testOnly-inventoryOptionsTest').html(JSON.stringify(response.response.data));
                    	});
                    }
                }
            },
            assets : {},
            getMatrixOptions : function(matrixParentId){
            	return _api.request(_parentAsset, 'get', 'getMatrixOptions', {parentId : matrixParentId});
            }
        };

        return _parentAsset;
    };
    
    _util.register('asset', 'inventoryOptions', inventoryOptions);
    
})();