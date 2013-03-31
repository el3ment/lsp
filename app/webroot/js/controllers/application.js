(function(){
    
    var _util = window.LSP.utilities;
    
    var application = function(){
        var _this = {};
        var _lsp = window.LSP;
        var _assets = _lsp.assets;
        
        _this =  {
            events : {
                application : {
                	onAttachEvents : function(e, data){
                        
                        // This is a helper event attacher, it looks for all
                        // buttons, and if they have data-controller, and data-action
                        // attributes, will call the appropriate event.
                        $('button, input', data.selector).each(function(){
                            var button = $(this);
                            var controller = button.data('controller');
                            var action = button.data('action');
                            var asset = button.data('asset');
                            
                            if(controller && action && !asset){
                                button.bind('click', function(e){  
                                    
                                    //console.log('Click registered');
                                    
                                    $(_lsp.controllers[controller]).
                                        triggerHandler(_util.camelCase('on-'+action), 
                                            {selector : button});
                                });
                            }else if(controller && action && asset){
                                button.bind('click', function(e){  
                                    $(_lsp.controllers[controller].assets[asset]).
                                        triggerHandler(_util.camelCase('on-'+action), 
                                            {selector : button});
                                });
                            }
                        });
                    },
                    onReady : function(e, data){
                        _util.attachEvents($('html'));
                        
                        
                        // Add pagetype to the body tag for CSS styling
                        $('body').data('pagetype', $('*[data-pagetype:first').data('pagetype'));
                    },
                    onInit : function(e, data){}
                }
            },
            assets : {
            	definitions : _assets.definitions(_this, 'definitions'),
            	history : _assets.history(_this, 'history'),
            	badges : _assets.badges(_this, 'badges'),
            	validation : _assets.validation(_this, 'validation'),
            	reveal : _assets.reveal(_this, 'reveal')
            },
            getCurrentCustomerId : function(){
            	return 8989;
            },
            init : function(){
                
                console.log('Application Init');
                
                var controller, subController, event, asset, controllerObj, subControllerObj;
                
                for (controller in _lsp.controllers) {
                    
                    controllerObj = _lsp.controllers[controller]; // Convience
                    
                    // Bind Events
                    // This binds all of the callbacks (eg. controller.events.onAfterLoginSuccess)
                    // to the event controller.onAfterLoginSuccess which is called by the API model object
                    for(subController in controllerObj.events){
                        
                        subControllerObj = _lsp.controllers[subController]; // Convience
                        
                            for(event in controllerObj.events[subController]){
                                if(event === 'assets'){
                                    for(asset in controllerObj.events[subController].assets){
                                        for(event in controllerObj.events[subController].assets[asset]){
                                            // Attach the event to the asset
                                            $(subControllerObj.assets[asset])
                                                .bind(event, controllerObj.events[subController].assets[asset][event]); 
                                        }
                                    }
                                }else{
                                // attach the event to the subcontroller
                                    $(subControllerObj)
                                        .bind(event, controllerObj.events[subController][event]);
                                }
                            }
                    }
                    // bind asset events to controllers
                    for(asset in controllerObj.assets){
                        for(subController in controllerObj.assets[asset].events){
                            
                            subControllerObj = _lsp.controllers[subController]; // Convience
                            
                            for(event in controllerObj.assets[asset].events[subController]){
                                if(subController === 'self'){
                                    // Assets will sometimes have their own events, like onSort, onClose, ect.
                                    // so we need to attach the default function to the asset event
                                    $(controllerObj.assets[asset])
                                        .bind(event, controllerObj.assets[asset].events[subController][event]);
                                }else{
                                    // Otherwise, the assets want to attach themselves
                                    // to the normal controller.onMethod events
                                    $(subControllerObj)
                                        .bind(event, controllerObj.assets[asset].events[subController][event]);
                                }
                            }
                        }
                    }
                    
                    // Call onInit/onReady events, the when().then() functions
                    // ensure that all of the onInit functions finish, before firing
                    $(controllerObj).triggerHandler('onInit');
                    $(controllerObj).triggerHandler('onLoaded');
                }
                
                $(document).ready(function(){ 
                    $(_this).triggerHandler('onReady');
                });
            }

        };
        
        return _this;
    }();
    
    _util.register('controller', 'application', application);
    window.LSP.controllers.application.init();

})();