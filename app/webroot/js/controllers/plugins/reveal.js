(function(){

	var _util = window.LSP.utilities;

	var reveal = (function(){
		var _this = {};
		var _app = window.LSP;

		var _waitToOpen = false;

		var ANIMATION_TIME = 300;

		_this =  {
			name : 'reveal',
			events : {
				reveal : {},
				application : {
					onContextChange : function(e, data){
						$('.reveal-closed-'+ data.previousContext)
							.removeClass('reveal-closed')
							.addClass('reveal-open');

						$('.reveal-closed-'+ data.context)
							.removeClass('reveal-open')
							.addClass('reveal-closed');

						$('.reveal-context-' + data.previousContext)
							.removeClass('reveal-open')
							.removeClass('reveal-closed');
					},
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

				});

				// Mouseover reveals
				$('.reveal-showOnMouseover', parent).off('mouseenter.reveal').on('mouseenter.reveal', function(e){
					_this.toggle(_this.buildChildrenSelector(this), !$(e.currentTarget).hasClass('reveal-noAnimation'));
					//return true;
				}).off('mouseleave.reveal').on('mouseleave.reveal', function(e){
					_this.toggle(_this.buildChildrenSelector(this), !$(e.currentTarget).hasClass('reveal-noAnimation'));
					//return true;
				});

				$('.reveal-closed-'+ _app.controllers.application.getContext())
					.removeClass('reveal-open')
					.addClass('reveal-closed');
			},


			unbindEvents : function(parent){
				$('*[data-reveal-children]', parent).off('.reveal');
			},


			buildChildrenSelector : function(element){
				return $('#' + $(element).data('reveal-children').split(' ').join(', #'));
			},

			open : function(children, doAnimations){

				if(!_waitToOpen){

					doAnimations = (typeof doAnimations === 'undefined') ? true : doAnimations;

					// Mark Parents as Open
					children.each(function(index, child){
						// Find it as the only child, and also if it's space seperated
						// Otherwise you'l find partials like id="states" would find "states-main"
						$('*[data-reveal-children="' + child.id + '"], *[data-reveal-children*="' + child.id + ' "] ').addClass('reveal-open').removeClass('reveal-closed');
					})

					if(doAnimations && _app.controllers.application.getContext() !== 'phone'){
						var queue = $({});
						children.each(function(i, child){
							child = $(child);
							queue.queue(function(){
								var control = $(this);
								child
									.css('display', 'none')
									.addClass('reveal-open')
									.slideDown({
										duration : ANIMATION_TIME,
										easing : 'swing',
										complete : function(){
											child
												.addClass('reveal-open')
												.css('display', '')
												.removeClass('reveal-closed');
											control.dequeue();
										}
									});
							});
						});
						
					}else{
						children.addClass('reveal-open').removeClass('reveal-closed');
					}

					//_gaq.push(['_trackEvent', 'reveal', 'open', children.attr('id')]);
				}

			},
			
			close : function(children, doAnimations){


				// Prevents flickering
				_waitToOpen = true;
				setTimeout(function(){
					_waitToOpen = false;
				}, 50)

				doAnimations = (typeof doAnimations === 'undefined') ? true : doAnimations;

				// Mark Parents as Open
				children.each(function(index, child){
					$('*[data-reveal-children*="' + child.id + '"] ').addClass('reveal-closed').removeClass('reveal-open');
				});

				if(doAnimations && _app.controllers.application.getContext() !== 'phone'){
					var queue = $({});

					var children = children.toArray().reverse();

					$.each(children, function(i, child){
						queue.queue(function(){
							var control = $(this);
							$(child)
								.css('display', 'block')
								.slideUp({
									duration : ANIMATION_TIME,
									easing : 'swing',
									complete : function(){
										$(this)
											.removeClass('reveal-open')
											.addClass('reveal-closed')
											.css('display', '');
										control.dequeue();
									}
								});
						});
					});

				}else{
					children.addClass('reveal-closed').removeClass('reveal-open');
				}
				//_gaq.push(['_trackEvent', 'reveal', 'close', children.attr('id')]);
			},

			toggle : function(children, doAnimations){

				var context = _app.controllers.application.getContext();
				var openChildren = children.filter('.reveal-open:not(*[class*="reveal-context"]), .reveal-open.reveal-context-' + context);
				var closedChildren = children.filter('.reveal-closed:not(*[class*="reveal-context"]), .reveal-closed.reveal-context-' + context +', .reveal-context-' + context + ':not(.reveal-open)');

				_this.open(closedChildren, doAnimations);
				_this.close(openChildren, doAnimations);
				
			}
		};

		return _this;
		
	})();

	_util.register('controller', 'reveal', reveal);

})();