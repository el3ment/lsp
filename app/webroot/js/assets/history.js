(function(){
    
    var _util = window.LSP.utilities;
    
    var history = function(controllerName, assetName, config){
        var _parentAsset = {};
        var _lsp = window.LSP;
        
        _parentAsset =  {
        	name : 'history',
            events : {
                application : {
                    onAttachEvents : function(e, data){
                        $('#testOnly-previouslyViewedTest', data.selector).html(JSON.stringify(_parentAsset.getProductHistory()));
                    },
                    onReady : function(e, data){
                        $('*[data-pagetype="product"]:first').each(function(){
                            _parentAsset.addProductToHistory(document.location.href, _parentAsset.readProductDataFromPage($(document.html)));
                        });   
                    }
                }
            },
            assets : {},
            getProductHistory : function(){
                 return $.parseJSON($.cookie('productHistory'));
            },
            
            readProductDataFromPage : function(selector){
                  return $('*[data-pagetype="product"][data-id]:first').data();
            },
            
            addProductToHistory : function(url, productData){
                
                var productHistory = _parentAsset.getProductHistory() || [];
                
                //If you refresh the page, don't make a new entry
                if(((productHistory[productHistory.length - 1] || {}).product || {}).id == productData.id){
                    // Update the timestamp to reflect most recent visit for a duplicated
                    // history entry
                    productHistory[productHistory.length - 1].timestamp = +new Date();
                }else{
                    productHistory.push({
                    product : productData,
                    url : url,
                    timestamp : +new Date()});
                }
                
                $.cookie('productHistory', JSON.stringify(productHistory), { expires : 30 });
            }
        };

        return _parentAsset;
    };
    
    _util.register('asset', 'history', history);
    
})();