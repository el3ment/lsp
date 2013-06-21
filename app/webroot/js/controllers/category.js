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

				// var openRows = $('#refinement-categories > table table tr td[colspan!="10"]:not(:first-child)').parent('tr');
				// openRows.addClass('openCategory').prev().first().addClass('openCategory');
				
				// $('#refinement-categories > table table tr td.textboldnolink').parent('tr').addClass('currentParent');
				// $('.currentParent ~ tr.openCategory').addClass('currentCategory');

				$('#refinement-categories table table tr').each(function(i, element){
					var row = $(element);
					var depth = $('td:first-child', element).attr('colspan') || 0;
					row.addClass('level' + depth);
				})

			}
		};
		
		return _this;
	}()));
	
}());