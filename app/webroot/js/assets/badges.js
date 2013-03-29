(function(){
    
    var _util = window.LSP.utilities;
    
    var badges = function(controllerName, assetName, config){
        var _parentAsset = {};
        var _lsp = window.LSP;
        
        _parentAsset =  {
        	name : 'badges',
            events : {
                application : {
                    onAttachEvents : function(e, data){
                        $('div.badges-productImage[data-badge]:not(:has(div.badge))', data.selector)
                            .append(_parentAsset.makeElement);
                    }
                }
            },
            assets : {},
            makeElement : function(index, elementString){
                return '<div class="badges-badge badge-'+$(this).data('badge')+'"></div>';
            }
        };

        return _parentAsset;
    };
    
    _util.register('asset', 'badges', badges);
    
})();