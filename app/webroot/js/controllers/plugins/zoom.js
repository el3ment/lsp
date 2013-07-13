(function(){
	
	var _util = window.LSP.utilities;
	
	var zoom = (function(){
		var _this = {};
		var _app = window.LSP;
		
		_this =  {
			name : 'zoom',
			events : {
				application : {
					onContextChange : function(e, data){

					},
					onAttachEvents : function(e, data){
						var images = $('a[data-asset=mouseoverZoom]', data.selector);
						images.jqzoom({
							zoomWidth: $('.addToCart').width(),
							zoomHeight: $('#zoom-mainImage').height(),
							position: 'right',
							preloadImages: true,
							xOffset : 30,
							yOffset : 20,
							zoomType: 'standard'//,
							// showEffect: 'fadein',
							// fadeinSpeed: 'fast'
						});
					}
				}
			},
			assets : {}
		};
		
		return _this;
	}());
	
	_util.register('controller', 'zoom', zoom);
	
}());