(function(){
	
	var _util = window.LSP.utilities;
	
	var reviews = function(){
		var _this = {};
		var _lsp = window.LSP;
		var _api = _lsp.models.lspapi;
		var _settings = {
			formSelector : 'form#reviews-inputForm',
			profileTimeInputSelector : 'form#reviews-inputForm input.time',
			profileTitleSelector : 'form#reviews-inputForm input[data-childid]'
		};
		
		_this =  {
			name : 'reviews',
			events : {
				application : {
					onAttachEvents : function(e, data){
						// Hijack the submit event on any review forms
						$(_settings.formSelector, data.selector)
						.bind('submit', function(e){
							e.preventDefault();
							return false;
						}).bind('afterValidation', function(e){
							_this.save(this);
							e.preventDefault();
							return false;
						});
						
						
						$(_settings.profileTitleSelector, data.selector).change(function(e, data){
							if($(this).prop('checked')){
								$('#'+$(this).data('childid')).removeClass('hide');
							}else{
								$('#'+$(this).data('childid')).addClass('hide');
							}
						});
						
						
						console.log('Reviews attached');
					}
				}
			},
			assets : {},
			
			// Send the form, and replace the form with the result from the 
			// server.
			save : function(formElement){
				var data = _this.parseForm(formElement); // We have to parse the form before we disable the elements
				$(':input', formElement).attr('disabled', true);
				
				var result = $.when(_api.request(_this, 'save', 'saveReview', data))
				.done(function(data){
					// don't forget to _util.attachEvents with the new HTML!
					$(_settings.formSelector).replaceWith(JSON.stringify(data));
				}).always(function(data){
					$(':input', formElement).attr('disabled', false);
				});
				
				return result;
				
			},
			
			// Take the form, JSON encode the profile section, perform
			// other pre-save functions, and return the data
			parseForm : function(element){
				
				var returnData;
				
				returnData = _util.formToObject(element, null, true);
				for(var i = 0; returnData.custrecordreviewprofile && i < returnData.custrecordreviewprofile.length; i++){
					//returnData.custrecordreviewprofile[i] = JSON.stringify(returnData.custrecordreviewprofile[i]);
					returnData.custrecordreviewprofile[i] = returnData.custrecordreviewprofile[i].title + 
						(returnData.custrecordreviewprofile[i].time ? ' ('+ returnData.custrecordreviewprofile[i].time + 'yrs)' : '');
				}
				returnData.custrecordreviewerprofile = (returnData.custrecordreviewprofile || []).join(', ');
				
				return returnData;
			}
		};

		return _this;
	};
	
	_util.register('controller', 'reviews', reviews);
	
})();