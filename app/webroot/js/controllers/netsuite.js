(function(){
	
	var _util = window.LSP.utilities;
	
	_util.register('controller', 'netsuite', (function(){
		var _this = {};
		var _app = window.LSP;

		_this = {
			
			events : {
				application : {
					onReady : function(e, data){
						_this.attachEnterKey();
					}
				}
			},
			
			assets : {},

			attachEnterKey : function(){

				// Check nested tables to ensure we attach only to netsuite inputs
				$('.page-generic table table table input').off('.submitter').on('keyup.lsp.submitter', function(e){
					// If it's an enter key and was not preceded by an enter key
					switch(e.which){
						case 13:
							if($(this).data('isDirty')){
								$(this).parents().each(function(i, element){
									var submit = $(element).find('#tbl_submitter *[onclick]')[0];
									if(submit){
										submit.click();
										e.stopPropagation();
										return false;
									}
								});

								// Prevents firing this event if the user hit enter
								// last time. This is a problem when you hit enter to
								// close the beautiful alert box netsuite generates
								$(this).data('isDirty', false);
							}
							break;
						case 40:
						case 38:
							//noop - in autocomplete
							$(this).data('isDirty', false);
							break;
						default:
							$(this).data('isDirty', true);
					}

				}).data('isDirty', true);
			}
		};
		
		return _this;

	})());

})();