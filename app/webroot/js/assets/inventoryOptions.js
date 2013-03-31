(function(){
    
    var _util = window.LSP.utilities;
    
    var inventoryOptions = function(controllerName, assetName, config){
        var _this = {};
        var _lsp = window.LSP;
        var _api = _lsp.models.lspapi;
        
        _this =  {
        	name : 'inventoryOptions',
            events : {
                application : {
                    onAttachEvents : function(e, data){
                    },
                    onReady : function(e, data){
                    	$.when(_this.getMatrixOptions(34103))
                    	.done(function(response){
                    		$('#testOnly-inventoryOptionsTest').html(JSON.stringify(response.response.data));
                    	});
                    }
                }
            },
            assets : {},
            getMatrixOptions : function(matrixParentId){
            	return _api.request(_this, 'get', 'getMatrixOptions', {parentId : matrixParentId});
            }
        };

        return _this;
    };
    
    _util.register('asset', 'inventoryOptions', inventoryOptions);
    
})();