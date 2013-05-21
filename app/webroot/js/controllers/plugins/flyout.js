(function(){

	var _util = window.LSP.utilities;

	_util.register('controller', 'flyout', (function(){
		var _this = {};
		var _lsp = window.LSP;
		var _flyoutElement;
		var _flyoutControlButton;
		var _lastActiveRow;

		_this =  {
			name : 'flyout',
			events : {
				application : {
					// We use onInit instead of onAttachEvents because
					// we only need to attach once
					onReady : function(e, data){
						console.log('hey');

						_flyoutElement = $('#mainFlyout');
						_flyoutControlButton = $('#flyoutControlButton');

						$('#mainFlyout .topLevel').menuAim({
							activate: _this.showRow,
							deactivate: _this.hideRow,
							exitMenu : function(){ return true; }  // fired on row deactivation
						});

						// I'm using anynomus functions here to hide the event
						// argument from the controller methods. You shouldn't expect
						// openFlyout or closeFlyout to rely on the event - it's possible
						// to force it open from elsewhere (like on the home page)
						_flyoutControlButton.bind('mouseenter', function(e){ _this.openFlyout(); });
						$('.container', _flyoutElement).bind('mouseleave', function(e){ _this.closeFlyout(); });
					}
				}
			},
			assets : {},
			openFlyout : function(){
				_flyoutElement.addClass('active');
				_flyoutControlButton.addClass('active');
			},
			closeFlyout : function(){
				_flyoutElement.removeClass('active');
				_flyoutControlButton.removeClass('active');
			},
			showRow : function(element){
				// We have to use a class rather than just the :hover
				// pesduo element because it's possible to
				// hover an item but not be active (the whole reason
				// we are using this plugin)
				$(element).addClass('active');
			},
			hideRow : function(element){
				$(element).removeClass('active');
			}
		};

		return _this;
		
	})());
})();