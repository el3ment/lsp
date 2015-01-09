(function(){
	
define(['utilities/global', 'controllers/application'], function(){

	var _util = window.LSP.utilities;
	
	var validation = (function(){
		var _this = {};
		var _app = window.LSP;
		var _api = _app.models.api;
		var _settings = {
			validationInputs : '*[class*="validation-"]:input:not([disabled])'	
		};
		var _patterns = {
			required : {
				defaultMessage : 'This field is required',
				pattern : /^.+/
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
							$(element).off('validation').on('keyup.lsp.validation', function(e){
								if(e.which !== 9 && e.which !== 16 && e.which !== 13){
									_this.validate(element);
								}
								return true;
							});
							//_this.validate(element); // Not sure if we want to validate on page load or not yet.
						});
						
						$('form', data.selector).off('validation').on('submit.lsp.validation', function(e){
							
							var isValid = _this.validateForm($(this));
							
							if(!isValid){
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

			getPattern : function(validationType){
				if(!!_patterns[validationType]){
					return _patterns[validationType];
				}else{
					throw new Error(validationType + ' is an invalid validation type');
				}
			},
			
			isValid : function(string, validationType){
				return _this.getPattern(validationType).pattern.test(string);
			},

			validateForm : function(form){
				var stop = false;
				var scrollTo;
				var inputs = $(_settings.validationInputs, form);
				for(var i = 0; i < inputs.length; i++){
					if(!_this.validate(inputs[i])){
						stop = true;
						scrollTo = inputs[i];
						break;
					}
				}

				if(stop === true){
					_util.scrollTo(scrollTo);
				}
				
				return !stop;
			},

			isValidForm : function(form){
				var inputs = $(_settings.validationInputs, form);
				for(var i = 0; i < inputs.length; i++){
					if(!_this.validate(inputs[i]))
						return false;
				}
				return true;
			},
			
			// Parse, then display any validating messages
			validate : function(element){
				$(element).removeClass('validation-valid', 'validation-invalid');

				var elementValue = $(element).prop('type') == 'radio' ? $('input[name=' + $(element).prop('name') + ']:checked').val() || '' : $(element).val(); 
				
				console.log(elementValue);

				var invalidTypes = _this.parseInvalid(elementValue, $(element).attr('class').split(/\s+/));
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
					if(validationTypes[i].indexOf('validation-') > -1 && validationTypes[i] !== 'validation-valid' && validationTypes[i] !== 'validation-invalid') {
						var validationType = validationTypes[i].replace('validation-', '');
						var patternObj = _this.getPattern(validationType);
						// Unless it's required, allow a empty string to validate
						if(!value.match(patternObj.pattern) && ((value !== '' && validationType !== 'required') || validationType === 'required')){
							invalidTypes.push(validationType);
						}
					}
				}
				
				return invalidTypes;
			},
			
			displayInvalid : function(element, invalidTypes){
				
				var parent = $(element).parent('.validation-container');

				if(!parent.length){
					var parent = $(element).parent().addClass('validation-container');
					//_app.controllers.application.attachEvents(parent);
				}

				parent.attr('data-validation-invalidTypes', invalidTypes.join(' '));
			},

			displayValid : function(element){
				$(element).parent('.validation-container').removeAttr('data-validation-invalidTypes');

				// .removeClass('validation-invalid');
				// $(element).addClass('validation-valid').parent('.validation-container').addClass('validation-valid');
			}
		};

		return _this;

	}());
	
	_util.register('controller', 'validation', validation);

});
	
}());