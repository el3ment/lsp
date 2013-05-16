(function(){

	var _util = window.LSP.utilities;

	var reveal = (function(){
		var _this = {};
		var _lsp = window.LSP;

		_this =  {
			name : 'reveal',
			events : {
				application : {
					//onResize : function(e, data){
					//	var width = $(window).width();
					//	if(width < 768){
							//console.log('mobile');
							//_this.open($(".reveal-openOnlyMobile"));
					//	}else{
							//console.log('not mobile');
							//_this.open($(".reveal-openOnlyDesktop"));
					//	}
					//},
					onAttachEvents : function(e, data){
						$('*[data-reveal-children]', data.selector).bind('click', function(e){

							// On click - fire the click event
							_this.toggle(_this.buildChildrenSelector(this));

							// We don't want to propagate default browser events
							e.stopPropagation();
							return true;

						}).each(function(index, element){

							// Mark all children as children
							_this.buildChildrenSelector(this).addClass('reveal-child');

							// If we ask it to start open, toggle the children
							//if($(this).hasClass('reveal-ispen')){
							//	$(_this.buildChildrenSelector(this)).addClass('reveal-isOpen');
							//}
						}).addClass('reveal-parent');


						// Mouseover reveals
						$('.reveal-showOnMouseover', data.selector).bind('mouseenter', function(e){
							
							_this.toggle(_this.buildChildrenSelector(this), !$(e.currentTarget).hasClass('reveal-noAnimation'));
							console.log('over');
							return true;
						}).bind('mouseleave', function(e){

							_this.toggle(_this.buildChildrenSelector(this), !$(e.currentTarget).hasClass('reveal-noAnimation'));
							console.log('out');
							return true;
						});
					}
				}
			},
			assets : {},
			buildChildrenSelector : function(element){
				return $('#' + $(element).data('reveal-children').split(' ').join(', #'));
			},
			open : function(children, doAnimations){
				
				doAnimations = (typeof doAnimations === 'undefined') ? true : doAnimations;

				if(doAnimations){
					children.slideDown(400, 'swing');
				}else{
					children.slideDown(0, 'swing');
				}
				children.each(function(index, child){
					$('*[data-reveal-children*="' + child.id + '"] ').addClass('reveal-isOpen');
				});

			},
			close : function(children, doAnimations){
				
				doAnimations = (typeof doAnimations === 'undefined') ? true : doAnimations;
				
				if(doAnimations){
					children.slideUp(400, 'swing');
				}else{
					children.slideUp(0, 'swing');
				}
				children.each(function(index, child){
					$('*[data-reveal-children*="' + child.id + '"] ').removeClass('reveal-isOpen');
				});
			},
			toggle : function(children, doAnimations){
				if(children.is(':visible')){
					_this.close(children, doAnimations);
				}else{
					_this.open(children, doAnimations);
				}

				// They've made a decision - so let's remove our start-only helpers
				children.removeClass('reveal-openOnlyMobile reveal-openOnlyDesktop');

			}
		};

		return _this;
		
	})();

	_util.register('controller', 'reveal', reveal);

})();