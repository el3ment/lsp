//***********************************************************************************
// Developed by Citricle Software Solutions - All Rights Reserved.
// This code is protected by the copyright law. 
// Contact: www.citricle.com 1-800-482-5195
//***********************************************************************************
var divCss = {
	'display' : 'none',
	'font-size' : '12px',
	'padding' : '5px',
	'margin' : '0px',
	'color' : '#000000',
	'border' : '1px solid #dcdcdc',
	'background-color' : '#ffffff',
	'font-family' : 'Arial, Helvetica, sans-serif',
	'font-size' : '12px',
	'position' : 'absolute',
	'z-index' : '9999',
	'text-align' : 'left',
	'line-height' : '24px'          
}
var closeDivCss = {
	'display' : 'none',
	'padding' : '0px',
	'margin' : '0px',
	'position' : 'absolute',
	'background-image' : 'url("https://d2bghjaa5qmp6f.cloudfront.net/templates/images-site/sayt-close.png")',
	'cursor' : 'pointer',
	'width' : '20px', 
	'z-index' : '9999',
	'height' : '20px'          
}	
var closeDivOffCss = {
	'background-position' : '0px 0px' 
}
var closeDivOnCss = {
	'background-position' : '0px -20px' 
}
var ulCss = {
	'padding' : '0px',
	'margin' : '0px'
}
var liCss = {
	'padding' : '0px 5px 0px 5px',
	'margin' : '0px',
	'list-style' : 'none',
	'cursor' : 'pointer',
	'font-family' : 'Arial, Helvetica, sans-serif',
	'font-size' : '14px',
	'line-height' : '24px'
}
var liOffCss = {
	'background-color' : '#ffffff'
}	
var liOnCss = {
	'background-color' : '#dcdcdc'
}
var defaultText = '';
var protocolAndDomain = (("https:" == document.location.protocol) ? "https://forms.netsuite.com" : "http://www.lonestarpercussion.com");
var requestInProgress = false;
var cursorIndex = -1;	
$('input[name=search]').attr({autocomplete: "off"});
$(document.createElement('div')).attr("id","sayt").html(defaultText).prependTo("body"); 
$("#sayt").css(divCss);
$(document.createElement('div')).attr("id","sayt-close").prependTo("body"); 
$("#sayt-close").css(closeDivCss);
var positionTop = $('input[name=search]').position().top + $('input[name=search]').height() + 6;
var positionLeft = $('input[name=search]').position().left;
$('#sayt').css("top", positionTop);
$('#sayt').css("left", positionLeft );
$('#sayt-close').css("top", positionTop);
$("#sayt-close").click(function(event) {
	closeControl();
});
$("#sayt-close").hover(
	function() {
		$("#sayt-close").css(closeDivOnCss);
	},
	function() {
		$("#sayt-close").css(closeDivOffCss);
	}
);
$('input[name=search]').keyup(function(event) {
	if($.trim($('input[name=search]').val()) != "")	{
		switch(event.keyCode) {
			case 13:    // enter
				if(($('#sayt').is(":visible")) && cursorIndex >= 0)	{
					event.preventDefault();
					window.location = $('#sayt-ul-li-' + cursorIndex).attr("url");
				}
				break;
			case 38:    // key up
				if(cursorIndex > 0)	{
					setCursorPosition(cursorIndex - 1);
				}
				break;
			case 40:    // key down
				if(cursorIndex < $('#sayt > ul').children().length - 1)	{
					setCursorPosition(cursorIndex + 1);
				}
				break;
			default:
				if(/*!requestInProgress &&*/ ($('input[name=search]').val().length >= 3))	{
					requestData();
				}
				break;
		}
	}
	else	{
		closeControl();
	}
});
$('input[name=search]').focus(function() {
	$('input[name=search]').val("");
});
jQuery(document).ready(function(){
   $().mousemove(function(e){
      window.mouseXPos = e.pageX;
      window.mouseYPos = e.pageY;
   }); 
})
$('input[name=search]').blur(function(event) {
	//alert(event);
	//closeControl();
});
var closeControl = function()	{
	$('#sayt').slideUp("normal");
	$('#sayt-close').hide();
}
var setCursorPosition = function(newCursorIndex)	{
	$('#sayt-ul-li-' + cursorIndex).css(liOffCss);
	cursorIndex = newCursorIndex;
	$('#sayt-ul-li-' + newCursorIndex).css(liOnCss);
}
var repositionControl = function()	{
	var positionTop = $('input[name=search]').position().top + $('input[name=search]').height() + 10;
	var positionLeft = $('input[name=search]').offset().left;
	$('#sayt').css("top", positionTop);
	$('#sayt').css("left", positionLeft );
	repositionCloseButton();
}
var repositionCloseButton= function()	{
	var positionTop = $('input[name=search]').position().top + $('input[name=search]').height() + 10;
	var divRightCornerLeft = $("#sayt").offset().left + $("#sayt").outerWidth() + 1;
	$('#sayt-close').css("left", divRightCornerLeft);
	$('#sayt-close').css("top", positionTop);
}
var requestData = function()	{
	requestInProgress = true;
	data = null;
	$.jsonp({
		"url": protocolAndDomain + "/app/site/hosting/scriptlet.nl?script=12&deploy=1&compid=665798&h=980dd2716af70e419724&query=" + encodeURIComponent($('input[name=search]').val()) + "&jsoncallback=?",
		"success": function(data) {
			if(!data.noResults)	{
				if(decodeURIComponent(data.query) == $('input[name=search]').val())	{
					if(!$('#sayt').is(":visible"))	{
						//repositionControl();
						$('#sayt').slideDown("normal", repositionControl);
						$('#sayt-close').slideDown("normal");
					}
					$("#sayt").html("");
					$(document.createElement('ul')).attr("id","sayt-ul").prependTo("#sayt"); 
					$("#sayt-ul").css(ulCss);
					$.each(data.items, function(i, item) {
						try	{
							$(document.createElement('li')).attr("id","sayt-ul-li-" + i).appendTo("#sayt-ul"); 
							$("#sayt-ul-li-" + i).html(unescape(item.itemId).replace($('input[name=search]').val(), '<strong style="color: #000000">' + $('input[name=search]').val() + '</strong>'));
							$("#sayt-ul-li-" + i).attr("url", item.itemURL);
							$("#sayt-ul-li-" + i).css(liCss);
							$("#sayt-ul-li-" + i).mouseover(function () {
								setCursorPosition(i);
							});
							$("#sayt-ul-li-" + i).click(function(event) {
								event.preventDefault();
								event.stopPropagation();
								window.location = $('#sayt-ul-li-' + i).attr("url");
								return false;
							});					
						}
						catch(e) {};
					});
					repositionCloseButton();
				}
			}
			else	{
				closeControl();
			}
			requestInProgress = false;
		},
		"error": function(d,msg) {
			$('#sayt').html(defaultText );
			requestInProgress = false;
		}
	});
}
