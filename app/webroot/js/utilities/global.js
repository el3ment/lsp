(function(){

// In 2014 we retrofitted our propritary code structure with RequireJS
// to enable dependency loading. We are only using components of the AMD
// structure right now.

define([], function(){

	window.LSP = window.LSP || {};
	window.LSP.utilities = window.LSP.utilities || {};
	
	$.extend(window.LSP.utilities, (function(){
		
		var _util = {};
		var _app = window.LSP;
		var _requiredScripts = [];
		var _requiredScriptsDeferments = [];

		_util = {

			redirectTo : function(url){
				document.location = url.replace('www.lonestarpercussion', 'lspsandbox.explorewebdev');
			},

			// Simple shallow comparison.
			isEqual : function(a, b){
				
				var isEqual = (!!a && !!b);

				$.each(a, function(key, value){
					if((!b.hasOwnProperty(key) && (a[key]+''.length) > 0) || a[key]+'' !== a[key]+''){
						isEqual = false;
						return false;
					}
				})

				if(isEqual){
					$.each(b, function(key, value){
						if((!a.hasOwnProperty(key) && (b[key]+''.length) > 0) || b[key]+'' !== a[key]+''){
							isEqual = false;
							return false;
						}
					})
				}

				return isEqual;
			},

			scrollTo : function(element){

				element = $(element);

				if(element){
					var viewportHeight = $(window).height();

					// Firefox uses body, webkit uses html (or the other way around) -- one is always zero, so just pick the large of the two
					var scrollTop = Math.max($('body').scrollTop(), $('html').scrollTop())
					var elementPos = (element.offset() || {}).top;

					if(elementPos < scrollTop || elementPos > scrollTop + viewportHeight){
						// Firefox/webkit discrepency
						if(LSP.controllers.application.getContext() === 'phone'){
							$('body, html').scrollTop(element.offset().top - 20);
							return $.Deferred().resolve();
						}else{
							return $('body, html').animate({ scrollTop: element.offset().top - 20}, 500);
						}
						
					}
				}else{
					return $.Deferred().resolve()
				}
			},

			getURLParameters : (function(){

				var vars = {}, hash;
				var href = window.location.href + '#'; // Add the hash so indexOf will have something
				var hashes = href.slice(href.indexOf('?') + 1, href.indexOf('#')).split('&');
				
				for(var i = 0; i < hashes.length; i++)
				{
					hash = hashes[i].split('=');
					//vars.push(hash[0]);
					vars[hash[0]] = decodeURIComponent(hash[1]).replace(/\+/g, ' ');
				}

				return function(){
					return vars;
				}
			}()),

			// formToObject : window.form2js,
			// Because form2js is being included as part of the postLoad group
			// it dosen't exist, so we need to attach it to _util later.
			// check in the form2js vendor file

			cleanArray : function(array){
				for(var i = 0; i < array.length; i++){
					if(array[i] === undefined || (array[i] || '').length < 1 || array[i] === null || (typeof array[i] === 'object' && $.isEmptyObject(array[i]))){
						array.splice(i, 1);
						i--;
					}
				}
				return array;
			},

			findBetween : function(front, back, string){
				var start = string.indexOf(front) + front.length;
				var end = (string + back).indexOf(back, start); // returns to the end if back not present
				return string.substr(start, end - start);
			},
			
			// Pulled from jQuery as it's not in the public API
			// identical to jQuery.camelCase();
			camelCase : function(string){
				var fcamelCase = function( all, letter ) {
					return ( letter + '' ).toUpperCase();
				};
				var fLowerCase = function(all, letter){
					return (letter + '').toLowerCase();
				};
				return string.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-ms-/, 'ms-').replace(/-([\da-z])/gi, fcamelCase ).replace(/^([A-Z]){1}/, fLowerCase);  
			},

			isValid : function(string, type){
				return LSP.controllers.validation.isValid(string, type);
			},

			cleanTrailing : function(string){
				return (string || '').replace(/^[.\s]+|[.\s]+$/g, '');
			},
			
			parseMicroTemplate : (function(){

				/* jshint quotmark:false */
				/* jshint evil:true */

				var cache = {};
				function tmpl(str, data){

					if(str){
						// Figure out if we're getting a template, or if we need to
						// load the template - and be sure to cache the result.
						
						var fn = /^[A-Za-z]{1}[-:A-Za-z0-9_]+$/.test(str) ? // if valid HTML id
								cache[str] = cache[str] || tmpl(document.getElementById(str).innerHTML) :
				
								// Generate a reusable function that will serve as a template
								// generator (and which will be cached).
								new Function("obj",
								"var p=[],print=function(){p.push.apply(p,arguments);};" +
								
								// Introduce the data as local variables using with(){}
								"with(obj){var _util=window.LSP.utilities,_controllers=window.LSP.controllers;p.push('" +
								
								// Convert the template into pure JavaScript
								str.replace(/[\r\t\n]/g, " ")
									.replace(/'(?=[^#]*#>)/g, "\t")
									.split("'").join("\\'")
									.split("\t").join("'")
									.replace(/<#=(.+?)#>/g, "',$1,'")
									.split("<#").join("');")
									.split("#>").join("p.push('") +
									"');}return p.join('');");

						// Provide some basic currying to the user
						return data ? fn.apply(data, [data]) : fn;
					}
					
					return null;
				}

				return tmpl;
				
			}()),

			parseCurrency : function(number) {
				var places = !isNaN(places = Math.abs(places)) ? places : 2;
				var symbol = symbol !== undefined ? symbol : "$";
				var thousand = thousand || ",";
				var decimal = decimal || ".";
				var negative = number < 0 ? "-" : "",
					i = parseInt(number = Math.abs(+number || 0).toFixed(places), 10) + "",
					j = (j = i.length) > 3 ? j % 3 : 0;
				return symbol + negative + (j ? i.substr(0, j) + thousand : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + thousand) + (places ? decimal + Math.abs(number - i).toFixed(places).slice(2) : "");
			},

			// Registers a controller/model/asset, and releases the initialization
			// deferrment
			register : function(type, name, object){
				switch(type){
					
				case 'model' :
					window.LSP.models = window.LSP.models || {};
					
					// Add duplication validation if nessesary
					object.name = name;
					window.LSP.models[name] = object;
					
					break;
					
				case 'controller' :
					window.LSP.controllers = window.LSP.controllers || {};
					
					object.name = name;
					
					// Add duplication validation if nessesary
					window.LSP.controllers[name] = object;
					
					// Assumes application is the first loaded.
					window.LSP.controllers.application.init(object);
					
					break;
					
				case 'asset' :
					window.LSP.assets = window.LSP.assets || {};
					
					// Add duplication validation if nessesary
					object.name = name;
					window.LSP.assets[name] = object;
					
					break;
				}
			
			}
		};
		
		return _util;
	
	}()));

});
	
}());