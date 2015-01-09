!function(){define(["utilities/global","controllers/application"],function(){var a=window.LSP.utilities;a.register("controller","netsuite",function(){{var b={};window.LSP}return b={events:{application:{onReady:function(){b.attachEnterKey(),b.fixSignInUrlForRedirection(document),b.injectRedirectInput(),b.fixLogoutUrl(document)},onAttachEvents:function(a,c){b.fixSignInUrlForRedirection(c.selector)}},netsuite:{onInit:function(){b.handlePostSignInRedirection()}}},assets:{},injectRedirectInput:function(){var b=a.getURLParameters();b.lsppassthrough&&document.forms.login&&$(document.forms.login).prepend('<input type="hidden" name="redirect" value="'+b.lsppassthrough+'">')},fixLogoutUrl:function(a){var b=($('[href*="logoff=T"]',a).attr("href")||"").replace("sc=4","sc=30");$('[href*="logoff=T"]',a).attr("href",b)},fixSignInUrlForRedirection:function(b){var c=-1===document.location.href.indexOf("lsppassthrough=")?encodeURIComponent(document.location.href):a.findBetween("lsppassthrough=","&",document.location.href);-1===c.indexOf("login=T")&&$('a[href*="login=T"]:not([href*="'+c+'"], [href*="logoff=T"])',b).each(function(a,b){var d=$(b);d.attr("href",d.attr("href")+"&lsppassthrough="+c)})},handlePostSignInRedirection:function(){if(parseInt($(".page-generic").data("uid"),10)>0){var b=a.getURLParameters();b.lspredirectto&&(document.location=b.lspredirectto)}},attachEnterKey:function(){$(".page-generic table table table input").off(".submitter").on("keyup.lsp.submitter",function(a){$(this);switch(a.which){case 13:$(this).data("isDirty")&&($(this).parents().each(function(b,c){var d=$(c).find('#tbl_recalc *[type="submit"], #tbl_submitter *[onclick]')[0];return d?($(d).attr("onclick")?d.click():($('input[name="redirect"]').val(""),d.form.submit()),!1):void a.stopPropagation()}),$(this).data("isDirty",!1));break;case 40:case 38:$(this).data("isDirty",!1);break;default:$(this).data("isDirty",!0)}}).data("isDirty",!0)}}}())})}();;!function(){define(["utilities/global","controllers/application"],function(){var _util=window.LSP.utilities;_util.register("controller","checkout",function(){var _this={},_app=window.LSP,_assets=_app.assets,_util=_app.utilities,_state={},_mainTable="body .span12 > table";return _this={events:{checkout:{onInit:function(){LSP.config=LSP.config||{},_this.setPage(LSP.config.setPage)},onEnterCart:function(e,data){var timeout;if($('a[href="#"]').attr("href",null),$('input[name="checkout"]').attr("formnovalidate",!0).click(function(){setTimeout(function(){clearTimeout(timeout)},1e3)}).parent().click(function(){timeout=setTimeout(function(){_gaq.push(["_trackEvent","cart","error","5 seconds have passed since clicking proceed to checkout"])},5e3)}),$('td.uir-list-row-cell:nth-child(4):not(:contains(":"))').addClass("hidden-phone"),$(".extcartborder").length){$("tr[id*=carttablerow] ~ tr:not([id])").addClass("tablefooter").last().addClass("total");var rows=$(".tablefooter");$(rows[0]).addClass("footerMerch"),$(rows[1]).addClass("footerTax"),$(rows[2]).addClass("footerShip"),$(rows[3]).addClass("footerOther"),$(rows[4]).addClass("footerTotal"),$('.footerTotal b:contains("Subtotal"):last').text("Order Total");var countryInput=$('select[name="country"]').detach().wrap('<div class="shipInput countryInput"></div>').parent(),zipInput=$("#zip").detach().wrap('<div class="shipInput zipInput"></div>').parent(),carrierInput=$("#shippingcarrierselect").detach().wrap('<div class="shipInput carrierInput"></div>').parent(),carrierChoices=$("<table class='carrierChoices'></table>");$('input[type="radio"][name="sShipMeth"]').parent().wrap("<tr></tr>").parent().prependTo(carrierChoices);var shipLine=$(".footerShip > td:first-child").attr("colspan","0").attr("style","display:none!important;").next().attr("colspan","6");$(".footerMerch .texttable:not(:last-child)").remove(),$(".footerMerch td:first-child").attr("colspan","6"),$(".footerTotal .extcartborder").remove(),$(".footerTotal .extcarttotal").attr("colspan","6"),$('<input id="countryforminput" name="country" type="hidden">').prependTo('form[name="cart"]'),$('<input id="zipforminput" name="zip" type="hidden">').prependTo('form[name="cart"]'),$('<input id="shippingcarrierforminput" name="shippingcarrierselect" type="hidden">').prependTo('form[name="cart"]'),$('<input id="shipmethforminput" name="sShipMeth" type="hidden">').prependTo('form[name="cart"]'),"More"==$("select option[selected]",carrierInput).text().replace(/^\s\s*/,"").replace(/\s\s*$/,"")&&$(carrierChoices).attr("style","display: none !important;"),$('option:contains("More")',carrierInput).text("Standard (2-6 Days)"),$(zipInput).prependTo(shipLine),$(countryInput).prependTo(shipLine),$(carrierInput).prependTo(shipLine),$(carrierChoices).appendTo(shipLine),$("b",shipLine).replaceWith($('<div class="label">Shipping<div class="details" style="font-weight:normal !important;">Enter your zip code</div></div>')),$("select",carrierInput).attr("onchange","").on("change",function(){$("#shippingcarrierforminput").val($(this).val()),"nonups"==$(this).val()&&eval($(".footerShip script").html().replace("&sShipMeth=","&sShipMeth=51489")),shippingSelectOnChange()}),$(":input",countryInput).on("change",function(){$("#countryforminput").val($(this).val())}),$("#countryforminput").val($(":input",countryInput).val()),$("#shipmethforminput").val($('input[type="radio"][name="sShipMeth"][checked]').val()),$("#zipforminput").val($(":input",zipInput).val()),$("#shippingcarrierforminput").val($(":input",carrierInput).val()),$(":input",countryInput).on("change",function(){$("#recalc").click()}),$(":input",zipInput).on("change",function(){$("#zipforminput").val($(this).val())}),$(".zipInput input").on("blur",function(){$("#recalc").click()}),$("#tbl_recalc").attr("style","display: none;"),$('input[size="6"], .zipInput input').one("keydown",function(){$("#tbl_recalc").attr("style","")})}$("html").attr("data-path","http://www.lonestarpercussion.com/cart")},onEnterSignup:function(){$("#emailsubscribe_fs_lbl").wrap('<label for="#emailsubscribe_fs"></label>'),$("td:contains('Your password hint')").prev().remove()},onEnterAddress:function(){_this.setPage($(".greytitle").is(':contains("Shipping")')?"shippingAddress":"billingAddress")},onEnterShippingAddress:function(){$(_mainTable+" > tbody > tr > td > table > tbody > tr.portletHandle:first-child + .noprint + .portletHandle:not(:has(#address))").css({height:"0px",visibility:"hidden"})},onEnterBillingAddress:function(){},onEnterShippingMethod:function(){$("#kReferralCode, #applycoupon").attr("tabindex",-1)},onEnterPayment:function(){$('input[name="gc"], #applygift').attr("tabindex",-1),$("#stepSlider").prependTo(".page-generic:first").wrap('<table><tr height="25"><td></td></tr></table>'),$("#paymeth > table").parent().parent().addClass("row-fluid"),$("#paymeth > table").addClass("span8").attr("style",""),$('<div class="span4 rightColumn pull-right"><div class="orderSummary"></div>').insertBefore("#paymeth > table"),$(".cart").prependTo(".orderSummary"),$('.adForPaymentPage *[class*="bsa-"]').appendTo(".rightColumn").parent().removeClass("hide"),0==$(".newGiftCardRow").length&&$('<tr class="newGiftCardRow"><td class="smalltextnolink" align="right" style="padding-top:10px;"><input id="giftCardCheckbox" type="checkbox" style="float:right;position:relative;top:10px;" onclick="window.toggleGiftCard()"></td><td style="padding-top:20px;">Do you have a gift card?<div class="details">Redeeming a Gift Card is easy!</div></tr>').insertBefore('input[name="sIssueNo"]'),$('td:contains("Apply a Gift Card"):last').attr("style","visibility: hidden;"),$('.greytitle:contains("Gift Card"):last').attr("style","display: none !important;").parent().prev().attr("style","display: none !important;"),$('tr:contains("Apply a Gift Card"):last').addClass("giftCardRow"),$('tr:contains("If you have a gift card"):last').attr("style","display: none !important;"),$('input[name="sValidFromYr"] ~ tr:contains("Invalid"):last table').attr("style","margin: 20px 5px 10px 160px;"),window.toggleGiftCard=function(){$("#giftCardCheckbox").is(":checked")?($(".giftCardRow").attr("style",""),$("#giftCardCheckbox").prop("checked",!0)):$(".giftCardRow").attr("style","display: none !important;")},window.toggleGiftCard(),$('input[name="gc"]').val().length>0&&($(".giftCardRow").show(),$('tr:contains("Do you"):last').attr("style","display: none !important;")),$('tr:contains("For most credit"):last').attr("style","display: none !important;"),0==$('.notice:contains("You will")').length&&$('<div class="notice" style="position: absolute;bottom: -110px;height: 100px;">You won&#39;t be charged yet<span class="details">You will review and place your order on the next page</span></div>').prependTo("#paymeth > table > tbody > tr:nth-child(3) > td > table > tbody > tr > td")},onEnterReview:function(){$('td:contains("If you have an offer or promotion code, enter it here")').prev().addClass("hidden-phone"),$('td.uir-list-row-cell:nth-child(4):not(:contains(":"))').addClass("hidden-phone")},onEnterThankYou:function(){var a=$(_mainTable+" > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr > td > table > tbody > tr:first-child + tr > td > table,#checkout table table table > tbody > tr:first-child + tr > td > table:not(.texttable table)").attr("id","carttable");$("> tbody > tr:first-child",a).attr("id","carttableheader"),$("> tbody > tr:first-child ~ tr",a).not("tr[id]").each(function(a,b){$(b).attr("id","carttablerow"+a)}),$("#ordersummary_total .texttablert:first-child b").text("Total"),$(_mainTable).addClass("nscheckout-receipt"),_gaq.push(["_trackTrans"])},onEnter:function(a,b){try{$('input[name*="email"]:not([type="checkbox"])').attr("type","email"),$('input[name*="zip"], input[name*="phone"], input[name*="sCardNum"], input[name*="ccsecuritycode"]').attr("type","tel"),$("input:not([type])").attr("type","text"),_app.controllers.netsuite.attachEnterKey()}catch(a){}"address"!==b.pageName&&(_gaq.push(["_set","title","Checkout - "+b.pageName]),_gaq.push(["_trackPageview","/checkout/"+b.pageName]))}},application:{onAttachEvents:function(){},onReady:function(){},onInit:function(){}}},assets:{},setPage:function(a){_state.page=a,console.log("Firing Page Event : "+_util.camelCase("on-enter-"+a)),$(_this).triggerHandler(_util.camelCase("on-enter"),{selector:$(document),pageName:a}),$(_this).triggerHandler(_util.camelCase("on-enter-"+a),{selector:$(document)}),$(_mainTable).addClass("nscheckout-"+a)}}}());for(var i=0;i<(((LSP.config||{}).checkout||{}).page||[]).length;i++)LSP.controllers.checkout.setPage(LSP.config.checkout.page[i])})}();;//https://checkout.sandbox.netsuite.com/javascript/NLUtil.jsp__NS_VER=2013.1.0&minver=101&locale=en_US.nlqs
function debugAlert(a){}function debugStartTimer(){}function debugGetTime(){}(function(f){var a=f.document,c=f.location,b=f.navigator;var d=(function(){var g=0;return{getWindow:function(){return f;},getDocument:function(){return a;},getLocation:function(){return c;},getNavigator:function(){return b;},isUndefined:function(h){return(typeof h==="undefined");},getURLParameter:function(j){var h=new RegExp("[?&]"+j+"=([^&]*)").exec(c.search);return(h!=null)?decodeURIComponent(h[1]):null;},getUniqueId:function(){return ++g;}};}());d.event=(function(){var l={};var h=function(m,n){this.name=m;this.fn=n;};var j=function(n,o,m){this.fn=n;this.condition=o;this.scope=m;};var k=function(m,q,t,p,o){var n,r;if(!l[m]){l[m]={};}n=l[m];p=p||d.getWindow();q.nsEventGuid=q.nsEventGuid||d.getUniqueId();r=q;if(o){q=function(){delete n[q.nsEventGuid];r.apply(this,arguments);};q.nsEventGuid=r.nsEventGuid;}n[q.nsEventGuid]=new j(q,t,p);};var g=function(m,o,n){setTimeout(function(){var p=new h(m,o.fn);if(!o.condition||o.condition.call(o.scope,p,n)){o.fn.call(o.scope,p,n);}},0);};return{bind:function(m,o,n){k(m,o,null,n,false);},once:function(m,p,o,n){k(m,p,o,n,true);},dispatch:function(m,q){var n,p,o;if(l[m]){p=l[m];for(n in p){if(p.hasOwnProperty(n)){o=p[n];g(m,o,q);}}}},unbind:function(m,n){if(n.nsEventGuid){if(l[m]){delete l[m][n.nsEventGuid];}}}};}());d.event.type={FORM_INITED:"formInited",FORM_CHANGED:"formChanged",FORM_VALID:"formValid",PAGE_INIT_FINISHED:"pageInitFinished",FIELD_CHANGED:"fieldChanged"};d.form=(function(){d.getWindow().ischanged=false;d.getWindow().isvalid=true;return{isInited:function(){return(d.getWindow().isinited===true);},setInited:function(g){if(typeof g==="boolean"&&this.isInited()!==g){d.getWindow().isinited=g;d.event.dispatch(d.event.type.FORM_INITED,{value:g});}},isChanged:function(){return d.getWindow().ischanged;},setChanged:function(g){if(typeof g==="boolean"&&this.isChanged()!==g){d.getWindow().ischanged=g;d.event.dispatch(d.event.type.FORM_CHANGED,{value:g});}},isValid:function(){return d.getWindow().isvalid;},setValid:function(g){if(typeof g==="boolean"&&this.isValid()!==g){d.getWindow().isvalid=g;d.event.dispatch(d.event.type.FORM_VALID,{value:g});}},isEditMode:function(){return(d.getURLParameter("e")=="T");},isViewMode:function(){var g=d.getURLParameter("id")||"-1";return(!this.isEditMode()&&g!="-1");},isNewMode:function(){var g=d.getURLParameter("id")||"-1";return(!this.isEditMode()&&g=="-1");}};}());f.NS=d;}(this));if(!Array.prototype.push){Array.prototype.push=function(){var b=this.length;for(var a=0;a<arguments.length;a++){this[b+a]=arguments[a];}return this.length;};}try{parentAccesible=(typeof parent.encode!="undefined");}catch(e){parentAccesible=false;}function encode(a){return escape(a).replace(/\+/g,"%2B");}function alphafirst(b){var a=new RegExp("([A-Za-z].*)");return(a.exec(b)!=null&&RegExp.$1==b);}function stacktrace(){var c="stacktrace: ";for(var b=arguments.callee.caller;b!=null;b=b.caller){c+=getFuncName(b);c+=getFuncArgs(b)+"\n\n";if(b.caller==b){break;}}return c;}function getFuncArgs(b){s="arguments: {";for(i=0;i<b.arguments.length;i++){if(typeof b.arguments[i]=="undefined"){s+="'undefined'";}else{if(b.arguments[i]==null){s+="null";}else{if(typeof b.arguments[i]=="string"){s+="'"+b.arguments[i].toString()+"'";}else{s+=b.arguments[i].toString();}}}if(i<b.arguments.length-1){s+=",";}}s+="}";return s;}function getFuncName(b){var a=b.toString();if(a.indexOf("anonymous")>=0){if(a.length>100){return a.substr(0,100)+"\n";}else{return a+"\n";}}else{a=a.match(/function[^{]*/)[0];}if((a==null)||(a.length==0)){return"anonymous \n";}return a;}function scrollDiv(){if(document.getElementById("div__label")){document.getElementById("div__label").scrollLeft=document.getElementById("div__body").scrollLeft;}}function getDocumentClientHeight(){var a=(window.parentAccesible&&typeof parent!="undefined"&&typeof parent.Ext!="undefined"&&parent.Ext.WindowMgr.getActive()!=null);return(a?parent.Ext.WindowMgr.getActive().body.dom.contentWindow.innerHeight:window.innerHeight);}function getDocumentClientWidth(){var a=(window.parentAccesible&&typeof parent!="undefined"&&typeof parent.Ext!="undefined"&&parent.Ext.WindowMgr.getActive()!=null);return(a?parent.Ext.WindowMgr.getActive().body.dom.contentWindow.innerWidth:window.innerWidth);}function getDocumentHeight(){if(window.innerHeight){return window.innerHeight;}else{if(document.documentElement&&document.documentElement.clientHeight&&document.documentElement.clientHeight!=0){return document.documentElement.clientHeight;}else{return document.body.clientHeight;}}}function getDocumentWidth(){if(window.innerWidth){return window.innerWidth;}else{if(document.documentElement&&document.documentElement.clientWidth&&document.documentElement.clientWidth!=0){return document.documentElement.clientWidth;}else{return document.body.clientWidth;}}}function getElementContentWidth(a){return a.offsetWidth-getRuntimeSize(a,"paddingLeft")-getRuntimeSize(a,"paddingRight")-getRuntimeSize(a,"borderLeftWidth")-getRuntimeSize(a,"borderRightWidth")-getRuntimeSize(a,"marginLeft")-getRuntimeSize(a,"marginRight");}function getElementContentHeight(a){return a.offsetHeight-getRuntimeSize(a,"paddingTop")-getRuntimeSize(a,"paddingBottom")-getRuntimeSize(a,"borderTopWidth")-getRuntimeSize(a,"borderBottomWidth")-getRuntimeSize(a,"marginTop")-getRuntimeSize(a,"marginBottom");}var ieDiffWidth=0;var ieDiffHeight=0;function initOuter(){var a,f,b,g,d,j;var k=800;var c=600;if(document.all){b=document.body.offsetWidth;g=document.body.offsetHeight;window.resizeTo(k,c);d=document.body.offsetWidth-b;j=document.body.offsetHeight-g;a=k-d;f=c-j;ieDiffWidth=a-b;ieDiffHeight=f-g;window.resizeTo(a,f);}}function outerWd(){if(document.all){if(ieDiffHeight==0){initOuter();}return document.body.offsetWidth+ieDiffWidth;}else{return window.outerWidth;}}function outerHt(){if(document.all){if(ieDiffHeight==0){initOuter();}return document.body.offsetHeight+ieDiffHeight;}else{return window.outerHeight;}}function onBeforePrint(){var a=document.getElementById("div__label");if(a!=null){a.style.width=null;a.style.height=null;}a=document.getElementById("div__body");if(a!=null){a.style.width=null;a.style.height=null;}document.body.scroll="auto";}function onAfterPrint(){if(document.getElementById("resetdivwascalled")!=null){resetDivSizes();}}window.onbeforeprint=onBeforePrint;window.onafterprint=onAfterPrint;function resetDivSizes(){if(document.getElementById("resetdivwascalled")==null){var n=document.createElement("input");n.type="hidden";n.value="T";n.id="resetdivwascalled";document.body.appendChild(n);}var x=document.getElementById("div__header");var F=document.getElementById("div__title");var E=document.getElementById("div__banner");var z=document.getElementById("div__alert");var g=document.getElementById("div__prelabel");var j=document.getElementById("div__label");var B=document.getElementById("div__body");var h=document.getElementById("div__nav");var p=document.getElementById("div__footer");var k=document.getElementById("bannerContainer");var c=getHeight(k);if(c>0){c+=5;}if(B==null){return;}document.body.style.overflowY="hidden";if(p!=null){var C=p.childNodes;for(var y=0;y<C.length;y++){var b=C[y];if(b.tagName=="TABLE"){document.body.style.overflow=(b.scrollWidth>document.body.clientWidth)?"-moz-scrollbars-horizontal":"-moz-scrollbars-none";break;}}}var D=getDocumentHeight()-10;D-=c+getHeight(x)+getHeight(p)+getHeight(F)+getHeight(E)+getHeight(g)+getHeight(j)+getHeight(z)+25;B.style.height=(D>0?D:0)+"px";B.clientWidth;var a=getDocumentWidth();var r=document.getElementById("_rptdata");if(h!=null){B.style.height=(D-B.offsetTop>0?D-B.offsetTop:0);var m=document.getElementById("div__nav_tree");if(m){m.style.height=(D-m.offsetTop>0?D-m.offsetTop:0);}if(r){a-=h.offsetWidth;}var v=h.parentNode;var o=0;while(v!=null){if(v.getAttribute("cellspacing")){o=v.getAttribute("cellspacing");break;}v=v.parentNode;}a-=4*o;}B.style.width=Math.max(a-18,0);D=getDocumentHeight()-10;D-=c+getHeight(x)+getHeight(p)+getHeight(F)+getHeight(E)+getHeight(g)+getHeight(j)+getHeight(z)+25;B.style.height=(D>0?D:0)+"px";if(h!=null){B.style.height=(D-B.offsetTop>0?D-B.offsetTop:0);var m=document.getElementById("div__nav_tree");if(m){m.style.height=(D-m.offsetTop>0?D-m.offsetTop:0);}}if(j!=null){j.style.width=B.clientWidth;j.style.left=-document.getElementById("div__body").scrollLeft;}if(r){var A=document.getElementById("div__labtab");A.style.width=r.clientWidth;}var l=true;var u;var d;for(var y=0;y==0||document.getElementById("div__labcol"+y)!=null;y++){var f=document.getElementById("div__labcol"+y);var t=document.getElementById("div__lab"+y);if(t!=null){var q=f.offsetWidth;if(l&&q>0){l=false;q--;}if(q>0){u=t;d=q;}if(t.tagName=="TD"){t.style.width=q;}else{t.offsetParent.style.width=q;}}}if(u&&d>0){u.style.width=d-1;}makeVisible(j);makeVisible(B);makeVisible(p);var w=document.getElementById("div__labend");if(w){w.style.width=B.offsetWidth-B.clientWidth;if(j){w.style.height=j.offsetHeight;}w.style.left=B.clientWidth-1;}hideInvisibleRows();}function hideInvisibleRows(){var d=document.getElementById("squeezeBox");if(d==null){return;}var a=d.getElementsByTagName("tr");var c=0;for(var b=0;b<a.length;b++){if(a[b].className=="labelRow"&&isValEmpty(a[b].getAttribute("squeezeBox"))){c+=a[b].offsetHeight+1;a[b].setAttribute("squeezeBox","T");}}if(c>0){d.style.overflow="hidden";d.style.height=d.offsetHeight-c+(isIE?0:28);}}function resizePopupWindow(){var c=document.getElementById("div__body");if(c==null){return;}var f=getDocumentWidth()-10;var d=getMaxContentWidth(c.getElementsByTagName("span"));var b=getMaxContentWidth(c.getElementsByTagName("div"));var a=Math.max(c.scrollWidth,Math.max(d,b));if(a>f){window.resizeBy(a-f,0);}}function getMaxContentWidth(a){var b=0;for(i=0;i<a.length;i++){if(a[i].scrollWidth>b){b=a[i].scrollWidth;}}return b;}function getHeight(a){if(a==null){return 0;}else{return a.offsetHeight?a.offsetHeight:0;}}function makeVisible(a){if(a!=null){a.style.visibility="visible";}}function visible(b,a){if(b!=null){b.style.visibility=a?"inherit":"hidden";}}function endsWith(b,a){return b!=null&&a!=null&&b.length>=a.length&&b.substr(b.length-a.length)==a;}function checkzipcode(b,d){var a=b.value;var c=d?6:5;if(!onlydigits(b)||a.length!=c){if(d){alert("Please enter a valid "+c+" digit Postal Code.");}else{alert("Please enter a valid "+c+" digit Zip Code.");}return false;}return true;}function splitIntoRows(a){return a!=null?(a.length>0?a.split(String.fromCharCode(2)):new Array()):null;}function splitIntoCells(a){return a!=null?(typeof(a)=="string"?a.split(String.fromCharCode(1)):a):null;}function isempty(a,b){var c=a.value;return isValEmpty(c,b);}function checknotempty(a,b){if(!checkvalnotempty(a.value,"Please enter a value for {1}".replace("{1}",b))){try{a.focus();a.select();}catch(c){}return false;}return true;}function amount_string(c){var a=Math.floor((c-Math.floor(c))*100+0.5);var b=(a<10)?"0"+a.toString():a.toString();var d=dollars_string(Math.floor(c));return d.charAt(0).toUpperCase()+d.substr(1)+"and "+b+"/100";}function format_rate(m,b){var k;if(isNaN(parseFloat(m))){k="";}else{var g=get_precision();if(g>1||b){var o=(m<0);if(o){m=-m;}var j=Math.floor(m);var l=Math.floor((m-j)*(b?10:100)+0.5);if(m==j+l/(b?10:100)){if(l==(b?10:100)){j++;l=0;}var h=b?l.toString():((l<10)?"0"+l.toString():l.toString());k=(o?"-":"")+j.toString()+"."+h+(b?"%":"");}else{k=(o?"-":"")+m+(b?"%":"");}}else{if(g==1){var o=(m<0);if(o){m=-m;}var h=m.toString();var f=h.indexOf(".");if(f==-1){h=h.toString()+".0";}else{if(f==0){h="0."+h.toString();}else{if(f==h.length-1){h=h.toString()+"0";}}}k=(o?"-":"")+h;}else{if(g==0){var o=(m<0);if(o){m=-m;}var h=m.toString();var f=h.indexOf(".");if(f==0){h="0."+h.toString();}else{if(f==h.length-1){h=h.substring(0,h.length-2);}}k=(o?"-":"")+h;}}}}return k;}function get_precision(){var c=getFormElementViaFormName("main_form","currencyprecision");var a=2;if(c!=null){var b=parseFloat(c.value);if(!isNaN(b)){a=b;}}return a;}function round_currency(g,d,h){var c=d;if(c==null){c=get_precision();}var f=g+"";if(g>10000000000&&f.indexOf(".")>=0&&(f.length-f.indexOf(".")-1<=c)){return g;}var a=Math.abs(g);a=Math.floor((a*100000)+0.5)/100000+0.000001;factor=Math.pow(10,c);if(h==null||h=="OFF"){a=Math.floor((a*factor)+0.5)/factor;}else{if(h=="UP"){a=Math.round(Math.ceil(Math.abs(g)*factor))/factor;}else{if(h=="DOWN"){a=Math.round(Math.floor(Math.abs(g)*factor))/factor;}}}a=a*(g>=0?1:-1);if(a==0){return 0;}return a;}function round_float(b){return round_float_to_n_places(b,8);}function round_float_to_n_places(d,h){var g=d+"";if(g.indexOf(".")<0){return d;}if(g.length-g.indexOf(".")-1<=h){return d;}var c=Math.abs(d);c=c+1e-14;var f=Math.pow(10,h);c=Math.floor((c*f)+0.5)/f;c=c*(d>=0?1:-1);if(c==0){return 0;}return c;}function pad_to_atleast_two_decimal_places(b){var c;if(b==null){c="";}else{c=b.toString();var d=c.indexOf(".");if(d==-1){c=c+".00";}else{if(d==c.length-1){c=c+"00";}else{if(d==c.length-2){c=c+"0";}}}if(d==0){c="0"+c;}}return c;}function pad_decimal_places(b,d){var c;if(b==null){c="";}else{c=b.toString();var f=c.indexOf(".");if(d==0){if(b==0){c=0;}else{if(f>-1){c=c.substring(0,f);}}}else{if(d==1){if(f==-1){c=c+".0";}else{if(f==c.length-1){c=c+"0";}else{if(f==0){c="0"+c;}}}}else{if(f==-1){c=c+".00";}else{if(f==c.length-1){c=c+"00";}else{if(f==c.length-2){c=c+"0";}}}if(f==0){c="0"+c;}}}}return c;}function format_currency(d,c){if(isNaN(d)){return"";}var g=getFormElementViaFormName("main_form","currencyprecision");var f=2;if(g!=null){f=parseFloat(g.value);if(isNaN(f)){f=2;}}var b;if(!(c==true)){b=round_currency(d,f);}else{b=d;}b=pad_decimal_places(b,f);return b;}function format_currency2(c){if(isNaN(c)){return"";}var b;if((c+"").indexOf(".")<0){b=c;}else{b=round_float_to_n_places(c,8);}var a=get_precision();if(a==2){b=pad_to_atleast_two_decimal_places(b);}return b;}function format_percent(a){if(typeof a=="string"){a=parseFloat(a);}return a+(a==Math.floor(a)?".0%":"%");}function parseCJKNumbers(f){var g=f.value;if(g==null){return null;}var c=/[\uff01-\uff5e]/g;var b=[];var a,d=0;c.lastIndex=0;while((a=c.exec(g))!=null){if(a.index>d){b.push(g.substring(d,a.index));}d=c.lastIndex;b.push(String.fromCharCode(a[0].charCodeAt(0)-65248));}if(d==0){return g;}if(d<g.length){b.push(g.substring(d));}return b.join("");}function validate_textfield_maxlen(h,b,g,c){if(h.value==null||h.value.length==0){NS.form.setValid(true);return true;}var d=true,f=null;if(c){var a=h.value.length;if(a>b){if(g){alert("You have exceeded the "+b+" character limit for this field. Please shorten your entry by "+(a-b)+" characters.");}f=b;}}else{var j=analyzeUTF8(h.value,b);if(j){if(g){alert("You have exceeded the length limit for this field. Please shorten your entry by "+j+" characters.");}f=UTF8toUTF16index(h.value,b);}}if(f){window.focusedTextArea=h;setTimeout("try { setSelectionRange(window.focusedTextArea, "+f+", "+h.value.length+"); } catch (e) {}",0);d=false;}NS.form.setValid(d);return d;}function truncateStringInUnicode(g,c){var j=0;var d=128;var b=2048;var f="";for(var a=0;a<g.length;a++){var h=g.charCodeAt(a);if(h<d){j+=1;}else{if(h>=d&&h<b){j+=2;}else{if(h>=b){j+=3;}}}if(j<c){f=f+g.charAt(a);}}return f;}function UTF8toUTF16index(g,b){var a=0;var f=128;var d=2048;for(var c=0;c<g.length;++c){var h=g.charCodeAt(c);if(h<f){a+=1;}else{if(h<d){a+=2;}else{a+=3;}}if(a>b){return c;}}return 0;}function analyzeUTF8(l,g){var k=0,d=[null,0,0,0];for(var h=0;h<l.length;++h){var b=l.charCodeAt(h);var f=(b<128)?1:(b<2048?2:3);k+=f;d[f]+=1;}var c=k-g;var j=0;for(var h=1;c>0&&h<=3;++h){var a=Math.min(Math.floor((c+h-1)/h),d[h]);j+=a;c-=a*h;}return j;}function searchMonth(g,f){var c=g.toLowerCase();var b=new Array();if(f){b=["january","february","march","april","may","june","july","august","september","october","november","december"];}else{b=["jan","feb","march","april","may","june","july","aug","sept","oct","nov","dec"];}var a=0;for(var d=0;d<b.length();d++){a=c.indexOf(b[d],0);if(a>=0){a=a+b[d].length;while(g.charAt(a)==" "){a++;}return a;}}return -1;}function getTimeStartIdx(c){var d=0,a=0;if(window.dateformat=="DD de MONTH de YYYY"){a=c.lastIndexOf("de",0);d=2;}else{if(window.dateformat=="DD MONTH, YYYY"){a=c.indexOf(",",0);d=2;}else{if(window.dateformat=="DD-MONTH-YYYY"){a=c.lastIndexOf("-",0);d=1;}else{if(window.dateformat=="DD MONTH YYYY"){a=searchMonth(c,true);d=1;}else{if(window.dateformat=="DD. Mon YYYY"){a=searchMonth(c,false);d=1;}else{if(window.dateformat=="YYYY년 MM월 DD?"){a=0;d=3;}else{a=0;d=1;}}}}}}for(var b=0;b<d;++b){a=c.indexOf(" ",a+1);if(a<0){break;}}return a;}function extract_date_time(h,f){var g=new Array();var b=trim(h);var c=getTimeStartIdx(h);if(c>0){var a=b.substring(0,c);var d=b.substring(c+1,b.length);return{validflag:true,date:a,time:trim(d)};}else{alert("Invalid date/time (miss spaces between date and time)");}return{validflag:false};}function validate_date(d,c){var b=NLDate_parseString(d,c);var a;if(b==null){a={validflag:false};}else{a={validflag:true,value:getdatestring(b)};}return a;}function validate_time(g,c,a){var g=hhmmtotimestring(g);var f;if(a){f=regexstringtotime(null,g,a);}else{f=stringtotime(null,g);}var b=!isNaN(f);var d;if(b){if(a){d=gettimewithsecondsstring(f,window.datetime_am_string,window.datetime_pm_string);}else{d=gettimestring(f,window.datetime_am_string,window.datetime_pm_string);}}else{if(c){alert("Invalid time value");}}return{validflag:b,value:d};}function validate_field(field,type,doalert,autoplace,minval,maxval,mandatory,separator){NS.form.setValid(false);type=type.toLowerCase();if(field.value==null||field.value.length==0){if(mandatory){if(doalert){alert("Field must contain a value.");}selectAndFocusField(field);NS.form.setValid(false);return false;}else{NS.form.setValid(true);return true;}}if((type!="text"&&type!="identifier"&&type!="identifieranycase"&&type!="address"&&type!="visiblepassword")&&("en"=="ja"||"en"=="ko"||"en"=="zh")){field.value=parseCJKNumbers(field);}var validflag=true;if(type=="url"){var val=trim(field.value.toLowerCase());if(!(val.indexOf("/")==0||val.indexOf("http://")==0||val.indexOf("https://")==0||val.indexOf("ftp://")==0||val.indexOf("file://")==0)){if(val.indexOf("://")!=-1){if(doalert){alert("Invalid url. Url must start with http://, https://, ftp://, or file://");}validflag=false;}else{field.value="http://"+trim(field.value);}}if(val.indexOf(" ")>0||val.indexOf("\t")>0){if(doalert){alert("Invalid url. Spaces are not allowed in the URL");}validflag=false;}}else{if(type=="currency"||type=="currency2"||type=="poscurrency"){var val=field.value.replace(/$/g,"");val=val.toLowerCase();if(val.charAt(0)=="="){val=val.substr(1);}else{if(val.substr(1).search(/[\+\-\*\/]/g)==-1){val=NLStringToNumber(val,true)+"";}}if(val.substr(1).search(/[\+\-\*\/]/g)!=-1){if(window.groupseparator&&window.decimalseparator){val=val.replace(new RegExp("\\"+window.groupseparator,"g"),"").replace(new RegExp("\\"+window.decimalseparator,"g"),".");}var c=val.charAt(0);if(val.charAt(0)>="a"&&val.charAt(0)<="z"){value="error";}else{try{val=eval(val);}catch(e){val="error";}autoplace=false;}}numval=parseFloat(val);var totalDigitCount=getTotalDigitCount(val);if(isNaN(numval)){if(doalert){alert("Invalid currency value. Values must be numbers up to 999,999,999,999,999.99");}validflag=false;}else{if(maxval!=null&&!isNaN(maxval)&&Math.abs(numval)>=maxval){if(doalert){var regex=new RegExp("(-?[0-9]+)([0-9]{3})");var preDecimal=(maxval-1).toString();while(regex.test(preDecimal)){preDecimal=preDecimal.replace(regex,"$1,$2");}alert("Invalid currency value. Values must be numbers up to "+preDecimal+".999999999999999");}validflag=false;}}if((type=="poscurrency"||minval==0)&&numval<0){if(doalert){alert("Invalid currency value. Value can not be negative.");}validflag=false;}if(validflag){if(autoplace&&window.decimalseparator&&field.value.indexOf(window.decimalseparator)==-1){numval/=100;}if(type=="currency"||type=="poscurrency"){val=format_currency(numval);}else{val=format_currency2(numval);}if(isNLNumericOrCurrencyDisplayField(field)){val=NLNumberToString(val);}field.value=val;}}else{if(type=="date"){var ret=validate_date(field.value,doalert);validflag=ret.validflag;if(validflag){field.value=ret.value;}}else{if(type=="mmyydate"){var value;try{value=parseMMYYDateString(field.value);}catch(e){}if(value!=null&&value.month>=1&&value.month<=12&&value.year>1900&&value.year<2100){var dDate=validateDate(new Date(value.year,value.month-1),doalert);if(dDate){field.value=getmmyydatestring(dDate,NLDate_short_months);validflag=true;}else{validflag=false;}}else{var fmterr="MMYY, MMYYYY, ";if(window.dateformat=="DD-Mon-YYYY"){fmterr+="Mon-YY, Mon-YYYY";}else{if(window.dateformat=="DD.MM.YYYY"){fmterr+="MM.YY, MM.YYYY";}else{fmterr+="MM/YY, MM/YYYY";}}if(doalert){alert("Invalid date value (must be "+fmterr+")");}validflag=false;}}else{if(type=="mmdddate"){var value;try{value=parseMMDDDateString(field.value);}catch(e){}if(value!=null&&value.month>=0&&value.month<=11&&value.day>=1&&value.day<=31){var dDate=validateDate(new Date(1970,value.month,value.day),doalert);if(dDate){validflag=true;}else{validflag=false;if(doalert){alert("Please enter a valid Start Date in MM/DD format.");}}}else{if(doalert){alert("Invalid date value (must be MM/DD)");}validflag=false;}}else{if(type=="ccexpdate"||type=="ccvalidfrom"){validflag=true;var m=0,y=0;if(field.value.indexOf("/")!=-1){var dToday=new Date();var Y=dToday.getFullYear();var M=dToday.getMonth()+1;if(Y<=999){Y+=1900;}var c=field.value.split("/");if(onlydigits(c[0])){m=parseInt(c[0],10);}if(onlydigits(c[1])){y=parseInt(c[1],10);}if(m<1){m=1;}else{if(m>12){m=12;}}if(y<100){y+=((y>=70)?1900:2000);}if(type=="ccexpdate"&&(y<Y||(y==Y&&m<M))||type=="ccvalidfrom"&&(y>Y||(y==Y&&m>M))){if(doalert){alert("Notice: The credit card appears to be incorrect");}}field.value=(m<10?"0":"")+m+"/"+y;}else{if(doalert){if(type=="ccexpdate"){alert("Please enter an expiration date in MM/YYYY format");}else{alert("Please enter a Valid From / Start Date in MM/YYYY format");}}validflag=false;}}else{if(type=="ccnumber"){validflag=(field.value.length>4&&field.value.substring(0,field.value.length-4).replace(new RegExp("\\*","g"),"").length==0&&field.value.substring(field.value.length-4).replace(new RegExp("\\*","g"),"").length==4)||checkccnumber(field);}else{if(type=="rate"||type=="ratehighprecision"){var numval;var val=field.value;var pctidx=val.lastIndexOf("%");var isPct=(pctidx!=-1);if(isPct){val=val.substr(0,pctidx);}numval=NLStringToNumber(val,true);if(isNaN(numval)){if(doalert){alert("Invalid number or percentage");}validflag=false;}else{if(autoplace&&!isPct&&val.indexOf(".")==-1){numval/=100;}var numstr=format_rate(numval,isPct);if(isNLNumericOrCurrencyDisplayField(field)){numstr=NLNumberToString(numstr.replace("%",""));if(isPct&&numval<0&&numstr.indexOf("-")<0){var positiveNumberStr=NLNumberToString(format_rate(-numval,isPct).replace("%",""));numstr=numstr.replace(positiveNumberStr,positiveNumberStr+"%");}else{numstr=numstr+(isPct?"%":"");}}field.value=numstr;validflag=true;}}else{if(type=="integer"||type=="posinteger"||type=="float"||type=="posfloat"||type=="nonnegfloat"||type=="percent"){var numval;var custrange=false;if((minval!=null||maxval!=null)||type=="percent"){custrange=true;}var minclip=minval==null?(type=="percent"?0:-Math.pow(2,32)):minval;var maxclip=maxval==null?(type=="percent"?100:Math.pow(2,64)):maxval;var val=field.value.replace(/$/g,"");val=val.replace(/%/g,"");numval=NLStringToNumber(val,true);if(type=="integer"){numval=parseInt(numval,10);}else{if(type=="posinteger"){numval=parseInt(numval,10);minclip=0;}else{if(type=="posfloat"||type=="nonnegfloat"||type=="float"){if(val.indexOf(".")!=-1){numval=round_float(numval);}if(type=="posfloat"){minclip=0;}if(type=="nonnegfloat"){minclip=-Number.MIN_VALUE;}}}}if(isNaN(numval)||(custrange&&(numval>maxclip||numval<minclip))||(!custrange&&(numval>=maxclip||numval<=minclip))){if(doalert){if(type=="percent"){alert("Invalid percentage (must be between "+minclip+" and "+maxclip+")");}else{if(custrange==true){if(minval==null){alert("Invalid number (must be at most "+maxclip+")");}else{if(maxval==null){alert("Invalid number (must be at least "+minclip+")");}else{alert("Invalid number (must be between "+minclip+" and "+maxclip+")");}}}else{if(type=="posinteger"||type=="posfloat"){alert("Invalid number (must be positive)");}else{if(type=="nonnegfloat"){alert("Invalid: Please enter a number greater than or equal to 0.");}else{if(type=="integer"||type=="float"){if(isNaN(numval)){alert("You may only enter numbers into this field");}else{alert("Illegal number: "+numval);}}else{alert("Invalid number (must be greater than -4.29B");}}}}}}validflag=false;}else{var numberStr=numval+"";var isPct=(type=="percent");if(isPct){numberStr=format_percent(numval);}if(isNLNumericOrCurrencyDisplayField(field)){numberStr=NLNumberToString(numberStr.replace("%",""));if(isPct&&numval<0&&numberStr.indexOf("-")<0){var positiveNumberStr=NLNumberToString(format_percent(-numval).replace("%",""));numberStr=numberStr.replace(positiveNumberStr,positiveNumberStr+"%");}else{numberStr=numberStr+(isPct?"%":"");}}field.value=numberStr;validflag=true;}}else{if(type=="address"){var err="";if(field.value.length>999){err="Address too long (truncated at 1000 characters)";newval=field.value.substr(0,999);}if(err!=""){if(doalert){alert(err);}field.value=newval;}}else{if(type=="function"){if(field.value.indexOf("(")>0){field.value=field.value.substr(0,field.value.indexOf("("));}var val=field.value;var re=/^[0-9A-Za-z_]+(\.[0-9A-Za-z_]+)*$/;if(!re.test(val)){if(doalert){alert("The Function field must be a valid JavaScript function identifier");}validflag=false;}}else{if(type=="time"||type=="timetrack"){var hours;var minutes;var re=/([0-9][0-9]?)?(:[0-9][0-9]+)?/;var result=re.exec(field.value);if(result==null||result.index>0||result[0].length!=field.value.length){timeval=parseFloat(field.value);if(isNaN(timeval)){hours=-1;}else{hours=Math.floor(timeval);minutes=Math.floor((timeval-hours)*60+0.5);}}else{if(RegExp.$1.length>0){hours=parseInt(RegExp.$1,10);}else{hours=0;}if(typeof(RegExp.$2)!="undefined"&&RegExp.$2.length>0){minutes=parseInt(RegExp.$2.substr(1),10);if(minutes>=60){var hours_delta=Math.floor(minutes/60);minutes-=(hours_delta*60);hours+=hours_delta;}}else{minutes=0;}}if(hours>=0&&minutes>=0&&minutes<60){field.value=hours+":"+(minutes<10?"0":"")+minutes;validflag=true;}else{if(doalert){alert("Invalid time value (must be hh:mm)");}validflag=false;}}else{if(type=="timeofday"){var ret=validate_time(field.value,doalert,false);validflag=ret.validflag;if(validflag){field.value=ret.value;}}else{if(type=="datetimetz"){var ret_date_time=extract_date_time(field.value,doalert);validflag=ret_date_time.validflag;if(validflag){var ret_date=validate_date(ret_date_time.date,doalert);validflag=ret_date.validflag;if(validflag){var ret_time=validate_time(ret_date_time.time,doalert,true);validflag=ret_time.validflag;if(validflag){field.value=ret_date.value+" "+ret_time.value;}}}}else{if(type=="visiblepassword"){validflag=checkpassword(field.value,field.value,doalert);}else{if(type=="email"){validflag=checkemail(field.value,true,doalert);}else{if(type=="emails"){var bademails=new Array();var validcount=0;if(!separator){separator=/[,;]/;}var emails=field.value.split(separator);for(var j=0;j<emails.length;j++){var semail=trim(emails[j]);if(semail){if(checkemailvalue(semail,false)){validcount+=1;}else{bademails.push(emails[j]);}}}if(bademails.length>0){validflag=false;if(doalert){alert("Invalid email(s) found: "+bademails.join("; "));}}else{if(validcount<1){validflag=false;if(doalert){alert('No valid emails found in "'+field.value+'"');}}}}else{if(type=="printerOffset"){var maxclip=2;var minclip=-2;var val=field.value;val=val.replace(/,/g,"");numval=parseFloat(val);if(isNaN(numval)||numval>=maxclip||numval<=minclip){if(doalert){if(numval>=maxclip){alert("Invalid number (must be lower than "+maxclip+").");}else{if(numval<=minclip){alert("Invalid number (must be greater than "+minclip+").");}else{alert("Illegal number: "+numval);}}}validflag=false;}else{validflag=true;}}else{if(type=="metricPrinterOffset"){var maxclip=50;var minclip=-50;var val=field.value;val=val.replace(/,/g,"");numval=parseFloat(val);if(isNaN(numval)||numval>=maxclip||numval<=minclip){if(doalert){if(numval>=maxclip){alert("Invalid number (must be lower than "+maxclip+").");}else{if(numval<=minclip){alert("Invalid number (must be greater than "+minclip+").");}else{alert("Illegal number: "+numval);}}}validflag=false;}else{validflag=true;}}else{if(type=="phone"||type=="fullphone"){var val=field.value;if(val.length!=0&&val.length<7){if(doalert){alert("Phone number should have seven digits or more.");}validflag=false;}if(validflag&&type=="fullphone"){if(val.length!=0&&val.length<10){if(doalert){alert("Please include the area code for phone number: "+val);}validflag=false;}}if(autoplace&&validflag){var extidx=val.search(/[A-Za-z]/);var ext="";if(extidx>=0){ext=" "+val.substring(extidx);val=val.substring(0,extidx);}var re=/^[0-9()-.\s]+$/;if(re.test(val)){var digits=val.replace(/[()-.\s]/g,"");var phoneformat=window.phoneformat.replace(new RegExp("[360]","g"),String.fromCharCode(3));if(digits.length==7){field.value=phoneformat.replace(phoneformat.substring(0,phoneformat.indexOf("4")),"").replace("45"+String.fromCharCode(3),digits.substring(0,3)).replace("789"+String.fromCharCode(3),digits.substring(3))+ext;}else{if(digits.length==10){field.value=phoneformat.replace("12"+String.fromCharCode(3),digits.substring(0,3)).replace("45"+String.fromCharCode(3),digits.substring(3,6)).replace("789"+String.fromCharCode(3),digits.substring(6))+ext;}else{if(digits.length==11&&digits.substring(0,1)=="1"){field.value="1 "+phoneformat.replace("12"+String.fromCharCode(3),digits.substring(1,4)).replace("45"+String.fromCharCode(3),digits.substring(4,7)).replace("789"+String.fromCharCode(3),digits.substring(7))+ext;}}}}}}else{if(type=="color"){var val=field.value;if(val.substring(0,1)=="#"){val=val.substring(1);}var re=/^[0-9ABCDEFabcdef]{6,}$/;if(val.length>6||!re.test(val)){if(doalert){alert("Color value must be 6 hexadecimal digits of the form: #RRGGBB. Example: #FF0000 for red.");}validflag=false;}else{field.value="#"+val;}}else{if(type=="identifier"||type=="identifieranycase"){var val=field.value;var re=/^[0-9A-Za-z_]+$/;if(!re.test(val)){if(doalert){alert('Identifiers can contain only digits, alphabetic characters, or "_" with no spaces');}validflag=false;}else{field.value=type=="identifier"?val.toLowerCase():val;}}else{if(type=="furigana"){var val=field.value;var re=/^[\u0020\u3000\u30A0-\u30FF\uFF61-\uFF9F]+$/;if(!re.test(val)){if(doalert){alert("A non-katakana character has been entered.");}validflag=false;}}else{if(type=="urlcomponent"){var val=field.value.toLowerCase();var re=/^[a-z0-9\-]*$/;if(!re.test(val)){if(doalert){alert("This field can contain only lower case letters, numbers and '-'.");}validflag=false;}else{field.value=val;}}}}}}}}}}}}}}}}}}}}}}}}}if(mandatory==true){if(field.value.length==0){if(doalert){alert("Field must contain a value.");}validflag=false;}}if(!validflag){selectAndFocusField(field);}else{if(isNLNumericOrCurrencyDisplayField(field)){}}NS.form.setValid(validflag);return validflag;}function getTotalDigitCount(a){a=a+"";if(a==""){return 0;}else{a=a.replace("-","");if(a.indexOf(".")>0){a=a.replace(/0*?$/,"").replace(".","");}return a.length;}}function selectAndFocusField(b){if(isIE){try{b.focus();b.select();}catch(a){}}else{setTimeout(function(){b.focus();b.select();},0);}}function validatePeriodRange(a,b){if(getSelectIndex(b)<getSelectIndex(a)){alert("Please enter a valid date range. The From date must precede the To date.");return false;}return true;}function setSelectionRange(b,c,f){if(b.setSelectionRange){b.focus();try{b.setSelectionRange(c,f);}catch(d){}}else{if(b.createTextRange){var a=b.createTextRange();a.collapse(true);a.moveEnd("character",f);a.moveStart("character",c);a.select();}}}var NLDate_months=new Array("January","February","March","April","May","June","July","August","September","October","November","December");if(13>12){NLDate_months.push("");}var NLDate_short_months=new Array("Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec");if(13>12){NLDate_short_months.push("");}function nlGetFullYear(a){if(window.navigator!=null&&window.navigator.appName=="Netscape"){if(a.getFullYear=="undefined"){return a.getYear();}}return a.getFullYear();}function nlSetFullYear(b,a){if(window.navigator!=null&&window.navigator.appName=="Netscape"){if(b.setFullYear=="undefined"){b.setYear(a);}}b.setFullYear(a);}var year_char_cn="年";var month_char_cn="月";var day_char_cn="日";var weekday=new Array(7);weekday[0]="Sunday";weekday[1]="Monday";weekday[2]="Tuesday";weekday[3]="Wednesday";weekday[4]="Thursday";weekday[5]="Friday";weekday[6]="Saturday";function getdatestring(c,b){var a;if(typeof(b)!="undefined"){a=b;}else{if(typeof(window.dateformat)!="undefined"){a=window.dateformat;}else{a="MM/DD/YYYY";}}a=a.replace("YYYY",nlGetFullYear(c));a=a.replace("MM",(c.getMonth()+1));a=a.replace("DD",c.getDate());a=a.replace(/month/i,NLDate_months[c.getMonth()]);a=a.replace(/mon/i,NLDate_short_months[c.getMonth()]);if(a.indexOf("EEYY")==0){a=a.replace("EEYY",get_japanese_imperial_era(c)+get_japanese_imperial_year(c));}else{if(a.indexOf("EYY")==0){a=a.replace("EYY",get_short_japanese_imperial_era(c)+get_japanese_imperial_year(c));}}return a;}var heisei_start_date=new Date(1989,0,8);var shouwa_start_date=new Date(1926,11,25);var taishou_start_date=new Date(1912,6,30);var meiji_start_date=new Date(1867,1,3);function get_japanese_imperial_era(a){if(a>=heisei_start_date){return"平成";}else{if(a>=shouwa_start_date){return"昭和";}else{if(a>=taishou_start_date){return"大正";}else{return"明治";}}}}function get_short_japanese_imperial_era(a){if(a>=heisei_start_date){return"H";}else{if(a>=shouwa_start_date){return"S";}else{if(a>=taishou_start_date){return"D";}else{return"M";}}}}function get_japanese_imperial_year(a){if(a>=heisei_start_date){return nlGetFullYear(a)-1988;}else{if(a>=shouwa_start_date){return nlGetFullYear(a)-1925;}else{if(a>=taishou_start_date){return nlGetFullYear(a)-1911;}else{return nlGetFullYear(a)-1867;}}}}function get_gregorian_year(b,a){if(a=="平成"||a=="H"){return b+1988;}else{if(a=="昭和"||a=="S"){return b+1925;}else{if(a=="大正"||a=="D"){return b+1911;}else{return b+1867;}}}}function getdefaultformatdatestring(a){return(a.getMonth()+1)+"/"+a.getDate()+"/"+nlGetFullYear(a);}function gettimestring(g,d,f){var a=g.getHours();if(typeof(d)=="undefined"){d=window.datetime_am_string;f=window.datetime_pm_string;}var b=a<12?d:f;if(window.timeformat.indexOf("HH24")<0){a=a%12;if(a==0){a=12;}}var c=g.getMinutes()<10?"0"+g.getMinutes():g.getMinutes();var h=window.timeformat;h=h.replace("24","");h=h.replace("fmHH",a);h=h.replace("fmMI",c);if(window.timeformat.indexOf("HH24")<0){h=h.replace("am",b);}return h;}function gettimewithsecondsstring(g,d,f){var a=g.getHours();if(typeof(d)=="undefined"){d=window.datetime_am_string;f=window.datetime_pm_string;}var b=a<12?d:f;if(window.timeformatwithseconds.indexOf("HH24")<0){a=a%12;if(a==0){a=12;}}var c=g.getMinutes()<10?"0"+g.getMinutes():g.getMinutes();var j=g.getSeconds()<10?"0"+g.getSeconds():g.getSeconds();var h=window.timeformatwithseconds.replace(/fm/g,"");h=h.replace("24","");h=h.replace("HH",a);h=h.replace("MI",c);h=h.replace("SS",j);if(window.timeformatwithseconds.indexOf("HH24")<0){h=h.replace("am",b);}return h;}function getdatetimestring(a){return getdatestring(a)+" "+gettimestring(a);}function getdatetimetzstring(a){return getdatestring(a)+" "+gettimewithsecondsstring(a);}function getmmyydatestring(b,a){if(window.dateformat=="DD-Mon-YYYY"){return a[b.getMonth()]+"-"+nlGetFullYear(b);}else{if(window.dateformat=="DD.MM.YYYY"){return(b.getMonth()+1)+"."+nlGetFullYear(b);}else{if(window.dateformat=="DD/MM/YYYY"){return(b.getMonth()+1)+"/"+nlGetFullYear(b);}else{if(window.dateformat=="YYYY/MM/DD"){return(b.getMonth()+1)+"/"+nlGetFullYear(b);}else{return(b.getMonth()+1)+"/"+nlGetFullYear(b);}}}}}function parseMMYYDateString(d){var b,f;if(!/^[0-9-\/\.]+$/.test(d)){var h=d.split(/[\/-]/);if(h.length!=2){return null;}f=getMonthIndex(h[0]);b=parseInt(h[1],10);}else{var g=d.split(/[\.\/-]/);if(g.length==1){var a=d.length;f=parseInt(d.substr(0,2-a%2),10);b=parseInt(d.substr(2-a%2),10);}else{f=parseInt(g[0],10);b=parseInt(g[1],10);}}if(b<50){b+=2000;}else{if(b<100){b+=1900;}}return{year:b,month:f};}function parseMMDDDateString(b){var a,d;var f=b.split(/[\/]/);if(f.length!=2){return null;}d=parseInt(f[0],10)-1;a=parseInt(f[1],10);return{month:d,day:a};}function stringtodate(b,q,h,n){var m;var x,r,g;var c,u,j,o;var v=b;if(q==null){if(typeof(window.dateformat)!="undefined"){q=window.dateformat;}else{q="MM/DD/YYYY";}}var p=b.length;var l;var a=4;var w=h?null:new Date();if(v.length>0){if(q=="MM/DD/YYYY"){m=v.split("/");if(m.length<3){return w;}x=parseInt(m[0],10)-1;r=parseInt(m[1],10);g=parseInt(m[2].substring(0,a),10);p=m[0].length+m[1].length+a+2;}else{if(q=="DD/MM/YYYY"){m=v.split("/");if(m.length<3){return w;}r=parseInt(m[0],10);x=parseInt(m[1],10)-1;g=parseInt(m[2].substring(0,a),10);p=m[0].length+m[1].length+a+2;}else{if(q=="DD-Mon-YYYY"){m=v.split("-");if(m.length<3){return w;}r=parseInt(m[0],10);x=getMonthIndex(m[1])-1;g=parseInt(m[2].substring(0,a),10);p=m[0].length+m[1].length+a+2;}else{if(q=="DD.MM.YYYY"){m=v.split(".");if(m.length<3){return w;}r=parseInt(m[0],10);x=parseInt(m[1],10)-1;g=parseInt(m[2].substring(0,a),10);p=m[0].length+m[1].length+a+2;}else{if(q=="DD-MONTH-YYYY"){m=v.split("-");if(m.length<3){return w;}r=parseInt(m[0],10);x=arrayIndexOf(NLDate_months,m[1],true);g=parseInt(m[2].substring(0,a),10);p=m[0].length+m[1].length+a+2;}else{if(q=="YYYY/MM/DD"){m=v.split("/");if(m.length<3){return w;}l=m[2].split(" ")[0];r=parseInt(l,10);x=parseInt(m[1],10)-1;g=parseInt(m[0],10);p=m[1].length+l.length+a+2;}else{if(q=="YYYY-MM-DD"){m=v.split("-");if(m.length<3){return w;}l=m[2].split(" ")[0];r=parseInt(l,10);x=parseInt(m[1],10)-1;g=parseInt(m[0],10);p=m[1].length+l.length+a+2;}else{if(q=="EEYY年MM月DD日"){c=v.indexOf(year_char_cn);u=v.indexOf(month_char_cn);j=v.indexOf(day_char_cn);if(c<0||u<0||j<0){return w;}r=parseInt(v.substring(u+1,j),10);x=parseInt(v.substring(c+1,u),10)-1;o=v.substring(0,2);g=get_gregorian_year(parseInt(v.substring(2,c),10),o);p=j+1;}else{if(q=="YYYY年MM月DD日"){c=v.indexOf(year_char_cn);u=v.indexOf(month_char_cn);j=v.indexOf(day_char_cn);if(c<0||u<0||j<0){return w;}r=parseInt(v.substring(u+1,j),10);x=parseInt(v.substring(c+1,u),10)-1;g=parseInt(v.substring(0,c),10);p=j+1;}else{if(q=="EYY.MM.DD"){m=v.split(".");if(m.length<3){return w;}l=m[2].split(" ")[0];r=parseInt(l,10);x=parseInt(m[1],10)-1;o=m[0].substring(0,1);g=get_gregorian_year(parseInt(m[0].substring(1,m[0].length),10),o);p=m[0].length+m[1].length+l.length+2;}else{if(q=="DD. MON YYYY"){m=v.split(" ");if(m.length<3){return w;}r=parseInt(m[0].substring(0,m[0].length-1),10);x=arrayIndexOf(NLDate_short_months,m[1]);g=parseInt(m[2].substring(0,a),10);p=m[0].length+m[1].length+a+2;}else{if(q=="DD de MONTH de YYYY"){m=v.split(" de ");if(m.length<3){return w;}r=parseInt(m[0],10);x=getMonthIndex(m[1])-1;g=parseInt(m[2].substring(0,a),10);p=m[0].length+m[1].length+a+8;}else{if(q=="YYYY년 MM월 DD일"){m=v.split(" ");if(m.length<3){return w;}r=parseInt(m[2].substring(0,m[2].length-1),10);x=parseInt(m[1].substring(0,m[1].length-1),10)-1;g=parseInt(m[0].substring(0,m[0].length-1),10);p=a+m[1].length+m[2].length+5;}else{if(q=="DD MONTH YYYY"){m=v.split(" ");if(m.length<3){return w;}r=parseInt(m[0],10);x=arrayIndexOf(NLDate_months,m[1],true);g=parseInt(m[2].substring(0,a),10);p=m[0].length+m[1].length+a+2;}else{if(q=="DD MONTH, YYYY"){m=v.split(" ");if(m.length<3){return w;}r=parseInt(m[0],10);x=arrayIndexOf(NLDate_months,m[1].substring(0,m[1].length-1),true);g=parseInt(m[2].substring(0,a),10);p=m[0].length+m[1].length+a+2;}}}}}}}}}}}}}}}}if(!isvalidyearmonthday(g,x,r)){return w;}var f;var k=b.substring(p);if(k!=null&&k.length>0){if(n=="datetimetz"){f=regexstringtotime(b.substring(0,p),k,true);}else{if(n=="datetime"||n=="timeofday"){f=regexstringtotime(b.substring(0,p),k,false);}else{f=stringtotime(b.substring(0,p),k);}}}else{f=new Date(g,x,r);}if(g<50){nlSetFullYear(f,g+2000);}else{if(g<100){nlSetFullYear(f,g+1900);}}return f;}function isvalidyearmonthday(b,c,a){if(isNaN(b)||b<0||isNaN(c)||c<0||c>11||isNaN(a)||a<1||a>31){return false;}else{return true;}}function trimstring(a){return a.replace(/^\s+/,"").replace(/\s+$/,"");}function regexstringtotime(d,c,j){var r=d!=null?stringtodate(d):new Date();if(c!=null&&new String(c).length!=0&&new String(c).search(/\S/)>=0){var l,g,o;l=NaN;g=NaN;o=NaN;var q=null;c=trimstring(c);var h={"HH:MI:SS am":{rcase:0,hend:":",mend:":",send:" "},"HH-MI-SS am":{rcase:0,hend:"-",mend:"-",send:" "},"HH24:MI:SS":{rcase:0,hend:":",mend:":",send:null},"HH24-MI-SS":{rcase:0,hend:"-",mend:"-",send:null},"amHH時MI分SS秒":{rcase:1,hend:"時",mend:"分",send:"秒"},"amHH点MI分SS秒":{rcase:1,hend:"点",mend:"分",send:"秒"},"amHH시MI분SS초":{rcase:1,hend:"시",mend:"분",send:"초"},"HH24時MI分SS秒":{rcase:1,hend:"時",mend:"分",send:"秒"},"HH24点MI分SS秒":{rcase:2,hend:"点",mend:"分",send:"秒"},"HH24시MI분SS초":{rcase:2,hend:"시",mend:"분",send:"초"},"HH:MI am":{rcase:0,hend:":",mend:" ",send:null},"HH-MI am":{rcase:0,hend:"-",mend:" ",send:null},"HH24:MI":{rcase:0,hend:":",mend:null,send:null},"HH24-MI":{rcase:0,hend:"-",mend:null,send:null},"amHH時MI分":{rcase:1,hend:"時",mend:"分",send:null},"amHH点MI分":{rcase:1,hend:"点",mend:"分",send:null},"amHH시MI분":{rcase:1,hend:"시",mend:"분",send:null},"HH24時MI分":{rcase:2,hend:"時",mend:"分",send:null},"HH24点MI分":{rcase:2,hend:"点",mend:"分",send:null},"HH24시MI분":{rcase:2,hend:"시",mend:"분",send:null}};format=j?window.timeformatwithseconds.replace(/fm/g,""):window.timeformat.replace(/fm/g,"");format=trimstring(format);q=h[format];var b;var k=null;var a=null,p=null,f=null;if(q!=null){switch(q.rcase){case 0:b=/^(\d+)(\D)(\d+)((\D)(\d+))?\s*(am|pm)?/.exec(c);if(b[0]!=null){l=parseInt(b[1],10);a=b[2];g=parseInt(b[3],10);p=b[5];if(j&&b[4]!=null){o=parseInt(b[6],10);}else{o=0;}k=b[7];}break;case 1:b=/^(am|pm)(\d+)(\D)(\d+)(\D)((\d+)(\D))?/.exec(c);if(b[0]!=null){l=parseInt(b[2],10);a=b[3];g=parseInt(b[4],10);p=b[5];if(j&&b[6]!=null){o=parseInt(b[7],10);f=b[8];}else{o=0;}k=b[1];}break;case 2:b=/^(\d+)(\D)(\d+)(\D)((\d+)(\D))?/.exec(c);if(b[0]!=null){l=parseInt(b[1],10);a=b[2];g=parseInt(b[3],10);p=b[4];if(j&&b[5]!=null){o=parseInt(b[6],10);f=b[7];}else{o=0;}}break;}if(isNaN(l)||isNaN(g)||isNaN(o)||l>=24||l<0||g>=60||g<0||o>=60||o<0){return NaN;}if(a!=q.hend||(j&&(p!=null&&p!=q.mend)||(f!=null&&f!=q.send))){return NaN;}if(k!=null){var n=(k.toLowerCase()==window.datetime_pm_string);if(!n&&l==12){l=0;}else{if(n&&l<12){l+=12;}}}r.setHours(l,g,o,0);}else{r=NaN;}}return r;}function stringtotime(c,b){var n=c!=null?stringtodate(c):new Date();if(b!=null&&new String(b).length!=0&&new String(b).search(/\S/)>=0){var j,d,k,l;var h;var g;format=window.timeformat.replace(/fm/g,"");if(format=="HH:MI am"||format=="HH-MI am"||format=="HH24:MI"||format=="HH24-MI"){var a=/^\s*(\d+)[-:](\d+)\s*(.*)/.exec(b);if(!a){return NaN;}j=parseInt(a[1],10);d=parseInt(a[2],10);if(format.substring(6)=="am"){l=(a[3].toLowerCase()==window.datetime_pm_string);if(!l&&j==12){j=0;}else{if(l&&j<12){j+=12;}}}}else{if(format=="amHH時MI分"||format=="amHH点MI分"||format=="amHH시MI분"){h=b.indexOf("時");if(h<0){h=b.indexOf("点");}if(h<0){h=b.indexOf("시");}var f=0;l=false;if(b.indexOf(window.datetime_am_string)==0){f=window.datetime_am_string.length;}else{if(b.indexOf(window.datetime_pm_string)==0){f=window.datetime_pm_string.length;l=true;}}j=parseInt(b.substring(f,h));if(!l&&j==12){j=0;}else{if(l&&j<12){j+=12;}}d=parseInt(b.substring(h+1,b.length-1));}else{if(format=="HH24時MI分"||format=="HH24点MI分"||format=="HH24시MI분"){h=b.indexOf("時");if(h<0){h=b.indexOf("点");}if(h<0){h=b.indexOf("시");}j=parseInt(b.substring(0,h));d=parseInt(b.substring(h+1,b.length-1));}}}if(isNaN(j)||isNaN(d)||j>=24||j<0||d>=60||d<0||k>=60||k<0){return NaN;}n.setHours(j,d,0,0);}return n;}function hhmmtotime(a){return stringtotime(null,hhmmtotimestring(a));}function hhmmtotimestring(k){var h=k;var g,b;if(window.datetime_am_string.charAt(0)==window.datetime_pm_string.charAt(0)){re=new RegExp("^[0-9]{1,4}("+window.datetime_am_string+"|"+window.datetime_pm_string+")*$","i");}else{re=new RegExp("^[0-9]{1,4}(["+window.datetime_am_string.charAt(0)+"|"+window.datetime_pm_string.charAt(0)+"]?)$","i");}if(re.test(h)){var c="";if(RegExp.$1){if(window.datetime_am_string.charAt(0)==window.datetime_pm_string.charAt(0)){c=RegExp.$1.toLowerCase()==window.datetime_pm_string?window.datetime_pm_string:window.datetime_am_string;}else{c=RegExp.$1.toLowerCase().charAt(0)==window.datetime_pm_string.charAt(0)?window.datetime_pm_string:window.datetime_am_string;}}if(h.length<3||(h.length==3&&RegExp.$1)){var d=RegExp.$1?h.substring(0,h.length-1):h;g=parseInt(d,10)==0?12:(parseInt(d,10)>12?parseInt(d,10)%12:d);b=0;var j=RegExp.$1?c:(parseInt(h,10)>11?window.datetime_pm_string:window.datetime_am_string);}else{if(h.length==3||(h.length==4&&RegExp.$1)){var d=h.substring(0,1)=="0"?"12":h.substring(0,1);g=parseInt(d,10);var f=RegExp.$1?h.substring(1,3):h.substring(1);b=parseInt(f,10);var j=RegExp.$1?c:window.datetime_am_string;}else{var d=h.substring(0,2);g=parseInt(d,10)==0?12:(parseInt(d,10)>12?parseInt(d,10)%12:d);var f=RegExp.$1?h.substring(2,4):h.substring(2);b=parseInt(f,10);var j=parseInt(h.substring(0,2),10)>11?window.datetime_pm_string:window.datetime_am_string;j=RegExp.$1?c:j;}}if(j==window.datetime_am_string&&g==12){g=0;}else{if(j==window.datetime_pm_string&&g!=12){g=parseInt(g)+12;}}var a=new Date();a.setHours(g,b,0,0);h=gettimestring(a,window.datetime_am_string,window.datetime_pm_string);}return h;}function adddays(c,a){var b=new Date(c.getTime()+86400*a*1000);if(b.getHours()!=c.getHours()){if((c.getHours()>0&&b.getHours()<c.getHours())||(c.getHours()==0&&b.getHours()==23)){b.setTime(b.getTime()+3600*1000);}else{b.setTime(b.getTime()-3600*1000);}}c.setTime(b.getTime());return c;}function daysBetween(b,a){return get_julian_date(a)-get_julian_date(b);}function monthsBetween(b,a){return 12*(a.getFullYear()-b.getFullYear())+(a.getMonth()-b.getMonth());}function isDOWIM(b,a){return(a>=1&&a==(1+Math.floor((b.getDate()-1)/7)))||((a==-1||a==5)&&daysBetween(b,addmonths(new Date(b.getFullYear(),b.getMonth(),1),1))<=7);}function isLeapYear(a){return(a%4==0)&&((a%100!=0)||(a%400==0));}MONTH_LENGTH=[[31,28,31,30,31,30,31,31,30,31,30,31],[31,29,31,30,31,30,31,31,30,31,30,31]];function getMonthLength(a,b){return MONTH_LENGTH[isLeapYear(a)?1:0][b];}function setDateComponents(d,f,c,a){var b=new Date(d);if(typeof(a)!="boolean"){a=false;}addmonths(b,f);setDate(b,c,a);return b;}function addmonths(g,a){if(a!=0){var b=nlGetFullYear(g);var f=g.getDate();var c=g.getMonth()+a;if(c<0){c+=1;b=b+Math.ceil(c/12)-1;nlSetFullYear(g,b);c=11+(c%12);}else{if(c>11){b=b+Math.floor(c/12);nlSetFullYear(g,b);c%=12;}}eom=getMonthLength(b,c);if(f>eom){g.setDate(eom);}g.setMonth(c);}return g;}function addhours(f,c,a){var b=new Date(f.getTime()+3600*c*1000);f.setTime(b.getTime());if(a){f.setMinutes(0);f.setSeconds(0);f.setMilliseconds(0);}return f;}function setDate(f,b,a){if(a){var c=getMonthLength(nlGetFullYear(f),f.getMonth());b=Math.min(c,b);}f.setDate(b);}m_j_d=[[0,31,59,90,120,151,181,212,243,273,304,334],[0,31,60,91,121,152,182,213,244,274,305,335]];function getMonthJulian(a,b){return m_j_d[isLeapYear(a)?1:0][b];}var j_d=new Array();j_d[1970]=0;j_d[1971]=365;j_d[1972]=730;j_d[1973]=1096;j_d[1974]=1461;j_d[1975]=1826;j_d[1976]=2191;j_d[1977]=2557;j_d[1978]=2922;j_d[1979]=3287;j_d[1980]=3652;j_d[1981]=4018;j_d[1982]=4383;j_d[1983]=4748;j_d[1984]=5113;j_d[1985]=5479;j_d[1986]=5844;j_d[1987]=6209;j_d[1988]=6574;j_d[1989]=6940;j_d[1990]=7305;j_d[1991]=7670;j_d[1992]=8035;j_d[1993]=8401;j_d[1994]=8766;j_d[1995]=9131;j_d[1996]=9496;j_d[1997]=9862;j_d[1998]=10227;j_d[1999]=10592;j_d[2000]=10957;j_d[2001]=11323;j_d[2002]=11688;j_d[2003]=12053;j_d[2004]=12418;j_d[2005]=12784;j_d[2006]=13149;j_d[2007]=13514;j_d[2008]=13879;j_d[2009]=14245;j_d[2010]=14610;j_d[2011]=14975;j_d[2012]=15340;j_d[2013]=15706;j_d[2014]=16071;j_d[2015]=16436;j_d[2016]=16801;j_d[2017]=17167;j_d[2018]=17532;j_d[2019]=17897;j_d[2020]=18262;j_d[2021]=18628;j_d[2022]=18993;j_d[2023]=19358;j_d[2024]=19723;j_d[2025]=20089;j_d[2026]=20454;j_d[2027]=20819;j_d[2028]=21184;j_d[2029]=21550;j_d[2030]=21915;function get_julian_date(a){return j_d[a.getFullYear()]+getMonthJulian(a.getFullYear(),a.getMonth())+a.getDate()-1;}function getMonthIndex(b){var a=-1;b=b.toUpperCase();for(var d=0;d<NLDate_short_months.length;d++){if(NLDate_short_months[d].toUpperCase()==b){a=d+1;break;}}if(a!=-1){return a;}for(var d=0;d<NLDate_months.length;d++){if(NLDate_months[d].toUpperCase()==b){a=d+1;break;}}if(a!=-1){return a;}else{var c="JANFEBMARAPRMAYJUNJULAUGSEPOCTNOVDEC";a=(c.indexOf(b)+3)/3;}return a;}function _hhmm_to_mins(a){return a.hrs*60+a.mins;}function round_hhmm_nearest(c,f,a){var d=round_hhmm_up(c,f,a);var b=round_hhmm_down(c,f,a);orig_mins=_hhmm_to_mins({hrs:c,mins:f});up_mins=_hhmm_to_mins(d);down_mins=_hhmm_to_mins(b);if(up_mins-orig_mins>orig_mins-down_mins){return b;}else{return d;}}function round_hhmm_up(b,c,a){c+=(c%a>0?(a-(c%a)):0);if(c>=60){var d=Math.floor(c/60);c-=(d*60);b+=d;}return{hrs:b,mins:c};}function round_hhmm_down(b,c,a){c-=(c>0?(c%a):0);return{hrs:b,mins:c};}function round_hhmm(j,b,h){if(j==""){return j;}var d=/^([0-9]+?):([0-9]+)$/;var a=d.exec(j);if(a==null){a=format_hhmm(j);if(a==null){return j;}}var c=parseFloat(a[1]);var f=parseFloat(a[2]);var g;if(h=="UP"){g=round_hhmm_up(c,f,b);}else{if(h=="DOWN"){g=round_hhmm_down(c,f,b);}else{if(h=="NEAR"){g=round_hhmm_nearest(c,f,b);}else{throw h+" is not vald direction: [UP,DOWN,NEAREST]";}}}if(g.mins<10){g.mins="0"+g.mins;}return g.hrs+":"+g.mins;}function format_hhmm(g){var b;var c;var f=/([0-9][0-9]?)?(:[0-9][0-9]+)?/;var a=f.exec(g);if(a==null||a.index>0||a[0].length!=g.length){timeval=parseFloat(g);if(isNaN(timeval)){b=-1;}else{b=Math.floor(timeval);c=Math.floor((timeval-b)*60+0.5);}}else{if(RegExp.$1.length>0){b=parseInt(RegExp.$1,10);}else{b=0;}if(typeof(RegExp.$2)!="undefined"&&RegExp.$2.length>0){c=parseInt(RegExp.$2.substr(1),10);if(c>=60){var d=Math.floor(c/60);c-=(d*60);b+=d;}}else{c=0;}}if(b>=0&&c>=0&&c<60){return[g,b,c];}}function createTDWindow(b){var a=screen.width*(0.35);var d=screen.height*(0.3);if(a<150||d<150){a=150;d=150;}var f=screen.width-(a+20);var c=screen.height-(d+60);window.open(b,"test","scrollbars=yes,width="+a+",height="+d+",left="+f+",top="+c);}function DoFieldFocus(c){if(c==null){return;}var a;for(a=0;a<c.elements.length;a++){var b=c.elements[a];if(b.type=="text"||b.type=="select-one"||b.type=="checkbox"){b.focus();return;}}}function clearMultiSelect(a){if(isNLMultiDropDown(a)){getMultiDropdown(a).removeAll();}else{if(a.type=="select-multiple"){for(i=a.length-1;i>=0;i--){a.options[i].selected=false;}}else{a.value="";if(a.form.elements[a.name+"_display"]!=null){a.form.elements[a.name+"_display"].value="";}}}}function getnamevaluelisttext(j,h,b){if(j.length==0){return"";}var g=j.split(String.fromCharCode(4));var a="";for(var f=0;f<g.length;f++){var c=g[f].split(String.fromCharCode(3));var d=c.length==5?c[4]:c[3];if((d!=null&&d.length>0)||b==true){if(!isValEmpty(a)){a+=h;}a+=c[2]+": "+d;}}return a;}function getnamevaluelistdata(g){if(g.length==0){return"";}var f=g.split(String.fromCharCode(4));var a="";for(var d=0;d<f.length;d++){if(d>0){a+=String.fromCharCode(4);}var c=f[d].split(String.fromCharCode(3));var b=c.length>3?c[3]:"";a+=c[0]+String.fromCharCode(3)+b;}return a;}function getnamevaluelistvalue(b,c){if(b.length==0){return null;}var f=b.split(String.fromCharCode(4));for(var d=0;d<f.length;d++){var a=f[d].split(String.fromCharCode(3));if(a[0].toLowerCase()==c.toLowerCase()){return a[3];}}return null;}function getnamevaluelistdisplayvalue(b,c){if(b.length==0){return null;}var f=b.split(String.fromCharCode(4));for(var d=0;d<f.length;d++){var a=f[d].split(String.fromCharCode(3));if(a[0].toLowerCase()==c.toLowerCase()){return a.length==5?a[4]:a[3];}}return null;}function setnamevaluelistvalue(b,c,f){if(b.length==0){return"";}var g=b.split(String.fromCharCode(4));for(var d=0;d<g.length;d++){var a=g[d].split(String.fromCharCode(3));if(a[0].toLowerCase()==c.toLowerCase()){a[3]=f;g[d]=a.join(String.fromCharCode(3));break;}}return g.join(String.fromCharCode(4));}function syncnamevaluelist(b){var a=b.form.elements[b.name+"_display"];a.value=getnamevaluelisttext(b.value,"\n",true);if(a.onchange){a.onchange();}}function syncpopupmachinefield(c,b,a,d){if(c==null){nlapiSetFieldValue(b,d);}else{if(a!=null){nlapiSetLineItemValue(c,b,a,d);}else{nlapiSetCurrentLineItemValue(c,b,d);}}}function NLNameValueList_onKeyPress(a,c,f){var d=getEventKeypress(a);if(d==32){var b=document.getElementById(c+"_helper_"+f);if(b&&b.click){b.click();}}return true;}function synclist(f,g,d){if(isNLDropDown(f)){var b=getDropdown(f);if(b!=null){var a=b.getIndexForValue(g);b.setIndex(a,true);if(d){b.setDefaultIndex(a);f.setAttribute("defaultValue",g);}}}else{if(f.type=="select-one"){for(var c=0;c<f.length;c++){if(f.options[c].value==g){f.selectedIndex=c;if(d){f.options[c].defaultSelected=true;f.setAttribute("defaultValue",g);}break;}}}else{f.value=g;if(d){f.setAttribute("defaultValue",g);}}}}function syncpopup(g,j,c,f){var d;if(isNLDropDown(g)){var b=getDropdown(g);var a=b.getIndexForValue(j);b.setIndex(a,true);if(f){b.setDefaultIndex(a);}}else{if(isNLMultiDropDown(g)){var b=getMultiDropdown(g);b.setValues(j);}else{if(g.type=="select-one"||g.type=="select-multiple"){for(d=0;d<g.length;d++){if(g.options[d].value==j){g.selectedIndex=d;if(f){g.options[d].defaultSelected=true;}break;}}}else{if(isPopupSelect(g)){g.value=j;if(f){g.defaultValue=j;}var h=g.form.elements[g.name+"_display"];if((j!=null&&j.length>0)||(c!=null&&c.length>0)){if(typeof c!="undefined"&&c!=null){h.value=c;h.style.color="000000";if(f){h.defaultValue=c;}}}else{if(g.getAttribute("onlyAllowExactMatch")==null){h.value=h.type=="text"?_popup_help:_mult_popup_help;h.style.color="999999";}}}else{g.value=j;if(f){g.defaultValue=j;}}}}}}function syncmultiselectlist(k,b,h,c){clearMultiSelect(k);if(typeof b!="string"&&!isArray(b)){b=""+b;}if(isNLMultiDropDown(k)){if(typeof b!="string"){b=b.join(String.fromCharCode(5));}var l=getMultiDropdown(k);l.setValues(b,c);}else{if(k.type!="select-multiple"){k.form.elements[k.name].value=b;h=emptyIfNull(h);var a=h.indexOf(String.fromCharCode(5))!=-1?String.fromCharCode(5):"\n";var d=k.form.elements[k.name+"_labels"];if(d!=null){d.value=isValEmpty(b)?"":h.split(a).join(String.fromCharCode(5));}var m=k.form.elements[k.name+"_display"];if(m!=null&&k.getAttribute("onlyAllowExactMatch")==null){m.value=h?h.split(a).join("\n"):_mult_popup_help;}}else{if(typeof b=="string"){b=b.split(String.fromCharCode(5));}for(var g=0;g<b.length;g++){for(var f=0;f<k.length;f++){if(k.options[f].value==b[g]){k.options[f].selected=true;}}}}}}function syncradio(a,f,c){var b;var d;for(b=0;b<a.length;b++){d=a[b].value==f;a[b].checked=d;if(c){a[b].defaultChecked=d;}}}function getlisttext(c,d,a){if(isNLDropDown(c)){return getDropdown(c).getTextForValue(d);}if(c.type!="select-one"&&!a){return"";}for(var b=0;b<c.length;b++){if(c.options[b].value==d){return c.options[b].text;}}return"";}function getmultiselectlisttext(d,g,f){if(!f){f="<br>";}if(isNLMultiDropDown(d)){return getMultiDropdown(d).getSelectedTextFromValues(g,f);}else{if(d.type!="select-multiple"){return"";}else{var a=g.split(String.fromCharCode(5));var b="";for(var c=0;c<a.length;c++){if(c>0){b+=f;}b+=getlisttext(d,a[c],true);}return b;}}}function getradiotext(a,c){var b;for(b=0;b<a.length;b++){if(a[b].value==c){return a[b].textValue;}}return"";}function getRadioValue(a){var c="";if(typeof a.length=="undefined"){a=a.ownerDocument.getElementsByName(a.name);}for(var b=0;b<a.length;b++){if(a[b].checked==true){c=a[b].value;break;}}return c;}function getSelectedRadio(a){var c=null;if(typeof a.length=="undefined"){a=a.ownerDocument.getElementsByName(a.name);}for(var b=0;b<a.length&&c==null;b++){c=a[b].checked?a[b]:null;}return c;}function getSelectValue(b){var a;if(b.type!=null&&b.type=="select-one"){a=(b.options.length==0||b.selectedIndex==-1||b.selectedIndex>=b.options.length)?"":b.options[b.selectedIndex].value;}else{if(isMultiSelect(b)){a=getMultiSelectValues(b);}else{if(isNLDropDown(b)){a=getDropdown(b).getValue();}else{if(isNLMultiDropDown(b)){a=getMultiDropdown(b).getSelectedValues();}else{a=b.value;}}}}return a;}function getSelectValueArray(c){var a;if(c.type=="select-one"||c.type=="select-multiple"){a=new Array(c.length);for(var b=0;b<c.length;b++){a[b]=c.options[b].value;}}else{if(isNLDropDown(c)){a=getDropdown(c).valueArray;}else{if(isNLMultiDropDown(c)){a=getMultiDropdown(c).valueArray;}}}return a;}function getIndexForValue(c,d){var a=-1;if(c.type=="select-one"||c.type=="select-multiple"){for(var b=0;b<c.length;b++){if(c.options[b].value==d){a=b;break;}}}else{if(isNLDropDown(c)){a=getDropdown(c).getIndexForValue(d);}else{if(isNLMultiDropDown(c)){a=getMultiDropdown(c).getIndexForValue(d);}}}if(typeof(a)=="undefined"){a=-1;}return a;}function getSelectTextForValue(c,d){var a=getSelectValueArray(c);var b;for(b=0;b<a.length;b++){if(a[b]==d){return getSelectTextAtIndex(c,b);}}return null;}function getSelectTextArray(c){var a;if(c.type=="select-one"||c.type=="select-multiple"){a=new Array(c.length);for(var b=0;b<c.length;b++){a[b]=c.options[b].text;}}else{if(isNLDropDown(c)){a=getDropdown(c).textArray;}else{if(isNLMultiDropDown(c)){a=getMultiDropdown(c).textArray;}}}return a;}function getSelectText(a,b){var c=getSelectValue(a);if(a.type=="select-one"){return(a.options.length==0||a.selectedIndex==-1||a.selectedIndex>=a.options.length)?null:a.options[a.selectedIndex].text;}else{if(isNLDropDown(a)){return getDropdown(a).getText();}else{if(isMultiSelect(a)||isPopupMultiSelect(a)){return getMultiSelectText(a,null,b);}else{if(isPopupSelect(a)){return isValEmpty(c)?"":getFormElement(a.form,a.name+"_display").value.replace(/\s$/,"");}else{if(isDisplayOnlySelect(a)){return getInlineTextValue(document.getElementById(a.name+"_displayval"));}else{return a.text;}}}}}}function setSelectValue(c,d){if(window.virtualBrowser){c.value=d;}else{if(isNLDropDown(c)){var j=getDropdown(c);var h=j.getIndexForValue(d);if(h==null){return false;}j.setIndex(h,true);if(j.isOpen){j.setCurrentCellInMenu(j.divArray[h]);}}else{if(isNLMultiDropDown(c)){var j=getMultiDropdown(c);var h=j.getIndexForValue(d);if(h==null){return false;}j.setIndex(h);}else{if(c.type=="select-one"){var b=c.options;for(var g=0;g<b.length;g++){if(b[g].value==d){c.selectedIndex=g;return true;}}return false;}else{if(c.type=="select-multiple"){var a=c.options;var k=false;for(var g=0;g<a.length;g++){a[g].selected=a[g].value==d;k=k||a[g].value==d;}return k;}else{c.value=d;if(d.length==0&&isPopupSelect(c)){var f=c.form.elements[c.name+"_display"];f.value=f.type=="text"?_popup_help:_mult_popup_help;f.style.color="999999";}}}}}}return true;}function addMultiSelectValue(c,d,b){if(isNLMultiDropDown(c)){var j=getMultiDropdown(c);var g=j.getIndexForValue(d);j.addIndex(g);}else{if(c.type=="select-multiple"){var a=c.options;for(var f=0;f<a.length;f++){if(a[f].value==d){a[f].selected=true;}}}else{var h=c.value.split(String.fromCharCode(5));for(var f=0;f<h.length;f++){if(h[f]==d){return;}}c.form.elements[c.name+"_display"].style.color="000000";if(h.length==0||h[0].length==0){c.value=d;c.form.elements[c.name+"_display"].value=b;c.form.elements[c.name+"_labels"].value=b;}else{c.value+=String.fromCharCode(5)+d;c.form.elements[c.name+"_labels"].value+=String.fromCharCode(5)+b;var k=c.form.elements[c.name+"_display"].value.split(/\n|\r/);if(k.length==h.length){c.form.elements[c.name+"_display"].value+="\n"+b;}else{k[h.length]=b;c.form.elements[c.name+"_display"].value=k.join("\n");}}}}}function getCurrentMultiSelectUserInputValue(b){var a=getSelectedTextRange(b)[0];var f=b.value.substr(0,a);var d=Math.max(f.lastIndexOf("\n"),f.lastIndexOf("\r"))+1;var c=b.value.substr(a).search(/\n|\r/);c=c==-1?b.value.length:a+c;userEnteredValue=b.value.substring(d,c);return userEnteredValue;}function getSelectValueForText(d,a){var b=getSelectTextArray(d);var c;for(c=0;c<b.length;c++){if(b[c]==a){return getSelectValueAtIndex(d,c);}}return null;}function deleteAllSelectOptions(a,b){if(isNLDropDown(a)){getDropdown(a,b).deleteAllOptions();}else{if(isNLMultiDropDown(a)){getMultiDropdown(a,b).deleteAllOptions();}else{if(a.type=="select-one"||a.type=="select-multiple"){a.options.length=0;}else{if(a.form.elements[a.name+"_display"]!=null){a.form.elements[a.name+"_display"].value="";a.value="";}}}}}function deleteOneSelectOption(f,d,c){if(isNLDropDown(f)){getDropdown(f).deleteOneOption(d,c);}else{if(isNLMultiDropDown(f)){getMultiDropdown(f).deleteOneOption(d);}else{if(f.type=="select-one"||f.type=="select-multiple"){var b=f.options;for(var a=0;a<b.length;a++){if(b[a].value==d){b[a]=null;}}}else{if(f.form.elements[f.name+"_display"]!=null){f.form.elements[f.name+"_display"].value="";f.value="";}}}}}function getSelectIndex(a,b){if(isNLDropDown(a)){return getDropdown(a,b).getIndex();}else{return a.selectedIndex;}}function setSelectIndex(a,b){if(isNLDropDown(a)){return getDropdown(a).setIndex(b,true);}else{if(isNLMultiDropDown(a)){return getMultiDropdown(a).setIndex(b);}else{a.selectedIndex=b;}}}function setMultiSelectValues(a,b){syncmultiselectlist(a,b);}function getMultiSelectValues(b,c){var d=null;if(isMultiSelect(b)){if(isNLMultiDropDown(b)){d=getMultiDropdown(b).getSelectedValues();}else{d="";for(var a=0;a<b.length;a++){if(b.options[a].selected){d+=((d==""?"":String.fromCharCode(5))+b.options[a].value);}}}}else{d=b.value;}return c?(isValEmpty(d)?[]:d.split(String.fromCharCode(5))):d;}function getMultiSelectText(c,a,d){var h="";var g=d?String.fromCharCode(5):", ";if(isMultiSelect(c)){g=a?"\n":g;if(isNLMultiDropDown(c)){h=getMultiDropdown(c).getSelectedText(g);}else{var b,f=0;for(b=0;b<c.length;b++){if(c.options[b].selected){h+=((f++==0?"":(g))+c.options[b].text);}}}}else{if(isPopupMultiSelect(c)){h=getFormElement(c.form,c.name+"_labels").value;if(h!=null&&g!=String.fromCharCode(5)){h=h.replace(new RegExp(String.fromCharCode(5),"g"),g);}}else{h=c.text;}}return d?(isValEmpty(h)?[]:h.split(g)):h;}function updateMultiSelectValue(f,d,j,h,a){f.value=j;a.value=h;var b=h.split(String.fromCharCode(5));var c="",g=0;for(i=0;i<b.length;i++){c+=((g==0?"":"\n")+b[i]);g++;}d.value=c;}function addSelectOption(g,b,l,h,c,d,j){if(isNLDropDown(b)){var k=getDropdown(b,d);if(k==null){return;}k.addOption(l,h,j);if(c!==false){var j=k.getIndexForValue(h);k.setIndex(j,true);}}else{if(isNLMultiDropDown(b)){var k=getMultiDropdown(b,d);if(k==null){return;}k.addOption(l,h,c,j);}else{var a=g.createElement("OPTION");a.text=l;a.value=h;if(isIE){if(typeof(j)=="undefined"){j=b.length;}b.add(a,j);}else{var f=null;if(typeof(j)!="undefined"&&j>=0&&j<b.length){f=b.options[j];}b.add(a,f);}if(c!==false){a.selected=true;if(isIE){b.selectedIndex=j;}}}}}function setSelectOptionText(f,d,h,g){if(isNLDropDown(f)){var a=getDropdown(f,g);a.setOptionText(d,h);}else{if(f.type=="select-one"||f.type=="select-multiple"){var c=f.options;for(var b=0;b<c.length;b++){if(c[b].value==d){c[b].text=h;}}}}}function getCascadedStyle(b,d,c){if(b.currentStyle){return b.currentStyle[d];}else{if(window.getComputedStyle){if(b.nodeType!=1){return null;}var a=window.getComputedStyle(b,"");if(a){return a.getPropertyValue(c);}}}return null;}function isFocusable(a){if(a==null||(typeof a.type=="undefined"&&!isNLDropDownSpan(a))||a.type=="hidden"||a.disabled||a.type=="button"){return false;}return elementIsFocusable(a);}function elementIsFocusable(b){while(b!=null){var a=getCascadedStyle(b,"visibility","visibility");var c=getCascadedStyle(b,"display","display");if(c=="none"||a=="hidden"||a=="hide"){return false;}b=b.parentNode;}return true;}function NLIsButton(a){if(a){if(a.tagName=="BUTTON"||(a.tagName=="INPUT"&&(a.type=="submit"||a.type=="button"||a.type=="reset"))){return true;}}return false;}function NLIsSubmitButton(a){if(a){if(a.tagName=="INPUT"&&a.type=="submit"){return true;}}return false;}function NLDisableButton(b,c){b.disabled=c;if(b.className.indexOf("nlbutton")>=0||b.className.indexOf("bgbutton")>=0||b.className.indexOf("nlinlineeditbutton")>=0){b.className=b.className.split("Disabled")[0]+(c?"Disabled":"");}if((b.className.indexOf("bntBgT")>=0)&&(b.name)){var a=document.getElementById("tr_"+b.name);if(a&&a.className){if(c){if(a.className.indexOf("Dis")<0){a.className=a.className+"Dis";}}else{a.className=a.className.replace("Dis","");}}}}function NLInvokeButton(a){if(a){if(a.disabled){return;}a.click();}}function NLAddButtonDisabledMessage(b,a,l){var d=document.getElementById(b);var c=document.getElementById(a);if(d==null||c==null){return;}var g=findGlobalPosX(d);var f=findGlobalPosY(d);var h=d.offsetWidth;var k=d.offsetHeight;var j=document.createElement("div");j.style.position="absolute";j.style.left=g+"px";j.style.top=f+"px";j.style.width=h+"px";j.style.height=k+"px";j.style.background="#000000";j.style.opacity="0";j.style.zindex="100";attachEventHandler("mouseover",j,function(){nlShowMessageTooltip(c,l);});attachEventHandler("mouseout",j,function(){closePopup();});attachEventHandler("click",j,function(){if(!c.disabled){c.onClick();}});d.appendChild(j);}function isDisplayOnlySelect(a){return a!=null&&a.type=="hidden"&&document.getElementById(a.name+"_displayval")!=null;}function isPopupSelect(a){return a!=null&&a.type=="hidden"&&getFormElement(a.form,a.name+"_display")!=null&&getFormElement(a.form,a.name+"_display").type=="text";}function isPopupMultiSelect(a){return a!=null&&a.type=="hidden"&&getFormElement(a.form,a.name+"_display")!=null&&getFormElement(a.form,a.name+"_display").type=="textarea"&&getFormElement(a.form,a.name+"_labels")!=null;}function NLPopupSelect_setExactMatchQuery(c,a){c.setAttribute("exactMatchQuery",a?"T":"F");}function NLPopupSelect_getExactMatchQuery(a){return a.getAttribute("exactMatchQuery")=="T";}function isSelect(a){return a!=null&&(a.type=="select-one"||isNLDropDown(a));}function isNLDropDown(a){return a.className&&a.className.indexOf("nldropdown")>=0;}function isNLDropDownSpan(a){return a!=null&&a.tagName=="SPAN"&&window.getDropdown!=null&&getDropdown(a)!=null;}function isMultiSelect(a){return a!=null&&(isNLMultiDropDown(a)||a.multiple||a.type=="select-multiple");}function isNLMultiDropDown(a){return a!=null&&a.getAttribute&&!isValEmpty(a.getAttribute("nlmultidropdown"));}function isRichTextEditor(a){return a!=null&&window.getHtmlEditor!=null&&getHtmlEditor(a.name)!=null;}function isSummaryField(a){return a.className&&a.className.indexOf("nlsummary")>=0;}function resetlist(b){if(b!=null){if(b.type=="select-one"||b.type=="select-multiple"){var a;for(a=0;a<b.length;a++){if(b.options[a].defaultSelected){b.selectedIndex=a;return;}}b.selectedIndex=0;}else{if(isNLDropDown(b)){getDropdown(b).resetDropDown();}else{if(isNLMultiDropDown(b)){getMultiDropdown(b).resetDropDown();}else{b.value=b.defaultValue;b.form.elements[b.name+"_display"].value=b.form.elements[b.name+"_display"].defaultValue;}}}}}function setFieldFocus(a){if(isSelect(a)||isMultiSelect(a)||isPopupSelect(a)||isPopupMultiSelect(a)){setSelectFocus(a);}else{if(window.getHtmlEditor!=null&&window.getHtmlEditor(a.name)!=null){window.getHtmlEditor(a.name).setFocus();}else{if(isFocusable(a)){a.focus();}}}}function setSelectFocus(a,b){if(a!=null){if(a.type=="select-one"||a.type=="select-multiple"){if(isFocusable(a)){a.focus();}}else{if(isNLDropDown(a)){if(isFocusable(getDropdown(a,b).getContainer())){getDropdown(a,b).setFocus();}}else{if(isNLMultiDropDown(a)){if(isFocusable(getMultiDropdown(a,b).getContainer())){getMultiDropdown(a,b).setFocus();}}else{if(isFocusable(a.form.elements[a.name+"_display"])){a.form.elements[a.name+"_display"].focus();}}}}}}function restoreSelectToOriginalValue(b,c){if(b!=null){if(b.type=="select-one"||b.type=="select-multiple"){var a=b.getAttribute("valuewhenrendered");if(a!=null&&a.length>0){setSelectValue(b,a);}}else{if(isNLDropDown(b)){getDropdown(b,c).restoreToOriginalValue();}}}}function getSelectValueAtIndex(b,a){if(b!=null){if(b.type=="select-one"||b.type=="select-multiple"){if((b.options!=null)&&(b.options.length>a)){return b.options[a].value;}else{return null;}}else{if(isNLDropDown(b)){return getDropdown(b).getValueAtIndex(a);}else{if(isNLMultiDropDown(b)){return getMultiDropdown(b).getValue(a);}}}}}function getSelectTextAtIndex(b,a){if(b!=null){if(b.type=="select-one"||b.type=="select-multiple"){if((b.options!=null)&&(b.options.length>a)){return b.options[a].text;}else{return null;}}else{if(isNLDropDown(b)){return getDropdown(b).getTextAtIndex(a);}else{if(isNLMultiDropDown(b)){return getMultiDropdown(b).getText(a);}}}}}function setNLCheckboxValue(a,b){if(!a){return;}if(typeof(b)=="string"){a.checked=b=="T";}else{a.checked=b;}NLCheckboxOnChange(a);}function getNLCheckboxValue(a){if(!a){return;}return a.checked;}function getNLCheckboxSpan(a){var b=a.parentNode;if(b&&b.nodeName=="SPAN"&&b.className&&(b.className.indexOf("checkbox")==0)){return b;}return null;}function setNLCheckboxDisabled(c,b){if(!c||c.type!="checkbox"){return;}var a="checkbox"+(b?"_disabled":"")+(c.checked?"_ck":"_unck");c.disabled=b;var d=getNLCheckboxSpan(c);if(d){d.className=a;}}function setNLCheckboxReadOnly(c,a){if(!c||c.type!="checkbox"){return;}var b="checkbox"+(a?"_read":"")+(c.checked?"_ck":"_unck");c.readonly=a;var d=getNLCheckboxSpan(c);d.className=b;}function NLCheckboxOnClick(g){var f=g.className;var b=null;for(var d=0;d<g.childNodes.length;d++){if(g.childNodes[d].type=="checkbox"){b=g.childNodes[d];break;}}if(!b||b.disabled){return;}if(b.type=="checkbox"&&b.checked){g.className=g.className.replace("_ck","_unck");b.checked=false;}else{g.className=g.className.replace("_unck","_ck");b.checked=true;}var c=b.checked;if(b.onclick){b.onclick();}var a=b.checked;if(c!=a){g.className=f;}else{if(b.onchange){b.onchange();}}}function NLCheckboxOnChange(a){if(!a){return;}var b=getNLCheckboxSpan(a);if(b){if(a.checked){b.className=b.className.replace("_unck","_ck");}else{b.className=b.className.replace("_ck","_unck");}}}function NLCheckboxSetParentState(a,c){if(!a){return;}var b=getNLCheckboxSpan(a);if(b){if(c){b.className=b.className.replace("_unck","_ck");}else{b.className=b.className.replace("_ck","_unck");}}}function NLCheckboxOnKeyPress(a){if(window.event){a=getEvent(a);if(a.keyCode==32&&a.srcElement){if(a.srcElement.onclick){a.srcElement.onclick();}NLCheckboxSetParentState(a.srcElement,!a.srcElement.checked);}}return true;}function getNLSummaryFieldContent(c){if(!isSummaryField(c)){return"";}var a=(c.document)?c.document:document;var b=a.getElementById(c.id+"_val");if(b&&b.parentNode){return b.parentNode.innerHTML;}return"";}function setNLSummaryFieldTextValue(c,d){if(!isSummaryField(c)){return"";}var a=(c.document)?c.document:document;var b=a.getElementById(c.id+"_val");if(b){b.innerHTML=d;}}function getNLSummaryFieldTextValue(c){if(!isSummaryField(c)){return"";}var a=(c.document)?c.document:document;var b=a.getElementById(c.id+"_val");if(b){return b.innerHTML;}return"";}function setNLSummaryFieldDisabled(c,b){if(!isSummaryField(c)){return;}c.disabled=b;var a=(c.document)?c.document:document;var d=a.getElementById(c.name+"_helper_popup");if(d!=null){d.style.visibility=b?"hidden":"inherit";}}function isNLNumericOrCurrencyDisplayField(a){if(!a){return false;}if(!(isNumericField(a)||isCurrencyField(a))){return false;}return(a.name.indexOf("_formattedValue")>0);}function getNLNumericOrCurrencyDisplayField(b){if(!b){return null;}var a=b.name+"_formattedValue";return findNLNumericFieldByName(b,a);}function getNLNumericOrCurrencyValueField(b){if(!b){return null;}var a=b.name.replace("_formattedValue","");return findNLNumericFieldByName(b,a);}function findNLNumericFieldByName(c,a){if(!c.form){var d=c.ownerDocument.getElementsByName(a);for(var b=0;b<d.length;b++){if(d[b].parentNode==c.parentNode){return d[b];}}return c.ownerDocument.getElementById(a);}return c.form.elements[a];}function isCurrencyField(b){if(!b){return false;}var a="";if(typeof b.getAttribute!="undefined"){a=b.getAttribute("dataType");}if(a=="currency"||a=="poscurrency"||a=="currency2"){return true;}return false;}function setNLCurrencyValue(a,c){a.value=c;var b=getNLNumericOrCurrencyDisplayField(a);if(!b){return;}b.value=NLNumberToString(c);}function isNumericField(b){if(!b){return false;}var a="";if(typeof b.getAttribute!="undefined"){a=b.getAttribute("dataType");}if(a=="float"||a=="posfloat"||a=="nonnegfloat"||a=="integer"||a=="posinteger"||a=="rate"||a=="ratehighprecision"||a=="percent"){return true;}return false;}function setNLNumericValue(a,c){a.value=c;var b=getNLNumericOrCurrencyDisplayField(a);if(!b){return;}b.value=NLNumberToString(c);}function setNLNumericOrCurrencyFieldDisabled(a,c){var b=getNLNumericOrCurrencyDisplayField(a);if(!b){return;}b.disabled=c;}function getNLNumericOrCurrencyFieldDisabled(a){var b=getNLNumericOrCurrencyDisplayField(a);if(!b){return false;}return b.disabled;}function setDefaultOrNotRequired(a,b){setRequired(a,b?getRequired(a):false);}function hasAttribute(b,a){if(isNLDropDown(b)){return getDropdown(b).hasAttribute(a);}else{if(isNLMultiDropDown(b)){return getMultiDropdown(b).hasAttribute(a);}else{if(window.getHtmlEditor!=null&&getHtmlEditor(b.name)!=null){return getHtmlEditor(b.name).hasAttribute(a);}else{return(b.getAttribute("flags")&a)!=0;}}}}function disableField(c,f){if(c==null){return;}if(!isSelect(c)&&c.length>1){for(var b=0;b<c.length;b++){if(c[b].type=="radio"){disableField(c[b],f);}}return;}else{if(isSelect(c)||isPopupSelect(c)||isMultiSelect(c)||isPopupMultiSelect(c)){disableSelect(c,f);}else{if(window.getHtmlEditor!=null&&getHtmlEditor(c.name)!=null){getHtmlEditor(c.name).setDisabled(f);}else{if(NLIsButton(c)){NLDisableButton(c,f);}else{if(c.type=="checkbox"){setNLCheckboxDisabled(c,f);}else{if(isSummaryField(c)){setNLSummaryFieldDisabled(c,f);}else{if(isNumericField(c)||isCurrencyField(c)){setNLNumericOrCurrencyFieldDisabled(c,f);}else{c.disabled=f;var a=(c.document)?c.document:document;var d=a.getElementById(c.name+"_helper_calendar");if(d!=null){d.style.visibility=f?"hidden":"inherit";}}}}}}}}}function getFieldDisabled(b){if(b==null){return;}if(!isSelect(b)&&b.length>1){for(var a=0;a<b.length;a++){if(b[a].type=="radio"){return b[a].disabled;}}}else{if(isSelect(b)||isPopupSelect(b)||isMultiSelect(b)){if(b.type=="select-one"||b.type=="select-multiple"){return b.disabled;}else{if(isNLDropDown(b)){return getDropdown(b,window).disabled;}else{if(isNLMultiDropDown(b)){return getMultiDropdown(b,window).disabled;}else{if(isPopupSelect(b)){return getFormElement(b.form,b.name+"_display").disabled;}}}}}else{if(window.getHtmlEditor!=null&&getHtmlEditor(b.name)!=null){return getHtmlEditor(b.name).disabled;}else{if(isNumericField(b)||isCurrencyField(b)){return getNLNumericOrCurrencyFieldDisabled(b);}else{return b.disabled;}}}}return false;}function isDisplayOnlyField(a){if(a==null){return;}if(isDisplayOnlySelect(a)){return true;}else{if(a.type=="hidden"&&document.getElementById(a.name+"_val")!=null){return true;}}return false;}function setOptionsFromMachineField(machine_name,field_name,selectObject,alternate_label,test_field,test_value){deleteAllSelectOptions(selectObject,window);var doc=window.document;var mch=eval(machine_name+"_machine");addSelectOption(doc,selectObject,"","",true,window);var bNewOptions=false;for(var i=1;i<=getLineCount(machine_name);i++){if(mch.getMachineIndex()==i||(test_field!=null&&getEncodedValue(machine_name,i,test_field)!=test_value)){continue;}bNewOptions=true;addSelectOption(doc,selectObject,getEncodedValue(machine_name,i,alternate_label!=null?alternate_label:field_name+"_display"),getEncodedValue(machine_name,i,field_name),false,window);}return bNewOptions;}function getSyncFunctionName(fldname,machine){var syncFuncName="Sync"+fldname;if(machine!=null){var machSyncFunc=syncFuncName+machine;if(eval("window."+machSyncFunc)!=null){return machSyncFunc;}}return syncFuncName;}function safeSetDocumentLocation(a){try{document.location=a;}catch(b){}}function addParamToURL(a,d,c,b){if(a==null){return null;}if(a.length&&a.charAt(a.length-1)=="#"){a=a.substring(0,a.length-1);}if(a.length&&a.indexOf("#")>-1){a=a.substring(0,a.indexOf("#"));}if(isValEmpty(d)){return a;}if(b==true){a=removeParamFromURL(a,d);}return addNextParamPrefixToURL(a)+d+"="+emptyIfNull(c);}function addNextParamPrefixToURL(a){return a+(a.indexOf("?")==-1?"?":"&");}function removeParamFromURL(b,f){var a="&";var d=b.indexOf("&"+f+"=");if(d==-1){d=b.indexOf("?"+f+"=");a="?";}if(d!=-1){var c=b.indexOf("&",d+1);return b.substring(0,d)+(c>0?(a=="?"?"?"+b.substr(c+1):b.substr(c)):"");}return b;}function formEncodeURLParams(c){var b="";for(var a in c){b+=(isValEmpty(b)?"":"&")+escape(a)+"="+escape(emptyIfNull(c[a]));}return b;}function previewMedia(d,c,a){if(c){d=d.substr(d.lastIndexOf("/")+1);}var b="/core/media/previewmedia.nl?id="+d;preview(b,"prevmedia");}function previewTemplate(c,a){var b="/app/crm/common/merge/previewtemplate.nl?id="+c;if(!isValEmpty(a)){b=addParamToURL(b,"entity",a);}preview(b,"previewtemplate");}function siteMedia(d,c,a){if(c){d=d.substr(d.lastIndexOf("/")+1);}var b="/app/site/media/sitemedia.nl?id="+d;preview(b,"sitemedia");}function preview(b,c){var a="location=no,width=600,height=500,menubar=yes,scrollbars=yes,resizable=yes";var d=window.open(b,c,a);d.focus();}function getCookieVal(b){var a=document.cookie.indexOf(";",b);if(a==-1){a=document.cookie.length;}return unescape(document.cookie.substring(b,a));}function GetCookie(d){var b=d+"=";var g=b.length;var a=document.cookie.length;var f=0;while(f<a){var c=f+g;if(document.cookie.substring(f,c)==b){return getCookieVal(c);}f=document.cookie.indexOf(" ",f)+1;if(f==0){break;}}return null;}function getStickyTag(d){var c=GetCookie("stickytags");if(c!=null){var a=c.indexOf(","+d+":")+1;if(a>=1){var f=c.indexOf(",",a);if(f<0){f=c.length;}return unescape(c.substring(a+d.length+1,f));}}return null;}function addStickyTagToUrl(b,a){return b+(b.indexOf("?")>=0?"&t=":"?t=")+getStickyTag(a);}function redirectToStickyPage(c,a,b){var f=addStickyTagToUrl(c,a);try{if(typeof(b)=="number"){parent.frames[b].document.location=f;}else{if(b){parent.document.location=f;}else{document.location=f;}}}catch(d){}}var SelectKeyPressMaxKeyPause=2000;function SelectKeyPressHandler(b,a){keyString=String.fromCharCode(getEventKeypress(b)).toUpperCase();if(!(keyString>=" "&&keyString<="_")){SelectKeyPressTypedString="";return true;}if(SelectKeyPressTimeoutID!=null){window.clearTimeout(SelectKeyPressTimeoutID);}SelectKeyPressTimeoutID=window.setTimeout("SelectKeyPressTimeout()",SelectKeyPressMaxKeyPause);SelectKeyPressTypedString+=keyString;if(a){if(SelectKeyPressTypedString.length==1){option=SelectKeyPressLookupFirst(b,SelectKeyPressTypedString);}else{option=SelectKeyPressLookupNext(b,SelectKeyPressTypedString);}}else{option=SelectKeyPressLookupLinear(b,SelectKeyPressTypedString);}setEventPreventDefault(b);if(option!=-1){getEventTarget(b).selectedIndex=option;getEventTarget(b).onchange();}return false;}var SelectKeyPressTypedString="";SelectKeyPressTimeoutID=null;function SelectKeyPressTimeout(){SelectKeyPressTypedString="";SelectKeyPressTimeoutID=null;}function SelectKeyPressLookupFirst(b,a){select=getEventTarget(b);options=select.options;low=0;high=options.length;while(high-low>1){i=Math.floor((high+low)/2);if(a.charAt(0)<=options(i).text.charAt(0).toUpperCase()){high=i;}else{low=i;}}while(high>0&&a.charAt(0)==options(high-1).text.charAt(0).toUpperCase()){--high;}if(high<options.length&&a.charAt(0)==options(high).text.charAt(0).toUpperCase()){return high;}else{return -1;}}function SelectKeyPressLookupNext(b,a){select=getEventTarget(b);options=select.options;selIndex=select.selectedIndex;while(selIndex<options.length-1&&options(selIndex).text.toUpperCase()<a){++selIndex;}if(selIndex<options.length-1&&options(selIndex).text.substr(0,a.length).toUpperCase()==a){return selIndex;}else{return -1;}}function SelectKeyPressLookupLinear(b,a){select=getEventTarget(b);options=select.options;for(i=0;i<options.length;++i){if(options(i).text.substr(0,a.length).toUpperCase()==a){return i;}}return -1;}function disableFilter(b,a,d,c){if(getRadioValue(b)==a){d.disabled=true;if(c){c.disabled=true;}}else{d.disabled=false;if(c){c.disabled=false;}}}function NLDate_parseString(n,w){var h=0;var o=0;var v=0;var g=n;var x="";var r="";var u,t,b;var k=null;if(!window.dateformat){window.dateformat="MM/DD/YYYY";}if(n==""){return new Date();}else{if(window.dateformat=="MM/DD/YYYY"){if(g.indexOf("/")!=-1){var q=g.split("/");if(onlydigits(q[0])){h=parseInt(q[0],10);}if(onlydigits(q[1])){o=parseInt(q[1],10);}if(o>1970){r=v=o;o=1;}else{if(onlydigits(q[2])){v=parseInt(q[2],10);}r=q[2];}}else{var j=g.length,p;p=g.substr(0,2-j%2);if(onlydigits(p)){h=parseInt(p,10);}p=g.substr(2-j%2,2);if(onlydigits(p)){o=parseInt(p,10);}p=g.substr(4-j%2);if(onlydigits(p)){v=parseInt(p,10);}r=p;}}else{if(window.dateformat=="DD/MM/YYYY"){if(g.indexOf("/")!=-1){var q=g.split("/");if(onlydigits(q[0])){o=parseInt(q[0],10);}if(onlydigits(q[1])){h=parseInt(q[1],10);}if(onlydigits(q[2])){v=parseInt(q[2],10);}r=q[2];}else{var j=g.length,p;p=g.substr(0,2-j%2);if(onlydigits(p)){o=parseInt(p,10);}p=g.substr(2-j%2,2);if(onlydigits(p)){h=parseInt(p,10);}p=g.substr(4-j%2);if(onlydigits(p)){v=parseInt(p,10);}r=p;}}else{if(window.dateformat=="YYYY/MM/DD"){if(g.indexOf("/")!=-1){var q=g.split("/");if(onlydigits(q[0])){v=parseInt(q[0],10);}if(onlydigits(q[1])){h=parseInt(q[1],10);}if(onlydigits(q[2])){o=parseInt(q[2],10);}r=q[0];}else{var j=g.length,p;p=g.substr(0,2-j%2);if(onlydigits(p)){v=parseInt(p,10);}p=g.substr(2-j%2,2);if(onlydigits(p)){h=parseInt(p,10);}p=g.substr(4-j%2);if(onlydigits(p)){o=parseInt(p,10);}r=p;}}else{if(window.dateformat=="DD.MM.YYYY"){if(g.indexOf(".")!=-1){var q=g.split(".");if(onlydigits(q[0])){o=parseInt(q[0],10);}if(onlydigits(q[1])){h=parseInt(q[1],10);}if(onlydigits(q[2])){v=parseInt(q[2],10);}r=q[2];}else{var j=g.length,p;p=g.substr(0,2-j%2);if(onlydigits(p)){o=parseInt(p,10);}p=g.substr(2-j%2,2);if(onlydigits(p)){h=parseInt(p,10);}p=g.substr(4-j%2);if(onlydigits(p)){v=parseInt(p,10);}r=parseInt(p,10);}}else{if(window.dateformat=="DD-Mon-YYYY"){if(g.indexOf("-")!=-1){var q=g.split("-");if(onlydigits(q[0])){o=parseInt(q[0],10);}h=getMonthIndex(q[1]);if(onlydigits(q[2])){v=parseInt(q[2],10);}r=q[2];}else{var j=g.length,p;p=g.substr(0,1+j%2);if(onlydigits(p)){o=parseInt(p,10);}p=g.substr(1+j%2,3);h=getMonthIndex(p);p=g.substr(4+j%2);if(onlydigits(p)){v=parseInt(p,10);}r=p;}}else{if(window.dateformat=="DD-MONTH-YYYY"){var f=g.split("-");if(onlydigits(f[0])){o=parseInt(f[0]);}h=arrayIndexOf(NLDate_months,f[1],true)+1;if(onlydigits(f[2])){v=parseInt(f[2]);r=v;}}else{if(window.dateformat=="YYYY-MM-DD"){var f=g.split("-");if(onlydigits(f[2])){o=parseInt(f[2]);}if(onlydigits(f[1])){h=parseInt(f[1]);}if(onlydigits(f[0])){v=parseInt(f[0]);r=v;}}else{if(window.dateformat=="EEYY年MM月DD日"){u=g.indexOf(year_char_cn);t=g.indexOf(month_char_cn);b=g.indexOf(day_char_cn);if(onlydigits(g.substring(t+1,b))){o=parseInt(g.substring(t+1,b));}if(onlydigits(g.substring(u+1,t))){h=parseInt(g.substring(u+1,t));}var a=g.substring(0,2);if(onlydigits(g.substring(2,u))){v=get_gregorian_year(parseInt(g.substring(2,u)),a);r=v;}}else{if(window.dateformat=="YYYY年MM月DD日"){u=g.indexOf(year_char_cn);t=g.indexOf(month_char_cn);b=g.indexOf(day_char_cn);if(onlydigits(g.substring(t+1,b))){o=parseInt(g.substring(t+1,b));}if(onlydigits(g.substring(u+1,t))){h=parseInt(g.substring(u+1,t));}if(onlydigits(g.substring(0,u))){v=parseInt(g.substring(0,u));r=v;}}else{if(window.dateformat=="EYY.MM.DD"){f=g.split(".");if(onlydigits(f[2])){o=parseInt(f[2]);}if(onlydigits(f[1])){h=parseInt(f[1]);}var a=f[0].substring(0,1);if(onlydigits(f[0].substring(1,f[0].length))){v=get_gregorian_year(parseInt(f[0].substring(1,f[0].length)),a);r=v;}}else{if(window.dateformat=="DD. Mon YYYY"){f=g.split(" ");if(onlydigits(f[0].substring(0,f[0].length-1))){o=parseInt(f[0].substring(0,f[0].length-1));}h=getMonthIndex(f[1]);if(onlydigits(f[2])){v=parseInt(f[2]);r=v;}}else{if(window.dateformat=="DD de MONTH de YYYY"){f=g.split(" de ");if(onlydigits(f[0])){o=parseInt(f[0]);}h=arrayIndexOf(NLDate_months,f[1])+1;if(onlydigits(f[2])){v=parseInt(f[2]);r=v;}}else{if(window.dateformat=="YYYY년 MM월 DD?"){f=g.split(" ");if(onlydigits(f[2].substring(0,f[2].length-1))){o=parseInt(f[2].substring(0,f[2].length-1));}if(onlydigits(f[1].substring(0,f[1].length-1))){h=parseInt(f[1].substring(0,f[1].length-1))-1;}if(onlydigits(f[0].substring(0,f[0].length-1))){v=parseInt(f[0].substring(0,f[0].length-1));r=v;}}else{if(window.dateformat=="DD MONTH YYYY"){f=g.split(" ");if(onlydigits(f[0])){o=parseInt(f[0]);}h=arrayIndexOf(NLDate_months,f[1],true)+1;if(onlydigits(f[2])){v=parseInt(f[2]);r=v;}}else{if(window.dateformat=="DD MONTH, YYYY"){f=g.split(" ");if(onlydigits(f[0])){o=parseInt(f[0]);}h=arrayIndexOf(NLDate_months,f[1].substring(0,f[1].length-1),true)+1;if(onlydigits(f[2])){v=parseInt(f[2]);r=v;}}}}}}}}}}}}}}}}}if(h==0||o==0){if(w){if(x==""){x=window.dateformat;}alert("Invalid date value (must be "+window.dateformat+")");}}else{if(v==0&&!onlydigits(r)){v=(new Date()).getFullYear();}if(h<1){h=1;}else{if(h>12){h=12;}}if(o<1){o=1;}else{if(o>31){o=31;}}if(v<100){v+=((v>=70)?1900:2000);}if(v<1000){v*=10;}if(v>9999){v=(new Date()).getFullYear();}r=v;k=validateDate(new Date(v,h-1,o),w);if(v!=nlGetFullYear(k)||h!=k.getMonth()+1||o!=k.getDate()){k=validateDate(new Date(v,h-1,o,12,30),w);if(v!=nlGetFullYear(k)||h!=k.getMonth()+1||o!=k.getDate()){k=null;}}}return k;}function validateDate(a,b){if(a.getTime()<-11636672400000){a=null;if(b){alert("Invalid date value (must be on or after "+getdatestring(new Date(-11636672400000))+")");}}return a;}var NLDate_pnDaysInMonths=new Array(31,28,31,30,31,30,31,31,30,31,30,31);function NLDate_getLastDayOfMonth(b){var a=b.getMonth();var d=NLDate_pnDaysInMonths[a];if(a==1){var c=b.getYear();if((c%400==0)||((c%4==0)&&(c%100!=0))){d++;}}return d;}function setDisabledState(a,c){elem=document.getElementById(a);if(typeof elem.disabled!="undefined"){elem.disabled=!c;return;}var b=document.getElementById(a).getElementsByTagName("INPUT");for(var d=0;d<b.length;d++){if(b[d].name.indexOf("_send")==-1){b[d].disabled=!c;}}var b=document.getElementById(a).getElementsByTagName("A");for(var d=0;d<b.length;d++){if(!c&&!b[d].disabled){b[d].enabledonclick=b[d].onclick;b[d].onclick=new Function("return false;");}else{if(c&&b[d].enabledonclick!=null&&b[d].disabled){b[d].onclick=b[d].enabledonclick;}}b[d].disabled=!c;}}var NLAlertContext_CREDIT_CARD_NUMBERS_MUST_CONTAIN_BETWEEN_13_AND_20_DIGITS="Credit card numbers must contain between 13 and 20 digits.";var NLAlertContext_CREDIT_CARD_NUMBERS_MUST_CONTAIN_ONLY_DIGITS="Credit card numbers must contain only digits.";var NLAlertContext_EMAIL_ADDRESSES_MUST_MATCH="Email addresses must match.";var NLAlertContext_NETSUITE_DOES_NOT_ACCEPT_EMAIL_ADDRESSES_WITH_QUOTATION_MARKS_COMMAS_COLONS_SPACES_OR_GREATER_THAN_OR_LESS_THAN_SIGNS="Please make sure there are no quotation marks, commas, colons, spaces, or greater than or less than signs.";var NLAlertContext_PASSWORDS_DONT_MATCHN="Passwords don't match.\n";var NLAlertContext_PASSWORDS_CANNOT_BE_EMPTYN="Passwords cannot be empty.\n";var NLAlertContext_PASSWORDS_MUST_BE_AT_LEAST_1_CHARACTERS_LONGN="Passwords must be at least {1} characters long.\n";var NLAlertContext_PASSWORDS_MUST_CONTAIN_AT_LEAST_ONE_LETTER_AZN="Passwords must contain at least one letter (A-Z).\n";var NLAlertContext_PASSWORDS_MUST_CONTAIN_AT_LEAST_ONE_NUMBER_OR_SPECIAL_CHARACTERN="Passwords must contain at least one number or special character.\n";var NLAlertContext_PASSWORDS_MAY_CONTAIN_ONLY_LETTERS_NUMBERS_AND_SPECIAL_CHARACTERSN="Passwords may contain only letters, numbers, and special characters.\n";var NLAlertContext_OLD_AND_NEW_PASSWORDS_ARE_TOO_SIMILAR="Old and new passwords are too similar.";var NLAlertContext_PASSWORD_MUST_NOT_BE_THE_SAME_AS_THE_EMAIL_ADDRESS="Password must not be the same as the email address";var NLAlertContext_CREDIT_CARD_NUMBER_IS_NOT_VALID__PLEASE_CHECK_THAT_ALL_DIGITS_WERE_ENTERED_CORRECTLY="Credit card number is not valid. Please check that all digits were entered correctly.";var NLAlertContext_NETSUITE_DOES_NOT_ACCEPT_EMAIL_ADDRESSES_WITH_QUOTATION_MARKS_COMMAS_COLONS_SPACES_OR_GREATER_THAN_OR_LESS_THAN_SIGNS="Please make sure there are no quotation marks, commas, colons, spaces, or greater than or less than signs.";var NLAlertContext_PLEASE_ENTER_A_VALID_EMAIL_ADDRESS="Please enter a valid email address.";var NLValidationUtil_SIMPLE_EMAIL_PATTERN=/^[-a-z0-9!#$%&'*+/=?^_`{|}~]+(?:\.[-a-z0-9!#$%&'*+/=?^_`{|}~]+)*@(?:[a-z0-9]+(?:-+[a-z0-9]+)*\.)+(?:ac|ad|aero|ae|af|ag|ai|al|am|an|ao|aq|arpa|ar|asia|as|at|au|aw|ax|az|ba|bb|bd|be|bf|bg|bh|biz|bi|bj|bm|bn|bo|br|bs|bt|bv|bw|by|bz|cat|ca|cc|cd|cf|cg|ch|ci|ck|cl|cm|cn|com|coop|co|cr|cu|cv|cw|cx|cy|cz|de|dj|dk|dm|do|dz|ec|edu|ee|eg|er|es|et|eu|fi|fj|fk|fm|fo|fr|ga|gb|gd|ge|gf|gg|gh|gi|gl|gm|gn|gov|gp|gq|gr|gs|gt|gu|gw|gy|hk|hm|hn|hr|ht|hu|id|ie|il|im|info|int|in|io|iq|ir|is|it|je|jm|jobs|jo|jp|ke|kg|kh|ki|km|kn|kp|kr|kw|ky|kz|la|lb|lc|li|lk|lr|ls|lt|lu|lv|ly|ma|mc|md|me|mg|mh|mil|mk|ml|mm|mn|mobi|mo|mp|mq|mr|ms|mt|museum|mu|mv|mw|mx|my|mz|name|na|nc|net|ne|nf|ng|ni|nl|no|np|nr|nu|nz|om|org|pa|pe|pf|pg|ph|pk|pl|pm|pn|pro|pr|ps|pt|pw|py|qa|re|ro|rs|ru|rw|sa|sb|sc|sd|se|sg|sh|si|sj|sk|sl|sm|sn|so|sr|st|su|sv|sx|sy|sz|tc|td|tel|tf|tg|th|tj|tk|tl|tm|tn|to|tp|travel|tr|tt|tv|tw|tz|ua|ug|uk|us|uy|uz|va|vc|ve|vg|vi|vn|vu|wf|ws|xn--0zwm56d|xn--11b5bs3a9aj6g|xn--3e0b707e|xn--45brj9c|xn--80akhbyknj4f|xn--80ao21a|xn--90a3ac|xn--9t4b11yi5a|xn--clchc0ea0b2g2a9gcd|xn--deba0ad|xn--fiqs8s|xn--fiqz9s|xn--fpcrj9c3d|xn--fzc2c9e2c|xn--g6w251d|xn--gecrj9c|xn--h2brj9c|xn--hgbk6aj7f53bba|xn--hlcj6aya9esc7a|xn--j6w193g|xn--jxalpdlp|xn--kgbechtv|xn--kprw13d|xn--kpry57d|xn--lgbbat1ad8j|xn--mgbaam7a8h|xn--mgbayh7gpa|xn--mgbbh1a71e|xn--mgbc0a9azcg|xn--mgberp4a5d4ar|xn--o3cw4h|xn--ogbpf8fl|xn--p1ai|xn--pgbs0dh|xn--s9brj9c|xn--wgbh1c|xn--wgbl6a|xn--xkc2al3hye2a|xn--xkc2dl3a5ee0h|xn--yfro4i67o|xn--ygbi2ammx|xn--zckzah|xxx|ye|yt|za|zm|zw)$/i;var NLAlertContext_THE_SPECFIED_ROUTING_NUMBER_FAILED_VALIDATION_FOR_ABA_ROUTING_NUMBERS="The specfied routing number failed validation for ABA Routing Numbers.";var NLAlertContext_ABA_ROUTING_NUMBERS_MUST_BE_NINE_CHARACTERS="ABA Routing Numbers must be nine characters.";function isValEmpty(a){if(a==null){return true;}a=new String(a);return(a.length==0)||!/\S/.test(a);}function isHTMLValEmpty(a){if(isValEmpty(a)){return true;}a=a.replace(/&nbsp;|<(?!NL)[^>]*>/gi,"");return !/\S/.test(a);}function nvl(b,a){return b==null?a:b;}function emptyIfNull(a){return a==null?"":a;}function nullIfEmpty(a){return isValEmpty(a)?null:a;}function trim(a){return a.replace(/^\s+/,"").replace(/\s+$/,"");}function onlydigitsandchars(b){var a=new RegExp("([A-Za-z0-9]+)");return(a.exec(b)!=null&&RegExp.$1==b);}function onlydigits(a){return/^[0-9]+$/.test(a);}function isemptyorzero(d){var b=d;var a=isValEmpty(b);var c=b==0;return(a||c);}function isNewRecord(){var a=typeof nlapiGetField!=undefined&&nlapiGetField("id")!=null?nlapiGetFieldValue("id"):typeof document!=undefined&&document.forms.main_form.elements.id!=null?document.forms.main_form.elements.id:"";return isValEmpty(a)||a==-1;}function isExistingRecord(){return !isNewRecord();}function getEditFlag(){return isExistingRecord();}function checkMandatoryFields(f,d,l,k){var m="";for(var c=0;c<f.length;c++){if(f[c]==null){continue;}var a=l!=null?l[c]:f[c].value;if((new String(a)).indexOf(String.fromCharCode(3))!=-1){var h=a.split(String.fromCharCode(4));for(var b=0;b<h.length;b++){var g=h[b].split(String.fromCharCode(3));if(g[1]=="T"&&g[3].length==0){m+=(m.length?", ":"")+g[2];}}continue;}if(l!=null){if((k!=null&&!Machine_isMandatoryOnThisLine(k,f[c],nlapiGetCurrentLineItemIndex(k)))||(k==null&&!nlapiGetFieldMandatory(f[c]))){continue;}if(isValEmpty(a)){m+=(m.length?", ":"")+d[c];}}else{if(!getRequired(f[c])){continue;}if(isSelect(f[c])){a=getSelectValue(f[c]);if(isValEmpty(a)){m+=(m.length?", ":"")+d[c];}}else{if(window.getHtmlEditor!=null&&getHtmlEditor(f[c].name)!=null){if(isValEmpty(f[c].value.replace("<DIV></DIV>",""))){m+=(m.length?", ":"")+d[c];}}else{if(isempty(f[c])){m+=(m.length?", ":"")+d[c];}}}}}return m;}function checkUniqueFields(a,b,c){if(b==null||b.length==0){return null;}for(var l=1;l<=nlapiGetLineItemCount(a)+1;l++){if(l==nlapiGetCurrentLineItemIndex(a)){continue;}var o=true,g=true;for(var h=0;h<b.length;h++){var n=b[h];if(!isValEmpty(getEncodedValue(a,l,n))){o=false;}if(getEncodedValue(a,l,n)!=nlapiGetCurrentLineItemValue(a,b[h])){g=false;break;}}if(o||!g){continue;}var m=new Array();for(var d=0;d<b.length;d++){m.push(c[d]);}return m;}return null;}function checkccnumber(fld){var cardnum=typeof(fld)!="string"?fld.value:nlapiGetFieldValue(fld);if(cardnum.length>0){cardnum=cardnum.replace(/ /gi,"");}if(cardnum.length>0){cardnum=cardnum.replace(/-/gi,"");}if(cardnum.length<13||cardnum.length>20){alert(NLAlertContext_CREDIT_CARD_NUMBERS_MUST_CONTAIN_BETWEEN_13_AND_20_DIGITS);return false;}if(!onlydigits(cardnum)){alert(NLAlertContext_CREDIT_CARD_NUMBERS_MUST_CONTAIN_ONLY_DIGITS);return false;}var no_digit=cardnum.length;var oddoeven=no_digit&1;var sum=0;for(var count=0;count<no_digit;count++){var digit=parseInt(cardnum.charAt(count),10);if(!((count&1)^oddoeven)){digit*=2;if(digit>9){digit-=9;}}sum+=digit;}if(sum%10!=0){alert(NLAlertContext_CREDIT_CARD_NUMBER_IS_NOT_VALID__PLEASE_CHECK_THAT_ALL_DIGITS_WERE_ENTERED_CORRECTLY);return false;}eval(typeof(fld)!="string"?"fld.value = cardnum":"nlapiSetFieldValue(fld, cardnum, false)");return true;}function setPreferredFields(b,f,d,a){if(getEncodedValue(b,a,f)=="T"){for(var c=1;c<=getLineCount(b)+1;c++){if(c!=a&&getEncodedValue(b,c,f)=="T"){if(d==null||getEncodedValue(b,a,d)==getEncodedValue(b,c,d)){setEncodedValue(b,c,f,"F");}}}}return true;}function escapeJSONChar(b){if(b=='"'||b=="\\"){return"\\"+b;}else{if(b=="\b"){return"\\b";}else{if(b=="\f"){return"\\f";}else{if(b=="\n"){return"\\n";}else{if(b=="\r"){return"\\r";}else{if(b=="\t"){return"\\t";}}}}}}var a=b.charCodeAt(0).toString(16);if(a.length==1){return"\\u000"+a;}else{if(a.length==2){return"\\u00"+a;}else{if(a.length==3){return"\\u0"+a;}else{return"\\u"+a;}}}}function escapeJSONString(b){var d=b.split("");for(var a=0;a<d.length;a++){var f=d[a];if(f=='"'||f=="\\"||f.charCodeAt(0)<32||f.charCodeAt(0)>=128){d[a]=escapeJSONChar(d[a]);}}return'"'+d.join("")+'"';}toJSON=function toJSON(c){if(c==null){return"null";}else{if(c.constructor==String||c.constructor.name=="String"){return escapeJSONString(c);}else{if(c.constructor==Number||c.constructor.name=="Number"){return c.toString();}else{if(c.constructor==Boolean||c.constructor.name=="Boolean"){return c.toString();}else{if(c.constructor==Date||c.constructor.name=="Date"){return'{javaClass: "java.util.Date", time: '+c.valueOf()+"}";}else{if(c.constructor==Array||c.constructor.name=="Array"||c.length>=0){var a=[];for(var b=0;b<c.length;b++){a.push(toJSON(c[b]));}return"["+a.join(", ")+"]";}else{var a=[];for(attr in c){if(c[attr]==null){a.push('"'+attr+'": null');}else{if(typeof c[attr]=="function"){}else{a.push(escapeJSONString(attr)+": "+toJSON(c[attr]));}}}return"{"+a.join(", ")+"}";}}}}}}};function getQtyRate(g,h,d){var b=g.split(String.fromCharCode(5));var c;var a=0;var f;for(c=0;c<b.length;c+=2){if(h>=parseFloat(b[c])&&(c+2>=b.length||h<parseFloat(b[c+2]))){if(d&&h>0){a+=(h-parseFloat(b[c]))*parseFloat(b[c+1]);f=a/h;}else{f=b[c+1];}break;}else{if(d&&h>0){a+=(parseFloat(b[c+2])-parseFloat(b[c]))*parseFloat(b[c+1]);}}}return f;}function parseFloatOrZero(b){var a=parseFloat(b);return isNaN(a)?0:a;}function isValidUSZipCode(b){var a=/^\d{5}([\-]\d{4})?$/;return(a.test(b));}function checkemail(b,a,c){b=trim(b);return checkemail2(b,b,a,c);}function checkemail2(a,f,b,d){var c=a;if(c!=f){alert(NLAlertContext_EMAIL_ADDRESSES_MUST_MATCH);return false;}if(b&&c.length==0){return true;}return checkemailvalue(c,d);}function checkemailvalue(a,b){b=true;if(/\s|[,":<>]/.test(a)){if(b){alert(NLAlertContext_PLEASE_ENTER_A_VALID_EMAIL_ADDRESS+" "+NLAlertContext_NETSUITE_DOES_NOT_ACCEPT_EMAIL_ADDRESSES_WITH_QUOTATION_MARKS_COMMAS_COLONS_SPACES_OR_GREATER_THAN_OR_LESS_THAN_SIGNS);}return false;}if(!NLValidationUtil_SIMPLE_EMAIL_PATTERN.test(a)){if(b){alert(a+" "+NLAlertContext_PLEASE_ENTER_A_VALID_EMAIL_ADDRESS);}return false;}return true;}function checkemailprefix(a){return/^[^@]+@[^@]*$/.test(a)&&!/\s|[,":<>]|[.][.]/.test(a);}function checkvalnotempty(b,a){if(isValEmpty(b)){if(a){alert(a);}return false;}return true;}function checkpassword(j,g,c,b,h,d,f){var k=(b==true||b==null);var a=getpassworderror(j,g,k,h,d,f);if(a!=null){if(c){alert(a);}return false;}else{return true;}}function getpassworderror(l,j,b,k,f,g){var n=(b==true||b==null);var a=l;if(f==null){f=6;}msg="";if(l!=j){msg+=NLAlertContext_PASSWORDS_DONT_MATCHN;}else{if(!n){if(a.length==0){msg=NLAlertContext_PASSWORDS_CANNOT_BE_EMPTYN;}}else{if(a.length<f){msg+=NLAlertContext_PASSWORDS_MUST_BE_AT_LEAST_1_CHARACTERS_LONGN.replace("{1}",String(f));}if(!/[A-Za-z]/.test(a)){msg+=NLAlertContext_PASSWORDS_MUST_CONTAIN_AT_LEAST_ONE_LETTER_AZN;}if(!/[0-9!@#$%^&*.:;~'`*",_|= \<\>\/\\\+\?\-\(\)\[\]\{\}]/.test(a)){msg+=NLAlertContext_PASSWORDS_MUST_CONTAIN_AT_LEAST_ONE_NUMBER_OR_SPECIAL_CHARACTERN;}if(!/^[A-Za-z0-9!@#$%^&*.:;~'`*",_|= \<\>\/\\\+\?\-\(\)\[\]\{\}]+$/.test(a)){msg+=NLAlertContext_PASSWORDS_MAY_CONTAIN_ONLY_LETTERS_NUMBERS_AND_SPECIAL_CHARACTERSN;}}}if(msg.length==0&&k!=null){var m=k;var o=0;for(var d=0;d<a.length;d++){var h=a.charAt(d);if(m.indexOf(h)==-1){o++;}}if(o<2){msg=NLAlertContext_OLD_AND_NEW_PASSWORDS_ARE_TOO_SIMILAR;}}if(msg.length==0&&g!=null){if(g==l){msg=NLAlertContext_PASSWORD_MUST_NOT_BE_THE_SAME_AS_THE_EMAIL_ADDRESS;}}if(msg.length>0){return msg;}else{return null;}}function validate_AbaRoutingNumber(g){if(g==null||g.length==0){NS.form.setValid(true);return true;}var c=9;var b=true;var d="";if(g.length!=c){d=NLAlertContext_ABA_ROUTING_NUMBERS_MUST_BE_NINE_CHARACTERS;b=false;}var a=g;var f=0;for(i=0;i<a.length;i+=3){f+=parseInt(a.charAt(i),10)*3+parseInt(a.charAt(i+1),10)*7+parseInt(a.charAt(i+2),10);}if(f!=0&&f%10==0){b=true;}else{d=NLAlertContext_THE_SPECFIED_ROUTING_NUMBER_FAILED_VALIDATION_FOR_ABA_ROUTING_NUMBERS+"("+g+")";b=false;}if(d!=""){alert(d);}NS.form.setValid(b);return b;}function stringContainsCJKChar(d){if(d==null||d.length==0){return false;}var c=false;for(var b=0;b<d.length;b++){var a=d.charCodeAt(b);if((a>=12352&&a<=40959)||(a>=44032&&a<=55215)){c=true;break;}}return c;}function nlOpenWindow(c,f,b,a,d,g){if(window.doPageLogging){logStartOfRequest("popup");}if(isValEmpty(b)){return window.open(c,f);}else{if(isNaN(parseInt(b))){return window.open(c,f,b);}else{if(isIE){return window.open(c,f,"scrollbars="+(g?"yes":"no")+",width="+Math.min(screen.availWidth,b)+",height="+Math.min(screen.availHeight-40,a)+",left="+Math.min(screen.availWidth-b,getObjectLeft(d))+",top="+Math.min((screen.availHeight-40)-a,getObjectTop(d))+",resizable=yes");}else{return window.open(c,f,"scrollbars="+(g?"yes":"no")+",width="+b+",height="+a+",resizable=yes");}}}}function nlExtOpenDivWindow(b,k,o,c,h,n,l,f,g,p){var j="<div id='"+b+"_framediv'></div>";if(f!=null&&typeof f!="undefined"){j=f;}if(typeof p!="undefined"){j=p+"<div style='width:100%;float:left;clear:left;' id='"+b+"_framediv'>";}var d=null;var a=null;if(g!=null&&typeof g!="undefined"){var d=findGlobalPosX(g);var a=findGlobalPosY(g);}var m=null;if(isIE){m=new Ext.Window({title:(n!=undefined?n:b),id:b,name:b,stateful:false,autoScroll:h,width:""+Math.min(screen.availWidth,k)+"px",height:""+Math.min(screen.availHeight,o)+"px",left:""+Math.min(screen.availWidth-k,getObjectLeft(c))+"px",top:""+Math.min((screen.availHeight)-o,getObjectTop(c))+"px",style:"background-color: #FFFFFF;",bodyStyle:"background-color: #FFFFFF;",resizable:true,modal:false,listeners:l,bodyCfg:{tag:"center",name:b+"_frame",id:b+"_frame",html:j,width:Math.min(screen.availWidth,k)+"px",height:Math.min(screen.availHeight,o)+"px",style:"border:none;background-color: #FFFFFF;"}});if((!isValEmpty(d))&&(!isValEmpty(a))){m.x=d;m.y=a;}m.show();m.syncSize();}else{m=new Ext.Window({title:(n!=undefined?n:b),id:b,name:b,stateful:false,modal:false,autoScroll:false,width:k+"px",height:o+"px",style:"background-color: #FFFFFF;",bodyStyle:"background-color: #FFFFFF;",resizable:true,listeners:l,bodyCfg:{tag:"center",name:b+"_frame",id:b+"_frame",html:j,width:k+"px",height:o+"px",style:"border:none;background-color: #FFFFFF;"}});if((!isValEmpty(d))&&(!isValEmpty(a))){m.x=d;m.y=a;}m.show();m.syncSize();}}function nlExtOpenWindow(a,c,j,n,d,h,m,k,g){a=addParamToURL(a,"ifrmcntnr","T",true);if(!k){k=new Object();}if(window.doPageLogging){logStartOfRequest("extpopup");}var f=null;var b=null;if(g!=null&&typeof g!="undefined"){var f=findGlobalPosX(g);var b=findGlobalPosY(g);}var l=null;if(isValEmpty(j)){l=new Ext.Window({title:(m!=undefined?m:c),id:c,name:c,stateful:false,bodyCfg:{tag:"iframe",name:c+"_frame",id:c+"_frame",src:a,style:"border: 0 none; background-color: #FFFFFF;"}});}else{if(isNaN(parseInt(j))){l=new Ext.Window({title:(m!=undefined?m:c),id:c,name:c,stateful:false,bodyCfg:{tag:"iframe",name:c+"_frame",id:c+"_frame",src:a,style:"border: 0 none; background-color: #FFFFFF;"}});}else{if(isIE){l=new Ext.Window({title:(m!=undefined?m:c),id:c,name:c,stateful:false,autoScroll:h,width:""+Math.min(screen.availWidth,j+20)+"px",height:""+Math.min(screen.availHeight-40,n+20)+"px",left:""+Math.min(screen.availWidth-j,getObjectLeft(d))+"px",top:""+Math.min((screen.availHeight-40)-n,getObjectTop(d))+"px",style:"background-color: #FFFFFF;",bodyStyle:"background-color: #FFFFFF;",resizable:true,modal:true,listeners:k,bodyCfg:{tag:"iframe",name:c+"_frame",id:c+"_frame",src:a,width:""+Math.min(screen.availWidth,j+4)+"px",height:""+Math.min(screen.availHeight-40,n)+"px",style:"border: 0 none; background-color: #FFFFFF;"}});}else{l=new Ext.Window({title:(m!=undefined?m:c),id:c,name:c,stateful:false,modal:true,autoScroll:h,width:(parseInt(""+j)+20)+"px",height:(parseInt(""+n)+20)+"px",style:"background-color: #FFFFFF;",bodyStyle:"background-color: #FFFFFF;",resizable:true,listeners:k,bodyCfg:{tag:"iframe",name:c+"_frame",id:c+"_frame",src:a,width:(j+4)+"px",height:n+"px",style:"border: 0 none; background-color: #FFFFFF;"}});}}}if((!isValEmpty(f))&&(!isValEmpty(b))){l.x=f;l.y=b;}l.show();l.syncSize();}function getObjectLeft(a){var b=0;while(a!=null&&a!=document.body){b+=a.offsetLeft;a=a.offsetParent;}return b+(isIE?window.screenLeft:window.screenX+window.outerWidth-window.innerWidth);}function getObjectTop(a){var b=0;while(a!=null&&a!=document.body){b+=a.offsetTop;a=a.offsetParent;}if(isIE){return b+window.screenTop;}var c=0;if(typeof window.statusbar!="undefined"&&window.statusbar!=null&&window.statusbar.visible){c=20;}return b+window.screenY+window.outerHeight-window.innerHeight-c;}function setFieldVisibility(b,a){var c=document.getElementById(b);visible(c,a);}function setLabelVisibility(b,a){var c=document.getElementById(b+"_lbl");visible(c,a);}function setFieldAndLabelVisibility(b,a){setLabelVisibility(b,a);setFieldVisibility(b,a);}function showLabel(b,a){var c=document.getElementById(b+"_lbl");display(c,a);}function showHelperText(b,a){var c=document.getElementById(b+"_hlp");display(c,a);}function setLabel(b,a){var c=document.getElementById(b+"_lbl");if(c==null){return;}c.innerHTML=a;}function getLabel(a){var b=document.getElementById(a+"_lbl");if(b==null){return null;}else{if(b.getElementsByTagName("a")!=null&&b.getElementsByTagName("a").length==1){return b.getElementsByTagName("a").item(0).innerHTML;}else{return b.innerHTML;}}}function showFieldAndLabel(b,a){if(window.nlentryform){window.nlentryform.trackFieldVisibility(b,a);}showLabel(b,a);showField(b,a);}function hideTab(d,a){var b=a?"none":"";var c=document.getElementById(d+"upperlt");if(c!=null){c.style.display=b;}c=document.getElementById(d+"uppermiddot");if(c!=null){c.style.display=b;}c=document.getElementById(d+"uppermid");if(c!=null){c.style.display=b;}c=document.getElementById(d+"upperrt");if(c!=null){c.style.display=b;}var c=document.getElementById(d+"lt");if(c!=null){c.style.display=b;}c=document.getElementById(d+"lnkdot");if(c!=null){c.style.display=b;}c=document.getElementById(d+"lnk");if(c!=null){c.style.display=b;}c=document.getElementById(d+"rt");if(c!=null){c.style.display=b;}c=document.getElementById(d+"_pane");if(c!=null){c.style.display=b;}else{c=document.getElementById(d+"_layer");if(c!=null){c.style.display=b;}}c=document.getElementById(d+"_umh");if(c!=null){c.style.display=b;}}function setFormValue(c,d,g,a,b){if(c==null){return;}if(c.type=="checkbox"){setNLCheckboxValue(c,d);}else{if(c.type=="radio"||(c.length>0&&c[0].type=="radio")){syncradio(c,d);}else{if(c.type=="select-one"){synclist(c,d);}else{if(isNLDropDown(c)){getDropdown(c).setValue(d,true);}else{if(isMultiSelect(c)){syncmultiselectlist(c,d,null,true);}else{if(window.getHtmlEditor!=null&&getHtmlEditor(c.name)!=null&&(c==getHtmlEditor(c.name).hddn)){return getHtmlEditor(c.name).setValue(d,true);}else{if(c.nodeName=="INPUT"||c.nodeName=="TEXTAREA"||window.virtualBrowser){var f=d!=null&&d.join!=null&&(isPopupMultiSelect(c)||isArray(d))?d.join(String.fromCharCode(5)):d;if(isPopupSelect(c)){syncpopup(c,f,g);}else{if(isPopupMultiSelect(c)){syncmultiselectlist(c,f,g,true);}else{if(isCurrencyField(c)){setNLCurrencyValue(c,d);}else{if(isNumericField(c)){setNLNumericValue(c,d);}else{c.value=f;if(isDisplayOnlySelect(c)&&typeof g!="undefined"){document.getElementById(c.name+"_displayval").innerHTML=g!=null?g.replace(new RegExp(String.fromCharCode(5),"g"),"<BR>"):"";}}}}}}else{c.innerHTML=d;}}}}}}}var h=c;if((isNumericField(c)||isCurrencyField(c))&&getNLNumericOrCurrencyDisplayField(c)!=null){h=getNLNumericOrCurrencyDisplayField(c);}if(h.machine){h.machine.setFieldInputValue(c.name,d,a,g);}else{if(h.uiform){h.uiform.setFieldInputValue(c.name,d,a,g);}}if(a){try{if(b){setSlavingAsync(false);}fireProperOnChange(c);}finally{setSlavingAsync(true);}}}function getFormValue(a,b){if(a==null){return null;}if(a.type=="checkbox"){return a.checked?"T":"F";}else{if(a.type=="radio"||(a.length>0&&a[0].type=="radio")){return getRadioValue(a);}else{if(a.type=="select-one"||isNLDropDown(a)){return getSelectValue(a);}else{if(isMultiSelect(a)){return getMultiSelectValues(a,b);}else{if(isRichTextEditor(a)){return a.value;}else{return b&&a.value!=null&&isPopupMultiSelect(a)?a.value.split(String.fromCharCode(5)):a.value;}}}}}}function getParameter(d,c){if(typeof c=="undefined"||c==null){c=document;}var a=new RegExp(".*[?&]"+d+"=([^&]*)");var b=a.exec(c.location.href.toString());return b!=null&&b.length>0?b[1]:null;}function getBooleanParameter(a){return getParameter(a)=="T";}function getParameterValuesArray(){var c=document.location.href.toString();if(c.indexOf("?")<0){return null;}var f=c.substring(c.indexOf("?")+1).split("&");var b=new Array();for(var d=0;d<f.length;d++){var g=f[d].split("=");b[b.length]=g[0];b[b.length]=g.length>0?g[1]:null;}return b;}function getFormElement(d,c){var a=null;if(d!=null){if(c=="language"||(!isIE&&(c=="item"||c=="cash"))){for(var b=0;b<d.elements.length;b++){if(d.elements[b].name==c){a=d.elements[b];break;}}}else{if(d.elements!=null){a=d.elements[c];}}}return a;}function getFormElementViaFormName(b,a){return getFormElement(document.forms[b],a);}var isIE=document.all?true:false;var isNS=document.addEventListener?true:false;function findGlobalPosX(c,a){var b=0;if(document.getElementById||document.all){while(c.offsetParent){b+=c.offsetLeft;c=c.offsetParent;}if(c.document!=null&&c.document.parentWindow!=null&&c.document.parentWindow.frameElement){b+=findGlobalPosX(c.document.parentWindow.frameElement);}}else{if(document.layers){b+=c.y;}}return b;}function findGlobalPosY(b){var a=0;if(document.getElementById||document.all){while(b.offsetParent){a+=b.offsetTop;b=b.offsetParent;}if(b.document!=null&&b.document.parentWindow!=null&&b.document.parentWindow.frameElement){a+=findGlobalPosY(b.document.parentWindow.frameElement);}}else{if(document.layers){a+=b.y;}}return a;}function findAbsolutePosX(b){var c=0;if(document.getElementById||document.all){while(b.offsetParent){c+=b.offsetLeft;if(b.offsetParent!=document.body){c-=b.offsetParent.scrollLeft;}b=b.offsetParent;}}else{if(document.layers){c+=b.x;}}var a=window.parentAccesible&&false;return(a?parent.Ext.WindowMgr.getActive().x+c:c);}function findAbsolutePosY(c){var b=0;if(document.getElementById||document.all){while(c.offsetParent){b+=c.offsetTop;if(c.offsetParent!=document.body){b-=c.offsetParent.scrollTop;}c=c.offsetParent;}}else{if(document.layers){b+=c.y;}}var a=window.parentAccesible&&false;return(a?parent.Ext.WindowMgr.getActive().y+b:b);}function findPosX(c){var d=0;var b=(window.parentAccesible&&parent&&parent.Ext);var a=(b?parent.Ext.WindowMgr.getActive()!=null:false);if(a&&(parent.Ext.isSafari||parent.Ext.isChrome)){d=c.offsetParent.offsetLeft;}else{if(document.getElementById||document.all){while(c.offsetParent){d+=c.offsetLeft;c=c.offsetParent;}}else{if(document.layers){d+=c.x;}}}return d;}function findPosY(b){var a=0;if(document.getElementById||document.all){while(b.offsetParent){a+=b.offsetTop;b=b.offsetParent;}}else{if(document.layers){a+=b.y;}}return a;}function getParentElementByTag(a,b){if(!a){return null;}var c=b;while(c!=null){if(c.tagName.toLowerCase()==a.toLowerCase()){return c;}if(c==c.parentNode){break;}c=c.parentNode;}return null;}function contains(a,b){var c=b;while(c!=null){if(c==a){return true;}c=c.parentNode;}return false;}function fireProperOnChange(a,b){if(a!=null){if(b==null){b=window;}if(a.getAttribute("onChangeFunc")){b.localEval(a.getAttribute("onChangeFunc").replace(/this/g,"document.forms."+a.form.name+"."+a.name));}else{if((a.type=="checkbox"||a.type=="radio")&&a.onclick){a.onclick();}else{if(a.onchange){a.onchange();}}}}}function getInlineTextValue(b){if((typeof b=="undefined")||b==null){return"";}var a="";if(b.innerText){a=b.innerText;}else{a=b.innerHTML.replace(/<br>/gi,"\n").replace(/(<([^>]+)>)/gi,"");}return a;}function setInlineTextValue(a,b){if(a==null){return;}a.innerHTML=b;}function findUp(b,a){while((b!=null)&&(b.nodeName!=a)){b=b.parentNode;}return b;}function getEvent(a){return(typeof(a)!="undefined"&&a)?a:((typeof(event)!="undefined"&&event)?event:null);}function getEventKeypress(a){a=getEvent(a);return(a.which)?a.which:a.keyCode;}function getEventAltKey(a){a=getEvent(a);return(a)?a.altKey:false;}function getEventMacCommandKey(a){return a.metaKey;}function getEventCtrlKey(a){a=getEvent(a);return(a)?a.ctrlKey:false;}function getEventShiftKey(a){a=getEvent(a);return(a)?a.shiftKey:false;}function getEventTarget(a){a=getEvent(a);if(a){if(a.srcElement){return a.srcElement;}if(a.target){return a.target;}}return null;}function getEventTargetType(a){a=getEventTarget(a);return(a)?a.type:null;}function setEventPreventDefault(a){a=getEvent(a);if(a){if(a.preventDefault){a.preventDefault();}else{a.returnValue=false;}}}function setEventCancelBubble(a){a=getEvent(a);if(a){if(a.stopPropagation){a.stopPropagation();}else{a.cancelBubble=true;}}}function restoreHtmlEditors(b){if(typeof NetSuite=="object"&&typeof NetSuite.RTEManager=="object"){var a=document.forms.main_form!=null&&document.forms.main_form.elements.nlapiVF!=null?document.forms.main_form.elements.nlapiVF.value:null;try{if(a!=null){document.forms.main_form.elements.nlapiVF.value="";}NetSuite.RTEManager.getMap().eachKey(function(c,f){var d=f.obj;if(b==null||d.hddn.form==b){d.setValue(d.hddn.value);}});}finally{if(a!=null){document.forms.main_form.elements.nlapiVF.value=a;}}}}function nlFieldHelp(n,b,k,h){var a="/core/help/fieldhelp.nl?fld="+k+"&perm="+b;if(window.isOLC){a="/offline/pages/core/help/offlinefieldhelp.html?field="+k+"&recordType="+b.toLowerCase();}var g="fieldhelp";var c=350;var m=150;if(h!=null){var d=Math.min(screen.availWidth-c,getObjectLeft(h));var l=Math.min((screen.availHeight-40)-m,getObjectTop(h)+h.offsetHeight);}var j=window[g];if(typeof j=="undefined"||j==null||j.closed){j=window.open(a,g,"scrollbars="+(isIE?"no":"yes")+",width="+Math.min(screen.availWidth,c)+",height=50,left="+d+",top="+l+",resizable=yes");}else{j.location=a;j.moveTo(d,l);}j.focus();window[g]=j;return false;}function dumpObj(a){for(var c in a){var b=c+": "+a[c];document.body.appendChild(document.createTextNode(b));document.body.appendChild(document.createElement("BR"));}if(a.style){document.body.appendChild(document.createTextNode("STYLE:"));document.body.appendChild(document.createElement("BR"));dumpObj(a.style);}}function NLAlert(b,a){alert(b);}var global_parseFloat=parseFloat;parseFloat=function(a){return(a&&a.toString()=="")?NaN:global_parseFloat(a);};function nsapiIsString(a){return typeof a==="string"||a instanceof String||nsapiInstanceOf(a,"String");}function nsapiInstanceOf(d,b){if(typeof d==="undefined"||d===null){return false;}var c=Object.prototype.toString.call(d);if(c.slice(8,-1)===b){return true;}if(typeof d.constructor==="undefined"){return false;}if(typeof d.constructor.name!=="undefined"){return d.constructor.name===b;}var a=/^function ([^( ]+)/.exec(d.constructor.toString());return !!(a&&a[1]==b);}function arrayIndexOf(d,c,b){for(var a=0;d!=null&&a<d.length;a++){if(c==d[a]||(b&&c!=null&&d[a]!=null&&c.toLowerCase()==d[a].toLowerCase())){return a;}}return -1;}function arrayContains(b,a){return arrayIndexOf(b,a)>=0;}function arrayAdd(b,a){if(!arrayContains(b,a)){b.push(a);}}function arrayRemove(d,c){var b=new Array();for(var a=0;a<d.length;a++){if(c!=d[a]){b.push(d[a]);}}return b;}function getArrayIntersection(f,c){var d=new Array();for(var b=0;b<f.length;b++){for(var a=0;a<c.length;a++){if(f[b]==c[a]){d[d.length]=f[b];c[a]=null;break;}}}return d;}function isArray(a){return a instanceof Array||nsapiInstanceOf(a,"Array");}function nsapiEveryElementIs(c,a){if(!isArray(c)){return false;}for(var b=0;b<c.length;++b){if(!a(c[b])){return false;}}return true;}function nsapiMap(d,c){var a=[];for(var b=0;b<d.length;++b){a.push(c(d[b]));}return a;}function nsapiIsSearchFilterExpression(a){return nsapiEveryElementIs(a,nsapiIsSearchFilterTerm);}function nsapiIsFlatSearchFilterList(a){return nsapiEveryElementIs(a,nsapiIsSearchFilterObject);}function nsapiIsSearchFilterTerm(a){if(typeof a==="undefined"||!a){return false;}if(nsapiIsString(a)){return/not|and|or/i.test(a);}if(nsapiIsSearchFilterArray(a)){return true;}return nsapiIsSearchFilterExpression(a);}function nsapiNormalizeFilters(a){return nsapiIsSearchFilter(a)?[a]:(typeof a==="undefined"?null:a);}function nsapiIsSearchFilter(a){return nsapiIsSearchFilterObject(a)||nsapiIsSearchFilterArray(a);}function nsapiIsSearchFilterObject(a){return a instanceof nlobjSearchFilter||nsapiInstanceOf(a,"nlobjSearchFilter");}function nsapiIsSearchFilterArray(a){return isArray(a)&&a.length>=3&&nsapiIsString(a[0])&&nsapiIsString(a[1])&&!/^not$/i.test(a[0]);}function nsapiCheckSearchFilterExpression(a,b){nsapiAssertTrue(a===null||nsapiIsSearchFilterExpression(a),"SSS_INVALID_SRCH_FILTER_EXPR_OBJ_TYPE",b);}function nsapiCheckSearchFilterListOrExpression(a,b){nsapiAssertTrue(a===null||nsapiIsFlatSearchFilterList(a)||nsapiIsSearchFilterExpression(a),"SSS_INVALID_SRCH_FILTER_EXPR_OBJ_TYPE",b);}function format_message(d){var b=format_message.arguments.length;var g=1;if(d.length>=3&&d.substring(0,3)=="@@@"){var c=d.substring(3).split(/\s*\|\|\s*/);var a=0;if(b>=2){a=format_message.arguments[1];if(typeof(a)=="boolean"){a=a?0:1;}else{if(typeof(a)=="string"){a=parseInt(a);}}if(typeof(a)!="number"){a=0;}}if(a>=c.length){a=0;}d=c[a];g=2;}else{if(d.length>=2&&d.substring(0,2)=="@@"){return"?";}}var f=format_message.arguments;if(b==(g+1)&&format_message.arguments[g].constructor==Array){f=format_message.arguments[g];g=0;b=f.length;}return d.replace(/{(?:(\d+)|:)[^}]*}/g,function(h,k){var j=k?(parseInt(k)-1+g):b;return(j<b)?f[j]:"";});}function nlInsertCanvas(b){var a=document.getElementById(getCanvasId(b));if(a==null){a=document.createElement("IFRAME");a.id=getCanvasId(b);a.src="javascript:false";a.scrolling="no";a.style.display="none";a.style.frameBorder="0";if(isIE){a.style.filter="progid:DXImageTransform.Microsoft.Alpha(opacity=0)";}a.style.position="absolute";a.style.top="0px";a.style.left="0px";document.body.appendChild(a);}nlSyncCanvas(b);a.style.display="block";}function nlSyncCanvas(b){var a=document.getElementById(getCanvasId(b));if(a==null){return;}a.style.width=b.offsetWidth;a.style.height=b.offsetHeight;a.style.top=b.style.top;a.style.left=b.style.left;a.style.zIndex=b.style.zIndex-1;}function nlRemoveCanvas(b){var a=document.getElementById(getCanvasId(b));if(a!=null){document.body.removeChild(a);}}function getCanvasId(a){return a.id+"_canvas";}function findClassUp(b,a){while((b!=null)&&(b.className!=a&&b.classAlias!=a)){b=b.parentNode;}return b;}function getScrollLeftOffset(a){var b=0;var c;if(a!=null&&(c=findClassUp(a,"scrollarea"))!=null){b=c.scrollLeft;}else{if((c=document.getElementById("div__body"))!=null){b=c.scrollLeft;}}return b;}function getScrollTopOffset(a){var b=0;var c;if(a!=null&&(c=findClassUp(a,"scrollarea"))!=null){b=c.scrollTop;}else{if((c=document.getElementById("div__body"))!=null){b=c.scrollTop;}}return b;}function removeAllChildren(a){while(a.childNodes[0]){a.removeChild(a.childNodes[0]);}}function StringBuffer(){this.buffer=[];}StringBuffer.prototype.append=function(a){this.buffer.push(a);return this;};StringBuffer.prototype.toString=function(){return this.buffer.join("");};function setObjectOpacity(a,c){var b=c.style;b.opacity=(a/100);b.MozOpacity=(a/100);b.filter="alpha(opacity="+a+")";}function fadeObjectOpacity(f,c,b,a){var d=Math.round(a/100);var g=0;if(c>b){for(i=c;i>=b;i--){setTimeout(function(){setObjectOpacity(i,f);},(g*d));g++;}}else{if(c<b){for(i=c;i<=b;i++){setTimeout(function(){setObjectOpacity(i,f);},(g*d));g++;}}}}function tellafriend(f,c,d,j,g,a,h){var b=escape(c)+",%0d%0a%0d%0a";b+=escape(d)+escape(location.hostname)+".%0d%0a%0d%0a";b+=escape(j)+escape(document.title)+".%0d%0a";b+=escape(g)+escape(h)+"%0d%0a";b+=escape(a)+escape(location.href)+"%0d%0a";location.href="mailto:?subject="+escape(f)+"&body="+b;}function isLeftButtonDown(c){var a=false;var b=getEvent(c);if(isIE&&b.button==1||(!isIE&&b.button==0)){a=true;}return a;}function isRightButtonDown(c){var a=false;var b=getEvent(c);if(b.button==2){a=true;}return a;}function getSelectedTextRange(d){var c;var b;if(document.all){var f=document.selection.createRange();var a=f.duplicate();a.moveToElementText(d);a.setEndPoint("EndToEnd",f);c=a.text.length-f.text.length;b=c+f.text.length;}else{c=d.selectionStart;b=d.selectionEnd;}var a=new Array();a[0]=c;a[1]=b;return a;}function insertTextAtCursor(c,f){c.focus();if(document.all){var d=document.selection.createRange();d.text=f;d.scrollIntoView(true);}else{var b=c.selectionStart;var a=c.selectionEnd;c.value=c.value.substring(0,b)+f+c.value.substring(a);c.selectionEnd=c.selectionStart+f.length;c.selectionStart=c.selectionEnd;}}function setWindowChanged(b,a){b.NS.form.setChanged(a);}function escapeHTML(b){var c=document.createElement("div");var a=document.createTextNode(b);c.appendChild(a);return c.innerHTML;}function escapeHTMLAttr(a){var a=escapeHTML(a);return a.replace(/"/g,"&quot;").replace(/'/g,"&#39;");}function getRuntimeSize(b,a){var c=getRuntimeStyle(b,a);if(!c){return 0;}c=c.replace("px","");if(isNaN(c)){return 0;}return c*1;}function getRuntimeStyle(b,a){var c=null;if(typeof b=="string"){b=document.getElementById(b);}if(b==null){return c;}if(window.getComputedStyle){c=document.defaultView.getComputedStyle(b,null)[a];}else{if(b.currentStyle){c=b.currentStyle[a];}}if(c=="auto"){if(a=="height"){c=b.offsetHeight;}else{if(a=="width"){c=b.offsetWidth;}}}return c;}function camelize(f){var d=f.split("-");var a=d.length;if(a==1){return d[0];}var c=f.charAt(0)=="-"?d[0].charAt(0).toUpperCase()+d[0].substring(1):d[0];for(var b=1;b<a;b++){c+=d[b].charAt(0).toUpperCase()+d[b].substring(1);}return c;}function eval_js(sScript){sScript=sScript.replace(/^\s*<!--[\s\S]*?-->\s*$/gm,"");try{return eval(sScript);}catch(e){if(e instanceof SyntaxError){}}}var slave_machines=new Array();function process_slaving_result(c){var f=c.getBody();var h=f.split("<machine");for(var g=1;g<h.length;g++){var a=h[g].indexOf("name='")+6;var d=h[g].substring(a,h[g].indexOf("'>",a));slave_machines[d]=h[g].substring(h[g].indexOf("'>")+2,h[g].lastIndexOf("</machine>"));}var b=h[0];eval_js(b);slave_machines=new Array();}var process_slaving_result_original=process_slaving_result;var performSlavingAsync=true;function setSlavingAsync(a){performSlavingAsync=a;}function getSlavingAsync(){return performSlavingAsync;}function loadSlavingResults(a,c){var b=process_slaving_result;if(!!c){if(typeof c==="function"){b=function(){process_slaving_result.apply(this,arguments);c.apply(this,arguments);};}else{if(Object.prototype.toString.call(c)==="[object Array]"){b=function(d){var f=0;process_slaving_result.apply(this,arguments);while(f<c.length){c[f++].apply(this,arguments);}};}}}nlXMLRequestURL(a,null,null,b,getSlavingAsync());}function execute_js(a,b){eval_js(a.getBody());if(b){b();}}function NLGetCurrentScriptFileHostName(){var a=document.getElementsByTagName("script");if(!a||a.length==0){return null;}var b=a[a.length-1].src;if(!b){return null;}var c=b.match(/^((http|https):\/\/)?[^\/]+/g);if(c&&c.length>0){c=c[0];}if(!c){c="";}return c;}function NLLoadScriptInScriptTag(c,f,d){if(!d){d=document;}var a=d.getElementById(f);if(!a){var b=d.getElementsByTagName("head")[0];a=d.createElement("script");a.type="text/javascript";b.appendChild(a);}a.src=c;}function loadXMLJSDoc(a,b){nlXMLRequestURL(a,null,null,function(c){execute_js(c,b);},true);}function nlXMLRequestURL(b,c,h,a,f){var g=new NLXMLHttpRequest();if(a instanceof Function){g.setResponseHandler(a);}var d=g.requestURL(b,c,h,f);return d;}function NLXMLHttpRequest(a){this.requestPending=false;this.callbackFunc=null;this.ignoreResponseErrors=a;if(window.XMLHttpRequest){this.xmlrequest=new XMLHttpRequest();}else{try{this.xmlrequest=new ActiveXObject("Msxml2.XMLHTTP.4.0");}catch(b){this.xmlrequest=isOffline()?null:new ActiveXObject("Msxml2.XMLHTTP");}}}NLXMLHttpRequest.prototype.setResponseHandler=function(a){this.callbackFunc=typeof a=="function"?a:null;};NLXMLHttpRequest.prototype.requestURL=function(c,d,g,f,a){if(this.requestPending){return;}this.requestPending=true;var j;if(!isValEmpty(a)){j=a;}else{j=d!=null?"POST":"GET";}this.xmlrequest.open(j,c,(f!=null?f:false));for(var h in g){this.xmlrequest.setRequestHeader(h,g[h]);}this.xmlrequest.setRequestHeader("NSXMLHttpRequest","NSXMLHttpRequest");if(j=="POST"||j=="PUT"){if(d instanceof String||typeof d=="string"||nsInstanceofDocument(d)){this.xmlrequest.setRequestHeader("Content-Type","text/xml; charset=UTF-8");}else{d=formEncodeURLParams(d);this.xmlrequest.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8");}}var b=null;if(f){this.xmlrequest.onreadystatechange=this.handleResponse.bindAsEventListener(this);this.xmlrequest.send(d);}else{this.xmlrequest.send(d);b=this.handleResponse();}return b;};NLXMLHttpRequest.prototype.handleResponse=function(){var d=null;if(this.xmlrequest.readyState==4){var m=this.xmlrequest.status;var c=this.xmlrequest.responseText;var a=new Array();var f=this.xmlrequest.getAllResponseHeaders();f=f.replace(/^\s+/,"").replace(/\s+$/,"").split("\n");for(var g=0;g<f.length;g++){var j=f[g].split(":");var h=j[0];var k=a[h];if(k==null){k=new Array();a[h]=k;}k[k.length]=j[1];}var l=null;if(c!=null&&c.toLowerCase().indexOf("error")>=0){if(c.indexOf("<onlineError>")>=0){var b=nsStringToXML(c);l=new NLXMLResponseError(nsSelectValue(b,"/onlineError/code"),nsSelectValue(b,"/onlineError/detail"),nsSelectValue(b,"/onlineError/id"));}else{if(c.indexOf("<error>")>=0){var b=nsStringToXML(c);l=new NLXMLResponseError(nsSelectValue(b,"/error/code"),nsSelectValue(b,"/error/message"));}else{if(c.indexOf('{"error"')>=0){var b=JSON.parse(c);l=new NLXMLResponseError(b.error.code,b.error.message);}else{if(c.indexOf("error code:")>=0&&c.indexOf("error message:")>=0){var b=c.split("\n");l=new NLXMLResponseError(b[0].substring("error code: ".length),b[1].substring("error message: ".length));}}}}}else{if(m!=200&&m!=206){l=new NLXMLResponseError("SERVER_RESPONSE_ERROR",c);}}try{if(l!=null&&this.callbackFunc==null&&!this.ignoreResponseErrors){throw l;}d=new NLXMLResponse(m,c,a,l);if(this.callbackFunc!=null){this.callbackFunc(d);}}finally{this.requestPending=false;}}return d;};function NLXMLResponse(c,d,b,a){this.code=c;this.body=d;this.headers=b;this.error=a;this.getCode=function(){return this.code;};this.getBody=function(){return this.body;};this.getError=function(){return this.error;};this.getHeaders=function(){return this.headers;};}function NLXMLResponseError(c,a,b){this.id=b;this.code=c;this.details=a;this.getId=function(){return this.id;};this.getCode=function(){return this.code;};this.getDetails=function(){return this.details;};}function nsServerCall(g,f,d,a,c){var b=new NLJsonRpcClient(g);return b.sendRequest(f,d,a,c);}NLJsonRpcClient=function(a){if(a.indexOf("?")>0){a=a+"&jrr=T";}else{a=a+"?jrr=T";}this.serverURL=a;this.responseCallbackMap={};};NLJsonRpcClient.requestId=0;NLJsonRpcClient.prototype={sendRequest:function(k,h,l,b){b=b||"GET";var g={id:NLJsonRpcClient.requestId++,method:"remoteObject."+k,params:h||[]};if(l!=null){this.responseCallbackMap[g.id]=l;}var f=new NLXMLHttpRequest();if(l!=null){f.setResponseHandler(this.handleResponseAsync.bindAsEventListener(this));}var a=this.serverURL;var c=null;if("GET"==b){a+="&jrid="+g.id;a+="&jrmethod="+g.method;if(g.params.length>0){a+="&jrparams="+encode(toJSON(g.params));}}if("POST"==b||("GET"==b&&a.length>2083)){a=this.serverURL;c=toJSON(g);}var d=f.requestURL(a,c,null,l!=null?true:false);if(l==null){var j=this.getJsonRpcResponse(d);if(j.error){throw new NLXMLResponseError(j.error.code,j.error.trace,j.error.msg);}d=j.result;}return d;},getJsonRpcResponse:function(nlXMLResponseObj){var jsonRpcResp=nlXMLResponseObj.getBody();if(jsonRpcResp!=null){jsonRpcResp=jsonRpcResp.replace(/^\s*<!--[\s\S]*?-->\s*$/gm,"");}eval("jsonRpcResp = "+jsonRpcResp+";");return jsonRpcResp;},handleResponseAsync:function(a){var b=this.getJsonRpcResponse(a);var c=this.responseCallbackMap[b.id];this.responseCallbackMap[b.id]=null;c(b.result,b.error);}};Function.prototype.bind=function(b){var a=this;return function(){a.apply(b,arguments);};};Function.prototype.bindAsEventListener=function(b){var a=this;return function(c){a.call(b,c||window.event);};};function isOffline(){return window.isOLC!=null;}function clone(c){if(typeof(c)!="object"){return c;}if(c==null){return c;}var a=new Object();for(var b in c){a[b]=clone(c[b]);}return a;}function hoverEffectOnFocus(a){if(a.parentNode.className.indexOf("_focus")>=0){return;}if(a.parentNode.className.indexOf("_roll")==-1){a.parentNode.className=a.parentNode.className+"_focus";}else{a.parentNode.className=a.parentNode.className.replace("_roll","_focus");}}function hoverEffectOnBlur(a){a.parentNode.className=a.parentNode.className.replace("_focus","");}function leftPadWithWrapping(a,d,c){if(d==null){d="";}if(a==null){a="";}else{a=trim(a);}if(c<=d.length){return d.substring(0,c);}var f=d.length+a.length;if(f<=c){return d+a;}else{var b=a.length-(f-c);return(d+a.substring(0,b))+"\n"+leftPadWithWrapping(a.substring(b),d,c);}}function nlFireEvent(b,c){if(document.createEventObject){var a=document.createEventObject();return b.fireEvent("on"+c,a);}else{var a=document.createEvent("HTMLEvents");a.initEvent(c,true,true);return !b.dispatchEvent(a);}}function getOuterHTML(a){var b;if(!a){return null;}if(a.outerHTML){return a.outerHTML;}b=document.createElement("div");b.appendChild(a.cloneNode(true));return b.innerHTML;}function NLNumberToString(b,c){if(typeof c=="undefined"){c=window;}str=b+"";if(c.groupseparator==""){return str;}parts=str.split(".");integerPart=parts[0];decimalPart=parts.length>1?c.decimalseparator+parts[1]:"";var a=/(\d+)(\d{3})/;while(a.test(integerPart)){integerPart=integerPart.replace(a,"$1"+c.groupseparator+"$2");}if(b<0&&c.negativeprefix!="-"){return c.negativeprefix+integerPart.replace("-","")+decimalPart+c.negativesuffix;}else{return integerPart+decimalPart;}}function NLStringToNumber(f,d){if(isValEmpty(f)){return"";}if(f.indexOf("%")>=0){return NLStringToNumber(f.replace("%",""),d)+"%";}if(window.groupseparator&&window.groupseparator!=""){f=f.replace(new RegExp("\\"+window.groupseparator,"g"),"");}if(window.negativeprefix!="-"&&f.indexOf(window.negativeprefix)==0){f="-"+f.replace(window.negativeprefix,"").replace(window.negativesuffix,"");}if(window.decimalseparator==","){f=f.replace(",",".");}var c=parseFloat(f);if(d){var b=0;var a=f.indexOf(".");if(a!=-1){b=f.length-a-1;}c=c.toFixed(b);}return c;}function NLStringToNormalizedNumberString(b){var a=b.indexOf(window.decimalseparator);return NLStringToNumber(b,a!=-1)+"";}function showField(c,a){var d=document.getElementById(c);display(d,a);if(d!=null){var b=d.parentNode;if(b.nodeName=="LI"||(b.nodeName=="TD"&&b.style.height=="22px")){display(b,a);}}}function display(b,a){if(b!=null){b.style.display=a?"":"none";}}function isNLNumericOrCurrencyFieldRequired(a){var b=getNLNumericOrCurrencyDisplayField(a);if(!b){return false;}return isRequiredFieldClassName(b);}function setNLNumericOrCurrencyFieldRequired(a,c){var b=getNLNumericOrCurrencyDisplayField(a);if(!b){return false;}return doSetRequired(b,a.name,c);}function setRequired(b,f){if(isNLDropDown(b)){getDropdown(b).setRequired(f);}else{if(isNLMultiDropDown(b)){getMultiDropdown(b).setRequired(f);}else{if(window.getHtmlEditor!=null&&getHtmlEditor(b.name)!=null&&getHtmlEditor(b.name).setMandatory){getHtmlEditor(b.name).setMandatory(f);}else{if(b.form!=null&&b.form.elements[b.name+"_display"]!=null){if(typeof b.form.elements[b.name+"_display"].className=="undefined"){b.form.elements[b.name+"_display"].className="";}var c=b.form.elements[b.name+"_display"].className;var a=(getRequired(b)?"inputreq":"input");var d=(f?"inputreq":"input");if(c.indexOf(a)<0){c=d+" "+c;}else{c=c.replace(a,d);}b.form.elements[b.name+"_display"].className=c;setFieldLabelRequired(b.id,f);}else{if(isNumericField(b)||isCurrencyField(b)){return setNLNumericOrCurrencyFieldRequired(b,f);}else{doSetRequired(b,b.id,f);}}}}}}function doSetRequired(c,a,h){if(typeof c.className=="undefined"){c.className="";}var f=c.className;var d=(f.indexOf("inputrt")>=0);var b="input"+(d?"rt":"")+(getRequired(c)?"req":"");var g="input"+(d?"rt":"")+(h?"req":"");if(f.indexOf(b)<0){f=g+" "+f;}else{f=f.replace(b,g);}c.className=f;setFieldLabelRequired(a,h);}function setFieldLabelRequired(a,g,b){if(a){a=a.replace("inpt_","");a=a.replace("hddn_","");a=a.replace("_fs","");var j=document.getElementById(a+"_fs_lbl");if(j){if(j.parentNode&&j.parentNode.firstChild!=j){return;}if(b){var f=getParentElementByTag("form",j);if(f&&f!=b){return;}}var h=j.getElementsByTagName("img");var k;for(var d=0;d<h.length;d++){var c=h[d];if(c.className&&c.className=="required_icon"){k=c;break;}}if(g&&!k){k=document.createElement("img");k.className="required_icon";k.src="/images/chiles/pageTitle/required.png";j.insertBefore(k,j.firstChild);}else{if(!g&&k){j.removeChild(k);}}}}}function getRequired(a){if(isNLDropDown(a)){return getDropdown(a).getRequired();}else{if(isNLMultiDropDown(a)){return getMultiDropdown(a).getRequired();}else{if(window.getHtmlEditor!=null&&getHtmlEditor(a.name)){return getHtmlEditor(a.name).getMandatory();}else{if(a.form!=null&&a.form.elements[a.name+"_display"]!=null){return a.form.elements[a.name+"_display"].className!=null&&a.form.elements[a.name+"_display"].className.indexOf("inputreq")!=-1;}else{if((isNumericField(a)||isCurrencyField(a))&&a.name.indexOf("_formattedValue")==-1){return isNLNumericOrCurrencyFieldRequired(a);}else{return isRequiredFieldClassName(a);}}}}}}function isRequiredFieldClassName(a){return a.className!=null&&(a.className.indexOf("inputreq")!=-1||a.className.indexOf("inputrtreq")!=-1);}function disableSelect(b,c,h){if(b!=null){var k=h!=null?h.document:b.document!=null?b.document:window.document;if(b.type=="select-one"||b.type=="select-multiple"){b.disabled=c;}else{if(isNLDropDown(b)){getDropdown(b,h).setDisabled(c);}else{if(isNLMultiDropDown(b)){getMultiDropdown(b,h).setDisabled(c);}else{var d=b.form.elements[b.name+"_display"];if(d!=null){d.disabled=c;}var g=k.getElementById(b.name+"_popup_list");if(g!=null){g.style.visibility=c?"hidden":"inherit";}var f=k.getElementById(b.name+"_popup_search");if(f!=null){f.style.visibility=c?"hidden":"inherit";}var a=k.getElementById(b.name+"_popup_all");if(a!=null){a.style.visibility=c?"hidden":"inherit";}}}}var l=k.getElementById(b.name+"_popup_new");if(l!=null){l.style.visibility=c?"hidden":"inherit";}var j=k.getElementById(b.name+"_popup_link");if(j!=null){j.style.visibility=c?"hidden":"inherit";}}}function NLHideDiv(b){var a=document.getElementById(b);a.style.display="none";}function NLCreateCookie(c,d,f){var a="";if(f){var b=new Date();b.setTime(b.getTime()+(f*24*60*60*1000));a="; expires="+b.toGMTString();}document.cookie=c+"="+d+a+"; path=/";}	


// /*--------------- Client SuiteScript Implementation ------------*/

// /*--------------- Event Handler implementations for custom code ------------*/
// function nlapiPageInit(type)
// {
// 	var origflag = NS.form.isInited();
// 	try
// 	{
//         NS.form.setInited(true );/* --- set page_init flags so that machine calls function correctly. */
//         window.loadcomplete = true; /* --- mark the window as loadcomplete (originally done in window.setIsInited) - enables nlapiValidateField */
// 		if (document.forms['main_form'].elements.wfPI != null && document.forms['main_form'].elements.wfPI.value.length > 0)
// 		{
// 			nsapiCallScript( "pageInit", "internal", document.forms['main_form'].elements.wfPI.value, [type] );
// 		}
// 		if (document.forms['main_form'].elements.nsapiPI != null && document.forms['main_form'].elements.nsapiPI.value.length > 0)
// 		{
// 			nsapiCallScript( "pageInit", "internal", document.forms['main_form'].elements.nsapiPI.value, [type] );
// 		}
// 		if (document.forms['main_form'].elements.nlapiPI != null && document.forms['main_form'].elements.nlapiPI.value.length > 0)
// 		{
// 			var scripts = document.forms['main_form'].elements.nlapiPI.value.split(String.fromCharCode(1));
// 			for (var i = 0; i < scripts.length; i++)
// 				nsapiCallUserScript( "pageInit", fScriptIds[i], scripts[i], [type] );
// 		}
// 	}
// 	finally	/* restore page_init flags upon completion */
// 	{
//         NS.form.setInited(origflag);
// 	}
// }

// function enableDisabledFields (isValid)
// {
//     if (isValid)  /* if the save is valid, enabled any disabled main form fields prior to returning */
//     {
//         for (var fldnam in nsDisabledFields)
//         {
//             if (nsDisabledFields[fldnam])
//                 disableField(getFormElement(document.forms['main_form'], fldnam), false);
//             nsDisabledFields[fldnam] = false;
//         }
//     }
// }
// function nlapiSaveRecord()
// {
//     var isValid = true;

//     if (document.forms['main_form'].elements.wfSR != null && document.forms['main_form'].elements.wfSR.value.length > 0)
//     {
//         isValid = nsapiCallScript("saveRecord", "internal", document.forms['main_form'].elements.wfSR.value);
//         if (!isValid)
//             return false;
//     }
//     if (document.forms['main_form'].elements.nsapiSR != null && document.forms['main_form'].elements.nsapiSR.value.length > 0)
//     {
//         isValid = nsapiCallScript("saveRecord", "internal", document.forms['main_form'].elements.nsapiSR.value);
//         if (!isValid)
//             return false;
//     }
//     if (document.forms['main_form'].elements.nlapiSR != null && document.forms['main_form'].elements.nlapiSR.value.length > 0)
//     {
//         var scripts = document.forms['main_form'].elements.nlapiSR.value.split(String.fromCharCode(1));
//         for (var i = 0; isValid && i < scripts.length; i++)
//             isValid = nsapiCallUserScript("saveRecord", fScriptIds[i], scripts[i]);
//     }
//     return isValid;
// }

// function nlapiValidateField(type, fldnam, linenum, column, optionswin)
// {
// 	if (!window.loadcomplete || document.page_is_resetting)
// 		return false;
// 	var isValid = true;
//     if (type != null && linenum == null && column == null)
//         linenum = nlapiGetCurrentLineItemIndex(type);
//     var fld = nsapiResolveField(type, fldnam, linenum, column);
//     if (fld == null)  // bail (for now) if the field cannot be found
//         return isValid;
//     if (optionswin != null)
//         optwin = optionswin;
//     var checkValidOrig = fld.checkvalid;
// 	try
// 	{
// 		fld.checkvalid = false;
// 		if (document.forms['main_form'].elements.wfVF != null && document.forms['main_form'].elements.wfVF.value.length > 0)
// 		{
// 			isValid = nsapiCallScript( "validateField", "internal", document.forms['main_form'].elements.wfVF.value, [type, fldnam, linenum, column] );
// 			if (!isValid)
// 				return false;
// 		}
// 		if (document.forms['main_form'].elements.nsapiVF != null && document.forms['main_form'].elements.nsapiVF.value.length > 0)
// 		{
// 			isValid = nsapiCallScript( "validateField", "internal", document.forms['main_form'].elements.nsapiVF.value, [type, fldnam, linenum, column] );
// 			if (!isValid)
// 				return false;
// 		}
// 		if (document.forms['main_form'].elements.nlapiVF != null && document.forms['main_form'].elements.nlapiVF.value.length > 0)
// 		{
// 			var scripts = document.forms['main_form'].elements.nlapiVF.value.split(String.fromCharCode(1));
// 			for (var i = 0; isValid && i < scripts.length; i++)
// 			{
// 				isValid = nsapiCallUserScript( "validateField", fScriptIds[i], scripts[i], [type, fldnam, linenum, column] );
// 			}
// 		}
// 		return isValid;
// 	}
// 	finally
// 	{
// 		optwin = null;
// 		fld.checkvalid = checkValidOrig;
// 		if (!isValid)
// 		{
// 			if (typeof(ftabs) != 'undefined')
// 			{
// 				var tab = ftabs[getFieldName(fldnam)];
// 				if (tab != null && tab != "main" && !isTabShown(tab))
// 					ShowTab(tab,true);
// 			}

//             if (!fld.donotfocus)
//             {
//                 setFieldFocus( fld );
//                 if (fld.select != null)
//                     fld.select();
//             }
// 		}
// 	}
// }
// function nlapiFieldChanged(type, fldnam, linenum, column, optionswin)
// {
//     if (!window.loadcomplete || document.page_is_resetting)
// 		return;
// 	try
// 	{
//         if (type != null && linenum == null && column == null)
//             linenum = nlapiGetCurrentLineItemIndex(type)
//         var fld = nsapiResolveField(type, fldnam, linenum, column);
//         if (fld == null)  // bail (for now) if the field cannot be found
//             return;
//         if (optionswin != null)
// 			optwin = optionswin;

// 		if (document.forms['main_form'].elements.wfFC != null && document.forms['main_form'].elements.wfFC.value.length > 0)
// 		{
// 			nsapiCallScript( "fieldChange", "internal", document.forms['main_form'].elements.wfFC.value, [type, fldnam, linenum, column] )
// 		}
// 		if (document.forms['main_form'].elements.nsapiFC != null && document.forms['main_form'].elements.nsapiFC.value.length > 0)
// 		{
// 			nsapiCallScript( "fieldChange", "internal", document.forms['main_form'].elements.nsapiFC.value, [type, fldnam, linenum, column] )
// 		}
// 		if (document.forms['main_form'].elements.nlapiFC != null && document.forms['main_form'].elements.nlapiFC.value.length > 0)
// 		{
// 			var scripts = document.forms['main_form'].elements.nlapiFC.value.split(String.fromCharCode(1));
// 			for (var i = 0; i < scripts.length; i++)
// 			{
// 				nsapiCallUserScript( "fieldChange", fScriptIds[i], scripts[i], [type, fldnam, linenum, column] );
// 			}
// 		}
// 	}
// 	finally
// 	{
// 		optwin = null;
// 	}
// }
// function nlapiPostSourcing(type, fldnam, linenum)
// {
//     if (!window.loadcomplete || document.page_is_resetting)
//         return;
//     var origflag = NS.form.isInited();
// 	try
// 	{	/* --- set inited flags so that machine calls function correctly. */
//         NS.form.setInited( true );
// 		linenum = type != null && linenum == null ? nlapiGetCurrentLineItemIndex(type) : linenum;
// 		if (document.forms['main_form'].elements.wfPS != null && document.forms['main_form'].elements.wfPS.value.length > 0)
// 		{
// 			nsapiCallScript( "postSourcing", "internal", document.forms['main_form'].elements.wfPS.value, [type, fldnam, linenum] )
// 		}
// 		if (document.forms['main_form'].elements.nsapiPS != null && document.forms['main_form'].elements.nsapiPS.value.length > 0)
// 		{
// 			nsapiCallScript( "postSourcing", "internal", document.forms['main_form'].elements.nsapiPS.value, [type, fldnam, linenum] )
// 		}
// 		if (document.forms['main_form'].elements.nlapiPS != null && document.forms['main_form'].elements.nlapiPS.value.length > 0)
// 		{
// 			var scripts = document.forms['main_form'].elements.nlapiPS.value.split(String.fromCharCode(1));
// 			for (var i = 0; i < scripts.length; i++)
// 			{
// 				nsapiCallUserScript( "postSourcing", fScriptIds[i], scripts[i], [type, fldnam, linenum] );
// 			}
// 		}
// 	}
// 	finally	/* unset page_init flags. */
// 	{
//         NS.form.setInited( origflag );
// 	}

// }
// function nlapiLineInit(type)
// {
// 	try
// 	{
// 		if (document.forms['main_form'].elements.nsapiLI != null && document.forms['main_form'].elements.nsapiLI.value.length > 0)
// 		{
// 			nsapiCallScript( "lineInit", "internal", document.forms['main_form'].elements.nsapiLI.value, [type] )
// 		}
// 		if (document.forms['main_form'].elements.nlapiLI != null && document.forms['main_form'].elements.nlapiLI.value.length > 0)
// 		{
// 			var scripts = document.forms['main_form'].elements.nlapiLI.value.split(String.fromCharCode(1));
// 			for (var i = 0; i < scripts.length; i++)
// 			{
// 				nsapiCallUserScript( "lineInit", fScriptIds[i], scripts[i], [type] );
// 			}
// 		}
// 	}
// 	finally
// 	{
// 		optwin = null;
// 	}
// }
// function nlapiLineCommit(type, linenum)
// {
// 	try
// 	{
// 		if (document.forms['main_form'].elements.nsapiLC != null && document.forms['main_form'].elements.nsapiLC.value.length > 0)
// 		{
// 			nsapiCallScript( "lineCommit", "internal", document.forms['main_form'].elements.nsapiLC.value, [type, linenum] )
// 		}
// 	}
// 	finally
// 	{
//         optwin = null;
// 	}
// }
// function nlapiValidateDelete(type)
// {
// 	try
// 	{
// 		var isValid = true;
// 		if (document.forms['main_form'].elements.nsapiVD != null && document.forms['main_form'].elements.nsapiVD.value.length > 0)
// 		{
// 			isValid = nsapiCallScript( "validateDelete", "internal", document.forms['main_form'].elements.nsapiVD.value, [type] )
// 		}
// 		if (isValid && document.forms['main_form'].elements.nlapiVD != null && document.forms['main_form'].elements.nlapiVD.value.length > 0)
// 		{
// 			var scripts = document.forms['main_form'].elements.nlapiVD.value.split(String.fromCharCode(1));
// 			for (var i = 0; isValid && i < scripts.length; i++)
// 			{
// 				isValid = nsapiCallUserScript("validateDelete", fScriptIds[i], scripts[i], [type]);
// 			}
// 		}
// 		return isValid;
// 	}
// 	finally
// 	{
//         optwin = null;
//     }
// }
// function nlapiValidateInsert(type)
// {
// 	try
// 	{
// 		var isValid = true;
// 		if (document.forms['main_form'].elements.nsapiVI != null && document.forms['main_form'].elements.nsapiVI.value.length > 0)
// 		{
// 			isValid = nsapiCallScript( "validateInsert", "internal", document.forms['main_form'].elements.nsapiVI.value, [type] )
// 		}
// 		if (isValid && document.forms['main_form'].elements.nlapiVI != null && document.forms['main_form'].elements.nlapiVI.value.length > 0)
// 		{
// 			var scripts = document.forms['main_form'].elements.nlapiVI.value.split(String.fromCharCode(1));
// 			for (var i = 0; isValid && i < scripts.length; i++)
// 			{
// 				isValid = nsapiCallUserScript("validateInsert", fScriptIds[i], scripts[i], [type]);
// 			}
// 		}
// 		return isValid;
// 	}
// 	finally
// 	{
// 		optwin = null;
// 	}
// }
// function nlapiValidateLine(type)
// {
// 	try
// 	{
// 		var isValid = true;
// 		if (document.forms['main_form'].elements.nsapiVL != null && document.forms['main_form'].elements.nsapiVL.value.length > 0)
// 		{
// 			isValid = nsapiCallScript("validateLine", "internal", document.forms['main_form'].elements.nsapiVL.value, [type])
// 			if (!isValid)
// 				return false;
// 		}
// 		if (isValid && document.forms['main_form'].elements.nlapiVL != null && document.forms['main_form'].elements.nlapiVL.value.length > 0)
// 		{
// 			var scripts = document.forms['main_form'].elements.nlapiVL.value.split(String.fromCharCode(1));
// 			for (var i = 0; isValid && i < scripts.length; i++)
// 			{
// 				isValid = nsapiCallUserScript("validateLine", fScriptIds[i], scripts[i], [type]);
// 			}
// 		}
// 		return isValid;
// 	}
// 	finally
// 	{
// 		optwin = null;
// 	}
// }
// function nlapiRecalc(type, localRecalc, operation)
// {
// 	try
// 	{
// 		if (localRecalc)
// 		{
// 			eval( isEditMachine(type) ? type+'_machine.recalc(!window.loadcomplete)' : type+'RecalcMachine(true)' )
// 			return;
// 		}
// 		operation = operation != null ? operation : "commit";
// 		if (document.forms['main_form'].elements.nsapiRC != null && document.forms['main_form'].elements.nsapiRC.value.length > 0)
// 		{
// 			nsapiCallScript( "recalc", "internal", document.forms['main_form'].elements.nsapiRC.value, [type, operation] )
// 		}
// 		if (document.forms['main_form'].elements.nlapiRC != null && document.forms['main_form'].elements.nlapiRC.value.length > 0)
// 		{
// 			var scripts = document.forms['main_form'].elements.nlapiRC.value.split(String.fromCharCode(1));
// 			for ( var i = 0; i < scripts.length; i++ )
// 			{
// 				nsapiCallUserScript( "recalc", fScriptIds[i], scripts[i], [type, operation] );
// 			}
// 		}
// 	}
// 	finally
// 	{
// 		optwin = null;
// 	}
// }

// /*--------------- Utility Functions for Setting/Getting/Manipulating fields and machines for current record ------------*/
// function nlapiSetFieldValue(fldnam,value,firefieldchanged,synchronous)
// {
//     nsapiAssertTrue(!isSubrecordField(null, fldnam),  'SSS_INVALID_OPERATION_USING_SUBRECORD_FIELD');
// 	var unsupported = ' applied unapplied total exchangerate lastmodifieddate createddate datecreated roi openingbalance ';
//     if (nsapiIsInternal() || unsupported.indexOf(' '+getFieldName(fldnam)+' ') == -1)
//     {
// 		var stype = typeof(ftypes) != 'undefined' && ftypes[getFieldName(fldnam)] != null ? ftypes[getFieldName(fldnam)] : null;
//         value = process_currency_field_value(value, stype);
// 		var form = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? document.forms[ftabs[getFieldName(fldnam)]+'_form'] : document.forms['main_form'];
//         if (form == null)
//             form = document.forms['qadd_form'];
//         var fld = getFormElement( form, getFieldName(fldnam) );
//         if (fld == null)
//             fld = getFormElement( form, getFieldName(fldnam)+"_send" );
//         if ( fld != null )
//         {
//             try
//             {
// 				if (synchronous)
//                     setSlavingAsync(false)
// 				var ids = '', labels = '';
// 				if ( isPopupSelect( fld ) || isPopupMultiSelect( fld ) || isDisplayOnlySelect( fld ) )
// 				{
// 					var selectmap = NLEntryForm_querySelectText( fldnam, null, null, value )
// 					for ( var i in selectmap )
// 					{
// 						ids = selectmap[i] != null ? (ids != '' ? ids+String.fromCharCode(5) : '') + i : ids;
// 						labels = selectmap[i] != null ? (labels.length > 0 ? labels+String.fromCharCode(5) : '') + selectmap[ i ] : labels;
// 					}
// 				}
// 				else
// 				{
// 					ids = value;
// 					labels = null;
// 				}
// 				setFormValue(fld, ids, labels );
// 				if (document.getElementById(fldnam+"_val") != null)
//                 {
//                     var displayValue = ids;
//                     if (stype == "checkbox")
//                         displayValue = (ids == "T" ? nsYesString : nsNoString);
//                     else if (isNumericField(fld) || isCurrencyField(fld))
//                         displayValue = NLNumberToString(ids);
// 					setInlineTextValue(document.getElementById(fldnam+"_val"), displayValue);
//                 }

//                 if (fld.type != "hidden" && nlapiGetField(fldnam).getType() == "radio")
// 					fld = getSelectedRadio( fld );

//                 if (fld.type == 'textarea' && fld.spellchecker)
//                     fld.spellchecker.initContent();

//                 nsapiFireOnChange(fld,firefieldchanged);
// 			}
//             finally
//             {
//                 setSlavingAsync(true)
//             }
//         }
// 		else if (document.getElementById(fldnam+"_val") != null)	// handle DISPLAYONLY|COMPUTED or inlinehtml fields */
//         {
//             fld = document.getElementById(fldnam+"_val");
//             if (isNumericField(fld) || isCurrencyField(fld))
//                 value = NLNumberToString(value);
// 			setInlineTextValue( fld, value );
//         }
//         else
//         {
//             var subrecordname = fieldtosubrecordmap[fldnam];
//             if (subrecordname != null && subrecordname.length> 0 )
//             {
//                 var subrecordfieldname = eval(subrecordname+'["'+fldnam+'"]');
//                 if ( subrecordfieldname != null && subrecordfieldname.length> 0)
//                 {
//                     var subrecord =  nlapiEditSubrecord(subrecordname);

//                     if (subrecord)
//                     {
//                         subrecord.setFieldValue(subrecordfieldname,value);
//                     }
//                 }
//             }
//         }
//     }
// }
// function nlapiSetSelectValue(fldnam, value, label, firefieldchanged, synchronous)
// {
//     nsapiAssertTrue(!isSubrecordField(null, fldnam),  'SSS_INVALID_OPERATION_USING_SUBRECORD_FIELD');
//     var form = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? document.forms[ftabs[getFieldName(fldnam)]+'_form'] : document.forms['main_form'];
//     var fld = getFormElement( form, getFieldName(fldnam) );
//     if ( fld != null )
//     {
//         try
//         {
//             if (synchronous)
//                 setSlavingAsync(false)
//             setFormValue(fld, value, label );
//             nsapiFireOnChange(fld,firefieldchanged);
//         }
//         finally
//         {
//             setSlavingAsync(true)
//         }
//     }
// }
// function nlapiSetMatrixValue(type, name, column, value, firefieldchanged, synchronous)
// {
//     nsapiAssertTrue(!isSubrecordField(type, name),  'SSS_INVALID_OPERATION_USING_SUBRECORD_FIELD');
//     nsapiCheckArgs( [type, name, column], ['type', 'name', 'column'], 'nlapiSetMatrixValue' );
//     if ( hasEncodedMatrixField(type, name, column) )
//     {
//         var hdr = getFormValue( document.forms['main_form'].elements[type+"header"] )
//         var fld = hdr != null ? getFormElement( nvl(document.forms[type+'_form'],document.forms['main_form']), hdr+column ) : null; // sublist could be hidden
//         if (fld == null)    // send flag only available when sublist is not hidden
//             fld = getFormElement( document.forms[type+'_form'], hdr+column+"_send" );
//         if ( fld != null )
//         {
//             try
//             {
//                 if (synchronous)
//                     setSlavingAsync(false)
//                 setFormValue(fld, value );
//                 nsapiFireOnChange(fld,firefieldchanged);
//             }
//             finally
//             {
//                 setSlavingAsync(true)
//             }
//         }
//     }
// }
// function nlapiSetFieldValues(fldnam,values,firefieldchanged,synchronous)
// {
//     nsapiAssertTrue(!isSubrecordField(null, fldnam),  'SSS_INVALID_OPERATION_USING_SUBRECORD_FIELD');
// 	var fldObj = nlapiGetField(fldnam)
// 	if ( fldObj == null || fldObj.getType() != "multiselect" )
// 		return;

// 	nlapiSetFieldValue(fldnam, values != null ? values.join(String.fromCharCode(5)) : "", firefieldchanged, synchronous);
// }
// function nlapiSetFieldText(fldnam,txt,firefieldchanged,synchronous)
// {
// 	var fldObj = nlapiGetField(fldnam)
// 	if ( fldObj == null || fldObj.getType().indexOf("select") == -1 )
// 		return;

// 	var form = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? document.forms[ftabs[getFieldName(fldnam)]+'_form'] : document.forms['main_form'];
//     var sel = getFormElement( form, getFieldName(fldnam) );
//     if ( isPopupSelect( sel ) ) /* add trailing backslash to query text to facilitate exact-match queries (EQUALS filter versus STARTSWITH) unless the % trailing wildcard is used */
//     {
//         var fld = getFormElement( form, getFieldName(fldnam)+"_display" );
//         var startsWithSearch = !isValEmpty( txt ) && txt.charAt( txt.length - 1 ) == '%';
//         try
//         {   /* strip out user-specified trailing slash or wildcard whenever applicable. */
//             fld.value = startsWithSearch || (!isValEmpty( txt ) && txt.charAt( txt.length - 1 ) == '\\') ? txt.substring(0, txt.length - 1) : txt;
//             NLPopupSelect_setExactMatchQuery( fld, !startsWithSearch );
//             try
//             {
//                 if (synchronous)
//                     setSlavingAsync(false)
//                 nsapiFireOnChange(fld,firefieldchanged);
//             }
//             finally
//             {
//                 setSlavingAsync(true)
//             }
//         }
//         finally
//         {
//             NLPopupSelect_setExactMatchQuery( fld, false );
//         }
//     }
//     else if ( fldObj.getType() == "multiselect" )
// 	{
// 		var ids = [];
// 		var texts = txt != null ? (""+txt).split(String.fromCharCode(5)) : []
// 		for ( var i = 0; i < texts.length; i++ )
// 			ids[i] = getSelectValueForText(sel,texts[i])
// 		nlapiSetFieldValues(fldnam,ids,firefieldchanged,synchronous);
// 	}
//     else if ( fldObj.isHidden() )
// 	{
// 		if ( isValEmpty(txt) )
// 			nlapiSetFieldValue(fldnam,txt,firefieldchanged,synchronous);
// 		else
// 		{
// 			var selectmap = NLEntryForm_querySelectValue( fldnam, null, txt )
// 			nlapiSetFieldValue(fldnam,selectmap != null ? selectmap[txt] : '',firefieldchanged,synchronous);
// 		}
// 	}
//     else
// 	{
// 		nlapiSetFieldValue(fldnam,getSelectValueForText(sel,txt),firefieldchanged,synchronous);
// 	}
// }
// function nlapiSetFieldTexts(fldnam,texts,firefieldchanged,synchronous)
// {
// 	var fldObj = nlapiGetField(fldnam)
// 	if (fldObj == null || fldObj.getType() != "multiselect")
// 		return null;

// 	var form = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? document.forms[ftabs[getFieldName(fldnam)]+'_form'] : document.forms['main_form'];
//     var fld = getFormElement( form, getFieldName(fldnam) );
// 	if ( !isMultiSelect(fld) && !isPopupMultiSelect(fld) )
// 		return;

// 	if ( texts == null || texts.length == 0 )
// 	{
// 		nlapiSetFieldValues(fldnam, [], firefieldchanged, synchronous);
// 	}
// 	else if ( isPopupMultiSelect( fld ) || isDisplayOnlySelect( fld ) )	/* add trailing backslash to query text to facilitate exact-match queries (EQUALS filter versus STARTSWITH) unless the % trailing wildcard is used */
//     {
// 		try
// 		{
// 			if (synchronous)
// 				setSlavingAsync(false)
// 			var ids = '', labels = '';
// 			var selectmap = NLEntryForm_querySelectValue( fldnam, null, texts.join(String.fromCharCode(5)) )
// 			for ( var i in selectmap )
// 			{
// 				ids = selectmap[i] != null ? (ids != '' ? ids+String.fromCharCode(5) : '') + selectmap[ i ] : ids;
// 				labels = selectmap[i] != null ? (labels != '' ? labels+String.fromCharCode(5) : '') + i : labels;
// 			}
// 			setFormValue(fld, ids, labels);
// 			nsapiFireOnChange(fld,firefieldchanged);
// 		}
// 		finally
// 		{
// 			setSlavingAsync(true)
// 		}
// 	}
//     else
// 	{
// 		var ids = [];
// 		for ( var i = 0; i < texts.length; i++ )
// 			ids[i] = getSelectValueForText(fld,texts[i])
// 		nlapiSetFieldValues(fldnam,ids,firefieldchanged,synchronous);
// 	}
// }
// function nlapiGetFieldValue(fldnam)
// {
//     nsapiAssertTrue(!isSubrecordField(null, fldnam),  'SSS_INVALID_OPERATION_USING_SUBRECORD_FIELD');
//     var form = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? document.forms[ftabs[getFieldName(fldnam)]+'_form'] : document.forms['main_form'];
//     if (form == null)
//         form = document.forms['qadd_form'];
// 	var stype = typeof(ftypes) != 'undefined' && ftypes[getFieldName(fldnam)] != null ? ftypes[getFieldName(fldnam)] : null;
// 	var fld = getFormElement( form, getFieldName(fldnam) );
//     if (fld == null)
//         fld = getFormElement( form, getFieldName(fldnam)+"_send" );
// 	var value;
// 	if (fld == null && document.getElementById(fldnam+"_val") != null)
//     {
//         fld = document.getElementById(fldnam+"_val");
// 		value = getInlineTextValue( fld );
//         if (isNumericField(fld) || isCurrencyField(fld))
//             value = NLStringToNumber(value);
//     }
// 	else
// 		value = getFormValue(fld);
// 	return isValEmpty(value) && stype == "checkbox" ? 'F' : value;
// }
// function nlapiGetFieldValues(fldnam)
// {
//     nsapiAssertTrue(!isSubrecordField(null, fldnam),  'SSS_INVALID_OPERATION_USING_SUBRECORD_FIELD');
// 	var fldObj = nlapiGetField(fldnam)
// 	if (fldObj == null || fldObj.getType() != "multiselect")
// 		return null;
//     if (fldObj.isHidden())
//         return nlapiGetFieldValue(fldnam).split(String.fromCharCode(5))
//     var form = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? document.forms[ftabs[getFieldName(fldnam)]+'_form'] : document.forms['main_form'];
//     var fld = getFormElement( form, getFieldName(fldnam) );
//     if (fld == null)
//         fld = getFormElement( form, getFieldName(fldnam)+"_send" );
// 	return isMultiSelect(fld) || isPopupMultiSelect(fld) ? getFormValue(fld, true) : null;
// }
// function nlapiGetFieldTextOrValue(fldnam)
// {
//     var bUseId = false;
//     if (fldnam.indexOf(".") > 0)
//     {
//         fldnam = fldnam.substr(0,fldnam.indexOf("."))
//         bUseId = true;
//     }
//     var fldObj = nlapiGetField(fldnam)
//   	if ( fldObj == null )
//   		return null;
//     else if (bUseId || fldObj.getType().indexOf("select") == -1 )
//         return nlapiGetFieldValue(fldnam)
//     else
//         return nlapiGetFieldText(fldnam);
// }
// function nlapiGetFieldText(fldnam)
// {
// 	var fldObj = nlapiGetField(fldnam)
// 	if ( fldObj == null || fldObj.getType().indexOf("select") == -1 )
// 		return null;
// 	if (document.getElementById(fldnam+"_displayval") != null)
//         return getInlineTextValue(document.getElementById(fldnam+"_displayval"));
//     var form = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? document.forms[ftabs[getFieldName(fldnam)]+'_form'] : document.forms['main_form'];
//     var fld = getFormElement( form, getFieldName(fldnam) );
// 	if (fld != null)
// 	{
//         if (fldObj.isHidden())
//         {
//             var val = nlapiGetFieldValue(fldnam);
//             if (isValEmpty(val))
//                 return "";
//             else
//             {
//                 var labels = NLEntryForm_querySelectText( fldnam, null, null, val )
//                 return labels != null ? labels[val] : "";
//             }
//         }        
//         if (fldObj.getType() == "multiselect")
// 			return getSelectText( fld, true ).join(String.fromCharCode(5))
//         return getSelectText(fld);
// 	}
// 	return null;
// }
// function nlapiGetMatrixValue(type, name, column)
// {
//     nsapiAssertTrue(!isSubrecordField(type, name),  'SSS_INVALID_OPERATION_USING_SUBRECORD_FIELD');
//     nsapiCheckArgs( [type, name, column], ['type', 'name', 'column'], 'nlapiGetMatrixValue' );
//     if ( hasEncodedMatrixField(type, name, column) )
//     {
//         var header = getFormValue( document.forms['main_form'].elements[type+"header"] )
//         if ( header != null )
//             return getFormValue(getFormElement( nvl(document.forms[type+'_form'],document.forms['main_form']), header+column )); // sublist could be hidden
//     }
//     return null;
// }
// function nlapiGetFieldTexts(fldnam)
// {
// 	var fldObj = nlapiGetField(fldnam)
// 	if (fldObj == null || fldObj.getType() != "multiselect")
// 		return null;
//     if (fldObj.isHidden())
//     {
//         var val = nlapiGetFieldValue(fldnam);
//         if (isValEmpty(val))
//             return [];
//         else
//         {
//             var labels = []
//             var query = NLEntryForm_querySelectText(fldnam, null, null, val)
//             for (var i in query)
//                 labels.push(query[i])
//             return labels;
//         }
//     }
//     else if (document.getElementById(fldnam+"_displayval") != null)
// 	{
// 		var x = getInlineTextValue(document.getElementById(fldnam+"_displayval"));
// 		return isValEmpty(x) ? [] : x.split('\n');
// 	}
// 	var form = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? document.forms[ftabs[getFieldName(fldnam)]+'_form'] : document.forms['main_form'];
//     var fld = getFormElement( form, getFieldName(fldnam) );
//     return isMultiSelect(fld) || isPopupMultiSelect(fld) ? getSelectText( fld, true ) : null;
// }
// function nlapiSetCurrentLineItemValues(type,fldnam,values,firefieldchanged,synchronous)
// {
// 	nlapiSetCurrentLineItemValue(type, fldnam, values != null ? values.join(String.fromCharCode(5)) : "", firefieldchanged, synchronous);
// }
// function nlapiSetCurrentLineItemValue(type,fldnam,value,firefieldchanged,synchronous)
// {
//    nsapiAssertTrue(!isSubrecordField(type, fldnam),  'SSS_INVALID_OPERATION_USING_SUBRECORD_FIELD');
//    if (hasEncodedField(type, fldnam))
//    {
//         value = process_currency_field_value(value, getEncodedFieldType(type, fldnam));
// 	    var linenum = isEditMachine(type) ? "" : emptyIfNull(nlapiGetCurrentLineItemIndex(type));
// 	  	var fld = getFormElement( document.forms[type.toLowerCase()+'_form'], getFieldName(fldnam)+linenum );
//         var slavingOrig = getSlavingAsync();
//         try
//         {
//             if (synchronous)
//                 setSlavingAsync(false);
// 			var text = null;
// 			if ( isPopupSelect( fld ) || isPopupMultiSelect( fld ) )
// 			{
// 				var selectmap = NLEntryForm_querySelectText( fldnam, type, linenum, value );
// 				for ( var i in selectmap )
// 				{
// 					text = (text != null ? text+String.fromCharCode(5) : '') + selectmap[ i ];
// 				}
// 			}
// 			setFormValue(fld, value, text );
//             nsapiFireOnChange(fld,firefieldchanged);
//         }
//         finally
//         {
//             setSlavingAsync(slavingOrig);
//         }
//    }
//    else if (hasEncodedField(type, "options"))
//    {
//        if (optwin != null)
//        {
//            var fld = optwin.document.forms[0].elements[getFieldName(fldnam)];
//            setFormValue(fld,value);
//            nsapiFireOnChange(fld,firefieldchanged);
//        }
//        else
//        {
//            var optionsfld = document.forms[type.toLowerCase()+'_form'].options;
//            optionsfld.value = setnamevaluelistvalue(optionsfld.value,fldnam,value);
//            syncnamevaluelist(optionsfld);
//        }
//    }
// }
// function nlapiSetCurrentLineItemSelectValue(type,fldnam,value,label,firefieldchanged,synchronous)
// {
//    nsapiAssertTrue(!isSubrecordField(type, fldnam),  'SSS_INVALID_OPERATION_USING_SUBRECORD_FIELD');
//    if (hasEncodedField(type, fldnam))
//    {
// 	    var linenum = isEditMachine(type) ? "" : emptyIfNull(nlapiGetCurrentLineItemIndex(type));
// 	  	var fld = getFormElement( document.forms[type.toLowerCase()+'_form'], getFieldName(fldnam)+linenum );
//         var slavingOrig = getSlavingAsync();
//         try
//         {
//             if (synchronous)
//                 setSlavingAsync(false);
// 			setFormValue(fld, value, label );
//             nsapiFireOnChange(fld,firefieldchanged);
//         }
//         finally
//         {
//             setSlavingAsync(slavingOrig);
//         }
//    }
// }
// function nlapiSetCurrentLineItemMatrixValue(type,fldnam,column,value,firefieldchanged,synchronous)
// {
//     nsapiAssertTrue(!isSubrecordField(type, fldnam),  'SSS_INVALID_OPERATION_USING_SUBRECORD_FIELD');
//     nsapiCheckArgs( [type, fldnam, column], ['type', 'fldnam', 'column'], 'nlapiSetCurrentLineItemMatrixValue' );
//     if (hasEncodedMatrixField(type, fldnam, column))
//         nlapiSetCurrentLineItemValue( type, getMatrixFieldName(type, fldnam, column), value, firefieldchanged, synchronous )
// }
// function nlapiSetCurrentLineItemText(type,fldnam,txt,firefieldchanged,synchronous)
// {
//     var sel;
//     if (hasEncodedField(type, fldnam))
//         sel = getFormElement( document.forms[type.toLowerCase()+'_form'], getFieldName(fldnam) );
//     else if (optwin != null)
//         sel = optwin.document.forms[0].elements[getFieldName(fldnam)];
//     else
//         return;
//     if ( isPopupSelect( sel ) )	/* add trailing backslash to query text to facilitate exact-match queries (EQUALS filter versus STARTSWITH) unless the % trailing wildcard is used */
//     {
//         var fld = sel.form.elements[getFieldName(fldnam)+"_display"];
// 		var startsWithSearch = !isValEmpty( txt ) && txt.charAt( txt.length - 1 ) == '%';
//         try
//         {   /* strip out user-specified trailing slash or wildcard whenever applicable. */
//             fld.value = startsWithSearch || (!isValEmpty( txt ) && txt.charAt( txt.length - 1 ) == '\\') ? txt.substring(0, txt.length - 1) : txt;
//             NLPopupSelect_setExactMatchQuery( fld, !startsWithSearch );
//             try
//             {
//                 if (synchronous)
//                     setSlavingAsync(false)
//                 nsapiFireOnChange(fld,firefieldchanged);
//             }
//             finally
//             {
//                 setSlavingAsync(true)
//             }
//         }
//         finally
//         {
//             NLPopupSelect_setExactMatchQuery( fld, false );
//         }
//     }
//     else
//         nlapiSetCurrentLineItemValue(type,fldnam,getSelectValueForText(sel,txt),firefieldchanged, synchronous);
// }
// function nlapiGetCurrentLineItemValue(type,fldnam)
// {
//     nsapiAssertTrue(!isSubrecordField(type, fldnam),  'SSS_INVALID_OPERATION_USING_SUBRECORD_FIELD');
// 	if (hasEncodedField(type, fldnam))
// 	{
// 		if ( isEditMachine(type) )
// 			return getFormValue(getFormElement( document.forms[type.toLowerCase()+'_form'], getFieldName(fldnam) ));
// 		else
// 		{
// 			var linenum = nlapiGetCurrentLineItemIndex(type);
// 			if ( getEncodedFieldType(type, fldnam) == "radio" )
// 				return getRadioValue( getFormElement( document.forms[type.toLowerCase()+'_form'], getFieldName(fldnam) ) ) == linenum ? 'T' : 'F';

// 			if (fldnam.indexOf('_display') > 0)
// 			{	// insert the line number into the display field name if it is a popup select or popup multiselect
// 				var hiddenFldName = fldnam.replace('_display','') +  linenum;
// 				var hiddenFld = getFormElement(document.forms[type.toLowerCase()+'_form'],hiddenFldName);
// 				if (isPopupSelect(hiddenFld) || isPopupMultiSelect(hiddenFld))
// 					fldnam = hiddenFldName.toLowerCase() + '_display';
// 				else
// 					fldnam = getFieldName(fldnam)+linenum;
// 			}
// 			else
// 				fldnam = getFieldName(fldnam)+linenum;

// 			return getFormValue(getFormElement( document.forms[type.toLowerCase()+'_form'], fldnam));
// 		}
// 	}
// 	else if (hasEncodedField(type, "options"))
//     {
//         if (optwin != null)
//             return optwin.getFormValue(optwin.document.forms[0].elements[getFieldName(fldnam)]);
//         else
//             return getnamevaluelistvalue(document.forms[type.toLowerCase()+'_form'].options.value,fldnam);
//     }
//     else
//         return null;
// }
// function nlapiGetCurrentLineItemMatrixValue(type,fldnam, column)
// {
//     nsapiAssertTrue(!isSubrecordField(type, fldnam),  'SSS_INVALID_OPERATION_USING_SUBRECORD_FIELD');
//     nsapiCheckArgs( [type, fldnam, column], ['type', 'fldnam', 'column'], 'nlapiGetCurrentLineItemMatrixValue' );
//     if (hasEncodedMatrixField(type, fldnam, column))
//         return nlapiGetCurrentLineItemValue( type, getMatrixFieldName(type, fldnam, column) )
//     else
//         return null;
// }
// function nlapiGetCurrentLineItemText(type,fldnam)
// {
// 	if (hasEncodedField(type, fldnam))
//     {
//         var linenum = isEditMachine(type) ? '' : nlapiGetCurrentLineItemIndex(type);
// 		var fld = getFormElement( document.forms[type.toLowerCase()+'_form'], getFieldName(fldnam)+linenum );
//         if(fld != null)
//         {
//             var fldObj = nlapiGetLineItemField(type, fldnam);
//             if (fldObj !=null && fldObj.getType() == "multiselect")
// 			    return getSelectText( fld, true ).join(String.fromCharCode(5));
//             else
//                 return  getSelectText( fld );
//         }
//         else
//         {
//             return null;
//         }
// 	}
//     else if (hasEncodedField(type, "options"))
//     {
//         if (optwin != null)
//             return optwin.getSelectText(optwin.document.forms[0].elements[getFieldName(fldnam)]);
//         else
//             return getnamevaluelistdisplayvalue(document.forms[type.toLowerCase()+'_form'].options.value,fldnam);
//     }
//     else
//         return null;
// }
// function nlapiGetCurrentLineItemTexts(type, fldnam)
// {
//     var fldObj = nlapiGetLineItemField(type, fldnam);
// 	if (fldObj == null || fldObj.getType() != "multiselect")
// 		return null;
//     if (hasEncodedField(type, fldnam))
//     {
//         var linenum = isEditMachine(type) ? '' : nlapiGetCurrentLineItemIndex(type);
//     	var fld = getFormElement( document.forms[type.toLowerCase()+'_form'], getFieldName(fldnam)+linenum );
//         if(fld != null)
//         {
//             return getSelectText( fld, true );
//         }
//         else
//         {
//             return null;
//         }
//     }
// }
// function nlapiFindLineItemValue(type, fldnam, val)
// {
//     nsapiAssertTrue(!isSubrecordField(type, fldnam),  'SSS_INVALID_OPERATION_USING_SUBRECORD_FIELD');
//     nsapiCheckArgs( [type, fldnam], ['type', 'fldnam'], 'nlapiFindLineItemValue' );
// 	if (hasEncodedField(type, fldnam))
//         return findEncodedValue(type, fldnam, val)
//     return -1;
// }
// function nlapiFindLineItemMatrixValue(type, fldnam, val, column)
// {
//     nsapiAssertTrue(!isSubrecordField(type, fldnam),  'SSS_INVALID_OPERATION_USING_SUBRECORD_FIELD');
//     nsapiCheckArgs( [type, fldnam, column], ['type', 'fldnam', 'column'], 'nlapiFindLineItemMatrixValue' );
//     if (hasEncodedMatrixField(type, fldnam, column))
//         fldnam = getMatrixFieldName(type, fldnam, column);
// 	if (hasEncodedField(type, fldnam))
//         return findEncodedValue(type, fldnam, val)
//     return -1;
// }
// function nlapiSourceField(fldnam, fieldspec)
// {
//     nsapiCheckArgs( [fldnam, fieldspec], ['fldnam', 'fieldspec'], 'nlapiSourceField' );
// 	var fieldspecArg = fieldspec === false ? false : typeof(fieldspec) == "string" ? "'"+fieldspec+"'" : (fieldspec === true ? true : '');
// 	if (eval('typeof(Sync'+fldnam+')') == "function")
//     {
//         var slavingOrig = getSlavingAsync();
//         try
//         {
//             setSlavingAsync(false);
//             eval("Sync"+fldnam+"("+fieldspecArg+")");
//         }
//         finally
//         {
//             setSlavingAsync(slavingOrig);
//         }
//     }
// }
// function nlapiSourceLineItemField(type, fldnam, fieldspec, linenum)
// {
//     var slavingOrig = getSlavingAsync();
//     var linenumArg = isEditMachine( type ) ? "" : ", "+linenum
// 	var fieldspecArg = fieldspec === false ? false : typeof(fieldspec) == "string" ? "'"+fieldspec+"'" : true;
//     try
//     {    
//         setSlavingAsync(false);
//         if (eval('typeof(Sync'+fldnam+type+')') == "function")
//             eval("Sync"+fldnam+type+"("+fieldspecArg+linenumArg+")");
//         else if (eval('typeof(Sync'+fldnam+')') == "function")
//             eval("Sync"+fldnam+"("+fieldspecArg+linenumArg+")");
//     }
//     finally
//     {
//         setSlavingAsync(slavingOrig);
//     }
// }
// function nlapiFireOnChange(fldnam)
// {
// 	var form = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? document.forms[ftabs[getFieldName(fldnam)]+'_form'] : document.forms['main_form'];
// 	var fld = getFormElement( form, getFieldName(fldnam) );
// 	if (fld == null)
// 		fld = getFormElement( form, getFieldName(fldnam)+"_send" );
// 	if ( fld != null )
// 	{
// 		if (nlapiGetField(fldnam).getType() == "radio")
// 			fld = getSelectedRadio( fld );
// 		nsapiFireOnChange(fld, true);
// 	}
// }
// function nlapiFireLineItemOnChange(type, fldnam, linenum)
// {
// 	var form = document.forms[type+'_form'];
// 	var fld = getFormElement( form, getFieldName(fldnam) );
// 	if ( fld != null )
// 	{
// 		linenum = isEditMachine( type ) ? "" : linenum;
// 		if (nlapiGetLineItemField(type, fldnam, linenum).getType() == "radio")
// 			fld = getSelectedRadio( fld );
// 		nsapiFireOnChange(fld, true);
// 	}
// }
// function nlapiSetLineItemValue(type,fldnam,linenum,value)
// {
//     nsapiAssertTrue(!isSubrecordField(type, fldnam),  'SSS_INVALID_OPERATION_USING_SUBRECORD_FIELD');
//     if ( linenum == null || linenum < 0 || linenum > nlapiGetLineItemCount( type ) )   // should throw SSS_INVALID_SUBLIST_OPERATION if not for backward compatibility
//         return;

//     if (nsapiIsInternal() || type != 'item' || /(description|(revrec).+|(custcol).+)/.test(getFieldName(fldnam)))
//     {
//         value = process_currency_field_value(value, getEncodedFieldType(type, fldnam));
//         if (hasEncodedField(type, fldnam))
//         {
// 			setEncodedValue(type.toLowerCase(),linenum,getFieldName(fldnam),value);
// 			if ( isEditMachine(type) )
// 				nsUpdatedMachines[type.toLowerCase()] = 1;
// 			else if ( nsapiGetCurrentSegment(type) == nsapiGetSegmentForLine(type, linenum) )
// 				setFormValues( type, linenum, document.forms[type+'_form'], fldnam );
// 		}
//         else if (hasEncodedField(type, "options"))
//         {
//             setEncodedValue(type.toLowerCase(),linenum,"options",setnamevaluelistvalue(getEncodedValue(type,linenum,"options"),fldnam,value));
//             nsUpdatedMachines[type.toLowerCase()] = 1;
//         }
//     }
// }
// function nlapiSetLineItemMatrixValue(type,fldnam,linenum,column,value)
// {
//     nsapiAssertTrue(!isSubrecordField(type, fldnam),  'SSS_INVALID_OPERATION_USING_SUBRECORD_FIELD');
//     if (hasEncodedMatrixField(type, fldnam, column))
//         nlapiSetLineItemValue(type, getMatrixFieldName(type, fldnam, column), linenum, value)
// }
// function nlapiGetLineItemValue(type,fldnam,linenum)
// {
//     nsapiAssertTrue(!isSubrecordField(type, fldnam),  'SSS_INVALID_OPERATION_USING_SUBRECORD_FIELD');
//     if (hasEncodedField(type, fldnam))
//         return getEncodedValue(type.toLowerCase(),linenum,getFieldName(fldnam));
//     else if (hasEncodedField(type, "options"))
//         return getnamevaluelistvalue(getEncodedValue(type.toLowerCase(),linenum,"options"),fldnam);
//     return null;
// }
// function nlapiGetLineItemMatrixValue(type,fldnam,linenum,column)
// {
//     nsapiAssertTrue(!isSubrecordField(type, fldnam),  'SSS_INVALID_OPERATION_USING_SUBRECORD_FIELD');
//     if (hasEncodedMatrixField(type, fldnam, column))
//         return nlapiGetLineItemValue(type,getMatrixFieldName(type, fldnam, column),linenum);
//     return null;
// }
// function nlapiGetLineItemText(type,fldnam,linenum)
// {
//     var sel = getFormElement( document.forms[type.toLowerCase()+'_form'], getFieldName(fldnam) );
//     if ( linenum != null && !isEditMachine(type) )
//         sel = getFormElement( document.forms[type.toLowerCase()+'_form'], getFieldName(fldnam)+linenum )
//     if ( sel == null )
//         return null;
//     else if (!isNLDropDown(sel) && sel.type == 'hidden')
//         return getEncodedValue(type.toLowerCase(),linenum,getFieldName(fldnam)+"_display");
//     else
//         return getlisttext(sel,getEncodedValue(type.toLowerCase(),linenum,getFieldName(fldnam)));
// }
// function nlapiGetLineItemTexts(type,fldnam,linenum)
// {
//     var fldObj = nlapiGetLineItemField(type, fldnam);
// 	if (fldObj == null || fldObj.getType() != "multiselect")
// 		return null;
//     var value = nlapiGetLineItemText(type, fldnam, linenum);
//     if(value != null)
//         return value.split(String.fromCharCode(5));
//     else
//         return null;
// }
// function nlapiGetCurrentLineItemIndex(type)
// {
//     return getFormValue( getFormElement( document.forms[type.toLowerCase()+"_form"], 'lineindex' ) );
// }
// function nlapiSetLineItemTotal(type,total)
// {
//     var displayTotal = NLNumberToString(total);
// 	if ( hasLineItemGroup(type) && document.getElementById(type+'_total') != null )
// 		document.getElementById(type+'_total').innerHTML = displayTotal;
//     else
//     {
//         if (undefined==window.hiddenLineItemTotal)
//         {
//             window.hiddenLineItemTotal = {};
//         }
//         window.hiddenLineItemTotal[type+'_total'] = displayTotal;
//     }
// }

// function nlapiGetLineItemTotal(type)
// {
// 	var displayTotal = null;
// 	var typeTotal = type + '_total';

// 	if (hasLineItemGroup(type) && document.getElementById(typeTotal) != null)
// 	{
// 		displayTotal = document.getElementById(typeTotal).innerHTML;
// 	}
// 	else if (undefined != window.hiddenLineItemTotal && undefined != window.hiddenLineItemTotal[typeTotal])
// 	{
// 		displayTotal = hiddenLineItemTotal[typeTotal];
// 	}

// 	if (displayTotal.length != null)
// 		return NLStringToNumber(displayTotal);

// 	return null;
// }

// function nlapiGetField(fldnam)
// {
//     if (typeof(ftabs) == 'undefined' && typeof(ftypes) == 'undefined')
//     {
//         // Issue 176123 - Support basic field metadata for the quickadd case
//         var fld = document.getElementById(fldnam + "_fs");
//         var bSelect = (isSelect(fld) || isPopupSelect(fld));// || isMultiSelect(fld) || isPopupMultiSelect(fld));
//         return new nlobjField(getFieldName(fldnam), bSelect ? 'select' : 'text');
//     }
// 	var fldObj = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? new nlobjField(getFieldName(fldnam), ftypes[getFieldName(fldnam)]) : null;
// 	if ( fldObj == null && document.forms['main_form'].elements[fldnam] != null )
// 		fldObj = new nlobjField(getFieldName(fldnam), ftypes[getFieldName(fldnam)] != null ? ftypes[getFieldName(fldnam)] : 'text')
// 	if ( fldObj != null )
// 	{
// 		var fld = getFormElement( document.forms[(ftabs[getFieldName(fldnam)] != null ? ftabs[getFieldName(fldnam)]+'_form' : 'main_form')], getFieldName(fldnam) );
// 		if ( fld != null )
// 		{
//             fldObj.uifield = fld
//             fldObj.noslaving = fld.noslaving;
// 			fldObj.disabled = getFieldDisabled(fld)
// 			fldObj.required = getRequired(fld)
// 			fldObj.readonly = isDisplayOnlyField(fld)
// 			fldObj.hidden = fld.type == 'hidden' && !(isSelect(fld) || isPopupSelect(fld) || isMultiSelect(fld) || isPopupMultiSelect(fld) || isRichTextEditor(fld)
//                     || isFormattedNumericField(fld));
// 			fldObj.label = getLabel( fldnam+'_fs' );
// 			fldObj.popup = isPopupSelect( fld ) || isPopupMultiSelect( fld );
// 			var parent = fparents[getFieldName(fldnam)];
// 			if (!isValEmpty(parent))
// 				fldObj.parent = parent.indexOf(".") != -1 ? nlapiGetLineItemField(parent.substring(0, parent.indexOf(".")), parent.substring(parent.indexOf(".")+1)) : nlapiGetField( parent );
// 		}
// 		else
// 			fldObj = null;
// 	}
// 	return fldObj;
// }

// function isFormattedNumericField(fld)
// {
//     return  (isNumericField(fld) || isCurrencyField(fld)) && getNLNumericOrCurrencyDisplayField(fld) != null;
// }

// function nlapiGetSubList(type)
// {
//     if ( hasLineItemGroup(type) )
//     {
//         var sublistObj = new nlobjSubList(type);
//         return sublistObj;
//     }
//     return null;
// }
// function nlapiGetMatrixField(type, fldnam, column)
// {
//     if (hasEncodedMatrixField(type, fldnam, column))
//     {
//         var hdr = getFormValue( document.forms['main_form'].elements[type+"header"] )
//         var fld = hdr != null ? getFormElement( nvl(document.forms[type+'_form'],document.forms['main_form']), hdr+column ) : null; // sublist could be hidden
//         if ( fld == null )
//             return;

//         var headername = hdr+column;
//         var fldObj = typeof(ftabs) != 'undefined' && ftabs[headername] != null ? new nlobjField(headername, ftypes[headername]) : null;
//         if ( fldObj != null )
//         {
//             var fld = getFormElement( document.forms[type+'_form'], headername );
//             if ( fld != null )
//             {
//                 fldObj.uifield = fld
//                 fldObj.noslaving = fld.noslaving;
//                 fldObj.disabled = getFieldDisabled(fld)
//                 fldObj.required = getRequired(fld)
//                 fldObj.readonly = isDisplayOnlyField(fld)
//                 fldObj.hidden = fld.type == 'hidden' && !(isSelect(fld) || isPopupSelect(fld) || isMultiSelect(fld) || isPopupMultiSelect(fld) || isRichTextEditor(fld))
//                 fldObj.label = getLabel( headername+'_fs' );
//             }
//             else
//                 fldObj = null;
//         }
//         return fldObj;
//     }
//     return null;
// }
// function nlapiGetLineItemField(type, fldnam, linenum)
// {
// 	var fldObj = hasEncodedField(type, fldnam) ? new nlobjField(getFieldName(fldnam), getEncodedFieldType(type, fldnam), type) : null;
// 	if ( fldObj != null )
// 	{
// 		var fld = getFormElement( document.forms[type+'_form'], getFieldName(fldnam)+(linenum != null && !isEditMachine(type) ? linenum : "") );
// 		if ( fld != null )
// 		{
//             if (linenum != null)
//                 fldObj.linenum = linenum;            
//             fldObj.uifield = fld
//             fldObj.noslaving = fld.noslaving;
// 			fldObj.disabled = getFieldDisabled(fld)
// 			fldObj.required = getRequired(fld)
// 			fldObj.readonly = false;
// 			fldObj.hidden = fld.type == 'hidden' && !(isSelect(fld) || isPopupSelect(fld) || isMultiSelect(fld) || isPopupMultiSelect(fld))
// 			fldObj.label = getEncodedFieldLabel(type, fldnam);
// 			fldObj.popup = isPopupSelect( fld ) || isPopupMultiSelect( fld );
// 			var parent = getEncodedFieldParent(type, fldnam);
// 			if (!isValEmpty(parent))
// 				fldObj.parent = parent.indexOf(".") != -1 ? nlapiGetLineItemField(type, parent.substring(parent.indexOf(".")+1), linenum) : nlapiGetField( parent );
// 		}
// 		else
// 			fldObj = null
// 	}
// 	return fldObj;
// }
// function nlapiGetLineItemMatrixField(type, fldnam, column, linenum)
// {
//     if (hasEncodedMatrixField(type, fldnam, column))
//         return nlapiGetLineItemField(type, getMatrixFieldName(type, fldnam, column), linenum != null ? linenum : nlapiGetCurrentLineItemIndex(type))
//     return null;
// }
// function nlapiSetFieldMandatory(fldnam, required)
// {
// 	var form = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? document.forms[ftabs[getFieldName(fldnam)]+'_form'] : document.forms['main_form'];
// 	if ( nsapiIsInternal() || /cust(entity|item|body|column|record|itemnumber|page|event).+/.test(fldnam) )
// 		setRequired(getFormElement( form, getFieldName(fldnam) ), required);
// }
// function nlapiGetFieldMandatory(fldnam)
// {
// 	var form = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? document.forms[ftabs[getFieldName(fldnam)]+'_form'] : document.forms['main_form'];
// 	return getRequired(getFormElement( form, getFieldName(fldnam) ));
// }
// function nlapiSetLineItemMandatory(type, fldnam, required, linenum)
// {
// 	var form = document.forms[type+'_form'];
// 	if ( nsapiIsInternal() || /cust(entity|item|body|column|record|itemnumber|page|event).+/.test(fldnam) )
// 	{
// 		var fld = getFormElement(form,getFieldName(fldnam));
// 		if (fld == null)
// 			fld = getFormElement(form, getFieldName(fldnam)+linenum);
//         if (isEditMachine(type))
//             eval( String(type) + '_machine').setElementRequired(fldnam, required)
//         else
//             setRequired(fld, required);
//     }
// }
// function nlapiGetLineItemMandatory(type, fldnam, linenum)
// {
// 	var form = document.forms[type+'_form'];
// 	var fld = getFormElement(form,getFieldName(fldnam));
// 	if (fld == null)
// 		fld = getFormElement(form, getFieldName(fldnam)+linenum);
// 	return getRequired(fld);
// }
// function nlapiSetFieldDisabled(fldnam,val)
// {
// 	var form = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? document.forms[ftabs[getFieldName(fldnam)]+'_form'] : document.forms['main_form'];
// 	disableField(getFormElement( form, getFieldName(fldnam) ),val);
//     if ( typeof(ftabs) == 'undefined' || ftabs[getFieldName(fldnam)] == null || ftabs[getFieldName(fldnam)] == "main" )
// 		nsDisabledFields[fldnam] = val;
// }
// function nlapiGetFieldDisabled(fldnam)
// {
// 	var form = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? document.forms[ftabs[getFieldName(fldnam)]+'_form'] : document.forms['main_form'];
// 	return getFieldDisabled( getFormElement( form, getFieldName(fldnam) ) );
// }
// function nlapiSetLineItemDisabled(type,fldnam,val, linenum)
// {
// 	var fld = getFormElement( document.forms[type.toLowerCase()+'_form'], getFieldName(fldnam) );
// 	if( fld == null )
// 		fld = getFormElement( document.forms[type.toLowerCase()+'_form'], getFieldName(fldnam)+linenum )
// 	disableField( fld,val);
// }
// function nlapiGetLineItemDisabled(type,fldnam, linenum)
// {
// 	var fld = getFormElement( document.forms[type.toLowerCase()+'_form'], getFieldName(fldnam) );
// 	if( fld == null )
// 		fld = getFormElement( document.forms[type.toLowerCase()+'_form'], getFieldName(fldnam)+linenum )
// 	return getFieldDisabled( fld );
// }
// function nlapiDisableField(fldnam,val)
// {
// 	nlapiSetFieldDisabled(fldnam, val)
// }
// function nlapiDisableLineItemField(type,fldnam,val)
// {
// 	nlapiSetLineItemDisabled(type, fldnam, val)
// }
// function nlapiSetFieldLabel(fldnam, label)
// {
//     nsapiCheckArgs( [fldnam], ['fldnam'], 'nlapiSetFieldLabel' );
//     setLabel( fldnam + "_fs", label )
// }
// function nlapiSetFieldVisibility(fldnam, show)
// {
//     nsapiCheckArgs( [fldnam, show], ['fldnam', 'show'], 'nlapiSetFieldVisibility' );
//     setFieldAndLabelVisibility( fldnam + "_fs", show )
// }
// function nlapiSetFieldDisplay(fldnam, show)
// {
//     nsapiCheckArgs( [fldnam, show], ['fldnam', 'show'], 'nlapiSetFieldDisplay' );
//     showFieldAndLabel( fldnam + "_fs", show )
// }
// function nlapiSetFieldReadOnly(fldnam,val)
// {
// 	var form = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? document.forms[ftabs[getFieldName(fldnam)]+'_form'] : document.forms['main_form'];
//     var fld = getFormElement( form, getFieldName(fldnam) );
//     if (fld != null && fld.type == "textarea")
//         fld.readOnly = val;
// }
// function nlapiGetFieldReadOnly(fldnam)
// {
// 	var form = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? document.forms[ftabs[getFieldName(fldnam)]+'_form'] : document.forms['main_form'];
//     var fld = getFormElement( form, getFieldName(fldnam) );
//     return fld != null && fld.type == "textarea" ? fld.readOnly : false;
// }
// function nlapiSetLineItemDisplay(type, show)
// {
//     nsapiCheckArgs( [type, show], ['type', 'show'], 'nlapiSetLineItemDisplay' );
//     hideMachine(type, !show)
// }
// function nlapiSetLineItemLabel(type, fldnam, label)
// {
//     nsapiCheckArgs( [type, fldnam], ['type', 'fldnam'], 'nlapiSetLineItemLabel' );
//     if ( isEditMachine(type) )
//     {
//         var mch = eval( String(type) + '_machine');
//         mch.setFormElementLabel( fldnam, label );
//     }
// }
// function nlapiGetFieldLabel(fldnam)
// {
//     nsapiCheckArgs( [fldnam], ['fldnam'], 'nlapiGetFieldLabel' );
//     return getLabel( fldnam+"_fs" )
// }
// function nlapiGetLineItemCount(type)
// {
//     return hasLineItemGroup(type) ? getFormValue( getFormElement( document.forms['main_form'], 'next'+type.toLowerCase()+'idx' ) ) - 1 : -1;
// }
// function nlapiGetMatrixCount(type, fldnam)
// {
//     return hasEncodedMatrixField(type, fldnam, 1) ? getFormValue( getFormElement( document.forms['main_form'], type.toLowerCase()+'headercount' ) ) : -1;
// }
// function nlapiGetRecordType()
// {
//     return getFormValue( getFormElement( document.forms['main_form'], 'baserecordtype' ) );
// }
// function nlapiGetRecordId()
// {
//     return getFormValue( getFormElement( document.forms['main_form'], 'id' ) );
// }
// /*--------------- Miscellaneous Utility Functions ------------*/
// function nlapiFormatCurrency(str)
// {
//     return format_currency(str);
// }
// function nlapiStringToDate(str, formattype)
// {
//     if ( isValEmpty(str) )
//         return null;
//     var d = stringtodate( str, window.dateformat, true /* returnNullIfInvalid */, formattype);
//     if ( d == null )
//         d = stringtotime( null, str )
//     return d;
// }
// function nlapiDateToString(d, formattype)
// {
// 	if ( formattype == 'timeofday' )
// 		return gettimestring(d);
// 	else if ( formattype == 'datetime')
//         return getdatetimestring(d);
//     else if ( formattype == 'datetimetz') 
// 		return getdatetimetzstring(d);
// 	else
// 		return getdatestring(d);
// }
// function nlapiAddDays(d, days)
// {
//     return adddays(new Date(d.getTime()), parseInt(days));
// }
// function nlapiAddMonths(d, months)
// {
//     return addmonths(new Date(d.getTime()), parseInt(months));
// }
// function nlapiEncrypt(s, type, key)
// {
// 	nsapiCheckArgs( [s], ['cleartext'], 'nlapiEncrypt' );
//     if (type == null)
//         type = "sha1";
// 	return nsServerCall(nsJSONProxyURL, "encrypt", [s, type, key != null ? key : null]);
// }
// function nlapiDecrypt(s, type, key)
// {
// 	nsapiCheckArgs( [s], ['encryptedtext'], 'nlapiDecrypt' );
// 	if ( type == "aes" || type == "base64" || type == "xor" )
// 		return nsServerCall(nsJSONProxyURL, "decrypt", [s, type, key != null ? key : null]);
// 	return null;
// }
// function nlapiExchangeRate(fromCurrency, toCurrency, effectiveDate)
// {
// 	nsapiCheckArgs( [fromCurrency, toCurrency], ['fromCurrency', 'toCurrency'], 'nlapiExchangeRate' );
//     nsapiCheckUsage( );

//     var rate = nsServerCall(nsJSONProxyURL, "exchangeRate", [fromCurrency, toCurrency, effectiveDate != null ? effectiveDate : nlapiDateToString(new Date())]);
//     nsapiLogUsage("nlapiExchangeRate")
//     return rate;
// }
// function nlapiEscapeXML(text)
// {
//     if ( text == null )
//         return null;
//     text = ""+text;
//     return text.replace( /&/gi, '&amp;' ).replace( /</gi,'&lt;' ).replace( />/gi,'&gt;' ).replace( /'/, '&apos;' ).replace( /"/,'&quot;' );
// }

// function nlapiNanoTime()
// {
//     throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); 
// }

// /*--------------- Custom form portlet functions ------------*/
// function nlapiRefreshPortlet()
// {
//     if (typeof window.nlportlet == 'object' && window.nlportlet.type == 'form')
//         window.nlportlet.refreshfn();
//     else
//         nlapiCreateError('SSS_INVALID_RECORD_TYPE');
// }

// function nlapiResizePortlet()
// {
//     if (typeof window.nlportlet == 'object' && window.nlportlet.type == 'form')
//         nsResizeIframeToContent(window.nlportlet.id);
//     else
//         nlapiCreateError('SSS_INVALID_RECORD_TYPE');
// }
// /*--------------- Miscellaneous machine UI functions ------------*/
// function nlapiRefreshLineItems(type)
// {
//     if (isEditMachine(type))
//     {
//         var isInternal = nsapiIsInternal();
//         var slavingOrig = getSlavingAsync();
//         try
//         {
//             setSlavingAsync(false);
//             nsapiSetIsInternal(true);
//             nsapiCallScript( "refreshLineItem", "internal", type+'_machine.setMachineIndex( '+(getLineCount(type)+1)+' ); '+type+'_machine.buildtable()' );
//         }
//         finally
//         {
//             setSlavingAsync(slavingOrig);
//             nsapiSetIsInternal(isInternal);
//         }
//     }
//     else if (!hasLineItemGroup(type))	/* true for readonly sublists */
// 		nsapiCallScript( "refreshLineItem", "internal", 'refreshmachine("'+ type+'" )' );
// }
// function nlapiSelectLineItem(type, linenum, allowsegmentchange)
// {
//     var isInternal = nsapiIsInternal();
//     var slavingOrig = getSlavingAsync();
// 	try
// 	{
// 		setSlavingAsync(false);
//         nsapiSetIsInternal(true);
// 		if (allowsegmentchange == true)
// 			nsapiSelectSegmentForLine(type, linenum);
// 		if (hasMachine(type))
// 			nsapiCallScript( "selectLineItem", "internal", type+'_machine.viewline('+linenum+')' );
// 		else if (hasLineItemGroup(type))
// 			nsapiCallScript( "selectLineItem", "internal", 'setFormValue( document.forms["'+ type+'_form"].elements["lineindex"], '+linenum+' )' );
// 	}
// 	finally
// 	{
// 		setSlavingAsync(slavingOrig);
//         nsapiSetIsInternal(isInternal);
//     }
// }
// function nlapiCommitLineItem(type)
// {
//     var isInternal = nsapiIsInternal();
//     var slavingOrig = getSlavingAsync();
//     try
//     {
//         setSlavingAsync(false);
//         nsapiSetIsInternal(true);
// 		if (isEditMachine(type))
// 			nsapiCallScript( "commitLineItem", "internal", type+'_machine.addline()' );
// 		else if ( hasLineItemGroup(type) )
// 			nsapiCallScript( "commitLineItem", "internal", 'setEncodedValues( "'+ type+'", nlapiGetCurrentLineItemIndex("'+ type+'") )' );
//     }
//     finally
//     {
//         setSlavingAsync(slavingOrig);
//         nsapiSetIsInternal(isInternal);
//     }
// }
// function nlapiInsertLineItem(type, line)
// {
//     if (line != undefined)
//     {
//         nlapiSelectLineItem(type, line);
//     }
//     var isInternal = nsapiIsInternal();
//     var slavingOrig = getSlavingAsync();
//     try
//     {
//         setSlavingAsync(false);
//         nsapiSetIsInternal(true);
// 		if (isEditMachine(type))
// 			nsapiCallScript( "insertLineItem", "internal", type+'_machine.insertline()' );
//     }
//     finally
//     {
//         setSlavingAsync(slavingOrig);
//         nsapiSetIsInternal(isInternal);
//     }
// }
// function nlapiRemoveLineItem(type, line)
// {
//     if (line != undefined)
//     {
//         nlapiSelectLineItem(type, line);
//     }
//     var isInternal = nsapiIsInternal();
//     var slavingOrig = getSlavingAsync();
//     var origflag = NS.form.isInited();
//     try
//     {
//         NS.form.setInited(true );
//         setSlavingAsync(false);
//         nsapiSetIsInternal(true);
//         if (isEditMachine(type))
// 			nsapiCallScript( "deleteLineItem", "internal", type+'_machine.deleteline()' );
//     }
//     finally
//     {
//         NS.form.setInited(origflag);
//         setSlavingAsync(slavingOrig);
//         nsapiSetIsInternal(isInternal);
//     }
// }
// function nlapiCancelLineItem(type)
// {
//     var isInternal = nsapiIsInternal();
//     var slavingOrig = getSlavingAsync();
//     try
//     {
//         setSlavingAsync(false);
//         nsapiSetIsInternal(true);
// 		if (isEditMachine(type))
// 			nsapiCallScript( "cancelLineItem", "internal", type+'_machine.clearline()' );
//     }
//     finally
//     {
//         setSlavingAsync(slavingOrig);
//         nsapiSetIsInternal(isInternal);
//     }
// }
// function nlapiSelectNewLineItem(type)
// {
//     var isInternal = nsapiIsInternal();
//     var slavingOrig = getSlavingAsync();
//     try
//     {
//         setSlavingAsync(false);
//         nsapiSetIsInternal(true);
// 		if (isEditMachine(type))
// 			nsapiCallScript( "selectNewLineItem", "internal", type+'_machine.clearline()' );
//     }
//     finally
//     {
//         setSlavingAsync(slavingOrig);
//         nsapiSetIsInternal(isInternal);
//     }
// }
// function nlapiIsLineItemChanged(type)
// {
// 	return isMachineChanged(type);
// }
// /*--------------- Miscellaneous dropdown UI functions (only valid on UI Builder fields) ------------*/
// function nlapiInsertOption(fldnam, value, text, selected) { nlapiInsertSelectOption(fldnam, value, text, selected) }
// function nlapiInsertSelectOption(fldnam, value, text, selected)
// {
//     nsapiAssertTrue( fldnam != null && fldnam.indexOf('custpage') == 0, 'SSS_INVALID_OPERATION' );
//     var form = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? document.forms[ftabs[getFieldName(fldnam)]+'_form'] : document.forms[0];
//     var fld = getFormElement( form, getFieldName(fldnam) );
//     if (fld != null)
//         addSelectOption( document, fld, text, value, selected )
// }
// function nlapiInsertLineItemOption(type, fldnam, value, text, selected)
// {
//     nsapiAssertTrue( type != null && fldnam != null && fldnam.indexOf('custpage') == 0, 'SSS_INVALID_OPERATION' );
//     var form = document.forms[type+'_form'];
//     var fld = getFormElement( form, getFieldName(fldnam) );
//     if (fld != null)
//         addSelectOption( document, fld, text, value, selected )
// }
// function nlapiRemoveOption(fldnam, value, text) { nlapiRemoveSelectOption(fldnam, value, text) }
// function nlapiRemoveSelectOption(fldnam, value)
// {
//     nsapiAssertTrue( fldnam != null && fldnam.indexOf('custpage') == 0, 'SSS_INVALID_OPERATION' );
//     var form = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? document.forms[ftabs[getFieldName(fldnam)]+'_form'] : document.forms[0];
//     var fld = getFormElement( form, getFieldName(fldnam) );
//     if (fld != null)
//         eval( value != null ? 'deleteOneSelectOption( fld, value )' : 'deleteAllSelectOptions( fld, window )' )
// }
// function nlapiRemoveLineItemOption(type, fldnam, value)
// {
//     nsapiAssertTrue( type != null && fldnam != null && fldnam.indexOf('custpage') == 0, 'SSS_INVALID_OPERATION' );
//     var form = document.forms[type+'_form'];
//     var fld = getFormElement( form, getFieldName(fldnam) );
//     if (fld != null)
//         eval( value != null ? 'deleteOneSelectOption( fld, value )' : 'deleteAllSelectOptions( fld, window )' )
// }
// /*--------------- Helper Functions for obtaining current user information ------------*/
// function nlapiGetUser()
// {
//     return nlapiGetFieldValue('nluser');
// }
// function nlapiGetRole()
// {
//     return nlapiGetFieldValue('nlrole');
// }
// function nlapiGetDepartment()
// {
//     return nlapiGetFieldValue('nldept');
// }
// function nlapiGetLocation()
// {
//     return nlapiGetFieldValue('nlloc');
// }
// function nlapiGetSubsidiary()
// {
//     return nlapiGetFieldValue('nlsub');
// }

// /*---------------------------------------- Custom Code API Extensions -------------------------------------*/

// /*--------------- instantiate an existing nlobjRecord from the server ------------*/
// function nlapiLoadRecord(type, id, initializeDefaults)
// {
// 	nsapiCheckArgs( [type, id], ['type', 'id'], 'nlapiLoadRecord' );
// 	nsapiCheckType( type, 'nlapiLoadRecord', true );
//     nsapiCheckUsage( );
//     if (initializeDefaults != null)
//         for (var field in initializeDefaults)
//             nsapiAssertTrue(arrayContains(nsapiGetRecord( type ).initializedefaults, field), 'SSS_INVALID_INITIALIZE_DEFAULT_VALUE' );
//     try
//     {
//         var nsPayload = nsStringToXML("<nlapiRequest type='nlapiLoadRecord'></nlapiRequest>");
//         var nlapiRequest = nsPayload.documentElement;
//         nlapiRequest.setAttribute('id', id);
//         nlapiRequest.setAttribute('recordType', type);
//         if (initializeDefaults != null)
//         {
//             var nsLoadParams = nsSetChildValue( nlapiRequest, "loadParams" );
//             for (var defaultValue in initializeDefaults)
//                 nsSetChildValue(nsLoadParams, nsapiModifyLoadArg(defaultValue), initializeDefaults[defaultValue])
//         }

//         var payload = nsXmlToString( nsPayload );
//         var request = new NLXMLHttpRequest();
//         var response = request.requestURL( nsProxyURL, payload )

// 		var nsResponse = nsStringToXML( response.getBody() );
// 		var nsResponseRecord = nsSelectNode( nsResponse, "/nlapiResponse/record" );
// 		var nsRecord = nsapiExtractRecord( nsResponseRecord );
//         nsRecord.logOperation("loadRecord", {"id" : id, "initializeDefaults" : initializeDefaults})
//         nsapiAssertTrue( type.toLowerCase() == nsRecord.getRecordType().toLowerCase() ||
// 						(type.toLowerCase() == 'assemblyitem' && /.*assemblyitem/.test(nsRecord.getRecordType().toLowerCase())) ||
// 						(type.toLowerCase() == 'inventoryitem' && /.*inventoryitem/.test(nsRecord.getRecordType().toLowerCase())) ||
//                        	(type.toLowerCase() == 'customer' && /(prospect|lead|customer)/.test(nsRecord.getRecordType().toLowerCase())), 'SSS_RECORD_TYPE_MISMATCH' );
// 		nsapiLogUsage( 'nlapiLoadRecord', type )
//         return nsRecord;
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /* ----------------- instantiate an nlobjRecord with default values filled in -----*/
// function nlapiCreateRecord(type, initializeDefaults)
// {
//     nsapiCheckArgs( [type], ['type'], 'nlapiCreateRecord' );
//     nsapiCheckType( type, 'nlapiCreateRecord', true );
// 	nsapiCheckUsage( );
// 	if (initializeDefaults != null)
// 		for (var field in initializeDefaults)
// 			nsapiAssertTrue(arrayContains(nsapiGetRecord( type ).initializedefaults, field), 'SSS_INVALID_INITIALIZE_DEFAULT_VALUE' );
//     try
//     {
//         var nsPayload = nsStringToXML("<nlapiRequest type='nlapiCreateRecord'></nlapiRequest>");
//         var nlapiRequest = nsPayload.documentElement;
//         nlapiRequest.setAttribute('recordType', type);
//         if (initializeDefaults != null)
//         {
//             var nsLoadParams = nsSetChildValue( nlapiRequest, "loadParams" );
//             for (var defaultValue in initializeDefaults)
//                 nsSetChildValue(nsLoadParams, nsapiModifyLoadArg(defaultValue), initializeDefaults[defaultValue])
//         }

//         var payload = nsXmlToString( nsPayload );
//         var request = new NLXMLHttpRequest();
//         var response = request.requestURL( nsProxyURL, payload )

// 		var nsResponse = nsStringToXML( response.getBody() );
// 		var nsResponseRecord = nsSelectNode( nsResponse, "/nlapiResponse/record" );
// 		var nsRecord = nsapiExtractRecord( nsResponseRecord );
//         nsRecord.logOperation("createRecord", {"initializeDefaults" : initializeDefaults})
//         nsapiAssertTrue( type.toLowerCase() == nsRecord.getRecordType().toLowerCase(), 'SSS_RECORD_TYPE_MISMATCH' );
// 		nsapiLogUsage( 'nlapiCreateRecord', type )
//         return nsRecord;
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /*--------------- clone and return an existing nlobjRecord from the server. ------------*/
// function nlapiCopyRecord(type, id, initializeDefaults)
// {
// 	nsapiCheckArgs( [type, id], ['type', 'id'], 'nlapiCopyRecord' );
// 	nsapiCheckType( type, 'nlapiCopyRecord', true );
// 	nsapiCheckUsage( );
//     if (initializeDefaults != null)
//         for (var field in initializeDefaults)
//             nsapiAssertTrue(arrayContains(nsapiGetRecord(type).initializedefaults, field), 'SSS_INVALID_INITIALIZE_DEFAULT_VALUE' );
//     try
//     {
//         var nsPayload = nsStringToXML("<nlapiRequest type='nlapiCopyRecord'></nlapiRequest>");
//         var nlapiRequest = nsPayload.documentElement;
//         nlapiRequest.setAttribute('id', id);
//         nlapiRequest.setAttribute('recordType', type);
//         if (initializeDefaults != null)
//         {
//             var nsLoadParams = nsSetChildValue( nlapiRequest, "loadParams" );
//             for (var defaultValue in initializeDefaults)
//                 nsSetChildValue(nsLoadParams, nsapiModifyLoadArg(defaultValue), initializeDefaults[defaultValue])
//         }

//         var payload = nsXmlToString( nsPayload );
//         var request = new NLXMLHttpRequest();
//         var response = request.requestURL( nsProxyURL, payload )

// 		var nsResponse = nsStringToXML( response.getBody() );
// 		var nsResponseRecord = nsSelectNode( nsResponse, "/nlapiResponse/record" );
// 		var nsRecord = nsapiExtractRecord( nsResponseRecord );
//         nsRecord.logOperation("copyRecord", {"id" : id, "initializeDefaults" : initializeDefaults})
//         nsapiAssertTrue( type.toLowerCase() == nsRecord.getRecordType().toLowerCase() || (type.toLowerCase() == 'customer' && /(prospect|lead|customer)/.test(nsRecord.getRecordType().toLowerCase())), 'SSS_RECORD_TYPE_MISMATCH' );
// 		nsapiLogUsage( 'nlapiCopyRecord', type )
//         return nsRecord;
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }                                                                 
// }
// /* ----- transform a record into another type (i.e. salesorder -> invoice -or- opportunity -> estimate) -----*/
// function nlapiTransformRecord(type, id, transformType, transformValues)
// {
// 	nsapiCheckArgs( [type, id, transformType], ['type', 'id', 'transformType'], 'nlapiTransformRecord' );
// 	nsapiCheckType( type, 'nlapiTransformRecord', true );
// 	nsapiCheckUsage( );

//     nsapiAssertTrue(arrayContains(nsapiGetRecord( type ).transformtypes, transformType), 'SSS_INVALID_TRANSFORM_TYPE' );
//     if (transformValues != null)
//         for (var field in transformValues)
//             nsapiAssertTrue(arrayContains(nsapiGetRecord( transformType ).transformdefaults, field), 'SSS_INVALID_TRANSFORM_DEFAULT_VALUE' );
//     try
//     {
//         var nsPayload = nsStringToXML("<nlapiRequest type='nlapiTransformRecord'></nlapiRequest>");
//         var nlapiRequest = nsPayload.documentElement;
//         nlapiRequest.setAttribute('id', id);
//         nlapiRequest.setAttribute('recordType', type);
//         nlapiRequest.setAttribute('transformType', transformType);
//         if (transformValues != null)
//         {
//             var nsLoadParams = nsSetChildValue( nlapiRequest, "loadParams" );
//             for (var defaultValue in transformValues)
//                 nsSetChildValue(nsLoadParams, nsapiModifyLoadArg(defaultValue), transformValues[defaultValue])
//         }

//         var payload = nsXmlToString( nsPayload );
//         var request = new NLXMLHttpRequest();
//         var response = request.requestURL( nsProxyURL, payload )

// 		var nsResponse = nsStringToXML( response.getBody() );
// 		var nsResponseRecord = nsSelectNode( nsResponse, "/nlapiResponse/record" );
// 		var nsRecord = nsapiExtractRecord( nsResponseRecord );
//         nsRecord.logOperation("transformRecord", {"type" : type, "id" : id, "transformType" : transformType, "transformDefaults" : transformValues})
//         nsapiAssertTrue( transformType.toLowerCase() == nsRecord.getRecordType().toLowerCase(), 'SSS_RECORD_TYPE_MISMATCH' );
// 		nsapiLogUsage( 'nlapiTransformRecord', transformType )
//         return nsRecord;
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /* ----- commit changes to an nlobjRecord into the system -----*/
// function nlapiSubmitRecord(record, options, ignoreMandatoryFields)
// {
// 	nsapiCheckArgs( [record], ['record'], 'nlapiSubmitRecord' );
// 	nsapiCheckUsage( );

//     if (!(record instanceof nlobjRecord))
// 		throw nlapiCreateError( 'SSS_INVALID_RECORD_OBJ', 'The record is not a valid object.' );
// 	try
//     {
// 		var nsPayload = nsStringToXML("<nlapiRequest type='nlapiSubmitRecord'></nlapiRequest>");
// 		var nlapiRequest = nsPayload.documentElement;
// 		nlapiRequest.setAttribute('enableSourcing', ""+(options === true || (options != null && options.enableSourcing === true) ? true : false));
// 		nlapiRequest.setAttribute('disableTriggers', ""+(options != null && options.disableTriggers === true ? true : false));
//         nlapiRequest.setAttribute('ignoreMandatoryFields', ""+(ignoreMandatoryFields === true || (options != null && options.ignoreMandatoryFields === true) ? true : false) );

//         var nsRecord = nsapiSerializeRecord( record );
//         nlapiRequest.appendChild( nsRecord.documentElement.cloneNode( true ) );

//         var payload = nsXmlToString( nsPayload );
// 		var request = new NLXMLHttpRequest();
// 		var response = request.requestURL( nsProxyURL, payload )

// 		var nsResponse = nsStringToXML( response.getBody() );
// 		var sKey = nsSelectValue( nsResponse, "/nlapiResponse/id" );
// 		nsapiLogUsage( 'nlapiSubmitRecord', record.getRecordType() )
//         return sKey;
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /* ----- commit record field updates to the system -----*/
// function nlapiSubmitField(type, id, fields, values, options)
// {
//     nsapiCheckArgs( [type, id, fields], ['type', 'id', 'fields'], 'nlapiSubmitField' );
//     nsapiCheckType( type, 'nlapiSubmitField' );
// 	nsapiCheckUsage( );

//     try
//     {
//         var nsPayload = nsStringToXML("<nlapiRequest type='nlapiSubmitField'></nlapiRequest>");
//         var nlapiRequest = nsPayload.documentElement;
//         nlapiRequest.setAttribute('recordType', type );
//         nlapiRequest.setAttribute('id', id );
//         nlapiRequest.setAttribute('enableSourcing', ""+(options === true || (options != null && options.enableSourcing === true) ? true : false));
//         nlapiRequest.setAttribute('disableTriggers', ""+(options != null && options.disableTriggers === true ? true : false));
// 		/* add fields. */
//         if (fields instanceof String || typeof(fields) == 'string')
//         {
//             var nsField = nsSetChildValue( nlapiRequest, "field" );
//             nsSetChildValue( nsField, "name", fields );
//             nsSetChildValue( nsField, "value", values );
//         }
//         else
//         {
// 			for (var i = 0; fields != null && i < fields.length; i++)
//             {
//                 var nsField = nsSetChildValue( nlapiRequest, "field" );
//                 nsSetChildValue( nsField, "name", fields[i] );
//                 nsSetChildValue( nsField, "value", values != null ? values[i] : null );
//             }
//         }

// 		var payload = nsXmlToString( nsPayload );
// 		var request = new NLXMLHttpRequest();
// 		var response = request.requestURL( nsProxyURL, payload );
// 		nsapiLogUsage( 'nlapiSubmitField', type )
// 	}
//     catch( e )
//     {
// 		throw nlapiCreateError( e );
// 	}
// }

// /* ----- delete an nlobjRecord -----*/
// function nlapiDeleteRecord(type, id)
// {
// 	nsapiCheckArgs( [type, id], ['type', 'id'], 'nlapiDeleteRecord' );
// 	nsapiCheckType( type, 'nlapiDeleteRecord', true );
// 	nsapiCheckUsage( );
//     try
//     {
// 		nsServerCall(nsJSONProxyURL, "deleteRecord", [type, id]);
// 		nsapiLogUsage( 'nlapiDeleteRecord', type )
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /* ----- get search columns for a particular search type -----*/
// function nlapiGetSearchColumns(type, filter, op)
// {
// 	nsapiCheckArgs( [type], ['type'], 'nlapiGetSearchColumns' );
// 	nsapiCheckType( type, 'nlapiGetSearchColumns' );

// 	try
//     {
//         var rawResults = nsServerCall( nsJSONProxyURL, 'getSearchColumns', [type, filter, op]);
//         var results = new Array();
//         for ( var i = 0; rawResults != null && i < rawResults.length; i++ )
//         {
//             var columnObject = nsapiUnmarshalSearchColumn(rawResults[i]);
//             results.push(columnObject);
//         }
//         return results.length == 0 ? null : results;
//     }
//     catch( e )
//     {
// 		throw nlapiCreateError( e );
//     }
// }
// function nsapiUnmarshalSearchFilter(filterMap)
// {
//     var filter = new nlobjSearchFilter(filterMap.name, filterMap.join, filterMap.operator, filterMap.values);
//     filter.formula = filterMap.formula;
//     filter.summarytype = filterMap.summarytype;
//     filter.isor = filterMap.isor;
//     filter.isnot = filterMap.isnot;
//     filter.leftparens = filterMap.leftparens;
//     filter.rightparens = filterMap.rightparens;
//     return filter;
// }
// function nsapiUnmarshalSearchColumn(columnMap)
// {
//     var col = new nlobjSearchColumn(columnMap.name, columnMap.join, columnMap.summary);
// 	col.label = columnMap.label;
// 	col.type = columnMap.type;
// 	col.functionid = columnMap.functionid;
// 	col.formula = columnMap.formula;
// 	col.sortdir = columnMap.sortdir;
// 	col.whenorderedby = columnMap.whenorderedby;
// 	col.whenorderedbyjoin = columnMap.whenorderedbyjoin;
//     return col;
// }
// /* ----- perform a record search and return an Array of nlobjSearchResult objects -----*/
// function nlapiSearchRecord(type, id, filtersOrExpression, columns)
// {
// 	if (type)
// 	{
// 		nsapiCheckType( type, 'nlapiSearchRecord' );
// 	}
// 	nsapiCheckUsage( );

// 	id = id != null && !isNaN(parseInt( id )) ? parseInt( id ) : id != null ? id : null;
//     try
//     {
// 		var rawFilters = nsapiMarshalSearchFiltersOrExpression(nsapiNormalizeFilters(filtersOrExpression));
// 		var rawColumns = nsapiMarshalSearchColumns(columns);
// 		var rawResults = nsServerCall( nsJSONProxyURL, 'searchRecord', [type, id, rawFilters, rawColumns], null, 'POST');
// 		var rowResults = nsapiExtractSearchResults( rawResults, columns );

// 		nsapiLogUsage( 'nlapiSearchRecord', isValEmpty(id) && nsapiIsLookup(filtersOrExpression) ? type : null );
// 		return rowResults != null && rowResults.length > 0 ? rowResults : null;
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /* ----- factory method: create a new ad-hoc search (client suite script implementation) -----*/
// function nlapiCreateSearch(type, filtersOrExpression, columns)
// {
//     nsapiCheckArgs( [type], ['type'], 'nlapiCreateSearch' );
// 	nsapiCheckType( type, 'nlapiCreateSearch' );
// 	nsapiCheckUsage( );
// 	filtersOrExpression = nsapiNormalizeFilters(filtersOrExpression);
// 	var filters = nsapiParseSearchFilterExpression(filtersOrExpression);
//     return new nlobjSearch(type, -1, filters, columns);
// }
// /* ----- factory method: load an existing saved search (client suite script implementation) -----*/
// function nlapiLoadSearch(type, id)
// {
//     nsapiCheckArgs( [id], ['id'], 'nlapiLoadSearch' );
//     if (type)
//     {
//         nsapiCheckType( type, 'nlapiLoadSearch' );
//     }
// 	nsapiCheckUsage( );
//     id = id != null && !isNaN(parseInt( id )) ? parseInt( id ) : id != null ? id : null;
//     var search = new nlobjSearch(type, id, null, null);
//     search._load();
//     return search;
// }
// /* ----- private search code (client suite script implementation) -----*/
// function nsapiParseSearchFilterExpression(filterExpression)
// {
// 	if (nsapiIsFlatSearchFilterList(filterExpression))
// 		return filterExpression;
// 	nsapiCheckSearchFilterExpression(filterExpression, 'filters');
// 	var marshaled = nsapiMarshalSearchFiltersOrExpression(filterExpression);
// 	var payloadMap = nsServerCall(nsJSONProxyURL, 'parseSearchFilterExpression', [marshaled], null, 'POST');
// 	return nsapiUnmarshalArray(payloadMap, 'filter', nsapiUnmarshalSearchFilter);
// }
// function nsapiJSONRPCMap()
// {
// 	return { javaClass: 'java.util.HashMap' };
// }
// function nsapiMarshalSearchFiltersOrExpression(filtersOrExpression)
// {
// 	if (typeof filtersOrExpression === 'undefined' || filtersOrExpression === null)
// 		return null;
// 	nsapiAssertTrue(isArray(filtersOrExpression), 'SSS_INVALID_SRCH_FILTER_EXPR');
// 	var result = nsapiMap(filtersOrExpression, function(elem)
// 	{
// 		if (nsapiIsSearchFilterObject(elem))
// 			return nsapiMarshalSearchFilter(elem);
// 		var container = nsapiJSONRPCMap();
// 		if (isArray(elem))
// 			container.arrayValue = nsapiMarshalSearchFiltersOrExpression(elem);
// 		else
// 			container.stringValue = elem;
// 		return container;
// 	});
// 	return result;
// }
// function nsapiUnmarshalSearchFilterExpression(mapArrayPayload)
// {
// 	return nsapiMap(mapArrayPayload, function(map)
// 	{
// 		if (map.hasOwnProperty('stringValue'))
// 			return map.stringValue;
// 		if (map.hasOwnProperty('arrayValue'))
// 			return nsapiUnmarshalSearchFilterExpression(map.arrayValue)
// 		return nsapiUnmarshalSearchFilter(map);
// 	});
// }
// function nsapiMarshalSearchFilter(filter)
// {
// 	return filter._marshal();
// }
// function nsapiMarshalSearchFilters(filters)
// {
//     filters = isArray(filters) ? filters : filters != null && filters instanceof nlobjSearchFilter ? [filters] : null;

// 	nsapiCheckArray(filters, 'filters', nlobjSearchFilter);

// 	return (filters != null) ? nsapiMap(filters, nsapiMarshalSearchFilter) : [];
// }
// function nsapiMarshalSearchColumns(columns)
// {
//     columns = nsapiColumnsAsArray(columns);

//     nsapiCheckArray(columns, 'columns', nlobjSearchColumn);

//     /* add columns. */
//     var rawColumns = [];
//     for ( var i = 0; columns != null && i < columns.length; i++ )
//     {
//         columns[i].userindex = i+1;
//         var marshaledColumn = columns[i]._marshal();
//         rawColumns.push(marshaledColumn);
//     }
//     return rawColumns;
// }
// function nsapiColumnsAsArray(columns)
// {
//     return isArray(columns) ? columns : columns != null && columns instanceof nlobjSearchColumn ? [columns] : null;
// }
// /* ----- helper function for fetching the value of a field (or joined field) on a record  -----*/
// function nlapiLookupField(type, id, columns, text)
// {
//     nsapiCheckArgs( [type, id, columns], ['type', 'id', 'columns'], 'nlapiLookupField' );
// 	nsapiCheckType( type, 'nlapiLookupField' );

// 	var searchcolumns = new Array();
// 	if ( isArray(columns) )
// 	{
// 		for ( var i = 0; i < columns.length; i++ )
// 		{
// 			var column = columns[i];
// 			if ( column.toLowerCase() != 'recordtype' )
// 			{
// 				var name = column.indexOf( '.' ) != -1 ? column.substring( column.indexOf( '.' )+1 ) : column;
// 				var join = column.indexOf( '.' ) != -1 ? column.substring( 0, column.indexOf( '.' ) ) : null;
// 				searchcolumns[searchcolumns.length] = new nlobjSearchColumn(name, join);
// 			}
// 		}
// 	}
// 	else if ( columns.toLowerCase() != 'recordtype' )
// 	{
// 		var name = columns.indexOf( '.' ) != -1 ? columns.substring( columns.indexOf( '.' )+1 ) : columns;
// 		var join = columns.indexOf( '.' ) != -1 ? columns.substring( 0, columns.indexOf( '.' ) ) : null;
// 		searchcolumns[0] = new nlobjSearchColumn(name, join);
// 	}

// 	var result = nlapiSearchRecord(	type,
// 									null,
// 									new nlobjSearchFilter('internalid',null,'anyof',id),
// 									searchcolumns );
// 	var results = null;
// 	if ( result != null && result.length > 0 )
// 	{
// 		results = new Object();
// 		if ( isArray(columns) )
// 		{
// 			for ( var i = 0; i < columns.length; i++ )
// 			{
// 				var name = columns[i].indexOf( '.' ) != -1 ? columns[i].substring( columns[i].indexOf( '.' )+1 ) : columns[i];
// 				var join = columns[i].indexOf( '.' ) != -1 ? columns[i].substring( 0, columns[i].indexOf( '.' ) ) : null;
// 				results[columns[i]] = name.toLowerCase() == 'recordtype' ? result[0].getRecordType() : text ? result[0].getText( name, join ) : result[0].getValue( name, join );
// 			}
// 		}
// 		else
// 		{
// 			var name = columns.indexOf( '.' ) != -1 ? columns.substring( columns.indexOf( '.' )+1 ) : columns;
// 			var join = columns.indexOf( '.' ) != -1 ? columns.substring( 0, columns.indexOf( '.' ) ) : null;
// 			results = name.toLowerCase() == 'recordtype' ? result[0].getRecordType() : text ? result[0].getText( name, join ) : result[0].getValue( name, join );
// 		}
// 	}
// 	return results;
// }
// /* ----- perform a record search and return an Array of nlobjSearchResult objects -----*/
// function nlapiSearchGlobal(keywords)
// {
//     nsapiCheckArgs( [keywords], ['keywords'], 'nlapiSearchGlobal' );
// 	nsapiCheckUsage( );
//     try
//     {
// 		var rawSearchResults = nsServerCall( nsJSONProxyURL, 'searchGlobal', [keywords]);
// 		var rowResults = nsapiExtractSearchResults( rawSearchResults );

// 		nsapiLogUsage( 'nlapiSearchGlobal' );
// 		return rowResults != null && rowResults.length > 0 ? rowResults : null;
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /* ----- perform a duplicate record search and return an Array of nlobjSearchResult objects -----*/
// function nlapiSearchDuplicate(type, fields, id)
// {
//     nsapiCheckArgs( [type, fields != null ? fields : id], ['type', fields != null ? 'fields' : 'id'], 'nlapiSearchDuplicate' );
// 	nsapiCheckUsage( );
//     try
// 	{
// 		var obj = new Object();
// 		for ( var field in fields )
// 		{
// 			nsapiAssertTrue( fields[field] != null, 'SSS_INVALID_SRCH_FILTER', field );
// 			obj[ field ] = fields[ field ];
// 		}
// 		var rawSearchResults = nsServerCall( nsJSONProxyURL, 'searchDuplicate', [type, isNaN(parseInt(id)) ? -1 : parseInt(id), obj]);
// 		var rowResults = nsapiExtractSearchResults( rawSearchResults );

// 		nsapiLogUsage( 'nlapiSearchGlobal' );
// 		return rowResults != null && rowResults.length > 0 ? rowResults : null;
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /* ----- fetch URL for a NetSuite resource: (TASKLINK, RECORD, SCRIPTLET) -----*/
// function nlapiResolveURL(type, identifier, id, pagemode)
// {
// 	nsapiCheckArgs( [type, identifier], ['type', 'identifier'], 'nlapiResolveURL' );
// 	try
//     {
// 		if ( pagemode != null && typeof(pagemode) == "boolean" && /(suitelet|record)/.test(type.toLowerCase()) )
// 			pagemode = type.toLowerCase() == 'suitelet' ? (pagemode ? 'external' : 'internal') : (pagemode ? 'edit' : 'view')
// 		var sUrl = nsServerCall(nsJSONProxyURL, "resolveURL", [type, identifier, id, pagemode]);
// 		return sUrl;
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /* ----- set the Redirect URL for a record. This overrides the default redirect (if one exists) -----*/
// function nlapiSetRedirectURL(type, identifier, id, pagemode, params)
// {
// 	nsapiCheckArgs( [type, identifier], ['type', 'identifier'], 'nlapiSetRedirectURL' );
// 	var url = nlapiResolveURL( type, identifier, id, pagemode );
//     for ( var i in params )
//         url = addParamToURL( url, i, params[ i ] );
//     nsapiSetRedirectURL(url);
// }
// function nsapiSetRedirectURL(url)
// {
//     setFormValue( document.forms['main_form'].elements.customwhence, url );
// }
// /* ----- send and record an e-mail -----*/
// function nlapiSendEmail(author, recipient, subject, body, cc, bcc, records)
// {
// 	nsapiCheckArgs( [author, recipient, subject, body], ['author', 'recipient', 'subject', 'body'], 'nlapiSendEmail' );
// 	nsapiCheckUsage( );
//     try
//     {
// 		var nsPayload = nsStringToXML("<nlapiRequest type='nlapiSendEmail'></nlapiRequest>");
// 		var nlapiRequest = nsPayload.documentElement;
// 		nsSetChildValue( nlapiRequest, "author", author );
// 		nsSetChildValue( nlapiRequest, "recipient", recipient );
// 		nsSetChildValue( nlapiRequest, "subject", subject );
// 		nsSetChildValue( nlapiRequest, "body", body );

// 		cc = isArray( cc ) ? cc : cc != null ? [ ""+cc ] : null;
// 		bcc = isArray( bcc ) ? bcc : bcc != null ? [ ""+bcc ] : null;
// 		nsSetChildValues( nlapiRequest, "cc", cc );
//         nsSetChildValues( nlapiRequest, "bcc", bcc );

//         if ( records != null && records['transaction'] != null ) nsSetChildValue( nlapiRequest, "transaction", records['transaction'] );
//         if ( records != null && records['entity'] != null ) nsSetChildValue( nlapiRequest, "entity", records['entity'] );
//         if ( records != null && records['recordtype'] != null ) nsSetChildValue( nlapiRequest, "recordtype", records['recordtype'] );
//         if ( records != null && records['record'] != null ) nsSetChildValue( nlapiRequest, "record", records['record'] );
//         if ( records != null && records['activity'] != null ) nsSetChildValue( nlapiRequest, "activity", records['activity'] );

// 		new NLXMLHttpRequest().requestURL( nsProxyURL, nsXmlToString( nsPayload ) );
// 		nsapiLogUsage( 'nlapiSendEmail' )
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /* ----- send and record an fax -----*/
// function nlapiSendFax(author, recipient, subject, body, records)
// {
// 	nsapiCheckArgs( [author, recipient, subject, body], ['author', 'recipient', 'subject', 'body'], 'nlapiSendFax' );
// 	nsapiCheckUsage( );
//     try
//     {
// 		var nsPayload = nsStringToXML("<nlapiRequest type='nlapiSendFax'></nlapiRequest>");
// 		var nlapiRequest = nsPayload.documentElement;
// 		nsSetChildValue( nlapiRequest, "author", author );
// 		nsSetChildValue( nlapiRequest, "recipient", recipient );
// 		nsSetChildValue( nlapiRequest, "subject", subject );
// 		nsSetChildValue( nlapiRequest, "body", body );

//         if ( records != null && records['transaction'] != null ) nsSetChildValue( nlapiRequest, "transaction", records['transaction'] );
//         if ( records != null && records['entity'] != null ) nsSetChildValue( nlapiRequest, "entity", records['entity'] );
//         if ( records != null && records['recordtype'] != null ) nsSetChildValue( nlapiRequest, "recordtype", records['recordtype'] );
//         if ( records != null && records['record'] != null ) nsSetChildValue( nlapiRequest, "record", records['record'] );
//         if ( records != null && records['activity'] != null ) nsSetChildValue( nlapiRequest, "activity", records['activity'] );

// 		new NLXMLHttpRequest().requestURL( nsProxyURL, nsXmlToString( nsPayload ) );
// 		nsapiLogUsage( 'nlapiSendFax' )
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /* ----- attach a single record to another -----*/
// function nlapiAttachRecord(type, id, type2, id2, attrs)
// {
// 	nsapiCheckArgs( [type, id, type2, id2], ['type', 'id', 'type2', 'id2'], 'nlapiAttachRecord' );
// 	nsapiCheckType( type, 'nlapiAttachRecord', type != 'file' );
// 	nsapiCheckType( type2, 'nlapiAttachRecord', true );
// 	nsapiCheckUsage( );
//     try
//     {
// 		nsServerCall(nsJSONProxyURL, "attachRecord", [type, id, type2, id2, nsapiExtractMap(attrs)]);
// 		nsapiLogUsage( 'nlapiAttachRecord' )
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /* ----- detach a single record from another -----*/
// function nlapiDetachRecord(type, id, type2, id2, attrs)
// {
// 	nsapiCheckArgs( [type, id, type2, id2], ['type', 'id', 'type2', 'id2'], 'nlapiDetachRecord' );
// 	nsapiCheckType( type, 'nlapiDetachRecord', type != 'file' );
// 	nsapiCheckType( type2, 'nlapiDetachRecord', true );
// 	nsapiCheckUsage( );
//     try
//     {
// 		nsServerCall(nsJSONProxyURL, "detachRecord", [type, id, type2, id2, nsapiExtractMap(attrs)]);
// 		nsapiLogUsage( 'nlapiDetachRecord' )
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /* ----- issue a GET or POST request for an Internal or External URL resource -----*/
// function nlapiRequestURL(url, postdata, headers, callback, method)
// {
//     nsapiCheckArgs( [url], ['url'], 'nlapiRequestURL' );
//     nsapiAssertTrue( url.indexOf( '/' ) == 0 || url.indexOf( 'http' ) == 0, 'SSS_INVALID_URL' );
//     if (!isValEmpty(method))
//         nsapiAssertTrue ( method == 'PUT' || method == 'POST' || method == 'GET' || method == 'DELETE' || method == 'HEAD','SSS_INVALID_HTTPMETHOD');
// 	nsapiCheckUsage( );
//     try
//     {
//         var host = document.location.protocol+'//'+document.location.host;
//         if (url.indexOf( '/' ) != 0 && url.indexOf( host ) != 0)  /* Proxy all non-local URLs */
//         {
//             var nsPayload = nsStringToXML( "<nlapiRequest type='nlapiRequestURL'></nlapiRequest>" );
//             var nlapiRequest = nsPayload.documentElement;
//             nsSetChildValue( nlapiRequest, "url", url );
//             nsSetChildValue( nlapiRequest, "method", method );
// 			if (nsInstanceofDocument( postdata ))
//                 nsSetChildValue( nlapiRequest, "body", nsXmlToString( postdata ) );
//             else if (postdata instanceof String || typeof postdata == "string")
//                 nsSetChildValue( nlapiRequest, "body", postdata );
// 			else
// 			{
// 				for (var i in postdata)
// 				{
// 					var param = nsSetChildValue( nlapiRequest, "param" );
// 					nsSetChildValue( param, "name", i );
// 					nsSetChildValue( param, "value", postdata[ i ] );
// 				}
// 			}
// 			for ( var i in headers )
//             {
//                 nsapiAssertTrue( !isValEmpty( i ), 'SSS_INVALID_HEADER' );
//                 var header = nsSetChildValue( nlapiRequest, "header" );
//                 nsSetChildValue( header, "name", i );
//                 nsSetChildValue( header, "value", headers[ i ] );
//             }
//             url = nsProxyURL;
//             postdata = nsXmlToString( nsPayload );
// 		}
// 		var request = new NLXMLHttpRequest();
//         if (callback instanceof Function)
//             request.setResponseHandler( function(response) { nsapiAjaxResponse( response, callback ) } );
//         var nsResponse = request.requestURL( url, postdata, headers, callback instanceof Function, method )
//         if (nsResponse != null)
//             nsResponse = nsapiAjaxResponse( nsResponse );
// 		nsapiLogUsage( 'nlapiRequestURL' )
//         return nsResponse;
//     }
//     catch( e )
//     {
// 		throw nlapiCreateError( e );
//     }
// }
// /* ----- log an AUDIT/DEBUG/ERROR/EMERGENCY execution -----*/
// function nlapiLogExecution(type, title, details)
// {
//     nsapiCheckArgs( [type], ['type'], 'nlapiLogExecution' );
// 	try
//     {
//         var console = document.getElementById('consolewindow');
//         if (console != null)
//             buildLogConsole( type.toLowerCase(), title, details )
// 		else
// 		{
// 			var scriptid = nlapiGetContext().getScriptId();
// 			if (!isValEmpty(scriptid) && scriptid != "customform")
// 				nsServerCall(nsJSONProxyURL, "logExecution", [scriptid, nlapiGetRecordType(), type, title, details != null ? details.toString() : null]);
// 		}
// 	}
//     catch( e )
//     {
// 		throw nlapiCreateError( e );
//     }
// }
// /* ----- convert String to XML Document -----*/
// function nlapiStringToXML(text)
// {
// 	nsapiCheckArgs( [text], ['text'], 'nlapiStringToXML' );
// 	try
//     {
//         var document = nsStringToXML(text);
//         return document;
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /* ----- convert XML Document to String -----*/
// function nlapiXMLToString(xml)
// {
// 	nsapiCheckArgs( [xml], ['xml'], 'nlapiXMLToString' );
// 	try
//     {
//         var text = nsXmlToString(xml);
//         return text;
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /* ----- perform Xpath query for a value in an XML Document -----*/
// function nlapiSelectValue(node, xpath)
// {
// 	nsapiCheckArgs( [node, xpath], ['node', 'xpath'], 'nlapiSelectValue' );
// 	try
//     {
//         var selection = nsSelectValue(node, xpath);
//         return selection;
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /* ----- perform Xpath query for an Array of values in an XML Document -----*/
// function nlapiSelectValues(node, xpath)
// {
// 	nsapiCheckArgs( [node, xpath], ['node', 'xpath'], 'nlapiSelectValues' );
// 	try
//     {
//         var selections = nsSelectValues(node, xpath);
//         return selections;
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /* ----- perform Xpath query for a Node in an XML Document -----*/
// function nlapiSelectNode(node, xpath)
// {
// 	nsapiCheckArgs( [node, xpath], ['node', 'xpath'], 'nlapiSelectNode' );
// 	try
//     {
//         var selection = nsSelectNode(node, xpath);
//         return selection;
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /* ----- perform Xpath query for an Array of Nodes in an XML Document -----*/
// function nlapiSelectNodes(node, xpath)
// {
// 	nsapiCheckArgs( [node, xpath], ['node', 'xpath'], 'nlapiSelectNodes' );
// 	try
//     {
//         var selections = nsSelectNodes(node, xpath);
//         return selections;
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// var nsContextObj = null;
// /* ----- return an nlobjContext object containing meta-information about user context -----*/
// function nlapiGetContext()
// {
//     try
//     {
// 		if ( nsContextObj == null )
// 			nsContextObj = new nlobjContext( );
// 		return nsContextObj;
//     }
//     catch ( e )
//     {
// 		throw nlapiCreateError( e );
//     }
// }
// /**
//  * @param url URL of request handler
//  * @param methodName method name on remote object to call
//  * @param methodParams an array of parameters to the method
//  * @param asyncCallback a callback if this is to be an async request.  Callback signature should be: callback(result, error)
//  * @param httpMethod the http method to use (POST or GET).  GET is the default.
//  */
// function nlapiServerCall(url, methodName, methodParams, asyncCallback, httpMethod)
// {
// 	return nsServerCall(url, methodName, methodParams, asyncCallback, httpMethod);
// }

// function nlapiLocalCall(func, timeoutinmillis)
// {
// 	nsapiAssertTrue(timeoutinmillis != null && !isNaN(parseInt(timeoutinmillis)), 'SSS_INVALID_ARGUMENT', 'timeoutinmillis: '+timeoutinmillis)
// 	var obj = new Object()
// 	obj.trigger = nsapiQueryScript("trigger")
// 	obj.scriptid = nsapiQueryScript("scriptid")
// 	if ( timeoutinmillis == -1 )
// 		return nsapiCallScript(obj.trigger, obj.scriptid, func)
// 	return setTimeout( function() { nsapiCallScript(obj.trigger, obj.scriptid, func); }, timeoutinmillis );
// }

// function nlapiChangeCall(params)
// {
// 	setWindowChanged(window,false)
// 	window.onbeforeunload=null;
//     var url = document.location.href;
//     for ( var param in params )
//     {
//         url = addParamToURL(url, param, params[param], true);
//     }
//     document.location = url;
// }

// /* ----- Generates an nlobError object -----*/
// function nlapiCreateError(code, detail, suppressNotification)
// {
//     if(nlapiGetContext().getCompany() == '3510556')
//         clientScriptErrorDebug(code+' ' +detail);
// 	window.errorObj = new nlobjError( code, detail, suppressNotification );
// 	return window.errorObj;
// }

// /*--------------- nlobjRecord definition ------------*/
// function nlobjRecord( type, id )
// {
// 	this.type = type;
// 	this.id = id != null ? id : null;
// 	this.fields = new Object();
//     this.fieldnames = new Array();    
//     this.lineitems = new Object();
//     this.linetypes = new Object();
//     this.linefields = new Object();
//     this.matrixfields = new Object();
// 	this.currentlineitems = new Object();
// 	this.currentlineitemindexes = new Object();    
//     this.initialized = false;
//     this.operations = new Array();
// }
// nlobjRecord.prototype.getId = function( ) { return this.id; }
// nlobjRecord.prototype.getRecordType = function( ) { return this.type; }
// nlobjRecord.prototype.setFieldValue = function( name, value )
// {
//     this.fields[name] = value;
//     this.logOperation("setFieldValue", {"field" : name, "value" : value})
// }
// nlobjRecord.prototype.setFieldValues = function( name, values )
// {
//     this.fields[name] = values;
//     this.logOperation("setFieldValues", {"field" : name, "value" : values})
// }
// nlobjRecord.prototype.getFieldValue = function( name ) { return this.fields[name] != null ? this.fields[name] : null; }
// nlobjRecord.prototype.getFieldValues = function( name ) { return this.fields[name] != null ? this.fields[name] : null; }
// nlobjRecord.prototype.getAllFields = function( )
// {
// 	var s = new Array();
// 	for ( var f in this.fields )
// 		s[s.length++] = f;
//     for (var i = 0; i < this.fieldnames.length; i++)
//         arrayAdd(s, this.fieldnames[i]);
//     return s;
// }
// nlobjRecord.prototype.getAllLineItems = function( )
// {
// 	var s = new Array();
// 	for ( var f in this.lineitems )
// 		s[s.length++] = f;
// 	return s;
// }
// nlobjRecord.prototype.getAllLineItemFields = function( name )
// {
// 	var linegroup = this.linefields[ name ];
// 	if ( linegroup == null )
// 		return null;

// 	var s = new Array();
// 	for ( var i = 0; i < this.linefields[ name ].length; i++ )
// 		s[s.length++] = this.linefields[ name ][i];
// 	return s;
// }
// nlobjRecord.prototype.setLineItemValue = function( group, name, line, value )
// {
//     nsapiAssertTrue( line > 0 && line-1 <= this.getLineItemCount( group ), 'SSS_INVALID_SUBLIST_OPERATION' )
//     /* Special case setting fields on the next line for edit machines and UI object list machines (backward compatiblity) */
//     if ( line-1 == this.getLineItemCount( group ) )
//         this.selectNewLineItem(group)
//     else if ( line <= this.getLineItemCount(group) )
//         this.selectLineItem(group, line)
//     this.setCurrentLineItemValue(group, name, value)
//     this.commitLineItem(group)
// }
// nlobjRecord.prototype.setAndCommitLineItemValue = function( group, name, line, value )
// {
// 	var linegroup = this.lineitems[ group ];
// 	if ( linegroup == null )
// 	{
// 		linegroup = new Array();
// 		this.lineitems[ group ] = linegroup;
// 	}
// 	var lineitem = linegroup[ line ];
// 	if ( lineitem == null )
// 	{
// 		lineitem = new Array( 1 );
// 		linegroup[ line ] = lineitem;
// 	}
// 	lineitem[ name ] = value;
// }
// nlobjRecord.prototype.insertLineItem = function( type, line )
// {
//     nsapiAssertTrue( this.linetypes[type] == 'edit', 'SSS_INVALID_SUBLIST_OPERATION' )
//     if (this.getCurrentLineItemIndex(type) == -1)
//     {
//         if (line-1 == this.getLineItemCount( type ) || isNaN(parseInt(line)))
//             this.selectNewLineItem(type)
//         else if (line <= this.getLineItemCount(type))
//             this.selectLineItem(type, line)
//     }
//     var linegroup = this.lineitems[ type ];
// 	if (linegroup == null)
// 	{
// 		linegroup = new Array( 1 );
// 		this.lineitems[ type ] = linegroup;
// 	}
// 	linegroup.splice( line, 0, new Array() )
//     this.logOperation("insertLineItem", {"type" : type})
// }
// nlobjRecord.prototype.removeLineItem = function( type, line )
// {
//     nsapiAssertTrue( this.linetypes[type] == 'edit', 'SSS_INVALID_SUBLIST_OPERATION' )
//     if (this.getCurrentLineItemIndex(type) == -1)
//     {
//         if (line-1 == this.getLineItemCount(type) || isNaN(parseInt(line)))
//             this.selectNewLineItem(type)
//         else if (line <= this.getLineItemCount(type))
//             this.selectLineItem(type, line)
//     }

//     var linegroup = this.lineitems[ type ];
// 	if ( linegroup == null || this.getLineItemCount(type) < line )
// 		return;
// 	linegroup.splice(line, 1)
//     this.logOperation("removeLineItem", {"type" : type})            
//     if (this.getCurrentLineItemIndex(type) != -1)
//     {
//         this.currentlineitems[type] = null;
//         this.currentlineitemindexes[type] = null;
//     }
// }
// nlobjRecord.prototype.getLineItemValue = function( group, name, line )
// {
// 	var value = null;
// 	var linegroup = this.lineitems[ group ];
// 	if ( linegroup != null )
// 	{
// 		var lineitem = linegroup[ line ];
// 		if ( lineitem != null )
// 			value = lineitem[ name ];
// 	}
// 	return value != null ? value : null;
// }
// nlobjRecord.prototype.getLineItemCount = function( group )
// {
// 	var linegroup = this.lineitems[ group ];
// 	return linegroup != null ? linegroup.length - 1 /* zeroth line is unused. */: 0;
// }
// nlobjRecord.prototype.setLineItemMatrixValue = function( type, fldnam, linenum, column, value )
// {
//     if ( this.isMatrixField(type, fldnam) )
//         this.setLineItemValue(type, this.getMatrixFieldName(type, fldnam, column), linenum, value)
// }
// nlobjRecord.prototype.getLineItemMatrixValue = function( type, fldnam, linenum, column )
// {
//     if ( this.isMatrixField(type, fldnam) )
//         return this.getLineItemValue(type, this.getMatrixFieldName(type, fldnam, column), linenum)
//     return null;
// }
// nlobjRecord.prototype.findLineItemValue = function( type, fldnam, value )
// {
// 	for (var linenum=1; linenum <= this.getLineItemCount(type);linenum++)
// 		if (value == this.getLineItemValue(type, fldnam, linenum))
// 			return linenum;
// 	return -1;
// }
// nlobjRecord.prototype.findLineItemMatrixValue = function( type, fldnam, column, value )
// {
//     if ( this.isMatrixField(type, fldnam) )
//         return this.findLineItemValue(type, this.getMatrixFieldName(type, fldnam, column), value);
//     return -1;
// }
// nlobjRecord.prototype.setMatrixValue = function( type, fldnam, column, value )
// {
//     if ( this.isMatrixField(type, fldnam) )
//     {
//         this.fields[this.getFieldValue(type+'header')+column] = value;
//         this.logOperation("setMatrixValue", {"type" : type, "field" : name, "column" : column, "value" : value})
//     }
// }
// nlobjRecord.prototype.getMatrixValue = function( type, fldnam, column )
// {
//     return this.isMatrixField(type, fldnam) ? this.getFieldValue(this.getFieldValue(type+'header')+column) : null;
// }
// nlobjRecord.prototype.getMatrixCount = function( type, fldnam )
// {
//     return this.isMatrixField(type, fldnam) ? this.getFieldValue(this.getFieldValue(type+'headercount')) : null;
// }
// nlobjRecord.prototype.selectLineItem = function( type, linenum )
// {
//     nsapiAssertTrue( this.linetypes[type] != null && linenum > 0 && linenum <= this.getLineItemCount(type), 'SSS_INVALID_SUBLIST_OPERATION' )
//     this.currentlineitems[type] = new Object();
//     this.currentlineitemindexes[type] = linenum;
//     var flds = this.getAllLineItemFields(type)
//     for ( var i = 0; i < flds.length; i++ )
//         this.currentlineitems[type][flds[i]] = this.getLineItemValue(type, flds[i], linenum)
//     this.logOperation("selectLineItem", {"type" : type, "linenum" : linenum})
// }
// nlobjRecord.prototype.selectNewLineItem = function( type )
// {
//     nsapiAssertTrue( this.linetypes[type] != null && this.linetypes[type] == 'edit', 'SSS_INVALID_SUBLIST_OPERATION' )
//     this.currentlineitems[type] = new Object();
//     this.currentlineitemindexes[type] = this.getLineItemCount(type)+ 1;
//     this.logOperation("selectNewLineItem", {"type" : type})
// }
// nlobjRecord.prototype.cancelLineItem = function( type )
// {
//     nsapiAssertTrue( this.getCurrentLineItemIndex(type) != -1, 'SSS_INVALID_SUBLIST_OPERATION' )
//     this.currentlineitems[type] = null;
//     this.currentlineitemindexes[type] = null;
//     this.logOperation("cancelLineItem", {"type" : type})
// }
// nlobjRecord.prototype.commitLineItem = function( type )
// {
//     nsapiAssertTrue( this.getCurrentLineItemIndex(type) != -1, 'SSS_INVALID_SUBLIST_OPERATION' )
//     var flds = this.getAllLineItemFields(type)
//     var linenum = this.getCurrentLineItemIndex(type);
//     for ( var i = 0; i < flds.length; i++ )
//         this.setAndCommitLineItemValue(type, flds[i], linenum, this.currentlineitems[type][flds[i]])
//     this.currentlineitems[type] = null;
//     this.currentlineitemindexes[type] = null;
//     this.logOperation("commitLineItem", {"type" : type})
// }
// nlobjRecord.prototype.getCurrentLineItemIndex = function( type ) { return this.currentlineitems[type] != null ? this.currentlineitemindexes[type] : -1; }
// nlobjRecord.prototype.getCurrentLineItemValue = function( type, name )
// {
//     nsapiAssertTrue( this.getCurrentLineItemIndex(type) != -1, 'SSS_INVALID_SUBLIST_OPERATION' )
//     return this.currentlineitems[type][name]
// }
// nlobjRecord.prototype.setCurrentLineItemValue = function( type, name, value )
// {
//     nsapiAssertTrue( this.getCurrentLineItemIndex(type) != -1, 'SSS_INVALID_SUBLIST_OPERATION' )
//     this.currentlineitems[type][name] = value;
//     this.logOperation("setCurrentLineItemValue", {"type" : type, "field" : name, "value" : value})
// }
// nlobjRecord.prototype.setCurrentLineItemMatrixValue = function( type, fldnam, column, value )
// {
//     nsapiAssertTrue( this.getCurrentLineItemIndex(type) != -1, 'SSS_INVALID_SUBLIST_OPERATION' )
//     this.currentlineitems[type][this.getMatrixFieldName(type, fldnam, column)] = value;
//     this.logOperation("setCurrentLineItemMatrixValue", {"type" : type, "field" : fldnam, "column" : column, "value" : value})
// }
// nlobjRecord.prototype.getCurrentLineItemMatrixValue = function( type, fldnam, column )
// {
//     nsapiAssertTrue( this.getCurrentLineItemIndex(type) != -1, 'SSS_INVALID_SUBLIST_OPERATION' )
//     return this.currentlineitems[type][this.getMatrixFieldName(type, fldnam, column)]
// }
// /* field text APIs and field metadata APIs not yet supported via nlobjRecord interface in Client SuiteScript */
// nlobjRecord.prototype.setFieldText = function( name, text ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.setFieldTexts = function( name, texts ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.getFieldText = function( name ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.getFieldTexts = function( name ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.getLineItemText = function( type, name, line ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.getCurrentLineItemText = function( type, name ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.setCurrentLineItemText = function( type, name, text ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.getField = function( fldnam ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.getSublist = function( type ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.getMatrixField = function( type, fldnam ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.getLineItemField = function( type, name, linenum ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.getLineItemField = function( type, name, linenum ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.getFieldDisabled = function( name ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.getFieldMandatory = function( name ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.getFieldDisplay = function( name ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.getFieldVisibility = function( name ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.getFieldLabel = function( name ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.getLineItemDisplay = function( name ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.getLineItemDisabled = function( type, name, linenum ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.getLineItemMandatory = function( type, name, linenum ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjRecord.prototype.getLineItemLabel = function( type, name ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// /* internal nlobjRecord helper methods */
// nlobjRecord.prototype.isMatrixField = function( type, fld ) { return this.getFieldValue(type+'matrixfields') != null && arrayIndexOf(this.getFieldValue(type+'matrixfields').split(","), fld) != -1; }
// nlobjRecord.prototype.getMatrixFieldName = function(type, fldnam, column) { return this.isMatrixField(type, fldnam) ? fldnam+"_"+column+"_" : null; }
// nlobjRecord.prototype.logOperation = function(operation, args) { if ( this.initialized ) this.operations.push( { "operation" : operation, "args" : args } ); }
// nlobjRecord.prototype.getDateTimeValue = function (fldname, timezone)
// {
//     if (timezone == null)
//         return this.getFieldValue(fldname);
//     else {
//         var storedDateTime = this.getFieldValue(fldname);
//         var context = nlapiGetContext();
//         var preferredTimeZone = context.getPreference("TIMEZONE");
//         if (preferredTimeZone == timezone)
//             return storedDateTime;
//         else
//             return nsServerCall(nsJSONProxyURL, 'calculateGetDateTimeWithTimeZone', [storedDateTime, timezone]);
//     }
// }

// nlobjRecord.prototype.setDateTimeValue = function (fldname, value, timezone)
// {
//     if (timezone == null)
//         return this.setFieldValue(fldname, value);
//     else
//     {
//         var context = nlapiGetContext();
//         var preferredTimeZone = context.getPreference("TIMEZONE");
//         if (preferredTimeZone == timezone)
//             return this.setFieldValue(fldname, value);
//         else
//         {
//             var newVal = nsServerCall(nsJSONProxyURL, 'calculateSetDateTimeWithNewTimeZone', [value, timezone]);
//             return this.setFieldValue(fldname, newVal);
//         }
//     }
// }

// /*--------------- nlobjSearch definition ------------*/
// function nlobjSearch(type, id, filters, columns)  /* Not intended to be public; customers should use the factory methods. */
// {
//     this.type = type;
//     this.searchId = id;
//     this.scriptId = null;
//     this.filters = filters;
//     this.columns = columns;
//     this.isPublic = false;
// }
// nlobjSearch.prototype._load = function()
// {
//     var payloadMap = nsServerCall(nsJSONProxyURL, 'loadSearch', [this.type, this.searchId]);
//     this.isPublic = payloadMap['ispublic'];
//     this.searchId = payloadMap['searchId'];
//     this.scriptId = payloadMap['scriptid'];
//     this.type = payloadMap['type'];
//     this.filters = nsapiUnmarshalArray(payloadMap, 'filter', nsapiUnmarshalSearchFilter);
//     this.columns = nsapiUnmarshalArray(payloadMap, 'column', nsapiUnmarshalSearchColumn);
// }
// function nsapiUnmarshalArray(payloadMap, prefix, unmarshalFunction)
// {
//     var array = [];
//     var count = payloadMap[prefix+'count'];
//     for (var i=0; i<count; ++i)
//     {
//         var attributeMap = payloadMap[prefix+i];
//         var obj = unmarshalFunction(attributeMap);
//         array.push(obj);
//     }
//     return array;
// }
// nlobjSearch.prototype._clone = function()
// {
//     var i;
//     var filtersCopy = [];
//     for (i=0; this.filters && i<this.filters.length; ++i) { filtersCopy.push(this.filters[i]._clone()); }
//     var columnsCopy = [];
//     for (i=0; this.columns && i<this.columns.length; ++i) { columnsCopy.push(this.columns[i]._clone()); }
//     var clone = new nlobjSearch(this.type, this.searchId, filtersCopy, columnsCopy);
//     clone.scriptId = this.scriptId;
//     clone.isPublic = this.isPublic;
//     clone.type = this.type;
//     return clone;
// }
// nlobjSearch.prototype.runSearch = function()
// {
//     return new nlobjSearchResultSet(this._clone());
// }
// nlobjSearch.prototype.saveSearch = function(title, scriptId)
// {
//     try
//     {
// 		var rawFilters = nsapiMarshalSearchFilters(this.filters);
// 		var rawColumns = nsapiMarshalSearchColumns(this.columns);
// 		var searchId = nsServerCall(nsJSONProxyURL, 'saveSearch', [title, scriptId, this.type, this.searchId, rawFilters, rawColumns, this.isPublic], null, 'POST');
// //		nsapiLogUsage( 'nlapiSearchRecord', isValEmpty(searchId) && nsapiIsLookup(this.filters) ? type : null );
// 		return searchId;
//     }
//     catch (e)
//     {
//         throw nlapiCreateError( e );
//     }
// }
// nlobjSearch.prototype.deleteSearch = function()
// {
//     try
//     {
//         nsapiAssertTrue(this.searchId && this.searchId != -1, 'SSS_CANT_DELETE_AD_HOC_SEARCH');
// 		nsServerCall(nsJSONProxyURL, 'deleteSearch', [this.type, this.searchId]);
// //		nsapiLogUsage( 'nlapiSearchRecord', isValEmpty(searchId) && nsapiIsLookup(this.filters) ? type : null );
//     }
//     catch (e)
//     {
//         throw nlapiCreateError( e );
//     }
// }
// nlobjSearch.prototype.getFilters = function()
// {
//     return this.filters;
// }
// nlobjSearch.prototype.setFilters = function(filters)
// {
//     this.filters = filters;
// }
// nlobjSearch.prototype.addFilter = function(filter)
// {
//     if (!this.filters)
//         this.filters = [filter];
//     else
//         this.filters.push(filter);
// }
// nlobjSearch.prototype.addFilters = function(filters)
// {
//     if (filters)
//     {
//         for (var i=0; i<filters.length; ++i)
//             this.addFilter(filters[i]);
//     }
// }
// nlobjSearch.prototype.getFilterExpression = function()
// {
// 	var rawFilters = nsapiMarshalSearchFilters(this.filters);
// 	var payload = nsServerCall(nsJSONProxyURL, 'buildSearchFilterExpression', [rawFilters], null, 'POST');
// 	return nsapiUnmarshalSearchFilterExpression(payload);
// }
// nlobjSearch.prototype.setFilterExpression = function(filterExpression)
// {
// 	filterExpression = nsapiNormalizeFilters(filterExpression);
// 	nsapiAssertTrue(!nsapiIsFlatSearchFilterList(filterExpression), 'SSS_INVALID_SRCH_FILTER_EXPR');
// 	this.filters = nsapiParseSearchFilterExpression(filterExpression);
// }
// nlobjSearch.prototype.getColumns = function()
// {
//     return this.columns;
// }
// nlobjSearch.prototype.setColumns = function(columns)
// {
//     this.columns = columns;
// }
// nlobjSearch.prototype.addColumn = function(column)
// {
//     if (!this.columns)
//         this.columns = [column];
//     else
//         this.columns.push(column);
// }
// nlobjSearch.prototype.addColumns = function(columns)
// {
//     if (columns)
//     {
//         for (var i=0; i<columns.length; ++i)
//             this.addColumn(columns[i]);
//     }
// }
// nlobjSearch.prototype.setRedirectURLToSearch = function()
// {
//     try
//     {
// 		var rawFilters = nsapiMarshalSearchFilters(this.filters);
// 		var rawColumns = nsapiMarshalSearchColumns(this.columns);
//         var url = nsServerCall(nsJSONProxyURL, 'prepareSearchPage', [this.type, this.searchId, rawFilters, rawColumns]);
//         nsapiSetRedirectURL(url);
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// nlobjSearch.prototype.setRedirectURLToSearchResults = function()
// {
//     try
//     {
// 		var rawFilters = nsapiMarshalSearchFilters(this.filters);
// 		var rawColumns = nsapiMarshalSearchColumns(this.columns);
//         var url = nsServerCall(nsJSONProxyURL, 'prepareSearchResults', [this.type, this.searchId, rawFilters, rawColumns]);
//         nsapiSetRedirectURL(url);
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// nlobjSearch.prototype.getId = function()
// {
//     return (!this.searchId || this.searchId == -1) ? null : this.searchId;
// }
// nlobjSearch.prototype.getScriptId = function()
// {
//     return this.scriptId;
// }
// nlobjSearch.prototype.getSearchType = function()
// {
//     return this.type;
// }
// nlobjSearch.prototype.getIsPublic = function()
// {
//     return this.isPublic;
// }
// nlobjSearch.prototype.setIsPublic = function(isSearchPublic)
// {
//     this.isPublic = isSearchPublic;
// }
// nlobjSearch.prototype._getResultsSlice = function(start, end)
// {
//     try
//     {
// 		var rawFilters = nsapiMarshalSearchFilters(this.filters);
// 		var rawColumns = nsapiMarshalSearchColumns(this.columns);
// 		var rawResults = nsServerCall(nsJSONProxyURL, 'searchRecordSlice', [this.type, this.searchId, rawFilters, rawColumns, start, end]);
// 		var rowResults = nsapiExtractSearchResults( rawResults, this.columns );

// 		nsapiLogUsage( 'nlapiSearchRecord', isValEmpty(this.searchId) && nsapiIsLookup(this.filters) ? type : null );
// 		return rowResults != null && rowResults.length > 0 ? rowResults : null;
//     }
//     catch( e )
//     {
//         throw nlapiCreateError( e );
//     }
// }
// /*--------------- nlobjSearchResultSet definition ------------*/
// function nlobjSearchResultSet(searchObject)  /* Not intended to be public; customers should use runSearch(). */
// {
//     this.search = searchObject;
// }
// nlobjSearchResultSet.prototype.getColumns = function()
// {
//     return this.search.getColumns();
// };
// nlobjSearchResultSet.prototype.getResults = function(start, end)
// {
//     nsapiAssertTrue(start >= 0, 'SSS_INVALID_SEARCH_RESULT_INDEX');
//     nsapiAssertTrue((end - start) <= 1000, 'SSS_SEARCH_RESULT_LIMIT_EXCEEDED');
//     if (start >= end)
//         return [];
//     return this.search._getResultsSlice(start, end);
// };
// nlobjSearchResultSet.prototype.forEachResult = function(callback)
// {
//     var PAGE_SIZE = 50, continueIteration = true;
//     for (var start=0; ; start+=PAGE_SIZE)
//     {
//         var searchResults = this.getResults(start, start+PAGE_SIZE);
//         if (!searchResults)
//             break;
//         for (var i=0; continueIteration && i<searchResults.length; ++i)
//         {
//             continueIteration = callback(searchResults[i]);
//         }
//         if (searchResults.length < PAGE_SIZE)
//             break;
//     }
// };
// /*--------------- nlobjSearchFilter definition ------------*/
// function nlobjSearchFilter( name, join, operator, value, value2 )
// {
//     nsapiCheckArgs( [name], ['name'], 'nlobjSearchFilter' );
//     this.name = name;
// 	this.join = join;
// 	this.operator = operator;
// 	this.values = new Array();
//     this.addValue( value );
//     this.addValue( value2 );
// 	this.formula = null;
// 	this.summarytype = null;
//     this.isor = false;
//     this.isnot = false;
//     this.leftparens = 0;
//     this.rightparens = 0;
// }
// nlobjSearchFilter.prototype._clone = function()
// {
//     var clone = new nlobjSearchFilter(this.name, this.join, this.operator, null, null);
//     clone.values = this.values.slice();
//     clone.formula = this.formula;
//     clone.summarytype = this.summarytype;
// 	clone.isor = this.isor;
// 	clone.isnot = this.isnot;
// 	clone.leftparens = this.leftparens;
// 	clone.rightparens = this.rightparens;
//     return clone;
// }
// nlobjSearchFilter.prototype.getName = function( ) { return this.name; }
// nlobjSearchFilter.prototype.getJoin = function( ) { return this.join; }
// nlobjSearchFilter.prototype.getOperator = function( ) { return this.operator; }
// nlobjSearchFilter.prototype.getSummaryType = function( ) { return this.summarytype; }
// nlobjSearchFilter.prototype.getFormula = function( ) { return this.formula; }
// nlobjSearchFilter.prototype.setFormula = function( formula ) { this.formula = formula; return this; }
// nlobjSearchFilter.prototype.setSummaryType = function( type ) { this.summarytype = type; return this; }
// nlobjSearchFilter.prototype.addValue = function( value )
// {
// 	if ( isArray(value) )
// 	{
// 		for ( var i = 0; i < value.length; i++ )
// 		{
// 			if ( value[i] != null )
// 				this.values.push(value[i].toString());
// 		}
// 	}
// 	else if ( value != null )
// 		this.values.push(value.toString());
// }
// nlobjSearchFilter.prototype._marshal = function()
// {
// 	var filterObject = nsapiJSONRPCMap();
// 	filterObject.name = this.name;
// 	filterObject.operator = this.operator;
// 	filterObject.values = this.values.length == 0 ? null : this.values;
// 	filterObject.join = this.join;
// 	filterObject.formula = this.formula;
// 	filterObject.summarytype = this.summarytype;
// 	filterObject.isor = this.isor;
// 	filterObject.isnot = this.isnot;
// 	filterObject.leftparens = this.leftparens;
// 	filterObject.rightparens = this.rightparens;
// 	return filterObject;
// }
// /*--------------- nlobjSearchColumn definition ------------*/
// function nlobjSearchColumn( name, join, summary )
// {
//     nsapiCheckArgs( [name], ['name'], 'nlobjSearchColumn' );
//     this.name = name;
// 	this.join = join;
// 	this.summary = summary;
//     this.type = null;
//     this.label = null;
// 	this.functionid = null;
// 	this.formula = null;
// 	this.sortdir = null;
// 	this.index = -1;
// 	this.userindex = -1;
//     this.whenorderedby = null;
//     this.whenorderedbyjoin = null;
// }
// nlobjSearchColumn.prototype._clone = function()
// {
//     var clone = new nlobjSearchColumn(this.name, this.join, this.summary);
//     clone.type = this.type;
//     clone.label = this.label;
//     clone.functionid = this.functionid;
//     clone.formula = this.formula;
//     clone.sortdir = this.sortdir;
//     clone.index = this.index;
//     clone.userindex = this.userindex;
//     clone.whenorderedby = this.whenorderedby;
//     clone.whenorderedbyjoin = this.whenorderedbyjoin;
//     return clone;
// };
// nlobjSearchColumn.prototype.getName = function( ) { return this.name; };
// nlobjSearchColumn.prototype.getJoin = function( ) { return this.join; };
// nlobjSearchColumn.prototype.getType = function( ) { return this.type; };
// nlobjSearchColumn.prototype.getSummary = function( ) { return this.summary; };
// nlobjSearchColumn.prototype.getFormula = function( ) { return this.formula; };
// nlobjSearchColumn.prototype.setFormula = function( formula ) { this.formula = formula; return this; };
// nlobjSearchColumn.prototype.getLabel = function( ) { return this.label; };
// nlobjSearchColumn.prototype.setLabel = function( label ) { this.label = label; return this; };
// nlobjSearchColumn.prototype.getFunction = function( ) { return this.functionid; };
// nlobjSearchColumn.prototype.setFunction = function( functionid ) { this.functionid = functionid; return this; };
// nlobjSearchColumn.prototype.getSort = function( ) { return this.sortdir; };
// nlobjSearchColumn.prototype.setSort = function( descending ) { this.sortdir = descending ? "DESC" : "ASC"; return this; };
// nlobjSearchColumn.prototype.getWhenOrderedBy = function( ) { return this.whenorderedby; };
// nlobjSearchColumn.prototype.getWhenOrderedByJoin = function( ) { return this.whenorderedbyjoin; };
// nlobjSearchColumn.prototype.setWhenOrderedBy = function( whenorderedby, whenorderedbyjoin ) { this.whenorderedby = whenorderedby; this.whenorderedbyjoin = whenorderedbyjoin; return this; };
// nlobjSearchColumn.prototype._marshal = function()
// {
// 	var columnObject = new Object();
// 	columnObject.name = this.name;
// 	columnObject.join = this.join;
// 	columnObject.summary = this.summary;
// 	columnObject.label = this.label;
// 	columnObject.type = this.type;
// 	columnObject.functionid = this.functionid;
// 	columnObject.formula = this.formula;
// 	columnObject.sortdir = this.sortdir;
// 	columnObject.whenorderedby = this.whenorderedby;
// 	columnObject.whenorderedbyjoin = this.whenorderedbyjoin;
// 	columnObject.userindex = this.userindex;
// 	return columnObject;
// }
// /*--------------- nlobjSearchResult definition ------------*/
// function nlobjSearchResult( type, id, rawValues, rawColumns )
// {
// 	this.type = type;
// 	this.id = id;
// 	this.rawValues = rawValues;
// 	this.rawColumns = rawColumns;
// 	this.valuesByIdx = [];	/* index values by column index for performance */
// 	this.valuesByKey = new Object(); 	/* index values by legacy key for performance */
// 	for ( var i = 0; rawValues != null && i < rawValues.length; i++ )
// 	{
// 		this.valuesByIdx[rawValues[i].index] = rawValues[i]
// 		this.valuesByKey[this.getKey(rawColumns[i].name, rawColumns[i].join, rawColumns[i].summary)] = rawValues[i]
// 	}
// }
// nlobjSearchResult.prototype.getId = function( ) { return this.id; }
// nlobjSearchResult.prototype.getRecordType = function( ) { return this.type; }
// nlobjSearchResult.prototype.getValue = function( name, join, summary )
// {
// 	var cell = null;
// 	if ( typeof(name) == "string" )
// 		cell = this.valuesByKey[ this.getKey(name,join,summary) ]
// 	else if (name instanceof nlobjSearchColumn)
// 	{
// 		var col = name;
// 		if ( col.index != -1 )
// 			cell = this.valuesByIdx[ col.index ];
// 		if ( cell == null )
// 			cell = this.valuesByKey[ this.getKey(col.name,col.join,col.summary) ]
// 	}
// 	return cell != null ? cell.value : null;
// }
// nlobjSearchResult.prototype.getText = function( name, join, summary )
// {
// 	var cell = null;
// 	if ( typeof(name) == "string" )
// 		cell = this.valuesByKey[ this.getKey(name,join,summary) ]
// 	else if (name instanceof nlobjSearchColumn)
// 	{
// 		var col = name;
// 		if ( col.index != -1 )
// 			cell = this.valuesByIdx[ col.index ];
// 		if ( cell == null )
// 			cell = this.valuesByKey[ this.getKey(col.name,col.join,col.summary) ]
// 	}
// 	return cell != null ? cell.text : null;
// }
// nlobjSearchResult.prototype.getKey = function( name, join, summary )
// {
// 	return (join != null ? join.toLowerCase()+'_' : '')+name.toLowerCase()+(summary != null ? '_'+summary.toLowerCase() : '');
// }
// nlobjSearchResult.prototype.getAllColumns = function()
// {
// 	return this.rawColumns;
// }

// var nsDefaultContextObj = null;
// /*--------------- nlobjContext definition ------------*/
// function nlobjContext( )
// {
// 	var jsContextObj = nsDefaultContextObj != null ? nsDefaultContextObj : nsServerCall(nsJSONProxyURL, "getContext");

// 	this.name = jsContextObj.name;
// 	this.email = jsContextObj.email;
// 	this.user = jsContextObj.user;
// 	this.role = jsContextObj.role;
// 	this.roleid = jsContextObj.roleid;
// 	this.rolecenter = jsContextObj.rolecenter;
// 	this.company = jsContextObj.company;
// 	this.contact = jsContextObj.contact;
// 	this.department = jsContextObj.department;
// 	this.location = jsContextObj.location;
// 	this.version = jsContextObj.version;
// 	this.subsidiary = jsContextObj.subsidiary;
// 	this.environment = jsContextObj.environment;
// 	this.executioncontext = jsContextObj.context;
// 	this.scriptprefs = null;
// 	this.usage = new Object();
// 	this.internal = true;
//     this.totalBundleUsage = new Object();   /*The Tototal usage is either limited on company or on bundle. Key of this object is the the bundle ID, and -1 stands for scripts not in bundle*/
//     this.getTotalUsage = function()
//     {
//         var bundle = -1;
//         var script = nsapiQueryScript( 'scriptid' );
//         if ( script != null && script != "global" && script != "internal" )
//         {
//             bundle = fBundleIds[ nsapiQueryScript( 'scriptid' ) ];
//             if ( bundle == null || bundle == '' )  bundle = -1;
//         }
//         if ( this.totalBundleUsage[bundle] == null )
//         {
//             this.totalBundleUsage[bundle] = nsServerCall(nsJSONProxyURL, "getTotalScriptGovernance", [ bundle ] );
//         }
//         return this.totalBundleUsage[bundle];
//     }
// 	this.setUsage = function(func, type)
// 	{
// 		var script = this.getScriptId();
//         if ( script != "global" && script != "internal" )
//         {
//             var iCost = parseInt( nsUsageCosts[ func ] );
//             if (type != null)
//                 iCost /= (nsapiGetRecord(type).type == "RECORD" ? 5 : nsapiGetRecord(type).type == "BODY" ? 1 : 2);
//             this.usage[script] = (this.usage[script] != null ? this.usage[script] : 0) + iCost;
//         }
//     }
// }
// nlobjContext.prototype.getName = function( ) { return this.name; }
// nlobjContext.prototype.getUser = function( ) { return this.user; }
// nlobjContext.prototype.getRole = function( ) { return this.role; }
// nlobjContext.prototype.getRoleId = function( ) { return this.roleid; }
// nlobjContext.prototype.getRoleCenter = function( ) { return this.rolecenter; }
// nlobjContext.prototype.getEmail = function( ) { return this.email; }
// nlobjContext.prototype.getContact = function( ) { return this.contact; }
// nlobjContext.prototype.getCompany = function( ) { return this.company; }
// nlobjContext.prototype.getDepartment = function( ) { return this.department; }
// nlobjContext.prototype.getLocation = function( ) { return this.location; }
// nlobjContext.prototype.getSubsidiary = function( ) { return this.subsidiary; }
// nlobjContext.prototype.getEnvironment = function( ) { return this.environment; }
// nlobjContext.prototype.getExecutionContext = function( ) { return this.executioncontext; }
// nlobjContext.prototype.getRemainingUsage = function( ) { return this.getTotalUsage() - (this.usage[this.getScriptId()] == null ? 0 : parseInt( this.usage[this.getScriptId()] )); }
// nlobjContext.prototype.getRemainingInstructions = function( ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjContext.prototype.getBundleId = function( ) { return fBundleIds[ nsapiQueryScript( 'scriptid' ) ]; }
// nlobjContext.prototype.getScriptId = function( ) { return   window.NLScriptId;}
// //nsapiQueryScript( 'scriptid' ); }  //old way is using stacktrace to find nsapiCallScript() call,  to get scriptId that's being passed, but it doesn't work in IE. Issue 192145.
// nlobjContext.prototype.getDeploymentId = function( ) { return fDeployIds[ nsapiQueryScript( 'scriptid' ) ]; }
// nlobjContext.prototype.getScriptType = function( ) { return "CLIENT"; }
// nlobjContext.prototype.getFeature = function( name ) { return nsServerCall(nsJSONProxyURL, "getFeature", [name]); }
// nlobjContext.prototype.getPreference = function( name )
// {
// 	if ( name.toLowerCase().indexOf('custscript') == 0 )
// 	{
// 		this.scriptprefs = this.scriptprefs != null ? this.scriptprefs : nsServerCall(nsJSONProxyURL, "getScriptPrefs", [nlapiGetRecordType()]);
// 		return this.scriptprefs[name];
// 	}
// 	return nsServerCall(nsJSONProxyURL, "getPref", [name]);
// }
// nlobjContext.prototype.getPermission = function( name ) { return nsServerCall(nsJSONProxyURL, "getPerm", [name]); }
// nlobjContext.prototype.getSessionObject = function( name ) { return nsServerCall(nsJSONProxyURL, "getSessionObject", [name]); }
// nlobjContext.prototype.setSessionObject = function( name, value ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjContext.prototype.getAllSessionObjects = function() { return nsServerCall(nsJSONProxyURL, "getAllSessionObjects"); }
// nlobjContext.prototype.getPercentComplete = function( ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjContext.prototype.setPercentComplete = function( value ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjContext.prototype.getRecordCount = function( ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjContext.prototype.setRecordCount = function( value ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjContext.prototype.getRecordCompletedCount = function( ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjContext.prototype.setRecordCompletedCount = function( value ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjContext.prototype.getRecordFailedCount = function( ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjContext.prototype.setRecordFailedCount = function( value ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjContext.prototype.getSetting = function( type, name )
// {
// 	switch ( type.toLowerCase() )
// 	{
// 		case "script" :
// 			return this.getPreference(name);
// 		case "feature" :
// 	       	return this.getFeature(name) ? "T" : "F";
// 		case "preference" :
// 			return this.getPreference(name);
// 		case "permission" :
// 			return this.getPermission(name);
// 		case "session" :
// 			return this.getSessionObject(name);
// 		throw nlapiCreateError('SSS_NOT_YET_SUPPORTED');
// 	}
// 	return null;
// }
// nlobjContext.prototype.setSetting = function( type, name, value ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjContext.prototype.getVersion = function( ) { return this.version; }
// nlobjContext.prototype.isInternal = function( ) { return nsapiIsInternal(); }
// nlobjContext.prototype.getColorPreferences = function( ) { return nsServerCall(nsJSONProxyURL, "getColorPreferences"); }

// /*--------------- nlobjError definition ------------*/
// function nlobjError( code, error, suppressnotification )
// {
//     this.id = null;
//     this.code = code;
// 	this.details = error;
//     this.stacktrace = stacktrace();
// 	this.suppressnotification = suppressnotification;
// 	if ( code instanceof nlobjError || code instanceof NLXMLResponseError )
// 	{
// 		this.id = code.getId();
// 		this.code = code.getCode();
// 		this.details = code.getDetails();
//         if ( code instanceof nlobjError )
//             this.stacktrace = code.getStackTrace();
// 	}
//     this.name = this.code;      /* exposed for compatibility with Javascript Error object. */
//     this.message = this.details;/* exposed for compatibility with Javascript Error object. */
//     this.description = this.details;/* exposed for compatibility with Javascript Error object. */
// }
// nlobjError.prototype.getId = function( ) { return this.id; }
// nlobjError.prototype.getCode = function( ) { return this.code; }
// nlobjError.prototype.getDetails = function( ) { return this.details; }
// nlobjError.prototype.getStackTrace = function( ) { return this.stacktrace; }

// /*--------------- nlobjServerResponse definition ------------*/
// function nlobjServerResponse ( code, body, headers, error )
// {
// 	this.code = code;
// 	this.body = body;
// 	this.headers = headers;
//     this.headerNames = new Array();
//     for ( var i in this.headers )
//         this.headerNames[this.headerNames.length] = i;
//     this.error = error;
// 	this.contentType = this.getHeader("Content-Type");
// }
// nlobjServerResponse.prototype.getCode = function( ) { return this.code; }
// nlobjServerResponse.prototype.getBody = function( ) { return this.body; }
// nlobjServerResponse.prototype.getContentType = function( ) { return this.contentType; }
// nlobjServerResponse.prototype.getAllHeaders = function( ) { return this.headerNames; }
// nlobjServerResponse.prototype.getHeader = function( name ) { return this.headers[ this.resolveHeaderName(name) ] != null ? nullIfEmpty( this.headers[ this.resolveHeaderName(name) ][0] ) : null }
// nlobjServerResponse.prototype.getHeaders = function( name ) { return this.headers[ this.resolveHeaderName(name) ] }
// nlobjServerResponse.prototype.getError = function( ) { return this.error; }
// nlobjServerResponse.prototype.resolveHeaderName = function(name)
// {
// 	if (window.navigator.userAgent.indexOf("Safari") != -1 && name != null && name.indexOf(nsHeaderPrefix) == 0 && this.headers[name] == null)
// 		for (var i in this.headers)
// 			if (i.toLowerCase() == name.toLowerCase())
// 				return i;
// 	return name;
// }


// /*--------------- simple nlobjField definition (readonly for now). Currently implemented as snapshot. Make dynamic for 2010.1 ------------*/
// function nlobjField( name, type, sublist )
// {
//     this.name = name;
// 	this.type = type;
// 	this.noslaving = false;
// 	this.sublist = sublist;
// 	this.label = null;
// 	this.required = false;
// 	this.disabled = false;
// 	this.hidden = false;
// 	this.display = false;
// 	this.visible = false;
// 	this.popup = false;
// 	this.readonly = false;
// 	this.parent = null;
// 	this.uifield = null;
// 	this.linenum = -1;
// }
// nlobjField.prototype.getName = function( ) { return this.name; }
// nlobjField.prototype.getType = function( ) { return this.type; }
// nlobjField.prototype.getLabel = function( ) 	{ return this.label; }
// nlobjField.prototype.getSubList = function( ) 	{ return this.sublist; }
// nlobjField.prototype.getParent = function( ) 	{ return this.parent; }
// nlobjField.prototype.getLine = function( ) 	{ return this.linenum; }
// nlobjField.prototype.getUIField = function( ) 	{ return this.uifield; }
// nlobjField.prototype.noSlaving = function( ) 	{ return this.noslaving; }
// nlobjField.prototype.isMandatory = function( ) 	{ return this.required; }
// nlobjField.prototype.isDisabled = function( ) 	{ return this.disabled; }
// nlobjField.prototype.isHidden = function( ) 	{ return this.hidden; }
// nlobjField.prototype.isPopup = function( ) 		{ return this.popup; }
// nlobjField.prototype.isDisplay = function( ) 	{ return this.display; }
// nlobjField.prototype.isVisible = function( )    { return this.visible; }
// nlobjField.prototype.isReadOnly = function( ) 	{ return this.readOnly; }
// nlobjField.prototype.setLabel = function( required ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjField.prototype.setAlias = function( required ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjField.prototype.setDefaultValue = function( required ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjField.prototype.setDisabled = function( disabled ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjField.prototype.setMandatory = function( disabled ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjField.prototype.setMaxLength = function( disabled ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjField.prototype.setDisplayType = function( disabled ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjField.prototype.setLayoutType = function( disabled ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjField.prototype.setLinkText = function( disabled ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjField.prototype.setHelpText = function( text ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjField.prototype.setDisplaySize = function( disabled ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjField.prototype.setPadding = function( disabled ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjField.prototype.addSelectOption = function( disabled ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjField.prototype.getSelectOptions = function( token ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }

// /*--------------- nlobjSubList definition (readonly for now). Currently implemented as snapshot. Make dynamic for 2010.1 ------------*/
// function nlobjSubList( name, type )
// {
//     this.name = name;
// 	this.type = isEditMachine(type) ? (eval( String(type) + '_machine').isinline ? "inlineeditor" : "editor") :
//                 getFormElement(document.forms['main_form'], type+"matrixfields" ) != null ? "matrix" : "list";
// 	this.label = null;
// 	this.hidden = false;
//     this.display = true;
// }
// nlobjSubList.prototype.getName = function( ) { return this.name; }
// nlobjSubList.prototype.getType = function( ) { return this.type; }
// nlobjSubList.prototype.getLabel = function( ) 	{ return this.label; }
// nlobjSubList.prototype.isHidden = function( ) 	{ return this.hidden; }
// nlobjSubList.prototype.isDisplay = function( ) 	{ return this.display; }
// nlobjSubList.prototype.isChanged = function( ) 	{ return wasMachineChanged(this.name); }
// nlobjSubList.prototype.setLabel = function( label ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjSubList.prototype.setHelpText = function( help ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjSubList.prototype.setDisplayType = function( type ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjSubList.prototype.setLineItemValue = function( field, line, value ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjSubList.prototype.setLineItemMatrixValue = function( field, line, column, value ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjSubList.prototype.setLineItemValues = function( values ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjSubList.prototype.getField = function( name ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjSubList.prototype.getAllFields = function( ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjSubList.prototype.getAllHeaderFields = function( ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjSubList.prototype.addField = function( name,type,label,source,group ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjSubList.prototype.addHeaderField = function( name,type,label,source ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjSubList.prototype.setAmountField = function( fldnam ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjSubList.prototype.setUniqueField = function( fldnam ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjSubList.prototype.getMatrixCount = function( field ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjSubList.prototype.addButton = function( name, label, script ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjSubList.prototype.getButton = function( name ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjSubList.prototype.addRefreshButton = function( ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }
// nlobjSubList.prototype.addMarkAllButtons = function( ) { throw nlapiCreateError('SSS_NOT_YET_SUPPORTED'); }

// /*--------------------------------------------------------------------------------------- */
// /*--------------------------------------------------------------------------------------- */
// /* ------------- Internal Helper functions for Client SuiteScript API.  ----------------- */
// /*--------------------------------------------------------------------------------------- */
// /*--------------------------------------------------------------------------------------- */
// function nsapiButtonCall(trigger, scriptid, func, args)
// {
//     return nsapiCallUserScript(trigger, scriptid, func, args)
// }
// function nsapiCallUserScript(trigger, scriptid, func, args)
// {
//     var isInternal = nsapiIsInternal();
//     try
//     {
//         nsapiSetIsInternal(false);
//         if(nlapiGetContext().usage)
//             nlapiGetContext().usage[scriptid] = 0;   //reset it back to 0 when a client script is invoke again.
//         return nsapiCallScript(trigger, scriptid, func, args)
//     }
//     finally
//     {
// 		nsapiUpdateMachines();
//         nsapiSetIsInternal(isInternal);
//     }
// }
// function nsapiCallScript(trigger, scriptid, func, args)
// {
//     window.NLScriptId = scriptid;
// 	if (isValEmpty(func))
// 		return true;
// 	var argstr = ""
// 	if (typeof(func) != "function" && (typeof(func) != "string" || func.indexOf("(") == -1))
// 	{
// 		for ( var i = 0; args != null && i < args.length; i++ )
// 			argstr += (i > 0 ? ", " : "") + (args[i] == null || typeof(args[i]) == "undefined" ? "null" : typeof(args[i]) != "string" ? args[i] : "'"+args[i]+"'");
// 	}
// 	if (nlapiGetContext().isInternal())
// 	{
// 		if ( typeof(func) == "function" )
// 			return func()
// 		else if ( typeof(func)== "string" && func.indexOf("(")>0 )
// 			return eval(func)
// 		else
// 			return eval(func+"("+argstr+")");
// 	}
// 	else
// 	{
// 		try
// 		{
// 			if (typeof(func) == "function")
// 				return func()
// 			else if (typeof(func)== "string" && func.indexOf("(")>0)
// 				return eval(func)
// 			else
// 				return eval(func+"("+argstr+")");
// 		}
// 		catch ( e )
// 		{
// 			var fn = typeof(func) == "function" ? getFuncName(func) : func.indexOf("(")>0 ? func.substring(0, func.indexOf("(")) : func;
// 			var id = e.getCode != null && typeof(e.getCode) == "function" ? e.getId() : null;
// 			var code = e.getCode != null && typeof(e.getCode) == "function" ? e.getCode() : typeof(e) == "string" ? new String(e) : typeof(e) == "object" && e.name && e.message ? "JS_EXCEPTION" : "UNEXPECTED_ERROR";
//             if (code == "UNEXPECTED_ERROR" && id != null)
//                 code += " (id="+id+")";
// 			var msg = e.getDetails != null && typeof(e.getDetails) == "function" ? emptyIfNull(e.getDetails()) : typeof(e) == "string" ? "" : typeof(e) == "object" && e.name && e.message ? e.name+' '+e.message : e.toString()
// 			var suppressnotification = e.getCode != null && typeof(e.getCode) == "function" && e.suppressnotification === true;
// 			var supportsLogging = scriptid != "customform";
// 			alert(window.nsScriptErrorMsg+'\n\n'+fn+' ('+trigger+')\n'+scriptid+''+(isValEmpty(nlapiGetContext().getBundleId()) ? '' : ' ('+ nlapiGetContext().getBundleId() +')')+'\n\n'+""+code+'\n'+msg)
// 			if (supportsLogging)
// 				nsServerCall(nsJSONProxyURL, "logError", [code, msg, id, fn, scriptid, suppressnotification, nlapiGetRecordType(), nlapiGetRecordId()]);
// 			throw e;
// 		}
// 	}
//     window.NLScriptId = null;
// }
// function nsapiIsInternal( )
// {
//     return nlapiGetContext().internal;
// }
// function nsapiSetIsInternal( x )
// {
// 	nlapiGetContext().internal = x;
// }
// function nsapiQueryScript( arg )
// {
// 	for (var a=arguments.callee.caller; a != null && a.caller != a; a=a.caller)
// 	{
// 		if ( getFuncName(a).indexOf("nsapiCallScript") >= 0 && a.arguments.length >= 3 )
// 			return a.arguments[arg == "trigger" ? 0 : 1];
//     }
// 	return arg == "scriptid" ? "global" : null;
// }

// function nsapiFireOnChange(fld,firefieldchanged)
// {
// 	if (!(nsapiIsInternal() && firefieldchanged == false))	/* bail if author requested fieldchange to not fire */
//     {
//         var fcFunc = '';
//         var checkValid = fld.checkvalid
//         var isInternal = nsapiIsInternal();
//         if (firefieldchanged == false && document.forms['main_form'].elements.nlapiFC != null)/* suppress user fieldchange if requested */
//         {
//             fcFunc = document.forms['main_form'].elements.nlapiFC.value;
//             document.forms['main_form'].elements.nlapiFC.value = '';
//         }
//         try
//         {
//             fld.checkvalid = true;
//             nsapiSetIsInternal(true)
//             fireProperOnChange(fld);
//         }
//         finally
//         {
//             if (fcFunc.length > 0)
//                 document.forms['main_form'].elements.nlapiFC.value = fcFunc;
//             fld.checkvalid = checkValid;
//             nsapiSetIsInternal(isInternal)
//         }
//     }

//     NS.event.dispatch(NS.event.type.FIELD_CHANGED, { field: fld });
// }

// var nsUpdatedMachines = new Object();	/* track updated line items */
// function nsapiUpdateMachines()
// {
//     for( var s in nsUpdatedMachines )
//     {
//         var mch = eval( String(s) + '_machine');
//         if (mch != null)
//             mch.buildtable();
//     }
//     nsUpdatedMachines = new Object();
// }
// var nsDisabledFields = new Object();	/* track disabled main form fields */
// /* ------------- Helper functions for managing access to tasklinks and recordtype metadata ------------ */
// var nsTasklinks;
// var nsRecordTypes;
// function nsapiGetTaskLink( id )
// {
// 	if ( nsTasklinks == null )
// 	{
// 		nsTasklinks = nsServerCall(nsJSONProxyURL, "getTaskLinks");
// 	}
//    	return nsTasklinks[ id ];
// }
// function nsapiInitRecords()
// {
// 	if ( nsRecordTypes == null )
// 	{
// 	    nsRecordTypes = nsServerCall(nsJSONProxyURL, "getRecordTypes");
// 	}
// }
// function nsapiGetRecord(type)
// {
//     nsapiCheckArgs( [type], ['type'], 'nsapiGetRecord' );
// 	nsapiInitRecords();
// 	return nsRecordTypes[ type.toLowerCase() ];
// }
// function nsapiGetRecordURL(type, id)
// {
// 	nsapiInitRecords();
// 	var recordType = nsapiGetRecord(type);
//     if (recordType != null)
// 	{
// 		var url = recordType.url;
// 		var params = recordType.urlparams;
// 		if (params != null && params.indexOf(',') != -1)
// 			params = params.replace(',', '&')
// 		if (!isValEmpty( id ))
// 			url = addParamToURL( url, 'id', id )
// 		if ((isValEmpty(id) || recordType.type == 'OTHER') && params != null && url.indexOf(params) == -1)
// 			url = addNextParamPrefixToURL( url ) + params;
// 		return url;
// 	}
// 	else
// 		return null;
// }
// function nsapiModifyLoadArg(param)
// {
// 	if (param == "customform")
// 		param = "cf"
// 	return param;
// }

// var nsUsageCosts = null;
// function nsapiCheckUsage( )
// {
// 	if ( nsUsageCosts == null )
// 	{
// 		nsUsageCosts = nsServerCall(nsJSONProxyURL, 'getUsageUnits');
// 	}
//     if ( nlapiGetContext().getRemainingUsage() < 0 )
//         throw new nlapiCreateError( 'SCRIPT_EXECUTION_USAGE_LIMIT_EXCEEDED', 'Script Execution Usage Limit Exceeded' );
// }
// function nsapiLogUsage( func, type )
// {
// 	nlapiGetContext().setUsage(func, type);
// }
// function nsapiCheckType( type, funcName, bStrictValidation )
// {
// 	nsapiInitRecords();
// 	var typeObj = nsapiGetRecord(type);
//     if ( typeObj == null || (bStrictValidation && typeObj.scriptable == false) )
// 		throw nlapiCreateError( 'SSS_INVALID_RECORD_TYPE', (funcName != null ? funcName+': ' : '')  +'type argument '+type+' is not a valid record or is not available in your account. Please see the documentation for a list of supported record types.' );
//     return true;
// }
// function nsapiCheckArray( arrayObj, name, objType )
// {
// 	if ( !isArray(arrayObj) )
// 		return;

// 	for ( var i = 0; i < arrayObj.length; i++ )
// 		if ( arrayObj[ i ] == null || !(arrayObj[ i ] instanceof objType) )
// 			throw nlapiCreateError( 'SSS_INVALID_ARRAY_ARGUMENT', name+'['+i+']' );
// }
// function nsapiResolveField(type, fldnam, linenum, column)
// {
//     var fld = null;
//     if ( column == null )
//     {
//         if ( type == null )
//         {
//             var form = typeof(ftabs) != 'undefined' && ftabs[getFieldName(fldnam)] != null ? document.forms[ftabs[getFieldName(fldnam)]+'_form'] : document.forms['main_form'];
//             fld = form.elements[ fldnam ];
//             if ( fld == null )
//                 fld = getFormElement( form, getFieldName(fldnam)+"_send" );
//         }
//         else
//         {
//             var form = document.forms[type+'_form'];
//             fld = form.elements[ isEditMachine(type) ? fldnam : fldnam+linenum ];
//         }
//     }
//     else
//         fld = linenum != null ? getMatrixField(type, fldnam, linenum, column) : getMatrixHeaderField(type, fldnam, column);
//     return fld;
// }
// function nsapiIsLookup(filters)
// {
//     return filters != null && filters.length == 1 && nsapiIsSearchFilterObject(filters[0]) && filters[0].getName().toLowerCase() == "internalid"
//                 && filters[0].getOperator().toLowerCase() == "anyof"
//                 && filters[0].getSummaryType() == null
//                 && filters[0].getFormula() == null;
// }
// /* ------------ Helper function used for unmarshalling search results from server. ----------------*/
// function nsapiExtractSearchResults(rawResults, columns)
// {
// 	var rowResults = [];
//     var columnArray = nsapiColumnsAsArray(columns);
// 	if ( rawResults != null )
// 	{
// 		for ( var i = 0; rawResults.columns != null && i < rawResults.columns.length; i++ )
// 		{
// 			var obj = null;
// 			var col = rawResults.columns[i];
// 			if ( col.userindex == -1 )
// 			{
// 				obj = nsapiUnmarshalSearchColumn(col);
// 			}
// 			else if (columnArray != null)
// 			{
//                 obj = columnArray[col.userindex-1];
// 			}
// 			obj.index = col.index;
//             obj.type = col.type;            
//             rawResults.columns[i] = obj;
// 		}

// 		for ( var i = 0; i < rawResults.rows.length; i++ )
// 		{
// 			rowResults[rowResults.length] = new nlobjSearchResult( rawResults.rows[i].recordType, rawResults.rows[i].id, rawResults.rows[i].cells, rawResults.columns )
// 		}
// 	}
// 	return rowResults.length == 0 ? null : rowResults;
// }

// /* ------------- Helper function(s) for Serializing <record></record> Element to an nlobjRecord ----------------*/
// function nsapiExtractRecord( nsrecord )
// {
// 	var sKey = nsSelectValue( nsrecord, "@id" );
// 	var sType = nsSelectValue( nsrecord, "@recordType" );

// 	var record = new nlobjRecord( sType, sKey );
//     record.fieldnames = nsSelectValue( nsrecord, "@fields" ).split(",")
//     var nsfields = nsSelectNodes( nsrecord, "*" );
//     nsapiExtractFields( record, nsfields);

// 	var nsmachines = nsSelectNodes( nsrecord, "machine" );
// 	for ( var m = 0; nsmachines != null && m < nsmachines.length; m++ )
// 	{
// 		var nsmachine = nsmachines[ m ];
// 		var machineName = nsmachine.getAttribute('name');
// 		var nslines = nsSelectNodes( nsmachine, "line" );
//         record.linetypes[machineName] = nsmachine.getAttribute('type');
//         record.linefields[machineName] = nsmachine.getAttribute('fields').split(',');
//         if ( nsmachine.getAttribute('matrixfields') != null )
//             record.matrixfields[machineName] = nsmachine.getAttribute('matrixfields').split(',');
// 		for ( var line = 0; nslines != null && line < nslines.length; line++ )
// 		{
// 			var nsline = nslines[ line ];
// 			var nslinefields = nsSelectNodes( nsline, "*" );
//             nsapiExtractFields( record, nslinefields, machineName, line+1);
// 		}
//     }
//     record.initialized = true;
//     return record;
// }
// function nsapiExtractFields( record, fields, machine, linenum )
// {
//     var buffer = new Array();
//     for (var i = 0; fields != null && i < fields.length; i++)
//     {
//         var field = fields[ i ];
//         var fieldName = field.nodeName;
// 		if ( fieldName == "machine" && field.getAttribute('type') != null )	/* skip over machine nodes. */
// 			continue
// 		var fieldValue = nsGetXMLValue( field );
//         var fieldValues = buffer[ fieldName ] != null ? buffer[ fieldName ] : new Array();

//         fieldValues[ fieldValues.length ] = fieldValue;
//         buffer[ fieldName ] = fieldValues;
//         eval( machine != null ? 'record.setAndCommitLineItemValue( machine, fieldName, linenum, fieldValues.length == 1 ? fieldValues[0] : fieldValues )' : 'record.setFieldValue( fieldName, fieldValues.length == 1 ? fieldValues[0] : fieldValues )');
//     }
// }
// /* ------------- Helper function(s) for Serializing nlobjRecord into an <record><record> Document ----------------*/
// function nsapiSerializeRecord( record )
// {
// 	var nsrecord = nsStringToXML("<record></record>");
// 	nsrecord.documentElement.setAttribute('recordType', record.getRecordType() );
// 	if ( record.getId() != null )
// 		nsrecord.documentElement.setAttribute('id', record.getId() );
//     var operations = nsSetChildValue( nsrecord.documentElement, "operations" );
//     nsapiSerializeOperation( record.operations[0], operations, "load" );
// 	for ( var i = 1; i < record.operations.length; i++ )
// 	{
//         nsapiSerializeOperation( record.operations[i], operations, "data" );
// 	}
//     return nsrecord;
// }
// function nsapiSerializeOperation( jsOperation, operationsNode, type )
// {
//     var operation = nsSetChildValue( operationsNode, "operation" );
//     operation.setAttribute("type", type)
//     operation.setAttribute("name", jsOperation.operation)

//     for (var arg in jsOperation.args)
//     {
//         if ( isArray( jsOperation.args[arg] ) )
//         {
//             for ( var i = 0; i < jsOperation.args[arg].length; i++ )
//             {
//                 nsSetChildValue( operation, arg, jsOperation.args[arg][i] );
//             }
//         }
//         else if ( typeof jsOperation.args[arg] == "object" )
//         {
//             var argNode = nsSetChildValue( operation, arg );
//             for (var entry in jsOperation.args[arg])
//             {
//                 nsSetChildValue( argNode, entry, jsOperation.args[arg][entry] );
//             }
//         }
//         else
//         {
//             nsSetChildValue( operation, arg, jsOperation.args[arg] );
//         }
//     }
// }
// var nsProxyURL = '/app/common/scripting/nlapihandler.nl';
// var nsJSONProxyURL = '/app/common/scripting/nlapijsonhandler.nl';
// /* ----- internal function for handling AJAX server call for issuing nlapiRequestURL calls (nsapiPrefix is defined in NLAPI.jsp) -----*/
// function nsapiAjaxResponse( response, callbackFunc )
// {
// 	var error = response.getError();
// 	if ( error != null )
// 	{
// 		error = nlapiCreateError(error);
// 		if ( callbackFunc == null )
// 			throw error;
// 	}

// 	var code = response.getCode();
// 	var body = response.getBody();
// 	var headers = response.getHeaders();
// 	var nlheaders = [];
// 	if ( headers[nsHeaderPrefix+'-Code'] != null )  /* handle proxyed requests */
// 	{
// 		code = headers[nsHeaderPrefix+'-Code'];
// 		for ( var header in headers )
// 			if ( header.indexOf( nsHeaderPrefix ) == 0 )
// 				nlheaders[header.substring( nsHeaderPrefix.length+1 )] = headers[header];
// 	}
// 	else
// 		nlheaders = headers;

// 	var response = new nlobjServerResponse( code, body, nlheaders, error );
// 	if ( typeof(callbackFunc) == "function" )
// 		callbackFunc( response );
// 	return response;
// }
// function nsapiCheckArgs( funcArgs, funcArgNames, funcName )
// {
// 	for ( var i = 0; i < funcArgs.length; i++ )
// 	{
// 		if ( funcArgs[ i ] == null || (typeof funcArgs[ i ] == "string" && isValEmpty(funcArgs[ i ])) )
// 		{
// 			throw nlapiCreateError( 'SSS_MISSING_REQD_ARGUMENT', (funcName != null ? funcName+': ' : '')  +'Missing a required argument: '+funcArgNames[ i ] );
// 		}
// 	}
// }
// function nsapiAssertTrue( expression, errorCode, errorMessage )
// {
// 	if ( !expression )
// 	{
// 		throw nlapiCreateError( errorCode, errorMessage );
// 	}
// }
// function nsapiExtractMap(obj)
// {
// 	if ( obj == null ) return null;
// 	var map = new Object();
// 	for ( var attr in obj )
// 		map[attr] = obj[attr]
// 	return map;
// }
// /* ----- internal function for handling machine segmenting -----*/
// function nsapiGetCurrentSegment(type)
// {
// 	var sel = null;
// 	if (document.forms[type+'_main_form'] != null)
// 		sel = document.forms[type+'_main_form'].elements[type+'range'];
// 	return sel != null ? parseInt(getSelectValue(sel)) : 1;
// }

// function nsapiGetSegmentForLine(type, linenum)
// {
// 	var segmentSize = null;
// 	if (document.forms[type+'_main_form'] != null)
// 		segmentSize = document.forms[type+'_main_form'].elements[type+'segmentsize'];
// 	return segmentSize != null ? Math.floor((linenum-1)/parseInt(segmentSize.value)) : 1;
// }

// function nsapiSelectSegmentForLine(type, linenum)
// {
// 	var sel = null;
// 		if (document.forms[type+'_main_form'] != null)
// 		sel = document.forms[type+'_main_form'].elements[type+'range'];
// 	if (sel != null)
// 	{
// 		var currentSegment = nsapiGetCurrentSegment(type);
// 		var targetSegment = nsapiGetSegmentForLine(type, linenum);
// 		if (currentSegment != targetSegment)
// 		{
// 			setSelectValue(sel, targetSegment);
// 			eval("Sync" + type + "range(true);");
// 		}
// 	}
// }

// function process_slaving_result(response)
// {
//     var isInternal = nsapiIsInternal();
//     try
//     {
//         nsapiSetIsInternal(true)
//         process_slaving_result_original(response);
//     }
//     finally
//     {
//         nsapiSetIsInternal(isInternal)
//     }
// }

// function nlapiShowSaveConfirmation(sUrl)
// {
//     if (NS.form.isChanged() && window.bautosave)
//     {
//         if (window.bautosave == 'F') // Will move the title to translation once UE comes up with the language.
//             nlShowSaveConf('You have made changes to this page. Would you like to save before continuing?', 'Information', null,sUrl);
//         else {
//             if ((!document.forms['main_form'].onsubmit || document.forms['main_form'].onsubmit()))    { 
//                 var theForm = document.forms["main_form"];
//                 var newOption = document.createElement("input");
//                 newOption.id = "setclientredirecturl";
//                 newOption.name = "setclientredirecturl";
//                 newOption.type = "hidden";
//                 newOption.value = sUrl;
//                 theForm.appendChild(newOption); 
//                 document.forms['main_form'].submit();
//             }
//         }
//         return true;
//     }
//     else
//         return false;
// }

// function nlapiGetLineItemLabel(type, fldnam)
// {
//     nsapiCheckArgs( [type, fldnam], ['type', 'fldnam'], 'nlapiGetLineItemLabel' );
//     if ( hasMachine(type) )
//     {
//         var mch = eval( String(type) + '_machine');
//         return mch.getFormElementLabel(mch.getArrayPosition(fldnam));
//     }
//     else
//     {
//         // implement me for list machines using splitIntoCells( document.forms['main_form'].elements[type+"labels"].value )
//     }
//     return null;
// }


// function nlapiViewCurrentLineItemSubrecord(machinename, fldname)
// {
//     nsapiAssertTrue(isSubrecordField(machinename, fldname),  'SSS_INVALID_FIELD_ON_SUBRECORD_OPERATION');
//     var linenum = nlapiGetCurrentLineItemIndex(machinename);
//     return nlapiViewLineItemSubrecord(machinename, fldname, linenum);
// }

// function nlapiViewLineItemSubrecord(machinename, fldname, linenum)
// {
//     nsapiAssertTrue(isSubrecordField(machinename, fldname),  'SSS_INVALID_FIELD_ON_SUBRECORD_OPERATION');
//     var subrecord = NLGetSubRecord(machinename, fldname, linenum);
//     return subrecord;
// }

// function nlapiEditCurrentLineItemSubrecord(machinename, fldname)
// {
//     nsapiAssertTrue(isSubrecordField(machinename, fldname),  'SSS_INVALID_FIELD_ON_SUBRECORD_OPERATION');
//     var linenum = nlapiGetCurrentLineItemIndex(machinename);
//     return nlapiEditLineItemSubrecord(machinename, fldname, linenum);
// }

// function nlapiEditLineItemSubrecord(machinename, fldname, linenum)
// {
//     nsapiAssertTrue(isSubrecordField(machinename, fldname),  'SSS_INVALID_FIELD_ON_SUBRECORD_OPERATION');
//     var subrecord = NLEditSubRecord(machinename, fldname, linenum);
//     return subrecord;
// }

// function nlapiCreateLineItemSubrecord(machinename, fldname, linenum)
// {
//     nsapiAssertTrue(isSubrecordField(machinename, fldname),  'SSS_INVALID_FIELD_ON_SUBRECORD_OPERATION');
//     var subrecord = NLCreateSubRecord(machinename, fldname, linenum);
//     return subrecord;
// }


// function nlapiRemoveCurrentLineItemSubrecord(machinename, fldname)
// {
//     nsapiAssertTrue(isSubrecordField(machinename, fldname),  'SSS_INVALID_FIELD_ON_SUBRECORD_OPERATION');
//     var linenum = nlapiGetCurrentLineItemIndex(machinename);
//     var subrecord = NLGetSubRecord(machinename, fldname, linenum);
//     if (subrecord)
//         subrecord.remove();
// }

// function nlapiViewSubrecord(fldname)
// {
//     nsapiAssertTrue(isSubrecordField(null, fldname),  'SSS_INVALID_FIELD_ON_SUBRECORD_OPERATION');
//     var subrecord = NLGetSubRecord(null, fldname, 1);  //for body field, there is only one subrecord row, so will be in the first row.
//     return subrecord;
// }

// function nlapiEditSubrecord(fldname)
// {
//     nsapiAssertTrue(isSubrecordField(null, fldname),  'SSS_INVALID_FIELD_ON_SUBRECORD_OPERATION');
//     var subrecord = NLEditSubRecord(null, fldname, 1);  //for body field, there is only one subrecord row, so will be in the first row.
//     return subrecord;
// }

// function nlapiCreateSubrecord(fldname)
// {
//     nsapiAssertTrue(isSubrecordField(null, fldname),  'SSS_INVALID_FIELD_ON_SUBRECORD_OPERATION');
//     var subrecord = NLCreateSubRecord(null, fldname, 1);  //for body field, there is only one subrecord row, so will be in the first row.
//     return subrecord;
// }

// function nlapiLoadSubrecord(fldname)
// {
//     var subrecord = nlapiEditSubrecord( fldname );
//     if (!subrecord)
//     {
//         subrecord = nlapiCreateSubrecord( fldname );
//     }
//     return subrecord;
// }

// function nlapiRemoveSubrecord(fldname)
// {
//     nsapiAssertTrue(isSubrecordField(null, fldname),  'SSS_INVALID_FIELD_ON_SUBRECORD_OPERATION');
//     var subrecord = NLGetSubRecord(null, fldname, 1); //for body field, there is only one subrecord, so will be in the first row.
//     if (subrecord)
//         subrecord.remove();
// }

// function isSubrecordField(machinename, fldname)
// {
//     if (typeof(NLGetUIForm) != 'function' || typeof(NLGetBusinessObject) != 'function')
//     {
//         return false;
//     }

//     try
//     {
//         if(isValEmpty(machinename))
//         {
//             var recordManager= NLGetUIForm() == null ? null : NLGetUIForm().recordManager;
//             if(recordManager!=null && recordManager.getField(fldname)!=null)
//                 return recordManager.getField(fldname)['type'] == "summary";
//         }
//         else
//         {
//            var recordManager=NLGetBusinessObject() == null ? null : NLGetBusinessObject().getRecordManager(machinename);
//            if(recordManager !=null && recordManager.getField(fldname)!=null)
//                 return recordManager.getField(fldname)['type'] == 'summary';
//         }
//     }catch(e)
//     {
//         return false;
//     }
//     return false;
// }

// function getFieldName(fldname)
// {
//     if ( fldname == 'type' )  return fldname;
//     var type = nlapiGetFieldValue('type');
//     if (type == 'userpreferences' || type == 'setupcompany' || type == 'acctsetup' || type == 'duplicatedetectsetup')
//         return  fldname;
//     else
//         return  fldname.toLowerCase();
// }

// function clientScriptErrorDebug(msg)
// {
//     var stacktraceInfo = stacktrace();
//     var url = '/core/pages/logJavascriptError.nl?';
//     var request = new NLXMLHttpRequest();
//     var payload =  'winHref=' + escape(window.location.href);
//     payload = payload + '&mesg=' + escape('NLAPI Error ' +msg);
//     payload = payload + "&stcktrc="+escape(stacktraceInfo);
//     var response = request.requestURL( url+payload, payload )
// }

// var nsHeaderPrefix = 'Custom-Header';
// var nsScriptErrorMsg = 'An unexpected error occurred in a script running on this page.';
// var nsYesString = 'Yes';
// var nsNoString = 'No';

//https://checkout.sandbox.netsuite.com/javascript/NLUIWidgets.jsp__NS_VER=2013.1.0&minver=101&locale=en_US.nlqs
var dummy;var undefined;window.currentMenu=null;document.onmousemove=function(a){autoSuggestOnMouseMove(a);quickaddDraggerOnMouseMove(a);portletDraggerOnMouseMove(a);ddmOnMouseMove(a);dropdownOnMouseMove(a);};window.clickCount=0;document.onclick=function(a){++window.clickCount;ddmOnClick(a);if(window.popup_onClickHandler){window.popup_onClickHandler(a);}};document.onmousedown=function(b){quickaddDraggerOnMouseDown(b);portletDraggerOnMouseDown(b);dropdownOnMouseDown(b);NLPopupAutoSuggest_onMouseDown(b);if(window.divsToClose&&typeof(window.divsToClose)!="undefined"){for(var a=0;a<window.divsToClose.length;a++){document.getElementById(window.divsToClose[a]).style.display="none";}window.divsToClose=null;}};document.onmouseup=function(a){quickaddDraggerOnMouseUp();portletDraggerOnMouseUp();dropdownOnMouseUp(a);if(window.NLCalendar_onMouseUp){NLCalendar_onMouseUp(a);}if(window.NLMachine_onMouseUp){NLMachine_onMouseUp(a);}if(window.OrderedListOnMouseUp!=null){window.OrderedListOnMouseUp(a);}};document.onkeydown=function(a){handleHotKeys(a);NLPopupAutoSuggest_onKeyDown(a);return dropdownOnKeyDown(a);};function addDivToClose(a){if(typeof(window.divsToClose)!="Array"){window.divsToClose=new Array();}window.divsToClose[window.divsToClose.length]=a;}function handleHotKeys(b){if(getEventKeypress(b)==71&&getEventAltKey(b)){var a=document.getElementById("_searchstring");if(a!=null){a.focus();a.select();}}}function getMouseX(a){return getEvent(a).clientX;}function getMouseY(a){return getEvent(a).clientY;}function moveToolTip(a,c){var b=getToolTip();if(parseInt(a)+parseInt(b.offsetWidth)<=getDocumentWidth()){b.style.left=a-9;}else{b.style.left=getDocumentWidth()-b.offsetWidth;}b.style.top=c+document.body.scrollTop+5;}function showToolTip(c,b){if(isValEmpty(c)&&isValEmpty(b)){return;}var a='<table border="0" width="250" cellspacing="0" cellpadding="0" bgcolor="#999999"><tr><td width="100%"><table border="0" width="100%" cellspacing="1" cellpadding="2" align="center">';if(!isValEmpty(c)){a+='<tr><td width="100%" class="bglt"><font class="smalltextb">'+c+"</font></td></tr>";}if(!isValEmpty(b)){a+='<tr><td width="100%" bgcolor="#FFFFFF"><font class="smalltext">'+b+"</font></td></tr>";}a+="</table></td></tr></table>";var d=getToolTip();d.movetooltip=isValEmpty(d.tooltipcontent)||d.tooltipcontent!=a;d.tooltipcontent=a;if(d.hidetooltiptimer!=null){clearTimeout(d.hidetooltiptimer);}d.showtooltiptimer=setTimeout("var tooltip = getToolTip(); if (tooltip.movetooltip) moveToolTip(lastX+20,lastY); tooltip.innerHTML=tooltip.tooltipcontent; tooltip.style.visibility = 'visible'",500);}function stopToolTipHide(){var a=getToolTip();if(a.hidetooltiptimer!=null){clearTimeout(a.hidetooltiptimer);}}function hideToolTip(){var a=getToolTip();if(a.showtooltiptimer!=null){clearTimeout(a.showtooltiptimer);}a.tooltipcontent="";a.hidetooltiptimer=setTimeout("var tooltip = getToolTip(); tooltip.tooltipcontent = null; tooltip.style.visibility = 'hidden'",1000);}function getToolTip(){var a=document.getElementById("NLToolTip");if(a==null){a=document.createElement("DIV");a.id="NLToolTip";a.style.position="absolute";a.style.width="250px";a.style.top="0px";a.style.left="0px";a.style.zIndex=4;a.style.visibility="hidden";document.body.appendChild(a);}return a;}window.menusAreOpen=false;window.rolloverDelay=0;var m_multiButtons=new Array();function getNLMultiButtonByName(a){return m_multiButtons[a];}function NLMultiButton(g,l,h,b,k,c,d){var e=new Array();this.sName=g;m_multiButtons[g]=this;this.sTaskId=b;this.sPrimaryButtonName=k;this.bSecondary=c;this.bYellowBg=d;this.bEnabled=true;var f=0;for(i=0;i<l.length;i++){if(l[i][0]==h){this.nDefault=i;}else{e[f]=[l[i][0],"javascript:NLMultiButton_doAction('"+g+"', '"+l[i][1]+"');return false;",""];f++;}}this.sParams=e;this.pValues=l;this.nButtons=l.length;var a="submit";var m=d?"class='pgBntY'":"class='pgBntG'";this.sHTML='<table cellpadding=0 cellspacing=0 border=0 style="cursor:hand;margin-right:6px;"><tr '+m+'><td><img src="/images/nav/ns_x.gif" class="bntLT" border=0 height="50%" width=3><img src="/images/nav/ns_x.gif" class="bntLB" border=0 height="50%" width=3></td><TD id="spn_'+g+'" nowrap class="bntBgB" valign="top" height=20><input onBlur="NLMultiButton_clearMultiButtonMenus();" onKeyDown="return getNLMultiButtonByName(\''+g+"').onKeyPress(event);\" onClick=\"getNLMultiButtonByName('"+g+'\').onMainButtonClick(this);return false;" id="btn_'+g+'" type="'+a+'" class="rndbuttoninpt bntBgT'+(c?"small":"")+'" style="vertical-align:middle;" value="'+h+"\" onKeyPress=\"setEventCancelBubble(event);\" onmousedown=\"this.setAttribute('_mousedown','T'); setButtonDown(true, "+(c?"true":"false")+", this);\" onmouseup=\"this.setAttribute('_mousedown','F'); setButtonDown(false, "+(c?"true":"false")+", this);\" onmouseout=\"if(this.getAttribute('_mousedown')=='T') setButtonDown(false, "+(c?"true":"false")+", this);\" onmouseover=\"if(this.getAttribute('_mousedown')=='T') setButtonDown(true, "+(c?"true":"false")+', this);"></td><td nowrap valign="top" class="bntBgB multiBnt" onMouseOut="NLMultiButton_onArrowMouseOut(\''+g+"')\" onMouseOver=\"NLMultiButton_onArrowMouseOver('"+g+"')\" onClick=\"getNLMultiButtonByName('"+g+'\').onDropDownClick(this, event);"><div style="padding: 2px 3px 0px 4px;" class="bntBgT"><img class="multiBntTri" height="12" border="0" width="8" src="/images/nav/ns_x.gif" alt="More Options"></div></td><td><img src="/images/nav/ns_x.gif" height="50%" class="bntRT" border=0 width=3><img src="/images/nav/ns_x.gif" height="50%" class="bntRB" border=0 width=3></td></tr></table>';this.toString=function(){return this.sHTML;};this.writeInlineHTML=function(){document.write(sHTML);};}function NLMultiButton_clearMultiButtonMenus(){for(i in menus){if(menus[i].tabName!=null&&menus[i].tabName.indexOf("mulitibutton")>=0){menus[i].close();}}}function NLMultiButton_getBackgroundImageHtml(a){return"background-image:url("+a+");";}NLMultiButton.prototype.onMainButtonClick=function(a){NLMultiButton_doAction(this.sName,this.pValues[this.nDefault][1]);};NLMultiButton.prototype.setState=function(b){if(this.bEnabled==b){return;}this.bEnabled=b;var a=document.getElementById("btn_"+this.sName);a.disabled=!b;};function NLMultiButton_doAction(b,c){var a=document.forms.main_form;var e;if(a&&a.elements[c]!=null){e=a.elements[c];}else{e=document.getElementById(c);}if((e.type=="submit")&&b){var d=getNLMultiButtonByName(b);if(d.sTaskId&&d.sPrimaryButtonName&&d.pValues[d.nDefault][1]!=c){a.elements._multibtnstate_.value=d.sTaskId+":"+d.sPrimaryButtonName+":"+e.name;}}e.click();}function NLMultiButton_openMenu(b){clearAllMenusExcept(b);var a=getNLMultiButtonByName(b);if(!a.bEnabled){return;}var c=a.getMenu();c.setOpenMenuUpwardIfNotBelow(true);c.setAllowArbitraryHtmlInMenuEntries(true);c.showHide(true);}function NLMultiButton_onArrowMouseOut(a){clearTimeout(window.rolloverDelay);}function NLMultiButton_onArrowMouseOver(a){window.rolloverDelay=setTimeout("NLMultiButton_openMenu('"+a+"')",100);}NLMultiButton.prototype.onKeyPress=function(a){if(!isIE){return true;}var b=getEventKeypress(a);var c=this.getMenu();if(!c.isOpen&&(b==40)){c.open(null,false);this.nSelected=0;c.setCurrentCellInMenu(c.getCellInMenuAt(this.nSelected));}else{if(c.isOpen){if(b==13){setEventPreventDefault(a);if(c.getCurrentCellInMenu()){c.getCurrentCellInMenu().onclick();}return false;}else{if(b==40||b==38){this.nSelected+=((b==38)?-1:1);if(this.nSelected>=(this.nButtons-1)){this.nSelected=this.nButtons-2;}else{if(this.nSelected<0){this.nSelected=0;c.close();return false;}}c.setCurrentCellInMenu(c.getCellInMenuAt(this.nSelected));}}}}return true;};NLMultiButton.prototype.getMenu=function(){var b=this.menu;if(!b){var a=this.sName;b=this.menu=new NLMenu(a,this.sParams,0,null);menus[a]=b;menuTimers[b.tabName]=0;b.setScaleToLauncher(true);b.setMenuCSSClass(this.bSecondary?"ddmDivButtonSec":(this.bYellowBg?"ddmDivButtonY":"ddmDivButtonG"));b.setXandYoverride(4,-4);b.setCloseAction("getNLMultiButtonByName('"+a+"').onMenuClose();");b.setAfterOpenAction("getNLMultiButtonByName('"+a+"').onAfterMenuOpen();");this.imgbtn=document.getElementById("multibtnimg_"+a);this.btnMain=document.getElementById("btn_"+a);}return b;};NLMultiButton.prototype.onDropDownClick=function(b,a){if(!this.bEnabled){return true;}setEventCancelBubble(a);var c=this.getMenu();c.showHide(true);return false;};NLMultiButton.prototype.onMenuClose=function(){this.nSelected=-1;};NLMultiButton.prototype.onAfterMenuOpen=function(){this.nSelected=0;var e=this.getMenu();var d=this.pValues;var a=0;for(var b=0;b<d.length;b++){if(b!=this.nDefault){var c=document.getElementById(d[a][1]);e.getCellInMenuAt(a).firstChild.className=c.disabled?"ddmAnchorDisabled":"ddmAnchor";a++;}}};function NLDoMainFormButtonAction(a,d){var c=getNLMultiButtonByName("multibutton_"+a);if(c){if(d){document.forms.main_form.elements["btn_"+c.sName].focus();}c.onMainButtonClick();}else{var b=document.forms.main_form.elements[a];if(b){if(d){b.focus();}b.click();}}}function makeMenu(b,a,d,c){if(window.menuData==null){window.menuData=new Array();}if(window.menuLevel==null){window.menuLevel=new Array();}if(window.menuParent==null){window.menuParent=new Array();}window.menuData[b]=a;window.menuLevel[b]=d;window.menuParent[b]=c;}function ddmOnMouseMove(a){if(window.currentMenu!=null){return window.currentMenu.handleMouseMove(a);}}function ddmOnClick(d){var b=getEventTarget(d);var a=findClassUp(b,"ddmSpan");if(a==null){var c=findClassUp(b,"menuDiv");if(c==null){clearAllMenusExcept("ALL_MENUS_PLEASE");}}}var zoomPercent=["75","90","","125","150"];var iZoomDefault=2;var iZoomIndex=iZoomDefault;function getZoomFile(c){var a=c.lastIndexOf(".");var b=c.substr(0,a)+zoomPercent[iZoomIndex]+c.substr(a);return b;}function setMenuZoomFactor(a){if(a!=undefined){if(a<0.9){iZoomIndex=0;}else{if(a<1){iZoomIndex=1;}else{if(a>1.25){iZoomIndex=4;}else{if(a>1){iZoomIndex=3;}else{iZoomIndex=2;}}}}}}setMenuZoomFactor(1);var tdCounter=0;var NLMENU_STYLE_PAGE=1;var NLMENU_STYLE_ACTION=2;var NLMENU_STYLE_PORTLET=3;var NLMENU_STYLE_CUSTOMIZE=4;function NLMenu(c,a,e,b,d){this.tabName=c.substring(0,c.indexOf("_"));this.div=null;this.tableDiv=null;this.currentCell=null;this.isOpen=false;this.level=e;this.parentMenu=b;this.name=c;this.values=a;this.span=document.getElementById("spn_"+this.name);this.overrideX=0;this.rightjustify=false;this.overrideY=0;this.onCloseAction=null;this.onOpenAction=null;this.bHasImageTd=false;this.sHelperText=null;if(d){this.nMenuStyle=d;}else{this.nMenuStyle=NLMENU_STYLE_PAGE;}}var menus=new Object();var menuTimers=new Array();var friendlyDelay=0;function resetNavMenuTimer(a){clearTimeout(menuTimers[a]);}function startTimer(a){menuTimers[a]=setTimeout("clearAllMenus(-100, '"+a+"');",500);}function clearAllMenus(a,b){clearTimeout(friendlyDelay);for(i in menus){if(menus[i].tabName==b){if(menus[i].level>a){menus[i].close();}}}}function clearAllMenusExcept(b){for(i in menus){if(menus[i].tabName!=b){var a=document.getElementById(menus[i].tabName+"_nav_arrow");if(a!=null){a.className="menu_tri";}menus[i].close();}}}function getAndOpenMenu(d,c,b){lastMenuRequestedParent=c;var a=getMenu(d);if(a){lastMenuRequestedParent=null;a.open(c,b);}}function getMenuRoundedBottomTableRow(){var e,h,d,c,f,a,g,b;e=document.createElement("tr");h=document.createElement("td");h.height=9;h.colSpan=2;e.appendChild(h);d=document.createElement("table");d.heigth=9;d.width="100%";d.cellSpacing=0;d.cellPadding=0;d.border=0;h.appendChild(d);c=document.createElement("tbody");d.appendChild(c);f=document.createElement("tr");c.appendChild(f);a=document.createElement("td");f.appendChild(a);b=document.createElement("img");b.height=9;b.width=9;b.border=0;b.src="/images/icons/dashboard/portletelements/bottom_left.gif";a.appendChild(b);a=document.createElement("td");a.height=9;a.width="99%";a.vAlign="bottom";f.appendChild(a);b=document.createElement("img");b.height=9;b.style.width="100%";b.border=0;b.src="/images/icons/dashboard/portletelements/lower_gradient.gif";a.appendChild(b);a=document.createElement("td");f.appendChild(a);b=document.createElement("img");b.height=9;b.width=9;b.border=0;b.src="/images/icons/dashboard/portletelements/bottom_right.gif";a.appendChild(b);return e;}NLMenu.prototype.setXandYoverride=function(a,b){this.overrideX=a;this.overrideY=b;};NLMenu.prototype.setHelperText=function(a){this.sHelperText=a;};NLMenu.prototype.setCloseAction=function(a){this.onCloseAction=new Function(a);};NLMenu.prototype.setOpenAction=function(a){this.onOpenAction=new Function(a);};NLMenu.prototype.setAfterOpenAction=function(a){this.onAfterOpen=new Function(a);};NLMenu.prototype.setRightJustify=function(a){this.rightjustify=a;};NLMenu.prototype.setScaleToLauncher=function(a){this.scaletolauncher=a;};NLMenu.prototype.setMenuBackgroundColor=function(a){this.sMenuBackgroundColor=a;};NLMenu.prototype.setMenuCSSClass=function(a){this.sOverrideClass=a;};NLMenu.prototype.setAllowArbitraryHtmlInMenuEntries=function(a){this.bUseSpanForMenuEntry=a;};NLMenu.prototype.setOpenMenuUpwardIfNotBelow=function(a){this.bOpenMenuUpwardsIfNotBelow=a;};function NLMenu_addHelperTextRows(a,c,d){var b=document.createElement("TR");var e=document.createElement("TD");a.appendChild(b);b.appendChild(e);e.className="text";e.innerHTML=c;if(d){e.colSpan=2;}}NLMenu.prototype.positionActionDiv=function(c,b){if(!(c&&b)){return;}var a=true;if(this.span&&this.span.id&&(this.span.id.indexOf("secondary")>0)){a=false;}var d=findAbsolutePosY(c);if(d+c.offsetHeight+b.offsetHeight>getDocumentClientHeight()&&!a){b.style.top="auto";if(isIE){b.style.bottom=41;}else{b.style.bottom=18;}c.className="ac_container_bot";}else{b.style.top=-1;b.style.bottom="auto";if(this.nMenuStyle==NLMENU_STYLE_CUSTOMIZE){c.className=c.className+"_hover";}else{c.className="ac_container";}}};NLMenu.prototype.openActionMenu=function(O,J){if(this.isOpen==true){return;}if(this.level>0&&typeof O!="undefined"&&document.getElementById(O)==null){return;}if(!this.span){this.span=document.getElementById("spn_"+this.name);}clearTimeout(friendlyDelay);var K=true;if(this.onOpenAction!=null){K=false;this.onOpenAction();}this.div=document.getElementById("div_"+this.name);if(this.div.firstChild){if(this.nMenuStyle==NLMENU_STYLE_ACTION||this.nMenuStyle==NLMENU_STYLE_CUSTOMIZE){this.positionActionDiv(this.span,this.div);}this.div.style.visibility="visible";if(this.level==0){window.menusAreOpen=true;}this.div.style.zIndex=50;this.isOpen=true;if(this.onAfterOpen){this.onAfterOpen();}return;}this.div.onmouseover=new Function("resetNavMenuTimer('"+this.tabName+"');");if(J){this.div.onmouseout=new Function("startTimer('"+this.tabName+"');");}var w=document.createElement("table");w.cellSpacing=0;w.cellPadding=0;w.border=0;var p=document.createElement("tbody");var q=document.createElement("tr");var s=document.createElement("td");var M=document.createElement("img");M.border=0;M.src="/images/nav/ns_x.gif";M.height=1;M.width=4;var H=document.createElement("table");H.className="ac_table";this.div.appendChild(w);w.appendChild(p);p.appendChild(q);q.appendChild(s);s.appendChild(H);s=document.createElement("td");s.className="acSideShadow";s.appendChild(M);q.appendChild(s);M=document.createElement("img");M.border=0;M.src="/images/nav/ns_x.gif";M.height=4;M.width=1;q=document.createElement("tr");p.appendChild(q);s=document.createElement("td");s.className="acLBotShadow";q.appendChild(s);s.appendChild(M);s=document.createElement("td");s.className="acRBotShadow";q.appendChild(s);s.appendChild(M);var y=document.createElement("tbody");H.appendChild(y);H.cellSpacing=2;H.cellPadding=0;var m=new Array();var o=0;var I,N,c,C,A,f,d,a,x,v,e,h,l;var G=false;var B=false;for(I=0;I<this.values.length;I++){A=this.values[I][0];d=this.values[I][1];f=this.values[I][2];h=this.values[I][3];l=this.values[I][4];if(f.length>0){G=true;}if(h!=null&&h.length>0){this.bHasImageTd=true;}else{this.bHasImageTd=false;}var g=A=="ddmSeperator";var r=d=="ADMI_HEADING";if(r){B=true;}N=document.createElement("tr");y.appendChild(N);c=document.createElement("td");c.id="nl"+ ++tdCounter;e=document.createElement("a");e.className="ddmAnchor";if(this.nMenuStyle!=NLMENU_STYLE_CUSTOMIZE){e.onclick=new Function("return false;");}if(r){c.className="ac_text_heading";}else{c.className="ac_text";}c.onmouseover=new Function("clearTimeout(friendlyDelay); clearAllMenus("+(this.level)+", '"+this.tabName+"');");if(d.length>0&&!g&&!r){var d=this.values[I][1];var E=d;e.href=d;if(this.nMenuStyle==NLMENU_STYLE_CUSTOMIZE){e.href=E;}else{var D=this.values[I][4];if(d.substring(0,d.indexOf(":")).toLowerCase()=="javascript"){d=d.substring(d.indexOf(":")+1);if(d.charAt(0)=="/"){e.href=d;e.onclick="";d="";e.style.display="block";}}else{d="try { "+(D?"window.open(":"window.location = ")+"'"+d+"'"+(D?")":"")+"; } catch (e) { }";}c.onclick=new Function("clearAllMenusExcept('clear all'); "+d);}}txt=document.createElement("span");if(l&&l.length>0){txt.className=l;}else{txt.className="ac_text_pad";}txt.innerHTML=A;if(!g){c.appendChild(e);if(this.bHasImageTd){if(h.charAt(0)=="<"){e.innerHTML=h;}else{var b=document.createElement("img");b.border=0;b.src=h;b.height=14;b.width=18;e.appendChild(b);b.style.verticalAlign="bottom";}}if(r){txt.className="ac_heading_pad";e.style.fontWeight="bold";e.style.color="#666666";}e.appendChild(txt);N.appendChild(c);}else{if(g){v=document.createElement("tr");y.appendChild(v);var L=document.createElement("td");v.appendChild(L);L.style.height="4";var n=document.createElement("div");n.className="ac_separator";L.appendChild(n);var F=document.createElement("img");F.src="/images/nav/stretch.gif";F.style.height="3px";n.appendChild(F);}}}if(this.nMenuStyle==NLMENU_STYLE_ACTION||this.nMenuStyle==NLMENU_STYLE_CUSTOMIZE){var z=parseInt(getRuntimeStyle(H,"width"));if(z<120){H.style.width=130;}else{H.style.width=z+30;}}if(isIE){if(this.nMenuStyle==NLMENU_STYLE_PORTLET){this.div.style.left=-16;this.div.style.top=0;}else{if(this.nMenuStyle==NLMENU_STYLE_CUSTOMIZE){this.div.style.top=3;}}}var k=0;var u=this.span;var t=this.span;if(this.level==0){window.menusAreOpen=true;}this.div.style.zIndex=50;if(this.nMenuStyle==NLMENU_STYLE_ACTION||this.nMenuStyle==NLMENU_STYLE_CUSTOMIZE){this.positionActionDiv(this.span,this.div);}this.isOpen=true;if(this.onAfterOpen){this.onAfterOpen();}};NLMenu.prototype.open=function(aa,X){if(this.isOpen==true){return;}if(this.level>0&&typeof aa!="undefined"&&document.getElementById(aa)==null){return;}if(!this.span){this.span=document.getElementById("spn_"+this.name);}clearTimeout(friendlyDelay);if(this.onOpenAction!=null){this.onOpenAction();}var z=false;if(this.level>0){z=true;clearAllMenus(this.level-1,this.tabName);}if(document.getElementById("div_"+this.name)){return;}this.div=document.createElement("div");this.div.className="menuDiv";if(this.sOverrideClass){this.div.className=this.sOverrideClass;}else{var L=document.createElement("div");L.className="menuLeftDiv";if(z){L.style.background="";L.style.paddingLeft=0;}var g=document.createElement("div");g.className="menuRightDiv";var E=document.createElement("div");E.className="menuBottomDiv";var u=document.createElement("div");u.className="menuTableDiv";this.tableDiv=u;L.appendChild(g);g.appendChild(E);E.appendChild(u);this.div.appendChild(L);}this.div.id="div_"+this.name;this.div.onmouseover=new Function("resetNavMenuTimer('"+this.tabName+"');");if(X){this.div.onmouseout=new Function("startTimer('"+this.tabName+"');");}var V=document.createElement("table");V.className="menuInnerTable";if(this.tableDiv){this.tableDiv.appendChild(V);}else{this.div.appendChild(V);}var J=document.createElement("tbody");V.appendChild(J);V.cellSpacing=1;V.cellPadding=4;if(this.sMenuBackgroundColor){V.style.backgroundColor=this.sMenuBackgroundColor;}var p=new Array();var s=0;var W,Z,d,S,O,k,f,b,G,D,h,m;var U=false;var R=false;for(W=0;W<this.values.length;W++){O=this.values[W][0];f=this.values[W][1];k=this.values[W][2];m=this.values[W][3];if(k.length>0){U=true;}if(m!=null&&m.length>0){this.bHasImageTd=true;}var l=O=="ddmSeperator";var w=f=="ADMI_HEADING";if(w){R=true;}Z=document.createElement("tr");J.appendChild(Z);d=document.createElement("td");if(R&&!w){d.style.paddingLeft="20px";}d.id="nl"+ ++tdCounter;h=document.createElement("a");h.className="ddmAnchor";h.onclick=new Function("return false;");if(k.length>0){d.className="ddmTextHasChild";var Q="clearTimeout(friendlyDelay); var timeout = "+(this.level==0?250:0)+"; friendlyDelay = setTimeout(\"getAndOpenMenu('"+k+"','"+d.id+"',"+(X?"true":"false")+')",timeout)';d.onmouseover=new Function(Q);}else{d.className="ddmText";d.onmouseover=new Function("clearTimeout(friendlyDelay); clearAllMenus("+(this.level)+", '"+this.tabName+"');");}if(f.length>0&&!l&&!w){var f=this.values[W][1];h.href=f;var T=this.values[W][4];if(f.substring(0,f.indexOf(":")).toLowerCase()=="javascript"){f=f.substring(f.indexOf(":")+1);}else{f="try { "+(T?"window.open(":"window.location = ")+"'"+f+"'"+(T?")":"")+"; } catch (e) { }";}d.onclick=new Function("clearAllMenusExcept('clear all'); "+f);}var n=null;if(this.bUseSpanForMenuEntry){n=document.createElement("span");n.innerHTML=O;}else{n=document.createTextNode(O);}if((f==null||f.length<1)&&k.length>0){V.style.width="165";p[s]=document.createElement("span");p[s].className="menuChildIcon";p[s].id=this.tabName+"_arrow_"+W;d.appendChild(p[s]);s++;h.style.paddingRight="10px";}if(!l){d.appendChild(h);if(this.bHasImageTd){if(m.charAt(0)=="<"){h.innerHTML=m;}else{var c=document.createElement("img");c.border=0;c.src=m;c.height=14;c.width=18;c.style.marginRight=5;h.appendChild(c);}}h.appendChild(n);if(w){h.style.fontWeight="bold";h.style.color="#666666";}Z.appendChild(d);}if(l||w){D=document.createElement("tr");J.appendChild(D);var Y=document.createElement("td");Y.style.padding="0";Y.style.margin="0";D.appendChild(Y);Y.style.height="3";if(this.bHasImageTd){Y.colSpan=2;}var q=document.createElement("div");q.className="menuSeparator";Y.appendChild(q);}if(this.sHelperText!=null&&W==(this.values.length-1)){NLMenu_addHelperTextRows(J,this.sHelperText,this.bHasImageTd);}}var o=0;var B=this.span;var A=this.span;document.body.appendChild(this.div);if(z){B=this.div;if(aa!=null){A=document.getElementById(aa);}if(this.level>0){var N=getMenu(this.tabName+"_d1");if(N!=null&&N.isOpen&&N.div!=null){o+=N.div.offsetWidth+N.div.offsetLeft;}}if(this.level>1&&this.parentMenu!=null){var a=getMenu(this.parentMenu);if(a!=null&&a.isOpen&&a.div!=null){o+=a.div.offsetWidth;}}o-=(this.level*4);}var M=parseInt(getRuntimeStyle(V,"width"));if(s>0&&U){V.style.width=M+5;}var K=B?findAbsolutePosX(B):event.x;var P=K;var v=document.body.scrollLeft;if(this.rightjustify){K+=this.span.offsetWidth-this.div.offsetWidth;}if(z){K=o+1;}else{K=K-10;}if(this.rightjustify&&(K<P)){this.div.style.left=P;}else{if(K+this.div.offsetWidth<(getDocumentWidth()+v)){this.div.style.left=K+this.overrideX;}else{var C=(K+this.div.offsetWidth)-(getDocumentWidth()+v);this.div.style.left=K-C;}}var I=findClassUp(this.span,"scrollarea");var e=0;if(I!=null){e=I.scrollTop;}var H=A?findAbsolutePosY(A):event.y;if(A){if(H+A.offsetHeight+this.div.offsetHeight>getDocumentHeight()+e+document.body.scrollTop){if(this.bOpenMenuUpwardsIfNotBelow){H=findAbsolutePosY(A)-this.div.offsetHeight+3;}else{H=getDocumentHeight()-this.div.offsetHeight+5+e+document.body.scrollTop;}}else{H=H+A.offsetHeight;}}if(z){var r=28;H-=r;}H=H+5+this.overrideY-e;if(this.div.offsetHeight>(getDocumentClientHeight()-20)){H=5;}this.div.style.top=H;if(this.level==0){window.menusAreOpen=true;}this.div.style.zIndex=1500;var t=isIE?3:2;var F=isIE?19:17;if(s>0&&this.level==0){for(j=0;j<p.length;j++){p[j].style.left=M-F;}}if(this.scaletolauncher){if(this.div.offsetWidth<this.span.offsetWidth){this.div.style.width=this.span.offsetWidth;V.style.width="100%";}}if(isIE){nlInsertCanvas(this.div);}this.isOpen=true;if(this.onAfterOpen){this.onAfterOpen();}};NLMenu.prototype.close=function(){if(!this.isOpen){return;}if(this.level==0){window.menusAreOpen=false;}if(this.nMenuStyle==NLMENU_STYLE_ACTION||this.nMenuStyle==NLMENU_STYLE_CUSTOMIZE){if(this.nMenuStyle==NLMENU_STYLE_CUSTOMIZE){this.span.className=this.span.className.replace("_hover","");}else{this.span.className="";}this.div.style.visibility="hidden";this.isOpen=false;if(this.currentCell!=null&&this.currentCell.className!="ddmTextSeperator"&&this.currentCell.className!="ac_text_heading"){this.currentCell.className="ac_text";}return;}else{if(this.nMenuStyle==NLMENU_STYLE_PORTLET){this.div.style.visibility="hidden";this.isOpen=false;if(this.currentCell!=null&&this.currentCell.className!="ddmTextSeperator"&&this.currentCell.className!="ac_text_heading"){this.currentCell.className="ac_text";}if(this.onCloseAction!=null){this.onCloseAction();}return;}}nlRemoveCanvas(this.div);document.body.removeChild(this.div);this.currentCell=null;this.div=null;this.isOpen=false;if(this.onCloseAction!=null){this.onCloseAction();}};NLMenu.prototype.getCellInMenuAt=function(a){return this.div.firstChild.rows[a].cells[0];};NLMenu.prototype.getCurrentCellInMenu=function(){return this.currentCell;};NLMenu.prototype.setCurrentCellInMenu=function(a){if(!this.isOpen){return;}if(this.currentCell!=null&&this.currentCell.className!="ddmTextSeperator"&&this.currentCell.className!="ac_text_heading"){if(this.nMenuStyle==NLMENU_STYLE_ACTION||this.nMenuStyle==NLMENU_STYLE_PORTLET||this.nMenuStyle==NLMENU_STYLE_CUSTOMIZE){this.currentCell.className="ac_text";}else{this.currentCell.className="ddmText";}}if(a!=null&&a.className!="ddmTextSeperator"&&a.className!="ac_text_heading"){if(this.nMenuStyle==NLMENU_STYLE_ACTION||this.nMenuStyle==NLMENU_STYLE_PORTLET||this.nMenuStyle==NLMENU_STYLE_CUSTOMIZE){a.className="ac_text_sel";}else{a.className="ddmTextOver";}}this.currentCell=a==null?this.div.firstChild.rows[0].cells[0]:a;};NLMenu.prototype.getIndex=function(a){for(i=0;i<this.values.length;i+=2){if(this.values[i]==a){return i/2;}}return 0;};NLMenu.prototype.showHide=function(a){clearAllMenusExcept(this.tabName);this.becomeCurrent();if(this.nMenuStyle==NLMENU_STYLE_ACTION||this.nMenuStyle==NLMENU_STYLE_PORTLET||this.nMenuStyle==NLMENU_STYLE_CUSTOMIZE){this.openActionMenu(null,a);}else{this.open(null,a);}return true;};NLMenu.prototype.handleMouseMove=function(b){if(!this.isOpen){return;}var a=getEventTarget(b);while(a!=null){if((a.className!=null)&&((a.className=="ddmText")||(a.className=="ddmTextHasChild")||(a.className=="ddmTextSeperator")||(a.className=="ac_text_heading")||(a.className=="ac_text"))){this.setCurrentCellInMenu(a);break;}a=a.parentNode;}};NLMenu.prototype.becomeCurrent=function(){if(window.currentMenu!=this){window.currentMenu=this;}};function loadDelayedScriptReference(c,b){var a=document.getElementById("nmdscript"+c);if(a!=null&&(a.src==null||a.src.length==0)){lastMenuRequested=b;var d=a._actualsrc;a.src=d;return true;}return false;}function loadDelayedNMD(e,a){lastMenuRequested=a;var c=document.createElement("script");c.setAttribute("type","text/javascript");var d,g;if("cneg21_d1"==a){d="/core/elements/compound/NLRecentMenu.nl?t="+getStickyTag("RECENTRECORDS");g="nmdscript-21";}else{if("cneg6_d1"==a){d="/core/elements/compound/NLShortcutMenu.nl?t="+getStickyTag("RECENTRECORDS");g="nmdscript-6";}else{if(a.indexOf("_recentreports")>0){var f=a.indexOf("neg")==1?"-":"";var b=a.substring(f=="-"?4:1,a.indexOf("_"));d="/core/elements/compound/NLRecentReports.nl__t="+getStickyTag("RECENTREPORTS")+"&sections="+f+b+".nlqs";g="nmdscriptcneg9_recentreports";}else{if("cRR_d1"==a){d="/core/elements/compound/NLRoleMenu.nl?t="+getStickyTag("ROLEMENU");g="nmdscript-RR";}else{d="/app/center/NLNavMenuData.nl__t="+getStickyTag("NAVMENUS")+"&sections="+e+".nlqs";g="nmdscript"+e;}}}}c.setAttribute("src",d);c.setAttribute("id",g);document.getElementsByTagName("head")[0].appendChild(c);return true;}function loadDelayedNMD(e,a){lastMenuRequested=a;var c=document.createElement("script");c.setAttribute("type","text/javascript");var d,g;if("cneg21_d1"==a){d="/core/elements/compound/NLRecentMenu.nl?t="+getStickyTag("RECENTRECORDS");g="nmdscript-21";}else{if("cneg6_d1"==a){d="/core/elements/compound/NLShortcutMenu.nl?t="+getStickyTag("RECENTRECORDS");g="nmdscript-6";}else{if(a.indexOf("_recentreports")>0){var f=a.indexOf("neg")==1?"-":"";var b=a.substring(f=="-"?4:1,a.indexOf("_"));d="/core/elements/compound/NLRecentReports.nl__t="+getStickyTag("RECENTREPORTS")+"&sections="+f+b+".nlqs";g="nmdscriptcneg9_recentreports";}else{if("cRR_d1"==a){d="/core/elements/compound/NLRoleMenu.nl?t="+getStickyTag("ROLEMENU");g="nmdscript-RR";}else{d="/app/center/NLNavMenuData.nl__t="+getStickyTag("NAVMENUS")+"&sections="+e+".nlqs";g="nmdscript"+e;}}}}c.setAttribute("src",d);c.setAttribute("id",g);document.getElementsByTagName("head")[0].appendChild(c);return true;}function getMenu(b,c){var a=menus[b];if(a==null){if(!menuDataExists(b)){loadDelayedNMD(b,b);return null;}a=new NLMenu(b,window.menuData[b],window.menuLevel[b],window.menuParent[b],c);menus[b]=a;if(a.level==0){var d=0;menuTimers[a.tabName]=d;}}return a;}function menuDataExists(a){if(!isOffline()&&(window.menuData==null||window.menuData[a]==null||window.menuData[a].length<1)){return false;}else{return true;}}function deleteMenu(b){var a=menus[b];if(a!=null){menus[b]=null;}}var lastMenuRequested=null;var lastMenuRequestedParent=null;function openLastMenuRequested(){try{var a=lastMenuRequested;lastMenuRequested=null;if(a==null||!menuDataExists(a)){return false;}var b=lastMenuRequestedParent;if(b!=null){lastMenuRequestedParent=null;if(document.getElementById(b)!=null){return getMenu(a).open(b,false);}}else{return getMenu(a).showHide(true);}}catch(c){}}function showMenu(k,h,d,b,f){try{if(!window.loadcomplete){if(isNaN(b)){b=0;}b++;setTimeout(function(){showMenu(k,h,d,b,f);},1000*b+1);return false;}var c=document.getElementById(k);if(c!=null){var a=c.id.substring(4,c.id.length);if((!window.menuData||window.menuData[a]==null)&&d!=null){return loadDelayedNMD(d,a);}if(!menuDataExists(a)){return false;}lastMenuRequested=null;return getMenu(a,f).showHide(h);}}catch(g){}}function setNLMenuBackground(f,e){var c=document.getElementById(f);if(c!=null){var b=c.parentNode;var d=c.parentNode.previousSibling;var a=c.parentNode.nextSibling;if(e){b.className=b.className.replace("bgofftab","bghovertab");if(d&&d.className){d.className=d.className.replace("bgofftab","bghovertab");d.className=d.className.replace("bgtabrborder","bgtabrborder_s");}if(a&&a.className){a.className=a.className.replace("bgtabrborder","bgtabrborder_s");}}else{b.className=b.className.replace("bghovertab","bgofftab");if(d&&d.className){d.className=d.className.replace("bghovertab","bgofftab");d.className=d.className.replace("bgtabrborder_s","bgtabrborder");}if(a&&a.className){a.className=a.className.replace("bgtabrborder_s","bgtabrborder");}}}}function setPortletMenuBackground(c,b){var a=document.getElementById(c);if(a!=null){if(b){a.firstChild.className=a.firstChild.className.replace("portletIconMenu","portletIconMenuSel");}else{a.firstChild.className=a.firstChild.className.replace("portletIconMenuSel","portletIconMenu");}}}var currentDropdown=null;var dropdownCounter=0;window.dropdownloadtime=0;var DROPDOWNSTYLE_HOVER=1;var DROPDOWNSTYLE_STATIC=2;function makeDropdown(A,u,d,l,v,t,w,f,o,b,e,n,p,c){var k=new Date();if(e==null){e=document;}if(l==null){l=0;}var g="";if(d.length<1){d=["",""];}else{for(var x=0;x<d.length;x+=2){if(d[x].indexOf("&")>-1){d[x]=unEscapeHtml(d[x]);}if(d[x].length>g.length+2||(Math.abs(d[x].length-g.length)<=2&&(getTextWidth(d[x])>getTextWidth(g)))){g=d[x];}}}var h=++dropdownCounter;var q=A+h;if(t==""){t=" ";}if(p!=null){var s=e.createElement("INPUT");s.name="inpt_"+A;s.id="inpt_"+q;s.type="text";s.className="dropdownInput textbox";s.value=t;s.contentEditable="false";s.autocomplete="off";s.onkeydown=new Function("event","getDropdown(this).handleKeydown(event)");s.onkeypress=new Function("event","getDropdown(this).handleKeypress(event)");if(f!=null){s.onfocus=new Function("event",'getElementById("hddn_'+q+'").onfocus(event); this.select();');}else{s.onfocus=new Function("event","this.select();");}p.appendChild(s);var a=e.createElement("SPAN");a.className="ddarrowSpan";a.innerHTML="<img id='inpt_"+q+"_arrow' src='/images/nav/ns_x.gif' height='20' width='20' class='i_dropdownarrow'/>";p.appendChild(a);var r=e.createElement("INPUT");r.name=A;r.id="hddn_"+q;r.type="hidden";r.className="nldropdown";r.value=v;if(w!=null){r.onchange=(typeof w=="function")?w:new Function(w);}if(f!=null){r.onfocus=(typeof f=="function")?f:new Function(f);}p.appendChild(r);var m=e.createElement("INPUT");m.id="indx_"+q;m.type="hidden";m.value=l;p.appendChild(m);}else{if(w!=null){w='onchange="'+w+'"';}else{w="";}if(f!=null){f='onfocus="'+f+'"';}else{f="";}if(o!=null){o='onblur="'+o+'"';}else{o="";}if(c){e.write("<span onmouseout=\"this.className=this.className.replace('_roll','');\" onmouseover=\"if (this.className.indexOf('_focus') == -1) {this.className=this.className+'_roll';}\" class='effectHover'>");}e.write("<input name='inpt_"+A+"' id='inpt_"+q+"' type='text' value='"+t+"' class='dropdownInput textbox' onkeydown='getDropdown(this).handleKeydown(event);' onkeypress='getDropdown(this).handleKeypress(event);' onfocus='getDropdown(this).handleOnFocus(event);' onblur='getDropdown(this).handleOnBlur(event);' contenteditable='false' autocomplete='off' >");e.write("<span class='ddarrowSpan'><img id='inpt_"+q+"_arrow' src='/images/nav/ns_x.gif' height='20' width='20' class='i_dropdownarrow'/></span>");e.write("<input name='"+A+"' id = 'hddn_"+q+"' type='hidden' class='nldropdown' value='"+v+"' "+w+" "+f+" "+o+" />");e.write("<input id = 'indx_"+q+"' type='hidden' value='"+l+"' />");if(c){e.write("</span>");}}var y=new NLDropdown(A,d,l,h,e);if(window.dropdowns[q]==null){window.dropdowns[q]=y;}y.setWidth(u,b,g);y.flags=n;y.bRequired=y.hasAttribute(128);y.disabled=y.hasAttribute(2048);y.typeAhead=y.hasAttribute(2147483648);if(y.hasAttribute(2048)){y.setDisabled(true);}if(y.hasAttribute(1073741824)){y.setArrowImage("");}var z=new Date();window.dropdownloadtime+=(z.getTime()-k.getTime());return y;}function unEscapeHtml(b){if(b==null){return null;}if(b.length==0){return"";}var d=document.createElement("a");d.innerHTML=b+"\n";var c=d.firstChild;if(c!=null&&c.nodeName!="#text"){c=c.firstChild;}if(c!=null){var a=c.data;if(a.charAt(a.length-1)==" "){a=a.substr(0,a.length-1);}return a;}else{return"";}}function dropdownOnMouseDown(f){if(!window.loadcomplete||!NS.form.isValid()){return true;}var c=getEventTarget(f);if(isNLMultiDropDown(c)){var e=c.getAttribute("nlmultidropdown");getMultiDropdownFromNameC(e).handleMouseDown(f);}var a=null;var b=false;if(c&&(c.className=="i_dropdownarrow")){a=document.getElementById(c.id.replace("_arrow",""));b=true;}if(a==null){a=findClassUp(c,"dropdownInput textbox");}if(a!=null){if(b){try{setTimeout(function(){getDropdown(a).inpt.focus();getDropdown(a).inpt.select();},1);getDropdown(a).inpt.focus();}catch(d){}}return getDropdown(a).handleMouseDown(f);}}function dropdownOnMouseUp(d){var b=getEventTarget(d);if(b.tagName!=null&&b.tagName.toLowerCase()=="scrollbar"){return;}if(currentMultiDropdown!=null&&currentMultiDropdown.onMouseMoveIdx!=-1){currentMultiDropdown.onMouseMoveIdx=-1;currentMultiDropdown=null;}else{if(currentDropdown!=null){var a=findClassUp(b,"dropdownInput textbox");if(a==null&&currentDropdown.seenMouseMove){if(b.className=="dropdownDiv"){return;}var c=findClassUp(b,"dropdownSelected");if(c!=null){currentDropdown.setAndClose(c.nlrow);}currentDropdown.close();currentDropdown=null;}}}}var lastX=0;var lastY=0;function dropdownOnMouseMove(b){if(isIE){b=event;}if(b.clientX==lastX&&b.clientY==lastY){return;}lastX=b.clientX;lastY=b.clientY;var a=getEventTarget(b);if(currentMultiDropdown!=null){currentMultiDropdown.handleMouseMove(b);}if(currentDropdown!=null){currentDropdown.handleMouseMove(b);}}function dropdownOnKeyDown(d){var b=getEventTarget(d);var a=findClassUp(b,"dropdownInput textbox");if(isNLMultiDropDown(b)){var c=b.getAttribute("nlmultidropdown");return getMultiDropdownFromNameC(c).handleKeydown(d);}else{return true;}}function getButtonId(a){if(isIE){return event.button;}else{if(isNS){return a.button;}else{return null;}}}function dumpObj(a){for(var c in a){var b=c+": "+a[c];document.body.appendChild(document.createTextNode(b));document.body.appendChild(document.createElement("BR"));}}NLDropdown.prototype.handleOnFocus=function NLDropdown_handleOnFocus(a){if(this.hddn.onfocus){this.hddn.onfocus(a);}this.inpt.select();this.doOnChangeWhenBlur=false;};NLDropdown.prototype.handleOnBlur=function NLDropdown_handleOnBlur(a){if(this.hddn.onblur){this.hddn.onblur(a);}if(this.doOnChangeWhenBlur&&this.hddn.onchange){this.hddn.onchange();}};NLDropdown.prototype.setMandatoryBackgroundColor=function NLDropdown_setMandatoryBackgroundColor(a){this.sMandatoryBgColor=a;};NLDropdown.prototype.hasAttribute=function NLDropdown_hasAttribute(a){return(this.flags&a)!=0;};function NLDropdown(a,k,e,h,c){if(a==null){throw"cannot create dropdown with null name";}if(k==null){throw"cannot create dropdown with null values";}this.name=a;this.nameC=a+h;this.textArray=new Array(k.length/2);this.valueArray=new Array(k.length/2);this.valueToIndexMap=new Array();this.defaultIndex=e;this.indexAtRenderTime=e;this.isOpen=false;this.divWidthHasBeenSet=false;this.disabled=false;this.div=null;this.currentCell=null;this.searchString="";this.typeAhead=false;this.cancelEventOnEnterKey=false;this.width=null;this.flags=0;this.sMandatoryBgColor="#FFFFFF";this.bRequired=false;this.initializeElements(c);this.bInitialize=true;for(var f=0,d=0;f<k.length;f+=2,d++){var g=k[f];var b=k[f+1];this.textArray[d]=g;this.valueArray[d]=b;this.valueToIndexMap[String(b)]=d;}this.setIndex(e,true);}NLDropdown.prototype.initializeElements=function NLDropdown_initializeElements(c){if(c==null){var d=(window.parentAccesible&&typeof parent!="undefined"&&typeof parent.Ext!="undefined");if(d&&parent.Ext.WindowMgr.getActive()!=null){var a=parent.Ext.WindowMgr.getActive();var b=(a.body.dom.contentWindow?a.body.dom.contentWindow:window.frames[a.getId()+"_frame"]);if((typeof b!="undefined")&&b!=null){c=b.document;}else{c=document;}}else{c=document;}}this.inpt=c.getElementById("inpt_"+this.nameC);this.ddbtn=this.inpt;this.hddn=c.getElementById("hddn_"+this.nameC);this.indx=c.getElementById("indx_"+this.nameC);this.span=this.inpt.parentNode;if(!this.isSelectable()){this.inpt.unselectable="on";}this.elementsAreInitialized=true;this.bInitialize=false;};NLDropdown.prototype.setWidth=function NLDropdown_setWidth(b,f,e){var d=null;if(f!=null){this.minimumWidth=f;}if(b!=null){this.width=b;this.setWidthDirect(b);d=b;}else{if(e!=null){var a=getTextWidth(e);d=Math.max((a+10),(f==null?0:f));d+=15;this.setWidthDirect(d);}else{if(this.div==null){this.buildDiv();}var g=this.div;var c;document.body.insertBefore(g,document.body.firstChild);if(g.offsetHeight<200){c=g.offsetWidth+5+10;if(c<40){c=40;}}else{c=g.offsetWidth+15+10;}document.body.removeChild(g);if(this.inpt.originalWidth!=c){d=c;this.setWidthDirect(c);this.inpt.originalWidth=null;if(this.inpt.afterWidthSet!=null){this.inpt.afterWidthSet();}}}}this.setText(null,true);};NLDropdown.prototype.setWidthDirect=function NLDropdown_setWidthDirect(a){if((this.minimumWidth!=null)&&(a<this.minimumWidth)){a=this.minimumWidth;}a=Math.min(a,300);this.inpt.style.width=a+"px";this.inptWidth=a;};NLDropdown.prototype.buildDiv=function NLDropdown_buildDiv(){var e=document.createElement("div");this.div=e;e.className="dropdownDiv";e.unselectable=this.inpt.unselectable;e.style.zIndex=1001;this.divWidthHasBeenSet=false;var c=new Array(this.textArray.length);this.divArray=c;var b,a;for(b=0;b<this.textArray.length;b++){var d=this.textArray[b];if(d==null||d.length==0){d="&nbsp;";}a=document.createElement("div");c[b]=a;if(d!="&nbsp;"){d=d.escapeHTML();}a.innerHTML=d;a.unselectable=e.unselectable;a.id="nl"+ ++tdCounter;a.nlrow=b;a.className="dropdownNotSelected";e.appendChild(a);}e.onkeydown=new Function("event","getDropdownFromNameC('"+this.nameC+"').handleKeydown(event)");e.onkeypress=new Function("event","getDropdownFromNameC('"+this.nameC+"').handleKeypress(event)");e.onmousedown=new Function("return false;");};NLDropdown.prototype.sizeDiv=function NLDropdown_sizeDiv(){var b=this.div;if(!this.divWidthHasBeenSet){var c=b.offsetWidth;var k=this.inpt.offsetWidth;b.style.overflow="hidden";if(c<k){b.style.width=k+"px";}else{b.style.width=c+4+"px";}}var h=findPosY(this.inpt);var g=h-document.body.scrollTop;var d=getDocumentHeight()-((h-document.body.scrollTop)+this.inpt.offsetHeight);var e=Math.max(g,d);if(b.offsetHeight<Math.min(200,e)){if(isNS){var f=b.offsetHeight;b.style.height=f+"px";if(b.offsetHeight>f){b.style.height=((f*2<b.offsetHeight)?0:(f*2-b.offsetHeight))+"px";}}}else{var a=Math.min(e,200);b.style.height=a-2+"px";b.style.overflow="auto";if(!this.divWidthHasBeenSet){if(isIE){b.style.width=b.offsetWidth+18+"px";}else{if(isNS){b.style.width=b.offsetWidth-12+"px";}}}}this.divWidthHasBeenSet=true;};NLDropdown.prototype.getForm=function NLDropdown_getForm(){var a=null;try{a=this.elementsAreInitialized?this.hddn.form:null;}catch(b){this.elementsAreInitialized=false;this.bInitialize=true;}return a;};NLDropdown.prototype.open=function NLDropdown_open(){if(this.bInitialize){this.initializeElements();}if(this.disabled||this.textArray.length==0){return;}if(this.div==null){this.buildDiv();}this.div.style.visibility="hidden";var f=(window.parentAccesible&&typeof parent!="undefined"&&typeof parent.Ext!="undefined");var c=(f?parent.Ext.WindowMgr.getActive():null);var e=(c!=null?(c.body.dom.contentWindow?c.body.dom.contentWindow:window.frames[c.getId()+"_frame"]):null);var b=false;if(c!=null&&e==null&&c.body.dom!=null&&c.body.dom.id.indexOf("popup")>0){b=true;var d=this.inpt.parentNode.insertBefore(this.div,this.inpt.nextSibling);}else{var a=(e!=null?(e.document):document);a.body.insertBefore(this.div,a.body.firstChild);}this.sizeDiv();if(this.hasAttribute(256)){this.positionRelativeDiv();}else{if(!b){this.positionDiv(this.inpt,this.div);}}this.isOpen=true;this.seenMouseMove=false;this.setCurrentCellInMenu(null);if(isIE&&this.currentCell!=null){this.div.scrollTop=this.currentCell.offsetTop;}if(!this.hasAttribute(256)){if(isIE){nlInsertCanvas(this.div);}}this.div.style.visibility="visible";};NLDropdown.prototype.positionRelativeDiv=function NLDropdown_positionRelativeDiv(){this.span.style.zIndex=1;this.span.insertBefore(this.div,this.span.firstChild);var a=findPosX(this.span);var b=findPosY(this.span);this.div.style.left=0;if((b+this.inpt.offsetHeight+this.div.offsetHeight)-document.body.scrollTop>getDocumentHeight()){this.div.style.top=3-this.div.offsetHeight;}else{this.div.style.top=this.inpt.offsetHeight-1;}};NLDropdown.prototype.positionDiv=function NLDropdown_positionDiv(d,f){var k=findAbsolutePosX(d);var b=f.offsetWidth;var a=document.body.scrollLeft;var l=getDocumentClientWidth();if(k+b-a<=l){f.style.left=k+"px";}else{f.style.left=l-b+a+"px";}var g=findAbsolutePosY(d);var h=f.offsetHeight;var e=d.offsetHeight;var c=getDocumentClientHeight();if(g+e+h>c){f.style.top=Math.max(g-h,0)+"px";}else{if(isIE){f.style.top=g+e-1+"px";}else{if(isNS){f.style.top=g+e-2+"px";}}}};NLDropdown.prototype.close=function NLDropdown_close(){if(!this.isOpen){return;}if(this.indexOnDeck!=null){this.setIndex(this.indexOnDeck);this.indexOnDeck=null;}if(this.currentCell!=null){this.currentCell.className="dropdownNotSelected";this.currentCell=null;}this.span.style.zIndex="";if(!this.hasAttribute(256)){nlRemoveCanvas(this.div);}this.div.parentNode.removeChild(this.div);this.isOpen=false;};NLDropdown.prototype.isSelectable=function NLDropdown_isSelectable(){return this.span.unselectable=="on"?false:true;};NLDropdown.prototype.setFocus=function NLDropdown_setFocus(){try{this.inpt.focus();if(this.isSelectable()){this.inpt.select();}}catch(a){}};NLDropdown.prototype.setText=function NLDropdown_setText(a,b){if(a==null){a=this.getText();}this.inpt.title=a;if(a==null||a==""){a=" ";}a=elideTxt(a,this.inptWidth-17);this.inpt.value=a;if(!b||this==currentDropdown){try{this.inpt.focus();if(!this.isOpen&&this.isSelectable()){this.inpt.select();}}catch(c){}}};NLDropdown.prototype.getText=function NLDropdown_getText(a){if(a==null){a=this.getIndex();}if((a==null)||(a<0)||(a>this.textArray.length)){return"";}return this.textArray[a];};NLDropdown.prototype.getValue=function(){var a=this.hddn.value;return a;};NLDropdown.prototype.getTexts=function(){return this.textArray;};NLDropdown.prototype.getValues=function(){return this.valueArray;};NLDropdown.prototype.setAndClose=function NLDropdown_setAndClose(a){this.indexOnDeck=null;this.close();this.setIndex(a);};function getNext(b){var a=b.firstChild;if(a==null){a=b.nextSibling;if((a==null)&&(a.parentNode!=null)){a=b.parentNode.nextSibling;}}return a;}NLDropdown.prototype.setCurrentCellInMenu=function NLDropdown_setCurrentCellInMenu(a){if(!this.isOpen){return;}var b=a;if(a==null){var c=this.getIndex();if(c<0||c>this.divArray.length||c===undefined){c=0;}a=this.divArray[c];}if(this.currentCell!=null){this.currentCell.className="dropdownNotSelected";}if(a!=null){a.className="dropdownSelected";}this.currentCell=a;};NLDropdown.prototype.getIndex=function NLDropdown_getIndex(){return Number(this.indx.value);};NLDropdown.prototype.setIndex=function NLDropdown_setIndex(d,c){if(d==null){return;}d=Number(d);if(d<0||d>=this.valueArray.length){return;}var a=this.getIndex();this.indx.value=d;this.hddn.value=this.valueArray[d];this.setText(this.textArray[d],c);if(a==d){return;}if((!c)&&(this.hddn.onchange!=null)){var b=this.hddn.onchange();if(b==false){this.indx.value=a;this.hddn.value=this.valueArray[a];this.setText(this.textArray[a],c);return;}}};NLDropdown.prototype.setValue=function NLDropdown_setValue(c,b){var a=this.getIndexForValue(c);if(a==null){return;}this.setIndex(a,b);};NLDropdown.prototype.getValueAtIndex=function NLDropdown_getValueAtIndex(a){return this.valueArray[a];};NLDropdown.prototype.getTextAtIndex=function NLDropdown_getTextAtIndex(a){return this.textArray[a];};NLDropdown.prototype.respondToArrow=function NLDropdown_respondToArrow(h){var c;if(this.matchTimeout!=null){clearTimeout(this.matchTimeout);this.matchTimeout=null;}if(this.currentCell==null){if(this.arrowIndex==null){c=this.getIndex();}else{c=this.arrowIndex;}}else{c=this.currentCell.nlrow;}c+=h;if(c<0){c=0;}if(c>=this.valueArray.length){c=this.valueArray.length-1;}if(this.isOpen){var a=this.textArray[c];this.setText(a);this.setCurrentCellInMenu(this.divArray[c]);var g=this.currentCell.parentNode.scrollTop;var b=this.currentCell.offsetTop;var e=getElementContentHeight(this.currentCell.parentNode);var d=this.currentCell.offsetHeight;if(g>b){this.currentCell.scrollIntoView(true);}else{if(g+e<b+d){this.currentCell.scrollIntoView(false);}}this.indexOnDeck=c;}else{var f=this.valueArray[c];if((f==-1)&&(h>0)){if(c+1<this.valueArray.length){this.respondToArrow(h+1);}}else{this.arrowIndex=c;this.matchTimeout=setTimeout("this.getDropdownFromNameC('"+this.nameC+"').arrowIndex = null; this.getDropdownFromNameC('"+this.nameC+"').setIndex("+c+");",0);}}};NLDropdown.prototype.gotoNext=function NLDropdown_gotoNext(h){if(this.searchStringTimeout!=null){clearTimeout(this.searchStringTimeout);this.searchStringTimeout=null;}if(this.matchTimeout!=null){clearTimeout(this.matchTimeout);this.matchTimeout=null;this.arrowIndex==null;}var f=this.getIndex();if(this.currentCell!=null){f=this.currentCell.nlrow;}var b=f;var c;var e=this.textArray.length;this.searchString+=String.fromCharCode(h).toUpperCase();if(this.searchString.length==1){++b;}var a=false;for(var g=0;g<e;g++){c=b%e;var d=this.textArray[c].substr(getTypeAheadStartIndex(this.textArray[c]),this.searchString.length).toUpperCase();if(d==this.searchString){a=true;break;}++b;}if(a){if(this.isOpen){this.setText(this.textArray[c]);this.setCurrentCellInMenu(this.divArray[c]);this.div.scrollTop=this.currentCell.offsetTop;this.indexOnDeck=c;}else{var k=this;this.doOnChangeWhenBlur=true;this.matchTimeout=setTimeout(function(){k.setIndex(c,true);},0);}}if(this.typeAhead==true){this.searchStringTimeout=setTimeout("clearSearchString('"+this.nameC+"')",2000);}else{this.searchString="";}};function getTypeAheadStartIndex(b){for(var a=0;a<b.length;a++){if(b.charCodeAt(a)!=32&&b.charCodeAt(a)!=160){return a;}}return 0;}function clearSearchString(a){getDropdownFromNameC(a).searchString="";}NLDropdown.prototype.getTextForValue=function NLDropdown_getTextForValue(b){var a=this.getIndexForValue(b);if(a!=null){return this.textArray[a];}else{return"";}};NLDropdown.prototype.getIndexForText=function NLDropdown_getIndexForText(b){for(var a=0;a<this.textArray.length;a++){if(trim(this.textArray[a])==trim(b)){return a;}}return -1;};NLDropdown.prototype.getIndexForValue=function NLDropdown_getIndexForValue(a){return this.valueToIndexMap[String(a)];};NLDropdown.prototype.restoreToOriginalValue=function NLDropdown_restoreToOriginalValue(){this.setIndex(this.indexAtRenderTime,true);};NLDropdown.prototype.gotoDefault=function NLDropdown_gotoDefault(){this.setIndex(this.defaultIndex,true);};NLDropdown.prototype.resetDropDown=function NLDropdown_resetDropDown(){this.gotoDefault();};NLDropdown.prototype.setDefaultIndex=function NLDropdown_setDefaultIndex(a){if(a==null){return;}if(this.bInitialize){this.initializeElements();}this.defaultIndex=Number(a);};NLDropdown.prototype.handleMouseDown=function NLDropdown_handleMouseDown(a){this.becomeCurrent();if(this.isOpen){this.close();}else{this.open();}};NLDropdown.prototype.handleKeydown=function NLDropdown_handleKeydown(c){if(this.disabled){return true;}if(this.bInitialize){this.initializeElements();}var b=getEventKeypress(c);switch(b){case 8:case 16:case 17:case 18:case 20:case 46:case 93:return;}this.becomeCurrent();switch(b){case 9:this.handleOnBlur(c);this.close();currentDropdown=null;break;case 13:if(this.currentCell!=null){var a=this.currentCell.nlrow;this.setIndex(a);}else{this.handleOnBlur(c);this.doOnChangeWhenBlur=false;}if(this.isOpen){this.close();if(!this.cancelEventOnEnterKey){setEventCancelBubble(c);setEventPreventDefault(c);}}break;case 38:if(getEventAltKey(c)){if(this.isOpen){this.close();}}else{this.respondToArrow(-1);setEventCancelBubble(c);setEventPreventDefault(c);}break;case 40:if(getEventAltKey(c)){if(!this.isOpen){this.open();}}else{this.respondToArrow(+1);setEventCancelBubble(c);setEventPreventDefault(c);}break;case 37:case 39:return true;case 33:this.respondToArrow(-14);if(this.isOpen){this.div.scrollTop=this.currentCell.offsetTop;}setEventCancelBubble(c);setEventPreventDefault(c);break;case 34:this.respondToArrow(+14);if(this.isOpen){this.div.scrollTop=this.currentCell.offsetTop;}setEventCancelBubble(c);setEventPreventDefault(c);break;case 35:this.respondToArrow(this.valueArray.length);if(this.isOpen){this.div.scrollTop=this.currentCell.offsetTop;}setEventCancelBubble(c);setEventPreventDefault(c);break;case 36:this.respondToArrow(-this.valueArray.length);if(this.isOpen){this.div.scrollTop=this.currentCell.offsetTop;}setEventCancelBubble(c);setEventPreventDefault(c);break;default:break;}};NLDropdown.prototype.handleKeypress=function NLDropdown_handleKeypress(b){if(this.disabled){return true;}if(this.bInitialize){this.initializeElements();}this.becomeCurrent();var a=getEventKeypress(b);switch(a){case 9:break;case 13:if(this.isOpen){setEventCancelBubble(b);setEventPreventDefault(b);}break;default:this.gotoNext(a);setEventPreventDefault(b);break;}};NLDropdown.prototype.handleMouseMove=function NLDropdown_handleMouseMove(b){if(!this.isOpen){return true;}this.seenMouseMove=true;var a=getEventTarget(b);while(a!=null){if((a.className!=null)&&(a.className=="dropdownNotSelected")){this.setCurrentCellInMenu(a);break;}a=a.parentNode;}};NLDropdown.prototype.becomeCurrent=function NLDropdown_becomeCurrent(){if((currentDropdown!=null)&&(currentDropdown!=this)){currentDropdown.close();}if(currentDropdown!=this){currentDropdown=this;this.indexOnDeck=null;}};NLDropdown.prototype.setDisabled=function NLDropdown_setDisabled(a){this.disabled=a;this.inpt.disabled=a;this.hddn.disabled=a;if(this.disabled){this.close();if(this.span.className&&this.span.className.indexOf("effectDisabled")<0){this.span.className=this.span.className+" effectDisabled";}}else{if(this.span.className&&this.span.className.indexOf("effectStatic")<0){this.span.className=this.span.className.replace(" effectDisabled"," effectStatic");}else{this.span.className=this.span.className.replace(" effectDisabled","");}}if(this.div==null&&this.width==null){this.setWidth();}};NLDropdown.prototype.setHidden=function NLDropdown_setHidden(a){this.span.style.display=a?"none":"";};NLDropdown.prototype.addOption=function NLDropdown_addOption(e,d,a){if(d==null){throw"cannot create an option with null value";}if(e==null){throw"cannot create an option with null text";}var c=(this.textArray.length==0);e=String(e);if(e.indexOf("&")>-1){e=unEscapeHtml(e);}d=String(d);if(typeof(a)==="undefined"||a>this.valueArray.length){a=this.valueArray.length;}for(var b=a;b<this.valueArray.length;++b){this.valueToIndexMap[this.valueArray[b]]=b+1;}this.valueToIndexMap[d]=a;this.textArray.splice(a,0,e);this.valueArray.splice(a,0,d);if(this.defaultIndex>=a){++this.defaultIndex;}if(this.getIndex()>=a){this.setIndex(this.getIndex()+1,true);}this.div=null;if(c){this.defaultIndex=0;this.setIndex(0,true);}if(!this.disabled&&this.width==null){this.setWidth();}};NLDropdown.prototype.deleteAllOptions=function NLDropdown_deleteAllOptions(){this.close();this.valueArray.length=0;this.textArray.length=0;this.valueToIndexMap=new Array();this.div=null;this.defaultIndex=0;this.setText("",true);this.hddn.value="";this.indx.value="-1";};NLDropdown.prototype.deleteOneOption=function NLDropdown_deleteOneOption(d,c){d=String(d);var a=this.valueToIndexMap[d];if(a==null){return;}this.close();for(var b=a+1;b<this.valueArray.length;++b){this.valueToIndexMap[this.valueArray[b]]=b-1;}delete this.valueToIndexMap[d];this.valueArray.splice(a,1);this.textArray.splice(a,1);this.div=null;if(!c&&this.width==null){this.setWidth();}if(a==this.defaultIndex){this.defaultIndex=0;}else{if(this.defaultIndex>a){--this.defaultIndex;}}if(this.getIndex()>a){this.setIndex(this.getIndex()-1,true);}if(d==this.getValue()){this.gotoDefault();}};NLDropdown.prototype.setOptionText=function NLDropdown_setOptionText(c,b){c=String(c);var a=this.valueToIndexMap[c];if(a==null){return;}this.close();this.textArray[a]=b;if(c==this.getValue()){this.setText(b,true);}this.div=null;if(this.width==null){this.setWidth();}};NLDropdown.prototype.setArrowImage=function NLDropdown_setArrowImage(a){if(!this.overrideImage){if(a=="/images/forms/ddarrow.gif"||a=="/images/forms/ddarrowPress.gif"||a=="/images/forms/ddarrowDisabled.gif"){a=getZoomFile(a);}if(a){this.ddbtn.style.backgroundImage="url("+a+")";}else{this.ddbtn.style.backgroundImage="";}}};NLDropdown.prototype.overrideArrowImage=function NLDropdown_overrideArrowImage(a){this.ddbtn.style.backgroundImage="url("+a+")";this.overrideImage=true;};NLDropdown.prototype.setBackgroundColor=function NLDropdown_setBackgroundColor(a){this.inpt.style.backgroundColor=a;};NLDropdown.prototype.setRequired=function NLDropdown_setRequired(a){this.bRequired=a;if(a){this.setBackgroundColor(this.sMandatoryBgColor);}else{this.setBackgroundColor("");}setFieldLabelRequired(this.name,a,this.getForm());};NLDropdown.prototype.setDefaultOrNotRequired=function NLDropdown_setDefaultOrNotRequired(a){this.setRequired(a?this.hasAttribute(128):false);};NLDropdown.prototype.getRequired=function NLDropdown_getRequired(a){return this.bRequired;};NLDropdown.prototype.getInput=function NLDropdown_getInput(){return this.inpt;};NLDropdown.prototype.getHiddenInput=function NLDropdown_getHiddenInput(){return this.hddn;};NLDropdown.prototype.getContainer=function NLDropdown_getContainer(){return this.span;};var dropdowns=new Array();function getDropdownFromNameC(b,c){if(typeof c=="undefined"||c==null){c=window;}var a=c.dropdowns[b];if((a==null)&&(c.parent!=null)&&(c.parent.dropdowns!=null)){a=c.parent.dropdowns[b];}return a;}function getDropdown(b,d){if(b.tagName=="SPAN"){var a=b.getElementsByTagName("INPUT");for(var c=0;c<a.length;c++){if(a[c].type=="hidden"&&a[c].id!=null&&a[c].id.indexOf("hddn_")==0){b=a[c];break;}}}if(b.id){return getDropdownFromNameC(b.id.substring(5),d);}}var textWidthDiv=document.createElement("div");textWidthDiv.className="dropdownDiv";textWidthDiv.style.position="absolute";textWidthDiv.style.padding=0;textWidthDiv.style.margin=0;textWidthDiv.style.border=0;var widthCache=new Array();function getTextWidth(a){var c=widthCache[a];if(c!=null){return c;}textWidthDiv.innerHTML=((a==" ")?"&nbsp;":a);document.body.appendChild(textWidthDiv);var b=textWidthDiv.offsetWidth;document.body.removeChild(textWidthDiv);widthCache[a]=b;return b;}function elideTxt(b,h){if(h<=0){return b;}if(getTextWidth(b)<h){return b;}b=b.replace(/^(\s|\u00A0)*/,"").replace(/(\s|\u00A0)*$/,"");if(getTextWidth(b)<h){return b;}var c="...";var f=getTextWidth(c);if(f>=h){return c;}var a=b.length;for(var e=0;e<a;e++){var d=b.length/2;b=b.substr(0,d)+b.substr(d+1);var g=getTextWidth(b);if(g+f<h){break;}}return b.substr(0,d)+c+b.substr(d);}var multidropdowns=new Object();var currentMultiDropdown=null;function getMultiDropdownFromNameC(b,c){if(c==null){c=window;}var a=c.multidropdowns[b];if((a==null)&&(c.parent!=null)&&(c.parent.multidropdowns!=null)){a=c.parent.multidropdowns[b];}return a;}function getMultiDropdown(b,d){if(b.tagName=="SPAN"&&isValEmpty(b.getAttribute("nlmultidropdown"))){var a=b.getElementsByTagName("INPUT");for(var c=0;c<a.length;c++){if(!isValEmpty(a[c].getAttribute("nlmultidropdown"))){return getMultiDropdownFromNameC(a[c].getAttribute("nlmultidropdown"),d);}}}return getMultiDropdownFromNameC(b.getAttribute("nlmultidropdown"),d);}NLMultiDropdown.prototype.setMandatoryBackgroundColor=function NLMultiDropdown_setMandatoryBackgroundColor(a){this.sMandatoryBgColor=a;};NLMultiDropdown.prototype.setRequired=function NLMultiDropdown_setRequired(a){this.bRequired=a;if(a){this.setBackgroundColor(this.sMandatoryBgColor);}else{this.setBackgroundColor("");}setFieldLabelRequired(this.name,a,this.getForm());};NLMultiDropdown.prototype.getRequired=function NLMultiDropdown_getRequired(){return this.bRequired;};NLMultiDropdown.prototype.hasAttribute=function NLMultiDropdown_hasAttribute(a){return(this.flags&a)!=0;};NLMultiDropdown.prototype.getForm=function NLMultiDropdown_getForm(){var a=null;try{a=this.hiddenField.form;}catch(b){}return a;};function NLMultiDropdown(b,k,a,l,h,d,m){if(b==null){throw"cannot create multi-select dropdown with null name";}if(k==null){throw"cannot create multi-select dropdown with null values";}this.renderDocument=d;this.name=b;this.nameC=b+h;this.textArray=new Array(k.length/2);this.valueArray=new Array(k.length/2);this.valueToIndexMap=new Array();this.defaultValues=a;this.selectedVals=isValEmpty(this.defaultValues)?new Array():this.defaultValues.split(String.fromCharCode(5));this.sMandatoryBgColor="#FFFFFF";this.bRequired=false;this.staticWidth=m;this.numRows=parseInt(l)+(!isIE?1:0);this.disabled=false;this.span=null;this.table=null;this.width=null;this.flags=0;this.hiddenField=d.getElementById("hddn_"+this.nameC);this.parentSpan=this.getParentSpan();this.parentSpan.setAttribute("nlmultidropdown",this.nameC);this.parentSpan.onmousedown=new Function("return false;");this.parentSpan.onmousemove=new Function("return false;");this.currentIdx=-1;this.previousIdx=-1;this.onMouseMoveIdx=-1;for(var g=0,e=0;g<k.length;g+=2,e++){var f=k[g];var c=k[g+1];this.textArray[e]=f;this.valueArray[e]=c;this.valueToIndexMap[String(c)]=e;}this.setWidth();this.defaultBorderColor=this.table.style.borderColor;attachEventHandler("mouseup",document,function(n){this.handleMouseUp(n);}.bind(this));}function makeMultiDropdown(b,o,n,g,h,d,c,a,p){if(d==null){d=document;}if(n.length>0){for(var e=0;e<n.length;e+=2){n[e]=trim(unEscapeHtml(n[e]));}}else{n=["",""];}var f=++dropdownCounter;var l=b+f;if(a!=null){var k=d.createElement("INPUT");k.name=b;k.id="hddn_"+l;k.type="hidden";k.setAttribute("nlmultidropdown",l);k.value=g;if(h!=null){k.onchange=(typeof h=="function")?h:new Function(h);}a.appendChild(k);}else{if(h!=null){h='onchange="'+h+'"';}else{h="";}d.write("<input name='"+b+"' id = 'hddn_"+l+"' type='hidden' nlmultidropdown='"+l+"' value='"+escapeHTMLAttr(g)+"' "+h+">");}var m=new NLMultiDropdown(b,n,g,o,f,d,p);if(window.multidropdowns[l]==null){window.multidropdowns[l]=m;}m.flags=c;if(m.hasAttribute(2048)){m.setDisabled(true);}return m;}NLMultiDropdown.prototype.getParentSpan=function NLMultiDropdown_getParentSpan(){var a=this.hiddenField.parentNode;while(a!=null){if(a.tagName=="SPAN"&&a.id!=null&&a.id.indexOf(this.name)!=-1){return a;}a=a.parentNode;}return a;};NLMultiDropdown.prototype.buildSpan=function NLMultiDropdown_buildSpan(){this.span=this.renderDocument.createElement(isIE?"span":"div");this.parentSpan.insertBefore(this.span,this.hiddenField);this.span.className="dropdownDiv";this.span.style.position="relative";this.span.style.display="inline-block";this.span.style.height=parseInt(this.numRows)*15;this.span.style.width="100%";this.span.style.overflow="auto";this.span.setAttribute("nlmultidropdown",this.nameC);this.table=this.renderDocument.createElement("table");this.span.appendChild(this.table);this.table.cellSpacing=0;this.table.width="100%";this.table.cellPadding=0;this.table.style.borderCollapse="collapse";this.table.setAttribute("nlmultidropdown",this.nameC);var c=this.renderDocument.createElement("tbody");var e=this.textArray.length;for(var d=0;d<e;d++){var h=this.renderDocument.createElement("td");h.className=this.contains(d)?"dropdownSelected":"dropdownNotSelected";h.style.whiteSpace="nowrap";h.style.borderWidth="0px";h.style.borderStyle="solid";h.style.borderColor="#FFFFFF";h.nlrow=d;h.setAttribute("nlmultidropdown",this.nameC);var g=this.textArray[d];if(isValEmpty(g)){g="&nbsp;";}if(isIE){h.innerHTML=g;h.onclick=new Function("event",'getMultiDropdownFromNameC("'+this.nameC+'").setFocus();');}else{var b=this.renderDocument.createElement("a");h.appendChild(b);b.onclick=new Function("event",'getMultiDropdownFromNameC("'+this.nameC+'").setFocus();');b.innerHTML=g;b.nlrow=d;b.setAttribute("nlmultidropdown",this.nameC);}h.onkeypress=new Function("event",'getMultiDropdownFromNameC("'+this.nameC+'").handleKeypress(event);');var f=this.renderDocument.createElement("tr");c.appendChild(f);f.appendChild(h);}this.table.appendChild(c);this.span.onkeypress=new Function("event",'getMultiDropdownFromNameC("'+this.nameC+'").handleKeypress(event);');};NLMultiDropdown.prototype.positionHelperIconsForNonIE=function NLMultiDropdown_positionHelperIconsForNonIE(){try{if(isIE){return;}var a=document.getElementById(this.name+"_helperwidgets");if(a){a.style.position="relative";a.style.left=parseInt(this.span.offsetWidth)+10;a.style.top=parseInt(Math.floor(this.span.offsetHeight/2))-parseInt(Math.floor(a.offsetHeight/2))+4;}}catch(b){}};function getFocusElement(b){if(!b){return null;}if(b.focus){return b;}var a=b.firstChild;b=null;while(a&&!b){b=getFocusElement(a);a=a.nextSibling;}return b;}NLMultiDropdown.prototype.setFocus=function NLMultiDropdown_setFocus(){var b=getFocusElement(this.span);try{b.focus();if(this.selectedVals.length==0){this.highLightBorder(0);}}catch(a){}};NLMultiDropdown.prototype.setWidth=function NLMultiDropdown_setWidth(){if(this.span==null){this.buildSpan();}if(this.staticWidth!=null){this.span.style.width=this.staticWidth;}else{var a=this.table.offsetWidth;if(a<40){a=40;}a=Math.min(a,300);this.table.style.width=a;this.span.style.width=a+21;this.width=a;}this.positionHelperIconsForNonIE();};NLMultiDropdown.prototype.becomeCurrent=function NLMultiDropdown_becomeCurrent(){if(currentMultiDropdown!=this){currentMultiDropdown=this;}};NLMultiDropdown.prototype.resetDropDown=function NLMultiDropdown_resetDropDown(){this.removeAll();this.previousIdx=-1;this.currentIdx=-1;this.selectedVals=isValEmpty(this.defaultValues)?new Array():this.defaultValues.split(String.fromCharCode(5));var b=this.selectedVals.length;var a=0;while(a<b){this.add(this.valueToIndexMap[this.selectedVals[a++]],true);}if(this.width==null){this.setWidth();}this.setHiddenField();};NLMultiDropdown.prototype.getTextForValue=function NLMultiDropdown_getTextForValue(b){var a=this.getIndexForValue(b);if(a!=null){return this.textArray[a];}else{return"";}};NLMultiDropdown.prototype.getIndexForValue=function NLMultiDropdown_getIndexForValue(a){return this.valueToIndexMap[String(a)];};NLMultiDropdown.prototype.setValue=function NLMultiDropdown_setValue(a){this.setIndex(valueToIndexMap[a]);};NLMultiDropdown.prototype.setIndex=function NLMultiDropdown_setIndex(a,b){if(this.disabled){return;}if(getEventShiftKey(b)){this.handleShiftKey(Math.min(this.currentIdx,a),Math.max(this.currentIdx,a));}else{if(getEventCtrlKey(b)||getEventMacCommandKey(b)){if(this.contains(a)){this.remove(a,true);}else{this.add(a,true);}}else{this.removeAll();this.add(a,true);}}this.highLightBorder(a);this.previousIdx=a;};NLMultiDropdown.prototype.addIndex=function NLMultiDropdown_addIndex(a){if(this.disabled){return;}this.add(a,true);this.highLightBorder(a);this.previousIdx=a;this.setHiddenField(true);};NLMultiDropdown.prototype.setValues=function NLMultiDropdown_setValues(c,d){this.removeAll();this.previousIdx=-1;var b=c.split(String.fromCharCode(5));var a=0;for(a=0;a<b.length;a++){this.add(this.getIndexForValue(b[a]),true);}this.setHiddenField(!d);};NLMultiDropdown.prototype.getValues=function NLMultiDropdown_getValues(){return this.valueArray;};NLMultiDropdown.prototype.highLightBorder=function NLMultiDropdown_highLightBorder(a){if(this.previousIdx!=-1){this.getCell(this.previousIdx).style.borderStyle="solid";this.getCell(this.previousIdx).style.borderColor="#FFFFFF";}this.getCell(a).style.borderStyle="dotted";this.getCell(a).style.borderColor=this.defaultBorderColor;};NLMultiDropdown.prototype.handleScrolling=function NLMultiDropdown_handleScrolling(a){if(this.span!=null){var c=this.span.scrollTop;var b=this.span.scrollTop+this.getCell(a).offsetHeight*Math.max(1,this.numRows-1);if(this.getCell(a).offsetTop>(b+this.getCell(a).offsetHeight)||this.getCell(a).offsetTop<(c-this.getCell(a).offsetHeight)){this.span.scrollTop=this.getCell(a).offsetTop;}else{if(this.getCell(a).offsetTop>b){this.span.scrollTop+=this.getCell(a).offsetHeight;}else{if(this.getCell(a).offsetTop<c){this.span.scrollTop-=this.getCell(a).offsetHeight;}}}}};NLMultiDropdown.prototype.getSelectedValues=function NLMultiDropdown_getSelectedValues(){return this.selectedVals.join(String.fromCharCode(5));};NLMultiDropdown.prototype.getSelectedText=function NLMultiDropdown_getSelectedText(c){var b="";if(isValEmpty(c)){c=",";}if(this.selectedVals.length>0){for(var a=0;a<this.selectedVals.length;a++){b+=(a==0?"":c)+this.getText(this.valueToIndexMap[this.selectedVals[a]]);}}return b;};NLMultiDropdown.prototype.getSelectedTextFromValues=function NLMultiDropdown_getSelectedTextFromValues(a,e){var d="";if(isValEmpty(e)){e=",";}if(!isValEmpty(a)){var c=a.split(String.fromCharCode(5));for(var b=0;b<c.length;b++){d+=(b==0?"":e)+this.getText(this.valueToIndexMap[c[b]]);}}return d;};NLMultiDropdown.prototype.setHiddenField=function NLMultiDropdown_setHiddenField(a){this.hiddenField.value=this.getSelectedValues();if(a){this.hiddenField.onchange();}};NLMultiDropdown.prototype.removeAll=function NLMultiDropdown_removeAll(){var c=this.selectedVals;for(var b=0;b<c.length;b++){var a=this.valueToIndexMap[c[b]];this.remove(a,true);this.getCell(a).style.borderStyle="solid";this.getCell(a).style.borderColor="#FFFFFF";}};NLMultiDropdown.prototype.add=function NLMultiDropdown_add(a,b){if(a==null){return;}this.currentIdx=a;arrayAdd(this.selectedVals,this.getValue(a));if(b){this.getCell(a).className="dropdownSelected";}};NLMultiDropdown.prototype.remove=function NLMultiDropdown_remove(a,b){if(a==null){return;}this.selectedVals=arrayRemove(this.selectedVals,this.getValue(a));if(b){this.getCell(a).className="dropdownNotSelected";}};NLMultiDropdown.prototype.contains=function NLMultiDropdown_contains(a){return arrayContains(this.selectedVals,this.valueArray[a]);};NLMultiDropdown.prototype.getCell=function NLMultiDropdown_getCell(a){return this.table.rows[a].cells[0];};NLMultiDropdown.prototype.getValue=function NLMultiDropdown_getValue(a){return this.valueArray[a];};NLMultiDropdown.prototype.getText=function NLMultiDropdown_getText(a){return this.textArray[a];};NLMultiDropdown.prototype.setBackgroundColor=function NLMultiDropdown_setBackgroundColor(a){this.defaultBorderColor=a;this.table.style.backgroundColor=a;this.span.style.backgroundColor=a;};NLMultiDropdown.prototype.handleShiftKey=function NLMultiDropdown_handleShiftKey(c,a){if(c>a||c<0||a>=this.valueArray.length){return;}else{var b=0;while(b<this.valueArray.length){if(b>=c&&b<=a){this.add(b,true);}else{this.remove(b,true);}b++;}}};NLMultiDropdown.prototype.handleMoveSelection=function NLMultiDropdown_handleMoveSelection(d,c){var b=this.valueArray.length;var a=this.currentIdx;a+=c;a=Math.min(a,b-1);a=Math.max(a,0);if(getEventShiftKey(d)){this.handleShiftKey(Math.min(this.previousIdx,a),Math.max(this.previousIdx,a));}else{this.removeAll();}this.add(a,true);this.highLightBorder(a);if(!getEventShiftKey(d)){this.previousIdx=a;}this.handleScrolling(a);this.setHiddenField(true);};NLMultiDropdown.prototype.handleTypeAhead=function NLMultiDropdown_handleTypeAhead(f){var g=Math.max(this.currentIdx,0)+1;var e;var b=this.textArray.length;var d=String.fromCharCode(f).toUpperCase();var a=false;for(var h=0;h<b;h++){e=g%b;var c=this.textArray[e].substr(0,d.length).toUpperCase();if(c==d){a=true;break;}++g;}if(a){this.removeAll();this.add(e,true);this.highLightBorder(e);this.previousIdx=e;this.handleScrolling(e);this.setHiddenField(true);}};NLMultiDropdown.prototype.handleMouseMove=function NLMultiDropdown_handleMouseMove(g){if(this.disabled){return;}if(this.onMouseMoveIdx==-1){return;}else{if(isIE&&(getEvent(g).button==0)){this.onMouseMoveIdx=-1;if(currentMultiDropdown==this){currentMultiDropdown=null;}return;}}var f=getEventTarget(g);while(f!=null){if(f.className!=null&&!isNaN(f.nlrow)&&f.nlrow!="undefined"&&f.getAttribute("nlmultidropdown")==this.nameC){var a=f.nlrow;var b=this.onMouseMoveIdx!=this.previousIdx&&this.contains(this.onMouseMoveIdx)&&Math.abs(this.previousIdx-this.onMouseMoveIdx)>Math.abs(this.previousIdx-a);if(b){this.remove(this.onMouseMoveIdx,true);}else{var e=Math.min(this.previousIdx,a);var c=Math.max(this.previousIdx,a);for(var d=e;d<=c;d++){if(!this.contains(d)){this.add(d,true);}}}this.handleScrolling(a);this.onMouseMoveIdx=a;break;}f=f.parentNode;}};NLMultiDropdown.prototype.handleMouseDown=function NLMultiDropdown_handleMouseDown(b){if(this.disabled){return;}this.becomeCurrent();var a=getEventTarget(b);if(a!=null&&!isNaN(a.nlrow)&&a.nlrow!="undefined"){this.onMouseMoveIdx=a.nlrow;this.setIndex(a.nlrow,b);this.handleScrolling(a.nlrow);this.dragBegan=true;}};NLMultiDropdown.prototype.handleMouseUp=function NLMultiDropdown_handleMouseUp(a){if(!this.dragBegan){return;}if(this.disabled){return;}this.dragBegan=false;this.becomeCurrent();this.setHiddenField(true);};NLMultiDropdown.prototype.handleKeydown=function NLMultiDropdown_handleKeydown(c){if(this.disabled){return;}this.becomeCurrent();var b=false;var a=getEventKeypress(c);switch(a){case 33:this.handleMoveSelection(c,-this.numRows);break;case 34:this.handleMoveSelection(c,+this.numRows);break;case 35:this.handleMoveSelection(c,this.valueArray.length-this.currentIdx);break;case 36:this.handleMoveSelection(c,-this.currentIdx);break;case 38:this.handleMoveSelection(c,-1);break;case 40:this.handleMoveSelection(c,+1);break;default:b=true;break;}return b;};NLMultiDropdown.prototype.handleKeypress=function NLMultiDropdown_handleKeypress(b){if(this.disabled){return true;}this.becomeCurrent();var a=getEventKeypress(b);this.handleTypeAhead(a);};NLMultiDropdown.prototype.setDisabled=function NLMultiDropdown_setDisabled(c){this.disabled=c;this.hiddenField.disabled=c;if(this.table!=null){this.table.disabled=c;if(!isIE){var a=this.table.getElementsByTagName("A");for(var b=0;b<a.length;b++){a[b].style.color=c?"#AAAAAA":"";}}}if(!this.disabled&&this.span==null&&this.width==null){this.setWidth();this.setBackgroundColor(this.defaultBorderColor);}};NLMultiDropdown.prototype.setHidden=function NLMultiDropdown_setHidden(a){if(this.span!=null){this.span.style.display=a?"none":"";}};NLMultiDropdown.prototype.addOption=function NLMultiDropdown_addOption(d,c,b,a){if(c==null){throw"cannot create an option with null value";}if(d==null){throw"cannot create an option with null text";}d=String(d);c=String(c);if(typeof(a)=="undefined"){a=this.valueArray.length;}this.textArray.splice(a,0,d);this.valueArray.splice(a,0,c);this.valueToIndexMap[c]=a;if(b){this.add(a,false);}if(this.span!=null){this.parentSpan.removeChild(this.span);}this.span=null;this.width=null;this.setWidth();this.setBackgroundColor(this.defaultBorderColor);this.setHiddenField();if(!this.disabled){this.handleScrolling(a);}};NLMultiDropdown.prototype.deleteAllOptions=function NLMultiDropdown_deleteAllOptions(){this.valueArray.length=0;this.textArray.length=0;this.valueToIndexMap=new Array();this.previousIdx=-1;this.currentIdx=-1;this.selectedVals=new Array();if(this.span!=null){this.parentSpan.removeChild(this.span);}this.span=null;this.width=null;this.setWidth();this.setBackgroundColor(this.defaultBorderColor);this.setHiddenField();};NLMultiDropdown.prototype.deleteOneOption=function NLMultiDropdown_deleteOneOption(b){b=String(b);var a=this.valueToIndexMap[b];if(a==null){return;}this.valueArray.splice(a,1);this.textArray.splice(a,1);delete this.valueToIndexMap[b];this.selectedVals=arrayRemove(this.selectedVals,b);if(this.span!=null){this.parentSpan.removeChild(this.span);}this.span=null;this.width=null;this.setWidth();this.setBackgroundColor(this.defaultBorderColor);this.setHiddenField();};NLMultiDropdown.prototype.getContainer=function NLMultiDropdown_getContainer(){return this.span;};function resetNLDropDowns(b){if(window.dropdowns!=null){for(i in window.dropdowns){var a=window.dropdowns[String(i)];if(a.elementsAreInitialized&&(b==null||a.getForm()==b)){a.resetDropDown();}}}if(window.multidropdowns!=null){for(i in window.multidropdowns){var a=window.multidropdowns[String(i)];if(b==null||a.hiddenField.form==b){a.resetDropDown();}}}}var _popup_help="<Enter first few letters then tab>";var _short_popup_help="<Type then tab>";var _mult_popup_help="<Type & tab for single value>";var _popup_help_search="Type & tab...";function convertDropdowns(b){if(b==null){b=document;}var c=b.getElementsByTagName("SELECT");var d=[];for(var a=0;a<c.length;a++){d[d.length]=c[a];}for(var a=0;a<d.length;a++){convertDropdown(d[a]);}}function convertDropdown(h){var k=getSelectValueArray(h);var c=getSelectTextArray(h);var a=[];for(var e=0;e<k.length;e++){a[a.length]=c[e];a[a.length]=k[e];}var g=null;var b=h.form;var d=nvl(h.getAttribute("iFlags"),"0");var f=document.createElement("SPAN");f.style.whiteSpace="nowrap";f.id=h.getAttribute("id");h.parentNode.replaceChild(f,h);if(h.type=="select-one"){f.className="nldropdown";g=makeDropdown(h.name,h.getAttribute("defaultWidth"),a,getSelectIndex(h),getSelectValue(h),getSelectText(h),h.getAttribute("onchange"),null,null,h.getAttribute("minimumWidth"),document,parseInt(d),f);if(b!=null){b.elements[h.name]=g.hddn;}}else{g=makeMultiDropdown(h.name,h.size,a,getMultiSelectValues(h),h.getAttribute("onchange"),document,parseInt(d),f);if(b!=null){b.elements[h.name]=g.hiddenField;}}g.setRequired(getRequired(h));}function getStyleForClass(d,g){var f=document.styleSheets;for(var b=0;b<f.length;b++){var h=f[b].rules?f[b].rules:f[b].cssRules;for(var a=0;a<h.length;a++){var c=h[a].style;var e=h[a].selectorText.replace(".","");if(!isValEmpty(c[g])&&e==d){return c[g];}}}return null;}var dragger=null;var mouseX=0,mouseY=0;var currentPortlet=null;var bar=null;var EVENT_PORTLET_MAX=0;var EVENT_PORTLET_MIN=1;var EVENT_PORTLET_MOVE=2;var EVENT_PORTLET_DROP=3;var EVENT_PORTLET_DRAG=4;function NLPortletDragger(){this.trToBeMoved=null;this.divContainer=null;this.headerTR=null;this.width=null;this.originalColumn=null;this.originalNext=null;this.originalContainer=null;this.widthPlaceHolder=null;this.portletID=null;}function movedToDifferentWidthColumn(a,b){return((a==1||a==3)&&b==2)||((b==1||b==3)&&a==2);}NLPortletDragger.prototype.putDownPortlet=function NLPortletDragger_putDownPortlet(){if(bar&&bar.parentNode){bar.parentNode.removeChild(bar);}var a=currentPortlet;if(!isNS){this.divContainer.parentNode.removeChild(this.divContainer);}if(a!=null){var c=getCellIndex(a.parentNode.parentNode.parentNode)+1;var b=NLHighChartManager_Instance.getChartObject("portletHC_child_portlet_"+this.portletID);if((typeof b!="undefined")&&(movedToDifferentWidthColumn(this.originalColumn,c))){b.setSize(0,0);}a.parentNode.insertBefore(this.trToBeMoved,a);if(typeof this.updateLayoutInDatabase!="undefined"){this.updateLayoutInDatabase(this.portletID,a.portletID,c,this.originalColumn,this.trToBeMoved.id);}else{updateLayoutInDatabase(this.portletID,a.portletID,c,this.originalColumn);}if(movedToDifferentWidthColumn(this.originalColumn,c)==true){this.headerTR.setAttribute("ptlt_hasdisplayed","F");}}else{if(this.widthPlaceHolder){this.originalContainer.insertBefore(this.trToBeMoved,this.originalNext);}}if(this.widthPlaceHolder){this.originalContainer.removeChild(this.widthPlaceHolder);}clearTimeout(chartResizingTimeout);chartResizingTimeout=setTimeout(reflowAllCharts,300);currentPortlet=null;};NLPortletDragger.prototype.putDownRow=function NLPortletDragger_putDownRow(){if(bar&&bar.parentNode){bar.parentNode.removeChild(bar);}var moveTo=currentPortlet;if(this.divContainer!=null){this.divContainer.parentNode.removeChild(this.divContainer);this.originalContainer.insertBefore(this.trToBeMoved,this.originalNext);}if(moveTo==null){return;}if(OrderedListMarkRowNavigation){OrderedListMarkRowNavigation(moveTo,false);}if(moveTo.isOrderedList&&OrderedListMoveLineTo){OrderedListMoveLineTo(moveTo.machineName,moveTo.rowIndex);}else{if(moveTo.machineName!=null){var newRowIdx=moveTo.rowIndex;var currentRowIdx=eval(moveTo.machineName+"_machine.getMachineIndex()");var isInlineEdit=eval(moveTo.machineName+"_machine.isinline");var machine=getMachineByName(moveTo.machineName);if(isInlineEdit&&currentRowIdx<moveTo.rowIndex&&machine.moveButtons){newRowIdx--;}eval(moveTo.machineName+"_machine.movelineto("+newRowIdx+")");}}currentPortlet=null;};function getCellIndex(c){var b=c.parentNode;for(var a=0;a<b.cells.length;a++){if(b.cells[a]==c){return a;}}return 0;}function movePortlet(f,l){try{var k=getEventTarget(l);if(k.nodeName=="A"||k.nodeName=="SPAN"){return true;}var b=findClassUp(f,"portletHandle");dragger=new NLPortletDragger();dragger.portletID=getPortletId(f.id);dragger.headerTR=f;dragger.trToBeMoved=b;dragger.originalColumn=getCellIndex(b.parentNode.parentNode.parentNode)+1;dragger.originalContainer=b.parentNode;dragger.originalNext=b.nextSibling;dragger.width=b.offsetWidth;dragger.divContainer=document.createElement("div");dragger.divContainer.style.position="absolute";dragger.divContainer.style.width=dragger.width;dragger.divContainer.style.background=document.body.bgColor;if(isIE){dragger.divContainer.style.filter="alpha(opacity=92)";}else{dragger.divContainer.style.opacity=(0.92);dragger.divContainer.style.MozOpacity=(0.92);}dragger.widthPlaceHolder=document.createElement("tr");var a=document.createElement("td");var c=document.createElement("img");a.appendChild(c);dragger.widthPlaceHolder.appendChild(a);c.src="/images/nav/stretch.gif";c.width=dragger.width;c.height="0";if(dragger.widthPlaceHolder){dragger.originalContainer.appendChild(dragger.widthPlaceHolder);}dragger.originalContainer.removeChild(b);var g=document.createElement("table");g.style.borderWidth=0;g.width="100%";var h=document.createElement("tbody");g.appendChild(h);h.appendChild(b);dragger.divContainer.appendChild(g);if(!isNS){document.body.appendChild(dragger.divContainer);positionFloatingPortlet(dragger.divContainer,4);}}catch(d){dragger=null;}}function portletDraggerOnMouseMove(b){updateMousePosition(b);if(dragger){if((document.body.scrollHeight>getDocumentHeight())&&(getDocumentHeight()-mouseY)<10){document.body.scrollTop=document.body.scrollHeight-getDocumentHeight();}else{if(mouseY<15&&document.body.scrollTop>0){document.body.scrollTop=0;}}if(!isNS){positionFloatingPortlet(dragger.divContainer,4);}var a=getEventTarget(b);a=findClassUp(a,"portletHandle");if((a!=null)&&(a!=currentPortlet)&&a!=dragger.trToBeMoved){currentPortlet=a;if(bar!=null&&bar.parentNode!=null){bar.parentNode.removeChild(bar);}bar=getPositionUpdateBar();currentPortlet.portletID=getPortletId(currentPortlet.id);currentPortlet.parentNode.insertBefore(bar,currentPortlet);}notifyPortlet(dragger.portletID,EVENT_PORTLET_MOVE);}}function updateMousePosition(a){mouseX=getMouseX(a);mouseY=getMouseY(a);}function getPositionUpdateBar(b){var c=document.createElement("tr");var d=document.createElement("td");c.appendChild(d);var a=document.createElement("hr");a.style.width="100%";a.className="portletDragDropBar";d.appendChild(a);if(b&&b.cells.length>0){d.colSpan=b.cells.length;a.style.width="95%";}return c;}function positionFloatingPortlet(f,a){var b=8;var c=10;var e=a;var g=getDocumentClientWidth();if(mouseX<15){f.style.left=b;}else{if((mouseX+f.offsetWidth)>(g-c)){f.style.left=(g-c)-f.offsetWidth;}else{f.style.left=mouseX-10;}}if(mouseY<getDocumentHeight()){var d=mouseY+document.body.scrollTop+e;if(!((mouseY+f.offsetHeight)<getDocumentHeight())){d=d-f.offsetHeight-15;}d=d>0&&d||0;f.style.top=d;}}function portletDraggerOnMouseDown(d){if(dragger||getButtonId(d)>1){return;}var b=getEventTarget(d);var a=findClassUp(b,"portletlabelDragDrop");if(a!=null&&a.id!=null){movePortlet(a,d);var c=getPortletId(a.id);notifyPortlet(c,EVENT_PORTLET_DRAG);}}function portletDraggerOnMouseUp(){if(dragger){dragger.putDownPortlet();notifyPortlet(dragger.portletID,EVENT_PORTLET_DROP);dragger=null;return false;}}function getPortletId(a){if(a==null){return -1;}else{return a.substring(a.lastIndexOf("_")+1,a.length);}}function updateLayoutInDatabase(a,f,e,c){if((typeof NLHighChartManager_Instance.getChartObject("portletHC_child_portlet_"+a)!="undefined")&&!Ext.isIE){var d="/app/center/portletlayout.nl?movedid="+a+"&replacedid="+f+"&sectionid=-29&newcolumn="+e+"&oldcolumn="+c+"&chartMoved=true";}else{var d="/app/center/portletlayout.nl?movedid="+a+"&replacedid="+f+"&sectionid=-29&newcolumn="+e+"&oldcolumn="+c+"&chartMoved=false";}var b=getParameter("entityid",document);if(b!=null){d+="&entityid="+b;}sendRequestToFrame(d,"server_commands");}function hidePortlet(e,a,b){var c=document.getElementById(b);c=findClassUp(c,"portletHandle");if(c!=null){var d="/app/center/setup/dashboard.nl?portletid="+a+"&sectionid="+e+"&dynamic=T&elementid="+b;d+="&method=hideportlet";if(window.editDashboard){d+="&e=T";}sendRequestToFrame(d,"server_commands");}clearTimeout(chartResizingTimeout);chartResizingTimeout=setTimeout(reflowAllCharts,300);}function doHidePortlet(a){var b=document.getElementById(a);b=findClassUp(b,"portletHandle");if(b!=null){b.parentNode.removeChild(b);}clearTimeout(chartResizingTimeout);chartResizingTimeout=setTimeout(reflowAllCharts,300);}var portletMaxControlImgUrl="/images/forms/maximize.gif";var portletMaxControlHighLightImgUrl="/images/forms/maximize.gif";var portletMinControlImgUrl="/images/forms/minimize.gif";var portletMinControlHighLightImgUrl="/images/forms/minimize.gif";function minimizePortlet(l,n,f,k,q,h){var e=document.getElementById(f);if(e!=null&&e.nodeName=="TR"){var a=e.getAttribute("ptlt_hasdisplayed")=="T";var p=document.getElementById(f+"_content");var m=p.style.display=="none";var g=m?"":"none";if(!m||a||!h){var o=document.getElementById("table_"+f);for(var d=p.rowIndex;d<o.rows.length;d++){o.rows[d].style.display=g;}var c=document.getElementById(f+"_maxmin");if(m){c.className=c.className.replace("portletIconMaximize","portletIconMinimize");}else{c.className=c.className.replace("portletIconMinimize","portletIconMaximize");}}e.setAttribute("ptlt_hasdisplayed","T");var b="/app/center/setup/minimizeportlet.nl?portletid="+n+"&sectionid="+l;b=addParamToURL(b,"elemid",k);b=addParamToURL(b,"sticky",q);b=addParamToURL(b,"_minimize",(m?"F":"T"));b=addParamToURL(b,"_reload",(m&&!a&&h?"T":"F"));sendRequestToFrame(b,"server_commands");notifyPortlet(n,m?EVENT_PORTLET_MAX:EVENT_PORTLET_MIN);clearTimeout(chartResizingTimeout);chartResizingTimeout=setTimeout(reflowAllCharts,300);}}function refreshPortlet(f,l,e,g,m,d,h,c,k,a){setPortletToUpdating(f);var b="/app/center/setup/portletrefresher.nl?elemid="+f+"&sticky="+l;if(e!=null){b+="&noreload="+(e?"T":"F");}if(g!=null){b+="&sc="+g;}if(m!=null){b+="&portletid="+m;}if(d!=null){b+="&entityid="+d+"&haschild="+(h?"T":"F");}if(c!=null){b+="&searchid="+c;}if(a!=null){b+="&lineid="+a;}b+="&nsts="+(new Date().getTime());if(k!=null&&k.length>0){if(k.charAt(0)=="?"){k=k.substring(1);}b+="&addparams="+escape(k);}sendRequestToFrame(b,"server_commands");}function disablePortletLinks(c){for(var b=0;;b++){var a=document.getElementById(c+b);if(a==null){break;}a.disabled=true;}return true;}function sendRequestToFrame(a,c){try{document.getElementById(c).src=a;}catch(b){}}function getFrame(a){try{return document.getElementById(a);}catch(b){}}var quickAddDragger=null;function quickaddDraggerOnMouseDown(c){if(quickAddDragger||getButtonId(c)>1){return;}var b=getEventTarget(c);var a=findClassUp(b,"quickaddDragDropIcon");if(a!=null&&a.id!=null){quickAddDragger=findClassUp(a,"quickadddragger");}}function quickaddDraggerOnMouseMove(a){if(quickAddDragger!=null){positionFloatingPortlet(quickAddDragger,0);}}function quickaddDraggerOnMouseUp(){quickAddDragger=null;return false;}function setPortletToUpdating(k){var b="rfsh_"+k;var d=document.getElementById(b);if(d!=null){var c=d.parentNode.previousSibling!=null?d.parentNode.previousSibling.firstChild:null;if(c!=null&&c.nodeName=="IMG"){c.src="/images/nav/dingbats/btn_cl_refresh.gif";}while(d.firstChild!=null){d.removeChild(d.firstChild);}var g=document.createElement("font");g.color="#999999";var h=document.createTextNode("Refreshing");g.appendChild(h);d.appendChild(g);var e=document.createElement("img");e.src="/images/setup/updating.gif";e.border=0;d.appendChild(e);}else{var f=k+"_refresh";var a=document.getElementById(f);if(a&&a.className.indexOf("portletIconRefreshing")<0){a.className=a.className.replace("portletIconRefresh","portletIconRefreshing");}}}var ExtFontNames=[["Verdana","Verdana"],["Arial","Arial"],["Courier New","Courier New"],["Times New Roman","Times New Roman"],["Comic Sans MS","Comic Sans"],["Georgia","Georgia"],["Tahoma","Tahoma"],["Trebuchet MS","Trebuchet"]];var fontNames={Font:"",Verdana:"Verdana",Arial:"Arial","Courier New":"Courier New","Times New Roman":"Times New Roman","Comic Sans":"Comic Sans MS",Georgia:"Georgia",Tahoma:"Tahoma",Trebuchet:"Trebuchet MS"};var fontColors={Color:"",Black:"#000000",Red:"#FF0000",Blue:"#0000FF","Dark Blue":"#00008B","Navy Blue":"#000080",Brown:"#A52A2A",Green:"#008000",Orange:"#FFA500","Light Grey":"#D3D3D3",Silver:"#C0C0C0"};var fontSizes={Size:"","8":"1","10":"2","12":"3","14":"4","18":"5","24":"6","36":"7"};function _getFontSizePts(b){for(var a in fontSizes){if(fontSizes[a]==b){return a;}}return null;}var fontSizeInPixel={"10":"1","12":"2","13":"2","16":"3","18":"4","24":"5","32":"6","48":"7"};function getFontSizeFromPixel(a){if(fontSizeInPixel[a]){return fontSizeInPixel[a];}return"";}var useNLDropdownMenu=false;function makeHtmlEditor(b,k,h,c,l,g,d,a,e){if(document.getElementById(b+"_fs")==null){return null;}if(!isNaN(l)){l=Math.min(l*20,500);}if(!isNaN(c)){c=Math.min(c*6,800);}var f=new NLHtmlEditor(b,k,h,c,l,g,d);window.htmleditors[b]=f;if(a!=null){f.defaultFont=a;}if(e!=null){f.defaultFontSize=e;}f.launchEditor();if(f.hasAttribute(128)){f.setMandatory(true);}if(f.hasAttribute(2048)){f.setDisabled(true);}return f;}var NLHTMLEDITOR_FORMATTED_LABEL="Formatted Text";var NLHTMLEDITOR_SOURCECODE_LABEL="HTML Source Code";var NLHTMLEDITOR_FORMATTED_HELPER_TEXT="Type text and format it using the toolbar.";var NLHTMLEDITOR_SOURCECODE_HELPER_TEXT="<!-- Type or paste HTML code -->";var NLHTMLEDITOR_STYLE_SMALL_TEXT="smalltext";function NLHtmlEditor(e,g,d,f,a,c,b){this.name=e;this.span=document.getElementById(e+"_fs");this.value=g;this.defaultValue=g;this.main=null;this.editor=null;this.toggleHeader=null;this.toolbar=null;this.hddn=null;this.defaultTextMode=c;this.textMode=c;this.width=f!=null?f:400;this.height=a!=null?a:200;this.onChangeFunc=d;this.flags=b?b:0;this.toggleSpan=null;this.disabled=false;this.mandatory=false;this.mandatoryBgColor="#FFFFE5";this.defaultFont=null;this.defaultFontSize=null;this.responseLock=false;this.responseQueue=0;}NLHtmlEditor.prototype.launchEditor=function NLHtmlEditor_launchEditor(){this.main=document.createElement("DIV");this.main.id=this.name+"_main";this.main.unselectable="on";this.main.style.border="solid 1px #999999";this.main.style.backgroundColor="#ECEFF6";this.main.className="htmleditormain";this.span.appendChild(this.main);this.buildToggleHeader();this.buildToolBar();this.buildEditor();this.setEditorMode(this.textMode);};NLHtmlEditor.prototype.buildEditor=function NLHtmlEditor_buildEditor(){this.editor=document.createElement("DIV");this.editor.id=this.name+"_editor";this.editor.unselectable="on";this.editor.style.width="100%";this.editor.style.borderWidth="1px 0 0px 0";this.editor.style.borderStyle="solid";this.editor.style.borderColor="#999999";this.editor.style.marginTop="8px";this.main.appendChild(this.editor);this.editorHtml=document.createElement("IFRAME");this.editorHtml.id=this.name+"_html";this.editorHtml.src="javascript:false";this.editorHtml.style.height=this.height;this.editorHtml.style.width="100%";this.editorHtml.frameBorder="0";this.editorText=document.createElement("TEXTAREA");this.editorText.id=this.name+"_text";this.editorText.className="input"+(this.mandatory?"req":"");this.editorText.onkeypress=new Function("event","setEventCancelBubble(event); return true");this.editorText.style.height=this.height;this.editorText.style.width="100%";this.editorText.style.borderWidth="0px";};NLHtmlEditor.prototype.buildToggleHeader=function NLHtmlEditor_buildToggleHeader(){this.toggleHeader=document.createElement("DIV");this.toggleHeader.id=this.name+"_footer";this.toggleHeader.unselectable="on";this.toggleHeader.style.padding="5px 2px 3px 5px";this.toggleHeader.style.width=this.width;this.toggleSpan=document.createElement("SPAN");this.toggleSpan.className="tinytext";var b=document.createElement("A");b.className="tinytextnolink";var a=document.createElement("A");a.className="tinytextnolink";this.setToggleLinks(b,a);this.toggleSpan.appendChild(b);this.toggleSpan.appendChild(a);this.toggleHeader.appendChild(this.toggleSpan);this.hddn=document.createElement("INPUT");this.hddn.type="hidden";this.hddn.value=this.value;this.hddn.name=this.name;this.hddn.id=this.name;if(this.onChangeFunc!=null){this.hddn.onchange=new Function(this.onChangeFunc);}this.toggleHeader.appendChild(this.hddn);this.main.appendChild(this.toggleHeader);this.span.parentNode.style.paddingBottom="5px";};NLHtmlEditor.prototype.buildToolBar=function NLHtmlEditor_buildToolBar(){this.toolbar=document.createElement("DIV");this.toolbar.id=this.name+"_toolbar";this.toolbar.style.padding="4 4 2 4";this.toolbar.style.height="22px";this.toolbar.unselectable="on";this.toolbar.style.backgroundColor="#ECEFF6";this.toolbar.style.borderWidth="0px";this.main.appendChild(this.toolbar);this.buildToolBarIcon("fontname","Font","FontName");this.buildToolBarIcon("fontsize","Size","FontSize");this.buildToolBarIcon("fontcolor","Color","ForeColor");if(isNaN(this.width)||parseInt(this.width)>425){this.buildToolBarLiner();}else{this.buildToolBarLineBreak();}this.buildToolBarIcon("bold","Bold","Bold");this.buildToolBarIcon("italic","Italic","Italic");this.buildToolBarIcon("underline","Underline","Underline");this.buildToolBarLiner();this.buildToolBarIcon("justifyleft","Justify Left","JustifyLeft");this.buildToolBarIcon("justifycenter","Justify Center","JustifyCenter");this.buildToolBarIcon("justifyright","Justify Right","JustifyRight");this.buildToolBarLiner();this.buildToolBarIcon("insertorderedlist","Ordered List","InsertOrderedList");this.buildToolBarIcon("insertunorderedlist","Unordered List","InsertUnorderedList");this.buildToolBarIcon("outdent","Outdent","Outdent");this.buildToolBarIcon("indent","Indent","Indent");};NLHtmlEditor.prototype.buildToolBarIcon=function NLHtmlEditor_buildToolBarIcon(b,m,f){var d=this.name+"_toolbar_"+b;if(f=="FontName"||f=="FontSize"||f=="ForeColor"){var k=new Array();var a;if(f=="FontName"){a=fontNames;}else{if(f=="FontSize"){a=fontSizes;}else{a=fontColors;}}for(var n in a){k[k.length]=n;k[k.length]=a[n];}if(useNLDropdownMenu){var o=document.createElement("SPAN");o.id=d+"_fs";o.unselectable="on";o.className="nldropdown effectStatic";o.style.whiteSpace="nowrap";o.style.paddingRight="5px";this.toolbar.appendChild(o);var p=makeDropdown(d,null,k,null,"","",'getHtmlEditor("'+this.name+'").setFocus(); getHtmlEditor("'+this.name+'").handleToolBarEvent("'+f+'", getSelectValue(this)); NS.form.setChanged(true);',null,null,null,document,1,o);p.inpt.tabIndex=-1;}else{var q=document.createElement("SELECT");q.name=d;q.id=d+"_fs";q.className="input";q.unselectable="on";q.tabIndex=-1;q.onchange=new Function('getHtmlEditor("'+this.name+'").setFocus(); getHtmlEditor("'+this.name+'").handleToolBarEvent("'+f+'", getSelectValue(this)); NS.form.setChanged(true);');for(var h=0;h<k.length;h+=2){var c=document.createElement("OPTION");c.text=k[h];c.value=k[h+1];c.unselectable="on";var l=h>0?q.options[h/2-1]:null;q.add(c,l);}this.toolbar.appendChild(q);}}else{var e=document.createElement("BUTTON");e.id=d;e.btnCommand=f;e.tabIndex=-1;e.className="editorbutton";e.unselectable="on";e.title=m;e.style.padding="1px";e.style.margin=0;e.style.marginTop="3px";e.style.backgroundColor="#ECEFF6";e.style.verticalAlign="bottom";e.onmouseover=new Function("if (this.className =='editorbutton') this.className='editorbuttonhover'");e.onmousedown=new Function("this.className='editorbuttondown';");e.onmouseout=new Function("if (this.className =='editorbuttonhover') this.className='editorbutton'");e.onclick=new Function("getHtmlEditor('"+this.name+"').handleToolBarEvent('"+f+"'); return false;");var g=document.createElement("IMG");g.src="/images/nav/editor/"+b+".gif";g.unselectable="on";g.padding=0;g.margin=0;g.border=0;g.style.height="18";g.style.width="18";e.appendChild(g);this.toolbar.appendChild(e);}};NLHtmlEditor.prototype.buildToolBarLineBreak=function NLHtmlEditor_buildToolBarLiner(){var a=document.createElement("BR");a.unselectable="on";this.toolbar.appendChild(a);};NLHtmlEditor.prototype.buildToolBarLiner=function NLHtmlEditor_buildToolBarLiner(){var a=document.createElement("SPAN");a.style.width="1px";a.style.height="16px";a.style.border="1px inset";a.style.margin="0 3 0 3";a.unselectable="on";a.style.display="inline";a.style.padding=0;this.toolbar.appendChild(a);};NLHtmlEditor.prototype.hasAttribute=function NLHtmlEditor_hasAttribute(a){return(this.flags&a)!=0;};NLHtmlEditor.prototype.getValue=function NLHtmlEditor_getValue(){return this.value;};NLHtmlEditor.prototype.getDisplayValue=function NLHtmlEditor_getDisplayValue(){var a=null;if(this.textMode){a=this.editorText.value;}else{a=this.editorHtml.contentWindow.document.body.innerHTML;}a=this.handleEscaping(a,false);return a;};var NLExtHtmlEditor={};NLExtHtmlEditor.createEditor=function(h,a,r,m,o,d,e,n,q,g,p,f,b,s,k){var c="'background-color:"+q+";'";var l=(k?Ext.form.WholeHtmlEditor:Ext.form.HtmlEditor);Ext.onReady(function(){Ext.QuickTips.init();NetSuite.RTEManager.initialize();var u=new Ext.Panel({renderTo:"exthtmlfield-"+h,layout:"fit",style:"border-color: #D5DEE7;",hideMode:"offsets",id:"html-editor-container-"+a,name:"html-editor-container-"+a,bodyStyle:c,items:[new l({id:"html-editor-"+a,name:"html-editor-"+a,disabled:(!g),renderWidth:b,renderHeight:s,width:b,height:s,readOnly:true,defaultFont:null,emptyText:NLHTMLEDITOR_SOURCECODE_HELPER_TEXT,plugins:Ext.ux.form.HtmlEditor.plugins(),hideLabel:true,labelSeparator:"",listeners:{editmodechange:function(x,w){if(Ext.isChrome){var v=x.onChangeFunc.match(/validate_html\(this, '(.*)'\);};/);var y=(v&&v[1])||null;validate_html(x.hddn,y);}else{if(w){x.el.dom.blur();x.el.dom.focus();}}x.setSize(x.wrap.getSize());NetSuite.RTEManager.resyncSizeAll(true);},initialize:function(w){w.toggleSourceEdit(m,true);NS.form.setChanged(false);w.lastEditMadeInSourceMode=m;w.setReadOnly(false);var x=new Ext.Resizable(w.wrap,{handles:"e,s,se",minWidth:w.wrap.getWidth(),minHeight:w.wrap.getHeight()});x.on("resize",function(B,z,y,A){w.setSize(w.wrap.getSize());NetSuite.RTEManager.resyncSizeAll(true);});var v=NetSuite.RTEManager.getDeferredInitializationInstance(w.getName());if(v!=null){v();NetSuite.RTEManager.unregisterDeferredRTEInitialization(w.getName());}NetSuite.RTEManager.finalizeIfLastInitialized(w.getName());}}})]});var t=Ext.getCmp("html-editor-"+a);this.textModeHasFocus=false;t.mandatory=false;t.finalized=false;t.defaultFontSize=e;t.flags=d?d:0;t.hddn=n;if(!t.hddn){t.hddn=document.createElement("INPUT");t.hddn.type="hidden";t.hddn.value=r;t.hddn.name=a;t.hddn.id=a;}t.value=r;t.defaultTextMode=m;t.defaultValue=r;t.onChangeFunc=o;if(o!=null&&typeof t.hddn.onchange!="function"){t.hddn.onchange=new Function(o);}Ext.get(h).appendChild(t.hddn);t.el.dom.onblur=function(y){y=y||window.event;var z=y.target||y.srcElement;var w=getHtmlEditor(z.id);w.hddn.ignoreValidation=true;w.textareaOnblur();w.hddn.ignoreValidation=false;var v=w.onChangeFunc.match(/validate_html\(this, '(.*)'\);};/);var x=(v&&v[1])||null;validate_html(w.hddn,x);};if(!Ext.isIE){t.el.dom.onkeyup=new Function("var editor = getHtmlEditor('html-editor-"+a+"'); NetSuite.RTEManager.saveSelection(document); editor.setValue( editor.getDisplayValue() ); editor.pushValue(); NetSuite.RTEManager.restoreSelection();");}t.el.dom.onfocus=new Function("getHtmlEditor('html-editor-"+a+"').textareaOnfocus()");NetSuite.RTEManager.registerRTE({widgetID:"html-editor-"+a,widgetComponentInstance:t,widgetHiddenElementID:a});t.lastEditMadeInSourceMode=t.defaultTextMode;NS.form.setChanged(false);if(p){t.setMandatory(true,'"+nl.getNLUser().getLook().getColors().m_bgrequiredfld+"');}if(f){t.setDisabled(true);}});};NLExtHtmlEditor.setValue=function(f,g,e){var d=((typeof e=="undefined")?false:e);var b=NetSuite.RTEManager.getInstance(f);if(b){if(b.hddn.value!=g){NS.form.setChanged(true);}var c=(b.value?b.value:"");b.value=g;b.hddn.value=b.value;if(b.onChangeFunc!=null){var a=b.hddn.onchange();if(a!=null&&!a){b.value=b.hddn.truncatedValue?b.hddn.value:c;b.hddn.value=b.value;b.setDisplayValue(b.value);}}if(d){b.setDisplayValue(b.value);}}};NLExtHtmlEditor.resetEditor=function(b){var a=NetSuite.RTEManager.getInstance(b);a.reset();a.setDesignMode(false);a.setDesignMode(true);a.lastEditMadeInSourceMode=this.defaultTextMode;};NLHtmlEditor.prototype.setValue=function NLHtmlEditor_setValue(d,c){var b=this.value;this.value=d;this.hddn.value=this.value;if(this.onChangeFunc!=null){var a=this.hddn.onchange();if(a!=null&&!a){this.value=this.hddn.truncatedValue?this.hddn.value:b;this.hddn.value=this.value;this.setDisplayValue(this.value);}}if(c){this.setDisplayValue(this.value);}};NLHtmlEditor.prototype.setDisplayValue=function NLHtmlEditor_setDisplayValue(f){var h=this.handleEscaping(f,true);var g=isValEmpty(h);if(this.textMode){if(g){this.editorText.value=NLHTMLEDITOR_SOURCECODE_HELPER_TEXT;this.editorText.style.fontFamily="courier";this.editorText.style.color="#666666";}else{this.editorText.value=h;this.editorText.style.fontFamily="";this.editorText.style.color="";}}else{if(g){h="<font color='#666666'>"+NLHTMLEDITOR_FORMATTED_HELPER_TEXT+"</font>";}this.editorHtml.contentWindow.document.open();var e=getStyleForClass("smalltext","fontSize");var b=getCascadedStyle(document.body,"fontFamily","font-family");this.editorHtml.contentWindow.document.write("<html><body contenteditable='true' width=100%; height=100%; topmargin=1 leftmargin=1 style='font-size: "+e+"; font-family: "+b+"'>");var d=(this.defaultFontSize!=null||this.defaultFont!=null)&&this.value==this.defaultValue;if(d){var k=this.defaultFontSize!=null?"size="+fontSizes[this.defaultFontSize]:"";var c=this.defaultFont!=null?"face='"+this.defaultFont+"'":"";this.editorHtml.contentWindow.document.write("<FONT "+k+" "+c+">");}var a=/\s*<div>(.*)<\/div>\s*$/i;if(!a.test(h.split("\n").join("\r"))){h="<DIV>"+h+"</DIV>";}this.editorHtml.contentWindow.document.write(h);if(d){this.editorHtml.contentWindow.document.write("</FONT>");}this.editorHtml.contentWindow.document.write("</body></html>");this.editorHtml.contentWindow.document.close();if(this.mandatory){this.editorHtml.contentWindow.document.body.style.backgroundColor=this.mandatoryBgColor;}else{this.editorHtml.contentWindow.document.body.style.backgroundColor=getRuntimeStyle(this.editorText,"backgroundColor");}setTimeout(this.setupEventHandlers.bind(this),500);}};NLHtmlEditor.prototype.stripExtraDivs=function NLHtmlEditor_stripExtraDivs(d){var e=/<div/i;var c=/<\/div>/i;var m=/^>/;var a=/^>.*<BR(>| .*>)\s*$/i;var b=/<BR(>| .*>)\s*$/i;var l=(" "+d+" ").split(e);var o=new Array();o.push(l[0]);for(var g=1;g<l.length;g++){var p=l[g].split(c);o.push(p[0]);for(var f=1;f<p.length;f++){var h=o.pop();if(a.test(h)){h=h.substring(1);}else{if(m.test(h)){h=h.substring(1)+"<BR>";}else{if(!m.test(h)){h="<div"+h+"</div>";}}}o.push(o.pop()+h+p[f]);}}var n=o.pop();n=n.substring(0,n.length-1);while(b.test(n)){n=n.replace(b,"");}o.push(n);d=o.join("<div");d=d.substring(1);return d;};NLHtmlEditor.prototype.handleEscaping=function NLHtmlEditor_handleEscaping(b,a){if(!isValEmpty(b)&&!this.textMode){b=this.stripExtraDivs(b);b=b.replace(/<STRONG>/gi,"<B>").replace(/<\/STRONG>/gi,"</B>").replace(/<EM>/gi,"<I>").replace(/<\/EM>/gi,"</I>");b=a?b.replace(/<NL([^>]{2,})>/g,"&lt;NL$1&gt;"):b.replace(/&lt;NL([^&\]]{2,})(&gt;|>)/g,"<NL$1>");b=a?b.replace(/<(SCRIPT)\b/gi,"<!--NLHIDE:$1").replace(/(<\/SCRIPT\s*)>/gi,"$1:NLHIDE-->"):b.replace(/<\!--NLHIDE:/g,"<").replace(/:NLHIDE-->/g,">");}return b;};NLHtmlEditor.prototype.insertValue=function NLHtmlEditor_insertValue(h,l){if(isValEmpty(h)){return;}if(this.disabled){return;}if(!l){this.setFocus();setTimeout(new Function("getHtmlEditor('"+this.name+"').insertValue('"+h+"',true)"),200);return;}var e=this.handleEscaping(h,true);var a,d;var g=this.textMode?document:this.editorHtml.contentWindow.document;if((this.textMode&&this.editorText.value==NLHTMLEDITOR_SOURCECODE_HELPER_TEXT)||(!this.textMode&&this.getValue()!=null&&this.getDisplayValue().indexOf(NLHTMLEDITOR_FORMATTED_HELPER_TEXT)!=-1)){this.setDisplayValue(e);}else{if(window.getSelection){a=this.textMode?window.getSelection():this.editorHtml.contentWindow.getSelection();d=a.getRangeAt(0);var c=g.createTextNode(this.textMode?e:h);if(d.startContainer.tagName=="DIV"&&d.startContainer.firstChild.tagName=="TEXTAREA"){var b=d.startContainer.firstChild;var f=b.selectionEnd+e.length;b.value=b.value.substring(0,b.selectionEnd)+e+b.value.substring(b.selectionEnd);b.selectionStart=b.selectionEnd=f;}else{if(d.collapsed){d.insertNode(c);}else{var k=g.createDocumentFragment();k.appendChild(d.extractContents());k.appendChild(c);d.insertNode(k);}d.selectNodeContents(c);d.collapse(false);d.commonAncestorContainer.normalize();}}else{if(g.selection){a=g.selection;d=a.createRange();if(this.textMode){d.text=d.text+e;}else{d.pasteHTML(d.htmlText+e);}d.collapse(false);d.select();}}}this.setValue(this.getDisplayValue());};NLHtmlEditor.prototype.setMandatory=function NLHtmlEditor_setMandatory(b,a){this.mandatory=b;this.mandatoryBgColor=a!=null?a:"#FFFFE5";if(this.mandatoryBgColor.charAt(0)!="#"){this.mandatoryBgColor="#"+this.mandatoryBgColor;}this.editorText.className="input"+(this.mandatory?"req":"");this.editorHtml.contentWindow.document.body.style.backgroundColor=this.mandatory?this.mandatoryBgColor:"#FFFFFF";};NLHtmlEditor.prototype.getMandatory=function NLHtmlEditor_getMandatory(){return this.mandatory;};NLHtmlEditor.prototype.handleToolBarEvent=function NLHtmlEditor_handleToolBarEvent(c,b){this.editorHtml.contentWindow.document.body.focus();if(this.range){var a=this.editorHtml.contentWindow.getSelection();a.empty();a.setBaseAndExtent(this.range.baseNode,this.range.baseOffset,this.range.extentNode,this.range.extentOffset);}if(this.disabled){return;}if(this.textMode){return;}if(c=="FontName"||c=="FontSize"||c=="ForeColor"){if(!isValEmpty(b)){this.editorHtml.contentWindow.document.execCommand(c,false,b);var d=this.editorHtml.contentWindow.document.body.firstChild;if(isValEmpty(d.innerHTML)&&d.nodeType!=3){if(c=="FontName"){d.style.fontFamily=b;}else{if(c=="FontSize"){d.style.fontSize=_getFontSizePts(b)+"pt";}else{if(c=="ForeColor"){d.style.color=b;}}}}}}else{this.editorHtml.contentWindow.document.execCommand(c,false,null);}this.setValue(this.getDisplayValue());this.bookmarkSelection();this.syncToolBarWithEditor(c,b);};NLHtmlEditor.prototype.scheduleEditorEventHandler=function NLHtmlEditor_scheduleEditorEventHandler(b,a){if(this.disabled){return;}setTimeout(new Function("getHtmlEditor('"+this.name+"').handleEditorEvent('"+b+"')"),a);};NLHtmlEditor.prototype.handleEditorEvent=function NLHtmlEditor_handleEditorEvent(b,c){if(this.disabled){return true;}if(this.responseLock){if(b!="mouseup"){this.responseQueue++;}return true;}this.responseLock=true;var a=new Function("var editor = getHtmlEditor('"+this.name+"'); editor.responseLock = false; if ( editor.responseQueue > 0 ) { editor.responseQueue = 0; editor.handleEditorEvent('"+b+"'); }");setTimeout(a,333);if(this.getValue()!=null&&this.getDisplayValue().indexOf(NLHTMLEDITOR_FORMATTED_HELPER_TEXT)==-1&&this.getDisplayValue()!=this.getValue()){this.setValue(this.getDisplayValue());}if(b=="mousedown"){this.iFrameOnfocus();}this.bookmarkSelection();if(this.ToolbarUpdateTimer){clearTimeout(this.ToolbarUpdateTimer);}this.ToolbarUpdateTimer=setTimeout(function(){this.syncToolBarWithEditor();}.bind(this),100);return true;};NLHtmlEditor.prototype.bookmarkSelection=function NLHtmlEditor_bookmarkSelection(){var a=this.editorHtml.contentWindow.getSelection();if(a&&a.anchorNode&&a.focusNode){range=new Object();range.baseNode=a.baseNode;range.baseOffset=a.baseOffset;range.extentNode=a.extentNode;range.extentOffset=a.extentOffset;this.range=range;}};NLHtmlEditor.prototype.resetEditor=function NLHtmlEditor_resetEditor(){this.setValue(this.defaultValue);var a=this.toggleHeader.firstChild;if(a!=null&&((this.defaultTextMode&&!a.checked)||(!this.defaultTextMode&&a.checked))){setFormValue(this.toggleHeader.firstChild,this.defaultTextMode);}this.setEditorMode(this.defaultTextMode);};NLHtmlEditor.prototype.setDisabled=function NLHtmlEditor_setDisabled(a){this.disableToolBar(a);this.editor.disabled=a;if(this.textMode){this.editorText.disabled=a;}else{this.editorHtml.contentWindow.document.body.disabled=a;}this.toggleHeader.disabled=a;this.toggleHeader.firstChild.disabled=a;this.disabled=a;};NLHtmlEditor.prototype.disableToolBar=function NLHtmlEditor_disableToolBar(c){this.toolbar.disabled=c;var a=this.toolbar.getElementsByTagName("BUTTON");for(var b=0;b<a.length;b++){a[b].disabled=c;if(c&&a[b].className=="editorbuttondown"){a[b].className="editorbutton";}}a=this.toolbar.getElementsByTagName("SPAN");for(var b=0;b<a.length;b++){a[b].disabled=c;}a=this.toolbar.getElementsByTagName("IMG");for(var b=0;b<a.length;b++){a[b].disabled=c;}if(useNLDropdownMenu){var a=this.toolbar.getElementsByTagName("INPUT");for(var b=0;b<a.length;b++){if(isNLDropDown(a[b])){disableSelect(a[b],c);}}}else{var a=this.toolbar.getElementsByTagName("SELECT");for(var b=0;b<a.length;b++){disableSelect(a[b],c);}}};NLHtmlEditor.prototype.syncToolBarWithEditor=function NLHtmlEditor_syncToolBarWithEditor(c,k){if(this.disabled){return;}if(this.textMode){return;}var h=this.editorHtml.contentWindow.document;var d=this.toolbar.getElementsByTagName("BUTTON");for(var f=0;f<d.length;f++){var c=d[f].btnCommand;try{if(h.queryCommandState(c)){d[f].className="editorbuttondown";}else{d[f].className="editorbutton";}}catch(g){d[f].className="editorbutton";}}var k=h.queryCommandValue("fontsize");if(!k||k.length==0){k="";}else{if(k.indexOf("px")>0||k.indexOf("pt")>0){k=k.substr(0,k.length-2);k=getFontSizeFromPixel(k);}}setSelectValue(document.getElementById(this.name+"_toolbar_fontsize_fs"),k);k=h.queryCommandValue("fontname");var b=document.getElementById(this.name+"_toolbar_fontname_fs");var a=getSelectValueArray(b);if(k){for(var f=0;f<a.length;f++){if(a[f].length>0&&k.indexOf(a[f])>=0){setSelectIndex(b,f);break;}}}if(f==a.length){setSelectValue(document.getElementById(this.name+"_toolbar_fontname_fs"),"");}k=h.queryCommandValue("forecolor");var l="";if(k){l=(String(k).charAt(0)=="#")?k:getHexColorValue(k);}setSelectValue(document.getElementById(this.name+"_toolbar_fontcolor_fs"),l);};function getHexColorValue(b){if(typeof b!="number"){if(b.indexOf("rgb(")==0){var a=b.substring(4,b.length-1).split(",");return"#"+getTwoDigitHexString(a[0])+getTwoDigitHexString(a[1])+getTwoDigitHexString(a[2]);}}else{return getHexValueFromDecimal(b);}}NLHtmlEditor.prototype.setToggleLinks=function NLHtmlEditor_setToggleLinks(b,a){this.setActiveToggleLink(b,this.textMode?NLHTMLEDITOR_SOURCECODE_LABEL:NLHTMLEDITOR_FORMATTED_LABEL);this.setInactiveToggleLink(a,this.textMode?NLHTMLEDITOR_FORMATTED_LABEL:NLHTMLEDITOR_SOURCECODE_LABEL,!this.textMode);};NLHtmlEditor.prototype.setActiveToggleLink=function NLHtmlEditor_setActiveToggleLink(b,a){b.onclick=new Function("return false;");b.removeAttribute("href");b.innerHTML="<b>"+a+"</b>&nbsp;";b.className="textnolink";};NLHtmlEditor.prototype.setInactiveToggleLink=function NLHtmlEditor_setInactiveToggleLink(b,a,c){b.onclick=new Function("getHtmlEditor('"+this.name+"').setEditorMode("+c+"); return false;");b.href="javascript:void('"+a+"')";b.innerHTML="("+a+")";b.className="dottedlink";};NLHtmlEditor.prototype.setEditorMode=function NLHtmlEditor_setEditorMode(a){if(this.disabled){return;}this.textMode=a;if(a){if(this.editorText==null){return;}if(document.getElementById(this.editorHtml.id)!=null){this.editor.removeChild(this.editorHtml);if(this.editorText.style.width=="100%"){this.editorText.style.width=document.getElementById(this.name+"_main").offsetWidth;}}this.setDisplayValue(this.value);this.editor.appendChild(this.editorText);this.toolbar.style.display="none";this.setupEventHandlers();}else{if(this.editorHtml==null){return;}if(document.getElementById(this.editorText.id)!=null){this.editor.removeChild(this.editorText);}this.editor.appendChild(this.editorHtml);this.setDisplayValue(this.value);this.toolbar.style.display="inline";}this.setToggleLinks(this.toggleSpan.childNodes[0],this.toggleSpan.childNodes[1]);};NLHtmlEditor.prototype.getFieldId=function NLHtmlEditor_getFieldId(){return(this.textMode)?this.editorText.id:this.editorHtml.id;};NLHtmlEditor.prototype.getField=function NLHtmlEditor_getField(){return(this.textMode)?this.editorText:this.editorHtml.contentWindow.document.body;};NLHtmlEditor.prototype.setupEventHandlers=function NLHtmlEditor_setupEventHandlers(){if(this.textMode){this.editorText.onblur=new Function("var editor = getHtmlEditor('"+this.name+"'); editor.setValue( editor.getDisplayValue() )");this.editorText.onfocus=new Function("getHtmlEditor('"+this.name+"').textareaOnfocus()");}else{if(document.addEventListener){this.editorHtml.contentWindow.document.onkeydown=null;this.editorHtml.contentWindow.document.onkeypress=null;this.editorHtml.contentWindow.document.onkeyup=null;this.editorHtml.contentWindow.document.onmousedown=null;this.editorHtml.contentWindow.document.onmouseup=null;this.editorHtml.contentWindow.document.body.oncut=null;this.editorHtml.contentWindow.document.body.onpaste=null;this.editorHtml.contentWindow.document.onfocus=null;this.editorHtml.contentWindow.document.addEventListener("keydown",function(a){return this.handleEditorEvent("keydown",a);}.bind(this),false);this.editorHtml.contentWindow.document.addEventListener("keypress",function(a){return this.handleEditorEvent("keypress",a);}.bind(this),false);this.editorHtml.contentWindow.document.addEventListener("mouseup",function(a){return this.handleEditorEvent("mouseup",a);}.bind(this),false);this.editorHtml.contentWindow.document.addEventListener("mousedown",function(a){return this.handleEditorEvent("mousedown",a);}.bind(this),false);this.editorHtml.contentWindow.document.addEventListener("cut",function(a){this.scheduleEditorEventHandler("cut",100,a);}.bind(this),false);this.editorHtml.contentWindow.document.addEventListener("paste",function(a){this.scheduleEditorEventHandler("paste",100,a);}.bind(this),false);this.editorHtml.contentWindow.document.addEventListener("focus",function(a){this.iFrameOnfocus();}.bind(this),true);}else{this.editorHtml.contentWindow.document.onkeydown=new Function("getHtmlEditor('"+this.name+"').handleEditorEvent('keydown')");this.editorHtml.contentWindow.document.onkeypress=new Function("getHtmlEditor('"+this.name+"').handleEditorEvent('keypress')");this.editorHtml.contentWindow.document.onkeyup=new Function("getHtmlEditor('"+this.name+"').handleEditorEvent('keyup')");this.editorHtml.contentWindow.document.onmousedown=new Function("getHtmlEditor('"+this.name+"').handleEditorEvent('mousedown')");this.editorHtml.contentWindow.document.onmouseup=new Function("getHtmlEditor('"+this.name+"').handleEditorEvent('mouseup')");this.editorHtml.contentWindow.document.body.oncut=new Function("getHtmlEditor('"+this.name+"').scheduleEditorEventHandler( 'cut', 100 )");this.editorHtml.contentWindow.document.body.onpaste=new Function("getHtmlEditor('"+this.name+"').scheduleEditorEventHandler( 'paste', 100 )");this.editorHtml.onfocus=new Function("getHtmlEditor('"+this.name+"').iFrameOnfocus()");this.editorHtml.onblur=new Function("getHtmlEditor('"+this.name+"').iFrameOnblur();");}}};NLHtmlEditor.prototype.iFrameOnfocus=function NLHtmlEditor_iFrameOnfocus(){var a=this.editorHtml.contentWindow.document;if(a.body.innerHTML.indexOf(NLHTMLEDITOR_FORMATTED_HELPER_TEXT)>-1){a.body.innerHTML="<div><br></div>";a.body.focus();}};NLHtmlEditor.prototype.iFrameOnblur=function NLHtmlEditor_iFrameOnblur(){var a=this.editorHtml.contentWindow.document;a.body.contentEditable=false;return true;};NLHtmlEditor.prototype.textareaOnfocus=function NLHtmlEditor_textareaOnfocus(){if(this.editorText.value==NLHTMLEDITOR_SOURCECODE_HELPER_TEXT){this.editorText.style.fontFamily="";this.editorText.style.color="";this.editorText.value="";}};NLHtmlEditor.prototype.setFocus=function NLHtmlEditor_setFocus(){if(this.disabled){return;}if(this.textMode){setTimeout(new Function("getHtmlEditor('"+this.name+"').editorText.focus()"),100);}else{setTimeout(new Function("getHtmlEditor('"+this.name+"').editorHtml.contentWindow.document.body.focus()"),100);}};function insertHtmlValue(b,f){var c=getHtmlEditor(b);if(c!=null){c.insertValue(f,false);return;}var e=document.getElementById(b);if(e){var d=e.textLength;var g=e.selectionStart;var a=e.selectionEnd;if(a==1||a==2){a=d;}e.value=e.value.substring(0,g)+f+e.value.substr(a,d);}}function setHtmlFieldValue(a,d,c){if(a==null){return;}if(c==null){c=window;}var b=c.getHtmlEditor(a.name);if(b!=null){b.setValue(d,true,true);}else{a.value=d;}}function disableHtmlField(c,a){if(a==null){return;}var b=getHtmlEditor(a.name);if(b!=null){b.setDisabled(c);}else{a.disabled=c;}}function resetHtmlEditors(a){if(typeof NetSuite=="object"&&typeof NetSuite.RTEManager=="object"){NetSuite.RTEManager.getMap().eachKey(function(b,d){var c=d.obj;if(a==null||c.hddn.form==a){NLExtHtmlEditor.resetEditor(b);}});}}function getHtmlEditor(a){if(typeof Ext!="object"||typeof NetSuite!="object"){return null;}if(typeof a=="undefined"||a==null){return null;}if(a.indexOf("html-editor-")!=0){a="html-editor-"+a;}return NetSuite.RTEManager.getInstance(a);}function getSelectedElement(b){var a=null;if(b.document.selection){selection=b.document.selection;range=selection.createRange();try{a=range.parentElement();}catch(c){return null;}}else{try{selection=b.getSelection();range=selection.getRangeAt(0);}catch(c){return null;}a=range.commonAncestorContainer;}return a;}function updateQuickDateSelector(d){var c=document.getElementById("quickdateselector");if(c!=null){var e=c.onchange;c.onchange=null;var b=getDropdown(c);if(b!=null){var a=b.getIndexForValue(d);b.setIndex(a);}c.onchange=e;}}function statusMessage(a,b){if(a==null){a=2000;}window.status=b;setTimeout("window.status = ''",a);}function NLAccelMenu_cancelCurrentTimer(){var a=window.accelMenuDiv;if(a&&a.nTimerId){clearTimeout(a.nTimerId);a.nTimerId=0;}}function NLAccelMenu_closeCurrentMenu(){var b=window.accelMenuDiv;if(b){var a=b.getAttribute("bMachine")=="T";NLAccelMenu_cancelCurrentTimer();b.style.display="none";b.img.src="/images/nav/popupselectup"+(a?"":"2")+".gif";b.img.className=b.img.className.replace("_focus","");}window.accelMenuDiv=null;}function NLAccelMenu_onMouseOut(a){var b=window.accelMenuDiv;if(b){b.nTimerId=setTimeout(function(){NLAccelMenu_closeCurrentMenu();},200);}}function NLAccelMenu_onMouseOver(a){NLAccelMenu_cancelCurrentTimer();}function NLAccelMenu_onButtonClick(b,c,f,d){var e=document.getElementById(c);e.setAttribute("bMachine",f?"T":"F");d.src="/images/nav/popupselectdown"+(f?"":"2")+".gif";e.img=d;if(d!=null){d.className=d.className+"_focus";}NLAccelMenu_closeCurrentMenu();window.accelMenuDiv=e;e.parentNode.style.display="inline";e.style.display="";var a=e.firstChild.offsetWidth;if(a!=undefined){e.style.width=a;}e.style.display="block";e.parentNode.style.zIndex="9000";NLAccelMenu_positionDIV(e);}function NLAccelMenu_positionDIV(e){var d=findPosY(e.img);var c=d+22;var a=getDocumentHeight();var b=parseInt(e.offsetHeight);if(c+b>a){d=-b;}else{d=22;}e.style.top=d;}function NLAccelMenuButton_onMouseDown(a){a.firstChild.onclick();}function NLAccelMenuButton_onMouseOver(a){a.className="dropdownSelected";}function NLAccelMenuButton_onMouseOut(a){a.className="dropdownNotSelected";}var burstTimer=0;var bursting=-1;var newBGImageMap=new Array();newBGImageMap[0]="/images/icons/dashboard/top_bkg.gif";newBGImageMap[1]="/images/icons/dashboard/left_edge_bkg.gif";newBGImageMap[2]="/images/icons/dashboard/right_edge_bkg.gif";newBGImageMap[3]="/images/icons/dashboard/bottom_edge_bkg.gif";function showBurstRollover(h,d,b,p){try{clearTimeout(burstTimer);if(bursting==b+"_"+p){return;}if(h!=null&&d!=null&&d.length>0){var m=findPosY(h);var c=findPosX(h);var n=document.getElementById("rptsnap"+p);if(n!=null){m-=n.scrollTop;}var a=document.getElementById("burst_div_"+p);if(a!=null){if(a.getAttribute("_setBG")!="T"){var l=a.firstChild.getElementsByTagName("TD");for(var g=0;g<l.length;g++){if(l[g].getAttribute("_resbg")!=null){var o=Number(l[g].getAttribute("_resbg"));l[g].style.backgroundImage="url("+newBGImageMap[o]+")";}}a.setAttribute("_setBG","T");}dateSpan=document.getElementById("date_span_"+p);dateSpan.removeChild(dateSpan.firstChild);var f=document.createTextNode(d);dateSpan.appendChild(f);a.style.display="block";a.style.position="absolute";a.style.top=m+8;a.style.left=c-32;bursting=b+"_"+p;}}}catch(k){}}function removeBurst(a){burstTimer=setTimeout(new Function("removeBurstNow('"+a+"');"),200);}function removeBurstNow(a){var b=document.getElementById("burst_div_"+a);if(b!=null){b.style.display="none";bursting=-1;}}function expandCollapseNode(m,a){var h=document.getElementById(m+"_top");var c=document.getElementById(m+"_total");if(h==null||c==null){return;}var g=findClassUp(h,"enhtable");var l=h.getAttribute("_nototals")=="T";var n=g.rows[h.rowIndex+1];var e=n.style.display==""||n.style.display=="block"?"none":"";setHrefToggleLabel(e,a);if(!l){if(e!="none"){expandNodeRestoreData(h);}else{collapseNodeCopyData(h,c);}}var k=null;var f=0;for(var d=h.rowIndex+1;d<=c.rowIndex;d++){k=g.rows[d];if(f>0&&k.id==null){continue;}var b=f;if(e!="none"&&k.id!=null){if(k.id.substring(k.id.length-4)=="_top"&&k.firstChild.firstChild.getAttribute("_state")=="plus"){f++;}else{if(k.id.substring(k.id.length-6)=="_total"&&document.getElementById(k.id.substring(0,k.id.length-6)+"_top").firstChild.firstChild.getAttribute("_state")=="plus"){f=Math.max(f-1,0);}}if(b>0){continue;}}if(!(e!="none"&&l&&k.id.substring(k.id.length-6)=="_total")){k.style.display=e;}}}function setHrefToggleLabel(b,a){if(b!="none"){a.firstChild.src="/images/nav/reporting/tree_minus.gif";a.setAttribute("_state","minus");}else{a.firstChild.src="/images/nav/reporting/tree_plus.gif";a.setAttribute("_state","plus");}}function expandNodeRestoreData(a){if(a!=null){for(var b=1;b<a.cells.length;b++){if(a.cells[b].getAttribute("_orightml")!=null&&a.cells[b].getAttribute("_orightml").length>1){a.cells[b].innerHTML=a.cells[b].getAttribute("_orightml");a.cells[b].className=a.cells[b].getAttribute("_origclass");a.cells[b].align=a.cells[b].getAttribute("_origalign");}else{a.cells[b].innerHTML="&nbsp;";}}}}function collapseNodeCopyData(b,a){if(a!=null&&b!=null){for(var c=1;c<a.cells.length;c++){b.cells[c].setAttribute("_orightml",b.cells[c].innerHTML);b.cells[c].setAttribute("_origclass",b.cells[c].className);b.cells[c].setAttribute("_origalign",b.cells[c].align);b.cells[c].align=a.cells[c].align;b.cells[c].className=a.cells[c].className;b.cells[c].innerHTML=a.cells[c].innerHTML;}}}function manageScrollDiv(d,c){var b=document.getElementById(d);if(b!=null){if(b.className=="scrollarea"&&b.scrollHeight>325){return;}var a=false;if(b.offsetHeight>325){b.className="scrollarea";b.style.height="325";document.getElementById("scrl_line_"+d).style.display="";a=true;}else{b.className="";b.style.height="";document.getElementById("scrl_line_"+d).style.display="none";}if(c!=null&&c!=-1){resetLabelRowCellSizes(document.getElementById("enhlabel"+c),b.firstChild,a);}}}function resetLabelRowCellSizes(k,a,q){if(k!=null&&a!=null){clearAllWidths(a);var f=a.rows[0];f.style.display="";var l=a.rows[1];if(l==null||l.cells.length<=1){f.style.display="none";return;}var d=a.offsetWidth-(q?17:0);var c=k.parentNode.parentNode.offsetWidth;var e=new Array();for(var b=0;b<l.cells.length;b++){e[b]=l.cells[b].offsetWidth;}for(var h=(k.cells.length-1);h>=0;h--){var s=null;var r=h==(k.cells.length-1);var n=k.cells.length<=2||h>1;if(r){if(q){k.cells[h].style.paddingRight="16px";}else{k.cells[h].style.paddingRight="";}}var o=(((e[h]+(r&&q?17:0))/c)*100);var m=((e[h]/d)*100);k.cells[h].style.width=n?o+"%":(e[h]+(r&&q?17:0));for(var g=0;g<a.rows.length;g++){s=a.rows[g];if(s.cells[h]==null||s.id=="_totallinerow"){continue;}s.cells[h].style.width=n?m+"%":e[h];}}f.style.display="none";}}function clearAllWidths(c){for(var b=0;b<c.rows.length;b++){for(var a=0;a<c.rows[b].cells.length;a++){c.rows[b].cells[a].style.width="";}}}var iMAX_SUGGESTIONS=25;var popupsuggesttimer=0;var hidesuggesttimer=0;var loadingimagetimer=0;var hideloadingimagetimer=0;var popupAutoSuggest=null;var autoSuggestSeqNum=0;var highestSeqNumReturned=0;function NLPopupAutoSuggest(){this.inputfield;this.mapkey;this.uniqueuserkey;this.asheep;this.initialLastUserVal;this.fieldname;this.fieldname_hidden;this.fieldvalue;this.optionmasterfield;this.xPos;this.yPos;this.suggestiondiv;this.visible=false;this.currentcell;this.bUbersearch=false;this.bmultiselect=false;this.bautoselectsingleresult=true;this.bOnlyOneResult=false;}NLPopupAutoSuggest.prototype.setAttributes=function NLPopupAutoSuggest_setAttributes(b,a,c,d){this.inputfield=b;this.mapkey=a;this.fieldname=b.name;this.fieldname_hidden=this.fieldname.indexOf("_display")>0?this.fieldname.substring(0,this.fieldname.indexOf("_display")):this.fieldname;this.fieldvalue=b.value;this.optionmasterfields=d;this.bautoselectsingleresult=c;this.xPos=findPosX(b);this.yPos=findPosY(b);this.currentcell=-1;this.bUbersearch=a=="uberautosuggest";this.bmultiselect=NLPopupAutoSuggest_isMultiSelect(b);if(isValEmpty(this.uniqueuserkey)){this.asheep=b.getAttribute("asheep");this.uniqueuserkey=b.getAttribute("asuuk");this.initialLastUserVal=GetCookie("lastUser")+"_"+GetCookie("JSESSIONID");}};function constructSuggestionBoxFromResponse(response){if(popupAutoSuggest!=null){hideAutoSuggestLoadingImage();var objJSON,autoFillResults;try{objJSON=eval("("+response.getBody()+")");var seqNum=parseInt(objJSON.circid);if(highestSeqNumReturned>seqNum){return;}highestSeqNumReturned=seqNum;autoFillResults=objJSON.autofill;}catch(e){return;}if(autoFillResults.length>0){var i;var sHtml=new StringBuffer();sHtml.append("<table cellpadding=0 cellspacing=0 border=0><tbody>");for(i=0;i<autoFillResults.length;i++){sHtml.append("<tr>");popupAutoSuggest.constructCell(sHtml,autoFillResults[i],popupAutoSuggest.fieldname_hidden);sHtml.append("</tr>");}if(i==iMAX_SUGGESTIONS){sHtml.append("<tr>");popupAutoSuggest.constructMoreCell(sHtml,popupAutoSuggest.fieldname_hidden,popupAutoSuggest.fieldvalue);sHtml.append("</tr>");}sHtml.append("</tbody></table>");popupAutoSuggest.showSuggestionBox(sHtml.toString());if(popupAutoSuggest.bautoselectsingleresult&&i==1){popupAutoSuggest.selectNextCell();popupAutoSuggest.bOnlyOneResult=true;}}else{popupAutoSuggest.showSuggestionBox(getAutoSuggestMessageHTML("No results found"));hidesuggesttimer=setTimeout("popupAutoSuggest.hideSuggestionBox()",2000);}}}function logAutoSuggestSessionError(b,c){var d=b.uniqueuserkey+"%20|%20"+b.initialLastUserVal;var a=c+"%20|%20"+GetCookie("lastUser")+"_"+GetCookie("JSESSIONID");parent.document.location="/core/pages/logAutoSuggestSessionError.nl?olduserkey="+d+"&newuserkey="+a;}function getAutoSuggestMessageHTML(a){var b=new StringBuffer();b.append("<table cellpadding=0 cellspacing=0 border=0><tbody>");b.append("<tr><td style='padding:2' class=tinygraytext>"+a+"</td></tr>");b.append("</tbody></table>");return b.toString();}function hideAutoSuggestLoadingImage(){clearTimeout(loadingimagetimer);clearTimeout(hideloadingimagetimer);if(popupAutoSuggest!=null){popupAutoSuggest.inputfield.style.backgroundImage="";}}function showAutoSuggestRefineSearchMessage(){if(popupAutoSuggest!=null){popupAutoSuggest.showSuggestionBox(getAutoSuggestMessageHTML("Please enter more characters or click Go"));hidesuggesttimer=setTimeout("popupAutoSuggest.hideSuggestionBox()",4000);}}function showAutoSuggestLoadingImage(){clearTimeout(hideloadingimagetimer);if(popupAutoSuggest!=null){popupAutoSuggest.inputfield.style.backgroundImage="url(/images/help/animated_loading.gif)";popupAutoSuggest.inputfield.style.backgroundRepeat="no-repeat";popupAutoSuggest.inputfield.style.backgroundPosition="100% 1";hideloadingimagetimer=setTimeout("hideAutoSuggestLoadingImage(); showAutoSuggestRefineSearchMessage();",10*1000);}}NLPopupAutoSuggest.prototype.constructSuggestionBox=function NLPopupAutoSuggest_constructSuggestionBox(){if(this.fieldvalue!=null&&trim(this.fieldvalue).length>0){try{var d="cur_val="+encode(this.bmultiselect?getCurrentMultiSelectUserInputValue(this.inputfield):this.fieldvalue);if(this.optionmasterfields!=null){for(var a in this.optionmasterfields){d+="&si_"+a+"="+encode(getSelectValue(this.optionmasterfields[a]));}}var b="/app/common/autosuggest.nl?mapkey="+this.mapkey+"&circid="+(++autoSuggestSeqNum)+"&"+d;loadingimagetimer=setTimeout("showAutoSuggestLoadingImage()",1000);nlXMLRequestURL(b,null,null,new Function("response","constructSuggestionBoxFromResponse(response);"),true);}catch(c){}}};NLPopupAutoSuggest.prototype.constructCell=function NLPopupAutoSuggest_constructCell(b,d,a){if(this.bUbersearch){var c=(d.bedit=="T");b.append("<td nowrap style='padding:1 3 2 3;' class='autosuggcell text'>");b.append("<table cellpadding=0 cellspacing=0 border=0 width='100%'><tr>");b.append("<td nowrap>");b.append('<a class=smalltextnolink href="'+d.key+"\" onclick='popupAutoSuggest.hideSuggestionBox(true); return true;'>");if(!isValEmpty(d.descr)){b.append("<span></span><span style='color:#666666'><i>"+d.descr+":&nbsp;</i></span><span>"+d.sname+"</span>");}else{b.append(d.sname);}b.append("</a>");b.append("</td>");b.append("<td style='padding-left:7; padding-right:2' class=text align=right valign=bottom>");b.append("<span style='visibility:hidden'>");if(!isValEmpty(d.dashurl)){b.append("<a"+(c?" style='position:relative; top:2'":"")+" href='"+d.dashurl+"' onclick='popupAutoSuggest.hideSuggestionBox(true); return true;' class=text title='View Dashboard'>");b.append("<img class='i_dashboard_white' border=0 src='/images/nav/ns_x.gif' width=14 height=12>");b.append("</a>");if(c){b.append("&nbsp;&nbsp;");}}b.append('<a href="'+d.key+"&e=T\" onclick='popupAutoSuggest.hideSuggestionBox(true); return true;' class=textwhite"+(!c?" style='display:none'":"")+">Edit</a>");b.append("</span>");b.append("</td>");b.append("</tr>");b.append("</table>");b.append("</td>");}else{b.append("<td nowrap style='padding:1 3 2 3; cursor:hand;' class='autosuggcell text' ");b.append(" onmousedown='popupAutoSuggest.setValueFromSuggestion(\""+a+'", "'+d.key+"\", this, event); return false;'>");b.append(d.sname);b.append("</td>");}};NLPopupAutoSuggest.prototype.constructMoreCell=function NLPopupAutoSuggest_constructMoreCell(c,b,a){c.append("<td nowrap style='cursor:pointer; padding:1 3 2 3; font-style:italic;' class='autosuggcell text' ");c.append('onmousedown="NLPopupAutoSuggest_hidePopupSuggestion(); ');if(this.bUbersearch){c.append("popupAutoSuggest.runMoreUbersearch();");}else{var d=a.replace(/\'/g,"\\'").replace(/\"/g,"\\\\&quot;");c.append("NLPopupSelect_runMoreSearch('"+b+"', '"+d+"');");}c.append(' return false;">');c.append("More...");c.append("</td>");};NLPopupAutoSuggest.prototype.runMoreUbersearch=function NLPopupAutoSuggest_runMoreUbersearch(){document.getElementById("_searchSubmitter").onclick();};NLPopupAutoSuggest.prototype.selectCell=function NLPopupAutoSuggest_selectCell(a){if(a!=null){this.unSelectCurrentCell();a.className="dropdownSelected";if(this.bUbersearch&&a.firstChild&&a.firstChild.rows){setAutoSuggestCellProperties(a,true);}else{if(a.childNodes.length>1){a.childNodes[1].style.color="#EEEEEE";}}this.currentcell=Number(a.parentNode.rowIndex);}};NLPopupAutoSuggest.prototype.unSelectCell=function NLPopupAutoSuggest_unSelectCell(a){if(a!=null){a.className="autosuggcell text";if(this.bUbersearch&&a.firstChild&&a.firstChild.rows){setAutoSuggestCellProperties(a,false);}else{if(a.childNodes.length>1){a.childNodes[1].style.color="#666666";}}this.currentcell=-1;}};function setAutoSuggestCellProperties(d,c){var a=d.firstChild.rows[0].cells[0];var b=d.firstChild.rows[0].cells[1];a.firstChild.className=c?"textwhitenolink":"smalltextnolink";if(a.firstChild.childNodes.length>1){a.firstChild.childNodes[1].style.color=c?"#EEEEEE":"#666666";}b.firstChild.style.visibility=c?"visible":"hidden";}NLPopupAutoSuggest.prototype.selectCellByIndex=function NLPopupAutoSuggest_selectCellByIndex(b){var a=this.getCell(b);this.selectCell(a);};NLPopupAutoSuggest.prototype.unSelectCurrentCell=function NLPopupAutoSuggest_unSelectCurrentCell(){if(this.currentcell>=0){var a=this.getCell(this.currentcell);this.unSelectCell(a);}};NLPopupAutoSuggest.prototype.doUberSearchClick=function NLPopupAutoSuggest_doUberSearchClick(){var a=this.getCell(this.currentcell);if(a!=null&&a.firstChild&&a.firstChild.rows){var c=a.firstChild.rows[0].cells[0];c.firstChild.onclick();var b=c.firstChild.href;if(this.bOnlyOneResult&&!isValEmpty(this.fieldvalue)){if(this.fieldvalue.toUpperCase().indexOf("E ")==0||isUpperCase(this.fieldvalue.charAt(0))){b=addParamToURL(b,"e","T",true);}if(this.fieldvalue.indexOf("::")>0||this.fieldvalue.indexOf("^")>0){nlOpenWindow(b,"uberres2");}else{document.location=b;}}else{document.location=b;}}else{a.onmousedown();}};NLPopupAutoSuggest.prototype.getTableRows=function NLPopupAutoSuggest_getTableRows(){return this.suggestiondiv.firstChild.firstChild.childNodes;};NLPopupAutoSuggest.prototype.getCell=function NLPopupAutoSuggest_getCell(a){if(a>=0&&a<(this.getTableRows()).length){return this.getTableRows()[a].firstChild;}else{return null;}};NLPopupAutoSuggest.prototype.selectNextCell=function NLPopupAutoSuggest_selectNextCell(){var a=this.currentcell;this.unSelectCurrentCell();if(a>=0){if(++a>this.getTableRows().length-1){a=0;}this.selectCellByIndex(a);}else{this.selectCellByIndex(0);}};NLPopupAutoSuggest.prototype.selectPreviousCell=function NLPopupAutoSuggest_selectPreviousCell(){var a=this.currentcell;this.unSelectCurrentCell();if(a>=1){this.selectCellByIndex(a-1);}else{this.selectCellByIndex(this.getTableRows().length-1);}};NLPopupAutoSuggest.prototype.getSuggestionBoxDiv=function NLPopupAutoSuggest_getSuggestionBoxDiv(){if(this.suggestiondiv==null){this.suggestiondiv=document.createElement("DIV");this.suggestiondiv.style.position="absolute";this.suggestiondiv.style.backgroundColor="#FFFFFF";this.suggestiondiv.className="popupsuggest";this.suggestiondiv.style.borderColor="#999999";this.suggestiondiv.style.borderStyle="solid";this.suggestiondiv.style.borderWidth="1 1 1 1";this.suggestiondiv.style.display="none";this.suggestiondiv.style.zIndex="20";document.body.appendChild(this.suggestiondiv);}return this.suggestiondiv;};NLPopupAutoSuggest.prototype.showSuggestionBox=function NLPopupAutoSuggest_showSuggestionBox(a){clearTimeout(hidesuggesttimer);var b=this.getSuggestionBoxDiv();b.innerHTML=a;b.style.display="";this.visible=true;this.positionSuggestionBox();};NLPopupAutoSuggest.prototype.positionSuggestionBox=function NLPopupAutoSuggest_positionSuggestionBox(){var d=this.getSuggestionBoxDiv();d.style.overflow="";d.style.width="";d.firstChild.style.width="";var c=d.firstChild.offsetWidth;if(c>400){if((getDocumentClientWidth()-100)<d.firstChild.offsetWidth){d.style.overflow="hidden";}c=Math.min((getDocumentClientWidth()-100),d.firstChild.offsetWidth);d.style.width=c;}var b=this.xPos+(this.bmultiselect?1:0);var a=this.yPos+this.inputfield.offsetHeight-1;a+=0;if(d.offsetWidth<this.inputfield.offsetWidth){d.firstChild.style.width=this.inputfield.offsetWidth-2;}if(((this.yPos+this.inputfield.offsetHeight-1+d.offsetHeight)>getDocumentHeight())&&(this.yPos>(getDocumentHeight()-this.yPos))){a=this.yPos-d.offsetHeight+(this.bmultiselect?1:0);}if((this.xPos+c+10)>getDocumentWidth()){b=this.xPos-(c-this.inputfield.offsetWidth);}d.style.top=a;d.style.left=b;};NLPopupAutoSuggest.prototype.hideSuggestionBox=function NLPopupAutoSuggest_hideSuggestionBox(a){if(this.visible){clearTimeout(popupsuggesttimer);this.suggestiondiv.style.display="none";this.suggestiondiv.style.width="";this.suggestiondiv.style.overflow="";this.visible=false;if(a){this.inputfield.value="";}}};NLPopupAutoSuggest.prototype.addMultipleSelectValue=function NLPopupAutoSuggest_addMultipleSelectValue(d,c){var a=getFormElement(this.inputfield.form,this.fieldname);var b=getFormElement(this.inputfield.form,this.fieldname_hidden);addMultiSelectValue(b,d,c);a.value+="\n";setSelectionRange(a,a.value.length,a.value.length);};NLPopupAutoSuggest.prototype.setValueFromSuggestion=function NLPopupAutoSuggest_setValueFromSuggestion(d,g,c,h){setEventPreventDefault(h);setEventCancelBubble(h);NLPopupAutoSuggest_hidePopupSuggestion();if(this.bUbersearch){if(this.fieldvalue.indexOf("::")>0||this.fieldvalue.indexOf("^")>0){nlOpenWindow(g,"uberres2");}else{document.location=g;this.inputfield.value="";}}else{var b=getFormElement(this.inputfield.form,this.fieldname);if(b!=null){var f=c.innerHTML.replace(/&amp;/g,"&").replace(/&lt;/g,"<").replace(/&gt;/g,">");var a=getFormElement(this.inputfield.form,this.fieldname_hidden);if(this.bmultiselect){this.addMultipleSelectValue(g,f);b.haschanged=true;b.isvalid=true;if(a.onchange){a.onchange();}}else{b.value=f;var e=a.value;a.value=g;if(a.onchange){if(a.onchange()==false){a.value=e;b.value=b.getAttribute("previousvalue");}else{b.haschanged=true;b.isvalid=true;b.setAttribute("previousvalue",b.value);}}}NLPopupSelect_removeLoadingMessage();}}};function NLPopupAutoSuggest_makePopupSuggestion(b,a,c,d){if(popupAutoSuggest==null){popupAutoSuggest=new NLPopupAutoSuggest();}popupAutoSuggest.setAttributes(b,a,c,d);clearTimeout(popupsuggesttimer);popupsuggesttimer=setTimeout("popupAutoSuggest.constructSuggestionBox()",popupAutoSuggest.bUbersearch?250:200);}function autoSuggestOnMouseMove(a){if(popupAutoSuggest!=null){var b=findClassUp(getEventTarget(a),"autosuggcell text");if(b!=null){popupAutoSuggest.selectCell(b);}}}function NLPopupAutoSuggest_onMouseDown(a){if(popupAutoSuggest!=null){clearTimeout(popupsuggesttimer);if(popupAutoSuggest.visible){var b=findClassUp(getEventTarget(a),"popupsuggest");if(b==null){popupAutoSuggest.hideSuggestionBox();}}}}function NLPopupAutoSuggest_onKeyDown(a){try{if(popupAutoSuggest!=null&&popupAutoSuggest.visible){var b=getEventKeypress(a);if(b==40){popupAutoSuggest.selectNextCell();}else{if(b==38){popupAutoSuggest.selectPreviousCell();}else{if((b==13||b==9)&&popupAutoSuggest.currentcell>=0){if(popupAutoSuggest.bUbersearch){popupAutoSuggest.doUberSearchClick();}else{popupAutoSuggest.getCell(popupAutoSuggest.currentcell).onmousedown();}}}}}}catch(c){}}function NLPopupAutoSuggest_ignoreKeyStrokes(a){if(popupAutoSuggest!=null&&popupAutoSuggest.visible){var b=getEventKeypress(a);if(b==40||b==38||(popupAutoSuggest.currentcell>=0&&(b==13||b==9))){return true;}}return false;}function NLPopupAutoSuggest_isMultiSelect(a){return a.getAttribute("bmultiautosuggest")=="T";}function NLPopupAutoSuggest_handleKeyStroke(g,l,m,a,e){var h=NLPopupAutoSuggest_isMultiSelect(g)?getCurrentMultiSelectUserInputValue(g):g.value;var c=getEventKeypress(m);if(c==37||c==39){return false;}var b=trim(h);var k=b.length;var f=l=="uberautosuggest";if(f){var d=b.indexOf(":");if(d>0){k-=(d+1);}}if((k<=2&&b.charCodeAt(0)<2048&&(h!="%"||f))||c==13||c==9){NLPopupAutoSuggest_hidePopupSuggestion();}else{NLPopupAutoSuggest_makePopupSuggestion(g,l,a,e);}}function NLPopupAutoSuggest_hidePopupSuggestion(){clearTimeout(popupsuggesttimer);if(popupAutoSuggest!=null){popupAutoSuggest.hideSuggestionBox();}}function NLPopupSelect_runMoreSearch(fieldname,sValue){eval("Search"+fieldname+'("'+sValue+'")');}function NLPopupSelect_positionDIV(){var div=window.popupDIV;var bListOnly=div.getAttribute("bListOnly")=="T";var bActualMultiSelect=div.getAttribute("bMultiselect")=="T"&&!bListOnly;var bIsMultiButton=div.getAttribute("bIsMultiButton")=="T";var btn=div.getAttribute("displayField")!=null?NLPopupSelect_getDisplayField(div.getAttribute("displayField")):NLPopupSelect_getLaunchButton(div.getAttribute("launchbutton"),bIsMultiButton,bListOnly);var x;var y;if(div.getAttribute("bPositionWithMachine")=="T"&&div.getAttribute("machineName")!=null){try{var table=eval(div.getAttribute("machineName")+"_machine.tableobj;");var machine=table.machine;var column=0;for(var i=0;i<machine.countFormElements();i++){var elem=machine.getFormElement(i);if(elem!=null&&(elem.name==window.popupDIV.getAttribute("fieldName")||elem.name==window.popupDIV.getAttribute("fieldName")+"_display")){break;}if(elem.type!="hidden"&&machine.getFormElementLabel(i)!=null){column++;}}var cell=table.rows[(machine.currentRowNum)].cells[column];x=findAbsolutePosX(cell);y=findAbsolutePosY(cell)+5;}catch(err){x=btn==null?Math.max(lastX,10):findAbsolutePosX(btn)+(bIsMultiButton?1:0);y=btn==null?Math.max(lastY,10):findAbsolutePosY(btn)+(bIsMultiButton?1:0);}}else{x=btn==null?Math.max(lastX,10):findAbsolutePosX(btn)+(bIsMultiButton?1:0);y=btn==null?Math.max(lastY,10):findAbsolutePosY(btn)+(bIsMultiButton?1:0);}var scrollTopOffset=0;var scrollLeftOffset=0;if(btn!=null){var scrollDiv=findClassUp(btn,"scrollarea");if(scrollDiv!=null){scrollTopOffset=scrollDiv.scrollTop;scrollLeftOffset=scrollDiv.scrollLeft;}}var fx=x-scrollLeftOffset;var fy=y+15-scrollTopOffset;var iDocHeight=getDocumentHeight();var iDocWidth=getDocumentWidth()-40;if(window.opener&&(iDocHeight<=250||iDocWidth<=510)){window.resizeTo(Math.max(600,iDocWidth),Math.max(350,iDocHeight));iDocHeight=getDocumentHeight();iDocWidth=getDocumentWidth()-40;}var innerDiv=document.getElementById("inner_popup_div");var innerTable=innerDiv.firstChild;var iDivHeight=parseInt(div.offsetHeight);var iMaxDivHeight=325;if(iDivHeight>iMaxDivHeight||iDivHeight>=iDocHeight){var iSelectListHeight=Math.min(300,Math.abs(iDocHeight-150));innerDiv.style.height=iSelectListHeight;if(bActualMultiSelect){var multiSelectListDiv=document.getElementById("popup_select_list");multiSelectListDiv.style.height=iSelectListHeight;}if(!isIE&&bActualMultiSelect){document.getElementById("popup_outer_table").style.height=iSelectListHeight+20;}}iDivHeight=parseInt(div.offsetHeight);var bMultiColumn=innerTable.rows[0].cells.length>2;if(bMultiColumn){if(bActualMultiSelect){if(isIE){var w=Math.min(850,iDocWidth);div.style.width=w;innerDiv.style.width=Math.floor((w/3)*2);document.getElementById("lower_header_label").width=Math.floor((w/3)*2);}else{var listWidth=600;var selectionWidth=250;if(iDocWidth<(listWidth+selectionWidth)){var wFactor=Math.floor(iDocWidth/3);listWidth=2*wFactor;selectionWidth=wFactor;}innerDiv.style.width=listWidth;document.getElementById("lower_header_label").style.width=listWidth;document.getElementById("popup_select_list").style.width=selectionWidth;}}else{if(isIE){div.style.width=Math.min(650,iDocWidth);}else{innerDiv.style.width=Math.min(650,iDocWidth);}}}else{if(bActualMultiSelect){if(isIE){div.style.width=Math.min(600,iDocWidth);}else{var listWidth=600;if(iDocWidth<listWidth){listWidth=iDocWidth;}innerDiv.style.width=Math.floor(listWidth/2);document.getElementById("popup_select_list").style.width=Math.floor(listWidth/2);}}else{div.style.width=Math.min(350,iDocWidth);}}var iDivWidth=parseInt(div.offsetWidth);if(fy+iDivHeight>iDocHeight){if((y-scrollTopOffset-document.body.scrollTop-iDivHeight)>0){fy=y-scrollTopOffset-iDivHeight+1;}else{fy=parseInt((iDocHeight-iDivHeight)/2)+document.body.scrollTop;}if(div.getAttribute("bPositionWithMachine")=="T"){fy-=5;}}if((fx+iDivWidth)>iDocWidth){fx=getDocumentWidth()-iDivWidth;}if(fx+iDivWidth>iDocWidth){fx=getDocumentWidth()-iDivWidth-40;}if(fx<document.body.scrollLeft){fx=document.body.scrollLeft;}NLPopupSelect_removeLoadingMessage();div.style.left=fx;div.style.top=fy;}function NLPopupSelect_isLoadingOrSearching(){return window.popupDIV!=null||(window.popupDivLoadingMessage!=null&&document.getElementById(window.popupDivLoadingMessage.id)!=null);}function NLPopupSelect_removeLoadingMessage(){if(window.popupDivLoadingMessage!=null&&document.getElementById(window.popupDivLoadingMessage.id)!=null){document.body.removeChild(window.popupDivLoadingMessage);}NLPopupAutoSuggest_hidePopupSuggestion();}function NLPopupSelect_init(f,a,d,c,b){NLPopupSelect_close();var e=document.createElement("DIV");e.style.zIndex=1000;e.id="popup_outerdiv";e.className="popupouter";e.setAttribute("bIsMultiButton",(a?"T":"F"));e.setAttribute("bListOnly",(d?"T":"F"));e.setAttribute("bMultiselect",(f?"T":"F"));e.setAttribute("bPositionWithMachine",(c?"T":"F"));e.setAttribute("bShowQuantities",(b?"T":"F"));document.body.appendChild(e);window.popupDIV=e;if(isIE){window.attachEvent("onresize",new Function("NLPopupSelect_reposition();"));}}function NLPopupSelect_reposition(){if(window.popupDIV!=null){NLPopupSelect_positionDIV();}}function NLPopupSelect_open(g,e){if(window.popupDIV!=null){var a=window.popupDIV.getAttribute("bIsMultiButton")=="T";var d=window.popupDIV.getAttribute("bListOnly")=="T";var f=window.popupDIV.getAttribute("bMultiselect")=="T";window.popupDIV.setAttribute("fieldName",g);if(e!=null){window.popupDIV.setAttribute("machineName",e);}var c=g+(d?"_popup_listonly":a?"_popup_multi":"_popup_list");var b=NLPopupSelect_getLaunchButton(c,a,d);if(b!=null&&b.nodeName=="IMG"){window.popupDIV.setAttribute("launchbutton",c);}if(f&&(typeof top.popupAnchorId!="undefined"&&top.popupAnchorId!=null&&document.getElementById(top.popupAnchorId)!=null)){window.popupDIV.setAttribute("displayField",top.popupAnchorId);}if(!f&&document.getElementById(g+"_display")!=null){window.popupDIV.setAttribute("displayField",(g+"_display"));}NLPopupSelect_positionDIV();window.popup_onClickHandler=NLPopupSelect_onClick;if(isIE){nlInsertCanvas(window.popupDIV);}}}function NLPopupSelect_getLaunchButton(d,a,c){var b=document.getElementById(d);if(b!=null&&!a&&!c){b=b.firstChild;}return b;}function NLPopupSelect_getDisplayField(a,c){var b=c?c:document;return b.getElementById(a);}function NLPopupSelect_getDisplayFieldByValueInput(b){var a=b.name+"_display";var c=getFormElement(b.form,a);if(!c){c=NLPopupSelect_getDisplayField(a,b.ownerDocument);}return c;}function NLPopupSelect_displayLoadingDiv(l,d,m){if(window.popupDivLoadingMessage==null){var b=document.createElement("DIV");b.id="popup_load_message";b.style.backgroundColor="white";b.style.position="absolute";b.style.borderWidth="1px";b.style.borderStyle="solid";b.style.borderColor="black";b.style.width="150";window.popupDivLoadingMessage=b;}var e=m==null?"Loading":m;window.popupDivLoadingMessage.innerHTML="<table width='100%'><tr><td valign='middle' class='texttablectr'>"+e+"</td></tr></table>";document.body.appendChild(window.popupDivLoadingMessage);var g=document.getElementById(l+"_display");var k=0;var f=0;var h=findClassUp(g,"scrollarea");var c=0;var a=0;if(h!=null){c=h.scrollTop;a=h.scrollLeft;}if(g!=null&&!d){k=findAbsolutePosY(g)+g.offsetHeight-1-c;f=findAbsolutePosX(g)-a;window.popupDivLoadingMessage.style.width=Math.max(75,g.offsetWidth);}else{k=Math.max(lastY,10)+document.body.scrollTop;f=Math.max(lastX,10)+document.body.scrollLeft;}if((k+30)>(getDocumentHeight()+document.body.scrollTop-10)){k=getDocumentHeight()+document.body.scrollTop-30;}if((f+150)>(getDocumentWidth()+document.body.scrollLeft-10)){f=getDocumentWidth()+document.body.scrollLeft-175;}window.popupDivLoadingMessage.style.left=f;window.popupDivLoadingMessage.style.top=k;window.popupDivLoadingMessage.style.zIndex=10;}function NLPopupSelect_onClick(a){}function NLPopupSelect_close(c){var b=window;while(((b.popupDIV==null)||(typeof b.popupDIV=="undefined"))&&(b!=window.parent)){b=window.parent;}var e=b.popupDIV;if((b.popupDIV==null)||(typeof b.popupDIV=="undefined")){return;}if(isIE){nlRemoveCanvas(e);}if(e.getAttribute("launchbutton")!=null&&e.getAttribute("bIsMultiButton")=="F"){var a=NLPopupSelect_getLaunchButton(e.getAttribute("launchbutton"),e.getAttribute("bIsMultiButton")=="T",e.getAttribute("bListOnly")=="T");}b.document.body.removeChild(e);if(c){var d=b.document.getElementById(e.getAttribute("fieldName")+"_display");if(d!=null){NLPopupSelect_focusNextInputField(d.name,d.form,true);}}b.popupDIV=null;}function NLPopupSelect_getElementOrFromParent(a){var b=document.getElementById(a);if(b==null){b=parent.document.getElementById(a);}return b;}function NLPopupSelect_addSelection(d,b){var a=NLPopupSelect_getElementOrFromParent("popup_select_list");var c=a.firstChild;NLPopupSelect_addSelectionRow(d,b,c,a);}function NLPopupSelect_addSelectionRow(l,k,n,g){var e=window.popupDIV.getAttribute("bShowQuantities")=="T";var h=document.createElement("tr");h.className="multiselecttr";var c=document.createElement("td");c.className="text";c.style.width="14px";c.style.whitespace="nowrap";c.style.verticalAlign=e?"top":"middle";c.style.align="right";var f=document.createElement("a");f.href="javascript:void(0)";l=l.replace(/'/g,"\\'");f.onclick=new Function("NLPopupSelect_updateSelection('"+l+"','', false, this); return false;");var b=document.createElement("img");b.border="0";b.height=13;b.width=13;b.src="/images/forms/btn_x.gif";f.appendChild(b);c.appendChild(f);h.appendChild(c);c=document.createElement("td");c.className="text";if(e){c.style.verticalAlign="top";}var d=null;if(window.popupDIV.getAttribute("bShowQuantities")=="T"){var a=NLPopupSelect_getQuantityArray(k);if(a!=null){k=a[0];d=a[1];}}c.innerHTML=k;h.appendChild(c);if(window.popupDIV.getAttribute("bShowQuantities")=="T"){var m=document.createElement("td");m.className="text";m.style.whitespace="nowrap";m.style.verticalAlign="top";m.style.align="right";m.innerHTML="<input class=input type=text name='quantity_"+l+"' size=4 value='"+(d!=null?d:"")+"' onChange='NLPopupSelect_updateQuantity(\""+l+"\",this.value)'>";h.appendChild(m);}if(n.rows.length==(e?2:1)&&n.rows[e?1:0].className=="noselections"){n.deleteRow(e?1:0);}n.firstChild.appendChild(h);if(g!=null&&(g.scrollHeight>g.offsetHeight)){g.scrollTop=(g.scrollHeight-g.offsetHeight);}}function NLPopupSelect_getQuantityArray(c){var b=new RegExp("^\\s*(\\S+)\\s*\\(\\s*(-?\\d+\\.?\\d*)\\s*\\)\\s*$");var a=b.exec(c);if(a!=null){return new Array(a[1],a[2]);}else{return new Array(c,"");}}function NLPopupSelect_getQuantityText(a,b){b=NLStringToNumber(b);if(isNaN(b)){return a;}else{return a+"("+b+")";}}function NLPopupSelect_updateQuantity(n,c){var b=NLPopupSelect_getElementOrFromParent("multisel_complete");var m=b.elements._mdata;var h=b.elements._mlabels;var g=trim(m.value),l=trim(h.value);var k=g.split(String.fromCharCode(5)),e=l.split(String.fromCharCode(5));var f=false;for(var d=0;d<k.length;d++){var a=NLPopupSelect_getQuantityArray(k[d]);if(a[0]==n){f=true;k[d]=NLPopupSelect_getQuantityText(n,c);e[d]=k[d];}}if(f){m.value=k.join(String.fromCharCode(5));h.value=e.join(String.fromCharCode(5));}}var nlpopupselect_removerow=null;function NLPopupSelect_removeSelection(d,c){var a=NLPopupSelect_getElementOrFromParent("popup_select_list").firstChild;var b=findClassUp(c,"multiselecttr");nlpopupselect_removerow=b;setTimeout("NLPopupSelect_removeRowAfterTimeout()",1);}function NLPopupSelect_removeRowAfterTimeout(){var a=nlpopupselect_removerow.parentNode.parentNode;nlpopupselect_removerow.parentNode.deleteRow(nlpopupselect_removerow.rowIndex);NLPopupSelect_insertNoSelectionRow(a.firstChild);nlpopupselect_removerow=null;}function NLPopupSelect_insertNoSelectionRow(b){var e=window.popupDIV.getAttribute("bShowQuantities")=="T";var a=b.rows.length==(e?1:0);if(a){var d=document.createElement("tr");var f=document.createElement("td");d.className="noselections";f.className="textctr";f.innerHTML="No Selections Made";if(e){f.colSpan=3;}d.appendChild(f);b.appendChild(d);var c=NLPopupSelect_getElementOrFromParent("multisel_complete");c.elements._mdata.value="";c.elements._mlabels.value="";}}function NLPopupSelect_updateSelection(o,n,a,m){var b=NLPopupSelect_getElementOrFromParent("multisel_complete");var p=b.elements._mdata;var h=b.elements._mlabels;var g=trim(p.value),l=trim(h.value);var k,e;if(isValEmpty(g)){k=new Array();e=new Array();}else{k=g.split(String.fromCharCode(5));e=l.split(String.fromCharCode(5));}var r=false;if(a){var q=true;for(i=0;i<k.length;i++){if(k[i]==o){q=false;break;}}var f=(typeof NLPopupSelect_canAddSelection=="undefined"||NLPopupSelect_canAddSelection==null)?true:NLPopupSelect_canAddSelection(o,n,k);if(q&&f){if(g==""){h.value=n;p.value=o;}else{p.value+=String.fromCharCode(5)+o;h.value+=String.fromCharCode(5)+n;}r=true;NLPopupSelect_addSelection(o,n);}}else{var d=window.popupDIV.getAttribute("bShowQuantities")=="T";r=true;var c=0;p.value="";h.value="";for(i=0;i<k.length;i++){if(k[i]==o||(d&&NLPopupSelect_getQuantityArray(k[i])[0]==o)){NLPopupSelect_removeSelection(o,m);continue;}else{p.value+=(c==0?"":String.fromCharCode(5))+k[i];h.value+=(c==0?"":String.fromCharCode(5))+e[i];c++;}}}}function NLPopupSelect_focusNextInputField(a,g,f){try{if(a==null||g==null){return;}var d=false;for(var c=0;c<g.elements.length;c++){if(!d){if(g.elements[c].name==a){d=true;}continue;}var b=g.elements[c];if(isFocusable(b)){if(isNLDropDown(b)){setSelectFocus(b);}else{if(b.focus){b.focus();}}if(f&&b.select){b.select();}return;}}}catch(h){}}function setSafeBlurValue(b,c){var a="document.getElementById('"+b+"').value='"+c+"'";setTimeout(a,0);}function setButtonDown(a,d,c){var b=c.parentNode.parentNode;if(a){if(b.className.indexOf("_sel")==-1){b.className=b.className+"_sel";}}else{b.className=b.className.replace("_sel","");}}function onTristateClick(a){setTristate(a,a.nextSibling.value+1);}function onTristateHighlight(c,a){var b=c.nextSibling;c.src="/images/icons/controls/checkbox_"+(b.value&3)+(a?"_hl.gif":".gif");return true;}function setTristate(b,c){var a=b.nextSibling;a.value=4|(c%3);b.src="/images/icons/controls/checkbox_"+(a.value&3)+".gif";return true;}function disableLineRefresh(a){a.disabled=true;a.firstChild.src="/images/icons/dashboard/refresh_line_disabled.gif";}function doNewbarAction(b){var a=document.getElementById(b);if(a!=null&&a.onclick){a.onclick();}}function nlQuickLooksPopup(a){var c="/images/guide/quicklooks.html?"+a;var b=window.open(c,"popupguide","toolbar=no,statusbar=no,menubar=no,resizable=no,left=1,top=1,height=700,width=300");b.focus();}var Class={create:function(){return function(){this.initialize.apply(this,arguments);};}};NLProgressBar=Class.create();NLProgressBar.prototype={initialize:function(a){this.hndDialogDiv=null;this.sId=a||"NLProgressBar";},show:function(c){var d=document.body.clientWidth/2;var b=document.body.clientHeight/2;if(!this.hndDialogDiv){this.hndDialogDiv=document.createElement("div");var a='<table style="font-size:70%;" cellpadding=0 cellspacing=0 border=0 width=350> <tr> <td colspan=3><IMG SRC="/images/icons/progress/progress_waitBar_top.gif" ALT="" WIDTH=350 HEIGHT=10 BORDER=0></td> </tr> <tr> <td background="/images/icons/progress/progress_waitBar_l.gif"><IMG SRC="/images/icons/progress/progress_x.gif" ALT="" WIDTH=4 HEIGHT=1 BORDER=0></td> <td bgcolor="#F1F1F1" align=center> <IMG SRC="/images/icons/progress/progress_x.gif" ALT="" WIDTH=342 HEIGHT=4 BORDER=0><br> <table cellpadding=0 cellspacing=0 border=0> <tr><td colspan=2 style="font-size:70%;">'+c+'</td></tr> <tr><td colspan=2><IMG SRC="/images/icons/progress/progress_x.gif" ALT="" WIDTH=1 HEIGHT=3 BORDER=0></td></tr> <tr> <td align=center><IMG SRC="/images/icons/progress/progress_waitBar.gif" ALT="" WIDTH=249 HEIGHT=20 BORDER=0></td> <td>&nbsp;</td> </tr> <tr><td colspan=2><IMG SRC="/images/icons/progress/progress_x.gif" ALT="" WIDTH=1 HEIGHT=10 BORDER=0></td></tr> </table> </td> <td background="/images/icons/progress/progress_waitBar_r.gif"><IMG SRC="/images/icons/progress/progress_x.gif" ALT="" WIDTH=4 HEIGHT=1 BORDER=0></td> </tr> <tr> <td background="/images/icons/progress/progress_waitBar_l.gif"><IMG SRC="/images/icons/progress/progress_x.gif" ALT="" WIDTH=4 HEIGHT=1 BORDER=0></td> <td bgcolor="#F1F1F1" align=center> <IMG SRC="/images/icons/progress/progress_x.gif" ALT="" WIDTH=342 HEIGHT=10 BORDER=0><br> </td> <td background="/images/icons/progress/progress_waitBar_r.gif"><IMG SRC="/images/icons/progress/progress_x.gif" ALT="" WIDTH=4 HEIGHT=1 BORDER=0></td> </tr> <tr> <td colspan=3><IMG SRC="/images/icons/progress/progress_waitBar_bot.gif" ALT="" WIDTH=350 HEIGHT=10 BORDER=0></td> </tr></table>';this.hndDialogDiv.innerHTML=a;this.hndDialogDiv.style.display="none";this.hndDialogDiv.style.zIndex="1000";this.hndDialogDiv.style.position="absolute";document.body.appendChild(this.hndDialogDiv);}if(this.hndDialogDiv.style.display=="block"){return;}this.hndDialogDiv.style.display="block";this.hndDialogDiv.style.top=b-(this.hndDialogDiv.clientHeight/2);this.hndDialogDiv.style.left=d-(this.hndDialogDiv.clientWidth/2);},hide:function(){if(this.hndDialogDiv!=null){this.hndDialogDiv.style.display="none";}}};function getIFrameDocument(a){var b=null;if(document.getElementById(a).contentDocument){b=document.getElementById(a).contentDocument;}else{b=document.frames[a].document;}return b;}function getIFrameWindow(a){var b=null;if(document.getElementById(a).contentWindow){b=document.getElementById(a).contentWindow;}else{b=document.frames[a].window;}return b;}function notifyPortlet(a,b){if(a=="-10018"){if(window.schedulersef!="undefiined"&&window.schedulersef!=null){if(b==EVENT_PORTLET_MIN){window.schedulersef.handlePortletMin();}else{if(b==EVENT_PORTLET_MAX){window.schedulersef.handlePortletMax();}else{if(b==EVENT_PORTLET_MOVE){window.schedulersef.handlePortletMove();}else{if(b==EVENT_PORTLET_DROP){window.schedulersef.handlePortletDrop();}else{if(b==EVENT_PORTLET_DRAG){window.schedulersef.handlePortletDrag();}}}}}}}}function setImageButtonState(c,e,a,b){var f=document;if(typeof b!="undefined"&&b!=null){f=b.document;}var d=f.getElementById(c);if(d==null){return;}d.disabled=!e;if(typeof a=="undefined"&&a==null){return;}d=d.getElementsByTagName("img")[0];if(d){d.src=a;}}function setMultiButtonState(b,c){var a=getNLMultiButtonByName(b);if(a!=null){a.setState(c);}}function setLabelState(e,b,a){var d=document;if(typeof a!="undefined"&&a!=null){d=a.document;}var c=d.getElementById(e);if(c==null){return;}c.className=b;}function setNewbarGif(a){var b=document.getElementById("img_newbar_more");if(b!=null){if(a){b.className="ri_personalize";}else{b.className="ri_personalize_hover";}}}var allSpinners=new Array();var spinnerCounter=0;var NLSpinner=Class.create();NLSpinner.prototype={initialize:function(b,a,c,e,d){this.sTagName=b;this.currentValue=a;this.step=c;this.lowerBound=parseFloat(e);this.upperBound=parseFloat(d);this.interval=parseInt(500);this.repeatInterval=parseInt(200);this.timer=null;this.direction=1;},_step:function(){if(this.direction>=0){var a=parseFloat(parseFloat($(this.sTagName).value)+parseFloat(this.step));}else{var a=parseFloat(parseFloat($(this.sTagName).value)-parseFloat(this.step));}if(a>this.upperBound){a=this.upperBound;}else{if(a<this.lowerBound){a=this.lowerBound;}}$(this.sTagName).value=parseFloat(a);},_mousedown:function(b){this._step();var a=this._mousedown.bind(this,"F");this.timer=setTimeout(a,(b=="T"?this.interval:this.repeatInterval));},_releasemouse:function(){if(this.timer){clearTimeout(this.timer);this.timer=null;$(this.sTagName).onchange();}if(this.direction>=0){$(this.sTagName+"_rarrow").setAttribute("src","/images/forms/rarrow.gif");}else{$(this.sTagName+"_larrow").setAttribute("src","/images/forms/larrow.gif");}},_scrollUp:function(){this.direction=1;$(this.sTagName+"_rarrow").setAttribute("src","/images/forms/rarrow_down.gif");this._mousedown("T");},_scrollDown:function(){this.direction=-1;$(this.sTagName+"_larrow").setAttribute("src","/images/forms/larrow_down.gif");this._mousedown("T");}};function makeSpinner(a,h,b,d,f){var k=new NLSpinner(a,h,b,d,f);$(a).value=h;var e=document.createElement("img");e.setAttribute("id",a+"_larrow");e.setAttribute("src","/images/forms/larrow.gif");$(a+"_fs").appendChild(e);$(a+"_larrow").onmousedown=function(){k._scrollDown();};$(a+"_larrow").onmouseup=function(){k._releasemouse();};$(a+"_larrow").onmouseout=function(){k._releasemouse();};var c=document.createElement("img");c.setAttribute("id",a+"_rarrow");c.setAttribute("src","/images/forms/rarrow.gif");$(a+"_fs").appendChild(c);$(a+"_rarrow").onmousedown=function(){k._scrollUp();};$(a+"_rarrow").onmouseup=function(){k._releasemouse();};$(a+"_rarrow").onmouseout=function(){k._releasemouse();};spinnerCounter++;var g=a+spinnerCounter;if(window.allSpinners[g]==null){window.allSpinners[g]=k;}return k;}function NLDragDrop(a,b,c){this.doc=c?c:document;this.sourceElem=a;this.listener=b;this.eventSource=null;this.bInitDrag=true;if(window.loadcomplete){this.attachEventHandlers(a);}else{attachEventHandler("load",window,function(d){this.attachEventHandlers();}.bind(this));}}NLDragDrop.prototype.attachEventHandlers=function NLDragDrop_attachEventHandlers(){if(typeof this.sourceElem=="string"){this.sourceElem=doc.getElementById(sourceElem);}if(!this.sourceElem){return;}attachEventHandler("mousedown",this.sourceElem,function(a){this.handleMouseDown(a);}.bind(this));attachEventHandler("mousemove",this.doc,function(a){this.handleMouseMove(a);}.bind(this));attachEventHandler("mouseup",this.doc,function(a){this.handleMouseUp(a);}.bind(this));};NLDragDrop.prototype.handleMouseDown=function NLDragDrop_handleMouseDown(a){var a=getEvent(a);this.eventSource=getEvent(a);if(!this.onMouseDown(a)){return true;}var a=getEvent(a);this.mouseDown=true;return true;};NLDragDrop.prototype.handleMouseMove=function NLDragDrop_handleMouseMove(b){if(!this.mouseDown){return true;}var b=getEvent(b);var a=true;if(this.bInitDrag){a=this.onInitMouseMove(b);}if(a){this.bInitDrag=false;}else{this.clear();b.cancelBubble=true;b.returnValue=false;return false;}this.onMouseMove(b);b.cancelBubble=true;b.returnValue=false;return false;};NLDragDrop.prototype.handleMouseUp=function NLDragDrop_handleMouseUp(a){if(!this.mouseDown){return true;}var a=getEvent(a);this.onMouseUp(a);this.clear();a.cancelBubble=true;a.returnValue=false;return false;};NLDragDrop.prototype.clear=function NLDragDrop_clear(){this.mouseDown=false;this.eventSource=null;this.bInitDrag=true;};NLDragDrop.prototype.onMouseDown=function NLDragDrop_onMouseDown(a){if(this.listener&&this.listener.onMouseDown){return this.listener.onMouseDown(a);}return true;};NLDragDrop.prototype.onInitMouseMove=function NLDragDrop_onInitMouseMove(a){if(this.listener&&this.listener.onInitMouseMove){return this.listener.onInitMouseMove(a);}return true;};NLDragDrop.prototype.onMouseMove=function NLDragDrop_onMouseMove(a){if(this.listener&&this.listener.onMouseMove){return this.listener.onMouseMove(a);}return true;};NLDragDrop.prototype.onMouseUp=function NLDragDrop_onMouseUp(a){if(this.listener&&this.listener.onMouseUp){return this.listener.onMouseUp(a);}return true;};var NLDRAG_LEFT=1;var NLDRAG_RIGHT=2;var NLDRAG_LEFT_RIGHT=3;var NLDRAG_UP=4;var NLDRAG_DOWN=8;var NLDRAG_UP_DOWN=12;function NLAttachSimpleColumnResizer(c,g,f,b,a,d,e){return new NLSimpleColumnResizer(c,g,f,b,a,d,e);}function NLSimpleColumnResizer(c,g,f,b,a,d,e){e=e?e:document;this.triggerElem=(typeof c=="string")?e.getElementById(c):c;this.targetElem=(typeof g=="string")?e.getElementById(g):g;new NLDragDrop(this.triggerElem,this,e);this.direction=(f==NLDRAG_UP_DOWN)?NLDRAG_UP_DOWN:NLDRAG_LEFT_RIGHT;this.min=b>=0?b:0;this.max=(a>=0&&a>b)?a:Number.MAX_VALUE;this.listener=d;this.initVal=null;this.sCursor=this.direction==NLDRAG_UP_DOWN?"n-resize":"w-resize";this.setCursor(this.sCursor,this.triggerElem);}NLSimpleColumnResizer.prototype.getValue=function NLSimpleColumnResizer_getValue(a){if(this.direction==NLDRAG_LEFT_RIGHT){return getMouseX(a);}else{if(this.direction==NLDRAG_UP_DOWN){return getMouseY(a);}}return null;};NLSimpleColumnResizer.prototype.onMouseDown=function NLSimpleColumnResizer_onMouseDown(b){var a=getEventTarget(b);if(!contains(this.triggerElem,a)){return false;}this.initVal=this.getValue(b);if(!this.canResize(b)){return false;}return true;};NLSimpleColumnResizer.prototype.onInitMouseMove=function NLSimpleColumnResizer_onInitMouseMove(a){var a=getEvent(a);if(this.listener&&this.listener.onStartResize){this.dragDiv=this.listener.onStartResize(a,this);}else{this.startResize(a,this);}return true;};NLSimpleColumnResizer.prototype.onMouseMove=function NLSimpleColumnResizer_onMouseMove(a){var a=getEvent(a);if(!this.canResize(a)){return false;}if(this.listener&&this.listener.onResize){this.listener.onResize(a,this);}else{this.resize(a);}return true;};NLSimpleColumnResizer.prototype.onMouseUp=function NLSimpleColumnResizer_onMouseUp(a){var a=getEvent(a);if(this.listener&&this.listener.onEndResize){this.listener.onEndResize(a,this);}else{this.endResize(a);}this.resetCursor();};NLSimpleColumnResizer.prototype.canResize=function NLSimpleColumnResizer_canResize(d){if(this.listener&&this.listener.onCanResize){return this.listener.onCanResize(d,this);}var c=this.getValue(d)-this.initVal;var b=(this.direction==NLDRAG_LEFT_RIGHT)?this.targetElem.offsetWidth:this.targetElem.offsetHeight;var a=b+c;if(a>=this.min&&a<=this.max){return true;}else{if(a<this.min&&c>0){return true;}else{if(a>this.max&&c<0){return true;}}}return false;};NLSimpleColumnResizer.prototype.startResize=function NLSimpleColumnResizer_startResize(a){this.setCursor(this.sCursor);this.showDragDiv(a);};NLSimpleColumnResizer.prototype.resize=function NLSimpleColumnResizer_resize(a){this.positionDragDiv(a);};NLSimpleColumnResizer.prototype.endResize=function NLSimpleColumnResizer_endResize(b){var a=null;if(this.direction==NLDRAG_LEFT_RIGHT){a=this.targetElem.offsetWidth+this.getValue(b)-this.initVal;}else{a=this.targetElem.offsetHeight+this.getValue(b)-this.initVal;}if(a>this.max){a=this.max;}else{if(a<this.min){a=this.min;}}if(this.direction==NLDRAG_LEFT_RIGHT){this.targetElem.style.width=a;}else{this.targetElem.style.height=a;}this.cleanUp();};NLSimpleColumnResizer.prototype.showDragDiv=function NLSimpleColumnResizer_showDragDiv(b){if(this.dragDiv==null){this.dragDiv=document.createElement("div");this.dragDiv.style.position="absolute";var a=document.createElement("img");a.src="/images/nav/stretch.gif";a.width="3";this.dragDiv.appendChild(a);this.dragDiv.style.backgroundColor="#999999";setObjectOpacity(80,this.dragDiv);document.body.appendChild(this.dragDiv);}if(this.direction==NLDRAG_LEFT_RIGHT){this.dragDiv.style.top=findPosY(this.targetElem);this.dragDiv.firstChild.height=this.targetElem.offsetHeight;}else{this.dragDiv.style.left=findPosX(this.targetElem);this.dragDiv.firstChild.width=this.targetElem.offsetWidth;}this.dragDiv.style.display="";this.positionDragDiv(b);};NLSimpleColumnResizer.prototype.cleanUp=function NLSimpleColumnResizer_cleanUp(){this.hideDragDiv();this.initVal=null;};NLSimpleColumnResizer.prototype.hideDragDiv=function NLSimpleColumnResizer_hideDragDiv(){this.dragDiv.style.display="none";};NLSimpleColumnResizer.prototype.positionDragDiv=function NLSimpleColumnResizer_positionDragDiv(b){var a=this.getValue(b);if(this.direction==NLDRAG_LEFT_RIGHT){this.dragDiv.style.left=a;}else{this.dragDiv.style.top=a;}};NLSimpleColumnResizer.prototype.setCursor=function NLSimpleColumnResizer_setCursor(a,b){if(!b){b=document.body;}if(!b.origCursor){b.origCursor=b.style.cursor;}b.style.cursor=a;};NLSimpleColumnResizer.prototype.resetCursor=function NLSimpleColumnResizer_restoreCursor(a){if(!a){a=document.body;}if(a.origCursor&&a.origCursor.length>0){a.style.cursor="default";a.origCursor=null;}else{a.style.cursor="default";}};function closeBanner(b){var a=document.getElementById(b);if(a){a.parentNode.removeChild(a);sendRequestToFrame("/core/pages/uibannerpref.nl?prefValue=F&prefName=SHOWCHILESUEBANNER","server_commands");}}