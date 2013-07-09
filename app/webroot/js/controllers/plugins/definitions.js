(function(){
	
	var _util = window.LSP.utilities;
	
	var definitions = (function(){
		var _this = {};
		var _lsp = window.LSP;
		var _api = _lsp.models.netsuite;
		var _settings = {
				sluglessSelector : '*[data-def]:not([data-definitions-slug]):not([data-definitions-definition])',
				definitionlessSelector : '*[data-def][data-definitions-slug]:not([data-definitions-definition])',
				parsedSelector : '*[data-def][data-definitions-definition]'
			};
		
		_this =  {
			name : 'definitions',
			events : {
				definitions : {
					onAfterAPICallFailure : function(e, data){
						// Remove the lightning bolt - there was a failure
						$('*[data-def]').removeAttr('data-def');
					}
				},
				application : {
					onAttachEvents : function(e, data){
						// Make our list of slugs to request
						var slugs = [];
						$(_settings.sluglessSelector, data.selector).each(function(index, element){
							
							// Add slug to all definitions that don't already have it
							// we will attach the definition to them after they return
							// from the server
							$(this).attr('data-definitions-slug',  _this.makeSlug($(this).html()));
							
							slugs.push($(this).data('definitions-slug'));
						});
						
						// Request them, and set up the parser for when they return
						$.when(_this.getDefinitions(slugs)).done(function(response){
							if(response && response.response && response.response.data){
								_this.parseDefinitions(response.response.data, data.selector);
							}
						});
					}
				}
			},
			
			assets : {},
			
			getDefinitions : function(slugs){
				if(slugs.length > 0){
					return _api.request(_this, 'getDefinitions', {method : 'getDefinitions', slugs : JSON.stringify(slugs)});
				}
			},
			
			parseDefinitions : function(definitions, selector){
				$(_settings.definitionlessSelector, selector).each(function(index, element){
					// Not the most elegant -- but because neither array will be very big, it shouldn't
					// ever be a performance problem
					for(var i = 0; i < definitions.length; i++){ // Loop, and add word/definition pairs to definition slugs
						if(definitions[i].custrecordslug === $(this).data('definitions-slug')){
							var selector = $(this);
							selector.attr('data-definitions-title', definitions[i].name) // we are using attr and not data because they are CSS hooks
								.attr('data-definitions-definition', definitions[i].custrecorddefinition)
								.attr('data-definitions-url', definitions[i].custrecordurl)
								.attr('data-definitions-imageurl', definitions[i].custrecordimageurl);
								
							selector.append(_util.parseMicroTemplate('templates-definitons-display', selector.data()));
							
							selector.bind('mouseenter', function(){
								_this.showDefinition(this); 
							}).bind('mouseleave', function(){
								_this.hideDefinition(this);
							});
						}
					}
				});
			},
			
			hideDefinition : function(element){
				$('.panel', element).hide();
			}, // These work, but if we can do it in CSS with :hover -- all the better
			
			showDefinition : function(element){
				$('.panel', element).show();
			},
			
			makeSlug : function(content){
				return content.toLowerCase().replace(/[ ]+/g, '-').replace(/[^\w\-]/g, '');   
			}
		};

		return _this;
	}());
	
	_util.register('controller', 'definitions', definitions);
	
}());