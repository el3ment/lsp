(function(){
    
    var _util = window.LSP.utilities;
    
    var reveal = function(){
        var _this = {};
        var _lsp = window.LSP;
        
        _this =  {
        	name : 'reveal',
            events : {
                application : {
                    onAttachEvents : function(e, data){
                        $('*[data-reveal-children]', data.selector).bind('click', function(e){
                        	_this.toggleClick(this, $(_this.buildChildrenSelector(this)));
                        	e.stopPropagation();
                        	return false;
                        }).bind('mouseover', function(e){
                        	_this.onMouseover(this, $(_this.buildChildrenSelector(this)));
                        }).bind('mouseout', function(e){
                        	_this.onMouseout(this, $(_this.buildChildrenSelector(this)));
                        }).each(function(index, element){
                        	$(_this.buildChildrenSelector(this)).addClass('reveal-child');
                        }).addClass('reveal-parent');
                    }
                }
            },
            assets : {},
            buildChildrenSelector : function(element){
            	return '#' + $(element).data('reveal-children').split(' ').join(', #');
            },
            onMouseover : function(revealParent, revealChildren){
            	$(revealParent).addClass('reveal-onMouseover');
            	$(revealChildren).addClass('reveal-onMouseover');
            },
            onMouseout : function(revealParent, revealChildren){
            	$(revealParent).removeClass('reveal-onMouseover');
            	$(revealChildren).removeClass('reveal-onMouseover');
            },
            toggleClick : function(revealParent, revealChildren){
            	
            	var parent = $(revealParent);
            	var children = $(revealChildren);
            	
	            if(!parent.hasClass('reveal-onClick')){
	            	parent.addClass('reveal-onClick');
	            	children.addClass('reveal-onClick');
	            	children.triggerHandler('expand.reveal');
	            }else{
	            	parent.removeClass('reveal-onClick');
	            	children.removeClass('reveal-onClick');
	            	children.triggerHandler('close.reveal');
	            }
            }
        };

        return _this;
    }();
    
    _util.register('controller', 'reveal', reveal);
    
})();