
// This is basically a singleton, it's accessable at LSP.controllers.suggestions

(function(){
    
    var _util = window.LSP.utilities;
    
    _util.register('controller', 'suggestions', function(){
		
		// These are private properties
        var _this = {};
        var _lsp = window.LSP;
		
		// These are public         
        _this =  {
        	name : 'suggestions',
            events : {
                application : {

                    onAttachEvents : function(e, data){
                        
						// Find anything that should be a dynamic scroller, and do the deed
						
						// Note! We'll eventually be handling multiple instances on a page - and
						// this object is a giant singleton. You might need to create an array called cache
						// or list or something up around like 10 or 11 and push instances to it.

						$('.touchcarousel').touchCarousel({			
							itemsPerMove: 6,
							pagingNav: true,
							scrollbar: false,				
							scrollToLast: true,
							loopItems: true				
						});

						
                    }
                }
            },
            assets : {},
			
			controllerFunction : function(myArgument){
				
				// These functions should be indepenent and work much like any
				// controller function works in another MVC framework.
				
				// Generally, the argument should be human understandable, like 
				// "id" or "element" -- if you need a callback to respond to an event
				// like "onAfterTriggerNextPage" which passes a wierd event object you probably
				// want to use an anonomus function as the callback, and then call your controller
				// function using the parts of the event object you needed.
				
				// Use extra explicit comments as you build this out, only becuase I'm going to have to pass through this
				// when I actually integrate it with the EasyAsk datasource.


				
			}
			
        };

        return _this;
    }());
	
})();