!function(){define(["utilities/global","controllers/application","models/api","models/easyask"],function(){var a=window.LSP.utilities;a.register("controller","search",function(){var b={},c=window.LSP,d=c.models.easyask,e=!1,f=!0,g={},h=[],i={};return b={events:{search:{onBeforeAPICall:function(){var a=$("#templates-search-page");if(!a.length)return alert("Unfortunately it appears the templates can't be loaded, please call to complete your order"),_gaq.push(["_trackEvent","search","error","templatesCannotBeLoaded"]),!1;$(".page-generic").height();$(".page-search").addClass("loading")},onAfterAPICall:function(){$(".page-search, .page-generic").removeClass("loading"),$("html").removeClass("search-loading"),f=!1},onAfterAPICallSuccess:function(a,c){if(c.response){var e=c.response.source.navPath.navPathNodeList;g.category=d.getCategoriesFromSEOPath(e[e.length-1].seoPath).replace(/\/$/,""),g.category=g.category.replace(/\/.*\/.*\//,"/"),g.allAttributes=d.getRefinementsFromSEOPath(e[e.length-1].seoPath).replace(/\/$/,""),g.keywords=decodeURIComponent(d.getKeywordsFromSEOPath(e[e.length-1].seoPath).replace(/\-/g," ").replace(/^ /,"")),g.page=((c.response.source.products||{}).itemDescription||{}).currentPage,i=c,$.when(b.scrollToFirst()).done(function(){c.xhrData.passthrough.preventPushState||b.pushState()})}},onAfterAPICallFailure:function(a,c){b.renderFatalError(c)},onRemoveFilter:function(a,c){var d=$(c.selector).data("attribute");$('#refinementForm input[name="'+d+'[]"][value="'+$(c.selector).data("value")+'"]').attr("checked",!1),b.updateHistoryMap(d),b.removeFilterAttribute($(c.selector).data("value"));var e=$(c.selector).data("value").split(":");_gaq.push(["_trackEvent","search","removeFilterAttribute",e[0],e[1]])},onSearch:function(a,c){var d=$('input[name="searchQuery"]',c.selector).trigger("blur").val()||"";d.length>0&&(-1===document.location.href.indexOf("https")?($(".mobileSearch .b3").click(),("undefined"!==d&&d.length||g.keywords&&(g.keywords||{}).length)&&(delete g.category,delete g.allAttributes,f=!1,g.keywords=d,b.search(d))):document.location="http://www.lonestarpercussion.com/#/~search/keywords/"+encodeURIComponent(d)),_gaq.push(["_trackEvent","search","keywordSearch",d])},onRemoveSearch:function(){b.removeSearch(),$('input[name="searchQuery"]').val("").change()},onFilterAttribute:function(a,c){var d=$(c.selector).attr("name").replace("[]","");b.updateHistoryMap(d),$(c.selector).is(":checked")?b.addFilterAttribute($(c.selector).val()):b.removeFilterAttribute($(c.selector).val());var e=$(c.selector).val().split(":");_gaq.push(["_trackEvent","search","filterAttribute",e[0],e[1]])},onClearAllRefinements:function(){h=[],g.allAttributes="",g.keywords="",b.loadCategory(g.category),_gaq.push(["_trackEvent","search","clearAllRefinements",!0])},onLoadCategory:function(a,c){b.loadCategory($(c.selector).data("path"),!0),c.originalEvent.preventDefault(),f=!1,_gaq.push(["_trackEvent","search","filterCategory",$(c.selector).data("path")])},onDestroyAndLoadCategory:function(a,d){if(f=!1,-1===document.location.href.indexOf("https")){var e=($(d.selector).attr("href")+"#").split("#"),g=(c.controllers.application.parseStateFromHash(e[1])||{}).search||{};g.category=g.category||e[0],h=[],b.loadState(g,null,!0)&&($("html").attr("data-path","").addClass("search-loading"),b.scrollToFirst(),c.controllers.flyout.closeFlyout(),d.originalEvent.preventDefault())}_gaq.push(["_trackEvent","search","browseToCategory",g.category])},onRemoveCategory:function(a,c){for(var d="/"+g.category,e=$(c.selector).data("removepath").split("/"),f=0;f<e.length;f++)e[f].length>0&&(d=(d+"/").replace("/"+e[f]+"/","/"));b.loadCategory(d.replace(/\/{1,}/g,"/","/"),!0),_gaq.push(["_trackEvent","search","removeCategory",e])},onNextPage:function(){b.paginate("next"),_gaq.push(["_trackEvent","search","paginate","next"])},onPreviousPage:function(){b.paginate("prev"),_gaq.push(["_trackEvent","search","paginate","previous"])},onSort:function(a,c){g.sort=$(c.selector).val(),b.paginate("first"),_gaq.push(["_trackEvent","search","sort",$(c.selector).val()])},onItemsPerPage:function(a,c){g.resultsPerPage=$(c.selector).val(),b.paginate("first"),_gaq.push(["_trackEvent","search","resultsPerPage",$(c.selector).val()])},onShowCompactView:function(){b.changeView("gridView"),b.pushState(),_gaq.push(["_trackEvent","search","changeView","compact"])},onShowDetailsView:function(){b.changeView("listView"),b.pushState(),_gaq.push(["_trackEvent","search","changeView","detailed"])}},application:{onStateChange:function(){c.controllers.application.pullState(b)?(f=!1,b.loadCurrentState()):f||document.location.reload()},onReady:function(){(c.controllers.application.pullState(b)||((LSP.config||{}).search||{}).loadCurrentState)&&b.loadCurrentState()},onInit:function(){},onContextChangeEnterPhone:function(){b.changeView("listView")}}},assets:{},updateHistoryMap:function(b){require(["vendors/form2js/form2js"],function(){var c=a.formToObject($("#refinementForm")[0]),d=$.grep(h,function(a){return a.name===b}).length;d?h[h.length-1].name!==b&&(h[h.length-1].displayState="static"):h.push({name:b,displayState:"temporary"});for(var e=0;e<h.length-1;e++)h[e].displayState="static";for(var e=0;e<h.length;e++){var f=h[e].name;c[f]||h.splice(e,1)}})},loadCurrentState:function(){b.loadState(c.controllers.application.pullState(b),{preventPushState:!f})},getState:function(){var a=$.extend({},g);return c.controllers.application.hasPushState()&&delete a.category,a.allAttributes={value:(a.allAttributes||"").replace(/[\/]/g,","),uriEncode:!1},a.path=g.category,0===a.allAttributes.value.length&&delete a.allAttributes,a},pushState:function(){var a=b.getState();return c.controllers.application.pushState(b,a,f)},pullState:function(a){var b=document.location.pathname.replace(/\?.*/,""),c={page:"1",view:(LSP.settings||{}).defaultSearchView||"listView"};return g=$.extend({},c,a||{}),g.allAttributes=((g||{}).allAttributes||"").replace(/[\|\,]/g,"/"),b.indexOf(".html")>-1&&!g.category?g.category=b.substring(0,b.lastIndexOf("/")):g.category||(g.category=b),g.category="/"===g.category?"":g.category,g.category=g.category.replace(/^\//,""),g.category=g.category.replace(/\/$/,""),g.keywords&&(g.keywords=decodeURIComponent(g.keywords).replace(/\-/g," ").replace(/^ /,"")),g},loadState:function(c,d,e){var h=$.extend({},g);return b.pullState(c),$('input[name="searchQuery"]').val(g.keywords),a.isEqual(h,g)?!1:(e&&(f=!1),b.search(null,d),!0)},search:function(a,c){var f={action:"advisor",method:"CA_Search",keywords:null===a?g.keywords:a};return d.request(b,"search",$.extend({},g,{isSingleSelect:e},f),c).done(function(a){a.response&&(1!==((((a.response||{}).source||{}).products||{}).items||[]).length||((((a.response||{}).source||{})._lsp||{}).query||{}).assumedQuery?b.renderPage(a.response.source):document.location.replace(a.serverResponse.source.products.items[0].Item_URL))})},removeSearch:function(){var a={action:"advisor",method:"CA_BreadcrumbRemove"};return delete g.keywords,d.request(b,"removeSearch",$.extend({},g,{isSingleSelect:e},a)).done(function(a){b.renderPage(a.response.source)})},loadCategory:function(a,c){var f={action:"advisor",method:"CA_CategoryExpand",category:c?a:g.category.replace(/\/$/,"")+"/"+a};return d.request(b,"loadCategory",$.extend({},g,{isSingleSelect:e},f)).done(function(a){b.renderPage(a.response.source)})},addFilterAttribute:function(a){var c={action:"advisor",method:"CA_AttributeSelected",attribute:a};return d.request(b,"filter",$.extend({},g,{isSingleSelect:e},c)).done(function(a){b.renderPage(a.response.source)})},removeFilterAttribute:function(a){var c={action:"advisor",method:"CA_BreadcrumbRemove",allAttributes:g.allAttributes.replace(a,"").replace(";;",";").replace("//","/").replace(/((\/;)|(;\/))/g,"/").replace(/^[\/;]/,"").replace(/[;\/]$/,"")};return d.request(b,"removeFilter",$.extend({},g,{isSingleSelect:e},c)).done(function(a){b.renderPage(a.response.source)})},paginate:function(a){var c={action:"navbar",method:$.isNumeric(a)?"page"+a:a,currentPage:g.page};return d.request(b,"paginate",$.extend({},g,c)).done(function(a){b.renderSummary(a.response.source),b.renderProducts(a.response.source)})},changeView:function(a){("gridView"===a||"listView"===a)&&($("#resultsContainer").removeClass("gridView").removeClass("listView").addClass(a),g.view=a,$(".thumbnail img[data-src][data-lazy-handled]").unveil())},renderPage:function(d){if(!$(".page-search").length){$(".page-generic").length||$("#div__body").addClass("page-generic");var e=a.parseMicroTemplate("templates-search-page",{}),f=$.parseHTML(e);$(".page-generic").after(f).hide(),c.controllers.application.attachEvents($(".page-search"))}b.changeView(g.view),$(".page-search").show(),$(".page-generic").hide(),b.renderSummary(d),b.renderSelectedRefinements(d),b.renderRefinements(d),b.renderProducts(d)},scrollToFirst:function(){return a.scrollTo($("body"))},renderSummary:function(b){var d=(g.category,((b.products||{}).itemDescription||{}).currentPage),e=((b.products||{}).itemDescription||{}).pageCount,f=a.parseMicroTemplate("templates-search-breadcrumbs",$.extend({},b)),h=$("#breadcrumbs").html(f);c.controllers.application.attachEvents(h),h.is(":has(button)")?h.parent(".breadcrumbs").removeClass("hide"):h.parent(".breadcrumbs").addClass("hide");var i=a.parseMicroTemplate("templates-search-title",$.extend({},b));c.controllers.application.attachEvents($("#searchTitle").html(i)),$(".currentPageNumber").html(d),$(".totalPages").html(e),$(".numberOfResults").html(((b.products||{}).itemDescription||{}).totalItems);var j=((b.products||{}).itemDescription||{}).sortOrder||"default";$('select[data-action="sort"]').val(j.indexOf("EAScore")>-1?"default":j),$('select[data-action="itemsPerPage"]').val(((b.products||{}).itemDescription||{}).resultsPerPage),1===d?$('*[data-action="previousPage"]').css("visibility","hidden"):$('*[data-action="previousPage"]').css("visibility","visible"),d===e?$('*[data-action="nextPage"]').css("visibility","hidden"):$('*[data-action="nextPage"]').css("visibility","visible");var k=[];b.navPath._lsp.searchNode&&k.push('"'+b.navPath._lsp.searchNode.englishName+'"');for(var l=b.navPath._lsp.refinementNodes.length-1;l>=0;l--)k.push(b.navPath._lsp.refinementNodes[l].value);document.title=$("#pageName").text()+(k.length?" : "+k.join(", "):"")+" | Lone Star Percussion",$("html").attr("data-title",document.title),_gaq.push(["_trackPageview",g.category+(g.keywords?"/?search="+g.keywords:"")])},renderSelectedRefinements:function(b){var d=a.parseMicroTemplate("templates-search-selectedRefinements",$.extend({},b));c.controllers.application.attachEvents($("#selectedRefinements").html(d))},renderRefinements:function(b){for(var d=0;d<h.length;d++)for(var e=0;e<b.attributes._lsp.cached.length;e++){var f=b.attributes._lsp.cached[e];if((h[d]||{}).name===f.name){b.attributes._lsp.cached[e].displayState=h[d].displayState;break}}var g=a.parseMicroTemplate("templates-search-refinements",$.extend({},b));c.controllers.application.attachEvents($("#searchRefinements").html(g).show()),(b.attributes._lsp.cached||{}).length?$("#searchRefinements").removeClass("empty"):$("#searchRefinements").addClass("empty")},renderProducts:function(d){var e=a.parseMicroTemplate("templates-search-entries",$.extend({},d));c.controllers.application.attachEvents($("#searchEntries").html(e)),b.changeView(g.view)},renderFatalError:function(a){_gaq.push(["_trackEvent","search","error","fatalError : "+a.serverResponse.status+" : "+a.serverResponse.statusText]),receievedMessage=(a.response.errorMsg||"").length>0?" "+a.response.errorMsg+" ":" ",alert("Something has gone wrong with our network connection to our database."+receievedMessage+"Sorry about that!")}}}())})}();