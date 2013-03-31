(function(){
    
    var _util = window.LSP.utilities;
    
    var product = function(){
        var _this = {};
        var _lsp = window.LSP;
        var _assets = _lsp.assets;
        var _api = _lsp.models.lspapi;
        
        _this =  {
            events : {
                application : {
                    onReady : function(e, data){
                    	$.when(_this.getSpecifications('2217')).done(function(response){
                    		var tableHTML = _util.parseMicroTemplate('templates-specifications-table', _util.tablify(response.response.data));
                    		$('#templates-specifications-table').replaceWith(tableHTML);
                    	});
                    },
                    onInit : function(e, data){}
                }
            },
            assets : {
            	inventoryOptions : _assets.inventoryOptions(_this, 'inventoryOptions'),
            	zoom : _assets.zoom(_this, 'zoom'),
            	reviews : _assets.reviews(_this, 'reviews')
            },
            getSpecifications : function(id){
            	 return _api.request(_this, 'getSpecifications', 'getSpecifications', {id : id});
            }
        };
        
        return _this;
    }();
    
    _util.register('controller', 'product', product);

})();