(function(){
	
	var _util = window.LSP.utilities;
	
	_util.register('controller', 'clearable', (function(){
		var _this = {};
		var _lsp = window.LSP;
		
		_this =  {
			name : 'clearable',
			events : {
				clearable : {
					onClear : function(e, data){
						$(data.passthrough.targetInput).val('');
						$(data.passthrough.targetInput).trigger('change');
					},
					onShowHideButton : function(e, data){
						var input = $(data.passthrough.targetInput);
						if($(data.passthrough.targetInput).val().length > 0){
							input.next('button').fadeIn(200);
						}else{
							input.next('button').fadeOut(200);
						}
					}
				},
				application : {
					onAttachEvents : function(e, data){
						$('.clearable', data.selector).each(function(i, element){ _this.attach(element); });
					}
				}
			},
			assets : {},
			attach : function(element){

				var button = $('<button type="button" class="b5 clearContents" tabindex="-1">Clear Contents</button>')
					.on('click.lsp.clearable', _lsp.controllers.application.createHandlerBridge(_this, 'clear', {targetInput : element}));
				
				$(element)
					.off('.clearable')
					.on('keyup.lsp.clearable change.lsp.clearable', _lsp.controllers.application.createHandlerBridge(_this, 'showHideButton', {targetInput : element}))
					.wrap('<div class="clearableContainer" />')
					.after(button);

				_lsp.controllers.application.attachEvents(element);
			},
			makeElement : function(index, elementString){
				return '<div class="badges-badge badge-'+$(this).data('badge')+'">'+ $(this).data('badge') +'</div>';
			}
		};

		return _this;

	}()));

})();