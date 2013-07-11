(function(){
	
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

			// Adapted from http://jacwright.com/projects/javascript/date_format/
			// For exact syntax - see link above (based on PHP's date formatter
			formatDate : function(date, formatString){
				date = (typeof date === 'string' && date.indexOf(':') < 0 ? date.replace(/-/g, '/') : date);
				date = (typeof date === 'string' ? new Date(date) : date); // replace - with / for safari
				date = date || new Date();
				formatString = formatString || 'l, F jS Y g:ia';
				var returnStr = '';
				var replace = {
					shortMonths: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
					longMonths: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
					shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
					longDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				
					// Day
					d: function(c) { return (c.getDate() < 10 ? '0' : '') + c.getDate(); },
					D: function(c) { return this.shortDays[c.getDay()]; },
					j: function(c) { return c.getDate(); },
					l: function(c) { return this.longDays[c.getDay()]; },
					N: function(c) { return c.getDay() + 1; },
					S: function(c) { return (c.getDate() % 10 == 1 && c.getDate() != 11 ? 'st' : (c.getDate() % 10 == 2 && c.getDate() != 12 ? 'nd' : (c.getDate() % 10 == 3 && c.getDate() != 13 ? 'rd' : 'th'))); },
					w: function(c) { return c.getDay(); },
					z: function(c) { var d = new Date(c.getFullYear(),0,1); return Math.ceil((c - d) / 86400000); }, // Fixed now
					// Week
					W: function(c) { var d = new Date(c.getFullYear(), 0, 1); return Math.ceil((((c - d) / 86400000) + d.getDay() + 1) / 7); }, // Fixed now
					// Month
					F: function(c) { return this.longMonths[c.getMonth()]; },
					m: function(c) { return (c.getMonth() < 9 ? '0' : '') + (c.getMonth() + 1); },
					M: function(c) { return this.shortMonths[c.getMonth()]; },
					n: function(c) { return c.getMonth() + 1; },
					t: function(c) { var d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 0).getDate() }, // Fixed now, gets #days of date
					// Year
					L: function(c) { var year = c.getFullYear(); return (year % 400 == 0 || (year % 100 != 0 && year % 4 == 0)); },   // Fixed now
					o: function(c) { var d  = new Date(c.valueOf());  d.setDate(d.getDate() - ((c.getDay() + 6) % 7) + 3); return d.getFullYear();}, //Fixed now
					Y: function(c) { return c.getFullYear(); },
					y: function(c) { return ('' + c.getFullYear()).substr(2); },
					// Time
					a: function(c) { return c.getHours() < 12 ? 'am' : 'pm'; },
					A: function(c) { return c.getHours() < 12 ? 'AM' : 'PM'; },
					B: function(c) { return Math.floor((((c.getUTCHours() + 1) % 24) + c.getUTCMinutes() / 60 + c.getUTCSeconds() / 3600) * 1000 / 24); }, // Fixed now
					g: function(c) { return c.getHours() % 12 || 12; },
					G: function(c) { return c.getHours(); },
					h: function(c) { return ((c.getHours() % 12 || 12) < 10 ? '0' : '') + (c.getHours() % 12 || 12); },
					H: function(c) { return (c.getHours() < 10 ? '0' : '') + c.getHours(); },
					i: function(c) { return (c.getMinutes() < 10 ? '0' : '') + c.getMinutes(); },
					s: function(c) { return (c.getSeconds() < 10 ? '0' : '') + c.getSeconds(); },
					u: function(c) { var m = c.getMilliseconds(); return (m < 10 ? '00' : (m < 100 ? '0' : '')) + m; },
					// Timezone
					O: function(c) { return (-c.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(c.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(c.getTimezoneOffset() / 60)) + '00'; },
					P: function(c) { return (-c.getTimezoneOffset() < 0 ? '-' : '+') + (Math.abs(c.getTimezoneOffset() / 60) < 10 ? '0' : '') + (Math.abs(c.getTimezoneOffset() / 60)) + ':00'; }, // Fixed now
					T: function(c) { var m = c.getMonth(); c.setMonth(0); var result = c.toTimeString().replace(/^.+ \(?([^\)]+)\)?$/, '$1'); c.setMonth(m); return result;},
					Z: function(c) { return -c.getTimezoneOffset() * 60; },
					// Full Date/Time
					c: function(c) { return c.format("Y-m-d\\TH:i:sP"); }, // Fixed now
					r: function(c) { return c.toString(); },
					U: function(c) { return c.getTime() / 1000; }
				};
				
				for (var i = 0; i < formatString.length; i++) {
					var curChar = formatString.charAt(i);
					if (i - 1 >= 0 && formatString.charAt(i - 1) == "\\") {
						returnStr += curChar;
					}else if (replace[curChar]) {
						returnStr += replace[curChar](date);
					}else if (curChar != "\\"){
						returnStr += curChar;
					}
				}
				return returnStr;
			},

			// Simple shallow comparison.
			isEqual : function(a, b){
				
				var isEqual = true;

				$.each(a, function(key, value){
					if(!b.hasOwnProperty(key) || a[key] !== a[key]){
						isEqual = false;
						return false;
					}
				})

				if(isEqual){
					$.each(b, function(key, value){
						if(!a.hasOwnProperty(key) || b[key] !== a[key]){
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
					var scrollTop = $('body').scrollTop();
					var elementPos = (element.offset() || {}).top;

					if(elementPos < scrollTop || elementPos > scrollTop + viewportHeight){
						return $('html, body').animate({ scrollTop: element.offset().top - 20});
					}
				}
			},

			getURLParameters : (function(){

				var vars = [], hash;
				var href = window.location.href + '#'; // Add the hash so indexOf will have something
				var hashes = href.slice(href.indexOf('?') + 1, href.indexOf('#')).split('&');
				
				for(var i = 0; i < hashes.length; i++)
				{
					hash = hashes[i].split('=');
					vars.push(hash[0]);
					vars[hash[0]] = decodeURIComponent(hash[1]).replace(/\+/g, ' ');
				}

				return function(){
					return vars;
				}
			}()),

			formToObject : window.form2js,

			cleanArray : function(array){
				for(var i = 0; i < array.length; i++){
					if(array[i] === undefined || (array[i] || {}).length < 1 || array[i] === null || $.isEmptyObject(array[i])){
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
			
			// Adapted from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values?page=1&tab=votes#tab-top
			// getURLParameters : function(){
			// var urlParams = {};
			// var match;
			// var pl     = /\+/g,  // Regex for replacing addition symbol with a space
			// search = /([^&=]+)=?([^&]*)/g;
			// var decode = function (s) { return decodeURIComponent(s.replace(pl, ' ')); };
			// var query  = window.location.search.substring(1);
			// 
			// while (match = search.exec(query)){
			//    urlParams[decode(match[1])] = decode(match[2]);
			// }
			// 
			// return urlParams;
			// },
			
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
			// Converts an array of objects into a table, matching key/rows
			// If you needed to rotate the table (with headers on top rather than on the side
			// you'll have to write a translate/transpose function
			// Input [{name : 'hey', age : 12}, {age : 35, name : 'robert}]
			// Output {name : { 0 : 'hey', 1 : 'robert' }, age : { 0 : 12, 1 : 35}}
			// It's easier to output an object of objects, rather than an object of arrays
			tablify : function(objectArray){
				objectArray = objectArray || [];
				var returnTable = {};
				for(var i = 0; i < objectArray.length; i++){
					for(var key in objectArray[i]){
						returnTable[key] = returnTable[key] || new Array(objectArray.length);
						returnTable[key][i] = objectArray[i][key];
					}
				}
				return returnTable;
			},

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

			// parseCurrency : function(n){
			//  var c = isNaN(c = Math.abs(2)) ? 2 : 2, 
			//      d = '.', 
			//      t = ',', 
			//      s = n < 0 ? '-' : '', 
			//      i = parseInt(n = Math.abs(+n || 0).toFixed(c), 10) + '', 
			//      j = (j = i.length) > 3 ? j % 3 : 0;
					
			//  return '$' + s + (j ? i.substr(0, j) + t : '' + i.substr(j).replace(/(\d{3})(?=\d)/g, '$1' + t) + (c ? d + 
			//          Math.abs(n - i).toFixed(c).slice(2) : ''));
			// },

			base64 : (function(){

				var _Rixits =
			//   0       8       16      24      32      40      48      56     63
			//   v       v       v       v       v       v       v       v      v
				'0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/';
				// You have the freedom, here, to choose the glyphs you want for 
				// representing your base-64 numbers. The ASCII encoding guys usually
				// choose a set of glyphs beginning with ABCD..., but, looking at
				// your update #2, I deduce that you want glyphs beginning with 
				// 0123..., which is a fine choice and aligns the first ten numbers
				// in base 64 with the first ten numbers in decimal.

				// This cannot handle negative numbers and only works on the 
				//     integer part, discarding the fractional part.
				// Doing better means deciding on whether you're just representing
				// the subset of javascript numbers of twos-complement 32-bit integers 
				// or going with base-64 representations for the bit pattern of the
				// underlying IEEE floating-point number, or representing the mantissae
				// and exponents separately, or some other possibility. For now, bail
				return {
					encode : function(number) {
						if (isNaN(Number(number)) || number === null ||
							number === Number.POSITIVE_INFINITY){
							throw 'The input is not valid';
						}
						if (number < 0){
							throw 'Can\'t represent negative numbers now';
						}

						var rixit; // like 'digit', only in some non-decimal radix 
						var residual = Math.floor(number);
						var result = '';

						while (true) {
							rixit = residual % 64;
							// console.log("rixit : " + rixit);
							// console.log("result before : " + result);
							result = _Rixits.charAt(rixit) + result;
							// console.log("result after : " + result);
							// console.log("residual before : " + residual);
							residual = Math.floor(residual / 64);
							// console.log("residual after : " + residual);
	
							if (residual === 0){
								break;
							}
						}
						return result;
					},
	
					decode : function(rixits) {
						var result = 0;
						// console.log("rixits : " + rixits);
						// console.log("rixits.split('') : " + rixits.split(''));
						rixits = rixits.split('');
						for (var e in rixits) {
							// console.log("_Rixits.indexOf(" + rixits[e] + ") : " + 
								// _Rixits.indexOf(rixits[e]));
							// console.log("result before : " + result);
							result = (result * 64) + _Rixits.indexOf(rixits[e]);
							// console.log("result after : " + result);
						}
						return result;
					}
				};
			}()),
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


	
}());