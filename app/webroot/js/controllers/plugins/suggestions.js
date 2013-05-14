
// This is basically a singleton, it's accessable at LSP.controllers.suggestions

(function(){

	var _util = window.LSP.utilities;

	_util.register('controller', 'suggestions', function(){

		// These are private properties
		var _this = {};
		var _lsp = window.LSP;

		// These are public         
		_this =  {
			name : 'suggestions',
			events : {
				application : {
					onResize : function(e, data){
						_this.setup_carousel();
					},
					onAttachEvents : function(e, data){

						_this.setup_carousel();
					}
				}
			},
			assets : {},
			items_per_page : function(){
				var itemWidth = $('.touchcarousel .touchcarousel-item').first().width(),
					windowWidth = $(window).width();

				return Math.floor(windowWidth / itemWidth);
			},
			get_carousel_instance : function(){
				$('.touchcarousel').data('touchCarousel');
			},
			setup_carousel : function(){
				var carousel_instance = _this.get_carousel_instance();

				if(carousel_instance){
					//carousel_instance.settings.itemsPerMove = _this.items_per_page();
					carousel_instance.updateCarouselSize();
				}
				else{
					$('.touchcarousel').touchCarousel({
						//itemsPerMove: _this.items_per_page(),
						snapToItems: true,
						pagingNav: false,
						pagingNavControls: true,
						scrollbar: false,
						// scrollToLast: true,
						loopItems: true
					});
				}
			}

		};

		return _this;
	}());

})();