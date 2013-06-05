(function(){

	var _util = window.LSP.utilities;
	var _models = window.LSP.models;
	
	_util.register('model', 'easyask', (function(){

		var _dictionary = 'nslonestarpercussion';
		//var _dictionary = 'EcomDemo';
		var _hostname = 'http://lonestarpercussion.prod.easyaskondemand.com';
		//var _hostname = 'http://easyaskqa.easyaskondemand.com';
		
		var _this = $.extend({}, _models.api);

		var _sessionId;

		// Extends the generic API
		return $.extend(_this, {
			_url : function(controller, payload){
				return _hostname + '/EasyAsk/apps/Advisor.jsp';
			},
			_payload : function(controller, payload){

				// payload : 
				// 	{sort, resultsPerPage, page, category, attributes ({thing : [thing1, thing2]}), keywords, action ('advisor'), method ('CA_Search')}

				return {
					RequestAction : payload.action,
					RequestData : payload.method,
					AttribSel : this.buildAttributeString(payload.attributes),
					currentpage : payload.page,
					forcepage : 1,
					ResultsPerPage : payload.resultsPerPage,
					defsortcols : payload.sort,
					CatPath : payload.category,
					indexed : 1, 
					rootprods : 1,
					oneshot : 0,
					sessionID : _sessionId,
					defarrangeby : '///NONE///',
					disp : 'json',
					dct : _dictionary,
					q : payload.keywords
				};
			},
			_isSuccess : function(responseData){
				return (responseData || {}).returnCode === 0;
			},
			_afterSuccess : function(responseData){
				_sessionId = responseData.sessionID;
				
				responseData.source.navPath._lsp = responseData.source.navPath._lsp || {};
				responseData.source.navPath._lsp.categoryNodes = _this.getCategoryNodes(responseData.source);
				responseData.source.navPath._lsp.refinementNodes = _this.getRefinementNodes(responseData.source);

				return responseData;
			},

			buildKeywordString : function(keywords){
				return (keywords ? 'UserSearch1=' + keywords : null);
			},

			buildAttributeString : function(attributeHashMap){
				
				var attributes = [];

				if(attributeHashMap){
					$.each(attributeHashMap, function(name, valueArray){

						var selections = [];

						$.each(valueArray, function(index, selectedValue){
							// If index is null (it's the first index) add attribSel to the name
							selections.push(name + ' = \'' + selectedValue + '\'');
						});

						attributes.push(selections.join(';;;;'));

					});
				}

				return _util.cleanArray(attributes).join('////');

			},

			getCategoryNodes : function(easyAskDataSourceObject){
				
				var categoryNodes = [];
				var pureCategoryPath = easyAskDataSourceObject.navPath.pureCategoryPath;

				for(var i = 0; i < easyAskDataSourceObject.navPath.navPathNodeList.length; i++){
					if(easyAskDataSourceObject.navPath.navPathNodeList[i].navNodePathType === 1){
						
						var len = categoryNodes.push(easyAskDataSourceObject.navPath.navPathNodeList[i]);
						var newCategoryName = categoryNodes[len - 1].value;

						// Grab the stuff after newCategoryName
						categoryNodes[len - 1].postFixCategories = pureCategoryPath.substr(pureCategoryPath.indexOf(newCategoryName) + newCategoryName.length, pureCategoryPath.length);

					}
				}

				return categoryNodes;

			},

			getRefinementNodes : function(easyAskDataSourceObject){
				var attributeNodes = [];

				// Splits the attributes up one-by-one and stores them in a convinent object

				for(var i = 0; i < easyAskDataSourceObject.navPath.navPathNodeList.length; i++){
					if(easyAskDataSourceObject.navPath.navPathNodeList[i].navNodePathType === 2){
						
						var node = easyAskDataSourceObject.navPath.navPathNodeList[i];
						var attributeNode = node.englishName.substring(1, node.englishName.length - 2).split('\' or ');
						var fullPath = decodeURIComponent(easyAskDataSourceObject.navPath.fullPath).replace(/\+/g, ' ');

						for(var j = 0; j < attributeNode.length; j++){
							var attribute = attributeNode[j];
							attribute = attribute.split(' = \'');
							attributeNodes.push({
								attribute : attribute[0],
								value : attribute[1],

								// removePath is the path without the attribute
								removePath : fullPath.replace(attribute[0] + ' = \'' + attribute[1]+ '\'', '')
							});
						}
					}
				}

				return attributeNodes;
			}
		});

	}()));
	
}())


