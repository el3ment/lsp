
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
					//When window is resized, we need to re-setup the carousel
					//because the number of items that fit in the page width has changed:
					onResize : function(e, data){
						_this.setup_carousel();
					},
					//This is the initial setup of the carousel:
					onAttachEvents : function(e, data){

						_this.setup_carousel();
					}
				}
			},
			assets : {},
			//Calculate the total number of items that fit on the page according to the window width:
			items_per_page : function(){
				var itemWidth = $('.touchcarousel .touchcarousel-item').first().width(),
					windowWidth = $(window).width();

				return Math.floor(windowWidth / itemWidth);
			},
			//Helper method to get the current instance of the touch carousel:
			get_carousel_instance : function(){
				$('.touchcarousel').data('touchCarousel');
			},
			//This method sets up or updates the carousel.
			setup_carousel : function(){
				var carousel_instance = _this.get_carousel_instance();

				//If the carousel instance is valid, just update it
				if(carousel_instance){
					carousel_instance.updateCarouselSize();
				}
				//The caoursel instance was invalid, this is the first time it has run, so we need to set it up:
				else{
					$('.touchcarousel').touchCarousel({
						snapToItems: true,
						pagingNav: false,
						pagingNavControls: true,
						scrollbar: false,
						loopItems: true
					});
				}
			}

		};

		return _this;
	}());

})();