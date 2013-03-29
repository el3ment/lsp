(function(){
    
    var _util = window.LSP.utilities;
    
    var product = function(){
        var _parentController = {};
        var _lsp = window.LSP;
        var _assets = _lsp.assets;
        var _api = _lsp.models.lspapi;
        
        _parentController =  {
            events : {
                application : {
                    onReady : function(e, data){
                    	$.when(_parentController.getSpecifications('2217')).done(function(response){
                    		var tableHTML = _util.parseMicroTemplate('templates-specifications-table', _util.tablify(response.response.data));
                    		$('#templates-specifications-table').replaceWith(tableHTML);
                    	});
                    },
                    onInit : function(e, data){}
                }
            },
            assets : {
            	inventoryOptions : _assets.inventoryOptions(_parentController, 'inventoryOptions'),
            	zoom : _assets.zoom(_parentController, 'zoom'),
            	reviews : _assets.reviews(_parentController, 'reviews')
            },
            getSpecifications : function(id){
            	 return _api.request(_parentController, 'getSpecifications', 'getSpecifications', {id : id});
            }
        };
        
        return _parentController;
    }();
    
    _util.register('controller', 'product', product);

})();