(function(){

	var _util = window.LSP.utilities;
	var _models = window.LSP.models;
	
	_util.register('model', 'easyask', (function(){

		var _this = $.extend({}, _models.api);

		//var _dictionary = 'EcomDemo';
		//var _hostname = 'http://easyaskqa.easyaskondemand.com';
		
		var _dictionary = 'nslonestarpercussion';
		var _hostname = 'http://lonestarpercussion.prod.easyaskondemand.com';

		var _sessionId;

		var _attributeHistory = {};

		// Extends the generic API
		return $.extend(_this, {
			_url : function(controller, payload){
				return _hostname + '/EasyAsk/apps/Advisor.jsp';
			},
			_payload : function(controller, payload){

				// payload : 
				// 	{sort, resultsPerPage, page, category, attributes ({thing : [thing1, thing2]}), keywords, action ('advisor'), method ('CA_Search')}

				var formattedPayload = {
					RequestAction : payload.action,
					RequestData : payload.method,
					currentpage : payload.currentPage,
					forcepage : 1,
					ResultsPerPage : payload.resultsPerPage,
					defsortcols : (payload.sort === 'default' ? '' : payload.sort),
					indexed : 1, 
					rootprods : 1,
					oneshot : 0,
					sessionID : _sessionId,
					defarrangeby : '///NONE///',
					disp : 'json',
					dct : _dictionary,
					q : payload.keywords
				};

				if(payload.isSingleSelect){
					formattedPayload.CatPath = payload.category;
					formattedPayload.AttribSel = this.buildSingleAttributeString(payload.attributes);
				}else{
					// Build the category path by hand
					formattedPayload.CatPath = _util.cleanArray([payload.category, payload.attributes, this.buildKeywordString(payload.keywords)]).join('/');
				}


				if($.isEmptyObject(payload.attributes) && payload.method === 'CA_AttributeSelected'){
					formattedPayload.RequestData = 'CA_CategoryExpand'; // If there are no attributes, just load the category
				}
				// As a form of cleanup - remove a trailing //// from a category request
				formattedPayload.CatPath = formattedPayload.CatPath.replace(/\/$/, '').replace(/^\//, ''); // Remove trailing //// if it exists

				return formattedPayload;
			},

			_isSuccess : function(responseData){
				return (responseData || {}).returnCode === 0;
			},

			_afterSuccess : function(responseData){
				_sessionId = responseData.sessionID;
				
				responseData.source.navPath._lsp = responseData.source.navPath._lsp || {};
				responseData.source.navPath._lsp.categoryNodes = _this.getCategoryNodes(responseData.source);
				responseData.source.navPath._lsp.refinementNodes = _this.getRefinementNodes(responseData.source);
				responseData.source.navPath._lsp.searchNode = _this.getSearchNode(responseData.source);
				
				this.cacheAttributes(responseData.source);
				responseData.source.attributes = responseData.source.attributes || {};
				responseData.source.attributes._lsp = responseData.source.attributes._lsp || {};
				responseData.source.attributes._lsp.cached = _this.injectCachedAttributes(responseData.source);

				return responseData;
			},

			buildKeywordString : function(keywords){
				return (keywords ? ('-' + keywords).replace(/-{1,}/, '-') : null);
			},

			// buildMultiAttributeString : function(attributeHashMap){
				
			// 	var attributes = [];

			// 	if(attributeHashMap){
			// 		$.each(attributeHashMap, function(name, valueArray){

			// 			var selections = [];

			// 			$.each(valueArray, function(index, selectedValue){
			// 				// If index is null (it's the first index) add attribSel to the name
			// 				selections.push(selectedValue);
			// 			});

			// 			attributes.push(selections.join(';'));

			// 		});
			// 	}

			// 	return _util.cleanArray(attributes).join('/');

			// },

			buildSingleAttributeString : function(attributeHashMap){
				return this.buildMultiAttributeString(attributeHashMap).replace('AttribSelect=', '').replace(/\/\/\/\/*/, '');
			},

			cacheAttributes : function(easyAskDataSourceObject){

				var returnAttributeMap = {};

				// Add all returned attributes to the cache
				for(var i = 0; i < ((easyAskDataSourceObject.attributes || {}).attribute || {}).length; i++){
					var attribute = easyAskDataSourceObject.attributes.attribute[i];
					_attributeHistory[attribute.name] = attribute;
					returnAttributeMap[attribute.name] = true; // Small lookup map
				}

				// Clean cachedAttributes that shoudn't be there
				$.each(_attributeHistory, function(i, cachedAttribute){
					// If it's not been returned with Attributes

					var fullPath = $(easyAskDataSourceObject.navPath.navPathNodeList).last()[0].seoPath;
					var attributeSEOName = cachedAttribute.attributeValueList[0].nodeString.replace(/:.*/, '');

					if(!returnAttributeMap[cachedAttribute.name] && fullPath.indexOf(attributeSEOName+':') < 0){
						// If it's neither returned, nor selected, it's ok to delete it from the cache						
						delete _attributeHistory[cachedAttribute.name];
					}
				});

				return returnAttributeMap;

			},

			injectCachedAttributes : function(easyAskDataSourceObject){
				
				var lspAttributes = [];

				// Loop through cached attributes
				// See if the attribute came down in the response, if it is then use it
				// if it's not - then use the cached version.

				$.each(_attributeHistory, function(i, cachedAttribute){
					
					var found = false;
					for(var j = 0; j < ((easyAskDataSourceObject.attributes || {}).attribute || {}).length; j++){
						if(easyAskDataSourceObject.attributes.attribute[j].attributeName === cachedAttribute.name){
							found = true;
							lspAttributes.push(easyAskDataSourceObject.attribute[j]);
						}
					}
					if(!found){
						lspAttributes.push(cachedAttribute);
					}

				});

				return this.markSelectedAttributes(easyAskDataSourceObject, lspAttributes);
			},

			markSelectedAttributes : function(easyAskDataSourceObject, attributes){
				
				var attributes = $.extend(true, [], attributes); // attributes is a pointer, we need it passed as a value

				$.each(((easyAskDataSourceObject.navPath || {})._lsp || {}).refinementNodes, function(j, refinementNode){

					// Find the attribute
					for(var i = 0; i < (attributes || {}).length; i++){
						if((attributes[i] || {}).name === refinementNode.attribute){

							// Find the matching value
							for(var j = 0; j < (attributes[i].attributeValueList || {}).length; j++){

								if(refinementNode.value === attributes[i].attributeValueList[j].attributeValue){
									// Mark it as selected
									attributes[i].attributeValueList[j].selected = true;
									break;
								}
							}

							break; // stop after the first attribute
						}
					}

					
				});

				return attributes;

			},

			getCategoryNodes : function(easyAskDataSourceObject){
				
				var categoryNodes = [];
				var navPathNodeList = easyAskDataSourceObject.navPath.navPathNodeList;
				var pureCategoryPath = this.getCategoriesFromSEOPath(navPathNodeList[navPathNodeList.length - 1].seoPath);

				// Creates a list of just category nodes, and adds a convinient removePath property
				for(var i = 0; i < easyAskDataSourceObject.navPath.navPathNodeList.length; i++){
					if(navPathNodeList[i].navNodePathType === 1){
						
						navPathNodeList[i].englishName = navPathNodeList[i].englishName.replace(/\/$/, '');
						navPathNodeList[i].englishName = (navPathNodeList[i].englishName === 'All-Products' ? 'All Products' : navPathNodeList[i].englishName);

						var len = categoryNodes.push(navPathNodeList[i]);
						var newCategoryName = categoryNodes[len - 1].seoPath;

						// Grab the stuff after newCategoryName
						categoryNodes[len - 1].removePath = pureCategoryPath.substr(pureCategoryPath.indexOf(newCategoryName) + newCategoryName.length, pureCategoryPath.length);

					}
				}

				return categoryNodes;

			},

			getSearchNode : function(easyAskDataSourceObject){
				for(var i = 0; i < easyAskDataSourceObject.navPath.navPathNodeList.length; i++){
					if(easyAskDataSourceObject.navPath.navPathNodeList[i].navNodePathType === 3){ 
						return easyAskDataSourceObject.navPath.navPathNodeList[i];
					}
				}
			},

			getRefinementNodes : function(easyAskDataSourceObject){
				var attributeNodes = [];

				// Splits the attributes up one-by-one and stores them in a convinent object

				for(var i = 0; i < easyAskDataSourceObject.navPath.navPathNodeList.length; i++){
					if(easyAskDataSourceObject.navPath.navPathNodeList[i].navNodePathType === 2){ // Refinement
						
						var node = easyAskDataSourceObject.navPath.navPathNodeList[i];
						var fullPath = decodeURIComponent(easyAskDataSourceObject.navPath.fullPath).replace(/\+/g, ' ');

						var groups = node.englishName.substring(1, node.englishName.length - 2); // Remove starting and trailing parens
						groups = groups.split('\'); (');

						for(var k = 0; k < groups.length; k++){
							
							var attributeNode = groups[k].split('\' or ');

							for(var j = 0; j < attributeNode.length; j++){
								var attribute = attributeNode[j];
								attribute = attribute.split(' = \'');
								attributeNodes.push({
									attribute : attribute[0],
									value : attribute[1],
									nodeString : this.convertToSEOString(attribute[0], attribute[1])
									// removePath is the path without the attribute
									//removePath : fullPath.replace(attribute[0] + ' = \'' + attribute[1]+ '\'', '')
								});
							}
						}

						
					}
				}

				return attributeNodes;
			},


			// If value is null or empty, then you'l just SEO convert a string (useful for search queries)
			convertToSEOString : function(name, value){
				
				name = name.replace(/[^A-Za-z0-9]/g, '-').replace(/-{1,}/, '-');
				value = (value || '').replace(/[^A-Za-z0-9]/g, '-').replace(/-{1,}/, '-');
				
				return name.replace(/-$/, '') + (value ? ':' + value.replace(/-$/, '') : '');

			},

			getCategoriesFromSEOPath : function(seoPath){

				var seoPath = seoPath.split('/');

				for(var i = 0; i < seoPath.length; i++){
					if(seoPath[i].indexOf(':') > 0 || seoPath[i].indexOf('-') === 0){
						seoPath.splice(i, 1);
						i--; // We just removed an element from the array
					}
				}
				
				return seoPath.join('/');
			},

			getRefinementsFromSEOPath : function(seoPath){

				var seoPath = seoPath.split('/');

				for(var i = 0; i < seoPath.length; i++){
					if(seoPath[i].indexOf(':') < 0 || seoPath[i].indexOf('-') === 0){
						seoPath.splice(i, 1);
						i--; // We just removed an element from the array
					}
				}
				
				return seoPath.join('/');
			},

			getKeywordsFromSEOPath : function(seoPath){

				var seoPath = seoPath.split('/');

				for(var i = 0; i < seoPath.length; i++){
					if(seoPath[i].indexOf('-') === 0){
						return seoPath[i];
					}
				}

				return '';
			}
		});

	}()));
	
}())


