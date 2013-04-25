(function(){
    
    var _util = window.LSP.utilities;
    
    var badges = function(){
        var _this = {};
        var _lsp = window.LSP;
        
        _this =  {
        	name : 'badges',
            events : {
                application : {
                    onAttachEvents : function(e, data){
                        $('div[data-badge]:not(:has(div.badges-badge)), a[data-badge]:not(:has(div.badges-badge))', data.selector)
                            .append(_this.makeElement);
                    }
                }
            },
            assets : {},
            makeElement : function(index, elementString){
                return '<div class="badges-badge badge-'+$(this).data('badge')+'"></div>';
            }
        };

        return _this;
    }();
    
    _util.register('controller', 'badges', badges);
    
})();