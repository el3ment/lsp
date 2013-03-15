$.when(
    //window.marengo.utilities.require('models/api.js', 'model', 'api', true)
).done(function(){
    
    // Convience variables
    var _marengo = window.marengo;
    var _util = _marengo.utilities;
    var _parentController = {}; // Allows us to reference this controller easily

    _parentController = {
        events : {
            self : {
                onInit : function(event, data){
                    console.log('hey!');   
                },
                onReady : function(event, data){
                    console.log('ready!');   
                }
            }
        },
        assets : {}
    };
        
    _marengo.utilities.register('controller', 'entriesAll', _parentController);
    
}); // end of controller / deferment