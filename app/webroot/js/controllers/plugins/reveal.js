(function(){

	var _util = window.LSP.utilities;

	var reveal = (function(){
		var _this = {};
		var _lsp = window.LSP;

		_this =  {
			name : 'reveal',
			events : {
				reveal : {},
				application : {
					onAttachEvents : function(e, data){
						_this.bindEvents(data.selector);
					}
				}
			},
			
			assets : {},

			bindEvents : function(parent){
				$('*[data-reveal-children]', parent).off('click.reveal').on('click.reveal', function(e){

					// On click - fire the click event
					_this.toggle(_this.buildChildrenSelector(this), !$(this).hasClass('reveal-noAnimation'));

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
				$('.reveal-showOnMouseover', parent).off('mouseenter.reveal').on('mouseenter.reveal', function(e){
					
					_this.toggle(_this.buildChildrenSelector(this), !$(e.currentTarget).hasClass('reveal-noAnimation'));
					return true;
				}).off('mouseleave.reveal').on('mouseleave.reveal', function(e){
					_this.toggle(_this.buildChildrenSelector(this), !$(e.currentTarget).hasClass('reveal-noAnimation'));
					return true;
				});
			},


			unbindEvents : function(parent){
				$('*[data-reveal-children]', parent).off('.reveal');
				$('.reveal-child', parent).removeClass('reveal-child');
				$('.reveal-parent', parent).removeClass('reveal-parent');
			},


			buildChildrenSelector : function(element){
				return $('#' + $(element).data('reveal-children').split(' ').join(', #'));
			},

			open : function(children, doAnimations){
				
				doAnimations = (typeof doAnimations === 'undefined') ? true : doAnimations;

				if(doAnimations){
					children.slideDown({duration : 400, easing : 'swing'});
				}else{
					//children.slideDown(0, 'swing');
				}
				children.each(function(index, child){
					$('*[data-reveal-children*="' + child.id + '"] ').addClass('reveal-isOpen');
				}).addClass('reveal-isOpen');

			},


			close : function(children, doAnimations){
				
				doAnimations = (typeof doAnimations === 'undefined') ? true : doAnimations;
				
				if(doAnimations){
					children.slideUp({duration : 400, easing : 'swing', complete : function(e){
						$(this).css('display', '');
					}});
				}else{
					//children.slideUp(0, 'swing');
				}
				children.each(function(index, child){
					$('*[data-reveal-children*="' + child.id + '"] ').removeClass('reveal-isOpen');
				}).removeClass('reveal-isOpen');
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