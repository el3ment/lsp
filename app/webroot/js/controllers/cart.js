(function(){
    
    var _util = window.LSP.utilities;
    
    var cart = function(){
        var _parentController = {};
        var _lsp = window.LSP;
        var _assets = _lsp.assets;
        var _api = _lsp.models.lspapi;
        var _util = _lsp.utilities;
        var _cartContents = [{quantity : 2, id : 34103}, {id : 2217, quantity: 23}];
        
        _parentController =  {
            events : {
                application : {
                    onReady : function(e, data){
                    	console.error(_parentController.assets.listEncoder.encode(_cartContents));
                    	console.error(_parentController.assets.listEncoder.decode(_parentController.assets.listEncoder.encode(_cartContents)));
                    	
                    },
                    onInit : function(e, data){}
                }
            },
            assets : {
            	listEncoder : new _assets.listEncoder(_parentController, 'listEncoder')
            },
        };
        
        return _parentController;
    }();
    
    _util.register('controller', 'cart', cart);

})();