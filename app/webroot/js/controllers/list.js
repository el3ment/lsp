(function(){
    
    var _util = window.LSP.utilities;
    
    var list = function(){
        var _parentController = {};
        var _lsp = window.LSP;
        var _assets = _lsp.assets;
        var _api = _lsp.models.lspapi;
        var _util = _lsp.utilities;
        var _settings = {
        	wishlistSearchParentId : 'list-wishlist-searchParent',
        	wishlistSearchListElementId : 'templates-wishlist-searchItem',
        	wishlistSearchFormId : 'list-wishlist-searchForm',
        	
        	wishlistParentId : 'list-wishlist-parent',
        	wishlistListElementId : 'templates-list-wishlist-item',
        	
        	
        	shareCartListElementId : 'templates-list-item',
        	shareCartParentId : 'list-parent'
        };
        
        _parentController =  {
            events : {
            	list : {
            		onRemoveWishlistItem : function(e, data){
            			_parentController.removeItemFromWishlist({
                    		itemId : data.selector.data('itemid'),
                    		customerId : _lsp.controllers.application.getCurrentCustomerId(),
                    		options : data.selector.data('itemoptions')});
            		},
            		onAddItemToWishlist : function(e, data){
            			
            			var formValues = _util.formToObject(data.selector.parents('form').get(0), null, false);
            			
                    	_parentController.addItemToWishlist({
                    		itemId : formValues.itemId,
                    		customerId : _lsp.controllers.application.getCurrentCustomerId(),
                    		quantity : formValues.quantity,
                    		options : formValues.itemOptions,
                    		comments : formValues.wishlistItemComment});
            		}
            	},
                application : {
                    onReady : function(e, data){
                    	// render template for each item returned
                    	// append templates to ul list id='list-parent'
                    	
                    	var urlParameters = _util.getURLParameters();
                    	if(urlParameters.p){
                    		_parentController.renderShareCart(_parentController.assets.listEncoder.decode(urlParameters.p));
                    	}

                    	if(urlParameters.wishlistId){
                    		_parentController.renderWishlist(urlParameters.wishlistId);
                    	}
                    	

                    	
                    	
                    	
                    },
                    onAttachEvents : function(e, data){
                        $('#'+_settings.wishlistSearchFormId, data.selector).bind('submit', function(e){
                            e.preventDefault();
                            return false;
                        }).bind('afterValidation', function(e){
                        	_parentController.submitWishlistSearch(_util.formToObject(this, null, false));
                        });
                    }
                }
            },
            assets : {
            	listEncoder : new _assets.listEncoder(_parentController, 'listEncoder')
            },
            renderShareCart : function(idsAndQuantities){
            	var ids = [];
            	
            	for(var i = 0; i < idsAndQuantities.length; i++){
            		ids.push(idsAndQuantities[i].id);
            	}
            	$.when(_parentController.getItems(ids)).done(function(response){
            		if(response.response.data){
            			
            			var items = response.response.data;
            			
            			for(var i = 0; i < idsAndQuantities.length; i++){
                    		for(var j = 0; j < idsAndQuantities.length; j++){
                    			if(idsAndQuantities[j].id === parseInt(items[i]._internalid.value)){
                    				items[i]._selectedQuantity = idsAndQuantities[j].quantity;
                    				break; // found it - don't need to keep looping
                    			}
                    		}
                    	}
                    	_parentController.renderItems(_settings.shareCartParentId, _settings.shareCartListElementId, items);
            		}
            	});
            	
            },
            renderItems : function(parentElementId, listElementId, items){
            	items = items || [];
            	var html = '';
            	
            	for(var i = 0; i < items.length; i++){
            		html += _util.parseMicroTemplate(listElementId, items[i]);
            	}
            	
            	_util.attachEvents($('#'+parentElementId).html(html));
            },
            
            getItems : function(ids){
            	ids = (typeof ids === 'string' ? [ids] : ids);
            	return _api.request(_parentController, 'getItems', 'getItems', {ids : JSON.stringify(ids)});
            },
            
            addItemToWishlist : function(requestParameters){ // {itemId : itemId, customerId : 123, quantity : 12, options : options, comments : 'hey'}
            	requestParameters.site = window.location.hostname;
            	return _api.request(_parentController, 'add', 'addItemToWishlist', requestParameters);
            },

            removeItemFromWishlist : function(requestParameters){ // {customerId : customer, options : options, itemId : itemId}
            	return _api.request(_parentController, 'remove', 'removeItemFromWishlist', requestParameters);
            },

            updateItemOnWishlist : function(requesParameters){ //{itemId : itemId, customerId : customerId, options : options, value : value, field : field}
            	requestParameters.site = window.location.hostname;
            	return _api.request(_parentController, 'update', 'updateItemOnWishlist', requestParameters);
            },

            getWishlistItems : function(id){ // {customerId : customerId}
            	return _api.request(_parentController, 'get', 'getWishlistItems', {customerId : id});
            },
            searchWishlists : function(searchValue){ // {searchValue : 'hey!'}
            	return _api.request(_parentController, 'search', 'searchWishlists', {searchValue : searchValue});
            },
            submitWishlistSearch : function(formValues){
            	$('body').removeClass('list-noWishlistsFound');
            	$.when(_parentController.searchWishlists(formValues.searchValue))
            	.done(function(response){
            		_parentController.renderWishlistSearch(response.response.data);
            	});
            },
            renderWishlistSearch : function(wishlists){
            	if(wishlists.length > 0){
            		_parentController.renderItems(_settings.wishlistParentId, _settings.wishlistListElementId, wishlists);
            	}else{
            		$('body').addClass('list-noWishlistsFound');
            	}
            },
            
            renderWishlist : function(id){
            	$.when(_parentController.getWishlistItems(id))
            	.done(function(response){
            		var items = response.response.data;
            		_parentController.renderItems(_settings.wishlistParentId, _settings.wishlistListElementId, items);
            	});
            }
        };
        
        return _parentController;
    }();
    
    _util.register('controller', 'list', list);

})();