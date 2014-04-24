(function(){

	var _util = window.LSP.utilities;
	
	_util.register('controller', 'reviews', (function(){
		var _this = {};
		var _app = window.LSP;
		var _api = _app.models.netsuite;
		var _settings = {
			containerSelector : '#addReviewForm',
			formSelector : '#reviews-inputForm',
			prosInputSelector : '#reviews-inputForm .pros input',
			consInputSelector : '#reviews-inputForm .cons input',
			reviewTemplateId : 'templates-reviewEntry',
			previewSelector : '#previewReview'
		};
		
		_this =  {
			name : 'reviews',
			events : {
				reviews : {
					onAfterAPICallSuccess : function(e, data){
						$(_settings.formSelector).removeClass('loading');
						$('#reviewEntries').removeClass('loading secondary');

						// Close the add-review form
						$('button.b1.reveal-open[data-reveal-children*="addReviewForm"]').trigger('click');
						$(':input', _settings.formSelector).removeAttr('disabled');

					},
					onBeforeAPICall : function(e, data){
						$(_settings.formSelector).addClass('loading');
						$('#reviewEntries').addClass('loading secondary');
						$(':input', _settings.formSelector).attr('disabled');
					},
					onSave : function(e, data){
						var form = data.selector[0];
						if(_app.controllers.validation.validateForm(form)){
							_this.save(_this.parseForm(form));
						}
					},
					onProOrConInput : function(e){
						// If there is something in the input, show the second one
						if(e.currentTarget.value.length > 0){
							$(e.currentTarget).parent().next().show();

						// If the current one is empty, AND the next one is too, hide the second one
						}else if($(e.currentTarget).parent().next().length &&
								($(e.currentTarget).parent().next().children('input').val() || '').length < 1){ // the previous one is empty

							$(e.currentTarget).parent().next().hide();

						// If the current one is empty, and no longer has focus, and isn't the first one, hide it
						}else if(!$(e.currentTarget).is(':focus') &&
								!$(e.currentTarget).parent().is(':nth-of-type(1)') &&
								$(e.currentTarget).parent().prev().children().val().length < 1){
							$(e.currentTarget).parent().hide();
						}
					},
					// onAddedBodyContent : function(){
						
					//	var startHeight = $(this).height();
					//	return function(e){
					//		var textHeight = $(this).scrollTop();
					//		var newHeight = $(this).height() + textHeight;
					//		if(newHeight > startHeight){
					//			$(this).css('height',(newHeight + 'px'));
					//		}else{
					//			$(this).css('height', startHeight);
					//		}
						
					//	};
					// },
					onRenderPreview : function(e){
						$(_settings.previewSelector).html(_this.render(_this.parseForm(e.currentTarget.form)));
					}
				},
				application : {
					onAttachEvents : function(e, data){

						 $(_settings.formSelector+' :input', data.selector)
							.off('reviews')
							.on('keyup.lsp.reviews change.lsp.reviews', _this.events.reviews.onRenderPreview)
								.filter('input[type="checkbox"], input[type="radio"], select')
								.on('click.lsp.reviews change.lsp.reviews', _this.events.reviews.onRenderPreview);

						

						// $(_settings.formSelector+' textarea', data.selector)
						//	.on('keyup.lsp.reviews', _this.events.reviews.onAddedBodyContent()); // returns a function

						$(_settings.prosInputSelector+', '+_settings.consInputSelector, data.selector)
							.off('reviews')
							.on('keyup.lsp.reviews change.lsp.reviews', _this.events.reviews.onProOrConInput);
					}
				}
			},
			assets : {},
			
			// Send the form, and replace the form with the result from the 
			// server.
			// save : function(formElement){
			// 	var data = _this.parseForm(formElement); // We have to parse the form before we disable the elements
			// 	$(':input', formElement).attr('disabled', true);
				
			// 	var result = $.when(_api.request(_this, 'save', 'saveReview', data))
			// 	.done(function(data){
			// 		// don't forget to _util.attachEvents with the new HTML!
			// 		$(_settings.formSelector).replaceWith(JSON.stringify(data));
			// 	}).always(function(data){
			// 		$(':input', formElement).attr('disabled', false);
			// 	});
				
			// 	return result;
				
			// },

			save : function(reviewData){

				_gaq.push(['_trackEvent', 'reviews', 'saveReview']);

				return _api.request(_this, 'saveReview', {method : 'saveReview', data : JSON.stringify(reviewData)})
					.done(function(data){
						_this.renderSavedReview(reviewData);
					});
			},
			
			render : function(data){
				var html = _util.parseMicroTemplate(_settings.reviewTemplateId, data);
				return html;
			},

			renderSavedReview : function(review){
				
				_util.scrollTo($('.reviews.section'));

				$('ul.entries')
					.addClass('saved');

			},

			// Take the form, JSON encode the profile section, perform
			// other pre-save functions, and return the data
			parseForm : function(element){
				
				var returnData;
				var profile = [];
				
				returnData = _util.formToObject(element, null, true);

				// This is ancient code - the original plan was to store data in fields, and change
				// the review script as little as possible - but now we use a json object to handle it
				// so with some cleanup, this could be removed (move this logic to the template)
				for(var i = 0; i < ((returnData || {}).custrecordreviewprofile || {}).length; i++){
					
					if(returnData.custrecordreviewprofile[i].title){
						var years = '';
						if(returnData.custrecordreviewprofile[i].time > 0){
							var pluralString = (returnData.custrecordreviewprofile[i].time > 1 ? 's' : '');
							years = '&nbsp;('+ returnData.custrecordreviewprofile[i].time + '&nbsp;yr' + pluralString + ')';
						}
						profile.push(returnData.custrecordreviewprofile[i].title + years);
					}
				}
				returnData.profile = profile.join(', ');

				return returnData;
			}
		};

		return _this;
	})());
	
})();