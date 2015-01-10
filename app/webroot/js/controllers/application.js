(function(){

define(['jquery', 'utilities/loader', 'utilities/global'], function applicationController(){

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
		var _defferedScriptCount = 0;

		_this = {
			events : {

				application : {

					onStateChange : function(e, data){
						$('html').attr('data-path', document.href + '-END');
					},

					onResize : function(e, data){
						var targetController = $(data.controller ? data.controller : _this);
						var oldContext = _context;
						var newContext = _this.getContext();

						if(newContext !== oldContext){
							console.log('Leaving ' + oldContext + ' entering ' + newContext);
							
							targetController.triggerHandler('onContextChange', {context : newContext, previousContext : oldContext});
							targetController.triggerHandler(_util.camelCase('onContextChangeLeave-' + oldContext), {context : newContext, previousContext : oldContext});
							targetController.triggerHandler(_util.camelCase('onContextChangeEnter-' + newContext), {context : newContext, previousContext : oldContext});
						}
					},
					onAttachEvents : function(e, data){

						console.time('attachEvent : Application');

						// Ask the loader to load any new plugins or controllers if required
						_util.loader.load(data.selector);

						// This is a helper event attacher, it looks for all
						// buttons, and if they have data-controller, and data-action
						// attributes, will call the appropriate event.
						var elements = [];

						
							elements = $('*[data-action]', data.selector);
						
						
						for(var i = 0; i < elements.length; i++){

							element = $(elements[i]);

							var action = element[0].getAttribute('data-action');
							//var asset = element[0].getAttribute('data-asset');
							var controller = element[0].getAttribute('data-controller');
							var preventDefault = false;
							var eventType;

							// if(asset)
							// 	console.log('Warning :: Assets are unused');

							if(!controller){
								// find the first parent with data-controller
								// this allows a type of inheritance
								console.log('Warning :: Loading Parentals - This element needs a data-controller attribute', element);
								controller = element.parents('*[data-controller]:first').data('controller');
							}
							
							switch(element[0].nodeName.toUpperCase()){
								case "FORM":
									eventType = 'submit';
									preventDefault = true;
									break;
								
								case "INPUT":
								case "SELECT":
									eventType = 'change';
								break;

								case "BUTTON":
									preventDefault = true;
									eventType = 'click';
									break;
								
								default:
									eventType = 'click'
									break;
							}

							if(controller && action /*&& !asset*/){
								

								element.on(eventType, {preventDefault : preventDefault, controller : controller, action : action, element : element}, function(e){

									console.log('Event : ' + e.data.controller + '.events.' + _util.camelCase('on-' + e.data.action) + ' fired.');

									$(_app.controllers[e.data.controller]).
										triggerHandler(_util.camelCase('on-' + e.data.action),
											{selector : e.data.element, originalEvent : e});
									if(e.data.preventDefault){
										e.preventDefault();
									}
								});//.attr('data-action-handled', true);
							
							}

							// else if(controller && action && asset){
							// 	element.on(eventType, {preventDefault : preventDefault}, function(e){

							// 		console.log('Event : ' + controller + '.events.' + _util.camelCase('on-' + action) + ' fired.');

							// 		$(_app.controllers[controller].assets[asset]).
							// 			triggerHandler(_util.camelCase('on-' + action),
							// 				{selector : element, originalEvent : e});
							// 		if(e.data.preventDefault){
							// 			e.preventDefault();
							// 		}
							// 	});//.attr('data-action-handled', true);
							// }

						}					
							
						require(['vendors/unveil/unveil-min'], function(data){
							return function(){ 
								$('*[data-src]:not([data-lazy-handled])', data.selector).attr('data-lazy-handled', true).unveil(200);
							};
						}(data));

						console.timeEnd('attachEvent : Application');
							
					},

					onReady : function(e, data){
						
						_isReadyFired = true;
						
						_this.attachEvents($('html'));

						if(_this.hasPushState()){
							history.replaceState(true, 'page', document.URL);
						}


						var requestNextScript = function(){
							var script = $('script[type="text/javascript/defer"]')[0];
							if(script){
								script = $(script);
								if(script.attr('src')){
									$.ajaxSetup({cache: true});
									$.getScript(script.attr('src'), function(){
										requestNextScript();
									});
									script.remove();
									$.ajaxSetup({cache: false});
								}else{
									eval("with(window){ " + script.html() + "}");
									script.remove();
									requestNextScript();
								}
							}
						};

						requestNextScript();

						// Orientation Change Zoom Bug (Bug WR935)
						if (navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPad/i)) {
						  var viewportmeta = document.querySelector('meta[name="viewport"]');
						  if (viewportmeta) {
							viewportmeta.content = 'width=device-width, minimum-scale=1.0, maximum-scale=1.0';
							document.body.addEventListener('gesturestart', function() {
							  viewportmeta.content = 'width=device-width, minimum-scale=0.25, maximum-scale=1.6';
							}, false);
						  }
						}

					},

					onInit : function(e, data){
						_state = _this.pullState();
					}
				}
			},
			
			assets : {},

			getContext : function(){
				var width = $(window).width();
				var newContext;

				if(width >= 1200){
					newContext = 'largeDesktop'; // could be largeDesktop
				}else if(width > 979){
					newContext = 'desktop';
				}else if(width >= 768){
					newContext = 'tablet';
				}else{
					newContext = 'phone';
				}

				_context = newContext;

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
						history.pushState(true, '', document.location.origin + ('/' + snapshot.path).replace(/\/$/, '') + '/#' + statePath);
						$('html').attr('data-path', document.location.origin + ('/' + snapshot.path).replace(/\/$/, '') + '/#' + statePath + '-END');
					}else{
						console.log('Replacing State');
						history.replaceState(true, '', ('/' + snapshot.path).replace(/\/$/, '') + '/#' + statePath);
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
				
				eventData = {
					filename : _this.getFilename(),
					queryParameters : _util.getURLParameters(),
					context : _this.getContext()
				};

				return eventData;
			},

			// requiresNetsuite : function(){
			// 	if(typeof debugAlert === 'undefined'){
			// 		_this.include('/js/vendors/netsuite/interface.js');
			// 		$("head link").last().after("<link rel='stylesheet' href='//d2bghjaa5qmp6f.cloudfront.net/compress/css/css/ns-checkout.scss,/checkout1.0.44.css.css' type='text/css'>");
			// 	}
			// },

			// include : function(filename){
			// 	console.log('Async request for file : ' + filename);
			// 	jQuery.ajaxSetup({ cache:true});
			// 	$('head').append('<script type="text/javascript" src="//d2bghjaa5qmp6f.cloudfront.net/compress/js'+ filename +',/'+ filename + $('#currentScriptVersion').data('version') + '"></script>');
			// },

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
					
					// Defer parsing until the next avaliable moment - this allows the onLoad event to finish firing
					//setTimeout(function(){
					//	return function(){
							console.time('Application onRezie, onReady, onAfterReady');
							$(_this).triggerHandler('onResize', eventData);
							$(_this).triggerHandler('onReady', eventData);
							$(_this).triggerHandler('onAfterReady', eventData);
							console.timeEnd('Application onRezie, onReady, onAfterReady');
							
					//	};
					//}(eventData), 1);
				});
			},

			init : function(specificController){

				console.log('Initializing Controller', specificController);
				
				console.time('Initializing Events for ' + specificController.name);
				
				var controller, subController, event, asset, controllerObj, subControllerObj;
				
				for (controller in _app.controllers) {
					
					controllerObj = _app.controllers[controller]; // Convience
					
					// Bind Events
					// This binds all of the callbacks (eg. controller.events.onAfterLoginSuccess)
					// to the event controller.onAfterLoginSuccess which is called by the API model object
					for(subController in controllerObj.events){
						
						subControllerObj = _app.controllers[subController]; // Convience
						
						for(event in controllerObj.events[subController]){

							// If we've passed a specific controller - only bind that one, otherwise, in the darkness bind them (all of them)
							if((specificController && (specificController === controllerObj || specificController === subControllerObj)) || !specificController){
								$(subControllerObj)
									.bind(event, function(controllerObj, subController, event){
										// extra closure to give access to controllerObj, subController, and event objects
										return function(a, b, c, d){
											//console.time("-" + controllerObj.name + ".events." + subController + "." + event);
											controllerObj.events[subController][event](a, b, c, d);
											//console.timeEnd("-" + controllerObj.name + ".events." + subController + "." + event);
										};
									}(controllerObj, subController, event));
							}

							// }
						}
					}

					// If the onReady events have already fired, then force this controller along individually
					if(specificController === controllerObj && _isReadyFired){

						setTimeout(function manuallyInitializeControllerPostReady(){
							if(((controllerObj.events || {}).application || {}).onReady){
								controllerObj.events.application.onReady({}, _this._createGlobalEventObject());
							}
							if(((controllerObj.events || {}).application || {}).onAfterReady){
								controllerObj.events.application.onAfterReady({}, _this._createGlobalEventObject());
							}
							if(((controllerObj.events || {}).application || {}).onAttachEvents){
								controllerObj.events.application.onAttachEvents({}, $.extend({selector : $('html')}, _this._createGlobalEventObject()));
							}
							if(((controllerObj.events || {}).application || {}).onResize){
								_this.events.application.onResize({}, {controller : controllerObj});
							}
						}, 100);
					}

					// // need to test this, if a controller loads after onready he needs to get onreszie fired too
				}

				$(specificController).triggerHandler('onInit');
				console.timeEnd('Initializing Events for ' + specificController.name);
				
			}

		};
		
		return _this;

	}());
	
	_util.register('controller', 'application', application);
	
	console.time('Application Initialize');
	window.LSP.controllers.application.initializeGlobalEvents();

});

}());