(function(){
	
	var _util = window.LSP.utilities;
	
	var application = (function(){
		var _this = {};
		var _app = window.LSP;
		var _assets = _app.assets;
		var _context;
		var _isReadyFired = false;

		var _state = {};

		var _isPushingState;

		_this =  {
			events : { 
				application : {
					onResize : function(e, data){
						var width = $(window).width();
						var newContext;
						var oldContext = _context;

						if(width >= 1200){
							newContext = 'desktop'; // could be largeDesktop
						}else if(width > 979){
							newContext = 'desktop';
						}else if(width >= 768){
							newContext = 'tablet';
						}else{
							newContext = 'phone';
						}

						if(newContext !== oldContext){
							console.log('Leaving ' + oldContext + ' entering ' + newContext);
							
							$(_this).triggerHandler('onContextChange', {context : newContext, previousContext : oldContext});
							$(_this).triggerHandler(_util.camelCase('onContextChangeLeave-' + oldContext), {context : newContext, previousContext : oldContext});
							$(_this).triggerHandler(_util.camelCase('onContextChangeEnter-' + newContext), {context : newContext, previousContext : oldContext});
							
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

										console.log('Event : ' + controller + '.events.' + action + ' fired.');

										$(_app.controllers[controller]).
											triggerHandler(_util.camelCase('on-'+action), 
												{selector : element});
										if(e.data.preventDefault){
											e.preventDefault();
										}
									});
								
								}else if(controller && action && asset){
									element.bind(eventType, {preventDefault : preventDefault}, function(e){  

										console.log('Event : ' + controller + '.events.' + action + ' fired.');

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

						_isReadyFired = true;
						_this.attachEvents($('html'));
						
						// Add pagetype to the body tag for CSS styling
						//$('body').data('pagetype', $('*[data-pagetype]:first').data('pagetype'));
					},

					onInit : function(e, data){
						_state = _this.pullState();
					}
				}
			},
			
			assets : {},

			getContext : function(){
				return _context;
			},

			getFilename : function(){
				return document.location.pathname.replace(/^.*(\\|\/|\:)/, '');
			},
			
			// Fire all attach events event
			attachEvents : function(selector){
				$(_this).triggerHandler('onAttachEvents', {selector : selector});
			},

			createHandlerBridge : function(controller, eventName, passthrough){
				return function(e){
					$(controller).triggerHandler(_util.camelCase('on-'+eventName), {selector : this, passthrough : passthrough});
				};
			},

			// Push / Pull state take snapshots sent from controllers, stringify them
			// and then push that to the hash. It would have been possible to use JSON
			// but the slashes look much prettier
			pushState : function(controller, snapshot){
				
				_state[controller.name] = snapshot; // Add it to the heap of other snapshots

				var statePath = _this.buildStateString(controller, snapshot); // relies on _state to build full string
				
				// If pushState, push the path
				if(!!(window.history && history.pushState)){
					history.pushState({}, '', '/' + snapshot.path + '#' + statePath);
				}else{
					// Setting window.location.hash to the same path does not cause hashchange to fire
					// which would leave isPushingState true until the next go around, a strange bug
					if(window.location.hash !== '#' + statePath){
						_isPushingState = true; // Don't fire the onHashChange event
						window.location.hash = statePath;
					}
				}

				

			},

			buildStateString : function(controller, snapshot){

				var statePath = '';
				
				$.each(_state, function(controllerName, snapshot){
					statePath = statePath + '/~' + encodeURIComponent(controllerName);
					$.each(snapshot, function(variable, value){
						
						// If pushState exists, we don't want to save the path in the hash - so skip it
						if(variable !== 'path' && !!(window.history && history.pushState)){
							// For simple objects use the value, complex objects get JSON-ified
							if(typeof value === 'object' && value.hasOwnProperty('value') && value.hasOwnProperty('uriEncode')){
								value = value.value;
							}else if(typeof value === 'object'){
								value = encodeURIComponent(JSON.stringify(value));
							}else{
								value = encodeURIComponent(value).replace(/%20/g, '+');
							}
							
							statePath += '/' + encodeURIComponent(variable) + '/' + value;
						}

					});
				});

				return statePath;
			},

			pullState : function(controller){
				
				var statePath = window.location.hash;
				var controllers = statePath.split('/~');
				var state = {};

				$.each(controllers, function(index, controllerPath){

					// Grab the controller name
					var controllerStatePath = controllerPath.split('/');
					var controllerName = controllerStatePath[0];
					
					// Loop through the key/value pairs by 2s
					for(var i = 1; i < controllerStatePath.length; i = i + 2){
						
						state[controllerName] = state[controllerName] || {};

						// Assume the value is a simple object
						state[controllerName][controllerStatePath[i]] = decodeURIComponent(controllerStatePath[i + 1]).replace(/\+/g, ' ');
						
						// Try and decode the JSON - if it's successful, replace the stringified version
						try{
							var object = $.parseJSON(state[controllerName][controllerStatePath[i]]);
							state[controllerName][controllerStatePath[i]] = object;
						}catch(e){ }
					}
				});

				// If they asked for a controller, just send that data, otherwise you get the whole object
				return (controller ? state[controller.name] : state);

			},

			_createGlobalEventObject : function(){
				return eventData = {
					filename : _this.getFilename(),
					queryParameters : _util.getURLParameters()
				};
			},

			initializeGlobalEvents : function(){

				var eventData = _this._createGlobalEventObject();

				$(window).resize(
					// We don't want to fire the onResize event every few miliseconds
					// so we use a timer - the function helps keep scope.
					(function(){
						var resizeTimer;
						return function(e, data){

							if(resizeTimer){ clearTimeout(resizeTimer);	}
							
							resizeTimer = setTimeout(function() { 
								$(_this).triggerHandler('onResize', eventData);
							}, 100);

						};
					})()
				);

				$(window).on('hashchange', function(e){
					if(_isPushingState){
						_isPushingState = false; // Apparently we've pushed, so unset it
						return;
					}
					_isPushingState = false;

					eventData.error = e;

					$(_this).triggerHandler('onHashChange', eventData);
					$(_this).triggerHandler(_util.camelCase('on-'+ eventData.filename +'-hash-change'), eventData);
				});

				// Fire the onReady and onResize events to initialize anything that relies on them
				$(document).ready(function(e){

					eventData.error = e;
					
					// $(_this).triggerHandler('onHashChange', eventData);
					// $(_this).triggerHandler(_util.camelCase('on-'+ eventData.filename +'-hash-change'), eventData);

					$(_this).triggerHandler('onResize', eventData);
					$(_this).triggerHandler('onReady', eventData);
					//$(_this).triggerHandler(_util.camelCase('on-'+ eventData.filename +'-ready'), eventData);
					$(_this).triggerHandler('onAfterReady', eventData);
				});
			},

			init : function(specificController){
				
				console.log('Initializing Events for ' + specificController.name);
				
				var controller, subController, event, asset, controllerObj, subControllerObj;
				
				for (controller in _app.controllers) {
					
					controllerObj = _app.controllers[controller]; // Convience
					
					// Bind Events
					// This binds all of the callbacks (eg. controller.events.onAfterLoginSuccess)
					// to the event controller.onAfterLoginSuccess which is called by the API model object
					for(subController in controllerObj.events){
						
						subControllerObj = _app.controllers[subController]; // Convience
						
						for(event in controllerObj.events[subController]){
							// Self event wasn't working right anyway, we just name it explicitly
							// if(event === 'self'){
							// 	event = subController;
							// }
							// Removing Assets - we don't use them in this project
							// if(event === 'assets'){
							// 	for(asset in controllerObj.events[subController].assets){
							// 		for(event in controllerObj.events[subController].assets[asset]){
							// 			// Attach the event to the asset
							// 			$(subControllerObj.assets[asset])
							// 				.bind(event, controllerObj.events[subController].assets[asset][event]); 
							// 		}
							// 	}
							// }
							// else{
							// attach the event to the subcontroller

							// If we've passed a specific controller - only bind that one, otherwise, in the darkness bind them (all of them)
							if((specificController && (specificController === controllerObj || specificController === subControllerObj)) || !specificController){
								$(subControllerObj)
									.bind(event, controllerObj.events[subController][event]);
							}

							// }
						}
					}

					debugger;
					
					// If the onReady events have already fired, then force this controller along individually
					if(_isReadyFired && ((controllerObj.events || {}).application || {}).onReady){
						controllerObj.events.application.onReady(_this._createGlobalEventObject());
					}

					// bind asset events to controllers
					// Removing Assets, we don't use them in this project
					// for(asset in controllerObj.assets){
					// 	for(subController in controllerObj.assets[asset].events){
							
					// 		subControllerObj = _app.controllers[subController]; // Convience
							
					// 		for(event in controllerObj.assets[asset].events[subController]){
					// 			if(subController === 'self'){
					// 				// Assets will sometimes have their own events, like onSort, onClose, ect.
					// 				// so we need to attach the default function to the asset event
					// 				$(controllerObj.assets[asset])
					// 					.bind(event, controllerObj.assets[asset].events[subController][event]);
					// 			}else{
					// 				// Otherwise, the assets want to attach themselves
					// 				// to the normal controller.onMethod events
					// 				$(subControllerObj)
					// 					.bind(event, controllerObj.assets[asset].events[subController][event]);
					// 			}
					// 		}
					// 	}
					// }
					
					// Call onInit/onReady events, the when().then() functions
					// ensure that all of the onInit functions finish, before firing
					// $(controllerObj).triggerHandler('onInit');
					// $(controllerObj).triggerHandler('onLoaded');
				}
				
			}

		};
		
		return _this;

	}());
	
	_util.register('controller', 'application', application);

	window.LSP.controllers.application.initializeGlobalEvents();

}());