(function(){

	var _util = window.LSP.utilities;

	_util.register('controller', 'suggestions', (function(){

		// These are private properties
		var _this = {};
		var _lsp = window.LSP;

		// These are public         
		_this =  {
			name : 'suggestions',
			events : {
				suggestions : { },
				application : {
					//onResize : function(e, data){
					//	_this.setup_carousel();
					//},
					onAttachEvents : function(e, data){

						$('.dynamicItemSuggestions .touchcarousel', data.selector).touchCarousel({
							
							// This is a custom patch for Lone Star Percussion
							// It assumes uniform width of items, and calculates
							// how many items per page automatically. This solves
							// the responsive design problem of hardcoding too many
							// items per page
							_calculatePageWidth: true,
							
							pagingNav: true,
							pagingNavControls: false,
							scrollbar: false,
							scrollToLast: true,
							loopItems: false
						});
					}
				}
			},
			assets : { }
		};

		return _this;

	}()));

})();