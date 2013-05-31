(function(){
	
	var _util = window.LSP.utilities;
	
	_util.register('controller', 'search', (function(){
		var _this = {};
		var _app = window.LSP;
		var _api = _app.models.easyask;

		var _state = {
			resultsPerPage : '20',
			page : 'first',
			sort : '-default-',
			path : 'All Products'
		};

		_this = {
			events : {
				search : {
					// onBeforeAPICall : function(e, data){
					// 	_state.path = data.xhrData.data.CatPath;
					// 	_app.controllers.application.pushState(_this, _state);
					// },
					onAfterAPICallSuccess : function(e, data){
						_state.path = data.response.source.navPath.pureCategoryPath;
						_state.page = data.response.source.products.itemDescription.currentPage;
						_app.controllers.application.pushState(_this, _state);
					},
					onAfterAPICallFailure : function(e, data){
						alert('error');
					},
					onRemoveFilter : function(e, data){
						_this.removePathNode(
							decodeURIComponent($(data.selector).data('previousnodepath')) // navNode's paths are URI encoded
							.replace(/\+/g, ' ') // URI Decode leaves +'s
						);
					},
					onFilterAttribute : function(e, data){
						_this.filterWithAttributes(_util.formToObject($('#refinementForm')[0]));
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
						$('#resultsContainer').addClass('gridView').removeClass('listView');
					},
					onShowDetailsView : function(e, data){
						$('#resultsContainer').addClass('listView').removeClass('gridView');
					}
				},
				application : {

					onHashChange : function(e, data){
						console.log('hashchange');
						$.extend(_state, _app.controllers.application.pullState(_this));
						_this.loadCategory();
					},

					onReady : function(e, data){

					},
					
					onInit : function(e, data){
						
					}
				}
			},
			
			assets : {},
			getCurrentPage : function(){
				return _state.page;
			},

			getSort : function(){
				return _state.sort;
			},
			
			getResultsPerPage : function(){
				return _state.resultsPerPage;
			},

			getPath : function(){
				return _state.path;
			},

			// By keyword
			search : function(keywords){
				//var path = ;
				var payload = {
					requestAction : 'advisor',
					requestData : 'CA_Search',
					q : keywords,
					catPath : 'All Products'
				};

				return _api.request(_this, 'search', payload)
					.done(function(data){
						_this.renderPage(data.response.source);
					});
			},

			loadCategory : function(categoryPath, isAtomic){
				
				var payload = {
					RequestAction : 'advisor',
					RequestData : 'CA_CategoryExpand'
				};

				// If isAtomic is false (default) then it appends categoryPath to the current path
				// if it's true, then it uses the entire path
				if(isAtomic){
					payload.CatPath = categoryPath;
				}else{
					payload.path = categoryPath;
				}

				return _api.request(_this, 'loadCategory', payload)
					.done(function(data){
						_this.renderPage(data.response.source);
					});
			},

			filterWithAttributes : function(attributeHashMap){

				// TODO : attribsel escape bugs (like, an equals in the val, or quotes, etc)

				// Merge attributes into name=value format, 
				var attributes = [];
				$.each(attributeHashMap, function(name, valueArray){
					$.each(valueArray, function(index, selectedValue){
						// Fully qualify each selected option
						attributes.push(name + ' = \'' + selectedValue + '\'');
					});
				});

				console.log(attributes);

				var payload = {
					RequestAction : 'advisor',
					RequestData : 'CA_AttributeSelected',
					AttribSel : attributes.join(';;;;') // Merge into name=value;;;;name=value
				};

				return _api.request(_this, 'filter', payload)
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
					requestAction : 'navbar',
					requestData : 'page' + pageName
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

			removePathNode : function(path){
				
				var payload = {
					CatPath : path,
					RequestAction : 'advisor',
					RequestData : 'CA_BreadcrumbRemove'
				};

				return _api.request(_this, 'paginate', payload)
					.done(function(data){
						_this.renderPage(data.response.source);
					});
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
				_app.controllers.application.attachEvents($('#searchEntries').html(entriesHTML));
			}
		};
		
		return _this;

	})());

})();


//http://easyaskqa.easyaskondemand.com/EasyAsk/apps/Advisor.jsp?callback=jQuery191007177389645949006_1369866039734&ResultsPerPage=20&defsortcols=&CatPath=All%252BProducts&indexed=1&rootprods=1&oneshot=1&defarrangeby=%2F%2F%2FNONE%2F%2F%2F&disp=json&dct=EcomDemo&RequestAction=advisor&RequestData=CA_AttributeSelected&AttribSel=&_=1369866039737

//http://easyaskqa.easyaskondemand.com/EasyAsk/apps/Advisor.jsp?callback=jQuery19105919753389898688_1369851007751&indexed=1&rootprods=1&oneshot=1&defarrangeby=%2F%2F%2FNONE%2F%2F%2F&disp=json&dct=EcomDemo&resultsPerPage=1&defSortCols=&catPath=All+Products&CatPath=Beauty+%26+Fragrance&RequestAction=advisor&RequestData=CA_CategoryExpand&_=1369851007754
//http://easyaskqa.easyaskondemand.com/EasyAsk/apps/Advisor.jsp?indexed=1&rootprods=1&oneshot=1&defarrangeby=///NONE///&disp=json&dct=EcomDemo&ResultsPerPage=16&defsortcols=&RequestAction=advisor&RequestData=CA_BreadcrumbClick&CatPath=All%20Products&callback=processResults&_=1369848043142
//http://easyaskqa.easyaskondemand.com/EasyAsk/apps/Advisor.jsp?indexed=1&rootprods=1&oneshot=1&defarrangeby=///NONE///&disp=json&dct=EcomDemo&resultsPerPage=50&defSortCols=&catPath=Beauty+%26+Fragrance&requestAction=advisor&requestData=CA_CategoryExpand&_=1369847843141
