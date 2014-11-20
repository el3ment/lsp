(function(){

define(['utilities/global', 'controllers/application'], function(){

	var _util = window.LSP.utilities;
	
	_util.register('controller', 'category', (function(){
		var _this = {};
		var _app = window.LSP;
		
		_this =  {
			events : {
				application : {
					onReady : function(e, data){
						_this.markNetSuiteCategoriesAsOpen();
					}
				},
				category : {
					onAddMultipleItemsToCart : function(e, data){
						var formElement = $('form#categoryForm')[0];
						var form = _util.formToObject(formElement, null, true);
						var multiString = "";
						$.each(form.items, function(index, value){
							if(value.include === 'true'){
								multiString += value.id + ',' + value.qty + ';';
							}
						})
						
						if(multiString.length > 2){
							multiString =  multiString.substring(0, multiString.length - 1);
							$('input[name="multi"]', formElement).attr('value', multiString);
							if(_app.controllers.validation.isValidForm(formElement))
								formElement.submit();
						}
					},
					onDisableInputs : function(e, data){
						if(data.selector[0].checked)
							$(':input:not([type="checkbox"])', $(data.selector).parents('.entry')).prop('disabled', false).removeAttr('disabled');
						else
							$(':input:not([type="checkbox"])', $(data.selector).parents('.entry')).prop('disabled', true).attr('disabled', true)
					}
				}
			},
			assets : {},
			markNetSuiteCategoriesAsOpen : function(){

				var maxDepth = 0;
				var adjustedItems = $('#refinement-categories-container table table tr').each(function(i, element){
					var row = $(element);
					var depth = $('td:first-child', element).attr('colspan') || 0;
					
					maxDepth = (depth > maxDepth) ? depth : maxDepth;

					row.addClass('level' + depth);
				});

				if(adjustedItems.length){
					// Mark Parents as open
					$('.level1:first, .level2:first, .level3:first, level4:first, .level5:first, .level6:first, .level7:first, .level8:first, .level9:first')
						.prev()
						.addClass('openParentCategory');

					// Mark max
					$('.level' + maxDepth).addClass('currentCategory');

					// Mark current parent
					$('.level' + maxDepth + ':first').prev().addClass('currentParentCategory');

					// Mark first parent
					$('.openParentCategory:first').addClass('firstParentCategory');
				}

			}
		};
		
		return _this;
	}()));

});
	
}());