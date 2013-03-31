(function(){
    
    var _util = window.LSP.utilities;
    
    var validation = function(){
        var _this = {};
        var _lsp = window.LSP;
        var _api = _lsp.models.lspapi;
        var _settings = {
        	validationInputs : '*[class*="validation-"]:input'	
        };
        var _patterns = {
        	required : {
        		defaultMessage : 'This field is required',
        		pattern : /^.+$/
        	},
        	alphaOnly : {
        		defaultMessage : 'Letters only',
        		pattern : /^[A-Za-z]*$/
        	},
        	numericOnly : {
        		defaultMessage : 'Numbers only',
        		pattern : /^[0-9]*$/
        	},
        	alphaNumeric : {
        		defaultMessage : 'Numbers, letters, and spaces only',
        		pattern : /[A-Za-z ]*/
        	},
        	emailAddress : {
        		defaultMessage : 'This dosen\'t look like an email address',
        		pattern : /^[a-zA-Z0-9_\-\.]{2,}@[a-zA-Z0-9_\-\.]{2,}\.[a-zA-Z]{2,}$/
        	},
        	creditCardNumber : {
        		defaultMessage : 'Invalid credit card number',
        		pattern : /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/
        	}
        };
        
        _this =  {
        	name : 'validation',
            events : {
                application : {
                    onAttachEvents : function(e, data){
             
                    	$(_settings.validationInputs, data.selector).each(function(index, element){
            				$(element).bind('keyup', function(e){
                				_this.validate(element);
            				});
            				_this.validate(element); // Not sure if we want to validate on page load or not yet.
                    	});
                    	
                    	$('form', data.selector).bind('submit', function(e){
                    		var stop = false;
                    		var inputs = $(_settings.validationInputs, this);
                    		for(var i = 0; i < inputs.length; i++){
                    			if(!_this.validate(inputs[i])){
                    				stop = true;
                    			}
                    		}
                    		
                    		if(stop){
                    			e.preventDefault();
                        		return false;
                    		}
                    		
                    		$(this).triggerHandler('afterValidation');
                    		return true;
                    	
                    	});
                    }
                }
            },
            assets : {},
            
            getValidationMessage : function(element, validationType){
            	var elementMessage = $(element).data('validation-message-'+validationType);
            	var defaultMessage = _patterns[validationType].defaultMessage;
            	
            	return (elementMessage ? elementMessage : defaultMessage);
            },
            
            // Parse, then display any validating messages
            validate : function(element){
            	var invalidTypes = _this.parseInvalid($(element).val(), $(element).attr('class').split(/\s+/));
            	if(invalidTypes.length > 0){
            		_this.displayInvalid(element, invalidTypes);
            		return false;
            	}
            	
            	_this.displayValid(element);
            	return true;
            },
            
            // Create the list of invalid types
            parseInvalid : function(value, validationTypes){
            	var invalidTypes = [];
            	
            	for(var i = 0; i < validationTypes.length; i++){
            		
            		var validationType = validationTypes[i].replace('validation-', '');
            		// Unless it's required, allow a empty string to validate
            		if(_patterns[validationType]){
	            		if(!value.match(_patterns[validationType].pattern) && ((value !== "" && validationType !== 'required') || validationType === 'required')){
	            			invalidTypes.push(validationType);
	            		}
            		}
            	}
            	
            	return invalidTypes;
            },
            
            displayInvalid : function(element, invalidTypes){
            	
            	$(element).removeClass('validation-valid');
            	$(element).addClass('validation-invalid');
            	
            	for(var i = 0; i < invalidTypes.length; i++){
            		console.log(_this.getValidationMessage(element, invalidTypes[i]));
            	}
            },
            displayValid : function(element){
            	console.log('This is valid!');
            	$(element).removeClass('validation-invalid');
            	$(element).addClass('validation-valid');
            }
        };

        return _this;
    }();
    
    _util.register('controller', 'validation', validation);
    
})();