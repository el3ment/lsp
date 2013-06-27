(function(){
	
	var _util = window.LSP.utilities;
	
	var product = (function(){
		var _this = {};
		var _app = window.LSP;
		var _assets = _app.assets;
		var _api = _app.models.easyask;
		
		_this =  {
			events : {
				product : {
					onAddToCart : function(e, data){
						_this.updateProduct(data.selector); // Update the product, just to be safe.
						data.selector[0].submit();
					},
					onMatrixOptionSelect : function(e, data){
						_this.updateMatrixLists(data.selector[0].form);
					}
				},
				application : {
					onReady : function(e, data){
						
						var productPageForm = $('.page-product form[action="/app/site/backend/additemtocart.nl"]')[0];
						if(productPageForm){
							_this.renderMatrixLists(productPageForm);
						}
						
					},
					onInit : function(e, data){}
				}
			},
			
			assets : {},

			renderMatrixLists : function(form){
				
			},

			updateMatrixLists : function(form){

				var easyAskMatrixData = _api.parseMatrixChildren($('input[name="summaryString"]', form).val());
				var selectedOptions = {};

				// Create an object of currently selected options
				$('select', form)
					.each(function(i, element){
						// If it's not the 'Select an Option' choice - which is identified by value=''
						if($(element).val().length){
							selectedOptions[$(element).attr('name')] = $(element).val();
						}
					});

				// Filter, and render newly updated options
				var filteredOptions = _api.filterMatrixChildren(easyAskMatrixData, selectedOptions)
				var unselectedOptionText = $('option[value=""]:first', form).text();
				$.each(filteredOptions, function(label, options){
					
					var optionHTML = '<option value="">'+ unselectedOptionText +'</option>';

					$.each(options, function(value, noop){
						optionHTML += '<option value="' + value + '">'+value+'</option>';
					});
					
					$('select[name="'+ label + '"]', form).html(optionHTML);
				});

				_this.updateProduct(form);
			},
			
			updateProduct : function(form){

				var easyAskMatrixData = _api.parseMatrixChildren($('input[name="summaryString"]', form).val());
				var selectedOptions = {};

				// Create an object of selected options to test against the formattedObject (the source)
				$('select', form)
					.each(function(i, element){
						selectedOptions[$(element).attr('name')] = $(element).val();
					});

				// Loop through the formattedMatrix (source of all attributes) and if we find an id that
				// matches the filter criteria, then set the id
				$.each(easyAskMatrixData.products, function(id, options){
					for(var label in options){

						// If it's not present, or if it exists, but is another value
						if(!selectedOptions[label] || selectedOptions[label] !== options[label])
							return
					}

					// If we've made it here, it's because we've found an ID that matches the filters
					$('input[name="buyid"]', form).val(id); // Set the buyid
				})
			},
			
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
	})();
	
	_util.register('controller', 'product', product);

})();