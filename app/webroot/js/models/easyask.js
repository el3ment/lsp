(function(){

	var _util = window.LSP.utilities;
	var _models = window.LSP.models;
	
	_util.register('model', 'easyask', (function(){

		var _this = $.extend({}, _models.api);

		// var _dictionary = 'EcomDemo';
		// var _hostname = 'http://easyaskqa.easyaskondemand.com';
		
		var _dictionary = 'nslonestarpercussion';
		var _hostname = 'http://lonestarpercussion.prod.easyaskondemand.com';
		var _sessionId;

		var _attributeHistory = {};

		// Extends the generic API
		return $.extend(_this, {
			
			_timeout : 30000,

			_url : function(controller, payload){
				return _hostname + '/EasyAsk/apps/Advisor.jsp';
			},
			_payload : function(controller, payload){

				// payload : 
				// 	{sort, resultsPerPage, page, category, attributes ({thing : [thing1, thing2]}), keywords, action ('advisor'), method ('CA_Search')}

				var formattedPayload = {
					RequestAction : payload.action,
					RequestData : payload.method,
					currentpage : payload.page || 1,
					forcepage : 1,
					ResultsPerPage : payload.resultsPerPage || 24,
					defsortcols : (payload.sort === 'default' ? '' : payload.sort),
					indexed : 1, 
					rootprods : 1,
					oneshot : 1,
					//sessionID : _sessionId,
					defarrangeby : '///NONE///',
					disp : 'json',
					dct : _dictionary,
					q : (payload.keywords && payload.keywords.length) ? payload.keywords : undefined,
					AttribSel : _this.combineSimilarAttributesForRequest(payload.attribute, payload.allAttributes)
				};

				// if(payload.isSingleSelect){
				// 	formattedPayload.CatPath = payload.category;
				// 	formattedPayload.AttribSel = this.buildSingleAttributeString(payload.allAttributes);
				// }else{
				// 	// Build the category path by hand
				formattedPayload.CatPath = _util.cleanArray([(payload.category || '').replace('All Products', '') , _this.combineAndRemoveAllForPath(payload.attribute, payload.allAttributes), this.buildKeywordString(payload.keywords)])
					.join('/')
					.replace(/^\/{1,}-/, '-'); // It's possible it get a keyword search like /-keyword... which is interpreted as a category, it's best to clean this up
				//}

				if($.isEmptyObject(payload.allAttributes) && !payload.attribute && payload.method === 'CA_AttributeSelected'){
					formattedPayload.RequestData = 'CA_BreadcrumbClick'; // If there are no attributes, just load the category
				}

				// If we are trying to remove the last breadcrumb - this was a weird bug, and I'm still not super sure if it's
				// totally fixed.
				if(formattedPayload.RequestData === 'CA_BreadcrumbRemove' && !formattedPayload.q && !formattedPayload.AttribSel){
					formattedPayload.RequestData = 'CA_CategoryExpand';
				}

				if(formattedPayload.RequestData !== 'CA_Search'){
					delete formattedPayload.q;
				}

				if(formattedPayload.ResultsPerPage > 96 || (formattedPayload.ResultsPerPage + '' || '').toLowerCase() === 'all'){
					formattedPayload.ResultsPerPage = 96;
				}

				// As a form of cleanup - remove a trailing / from a category request
				formattedPayload.CatPath = formattedPayload.CatPath.replace(/\/$/, '').replace(/^\//, '').replace(/\/\//g, '/'); // Remove trailing / if it exists

				return formattedPayload;			
			},

			_isSuccess : function(responseData){
				return (responseData || {}).returnCode === 0;
			},

			isRedirect : function(responseData){
				return /((http|https)(:\/\/))?([a-zA-Z0-9]+[.]{1}){2}[a-zA-z0-9]+(\/{1}[a-zA-Z0-9]+)*\/?/.test(responseData.errorMsg) || /^\//.test(responseData.errorMsg); 
			},

			_afterSuccess : function(responseData){

				if(_this.isRedirect(responseData)){
					document.location = responseData.errorMsg;
					return;
				}
				
				_sessionId = responseData.sessionID;

				responseData.source = _this.clean(responseData.source);
				
				responseData.source.navPath._lsp = responseData.source.navPath._lsp || {};
				responseData.source.navPath._lsp.categoryNodes = _this.getCategoryNodes(responseData.source);
				responseData.source.navPath._lsp.refinementNodes = _this.getRefinementNodes(responseData.source);
				responseData.source.navPath._lsp.searchNode = _this.getSearchNode(responseData.source);
				
				this.cacheAttributes(responseData.source);
				responseData.source.attributes = responseData.source.attributes || {};
				responseData.source.attributes._lsp = responseData.source.attributes._lsp || {};
				responseData.source.attributes._lsp.cached = _this.injectCachedAttributes(responseData.source);

				responseData.source._lsp = responseData.source._lsp || {};
				responseData.source._lsp.query = _this.parseCommentaryForDidYouMean(responseData.source.commentary);

				for(var i = 0; i < ((responseData.source.products || {}).items || {}).length; i++){
					if(responseData.source.products.items[i].Matrix_Values){
						var children = $.parseJSON(responseData.source.products.items[i].Matrix_Values);
						responseData.source.products.items[i]._formattedMatrixObject = _this.parseMatrixChildren(children);
					}
				}

				return responseData;
			},

			clean : function(easyAskDataSourceObject){

				// Categories - Remove 'School'
				for(var i = 0; i < ((easyAskDataSourceObject.categories || {}).categoryList || []).length; i++){
					if(easyAskDataSourceObject.categories.categoryList[i].name === 'School'){
						easyAskDataSourceObject.categories.categoryList.splice(i, 1);
						i--;
					}
				}
				
				// if(((easyAskDataSourceObject.categories || {}).categoryList || []).length === 0){
				// 	delete easyAskDataSourceObject.categories;
				// }

				// Refinements
				var value;
				for(var i = 0; i < ((easyAskDataSourceObject.attributes || {}).attribute || {}).length; i++){
					for(var j = 0; j < (easyAskDataSourceObject.attributes.attribute[i].attributeValueList || {}).length; j++){
						value = easyAskDataSourceObject.attributes.attribute[i].attributeValueList[j].attributeValue;
						if(value.substr(0, 1) === '!' || value === 'None' || value === 'Unknown' || value === 'Required'){
							easyAskDataSourceObject.attributes.attribute[i].attributeValueList.splice(j, 1);
							j--;
						}
					}
					for(var j = 0; j < (easyAskDataSourceObject.attributes.attribute[i].initialAttributeValueList || {}).length; j++){
						value = easyAskDataSourceObject.attributes.attribute[i].initialAttributeValueList[j].attributeValue;
						if(value.substr(0, 1) === '!' || value === 'None' || value === 'Unknown' || value === 'Required'){
							easyAskDataSourceObject.attributes.attribute[i].initialAttributeValueList.splice(j, 1);
							easyAskDataSourceObject.attributes.attribute[i].initDispLimit--;
							j--;
						}
					}
					if(easyAskDataSourceObject.attributes.attribute[i].attributeValueList.length === 0){
						easyAskDataSourceObject.attributes.attribute.splice(i, 1);
						i--;
					}
				}

				if(((easyAskDataSourceObject.attributes || {}).attribute || []).length === 0){
					delete easyAskDataSourceObject.attributes;
				}

				return easyAskDataSourceObject;
			
			},


			// AttribSel needs to have all the options for a particular attribute
			// in the same request -- some of those are contained in the path - so
			// we need to remove them from the path, and add them to the AttribSel
			// parameter - combineAndRemoveAllForPath removes them for the path
			combineAndRemoveAllForPath : function(singleAttribute, allAttributes){
				if(allAttributes && singleAttribute){

					var singleAttributeName = singleAttribute.replace(/:.*/, '');
					allAttributes = allAttributes.split('/');

					for(var i = 0; i < allAttributes.length; i++){
						if(allAttributes[i].replace(/:.*/, '') === singleAttributeName){
							allAttributes.splice(i, 1);
							i--;
						}
					}
					return allAttributes.join('/');
				}

				return allAttributes;
				
			},

			// AttribSel needs to have all the options for a particular attribute
			// in the same request -- some of those are contained in the path - so
			// we need to remove them from the path, and add them to the AttribSel
			// parameter - combineSimilarAttributesForRequest combines them for
			// the request
			combineSimilarAttributesForRequest : function(singleAttribute, allAttributes){
				
				if(allAttributes && singleAttribute){

					var singleAttributeName = singleAttribute.replace(/:.*/, '');
					allAttributes = allAttributes.split('/');

					for(var i = 0; i < allAttributes.length; i++){
						if(allAttributes[i].replace(/:.*/, '') === singleAttributeName){
							singleAttribute += ';' + allAttributes[i];
						}
					}

					return singleAttribute;
				}

				return singleAttribute;
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


				// Mark everything as 'cached'
				$.each(_attributeHistory, function(i, cachedAttribute){
					_attributeHistory[cachedAttribute.attribute.name].isFromCached = true;
				});

				// Add all returned attributes to the cache, marking them as not cached
				for(var i = 0; i < ((easyAskDataSourceObject.attributes || {}).attribute || {}).length; i++){
					var attribute = easyAskDataSourceObject.attributes.attribute[i];
					_attributeHistory[attribute.name] = {index: i, attribute: attribute, isFromCached: false};
					returnAttributeMap[attribute.name] = true; // Small lookup map
				}

				// Clean cachedAttributes that shoudn't be there
				$.each(_attributeHistory, function(i, cachedAttribute){
					
					// If it's not been returned with Attributes
					var fullPath = $(easyAskDataSourceObject.navPath.navPathNodeList).last()[0].seoPath;
					var attributeSEOName = cachedAttribute.attribute.attributeValueList[0].nodeString.replace(/:.*/, '');

					// If it's neither returned, nor selected, it's ok to delete it from the cache
					if(!returnAttributeMap[cachedAttribute.attribute.name] && fullPath.indexOf(attributeSEOName+':') < 0){					
						delete _attributeHistory[cachedAttribute.attribute.name];
					}
				});

				return returnAttributeMap;

			},

			injectCachedAttributes : function(easyAskDataSourceObject){

				var lspAttributes = [];
				var _attributeHistoryArray = [];

				// Caching attributes and storing them in a map loses ordinality
				// Convert map to array, then sort by index
				$.each(_attributeHistory, function(key, attribute){
					_attributeHistoryArray.push(attribute);
				});
				_attributeHistoryArray.sort(function(a, b){

					if(a.index < b.index) return -1;
					if(a.index > b.index) return 1;
					if(a.isFromCached && !b.isFromCached) return -1;
					if(b.isFromCached && !a.isFromCached) return 1;

					return 0;
				});

				// Loop through cached attributes
				// See if the attribute came down in the response, if it is then use it
				// if it's not - then use the cached version.
				$.each(_attributeHistoryArray, function(i, cachedAttribute){
					var found = false;
					for(var j = 0; j < ((easyAskDataSourceObject.attributes || {}).attribute || {}).length; j++){
						if(easyAskDataSourceObject.attributes.attribute[j].attributeName === cachedAttribute.attribute.name){
							found = true;
							lspAttributes.push(easyAskDataSourceObject.attributes.attribute[j]);
						}
					}
					if(!found){
						lspAttributes.push(cachedAttribute.attribute);
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

						if(navPathNodeList[i].englishName !== 'All Products' && navPathNodeList[i].englishName !== 'School'){
							var len = categoryNodes.push(navPathNodeList[i]);
							var newCategoryName = categoryNodes[len - 1].seoPath;

							// Grab the stuff after newCategoryName
							categoryNodes[len - 1].removePath = pureCategoryPath.substr(pureCategoryPath.indexOf(newCategoryName) + newCategoryName.length, pureCategoryPath.length);
						}
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


			// Creates an array of refinement node objects
			// and splits up each attribute selection into it's own
			// node
			// Is then accessible at .navPath._lsp
			getRefinementNodes : function(easyAskDataSourceObject){
				var attributeNodes = [];

				for(var i = 0; i < easyAskDataSourceObject.navPath.navPathNodeList.length; i++){
					
					var node = easyAskDataSourceObject.navPath.navPathNodeList[i];

					if(node.navNodePathType === 2){ // If it is a refinement

						var fullPath = decodeURIComponent(easyAskDataSourceObject.navPath.fullPath).replace(/\+/g, ' ');

						// A group is a collection of refinements of the same type (two manufactuers, or three diameters)
						var groups = node.englishName.substring(1, node.englishName.length - 2); // Remove starting and trailing parens
						groups = groups.split('\'); (');

						for(var k = 0; k < groups.length; k++){
							
							var attributeNode = groups[k].split('\' or ');

							for(var j = 0; j < attributeNode.length; j++){

								// Easy ask will sometimes append random numbers to the end of node values, and since convertToSEOString
								// can't figure it out - we need to search the seoPath, find and use the right nodeString
								var attribute = attributeNode[j].split(' = \''); // Grab the name [0] and value [1] 
								var initialNodeString = this.convertToSEOString(attribute[0]+':'+attribute[1]); // the part we know
								var additionalText = _util.findBetween(initialNodeString, ';', node.seoPath); // the potential part we don't

								attributeNodes.push({
									attribute : attribute[0],
									value : attribute[1],
									nodeString : initialNodeString + additionalText
								});
							}
						}

						
					}
				}

				return attributeNodes;
			},

			parseMatrixChildren : function(easyAskMatrixArray){

				var optionObject = {};
				var productObject= {};
				var easyAskMatrixArray = (typeof easyAskMatrixArray === 'string' ? $.parseJSON(easyAskMatrixArray) : easyAskMatrixArray) || [];
				
				for(var i = 0; i < easyAskMatrixArray.length; i++){
					var id = easyAskMatrixArray[i][0],
						item = easyAskMatrixArray[i][1].split('|'),
						label = item[0],
						value = item[1],
						index = item[2],
						imageUrl = item[3],
						mpn = item[4],
						onlinePrice = item[5],
						msrp = item[6],
						stockMessage = item[7];
						waysToSave = item[8];
						specialFeature = item[9];

					optionObject[label] = optionObject[label] || {};
					optionObject[label][value] = optionObject[label][value] || [];
					optionObject[label][value].push(id);

					productObject[id] = productObject[id] || {};
					productObject[id].options = productObject[id].options || {};
					productObject[id].options[label] = productObject[id].options[label] || {};
					productObject[id].options[label] = value;

					productObject[id].data = productObject[id].data || {};
					productObject[id].data.imageUrl = imageUrl;
					productObject[id].data.mpn = mpn;
					productObject[id].data.onlinePrice = onlinePrice;
					productObject[id].data.msrp = msrp;
					productObject[id].data.stockMessage = stockMessage;
					productObject[id].data.waysToSave = waysToSave;
					productObject[id].data.specialFeature = specialFeature;

				}

				return {options : optionObject, products : productObject};
			},

			filterMatrixChildren : function(easyAskMatrixData, filters){
				
				var filteredOptionsObject = {};
				var filteredProducts = {};
				
				$.each(easyAskMatrixData.products, function(id, options){
					
					// Loop through the products and check to see if any filters don't match
					for(var key in filters){
						if(filters.hasOwnProperty(key)){
							if(options.options[key] && options.options[key] != filters[key]){
								return;
							}
						}
					}

					// If we make it all the way through the filters, it means the product matches
					filteredProducts[id] = options;

				});

				// Create the options from the products
				$.each(filteredProducts, function(id, options){
					$.each(options.options, function(label, value){

						// // If option isn't part of the filters
						if(!filters[label]){
							// We avoid adding filtered options here because 1) state dosen't change like it does
							// for search refinements (where we WANT easyask to return selected attributes, but they don't)
							// and 2) because it makes replacing them easier - just loop through the filteredOptions and if it exists in the object, it needs to get updated.
							filteredOptionsObject[label] = filteredOptionsObject[label] || {};
							filteredOptionsObject[label][value] = filteredOptionsObject[label][value] || [];
							filteredOptionsObject[label][value].push(id);
						}
					});
				});

				return filteredOptionsObject;
			},


			convertToSEOString : function(string){
				return string.replace(/'/g, '') // remove apostrphes which are skipped by the next line
					.replace(/[^A-Za-z0-9:]/g, '-') //Everything not a A-Z or 0-9
					.replace(/-{1,}/g, '-') // two or more -
					.replace(/-$/, '') // end with -
					.replace(/:-/, ':'); // remove starting - from any values
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
			},
			parseCommentaryForDidYouMean : function(commentaryString){
				
				var returnObject = {};

				if(commentaryString.length > 0 && commentaryString.indexOf('Corrected Word') > -1){
					var spaced = commentaryString.split(' ');

					returnObject.originalQuery = _util.findBetween('Corrected Word: ', ' is ', commentaryString);
					returnObject.assumedQuery =  _util.findBetween(' is ', '; ', commentaryString);
					returnObject.otherSuggestions = (_util.findBetween(' could be  ', '~END', commentaryString + '~END') || '').split(', ');

				}
				
				return returnObject;

			}
		});

	}()));
	
}());