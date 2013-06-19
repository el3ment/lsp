(function(){

	// Requires REVEAL

	var _util = window.LSP.utilities;

	_util.register('controller', 'flyout', (function(){
		var _this = {};
		var _lsp = window.LSP;
		
		var _flyout;
		var _flyoutControlButton;
		var _flyoutParent;

		var _isOpen = false;
		var _currentFlyoutTween;

		var _revealController = _lsp.controllers.reveal;

		var OPEN_SPEED = 150;
		var EXIT_TIMEOUT = 700;
		var ENTER_TIMEOUT = 300;

		_this =  {
			name : 'flyout',
			events : {
				application : {
					onContextChangeLeavePhone : function(e, data){
						_this.attachMenu();
					},
					onContextChangeEnterPhone : function(e, data){
						_this.detachMenu();
					},

					// We want to make sure we fire after reveal.js (which uses onReady)
					onAfterReady : function(e, data){
						if(_lsp.controllers.application.getContext() !== 'phone'){
							_this.attachMenu();
						}
					}
				}
			},
			assets : {},


			attachMenu : function(){
				_flyoutControlButton = $('#flyoutControlButton');
				_flyout = $('#mainFlyout');
				_flyoutParent = $('#mainFlyout .topLevel');

				// Unbind the native reveal functionality
				if(_revealController){
					_revealController.unbindEvents(_flyoutParent);
				}

				// Create the menu
				_flyoutParent.menuAim({
					activate : _this.showRow,
					deactivate : _this.hideRow,
					exitTimeout : EXIT_TIMEOUT,
					exitMenu : function(){ return true; }  // hides the open menu on exit
				});

				// I'm using annynomus functions here to hide the event
				// argument from the controller methods. You shouldn't expect
				// openFlyout or closeFlyout to rely on the event - it's possible
				// to force it open from elsewhere (like on the home page)
				var closeTimeout;
				var openTimeout;
				
				// Control Button
				_flyoutControlButton.on('mouseenter.lsp.flyout', function(e){ 
					openTimeout = setTimeout(_this.openFlyout, ENTER_TIMEOUT); // Start the timer
				
				}).on('mouseleave.lsp.flyout', function(e){
					clearTimeout(openTimeout); // Clear timeout on exit

				}).on('click.lsp.flyout', function(e){
					clearTimeout(openTimeout); // Force open if clicked
					_this.openFlyout();
				});

				// Container
				$('.container', _flyout).on('mouseenter.lsp.flyout', function(e){
					clearTimeout(closeTimeout);
				});

				// Wrapper
				$('.wrapper', _flyout).bind('mouseleave.lsp.flyout', function(e){
					//clearTimeout(timeout);
					closeTimeout = setTimeout(_this.closeFlyout, EXIT_TIMEOUT);
				});
			},

			detachMenu : function(){
				// If the flyout exists, destroy it
				if(_flyout){
					_this.closeFlyout();
					$('*', _flyout).off('.menuaim');
					_flyoutControlButton.off('.flyout');
					$('.wrapper', _flyout).off('.flyout');
				}

				// Rebind the reveal events
				if(_revealController){
					_revealController.bindEvents(_flyoutParent);
				}

			},
			// Don't rely on 'this' for these functions
			openFlyout : function(){
				_flyout.addClass('active');
				_flyoutControlButton.addClass('active');
			},
			closeFlyout : function(){
				_flyout.removeClass('active');
				_flyoutControlButton.removeClass('active');
				$('li.collection.active', _flyout).removeClass('active');

				// Finish any lingering animations
				if(_currentFlyoutTween){
					$(_currentFlyoutTween.elem).stop(true, true);
				}
				_currentFlyoutTween = null;

				_isOpen = false;
			},

			showRow : function(element){

				//_lsp.controllers.application.isMobile();
				
				// Reset the close timeout
				element = $(element);

				if(!_isOpen){

					// Because the content windows are all unique
					// we need to 'transfer' the animation to the new
					// content window to create a seemless slide right

					// We do this by storing the tween object, and hijacking it
					// mid-animation -- there is a little cleanup work to be done
					// after doing this
					
					var flyout = $('.flyout', element);
					

					if(_currentFlyoutTween){
						// Animation in progress, hijack it!
						$(_currentFlyoutTween.elem).removeAttr('style'); // Cleanup!
						$(flyout[0]).css({'width' : _currentFlyoutTween.now, 'overflow' : 'hidden'}); // we are likely between frames, this helps smooth the transition
						_currentFlyoutTween.elem = flyout[0]; // Hijack it.

					}else{

						var width = flyout.outerWidth();
						
						// No animation has started, so create one
						flyout
							.css({width : 0})
							.animate({width: width}, {
								duration : OPEN_SPEED,
								easing : 'swing',
								step : function(a, tween){
									// on each frame, store the tween object
									// we really only need to do this once (not every step)- but this is the
									// only place I found we have access to the tween object
									_currentFlyoutTween = tween;
								},
								always : function(e){
									$('*[style]', _flyout).removeAttr('style'); // atomic cleanup
									_currentFlyoutTween = null; // cleanup
									_isOpen = true; // prevent the animation from happening again
								}
							});
					}

				}

				// We have to use a class rather than just the :hover
				// pesduo element because it's possible to
				// hover an item but not be active (the whole reason
				// we are using this plugin)
				
				element.addClass('active');
				
			},
			hideRow : function(element){
				$(element).removeClass('active');
			}
		};

		return _this;
		
	})());
})();