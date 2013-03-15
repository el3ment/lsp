$.when(
    //window.marengo.utilities.require('models/api.js', 'model', 'api', true)
).done(function(){
    
    // Convience variables
    var _marengo = window.marengo;
    var _util = _marengo.utilities;
    var _parentController = {}; // Allows us to reference this controller easily

    _parentController = {
            
            events : {
                application : {
                    // App Event, called when all controllers are initialized
                    onReady : function(e, data){ // Fired when all of the events
                                                 // attached and loaded
                        console.log('Controller Application is ready!');
                        _util.attachEvents($('html'));
                    },
                    
                    // App Event, called after all controllers are loaded
                    onInit : function(e, data){
                        console.log('Controller Application is initialized!');
                    },
                    
                    // Utility event, called when _utils.attachEvents() is called
                    onAttachEvents : function(e, data){
                        
                        // This is a helper event attacher, it looks for all
                        // buttons, and if they have data-controller, and data-action
                        // attributes, will call the appropriate event.
                        $('*[data-controller]', data.selector).each(function(){
                            var button = $(this);
                            var controller = button.data('controller');
                            var action = button.data('action');
                            var asset = button.data('asset');
                            
                            if(controller && action && !asset){
                                button.bind('click mouseup', function(e){  
                                    
                                    //console.log('Click registered');
                                    
                                    $(_marengo.controllers[controller]).
                                        triggerHandler(_util.camelCase('on-'+action), 
                                            {selector : button, originalEvent : e});
                                });
                            }else if(controller && action && asset){
                                button.bind('click', function(e){  
                                    $(_marengo.controllers[controller].assets[asset]).
                                        triggerHandler(_util.camelCase('on-'+action), 
                                            {selector : button, originalEvent : e});
                                });
                            }
                        });
                    },
                    onBeforeAPICall : function(e, data){
                        console.log('API '+data.xhrData.type+' Request to '+data.xhrData.url, data.requestData);  
                    },
                    // Generic API call events
                    onAfterAPICall : function(e, data){
                        console.log('API Response Recieved from '+data.xhrData.url, data.response);
                    },
                    onAfterAPICallFailure : function(e, data){
                        _parentController.alert('API Error', (((data || {}).response || {}).message ? ((data || {}).response || {}).message : ((data || {}).response || {}).statusText));    
                    },
                    
                    // Fired when controllers request page changes after html
                    // is injected
                    onPageReady : function(e, data){
                        //console.log('Page changed');
                    },
                
                    // Error events are handled at both the controller, and application controller levels
                    onError : function(e, data){},
                    onPageLoadFailError : function(e, data){}
                    // all other onErrorTypeError events
                }
            },
            assets : {
                templates : {
                    events : {
                        application : { }
                    },
                    files : { }
                },
            },
            
            // Other controllers use the onInit event. This is where we attach all the events.
            attachControllerEvents : function(controllerObj){ // Attaches events, and fires all the onReady events
 
                var subController, event, asset, subControllerObj;
                
                // Bind Events
                // This binds all of the callbacks (eg. controller.events.onAfterLoginSuccess)
                // to the event controller.onAfterLoginSuccess which is called by the API model object
                for(subController in controllerObj.events){
                    
                    subControllerObj = _marengo.controllers[subController];
                    
                    if(subController == 'self'){
                        subControllerObj = _marengo.controllers[controllerObj.name];// Convience
                    }
                
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
                        
                        subControllerObj = _marengo.controllers[subController]; // Convience
                        
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
                $.when($(controllerObj).triggerHandler('onInit'))
                .then(function(){ $(controllerObj).triggerHandler('onReady') });
            
            }
            
            
        };
        
    _marengo.utilities.register('controller', 'application', _parentController);
        
    _parentController.attachControllerEvents(_parentController);
    
}); // end of controller / deferment