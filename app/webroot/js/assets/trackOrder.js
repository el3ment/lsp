(function(){
    
    var _util = window.LSP.utilities;
    
    var trackOrder = function(controllerName, assetName, config){
        var _parentAsset = {};
        var _lsp = window.LSP;
        var _api = _lsp.models.lspapi;
        var _settings = {
        	bodyNoTrackingNumbersFoundClass : 'trackOrder-noTrackingNumbersFound',
        	trackingNumberSelector : '.testOnly-trackingNumbers'
        };
        
        _parentAsset = {
        	name : 'trackOrder',
            events : {
                application : {
                    onAttachEvents : function(e, data){
                        $('form#trackOrder-inputForm').bind('submit', function(e){
                            e.preventDefault();
                            return false;
                        }).bind('afterValidation', function(e){
                        	_parentAsset.submit(_util.formToObject(this, null, false));
                        });
                    }
                }
            },
            assets : {},
            submit : function(formObject){
                if(formObject.search.substr(0, 2).toUpperCase() == '1Z'){
                    _parentAsset.redirectToUPS(formObject.search);
                }else{
                    // Probably a Sales Order
                	_parentAsset.clearTrackingNumbers();
                    $.when(_parentAsset.requestTrackingNumber(formObject.search, formObject.emailAddress))
                    .done(function(response){
                    	_parentAsset.getTrackingData(((response.response.data || {}).trackingnumbers || "").toUpperCase());
                    });
                }
            },
            
            getTrackingData : function(trackingNumbers){
            	if(trackingNumbers.length !== 0){
            		var trackingNumbersArray = trackingNumbers.split(' ');
            		for(var i = 0; i < trackingNumbersArray.length; i++){
            			$.when(_parentAsset.requestTrackingData(trackingNumbersArray[i]))
            			.done(function(response){
            				_parentAsset.displayTrackingData(response.response.data);
            			}).fail(function(response){
            				$('body').addClass(_settings.bodyNoTrackingNumbersFoundClass);
            			});
            		}
            	}else{
            		$('body').addClass(_settings.bodyNoTrackingNumbersFoundClass);
            	}
            },
            
            clearTrackingNumbers : function(){
            	$(_settings.trackingNumberSelector).html('');
            	$('body').removeClass(_settings.bodyNoTrackingNumbersFoundClass);
            },
            
            displayTrackingData : function(trackingData){
            	console.log(trackingData);
            	$(_settings.trackingNumberSelector).append(JSON.stringify(trackingData));
            },
            
            requestTrackingNumber : function(salesOrderNumber, emailAddress){
                return _api.request(_parentAsset, 'getTrackingNumber', 'getTrackingNumber', {salesOrderNumber : salesOrderNumber.replace(/[^0-9]+/, ''), emailAddress : $.trim(emailAddress)});
            },
            
            requestTrackingData : function(trackingNumber){
            	return _api.request(_parentAsset, 'getUPSTrackingData', 'getUPSTrackingData', {trackingNumber : trackingNumber});
            }
        };

        return _parentAsset;
    };
    
    _util.register('asset', 'trackOrder', trackOrder);
    
})();