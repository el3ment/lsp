(function(){
	
	var _util = window.LSP.utilities;
	
	_util.register('controller', 'home', (function(){
		var _this = {};
		var _app = window.LSP;
		var _assets = _app.assets;
		var _remainOpen = true;

		_this = {
			
			events : {
				home : {
					onEngageAd : function(e, data){
						 _gaq.push(['_setCustomVar',
						      1,
						      'Clicked Ad',
						      data.selector.data('context') || 'Yes',
						      2
						   ]);
						 // Force the Custom Var to be set
						_gaq.push(['_trackEvent', 'advertisement', 'click', data.selector.data('context'), 1, true]);
					}
				},
				search : {
					onAfterAPICallSuccess : function(){
						_this.closePermanentFlyout();
					}
				},
				flyout : {
					onAfterAttach : function(e, data){
						if($('.page-home').length && _remainOpen && document.location.hash.indexOf('/~search') === -1){
							_app.controllers.flyout.openFlyout(true);
						}
					}
				},
				application : {
					onReady : function(e, data){
						var mainSlider = $('#mainSlider');
						if(mainSlider.length){
							$('#mainSlider').touchCarousel({
								
								// This is a custom patch for Lone Star Percussion
								// It assumes uniform width of items, and calculates
								// how many items per page automatically. This solves
								// the responsive design problem of hardcoding too many
								// items per page
								_calculatePageWidth: true,
								
								scrollbar: false,
								pagingNav: true,
								pagingNavControls: true,
								itemsPerPage: 1,
								scrollToLast: true,
								loopItems: true

								// Testing this out
								//useWebkit3d : true
							});

							//var touchCarousel = slider.data('touchCarousel');
							// setTimeout(function(){
							// touchCarousel.goTo(0);
							// }, 500);
							_this.events.flyout.onAfterAttach();
						}

					},
					onInit : function(e, data){

					}
				}
			},
			
			assets : {},
			
			closePermanentFlyout : function(){
				_remainOpen = false;
				_app.controllers.flyout.closeFlyout(true);
			}
		};
		
		return _this;

	})());

})();

