(function(){
	
	var _util = window.LSP.utilities;
	
	_util.register('controller', 'search', (function(){
		var _this = {};
		var _app = window.LSP;

		var _current = {
			page : '',
			sort : '',
			path : 'Start'
		};

		_this = {
			events : {
				application : {

					onReady : function(e, data){
						console.log(_this.search('red'));
					},
					
					onInit : function(e, data){ }
				}
			},
			
			assets : {},

			// Adds basic items to query string
			buildRequest: function(query){
				var request = {
					resultsPerPage : 50,
					defSortCols : (_current.sort === '-default-' ? '' : _current.sort),
					catPath : _current.path
				};
				
				$.extend(request, query);

				return request;
			},

			// By keyword
			search : function(keywords){
				//var path = ;
				var request = {
					requestAction : 'advisor',
					requestData : 'CA_Search',
					q : keywords,
					catPath : 'All Products'
				};

				return _this.buildRequest(request);
			},

			loadCategory : function(categoryPath){
				var request = {
					catPath : categoryPath,
					requestAction : 'advisor',
					requestData : 'CA_CategoryExpand'
				};
			},

			filterWithAttribute : function(attr, val){

				// TODO : attribsel escape bugs (like, an equals in the val, or quotes, etc)

				var request = {
					requestAction : 'advisor',
					requestData : 'CA_AttributeSelected',
					attribSel : attr + ' = ' + val
				};
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
				var request = {
					requestAction : 'navbar',
					requestData : 'page' + pageName
				};
			},

			// Pagination 
			//  @val = [first, last, next, prev]
			paginate: function(val){
				var request = {
					requestAction : 'navbar',
					requestData : val,
					currentPage : _current.page
				};
			}
		};
		
		return _this;

	})());

})();