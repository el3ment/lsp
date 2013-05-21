(function(){
	
	var _util = window.LSP.utilities;
	
	var application = (function(){
		var _this = {};
		var _app = window.LSP;
		var _assets = _app.assets;
		var _context;

		_this =  {
			events : { 
				application : {
					onResize : function(e, data){
						var width = $(window).width();
						var newContext;

						if(width >= 1200){
							newContext = 'largeDesktop';
						}else if(width > 979){
							newContext = 'desktop';
						}else if(width > 768){
							newContext = 'tablet';
						}else{
							newContext = 'phone';
						}

						if(newContext !== _context){
							$(_this).triggerHandler('onContextChange', {context : _context});
							$(_this).triggerHandler(_util.camelCase('onContextChangeLeave-' + _context), {context : _context});
							$(_this).triggerHandler(_util.camelCase('onContextChangeEnter-' + newContext), {context : _context});
							console.log('Leaving ' + _context + ' entering ' + newContext);
							_context = newContext;
						}
					},
					onAttachEvents : function(e, data){
						
						// This is a helper event attacher, it looks for all
						// buttons, and if they have data-controller, and data-action
						// attributes, will call the appropriate event.
						$('*[data-action]', data.selector).each(function(){
							
							var elements = $(this);
							
							elements.each(function(index, element){
								
								element = $(element);
								
								var controller = element.data('controller');
								if(!controller){
									// find the first parent with data-controller
									// this allows a type of inheritance
									controller = element.parents('*[data-controller]').first().data('controller');
								}
								var action = element.data('action');
								var asset = element.data('asset');
								var preventDefault = false;
								var eventType;
								
								if(element.is('input[type="radio"], input[type="checkbox"], input[type="text"], select')){
									eventType = 'change';
								}else if(element.is('form')){
									eventType = 'submit';
									preventDefault = true;
								}else{
									eventType = 'click';
									if(element.is('button, submit')){
										preventDefault = true;
									}
								}
								
								if(controller && action && !asset){
									element.bind(eventType, {preventDefault : preventDefault}, function(e){  
										$(_app.controllers[controller]).
											triggerHandler(_util.camelCase('on-'+action), 
												{selector : element});
										if(e.data.preventDefault){
											e.preventDefault();
										}
									});
								
								}else if(controller && action && asset){
									element.bind(eventType, {preventDefault : preventDefault}, function(e){  
										$(_app.controllers[controller].assets[asset]).
											triggerHandler(_util.camelCase('on-'+action), 
												{selector : element});
										if(e.data.preventDefault){
											e.preventDefault();
										}
									});
								}
							});
						});
					},
					onReady : function(e, data){

						_this.attachEvents($('html'));
						
						// Add pagetype to the body tag for CSS styling
						$('body').data('pagetype', $('*[data-pagetype]:first').data('pagetype'));
					},
					onInit : function(e, data){}
				}
			},
			
			assets : {},

			getContext : function(){
				return _context;
			},
			
			// Fire all attach events event
			attachEvents : function(selector){
				$(_this).triggerHandler('onAttachEvents', {selector : selector});
			},

			init : function(){
				
				console.log('Application Init');
				
				var controller, subController, event, asset, controllerObj, subControllerObj;
				
				for (controller in _app.controllers) {
					
					controllerObj = _app.controllers[controller]; // Convience
					
					// Bind Events
					// This binds all of the callbacks (eg. controller.events.onAfterLoginSuccess)
					// to the event controller.onAfterLoginSuccess which is called by the API model object
					for(subController in controllerObj.events){
						
						subControllerObj = _app.controllers[subController]; // Convience
						
						for(event in controllerObj.events[subController]){
							if(event === 'self'){
								event = subController;
							}
							if(event === 'assets'){
								for(asset in controllerObj.events[subController].assets){
									for(event in controllerObj.events[subController].assets[asset]){
										// Attach the event to the asset
										$(subControllerObj.assets[asset])
											.bind(event, controllerObj.events[subController].assets[asset][event]); 
									}
								}
							}else{
							// attach the event to the subcontroller
								$(subControllerObj)
									.bind(event, controllerObj.events[subController][event]);
							}
						}
					}
					// bind asset events to controllers
					for(asset in controllerObj.assets){
						for(subController in controllerObj.assets[asset].events){
							
							subControllerObj = _app.controllers[subController]; // Convience
							
							for(event in controllerObj.assets[asset].events[subController]){
								if(subController === 'self'){
									// Assets will sometimes have their own events, like onSort, onClose, ect.
									// so we need to attach the default function to the asset event
									$(controllerObj.assets[asset])
										.bind(event, controllerObj.assets[asset].events[subController][event]);
								}else{
									// Otherwise, the assets want to attach themselves
									// to the normal controller.onMethod events
									$(subControllerObj)
										.bind(event, controllerObj.assets[asset].events[subController][event]);
								}
							}
						}
					}
					
					// Call onInit/onReady events, the when().then() functions
					// ensure that all of the onInit functions finish, before firing
					$(controllerObj).triggerHandler('onInit');
					$(controllerObj).triggerHandler('onLoaded');
				}
				

				$(window).resize(
					// We don't want to fire the onResize event every few miliseconds
					// so we use a timer - the anynomus function helps keep scope.
					(function(){
						var resizeTimer;
						return function(e, data){

							if(resizeTimer){ clearTimeout(resizeTimer);	}
							
							resizeTimer = setTimeout(function() { 
								$(_this).triggerHandler('onResize');
							}, 100);

						};
					})()
				);

				// Fire the onReady and onResize events to initialize anything that relies on them
				$(document).ready(function(){ 
					$(_this).triggerHandler('onResize');
					$(_this).triggerHandler('onReady');
					$(_this).triggerHandler('onAfterReady');
				});
			}

		};
		
		return _this;
	}());
	
	_util.register('controller', 'application', application);
	window.LSP.controllers.application.init();

}());