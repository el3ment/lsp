(function(){
    
    var _util = window.LSP.utilities;
    
    var product = function(){
        var _this = {};
        var _app = window.LSP;
        var _assets = _app.assets;
        var _api = _app.models.api;
        
        _this =  {
            events : {
                application : {
                    onReady : function(e, data){
                    	
                    	// For Testing Only
                    	$.when(_this.getSpecifications('2217')).done(function(response){
                    		var tableHTML = _util.parseMicroTemplate('templates-specifications-table', _util.tablify(response.response.data));
                    		var specsTable = $('#templates-specifications-table').replaceWith(tableHTML);
							_app.controllers.application.attachEvents(specsTable);
                    	});
                    	
                    	// For Testing Only
                    	$.when(_this.getMatrixOptions(34103))
                    	.done(function(response){
                    		$('#testOnly-inventoryOptionsTest').html(JSON.stringify(response.response.data));
                    	});
                    	
                    },
                    onInit : function(e, data){}
                }
            },
            
            assets : {},
            
            // Returns product specs
            getSpecifications : function(id){
            	 return _api.request(_this, 'getSpecifications', 'getSpecifications', {id : id});
            },
            
            // Returns an object of options
            getMatrixOptions : function(matrixParentId){
            	return _api.request(_this, 'get', 'getMatrixOptions', {parentId : matrixParentId});
            }
        };
        
        return _this;
    }();
    
    _util.register('controller', 'product', product);

})();