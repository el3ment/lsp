
/*
jquery.animate-enhanced plugin v1.03
---
http://github.com/benbarnett/jQuery-Animate-Enhanced
http://benbarnett.net
@benpbarnett
*/
(function(e,C,D){function I(a,b,f,c){if("d"!=f&&E(a)){var g=J.exec(b),d="auto"===a.css(f)?0:a.css(f),d="string"==typeof d?z(d):d;"string"==typeof b&&z(b);c=!0===c?0:d;var e=a.is(":hidden"),k=a.translation();"left"==f&&(c=parseInt(d,10)+k.x);"right"==f&&(c=parseInt(d,10)+k.x);"top"==f&&(c=parseInt(d,10)+k.y);"bottom"==f&&(c=parseInt(d,10)+k.y);g||"show"!=b?g||"hide"!=b||(c=0):(c=1,e&&a.css({display:K(a.context.tagName),opacity:0}));return g?(a=parseFloat(g[2]),g[1]&&(a=("-="===g[1]?-1:1)*a+parseInt(c,
10)),a):c}}function L(a,b,f,c,g,d,h,k){var l=a.data(t),l=l&&!w(l)?l:e.extend(!0,{},M),q=g;if(-1<e.inArray(b,A)){var r=l.meta,p=z(a.css(b))||0,n=b+"_o",q=g-p;r[b]=q;r[n]="auto"==a.css(b)?0+q:p+q||0;l.meta=r;h&&0===q&&(q=0-r[n],r[b]=q,r[n]=0)}return a.data(t,N(a,l,b,f,c,q,d,h,k))}function N(a,b,f,c,g,d,e,k,l){var q=!1;e=!0===e&&!0===k;b=b||{};b.original||(b.original={},q=!0);b.properties=b.properties||{};b.secondary=b.secondary||{};k=b.meta;for(var r=b.original,p=b.properties,t=b.secondary,s=n.length-
1;0<=s;s--){var m=n[s]+"transition-property",u=n[s]+"transition-duration",v=n[s]+"transition-timing-function";f=e?n[s]+"transform":f;q&&(r[m]=a.css(m)||"",r[u]=a.css(u)||"",r[v]=a.css(v)||"");t[f]=e?!0===l||!0===B&&!1!==l&&F?"translate3d("+k.left+"px, "+k.top+"px, 0)":"translate("+k.left+"px,"+k.top+"px)":d;p[m]=(p[m]?p[m]+",":"")+f;p[u]=(p[u]?p[u]+",":"")+c+"ms";p[v]=(p[v]?p[v]+",":"")+g}return b}function O(a){for(var b in a)if(!("width"!=b&&"height"!=b||"show"!=a[b]&&"hide"!=a[b]&&"toggle"!=a[b]))return!0;
return!1}function w(a){for(var b in a)return!1;return!0}function K(a){a=a.toUpperCase();var b={LI:"list-item",TR:"table-row",TD:"table-cell",TH:"table-cell",CAPTION:"table-caption",COL:"table-column",COLGROUP:"table-column-group",TFOOT:"table-footer-group",THEAD:"table-header-group",TBODY:"table-row-group"};return"string"==typeof b[a]?b[a]:"block"}function z(a){return parseFloat(a.replace(a.match(/\D+$/),""))}function E(a){var b=!0;a.each(function(a,c){return b=b&&c.ownerDocument});return b}function P(a,
b,f){if(!E(f))return!1;var c=-1<e.inArray(a,Q);"width"!=a&&"height"!=a&&"opacity"!=a||parseFloat(b)!==parseFloat(f.css(a))||(c=!1);return c}var Q="top right bottom left opacity height width".split(" "),A=["top","right","bottom","left"],n=["-webkit-","-moz-","-o-",""],R=["avoidTransforms","useTranslate3d","leaveTransforms"],J=/^([+-]=)?([\d+-.]+)(.*)$/,S=/([A-Z])/g,M={secondary:{},meta:{top:0,right:0,bottom:0,left:0}},t="jQe",G=null,x=!1,y=(document.body||document.documentElement).style,H=void 0!==
y.WebkitTransition||void 0!==y.MozTransition||void 0!==y.OTransition||void 0!==y.transition,F="WebKitCSSMatrix"in window&&"m11"in new WebKitCSSMatrix,B=F;e.expr&&e.expr.filters&&(G=e.expr.filters.animated,e.expr.filters.animated=function(a){return e(a).data("events")&&e(a).data("events")["webkitTransitionEnd oTransitionEnd transitionend"]?!0:G.call(this,a)});e.extend({toggle3DByDefault:function(){return B=!B},toggleDisabledByDefault:function(){return x=!x},setDisabledByDefault:function(a){return x=
a}});e.fn.translation=function(){if(!this[0])return null;var a=window.getComputedStyle(this[0],null),b={x:0,y:0};if(a)for(var e=n.length-1;0<=e;e--){var c=a.getPropertyValue(n[e]+"transform");if(c&&/matrix/i.test(c)){a=c.replace(/^matrix\(/i,"").split(/, |\)$/g);b={x:parseInt(a[4],10),y:parseInt(a[5],10)};break}}return b};e.fn.animate=function(a,b,f,c){a=a||{};var g=!("undefined"!==typeof a.bottom||"undefined"!==typeof a.right),d=e.speed(b,f,c),h=this,k=0,l=function(){k--;0===k&&"function"===typeof d.complete&&
d.complete.apply(h,arguments)};return!0===("undefined"!==typeof a.avoidCSSTransitions?a.avoidCSSTransitions:x)||!H||w(a)||O(a)||0>=d.duration||d.step?C.apply(this,arguments):this[!0===d.queue?"queue":"each"](function(){var b=e(this),c=e.extend({},d),f=function(c){var d=b.data(t)||{original:{}},f={};if(2==c.eventPhase){if(!0!==a.leaveTransforms){for(c=n.length-1;0<=c;c--)f[n[c]+"transform"]="";if(g&&"undefined"!==typeof d.meta){c=0;for(var h;h=A[c];++c)f[h]=d.meta[h+"_o"]+"px",e(this).css(h,f[h])}}b.unbind("webkitTransitionEnd oTransitionEnd transitionend").css(d.original).css(f).data(t,
null);"hide"===a.opacity&&b.css({display:"none",opacity:""});l.call(this)}},h={bounce:"cubic-bezier(0.0, 0.35, .5, 1.3)",linear:"linear",swing:"ease-in-out",easeInQuad:"cubic-bezier(0.550, 0.085, 0.680, 0.530)",easeInCubic:"cubic-bezier(0.550, 0.055, 0.675, 0.190)",easeInQuart:"cubic-bezier(0.895, 0.030, 0.685, 0.220)",easeInQuint:"cubic-bezier(0.755, 0.050, 0.855, 0.060)",easeInSine:"cubic-bezier(0.470, 0.000, 0.745, 0.715)",easeInExpo:"cubic-bezier(0.950, 0.050, 0.795, 0.035)",easeInCirc:"cubic-bezier(0.600, 0.040, 0.980, 0.335)",
easeInBack:"cubic-bezier(0.600, -0.280, 0.735, 0.045)",easeOutQuad:"cubic-bezier(0.250, 0.460, 0.450, 0.940)",easeOutCubic:"cubic-bezier(0.215, 0.610, 0.355, 1.000)",easeOutQuart:"cubic-bezier(0.165, 0.840, 0.440, 1.000)",easeOutQuint:"cubic-bezier(0.230, 1.000, 0.320, 1.000)",easeOutSine:"cubic-bezier(0.390, 0.575, 0.565, 1.000)",easeOutExpo:"cubic-bezier(0.190, 1.000, 0.220, 1.000)",easeOutCirc:"cubic-bezier(0.075, 0.820, 0.165, 1.000)",easeOutBack:"cubic-bezier(0.175, 0.885, 0.320, 1.275)",easeInOutQuad:"cubic-bezier(0.455, 0.030, 0.515, 0.955)",
easeInOutCubic:"cubic-bezier(0.645, 0.045, 0.355, 1.000)",easeInOutQuart:"cubic-bezier(0.770, 0.000, 0.175, 1.000)",easeInOutQuint:"cubic-bezier(0.860, 0.000, 0.070, 1.000)",easeInOutSine:"cubic-bezier(0.445, 0.050, 0.550, 0.950)",easeInOutExpo:"cubic-bezier(1.000, 0.000, 0.000, 1.000)",easeInOutCirc:"cubic-bezier(0.785, 0.135, 0.150, 0.860)",easeInOutBack:"cubic-bezier(0.680, -0.550, 0.265, 1.550)"},s={},h=h[c.easing||"swing"]?h[c.easing||"swing"]:c.easing||"swing",m;for(m in a)if(-1===e.inArray(m,
R)){var u=-1<e.inArray(m,A),v=I(b,a[m],m,u&&!0!==a.avoidTransforms);P(m,v,b)?L(b,m,c.duration,h,v,u&&!0!==a.avoidTransforms,g,a.useTranslate3d):s[m]=a[m]}b.unbind("webkitTransitionEnd oTransitionEnd transitionend");m=b.data(t);if(!m||w(m)||w(m.secondary))c.queue=!1;else{k++;b.css(m.properties);var x=m.secondary;setTimeout(function(){b.bind("webkitTransitionEnd oTransitionEnd transitionend",f).css(x)})}w(s)||(k++,C.apply(b,[s,{duration:c.duration,easing:e.easing[c.easing]?c.easing:e.easing.swing?"swing":
"linear",complete:l,queue:c.queue}]));return!0})};e.fn.animate.defaults={};e.fn.stop=function(a,b,f){if(!H)return D.apply(this,[a,b]);a&&this.queue([]);this.each(function(){var c=e(this),g=c.data(t);if(g&&!w(g)){var d,h={};if(b){if(h=g.secondary,!f&&void 0!==typeof g.meta.left_o||void 0!==typeof g.meta.top_o)for(h.left=void 0!==typeof g.meta.left_o?g.meta.left_o:"auto",h.top=void 0!==typeof g.meta.top_o?g.meta.top_o:"auto",d=n.length-1;0<=d;d--)h[n[d]+"transform"]=""}else if(!w(g.secondary)){var k=
window.getComputedStyle(c[0],null);if(k)for(var l in g.secondary)if(g.secondary.hasOwnProperty(l)&&(l=l.replace(S,"-$1").toLowerCase(),h[l]=k.getPropertyValue(l),!f&&/matrix/i.test(h[l])))for(d=h[l].replace(/^matrix\(/i,"").split(/, |\)$/g),h.left=parseFloat(d[4])+parseFloat(c.css("left"))+"px"||"auto",h.top=parseFloat(d[5])+parseFloat(c.css("top"))+"px"||"auto",d=n.length-1;0<=d;d--)h[n[d]+"transform"]=""}c.unbind("webkitTransitionEnd oTransitionEnd transitionend");c.css(g.original).css(h).data(t,
null)}else D.apply(c,[a,b])});return this}})(jQuery,jQuery.fn.animate,jQuery.fn.stop);

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
									eventType = 'click';
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
				
				console.log('pushing state');

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

			requiresNetsuite : function(){
				if(typeof debugAlert === 'undefined'){
					_this.include('/js/vendors/netsuite/interface.js');
				}
			},

			include : function(filename){
				head.js('https://dev.lonestarpercussion.com' + filename);
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
					//$(controllerObj).triggerHandler('onLoaded');
				}

				$(specificController).triggerHandler('onInit');
				
			}

		};
		
		return _this;

	}());
	
	_util.register('controller', 'application', application);

	window.LSP.controllers.application.initializeGlobalEvents();

}());