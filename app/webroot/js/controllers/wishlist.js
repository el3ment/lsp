(function(){

define(['utilities/global', 'controllers/application'], function(){


// Begin Suite Commerce Stuff
window.parsePrice = function parsePrice(number,bool)	{
	number = (Math.round(number*100))/100;
	var aux1 = parseInt(number/1000), aux2 = Math.round((number%1000)*100)/100;
	if(aux2 < 100)	{
		if(aux2 < 10) aux2 = "00"+ aux2;
		else aux2 = "0"+ aux2;
	}
	if(aux1 > 0)	{
		aux1 = parsePrice(aux1,true);
		number = aux1 +","+ aux2;
	}
	if(!bool){
		number += "";
		if (number.indexOf(".") != -1) {
			var sigFig = number.substring(number.indexOf(".") + 1, number.length);
			if (sigFig.length == 1)	number += "0";
		}
		else number += ".00";
		return "$" + number;
	}
	return number;
};
window.getNumber = function getNumber(string){
	string += "";
	if(string.indexOf("$") != -1) string = string.substring(string.indexOf("$") + 1).replace(",","").replace(" ","");
	return parseFloat(string);
};
window.calcSaves = function calcSaves(list,sale)	{
	var list = getNumber(list), sale = getNumber(sale), dif = list - sale, perDif = Math.round(dif*10000/list)/100;
	if(dif > 0) return perDif + "%";
	else return false;
};
window.addToWishlist = function addToWishlist(config){
	config.messages.hide();
	if (config.customer != "")	{
		var options = "";
		if (config.options.length === 0 || (config.options.length > 0 && config.options.find("option:selected").length === config.options.length && (config.item.val() || '').length > 0)) {
			config.options.each(function(){
				var optionValue = this.id, optionName = $(this).attr('name'),
					selected = $(this).find("option:selected"), selectedValue = selected.val(), selectedLabel = selected.text();
				options += optionName + "=" + optionName + "==" + escape(selectedLabel) + "=" + escape(selectedLabel) + ";";
			});
			var wishUrl = "/app/site/hosting/scriptlet.nl?script=customscript_add_item_wishlist&deploy=customdeploy_add_item_wishlist&i=" + config.item.val() + "&j=" + config.customer + "&q=1&s=" + config.site + "&o=" + options;
			$.getScript(wishUrl, function(){
				$("#add-wishlist").hide();
				config.messages.eq(0).show();
				// setTimeout(function(){
				// 	config.messages.eq(0).fadeOut();
				// }, 8000);
			});
		}
		else {
			$("#add-wishlist").removeClass("loading");
			config.messages.eq(2).show();
		}
	}
	else config.messages.eq(1).show();
};

window.drawWishlist = function drawWishlist(itemId, itemUrl, itemThumb, itemName, itemPrice, itemQty, itemOptions, itemComments, baseprice, stock, mpn, behavior)	{

	var templateData = {
		id : itemId,
		url : itemUrl,
		thumbnailUrl : itemThumb,
		name : unescape(itemName),
		price : itemPrice,
		quantity : itemQty,
		options : unescape(itemOptions),
		comments : unescape(itemComments),
		msrp : baseprice,
		stockMessage : unescape(stock),
		mpn : unescape(mpn),
		behavior : unescape(behavior)
	};

	// var options = unescape(itemOptions).split(";"), optionLabels = "",
	// 	optionValues = "", template = $("#wish-item-template").html();
	// for(var i = 0; i < options.length - 1; i++){
	// 	var splitOptions = options[i].split("==");
	// 	optionLabels+= splitOptions[0].split("=")[1] + ": " + splitOptions[1].split("=")[1] + "<br/>";
	// 	optionValues+= "&" + splitOptions[0].split("=")[0] + "=" + splitOptions[1].split("=")[0];
	// }
	// template = template.replace(/_itemThumb/gi,itemThumb);
	// template = template.replace(/_itemName/gi,unescape(itemName));
	// template = template.replace(/_itemUrl/gi,itemUrl);
	// template = template.replace(/_itemId/gi,itemId);
	// template = template.replace(/_itemQty/gi,itemQty);
	// template = template.replace(/_stock/gi,unescape(stock));
	// template = template.replace(/_optionValues/gi,optionValues);
	// template = template.replace(/_optionLabels/gi,optionLabels);
	// template = template.replace(/_options/gi,itemOptions);
	// template = template.replace(/_itemComments/gi,unescape(itemComments));
	
	// var savings = calcSaves(baseprice, itemPrice);
	// if( savings )
	// 	template = template.replace(/_itemPrice/gi,"MSRP: " + parsePrice(baseprice) + "<br />" + "Price: <span>" + parsePrice(itemPrice) + "</span> <br />" + "<span>You Save: " + savings + "</span>");
	// else
	// 	template = template.replace(/_itemPrice/gi,"Price: <span>" + parsePrice(itemPrice) + "</span>");

	$("table.wishlist.table tbody")
		.append(LSP.utilities.parseMicroTemplate('templates-wishlistItem', templateData))
		.parent('table').show();
	$('table.wishlist .comments textarea').off('keyup.wishlist').on('keyup.wishlist', function(){
		if($(this).val().length > 0){
			$('.wish-update', this.parentNode).fadeIn();
			$('.wish-text-saved', this.parentNode).hide();
		}
	});
};
window.wishlistReady = function wishlistReady(bool)	{
	if(document.location.href.indexOf("austintest") != -1) alert(bool);
};
window.wishStatusText = function wishStatusText(public){
	if(public == "T")	{
		$('input[type="radio"][name="isPublic"][value="true"]').attr('checked',true);
		$('#wishlistStatus').removeClass('loading').html('public');
	}else{
		$('input[type="radio"][name="isPublic"][value="false"]').attr('checked',true);
		$('#wishlistStatus').removeClass('loading').html('private');	
	}
};
window.myWishlist = function myWishlist(config){
	if (config.customer != ""){
		config.messages.filter('.loggedIn').show();
		var today = new Date(),
			myWishUrl = "/app/site/hosting/scriptlet.nl?script=customscript_show_my_wishlist&deploy=customdeploy_show_my_wishlist&j=" + config.customer + "&s=lonestarpercussion&random=" + (Math.random() * today.getTime());
		$("table.wishlist.table tbody").addClass('loading small');
		$.getScript(myWishUrl,function(data){
			$("#wish-info").show();
			if (data == ""){ 
				config.messages.filter('.emptyWishlist').show();
				$('#wishlistStatus').html('empty');	
				$("table.wishlist.table tbody").removeClass('loading');
			}else{
				$("table.wishlist.table tbody").removeClass('loading');
				var wishlist = $("#wishlist-wrapper tbody"),
					wishMessages = $("#wishlist-messages > div"),
					publicWraper = $("#wish-pub"),
					wait = null, 
					public = data.substring(data.indexOf("Ready('") + 7);
				public = public.substring(0,public.indexOf("'"));
				wishStatusText(public);
				$('input[type="radio"][name="isPublic"]').click(function(){
					var status = $(this).val().substr(0, 1).toUpperCase();
					if(wait) clearTimeout(wait);
					var updateUrl = "/app/site/hosting/scriptlet.nl?script=customscript_update_wishlist_public&deploy=customdeploy_update_wishlist_public&j=" + config.customer + "&p=" + status + "&random=" + (Math.random() * today.getTime());
					$('#wishlistStatus').addClass('loading small');
					$.getScript(updateUrl,function(){
						wishStatusText(status);
					});
				});
				$(function(){
					wishlist.find(".wish-remove").click(function(){
						var $this = $(this);
						var id = $(this).data('id');
						var options = $(this).data('options');

						$.getScript("/app/site/hosting/scriptlet.nl?script=customscript_remove_item_wishlist&deploy=customdeploy_remove_item_wishlist&j=" + config.customer + "&i=" + id + "&o=" + options, function(){
							$this.closest("tr").fadeOut(function(){
								$(this).remove();
								if (wishlist.find(".wishlistItem").length == 0) {
									wishMessages.filter(".emptyWishlist").show();
									wishlist.closest("table.wishlist").hide();
									wishlist.closest("h2").hide();
								}
							});
						});
						return false;
					});
					wishlist.find(".wish-update").click(function(){
						var wishActions = $(this).parent(),
						    itemId = $(this).data('id'),
							comments = escape(wishActions.parent().find("textarea").val()),
							wishUrl = "/app/site/hosting/scriptlet.nl?script=customscript_update_wishlist_comments&deploy=customdeploy_update_wishlist_comments&i=" + itemId + "&j=" + config.customer + "&t=" + comments + "&o=" + $(this).data('options');
						$.getScript(wishUrl,function(){
							var saveText = wishActions.parent().find(".wish-text-saved");
							saveText.fadeIn();
							$('.wish-update', wishActions).hide();
						});
						return false;
					});
					
				});
			}
		});
	}else{
		config.messages.hide().filter(".notLoggedIn").show();
	} 
};
window.addCustomer = function addCustomer(customerId, customerName, customerLastName, customerEmail){
	var template = 	"<div class='wish-result'>";
	template +=			"<a href='#'>" + unescape(customerName) + " " + unescape(customerLastName) + " - " + customerEmail + "</a>";
	template +=			"<input type='hidden' value='" + customerId + "' />";
	template +=		"</div>";
	$("#wish-search-results").append(template);
};
window.searchWishlist = function searchWishlist(config){
	var today = new Date();
	$.getScript("/app/site/hosting/scriptlet.nl?script=customscript_search_wishlist&deploy=customdeploy_search_wishlist&st=" + config.searchText + "&random=" + (Math.random() * today.getTime()), function(){
		config.messages.hide();
		$(function(){
			var wishlist = $("#wishlist-wrapper"), wishResultsWrapper = $("#wish-search-results");
			if (wishResultsWrapper.find(".wish-result").length == 0)
				config.messages.eq(2).show();
			else {
				config.messages.eq(4).show();
				wishResultsWrapper.find("a").click(function(){
					
					config.messages.eq(7).hide();

					var resultNameAndTitle = $(this).text();
					var name = LSP.utilities.cleanTrailing(resultNameAndTitle.substr(0, resultNameAndTitle.indexOf(' - ')));

					if(name.length === 0){
						name = resultNameAndTitle.substr(resultNameAndTitle.indexOf(' - ') + 3, 300);
					}
					$(this).parent().siblings().remove();
					$('h2').html('Wishlist for ' + name).show();

					wishlist.hide().find("tbody tr:not(#wish-item-template)").remove();
					var customerId = $(this).next().val();

					//LSP.controllers.application.pushState({name : 'wishlist'}, {q : name});


					$.getScript("/app/site/hosting/scriptlet.nl?script=customscript_show_my_wishlist&deploy=customdeploy_show_my_wishlist&j=" + customerId + "&s=" + config.site, function(){
						if(wishlist.find("tbody tr:not(#wish-item-template)").length > 0)	{
							wishlist.show().find(".wish-add-cart").click(function(){
								var wishActions = $(this).parent(), itemId = wishActions.find(".wish-id").val(), itemQty = wishActions.find(".wish-qty").val(), itemOptions = wishActions.find(".wish-options-values").val(), addUrl = "/app/site/backend/additemtocart.nl?c=" + config.account + "&buyid=" + itemId + "&qty=" + itemQty + itemOptions + "&continue=/Search-Wishlist?searchtext="+config.searchText;
								document.location = addUrl;
								return false;
							});	
						}
						else config.messages.eq(7).show();
					});
					return false;
				});
				config.messages.eq(6).show();
			}
		});
	});
};

// END SuiteCommerce stuff

(function(){
	
	var _util = window.LSP.utilities;
	
	_util.register('controller', 'wishlist', (function(){
		var _this = {};
		var _lsp = window.LSP;
		
		_this =  {
			name : 'wishlist',
			events : {
				application : {
					onReady : function(e, data){

						if(LSP.config.wishlist){
							myWishlist(LSP.config.wishlist.myWishlistSettings);
						}
						
						var searchButton = $("#search-wish"),
							searchText = $("#search-wish-text"),
							wishMessages = $(".wishlist-messages > div");
						searchText
							//.val("Enter name or e-mail")
							// .focus(function(){
							// 	var $this = $(this);
							// 	// if( $this.val() == "Enter name or e-mail" )
							// 	// 	$this.val("")
							// })
							// .blur(function(){
							// 	var $this = $(this);
							// 	// if( $this.val() == "" )
							// 	// 	$this.val("Enter name or e-mail")
							// })
							.keyup(function(e){
								if(e.keyCode == 13) searchButton.trigger("click");
							});
						searchButton.off('wishlist').on('click.wishlist', function(){
							wishMessages.hide();
							$('.resultsHeader').hide();
							$("#wish-search-results").html("");
							$("#wishlist-wrapper").hide().find("tbody tr:not(#wish-item-template)").remove();
							if(searchText.val() != "")	{
								if (searchText.val().length > 2) {
									wishMessages.eq(1).show();
									searchWishlist({
										account : "665798",
				            			messages: wishMessages,
										searchText : searchText.val(),
				            			site: 'lonestarpercussion'
									});
								}
								else wishMessages.eq(5).show();
							}
							else wishMessages.eq(0).show();
						});
						var url = window.location.href;
						if( url.indexOf("searchtext") != -1 ) {
							var searched = url.substring( url.indexOf("searchtext") + 11 );
							searched = searched.substring( 0, searched.indexOf("&") );
							searchText.val( searched );
							searchButton.click();
						}
					}
				}
			},
			assets : {},

		};

		return _this;

	}()));

})();


});

}())
