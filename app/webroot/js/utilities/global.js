window.marengo = window.marengo || {};
window.marengo.utilities = window.marengo.utilities || {};
$.extend(window.marengo.utilities, (function(){
    
    var _requiredScripts = [];
    var _requiredScriptsDeferments = [];
    var _initializeQueue = {};
    var _marengo = window.marengo;
    var _util = {};
    
    // Used by register()
    var _initialize = function(type, objectName){
        _initializeQueue[type] = _initializeQueue[type] || {};
        _initializeQueue[type][objectName] = _initializeQueue[type][objectName] || $.Deferred();
        
        return _initializeQueue[type][objectName];    
    };    
    
    _util = {
        // Creates an error handling function, useful for .fail and
        // other Deferred problems. If you are calling errorHandler directly
        // and want to fire the event right away, be sure to self-execute the
        // function that is returned.
        errorHandler : function(controller, asset, type, data){
            return function(deferredData){
                switch(type){
                    case 'critical':
                        console.error('Critical Error : '+data.message, data);
                        break;
                    case 'warning':
                        console.warn('Warning : '+data.message, data);
                        break;
                    default:
                        console.info('Warning : '+data.message, data);
                }
                
                if(asset){
                    $(asset).triggerHandler('onError', data);
                    $(asset).triggerHandler(_util.camelCase('on-'+data.code+'-error'), data);
                }else if(controller){
                    $(controller).triggerHandler('onError', data);
                    $(controller).triggerHandler(_util.camelCase('on-'+data.code+'-error'), data);
                }
                if((_marengo.controllers || {}).application){
                    $(_marengo.controllers.application).triggerHandler('onError', data);
                    $(_marengo.controllers.application).triggerHandler(_util.camelCase('on-'+data.code+'-error'), data);
                }
                
            };
        },
        
        // Asks all controllers to attach any events to newly injected HTML
        // if they want to
        attachEvents : function(selector){
              $(_marengo.controllers.application).triggerHandler('onAttachEvents', {selector : selector});
        },
    
        // Using $.Deferred, templateReady will download a file if it dosen't
        // exist, meaning we can use $.when().done() syntax to 'require' template
        // files!
        templateReady : function(templateFile){
            var result = $.Deferred();
            
            if(templateFile.isRendered === true){
                result.resolve(templateFile);
            }else{
                $.get(templateFile.url).success(function(data){
                    // ## Debug Templates
                    //console.log('Downloaded template '+templateFile.url);
                    if(templateFile.isPartial){
                        Handlebars.registerPartial(templateFile.partialId, data);
                        templateFile.isRendered = true;
                    }else{
                        var compiledTemplate = Handlebars.compile(data);
                        templateFile.parse = function(data){
                            // ## For Debugging Templates
                            console.log('Template ' + templateFile.url + ' is being parsed using', data);
                            return compiledTemplate(data);
                        };
                        templateFile.isRendered = true;
                        // ## For Debugging Templates
                        //console.log('Compiling template '+templateFile.url);
                    }
                    templateFile.source = data;
                    result.resolve(templateFile);
                }).fail(function(){
                
                    _util.errorHandler(
                    _marengo.controllers.application, 
                    _marengo.controllers.application.assets.pages, 
                    'critical', 
                    {code : 'templateLoadFail', 
                    message : 'A template ('+templateFile.url+') failed to load',
                    template : templateFile})(); 
                
                    result.reject();
                });
            }
        
            return result.promise();
        },
        
        // Pulled from jQuery as it's not in the public API
        // identical to jQuery.camelCase();
        camelCase : function(string){
            var fcamelCase = function( all, letter ) {
                return ( letter + "" ).toUpperCase();
            };
            return string.replace(/^-ms-/, "ms-" ).replace(/-([\da-z])/gi, fcamelCase );  
        },
        
        
        // Adapted from http://jacwright.com/projects/javascript/date_format/
        // For exact syntax - see link above (based on PHP's date formatter
        /*formatDate : function(date, formatString){
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
        },*/
        
        // Registers a controller/model/asset, and releases the initialization
        // deferrment
        register : function(type, name, object){
            switch(type){
                
                case 'model' :
                    window.marengo.models = window.marengo.models || {};
                    
                    // Add duplication validation if nessesary
                    object.name = name;
                    window.marengo.models[name] = object;
                    _initialize('model', name).resolve();
                    break;
                    
                case 'controller' :
                    window.marengo.controllers = window.marengo.controllers || {};
                    
                    object.name = name;
                    object.events = object.events || {};
                    object.events[name] = object.events[name] || {};
                    
                    // Add duplication validation if nessesary
                    window.marengo.controllers[name] = object;
                    if(name !== 'application'){
                        window.marengo.controllers.application.attachControllerEvents(window.marengo.controllers[name]);
                    }
                    
                    _initialize('controller', name).resolve();
                    break;
                    
                case 'asset' :
                     window.marengo.assets = window.marengo.assets || {};
                    
                    // Add duplication validation if nessesary
                    object.name = name;
                    window.marengo.assets[name] = object;
                    
                    break;
            }
            
            _initialize(type, name).resolve();
        
        },
        
        
        include : function(path, type, name){
            if(type === 'css'){
                $('head').append('<link rel="stylesheet" href="'+path+'" type="text/css" />');
            }
            return $.Deferred().resolve();
        },
        // Loads a javascript file, uses $.Deferred object to ensure dependencies
        require : function (path, type, name, waitForInitialization) {
            
            // If it's a css file, don't treat it as a script
            if(type === 'css'){
                return _util.include(path, type, name);   
            }
            
            if(waitForInitialization){
                var initializationDeferred = _initialize(type, name);    
            }
            
            // If the item hasn't been requested yet
            if(jQuery.inArray(path, _requiredScripts) === -1){
                
                console.log('Required Script Downloading '+path);
                
                // http://balpha.de/2011/10/jquery-script-insertion-and-its-consequences-for-debugging/
                var result = $.Deferred(),
                    script = document.createElement("script");
                script.async = "async";
                script.type = "text/javascript";
                script.src = path;
                script.onload = script.onreadystatechange = function(_, isAbort) {
                    if (!script.readyState || /loaded|complete/.test(script.readyState)) {
                        if(isAbort){
                            _util.errorHandler(null, null, 'critical', {code : 'missingRequiredFile',
                                message : 'A required file ('+path+') failed to load', data : {
                                path : path,
                                type : type,
                                name : name,
                                waitForInitialization: waitForInitialization,
                                script : script
                                }})();  //errorHandler returns a function, but in this case
                                        // we want to execute it
                            result.reject();
                        }else{
                            console.log('Required Script ' + path + ' is downloaded');
                            if(waitForInitialization){
                                // If the file never initializes, it's becaused a deferred object didn't
                                // return true somewhere
                                console.log('Required Script '+ path + ' is waiting to initialize');
                                initializationDeferred.done(function(){
                                    console.log('Required Script '+type+'.'+name+' is initialized');
                                    result.resolve(); 
                                });
                            }else{
                                result.resolve();
                            }
                        }
                    }
                };
                script.onerror = function () {
                    _util.errorHandler(null, null, 'critical', {code : 'missingRequiredFile',
                        message : 'A required file ('+path+') failed to load', data : {
                                path : path,
                                type : type,
                                name : name,
                                waitForInitialization: waitForInitialization,
                                script : script
                                }})();
                    result.reject(); };
                $("head")[0].appendChild(script);
                
                // Add the file to our processed queue
                _requiredScripts.push(path);
                _requiredScriptsDeferments.push(result);
                
                return result.promise();
            }else{
                // If two objects request a file simultaniously, we download it the
                // first time, and all subsequent times, we reference the original
                // deferment object. This means we can require the same file many times
                // without downloading it more than once
                return _requiredScriptsDeferments[jQuery.inArray(path, _requiredScripts)].promise(); 
            }
        }
    };
    
    return _util;
    
})());
