(function(){
    
    var _util = window.LSP.utilities;
    
    var zoom = function(controllerName, assetName, config){
        var _parentAsset = {};
        var _lsp = window.LSP;
        
        _parentAsset =  {
        	name : 'zoom',
            events : {
                application : {
                    onAttachEvents : function(e, data){
                        var images = $('a[data-asset=mouseoverZoom]', data.selector);
                        images.jqzoom({
                            zoomWidth: 500,
                            zoomHeight: 500,
                            position: 'right',
                            preloadImages: true,
                            zoomType: 'standard',
                            showEffect: 'fadein',
                            fadeinSpeed: 'fast'
                        });
                    }
                }
            },
            assets : {}
        };
        
        return _parentAsset;
    };
    
    _util.register('asset', 'zoom', zoom);
    
})();