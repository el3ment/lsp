(function(){
	
	var _util = window.LSP.utilities;
	
	var product = (function(){
		var _this = {};
		var _app = window.LSP;
		var _assets = _app.assets;
		var _api = _app.models.easyask;
		
		_this =  {
			events : {
				product : {
					onAddToCart : function(e, data){
						_this.updateProduct(data.selector); // Update the product, just to be safe.
						data.selector[0].submit();
					},
					onMatrixOptionSelect : function(e, data){
						_this.updateMatrixLists(data.selector[0].form);
					},
					onAddToWishlist : function(e, data){
						_this.updateProduct();
						addToWishlist({
							customer: $('input[name="customer"]').val(),
							item: $('.shopping.section input[name="itemid"]'),
							site: 'lonestarpercussion',
							options : $('.shopping.section select'),
							qty: $('.shopping.section input[name="qty"]'),
							messages: $("#wishlist-messages > div")
						});
					}
				},
				application : {
					onContextChange : function(e, data){
						_this.attachZoom(data.context);
					},
					onReady : function(e, data){
						
						var productPageForm = $('.page-product form[action="/app/site/backend/additemtocart.nl"]')[0];
						if(productPageForm){
							_this.renderMatrixLists(productPageForm);
						}

						setTimeout(_this.removeEmptySpecificationsRows, 500);

						if($('.page-productDetail .audio.section').is(':not(.show0Elements)')){
							head.js('http://dev.lonestarpercussion.com/js/vendors/jqplayer/jquery.jplayer.min.js', function(){
								$('.audio.section a').jPlayer({
									ready : function(){
										$(this).jPlayer('setMedia', { mp3: $(this).attr('href') });
									},
									swfPath : "http://dev.lonestarpercussion.com/js/vendors/jqplayer/",
									supplied : "mp3"
								});	
							});
						}
						
					},
					onInit : function(e, data){}
				}
			},
			
			assets : {},

			attachZoom : function(context){
				// If jqzoom, it's the product page.
				if($.jqzoom){
					
					_this.detachZoom();
					if($('a[data-asset="mouseoverZoom"]').is(':not([href*="no-image"])')){
						$('a[data-asset="mouseoverZoom"]')
							.jqzoom({
								zoomWidth: $('.addToCart').width(),
								zoomHeight: 480,
								position: 'right',
								preloadImages: (context !== 'phone' ? true : false),
								xOffset : (context === 'phone' ? 1000 : parseInt($('.information.span6').css('margin-left'), 10)),
								yOffset : -20,
								zoomType: 'standard',
								showEffect: 'fadein',
								fadeinSpeed: 'fast',
								delay : 300
							});
					}
				}
			},
			detachZoom : function(){
				$('.zoomWindow').remove();
				$('.zoomPup').remove();
				$('.zoomPreload').remove();
				$('.zoomPad img').unwrap();
				
				var html = $('.section.images').html();
				$('.section.images').empty().html(html);
			},

			removeEmptySpecificationsRows : function(){
				$('tr[data-specifications-data*="!empty!"], tr[data-specifications-data*="!Unknown!"], tr[data-specifications-data*="!None!"]').remove();
			},

			renderMatrixLists : function(form){
				
			},

			updateMatrixLists : function(form){

				var easyAskMatrixData = _api.parseMatrixChildren($('div[data-name="summaryString"]', form).data('value'));
				var selectedOptions = {};

				// Create an object of currently selected options
				$('select', form)
					.each(function(i, element){
						// If it's not the 'Select an Option' choice - which is identified by value=''
						if($(element).val().length){
							selectedOptions[$(element).attr('name')] = $(element).val();
						}
					});

				// Filter, and render newly updated options
				var filteredOptions = _api.filterMatrixChildren(easyAskMatrixData, selectedOptions)
				var unselectedOptionText = $('option[value=""]:first', form).text();
				
				$.each(filteredOptions, function(label, options){
					
					var optionHTML = '<option value="">'+ unselectedOptionText +'</option>';

					$.each(options, function(value, noop){
						optionHTML += '<option value="' + value + '" '+ ((selectedOptions[label] === value) ? 'selected' : '') +'>'+value+'</option>';
					});

					// Update everything except the one you are currently on.					
					$('select[name="'+ label + '"]', form).html(optionHTML);
				});

				_this.updateProduct(form);
			},
			
			updateProduct : function(form){

				var easyAskMatrixData = _api.parseMatrixChildren($('div[data-name="summaryString"]', form).data('value'));
				var selectedOptions = {};

				// Create an object of selected options to test against the formattedObject (the source)
				var selects = $('select', form)
					.each(function(i, element){
						selectedOptions[$(element).attr('name')] = $(element).val();
					});
				
				if(selects.length){
					$('button.b1', form).attr('disabled', true);
					$('input[name="buyid"]', form).val('');
					$('input[name="itemid"]', form).val('');

					// Loop through the formattedMatrix (source of all attributes) and if we find an id that
					// matches the filter criteria, then set the id
					$.each(easyAskMatrixData.products, function(id, productData){
						
						for(var label in productData.options){
							// If it's not present, or if it exists, but is another value
							if(!selectedOptions[label] || selectedOptions[label] !== productData.options[label])
								return;
						}

						_this.detachZoom();

						var entry = $(form).parents('.entry');
						// If we've made it here, it's because we've found an ID that matches the filters
						// Update all the changing nick nacks in the item listing
						$('input[name="buyid"]', form).val(id); // Set the buyid
						$('input[name="itemid"]', form).val(id);
						$('button.b1', form).removeAttr('disabled');

						// "You save $x" - we hide it if the save amount is < 0 (it would be an error, so this is just to be safe)
						if(productData.data.msrp - productData.data.onlinePrice <= 0){
							$('.price .details', entry).hide();
						}else{
							$('.price .details', entry).show();
						}

						$('.productPrice', entry).html(_util.parseCurrency(productData.data.onlinePrice));
						$('.productMpn', entry).html(productData.data.mpn);
						$('.productDiscount', entry).html(_util.parseCurrency(productData.data.msrp - productData.data.onlinePrice));

						var optionArray = [];
						for(var label in productData.options){
							if(productData.options.hasOwnProperty(label)){
								optionArray.push(productData.options[label]);
							}
						}

						$('.productName .options', entry).html(' : ' + optionArray.join(', '));

						// Update the active thumbnail
						var size = $('.thumbnail img, #zoom-mainImage img', entry).width();
						var img = $('.thumbnail img, #zoom-mainImage img', entry);
						var productImageLink = $('#zoom-mainImage').attr('href',  productData.data.imageUrl);
						img.attr('src',  productData.data.imageUrl + '.' + size + 'x' + size);

						$('.productAvailability', entry).html(productData.data.stockMessage);
						
						_this.attachZoom();

					})
	}
			},
			
			// Returns product specs
			getSpecifications : function(id){
				return _api.request(_this, 'getSpecifications', 'getSpecifications', {id : id});
			},
			
			// Returns an object of options
			getMatrixOptions : function(matrixParentId){
				return _api.request(_this, 'get', 'getMatrixOptions', {parentId : matrixParentId});
			}
		};
		
		return _this;
	})();
	
	_util.register('controller', 'product', product);

})();