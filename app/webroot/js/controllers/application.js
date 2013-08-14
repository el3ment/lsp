(function(){
	var _util = window.LSP.utilities;
	
	var application = (function(){
		var _this = {};
		var _app = window.LSP;
		var _assets = _app.assets;
		var _context;
		var _isReadyFired = false;
		var _hasPushState = !!(window.history && history.pushState);

		var _state = {};

		var _isPushingState;

		_this =  {
			events : {

				application : {


					onResize : function(e, data){
						var width = $(window).width();
						var newContext;
						var oldContext = _context;
						var targetController = (data.controller ? data.controller : _this);

						if(width >= 1200){
							newContext = 'largeDesktop'; // could be largeDesktop
						}else if(width > 979){
							newContext = 'desktop';
						}else if(width >= 768){
							newContext = 'tablet';
						}else{
							newContext = 'phone';
						}

						if(newContext !== oldContext){
							console.log('Leaving ' + oldContext + ' entering ' + newContext);
							
							$(targetController).triggerHandler('onContextChange', {context : newContext, previousContext : oldContext});
							$(targetController).triggerHandler(_util.camelCase('onContextChangeLeave-' + oldContext), {context : newContext, previousContext : oldContext});
							$(targetController).triggerHandler(_util.camelCase('onContextChangeEnter-' + newContext), {context : newContext, previousContext : oldContext});
							
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
									controller = element.parents('*[data-controller]:first').data('controller');
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
									//if('ontouchstart' in document.documentElement){
										eventType = 'touchstart';
									//}else{
										eventType = 'click';
									//}
									if(element.is('button, submit')){
										preventDefault = true;
									}
								}
								

								if(controller && action && !asset){
									element.bind(eventType, {preventDefault : preventDefault}, function(e){

										console.log('Event : ' + controller + '.events.' + _util.camelCase('on-' + action) + ' fired.');

										$(_app.controllers[controller]).
											triggerHandler(_util.camelCase('on-' + action),
												{selector : element, originalEvent : e});
										if(e.data.preventDefault){
											e.preventDefault();
										}
									});
								
								}else if(controller && action && asset){
									element.bind(eventType, {preventDefault : preventDefault}, function(e){

										console.log('Event : ' + controller + '.events.' + _util.camelCase('on-' + action) + ' fired.');

										$(_app.controllers[controller].assets[asset]).
											triggerHandler(_util.camelCase('on-' + action),
												{selector : element, originalEvent : e});
										if(e.data.preventDefault){
											e.preventDefault();
										}
									});
								}
							});
						});

						// $('a[href^="/"], a').off('click.lsp.pageController').on('click.lsp.pageController', function(e){
						// 	if(_hasPushState){
						// 		_this.loadPage($(this).attr('href'));
						// 		e.preventDefault();
						// 	} 
						// });
					},

					// onStateChange : function(e, data){
					// 	console.log('hey');
					// 	console.log(e, data);
					// },

					onReady : function(e, data){
						
						_isReadyFired = true;
						_this.attachEvents($('html'));
						if(_this.hasPushState()){
							history.replaceState(true, 'page', document.URL);
						}

						// Handle deferred inline scripting
						// https://gist.github.com/RonnyO/2391995

						$('script[type="text/javascript/defer"]').each(
							function(){
								eval($(this).html());
							});
					},

					onAfterStateChange : function(e, data){
						_gaq.push(['_trackPageview']);
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

			loadPage : function(href){
				$.ajax({url : href}).done(function(response){
					var newPageHTML = _util.findBetween('<!-- CONTENT AREA BEGIN CUSTOM CODE -->', '<!-- CONTENT AREA END CUSTOM CODE -->', response);
					_this.attachEvents($('.page-generic').replaceWith(newPageHTML));
					_util.scrollTo($('.page-generic'));
				});

				history.pushState(true, 'page', href);
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

			hasPushState : function(){
				return _hasPushState;
			},

			// Push / Pull state take snapshots sent from controllers, stringify them
			// and then push that to the hash. It would have been possible to use JSON
			// but the slashes look much prettier
			pushState : function(controller, snapshot, useReplaceState){
				
				var statePath = _this.buildStateString(controller, snapshot); // relies on _state to build full string
				
				// If pushState, push the path
				if(_this.hasPushState()){
					// To overcome an implementation problem with chrome/firefox where the popstate event 
					// gets fired for onload - we use a workaround to look at history.state.
					// this means the first argument (state) for history.pushState must ALWAYS be something
					// that evaluates to true, {} would work too.
					// check the event down below in initializeGlobalEvents to see more
					if(!useReplaceState){
						history.pushState(true, '', '/' + snapshot.path + '#' + statePath);
						$('html').attr('data-path', document.location.origin + '/' + snapshot.path + '#' + statePath + '-END');
					}else{
						console.log('Replacing State');
						history.replaceState(true, '', '/' + snapshot.path + '#' + statePath);
					}

					$('html').attr('data-path', document.location.href);

				}else{

					// Setting window.location.hash to the same path does not cause hashchange to fire
					// which would leave isPushingState true until the next go around, a strange bug
					if(!useReplaceState && window.location.hash !== '#' + statePath){
						_isPushingState = true; // Don't fire the onHashChange event
						window.location.hash = statePath;
					}
				}

				

			},

			buildStateString : function(controller, snapshot){

				var statePath = '';
				
				_state[controller.name] = snapshot; // Add it to the heap of other snapshots
				
				$.each(_state, function(controllerName, snapshot){
					statePath = statePath + '/~' + encodeURIComponent(controllerName);
					$.each(snapshot, function(variable, value){
						
						// If pushState exists, we don't want to save the path in the hash - so skip it
						if(variable !== 'path'){
							// For simple objects use the value, complex objects get JSON-ified
							if(typeof value === 'object' && value.hasOwnProperty('value') && value.hasOwnProperty('uriEncode')){
								value = value.value;
							}else if(typeof value === 'object'){
								value = encodeURIComponent(JSON.stringify(value));
							}else{
								value = encodeURIComponent(value).replace(/%20/g, '+');
							}
							
							if(value.length > 0){
								statePath += '/' + encodeURIComponent(variable) + '/' + value;
							}
						}

					});
				});

				return statePath;
			},

			parseStateFromHash : function(hash){
				var statePath = hash.replace(/\?.*/, '');
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

				return state;
			},

			pullState : function(controller){
				
				var state = _this.parseStateFromHash(window.location.hash);

				// If they asked for a controller, just send that data, otherwise you get the whole object
				return (controller ? state[controller.name] : state);

			},

			_createGlobalEventObject : function(){
				return eventData = {
					filename : _this.getFilename(),
					queryParameters : _util.getURLParameters(),
					context : _this.getContext()
				};
			},

			requiresNetsuite : function(){
				if(typeof debugAlert === 'undefined'){
					_this.include('/js/vendors/netsuite/interface.js');
				}
			},

			include : function(filename){
				$('head').append('<script type="text/javascript" src="//d2bghjaa5qmp6f.cloudfront.net'+ filename +'"></script>');
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


				if(_this.hasPushState()){

					// onPopstate has a wierd implemenation. On firefox it won't fire onPageLoad - but everywhere else
					// it does. We don't want it on page load - and to make it consistant, we check to see if history.state has been
					// set - if it has, then it's NOT a pageLoad. This means any time we call history.pushState, we MUST send some
					// state (generally {} or true, or anything that will evaluate to true)
					$(window).on('popstate', function(e){
						if(history.state){
							$(_this).triggerHandler('onStateChange', eventData);
							$(_this).triggerHandler('onAfterStateChange', eventData);
						}
						//$(_this).triggerHandler(_util.camelCase('on-'+ eventData.filename +'-state-change'), eventData);
					});

				}

				// Our HashChange fallback
				$(window).on('hashchange', function(e){
					if(_isPushingState){
						_isPushingState = false; // Apparently we've pushed, so unset it
						return;
					}
					_isPushingState = false;

					eventData.error = e;

					$(_this).triggerHandler('onStateChange', eventData);
					$(_this).triggerHandler(_util.camelCase('on-'+ eventData.filename +'-state-change'), eventData);
				
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

					// If the onReady events have already fired, then force this controller along individually
					if(_isReadyFired && ((controllerObj.events || {}).application || {}).onReady){
						controllerObj.events.application.onReady({}, _this._createGlobalEventObject());
					}
					if(_isReadyFired && ((controllerObj.events || {}).application || {}).onAfterReady){
						controllerObj.events.application.onAfterReady({}, _this._createGlobalEventObject());
					}
					if(_isReadyFired && ((controllerObj.events || {}).application || {}).attachEvents){
						controllerObj.events.application.attachEvents({}, $.extend({selector : $('html')}, _this._createGlobalEventObject()));
					}
					if(_isReadyFired && ((controllerObj.events || {}).application || {}).onResize){
						_this.events.application.onResize({}, {controller : controllerObj});
					}

					// // need to test this, if a controller loads after onready he needs to get onreszie fired too
				}

				$(specificController).triggerHandler('onInit');
				
			}

		};
		
		return _this;

	}());
	
	_util.register('controller', 'application', application);

	window.LSP.controllers.application.initializeGlobalEvents();

}());