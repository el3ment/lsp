(function(){
    
    var _util = window.LSP.utilities;
    
    var account = function(){
        var _parentController = {};
        var _lsp = window.LSP;
        var _assets = _lsp.assets;
        
        _parentController =  {
            events : {
                application : {
                    onReady : function(e, data){},
                    onInit : function(e, data){}
                }
            },
            assets : {
            	trackOrder : _assets.trackOrder(_parentController, 'trackOrder')
            }
        };
        
        return _parentController;
    }();
    
    _util.register('controller', 'account', account);

})();