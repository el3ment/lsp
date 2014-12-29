!function(){define(["utilities/global","models/netsuite","controllers/application"],function(){var a=window.LSP.utilities,b=function(){var b={},c=window.LSP,d=c.models.netsuite;return b={name:"shipping",events:{application:{onAttachEvents:function(a,c){$("#search-orders",c.selector).bind("click",function(a){return b.handleSubmit({search:$('.page-trackOrder input[name="search"]').val()||""}),a.preventDefault(),!1})}}},assets:{},handleSubmit:function(a){"1Z"===a.search.substr(0,2).toUpperCase()?b.redirectToUPS(a.search):($("#responseTable").addClass("loading"),$("#responseTable table").hide(),$.when(b.requestTrackingNumber(a.search)).done(function(a){b.renderTrackingData(b.parseAPIResponse(a.response.data))}).fail(function(){$("#responseTable").html($("#templates-trackOrder-error").html())}).always(function(){$("#responseTable").removeClass("loading")}))},renderTrackingData:function(b){var c=a.parseMicroTemplate("templates-trackingResponse",b);$("#responseTable").html(c)},parseAPIResponse:function(a){for(var c=a.trackingnumbers.split(" "),d=[],e=0;e<c.length;e++){var f=b.getCarrierFromTrackingNumber(c[e]);d.push({orderId:a.internalid.value,orderDate:a.trandate,orderNumber:a.number,trackingNumber:c[e],trackingUrl:"ups"==f?"http://wwwapps.ups.com/ietracking/tracking.cgi?tracknum="+c[e]:"https://tools.usps.com/go/TrackConfirmAction.action?tLabels="+c[e],carrier:f})}return d},getCarrierFromTrackingNumber:function(a){return"1Z"==a.substr(0,2).toUpperCase()?"ups":"usps"},requestTrackingNumber:function(a){return d.request(b,"getTrackingNumber","getTrackingNumber",{search:$.trim(a)})}}}();a.register("controller","shipping",b)})}();