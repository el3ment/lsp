(function(){
	
	var _util = window.LSP.utilities;
	
	_util.register('controller', 'search', (function(){
		var _this = {};
		var _app = window.LSP;
		var _api = _app.models.easyask;

		var IS_SINGLE_SELECT = false;

		var _isFirstRequest = true;

		var _defaultState = {
			// resultsPerPage : '24',
			page : '1'
			// sort : 'default',
			// category : '',
			// allAttributes : ''
		};
		var _state = {};

		var _attributeHistory = []; // [{name : attributeName, state : 'temporary or static'}]

		var _activeDataObject = {};
		// {sort, resultsPerPage, page, category, attributes ({thing : [thing1, thing2]}), keywords, action ('advisor'), method ('CA_Search')}

		_this = {
			events : {
				search : {
					// onBeforeAPICall : function(e, data){
					// 	_state.path = data.xhrData.data.CatPath;
					// 	_app.controllers.application.pushState(_this, _state);
					// },

					onBeforeAPICall : function(e, data){
						var searchTemplate = $('#templates-search-page');

						if(searchTemplate.length){
							var height = $('.page-generic').height();
							$('.page-search').addClass('loading');
						}else{
							alert("Unfortunately it appears the templates can't be loaded, please call to complete your order");
							_gaq.push(['_trackEvent', 'search', 'error', 'templatesCannotBeLoaded']);

							return false;
						}
					},
					
					onAfterAPICall : function(e, data){
						$('.page-search, .page-generic').removeClass('loading');
						$('html').removeClass('search-loading');
						_isFirstRequest = false;
					},

					onAfterAPICallSuccess : function(e, data){

						if(data.response){

							var navPathNodeList = data.response.source.navPath.navPathNodeList;

							// Remove everything except categories, then remove trailing /
							_state.category = (_api.getCategoriesFromSEOPath(navPathNodeList[navPathNodeList.length - 1].seoPath)).replace(/\/$/, '');
							_state.category = _state.category.replace(/\/.*\/.*\//, '/');
							
							_state.allAttributes = (_api.getRefinementsFromSEOPath(navPathNodeList[navPathNodeList.length - 1].seoPath)).replace(/\/$/, '');
							_state.keywords = decodeURIComponent((_api.getKeywordsFromSEOPath(navPathNodeList[navPathNodeList.length - 1].seoPath)).replace(/\-/g, ' ').replace(/^ /, ''));
							_state.page = ((data.response.source.products || {}).itemDescription || {}).currentPage;
							
							// Set the activeDataObject, used to rebuild matrix option selections
							_activeDataObject = data;

							// If we don't scroll first - the scroll position will be saved
							// and you will jump around when clicking the back button
							$.when(_this.scrollToFirst()).done(function(){
								// onReady and onStateChange make use of preventPushState because those requests are
								// administrative and shouldn't create new history entries
								if(!data.xhrData.passthrough.preventPushState){
									_this.pushState();
								}
								
							});
						}
					},

					onAfterAPICallFailure : function(e, data){
						_this.renderFatalError();
					},

					onRemoveFilter : function(e, data){

						var name = $(data.selector).data('attribute');
						
						$('#refinementForm input[name="' + name + '[]"][value="' + $(data.selector).data('value') + '"]').attr('checked', false);

						_this.updateHistoryMap(name);
						
						_this.removeFilterAttribute($(data.selector).data('value'));

						var filtered = $(data.selector).data('value').split(':');
						_gaq.push(['_trackEvent', 'search', 'removeFilterAttribute', filtered[0], filtered[1]]);
						
					},

					onSearch : function(e, data){

						var query = $('input[name="searchQuery"]', data.selector).trigger('blur').val() || '';

						if(query.length > 0){
							if(document.location.href.indexOf('https') === -1){						
								$('.mobileSearch .b3').click(); // hide it

								// If the query has text, or if there are searched keywords (even if the query is blank - they must be clearing it)
								if(query !== 'undefined' && query.length || (_state.keywords && (_state.keywords || {}).length)){
									
									// Remove the delete statements if you want search to work within a category
									delete _state.category;
									delete _state.allAttributes;
									_isFirstRequest = false;

									_state.keywords = query; // usually we wait until the response to update the state
															 // but search is unique because it's ubiquious and can be done from anywhere
															 // we might need to redirect (via onBeforeAPICall) and we'll update the state string a little early
									_this.search(query);

								}
							}else{
								document.location = 'http://www.lonestarpercussion.com/#/~search/keywords/' + encodeURIComponent(query);
							}
						}

						_gaq.push(['_trackEvent', 'search', 'keywordSearch', query]);
					},

					// Originally used for suggestions on "did you mean" - but deprecated now
					// onSearch : function(e, data){
					// 	var query = $(data.selector).data('query');
					// 	_this.search(query);
					// 	$('#searchQuery').val(query).change();
					// },

					onRemoveSearch : function(e, data){

						_this.removeSearch();

						$('input[name="searchQuery"]').val('').change();
					},

					onFilterAttribute : function(e, data){

						var name = $(data.selector).attr('name').replace('[]', '');

						_this.updateHistoryMap(name);

						if($(data.selector).is(':checked')){
							_this.addFilterAttribute($(data.selector).val());
						}else{
							_this.removeFilterAttribute($(data.selector).val());
						}
					
						var filtered = $(data.selector).val().split(':');
						_gaq.push(['_trackEvent', 'search', 'filterAttribute', filtered[0], filtered[1]]);
						
					},

					onClearAllRefinements : function(e, data){

						_attributeHistory = [];
						_state.allAttributes = '';
						_state.keywords = '';
						_this.loadCategory(_state.category);

						_gaq.push(['_trackEvent', 'search', 'clearAllRefinements', true]);

					},

					onLoadCategory : function(e, data){
						_this.loadCategory($(data.selector).data('path'), true);
						data.originalEvent.preventDefault();
						_isFirstRequest = false;

						_gaq.push(['_trackEvent', 'search', 'filterCategory', $(data.selector).data('path')]);
					},

					onDestroyAndLoadCategory : function(e, data){

						_isFirstRequest = false;
						
						if(document.location.href.indexOf('https') === -1){
							var url = ($(data.selector).attr('href') + '#').split('#');
						
							var state = (_app.controllers.application.parseStateFromHash(url[1]) || {}).search || {};
							state.category = state.category || url[0];

							// Force pushState
							if(_this.loadState(state, null, true)){
								$('html').attr('data-path', '').addClass('search-loading');
								_this.scrollToFirst();
								_app.controllers.flyout.closeFlyout();
								data.originalEvent.preventDefault();
							}
						}

						_gaq.push(['_trackEvent', 'search', 'browseToCategory', state.category]);

					},

					onRemoveCategory : function(e, data){
						var path = '/' + _state.category;
						var categoriesToRemove = $(data.selector).data('removepath').split('/');

						// Loop through and remove the sub categories
						for(var i = 0; i < categoriesToRemove.length; i++){
							if(categoriesToRemove[i].length > 0){
								path = (path + '/').replace('/' + categoriesToRemove[i] + '/', '/'); // Begins the phrase
							}
						}
						_this.loadCategory(path.replace(/\/{1,}/g, '/', '/'), true);

						_gaq.push(['_trackEvent', 'search', 'removeCategory', categoriesToRemove]);

					},

					onNextPage : function(e, data){
						_this.paginate('next');
						_gaq.push(['_trackEvent', 'search', 'paginate', 'next']);
					},

					onPreviousPage : function(e, data){
						_this.paginate('prev');
						_gaq.push(['_trackEvent', 'search', 'paginate', 'previous']);
					},

					onSort : function(e, data){
						_state.sort = $(data.selector).val();
						_this.paginate('first');
						_gaq.push(['_trackEvent', 'search', 'sort', $(data.selector).val()]);
					},

					onItemsPerPage : function(e, data){
						_state.resultsPerPage = $(data.selector).val();
						_this.paginate('first');
						_gaq.push(['_trackEvent', 'search', 'resultsPerPage', $(data.selector).val()]);
					},

					onShowCompactView : function(e, data){
						_this.changeView('gridView');
						_this.pushState();
						_gaq.push(['_trackEvent', 'search', 'changeView', 'compact']);
					},

					onShowDetailsView : function(e, data){
						_this.changeView('listView');
						_this.pushState();
						_gaq.push(['_trackEvent', 'search', 'changeView', 'detailed']);
					}
				},

				application : {

					onStateChange : function(e, data){
						if(_app.controllers.application.pullState(_this)){
							_isFirstRequest = false;
							_this.loadCurrentState();
						}else{

							// They hit the back button - so the code is still avliable in .page-generic .. but you have to reinitialize the page
							// $('.page-search').hide();
							// $('.page-generic').show();

							// TODO : load state for pages so back button navigation can be snappy
							if(!_isFirstRequest){
								document.location.reload();
							}
						}
					},

					onReady : function(e, data){
						if(_app.controllers.application.pullState(_this)){
							_this.loadCurrentState();
						}
					},
					
					onInit : function(e, data){
						// Initialize the state
						//_this.pullState(_app.controllers.application.pullState(_this));
					},

					onContextChangeEnterPhone : function(e, data){
						_this.changeView('listView');

					}
				}
			},
			
			assets : {},

			updateHistoryMap : function(name){
				// The basic idea here is, the first time you check a box it gets
				// added to the history, to account unchecking we make sure
				// all of the elements in history are present as checked boxes in the form

				// On the retuning request, the attributes will be marked as "static" or "temporary"
				// and will consequently be rendered differently.

				var formObject = _util.formToObject($('#refinementForm')[0]);

				// If it's not part of the history (first time it's been checked), add it to the history
				// We can rely on the fact that doing attribute 1, attribute 2, attribute 1 selection
				// paths will never happen because we will be hiding them

				// If we have unselected another attribute (different from the last selected) then we need to
				// mark the last selected as static. This solves the use case of selecting two "Color" then "Artist" then
				// unselecting a "Color" and "Artist" should "collapse" into it's static form 
				var isInHistory = $.grep(_attributeHistory, function(a){ return a.name === name; }).length;
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
			},

			loadCurrentState : function(){
				// We need to push a state on to the beginning of the stack
				_this.loadState(_app.controllers.application.pullState(_this), {preventPushState : !_isFirstRequest});
			},


			// Prepares the _state object for storing in the path
			getState : function(){
				
				// This keeps other controllers from accidentially modifying state
				var tmpState = $.extend({}, _state);
				
				// If it has push state, delete category, otherwise we need to store it in the hash
				if(_app.controllers.application.hasPushState()){
					delete tmpState.category; // Remove Category from the hash (it's being 'saved' in the URL)
				}

				tmpState.allAttributes = {value : (tmpState.allAttributes || '').replace(/[\/]/g, ','), uriEncode : false};
				tmpState.path = _state.category;

				if(tmpState.allAttributes.value.length === 0){
					delete tmpState.allAttributes;
				}

				return tmpState;

			},

			// Convienice hook to application pushstate
			pushState : function(){

				var pushedState = _this.getState();
				// if isFirstRequest is true, then app.pushState will use history.replaceState instead
				return _app.controllers.application.pushState(_this, pushedState, _isFirstRequest);
			},

			// Reads / parses state and changes the _state object
			pullState : function(state){

				var path = document.location.pathname.replace(/\?.*/, '');

				_state = $.extend({}, _defaultState, (state || {}));

				_state.allAttributes = ((_state || {}).allAttributes || '').replace(/[\|\,]/g, '/');
				
				// If the path has .html in it - remove the filename and use the category
				if(path.indexOf('.html') > -1 && !_state.category){
					_state.category = path.substring(0, path.lastIndexOf("/"));
				}else if(!_state.category){
					_state.category = path;
				}

				// if it's only a /
				_state.category = (_state.category === '/' ? '' : _state.category);
				_state.category = _state.category.replace(/^\//, '');
				_state.category = _state.category.replace(/\/$/, '');

				if(_state.keywords){
					_state.keywords = decodeURIComponent(_state.keywords).replace(/\-/g, ' ').replace(/^ /, '');
				}

				return _state;
			},

			loadState : function(state, passthrough, forcePushState){
				var tmpState = $.extend({}, _state);
				_this.pullState(state);
				
				// Populate the input with the search keywords
				$('input[name="searchQuery"]').val(_state.keywords);
				// Load the state only if the new state is different from the old state (tmpState)
				if(!_util.isEqual(tmpState, _state)){
					if(forcePushState){
						_isFirstRequest = false;
					}

					_this.search(null, passthrough);
					
					return true;
				}
				return false;
			},

			// By keyword
			search : function(keywords, passthrough){

				var payload = {
					action : 'advisor',
					method : 'CA_Search',
					keywords : (keywords === null ? _state.keywords : keywords)
				};

				return _api.request(_this, 'search', $.extend({}, _state, {isSingleSelect : IS_SINGLE_SELECT}, payload), passthrough)
					.done(function(data){
						if(data.response){
							if(((((data.response || {}).source || {}).products || {}).items || []).length === 1 && !((((data.response || {}).source || {})._lsp || {}).query || {}).assumedQuery){
								document.location.replace(data.serverResponse.source.products.items[0].Item_URL);
							}else{
								_this.renderPage(data.response.source);
							}
						}
					});
			},
			removeSearch : function(){

				var payload = {
					action : 'advisor',
					method : 'CA_BreadcrumbRemove'
				};

				delete _state.keywords;

				return _api.request(_this, 'removeSearch', $.extend({}, _state, {isSingleSelect : IS_SINGLE_SELECT}, payload))
					.done(function(data){
						_this.renderPage(data.response.source);
					});
			},

			loadCategory : function(categoryPath, isAtomic){

				var payload = {
					action : 'advisor',
					method : 'CA_CategoryExpand',
					category : (isAtomic ? categoryPath : _state.category.replace(/\/$/, '') + '/' + categoryPath)
				};

				return _api.request(_this, 'loadCategory', $.extend({}, _state, {isSingleSelect : IS_SINGLE_SELECT}, payload))
					.done(function(data){
						_this.renderPage(data.response.source);
					});
			},

			addFilterAttribute : function(attributeSlug){

				var payload = {
					action : 'advisor',
					method : 'CA_AttributeSelected',
					attribute : attributeSlug
				};

				return _api.request(_this, 'filter', $.extend({}, _state, {isSingleSelect : IS_SINGLE_SELECT}, payload))
					.done(function(data){
						_this.renderPage(data.response.source);
					});
			},

			removeFilterAttribute : function(attributeSlug){

				var payload = {
					action : 'advisor',
					method : 'CA_BreadcrumbRemove',
					allAttributes : _state.allAttributes.replace(attributeSlug, '').replace(';;', ';').replace('//', '/').replace(/((\/;)|(;\/))/g, '/').replace(/^[\/;]/, '').replace(/[;\/]$/, '') // remove it, and remove leftover ;;
				};

				return _api.request(_this, 'removeFilter', $.extend({}, _state, {isSingleSelect : IS_SINGLE_SELECT}, payload))
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
					currentPage : _state.page
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

				// if(((easyAskDataObject.products || {}).items ||{}).length === 1){
						
				// 	_util.redirectTo(data.response.source.products.items[0].Item_URL);
				
				// }else{

					// If the page hasn't been injected yet
					if(!$('.page-search').length){

						// We must be on an error page, they don't get the <div class=''
						if(!$('.page-generic').length){
							$('#div__body').addClass('page-generic');
						}
						
						// Doing it via a node rather than directly into the after()
						// prevents the page from shrinking height while rendering
						var pageHTML = _util.parseMicroTemplate('templates-search-page', {});
						var searchPageNode = $.parseHTML(pageHTML);
						$('.page-generic').after(searchPageNode).hide();

						_app.controllers.application.attachEvents($('.page-search'));
					}

					$('.page-search').show();
					$('.page-generic').hide();

					// Render Sections
					_this.renderSummary(easyAskDataObject);
					_this.renderSelectedRefinements(easyAskDataObject);
					_this.renderRefinements(easyAskDataObject);
					_this.renderProducts(easyAskDataObject);

					//Make page full width if refinements aren't there.
					// if(!easyAskDataObject.navPath._lsp.refinementNodes.length && !easyAskDataObject.attributes.attribute){
					// 	$('#searchTitle, #resultsContainer').removeClass('span9').addClass('span12 row');
					// }else{
					// 	$('#searchTitle, #resultsContainer').removeClass('span12 row').addClass('span9');
					// }
				//}
			},

			scrollToFirst : function(){
				// Scroll To Top
				return _util.scrollTo($('body'));
			},

			renderSummary : function(easyAskDataObject){

				var path = _state.category;
				var currentPageNumber = ((easyAskDataObject.products || {}).itemDescription || {}).currentPage;
				var totalPages = ((easyAskDataObject.products || {}).itemDescription || {}).pageCount;

				var breadcrumbHTML = _util.parseMicroTemplate('templates-search-breadcrumbs', $.extend({}, easyAskDataObject));
				var breadcrumbElement = $('#breadcrumbs').html(breadcrumbHTML);
				_app.controllers.application.attachEvents(breadcrumbElement);
				if(breadcrumbElement.is(':has(button)')){
					breadcrumbElement.parent('.breadcrumbs').removeClass('hide'); // Show the breadcrumbs if they are not empty
				}else{
					breadcrumbElement.parent('.breadcrumbs').addClass('hide');
				}

				var titleHTML = _util.parseMicroTemplate('templates-search-title', $.extend({}, easyAskDataObject));
				_app.controllers.application.attachEvents($('#searchTitle').html(titleHTML));

				$('.currentPageNumber').html(currentPageNumber);
				$('.totalPages').html(totalPages);
				$('.numberOfResults').html(((easyAskDataObject.products || {}).itemDescription || {}).totalItems);

				var sortOrder = ((easyAskDataObject.products || {}).itemDescription || {}).sortOrder || 'default';
				$('select[data-action="sort"]').val(sortOrder.indexOf('EAScore') > -1 ? 'default' : sortOrder);
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

				// Update Title
				var refinements = [];
				
				if(easyAskDataObject.navPath._lsp.searchNode){
					refinements.push('"' + easyAskDataObject.navPath._lsp.searchNode.englishName + '"');
				}
				// Looping backwards so the refinements come out in a sort-of first-picked-first-in-list format
				for(var i = easyAskDataObject.navPath._lsp.refinementNodes.length - 1; i >= 0 ; i--){
					refinements.push(easyAskDataObject.navPath._lsp.refinementNodes[i].value);
				}
				document.title = ($('#pageName').text() + (refinements.length ? ' : ' + refinements.join(', ') : '') + ' | Lone Star Percussion');
				$('html').attr('data-title', document.title);
				
				_gaq.push(['_trackPageview', _state.category + (_state.keywords ? '/?search=' + _state.keywords : '')]);

			},

			renderSelectedRefinements : function(easyAskDataObject){
				var selectedHTML = _util.parseMicroTemplate('templates-search-selectedRefinements', $.extend({}, easyAskDataObject));
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

				var refinementHTML = _util.parseMicroTemplate('templates-search-refinements', $.extend({}, easyAskDataObject));
				_app.controllers.application.attachEvents($('#searchRefinements').html(refinementHTML).show());
				
				//If there aren't any attributes, hide the panel
				if(!(easyAskDataObject.attributes._lsp.cached || {}).length){
					$('#searchRefinements').addClass('empty');
				}else{
					$('#searchRefinements').removeClass('empty');
				}
			
			},

			renderProducts : function(easyAskDataObject){
				var entriesHTML = _util.parseMicroTemplate('templates-search-entries', $.extend({}, easyAskDataObject));
				_app.controllers.application.attachEvents($('#searchEntries').html(entriesHTML));

				_this.changeView(_state.view);
				
			},

			renderFatalError : function(){
				_gaq.push(['_trackEvent', 'search', 'error', 'fatalError']);
				alert('Something has gone wrong with our network connection to our database. You can try again by reloading the page. Sorry about that!');
			}
		};
		
		return _this;

	})());

})();
