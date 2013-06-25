(function(){
	
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
				}
			},
			assets : {},
			markNetSuiteCategoriesAsOpen : function(){

				var maxDepth = 0;
				$('#refinement-categories-container table table tr').each(function(i, element){
					var row = $(element);
					var depth = $('td:first-child', element).attr('colspan') || 0;
					
					maxDepth = (depth > maxDepth) ? depth : maxDepth;

					row.addClass('level' + depth);
				});

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
		};
		
		return _this;
	}()));
	
}());