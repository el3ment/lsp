(function(){
    
	window = window || {};
    window.LSP = window.LSP || {};
	window.LSP.utilities = window.LSP.utilities || {};
	
	$.extend(window.LSP.utilities, function(){
        
        var _util = {};
        var _app = window.LSP;

        _util = {
            
            // Pulled from jQuery as it's not in the public API
            // identical to jQuery.camelCase();
            camelCase : function(string){
                var fcamelCase = function( all, letter ) {
                    return ( letter + "" ).toUpperCase();
                };
                var fLowerCase = function(all, letter){
                	return (letter + "").toLowerCase();
                }
                return string.replace(/[^A-Za-z0-9]+/g, '-').replace(/^-ms-/, "ms-" ).replace(/-([\da-z])/gi, fcamelCase ).replace(/^([A-Z]){1}/, fLowerCase);  
            },
            
            // Adapted from http://stackoverflow.com/questions/901115/how-can-i-get-query-string-values?page=1&tab=votes#tab-top
            getURLParameters : function(){
            	var urlParams = {};
			    var match;
			    var pl     = /\+/g,  // Regex for replacing addition symbol with a space
			    	search = /([^&=]+)=?([^&]*)/g;
			    var decode = function (s) { return decodeURIComponent(s.replace(pl, " ")); };
			    var query  = window.location.search.substring(1);
			
			    while (match = search.exec(query)){
			       urlParams[decode(match[1])] = decode(match[2]);
			    }
			    
			    return urlParams;
            },
            
            parseMicroTemplate : (function(){
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
								"with(obj){var _util=window.LSP.utilities;p.push('" +
								
								// Convert the template into pure JavaScript
					            str.replace(/[\r\t\n]/g, " ")
					               .replace(/'(?=[^#]*#>)/g, "\t")
					               .split("'").join("\\'")
					               .split("\t").join("'")
					               .replace(/<#=(.+?)#>/g, "',$1,'")
					               .split("<#").join("');")
					               .split("#>").join("p.push('")
								  + "');}return p.join('');");
								
						// Provide some basic currying to the user
						return data ? fn.apply(data, [data]) : fn;
					}
					
					return null;
				};
				  
				return tmpl;
				
			})(),
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
			parseCurrency : function(n){
				var c = isNaN(c = Math.abs(2)) ? 2 : 2, 
				    d = ".", 
				    t = ",", 
				    s = n < 0 ? "-" : "", 
				    i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
				    j = (j = i.length) > 3 ? j % 3 : 0;
				   return "$" + s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + 					Math.abs(n - i).toFixed(c).slice(2) : "");
			},
            base64 : function(){

        	    var _Rixits =
        	//   0       8       16      24      32      40      48      56     63
        	//   v       v       v       v       v       v       v       v      v
        	    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz+/";
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
	        	            number === Number.POSITIVE_INFINITY)
	        	            throw "The input is not valid";
	        	        if (number < 0)
	        	            throw "Can't represent negative numbers now";
	
	        	        var rixit; // like 'digit', only in some non-decimal radix 
	        	        var residual = Math.floor(number);
	        	        var result = '';
	        	        while (true) {
	        	            rixit = residual % 64
	        	            // console.log("rixit : " + rixit);
	        	            // console.log("result before : " + result);
	        	            result = _Rixits.charAt(rixit) + result;
	        	            // console.log("result after : " + result);
	        	            // console.log("residual before : " + residual);
	        	            residual = Math.floor(residual / 64);
	        	            // console.log("residual after : " + residual);
	
	        	            if (residual == 0)
	        	                break;
	        	            }
	        	        return result;
	        	    },
	
	        	    decode : function(rixits) {
	        	        var result = 0;
	        	        // console.log("rixits : " + rixits);
	        	        // console.log("rixits.split('') : " + rixits.split(''));
	        	        rixits = rixits.split('');
	        	        for (e in rixits) {
	        	            // console.log("_Rixits.indexOf(" + rixits[e] + ") : " + 
	        	                // _Rixits.indexOf(rixits[e]));
	        	            // console.log("result before : " + result);
	        	            result = (result * 64) + _Rixits.indexOf(rixits[e]);
	        	            // console.log("result after : " + result);
	        	        }
	        	        return result;
	        	    }
        	    };
        	}(),
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
    
    }())
    
})();