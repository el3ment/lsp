(function(){
	
	var _util = window.LSP.utilities;
	
	_util.register('controller', 'search', (function(){
		var _this = {};
		var _app = window.LSP;
		var _api = _app.models.easyask;

		var _state = {
			resultsPerPage : '20',
			page : 'first',
			sort : '',
			category : 'All Products',
			keywords : ''
		};

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
						_state.category = navPathNodeList[navPathNodeList.length - 1].purePath || 'All Products';

						// _state.category = data.response.source.navPath.pureCategoryPath;
						_state.page = ((data.response.source.products || {}).itemDescription || {}).currentPage;
						_this.pushState();
					},

					onAfterAPICallFailure : function(e, data){
						console.error('Network Error', data);
						_this.renderFatalError();
					},

					onRemoveFilter : function(e, data){
						
						// Uncheck the option
						//$('#refinementForm input[type="checkbox"][name="' + $(data.selector).data('attribute') + '[]"][value="' + $(data.selector).data('value') + '"]').attr('checked', false);

						// Send the request
						//_this.filterWithAttributes(_util.formToObject($('#refinementForm')[0]));

						_this.removePathNode('AttribSelect=' + $(data.selector).data('attribute') + ' = \'' + $(data.selector).data('value') + '\'')

					},

					onFilterAttribute : function(e, data){
						//_this.filterWithAttributes(_util.formToObject($('#refinementForm')[0]));
						var name = $(data.selector).attr('name');
						_this.filterWithAttribute(name.substr(0, name.length - 2), $(data.selector).val());
					},

					onClearAllFilters : function(e, data){

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
						var path = _state.category;
						var categoriesToRemove = $(data.selector).data('removepath').split('////');

						// Loop through and remove the sub categories
						for(var i = 0; i < categoriesToRemove.length; i++){
							if(categoriesToRemove[i].length > 0){
								path = path.replace('////' + categoriesToRemove[i], '');
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
						_this.pushState(_this, _state);
					},

					onShowDetailsView : function(e, data){
						_this.changeView('listView');
						_this.pushState(_this, _state);
					}
				},
				application : {

					onSearchHashChange : function(e, data){
						var pulledState = _app.controllers.application.pullState(_this) || {};
						//pulledState.searchQuery = data.queryParameters.searchQuery; // add the query if it exists
						
						$.extend(_state, pulledState);

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

			pushState : function(){
				//return _app.controllers.application.pushState(_this, _state);
			},

			// By keyword
			search : function(keywords){

				var payload = {
					action : 'advisor',
					method : 'CA_Search',
					keywords : keywords
				};

				return _api.request(_this, 'search', $.extend(_state, payload))
					.done(function(data){
						_this.renderPage(data.response.source);
					});
			},

			loadCategory : function(categoryPath, isAtomic){

				var payload = {
					action : 'advisor',
					method : 'CA_CategoryExpand',
					category : (isAtomic ? categoryPath : _state.category + '////' + categoryPath)
				};

				// TODO : rename path to addedPath or something similar

				return _api.request(_this, 'loadCategory', $.extend(_state, payload))
					.done(function(data){
						_this.renderPage(data.response.source);
					});
			},

			// filterWithAttributes : function(attributeHashMap){

			// 	var payload = {
			// 		action : 'advisor',
			// 		method : 'CA_AttributeSelected',
			// 		attributes : attributeHashMap
			// 	};

			// 	return _api.request(_this, 'filter', $.extend(_state, payload))
			// 		.done(function(data){
			// 			_this.renderProducts(data.response.source);
			// 			_this.renderSummary(data.response.source);
			// 			_this.renderSelectedRefinements(data.response.source);
			// 		});
			// },

			filterWithAttribute : function(attribute, value){
				var payload = {
					action : 'advisor',
					method : 'CA_AttributeSelected',
					attributes : {}
				};

				// Utilizing the attribute object notation in the api bridge
				payload.attributes[attribute] = [value];

				return _api.request(_this, 'filter', $.extend(_state, payload))
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

			loadPage : function(pageName){
				var payload = {
					RequestAction : 'navbar',
					RequestData : 'page' + pageName
				};

				return _api.request(_this, 'loadPage', payload);
			},

			// Direction can be [first, last, next, prev]
			paginate: function(direction){

				var payload = {
					RequestAction : 'navbar',
					RequestData : ($.isNumeric(direction) ? 'page' + direction : direction),
					currentpage : _state.page
				};

				return _api.request(_this, 'paginate', payload)
					.done(function(data){
						_this.renderSummary(data.response.source);
						_this.renderProducts(data.response.source);
					});

			},

			removePathNode : function(node){
				
				var payload = {
					category : _state.category.replace('////' + node, ''),
					RequestAction : 'advisor',
					RequestData : 'CA_BreadcrumbRemove'
				};

				return _api.request(_this, 'removeNode', payload)
					.done(function(data){
						_this.renderPage(data.response.source);
					});
			},

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

				var path = easyAskDataObject.navPath.pureCategoryPath;
				var categories = path.split('////');
				var currentCategory = categories[categories.length - 1];
				var currentPageNumber = easyAskDataObject.products.itemDescription.currentPage;
				var totalPages = easyAskDataObject.products.itemDescription.pageCount;

				var breadcrumbHTML = _util.parseMicroTemplate('templates-search-breadcrumbs', easyAskDataObject);

				$('.currentPageNumber').html(currentPageNumber);
				$('.totalPages').html(totalPages);
				$('.numberOfResults').html(easyAskDataObject.products.itemDescription.totalItems);
				$('#pageName').html(currentCategory);

				$('select[data-action="sort"]').val(easyAskDataObject.products.itemDescription.sortOrder);
				$('select[data-action="itemsPerPage"]').val(easyAskDataObject.products.itemDescription.resultsPerPage);

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
				var refinementHTML = _util.parseMicroTemplate('templates-search-refinements', easyAskDataObject);
				_app.controllers.application.attachEvents($('#searchRefinements').html(refinementHTML));
			},

			renderProducts : function(easyAskDataObject){
				var entriesHTML = _util.parseMicroTemplate('templates-search-entries', easyAskDataObject);
				$('')
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
