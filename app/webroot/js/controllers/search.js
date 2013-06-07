(function(){
	
	var _util = window.LSP.utilities;
	
	_util.register('controller', 'search', (function(){
		var _this = {};
		var _app = window.LSP;
		var _api = _app.models.easyask;

		var IS_SINGLE_SELECT = false;

		var _state = {
			resultsPerPage : '20',
			page : 'first',
			sort : 'default',
			category : ''
		};

		var _attributeHistory = []; // [{name : attributeName, state : 'temporary or static'}]

		// {sort, resultsPerPage, page, category, attributes ({thing : [thing1, thing2]}), keywords, action ('advisor'), method ('CA_Search')}

		_this = {
			events : {
				search : {
					// onBeforeAPICall : function(e, data){
					// 	_state.path = data.xhrData.data.CatPath;
					// 	_app.controllers.application.pushState(_this, _state);
					// },

					onBeforeAPICall : function(e, data){
						$('.page-search').addClass('loading');
					},
					
					onAfterAPICall : function(e, data){
						$('.page-search').removeClass('loading');
					},

					onAfterAPICallSuccess : function(e, data){

						var navPathNodeList = data.response.source.navPath.navPathNodeList

						if(IS_SINGLE_SELECT){
							_state.category = navPathNodeList[navPathNodeList.length - 1].purePath || 'All Products';
						}else{
							// Remove everything except categories, then remove trailing /
							_state.category = (_api.parseCategoriesFromSEOPath(navPathNodeList[navPathNodeList.length - 1].seoPath)).replace(/\/$/, '');
						}

						_state.page = ((data.response.source.products || {}).itemDescription || {}).currentPage;
						_this.pushState();
					},

					onAfterAPICallFailure : function(e, data){
						console.error('Network Error', data);
						_this.renderFatalError();
					},

					onRemoveFilter : function(e, data){
						
						if(IS_SINGLE_SELECT){
							_this.removePathNode('AttribSelect=' + $(data.selector).data('attribute') + ' = \'' + $(data.selector).data('value') + '\'');
						}else{
							// Uncheck the option
							$('#refinementForm input[type="checkbox"][name="' + $(data.selector).data('attribute') + '[]"][value="' + $(data.selector).data('value') + '"]')
								.attr('checked', false)
								.change();
						}
						
					},

					onFilterAttribute : function(e, data){
						
						var name = $(data.selector).attr('name').replace('[]', '');

						if(IS_SINGLE_SELECT){
							_this.filterWithAttribute(name, $(data.selector).val());
						}else{

							// The basic idea here is, the first time you check a box it gets
							// added to the history, to account unchecking we make sure
							// all of the elements in history are present as checked boxes in the form

							// On the retuning request, the attributes will be marked as "static" or "temporary"
							// and will consequently be rendered differently.

							var formObject = _this.getSelectedAttributes();

							// If it's not part of the history (first time it's been checked), add it to the history
							// We can rely on the fact that doing attribute 1, attribute 2, attribute 1 selection
							// paths will never happen because we will be hiding them

							// If we have unselected another attribute (different from the last selected) then we need to
							// mark the last selected as static. This solves the use case of selecting two "Color" then "Artist" then
							// unselecting a "Color" and "Artist" should "collapse" into it's static form 
							var isInHistory = $.grep(_attributeHistory, function(a){ return a.name === name; }).length
							if(!isInHistory){
								_attributeHistory.push({name : name, displayState : 'temporary'});
							}else if(_attributeHistory[_attributeHistory.length - 1].name !== name){
								_attributeHistory[_attributeHistory.length - 1].displayState = 'static';
							}

							// Mark everything not curent as static
							for(var i = 0; i < _attributeHistory.length - 1; i++){
								_attributeHistory[i].displayState = 'static';
							}

							// Clear unnessesary history elements
							for(var i = 0; i < _attributeHistory.length; i++){

								// Chop off the last two characters "[]"
								var attributeName = _attributeHistory[i].name;

								// If the history element isn't in the form it means nothing is selected for
								// that attribute any longer
								if(!formObject[attributeName]){
									_attributeHistory.splice(i, 1);
								}
							}

							_this.filterWithAttributes(formObject);	
						}
						
					},

					onClearAllRefinements : function(e, data){
						_attributeHistory = [];
						_this.filterWithAttributes({});	
					},

					onLoadCategory : function(e, data){
						// .data() works best with lowercase names
						if($(data.selector).data('categoryid')){
							_this.loadCategory($(data.selector).data('categoryid'));
						}else if($(data.selector).data('path')){
							_this.loadCategory($(data.selector).data('path'), true);
						}
					},

					onRemoveCategory : function(e, data){
						var path = '/' + _state.category;
						var categoriesToRemove = $(data.selector).data('removepath').split('/');

						// Loop through and remove the sub categories
						for(var i = 0; i < categoriesToRemove.length; i++){
							if(categoriesToRemove[i].length > 0){
								path = path.replace('/' + categoriesToRemove[i], ''); // Begins the phrase
							}
						}
						_this.loadCategory(path, true);

					},

					onNextPage : function(e, data){
						_this.paginate('next');
					},

					onPreviousPage : function(e, data){
						_this.paginate('prev');
					},

					onSort : function(e, data){
						_state.sort = $(data.selector).val();
						_this.paginate('first');
					},

					onItemsPerPage : function(e, data){
						_state.resultsPerPage = $(data.selector).val();
						_this.paginate('first');
					},

					onShowCompactView : function(e, data){
						_this.changeView('gridView');
						_this.pushState();
					},

					onShowDetailsView : function(e, data){
						_this.changeView('listView');
						_this.pushState();
					}
				},
				application : {

					onSearchHashChange : function(e, data){
						var pulledState = _app.controllers.application.pullState(_this) || {};
						//pulledState.searchQuery = data.queryParameters.searchQuery; // add the query if it exists
						
						_state = _this.formatPullState(pulledState);

						_this.search(data.queryParameters.searchQuery);
						_this.changeView(_state.view);

					},

					onReady : function(e, data){
						$('#searchQuery').val(data.queryParameters.searchQuery).change();
					},
					
					onInit : function(e, data){

					}
				}
			},
			
			assets : {},

			getState : function(){
				return _state;
			},

			getSelectedAttributes : function(){
				return _util.formToObject($('#refinementForm')[0]);
			},

			pushState : function(){

				var pushedState = $.extend({}, _state);
				pushedState.category = {value : pushedState.category.replace(/\//g, '|'), uriEncode : false};

				return _app.controllers.application.pushState(_this, pushedState);
			},

			getState : function(){
				return _state;
			},

			formatPullState : function(state){
				if(state.category){
					state.category = state.category.replace(/\|/g, '/');
				}
				return _state;
			},

			// By keyword
			search : function(keywords){

				var payload = {
					action : 'advisor',
					method : 'CA_Search',
					keywords : keywords
				};

				return _api.request(_this, 'search', $.extend({}, _state, {isSingleSelect : IS_SINGLE_SELECT}, payload))
					.done(function(data){
						_this.renderPage(data.response.source);
					});
			},

			loadCategory : function(categoryPath, isAtomic){

				var payload = {
					action : 'advisor',
					method : 'CA_CategoryExpand',
					category : (isAtomic ? categoryPath : _state.category.replace(/\/$/, '') + '/' + categoryPath),
					attributes : _this.getSelectedAttributes()
				};

				// TODO : rename path to addedPath or something similar

				return _api.request(_this, 'loadCategory', $.extend({}, _state, {isSingleSelect : IS_SINGLE_SELECT}, payload))
					.done(function(data){
						_this.renderPage(data.response.source);
					});
			},

			filterWithAttributes : function(attributeHashMap){

				var payload = {
					action : 'advisor',
					method : 'CA_AttributeSelected',
					attributes : attributeHashMap
				};

				return _api.request(_this, 'filter', $.extend({}, _state, {isSingleSelect : IS_SINGLE_SELECT}, payload))
					.done(function(data){
						_this.renderPage(data.response.source);
					});
			},

			filterWithAttribute : function(attribute, value){
				var payload = {
					action : 'advisor',
					method : 'CA_AttributeSelected',
					attributes : {}
				};

				// Utilizing the attribute object notation in the api bridge
				payload.attributes[attribute] = [value];

				return _api.request(_this, 'filter', $.extend({}, _state, {isSingleSelect : IS_SINGLE_SELECT}, payload))
					.done(function(data){
						_this.renderPage(data.response.source);
					});
			},

			// breadcrumbClick : function(bc){
			//	var request = {
			//		requestAction : 'advisor',
			//		requestData : 'CA_BreadcrumbClick'
			//	};
			//	//var url = formURL() + '&RequestAction=advisor&RequestData=CA_BreadcrumbClick&CatPath='+encodeURIComponent(bc);
			//	//invoke(url);
			// },

			// loadPage : function(pageName){
			// 	var payload = {
			// 		action : 'navbar',
			// 		method : 'page' + pageName
			// 	};

			// 	return _api.request(_this, 'loadPage', $.extend({}, _state, payload));
			// },

			// Direction can be [first, last, next, prev]
			paginate: function(direction){

				var payload = {
					action : 'navbar',
					method : ($.isNumeric(direction) ? 'page' + direction : direction),
					currentPage : _state.page,
					attributes : _this.getSelectedAttributes()
				};

				return _api.request(_this, 'paginate', $.extend({}, _state, payload))
					.done(function(data){
						_this.renderSummary(data.response.source);
						_this.renderProducts(data.response.source);
					});

			},

			// removePathNode : function(node){
				
			// 	var payload = {
			// 		category : _state.category.replace('////' + node, ''),
			// 		RequestAction : 'advisor',
			// 		RequestData : 'CA_BreadcrumbRemove'
			// 	};

			// 	return _api.request(_this, 'removeNode', payload)
			// 		.done(function(data){
			// 			_this.renderPage(data.response.source);
			// 		});
			// },

			changeView : function(viewType){
				if(viewType === 'gridView' || viewType === 'listView'){
					$('#resultsContainer')
						.removeClass('gridView')
						.removeClass('listView')
						.addClass(viewType);

					_state.view = viewType;
				}
			},

			renderPage : function(easyAskDataObject){
				_this.renderSummary(easyAskDataObject);
				_this.renderSelectedRefinements(easyAskDataObject);
				_this.renderRefinements(easyAskDataObject);
				_this.renderProducts(easyAskDataObject);
			},

			renderSummary : function(easyAskDataObject){

				var path = _state.category;
				var currentPageNumber = ((easyAskDataObject.products || {}).itemDescription || {}).currentPage;
				var totalPages = ((easyAskDataObject.products || {}).itemDescription || {}).pageCount;

				var breadcrumbHTML = _util.parseMicroTemplate('templates-search-breadcrumbs', easyAskDataObject);

				var categories = easyAskDataObject.navPath._lsp.categoryNodes;
				var currentCategory = categories[categories.length - 1].englishName;
				$('#pageName').html(currentCategory);

				$('.currentPageNumber').html(currentPageNumber);
				$('.totalPages').html(totalPages);
				$('.numberOfResults').html(((easyAskDataObject.products || {}).itemDescription || {}).totalItems);

				$('select[data-action="sort"]').val(((easyAskDataObject.products || {}).itemDescription || {}).sortOrder);
				$('select[data-action="itemsPerPage"]').val(((easyAskDataObject.products || {}).itemDescription || {}).resultsPerPage);

				if(currentPageNumber === 1){
					$('*[data-action="previousPage"]').css('visibility', 'hidden');
				}else{
					$('*[data-action="previousPage"]').css('visibility', 'visible');
				}

				if(currentPageNumber === totalPages){
					$('*[data-action="nextPage"]').css('visibility', 'hidden');
				}else{
					$('*[data-action="nextPage"]').css('visibility', 'visible');
				}

				_app.controllers.application.attachEvents($('#breadcrumbs').html(breadcrumbHTML));

			},

			renderSelectedRefinements : function(easyAskDataObject){
				var selectedHTML = _util.parseMicroTemplate('templates-search-selectedRefinements', easyAskDataObject);
				_app.controllers.application.attachEvents($('#selectedRefinements').html(selectedHTML));
			},


			renderRefinements : function(easyAskDataObject){

				// Mark attributes._lsp.cached attributes with _attributeHistory states
				// Loop through the history, then loop through the cached attributes
				// looking to find the entry, and mark it with the saved state
				for(var i = 0; i < _attributeHistory.length; i++){
					for(var j = 0; j < easyAskDataObject.attributes._lsp.cached.length; j++){
						var cachedAttribute = easyAskDataObject.attributes._lsp.cached[j];

						if((_attributeHistory[i] || {}).name === cachedAttribute.name){
							easyAskDataObject.attributes._lsp.cached[j].displayState = _attributeHistory[i].displayState;
							break;
						}
					}
				}

				var refinementHTML = _util.parseMicroTemplate('templates-search-refinements', easyAskDataObject);
				_app.controllers.application.attachEvents($('#searchRefinements').html(refinementHTML));
			},

			renderProducts : function(easyAskDataObject){
				var entriesHTML = _util.parseMicroTemplate('templates-search-entries', easyAskDataObject);
				_app.controllers.application.attachEvents($('#searchEntries').html(entriesHTML));
			},

			renderFatalError : function(){
				console.error('Fatal Error');
				// var errorHTML = _util.parseMicroTemplate('templates-error', {
				// 	title : 'Something Big Has Happened',
				// 	message : 'Sorry about that, but something has gone seriously wrong.'
				// });
				// _app.controllers.application.attachEvents($('.page-search').html(errorHTML));
			}
		};
		
		return _this;

	})());

})();


//http://lonestarpercussion.prod.easyaskondemand.com/EasyAsk/apps/Advisor.jsp?callback=jQuery19106945341844111681_1370270730241&currentpage=first&forcepage=1&ResultsPerPage=20&defsortcols=&CatPath=All+Products&indexed=1&rootprods=1&oneshot=0&defarrangeby=%2F%2F%2FNONE%2F%2F%2F&disp=json&dct=nslonestarpercussion&requestAction=advisor&requestData=CA_Search&q=red&_=1370270730242
//http://easyaskqa.easyaskondemand.com/EasyAsk/apps/Advisor.jsp?indexed=1&rootprods=1&oneshot=1&defarrangeby=///NONE///&disp=json&dct=EcomDemo&ResultsPerPage=16&defsortcols=&RequestAction=advisor&RequestData=CA_Search&q=red&CatPath=All%20Products&callback=processResults&_=1370270814733


//http://easyaskqa.easyaskondemand.com/EasyAsk/apps/Advisor.jsp?callback=jQuery191007177389645949006_1369866039734&ResultsPerPage=20&defsortcols=&CatPath=All%252BProducts&indexed=1&rootprods=1&oneshot=1&defarrangeby=%2F%2F%2FNONE%2F%2F%2F&disp=json&dct=EcomDemo&RequestAction=advisor&RequestData=CA_AttributeSelected&AttribSel=&_=1369866039737

//http://easyaskqa.easyaskondemand.com/EasyAsk/apps/Advisor.jsp?callback=jQuery19105919753389898688_1369851007751&indexed=1&rootprods=1&oneshot=1&defarrangeby=%2F%2F%2FNONE%2F%2F%2F&disp=json&dct=EcomDemo&resultsPerPage=1&defSortCols=&catPath=All+Products&CatPath=Beauty+%26+Fragrance&RequestAction=advisor&RequestData=CA_CategoryExpand&_=1369851007754
//http://easyaskqa.easyaskondemand.com/EasyAsk/apps/Advisor.jsp?indexed=1&rootprods=1&oneshot=1&defarrangeby=///NONE///&disp=json&dct=EcomDemo&ResultsPerPage=16&defsortcols=&RequestAction=advisor&RequestData=CA_BreadcrumbClick&CatPath=All%20Products&callback=processResults&_=1369848043142
//http://easyaskqa.easyaskondemand.com/EasyAsk/apps/Advisor.jsp?indexed=1&rootprods=1&oneshot=1&defarrangeby=///NONE///&disp=json&dct=EcomDemo&resultsPerPage=50&defSortCols=&catPath=Beauty+%26+Fragrance&requestAction=advisor&requestData=CA_CategoryExpand&_=1369847843141
