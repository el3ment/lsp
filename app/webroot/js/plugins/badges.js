(function(){

define(['utilities/global', 'controllers/application'], function(){
	
	var _util = window.LSP.utilities;
	
	var badges = (function(){
		var _this = {};
		var _lsp = window.LSP;
		
		_this =  {
			name : 'badges',
			events : {
				application : {
					onAttachEvents : function(e, data){
						// $('div[data-badge]:not(:has(div.badges-badge)), a[data-badge]:not(:has(div.badges-badge))', data.selector)
						// 	.append(_this.makeElement).addClass('badges-hasBadge');
						$('div[data-badge]:not(.badges-hasBadge), a[data-badge]:not(.badges-hasBadge)', data.selector)
							.append(_this.makeElement).addClass('badges-hasBadge');
							
					}
				}
			},
			assets : {},
			makeElement : function(index, elementString){
				if($(this).attr('data-badge').length > 0)
					return '<div class="badges-badge badge-'+_util.camelCase($(this).attr('data-badge'))+'">'+ $(this).attr('data-badge') +'</div>';
				else
					return '';
			}
		};

		return _this;
	}());
	
	_util.register('controller', 'badges', badges);

});
	
})();