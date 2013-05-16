(function(){
	
	var _util = window.LSP.utilities;
	
	var zoom = (function(){
		var _this = {};
		var _app = window.LSP;
		
		_this =  {
			name : 'zoom',
			events : {
				application : {
					onAttachEvents : function(e, data){
						var images = $('a[data-asset=mouseoverZoom]', data.selector);
						images.jqzoom({
							zoomWidth: 500,
							zoomHeight: 500,
							position: 'right',
							preloadImages: true,
							zoomType: 'standard',
							showEffect: 'fadein',
							fadeinSpeed: 'fast'
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