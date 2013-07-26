
//-- calls the zoom image, needs index of image being displayed to reference its enlarged
function zoomImage(){			
	var imgTitle = (displayName!="")?displayName:siteName;
	if (ZoomImg[current_image] && ZoomImg[current_image]!="") 
		popUpZoomImage(current_image, imgTitle);
}



//---- Generates Gallery  ------------------------------------------------
function generateZoomGallery(){
	// loop for initializing thumb cells
	for (i=0; i<=ZoomImg.length-1; i++) {
		if (ZoomImg[i]){
			// img has no thumb? assign itself
			if (!(Thumbs[i])||(Thumbs[i]=="")) Thumbs[i] = ZoomImg[i];					
			// separator between thumbs
			separator = (i!=maxThumbsPerRow-1)?'<td width="'+thumbsSep+'"> </td>':'';	
			document.getElementById("zoomCell_"+i).innerHTML = '<table border="0" cellpadding="0" cellspacing="0"><tr><td valing="middle" aling="center"><a href="javascript:void(0);" onMouseOver="displayZoomImage('+i+')"><img src="'+Thumbs[i]+'" width="'+thumbW+'" height="'+thumbH+'" border="0" id="zoomThumb_'+i+'" class="thumb-off" /></a></td>'+separator+'</tr></table>';
		}
		else 	
			document.getElementById("zoomCell_"+i).style.display = 'none';				
	}
}
generateZoomGallery();
//------------------------------------------------------------------------



//---- Calls specific image to be displayed ------------------------------
function displayZoomImage(id) {
	if (id < ZoomImg.length) {
		document.getElementById('zoomImage').src = '/site/templates/ll-ajax-loader.gif';
		var newImg = new Image();
		newImg.src = ZoomImg[id];
		newImg.onload = function(){
			document.getElementById('zoomImage').src = ZoomImg[id];					// changes zoom image
		}
		if (document.all)
			document.getElementById('zoomImage').src = ZoomImg[id];					// IE Bug
		for (i=0; i < ZoomImg.length; i++)	{
			if (document.getElementById('zoomThumb_'+i))
				document.getElementById('zoomThumb_'+i).className = (id!=i)?'thumb-off':'thumb-on';
		}
	}
}
//------------------------------------------------------------------------



//---- Functions for showing / hidding popImage Window -------------------
function popUpZoomImage(id, imgTitle){			
	hideInterferingElements();
	placeBlur();
	document.getElementById('popUpName').innerHTML = imgTitle ;
	displayZoomImage(id);
	var div=document.getElementById("zoomPopUp");
	var pageDimentions = getPageSize();
	var w=(pageDimentions[0]-500)/2;
	// workaround for IE's poor implementation of setAttribute method doesn't change the "style" attribute
	if (document.all)
		div.style.cssText = 'position:absolute;z-index:10000;left:'+w+'px;top:50px;display:block;';
	else
		div.setAttribute('style','position:absolute;z-index:10000;left:'+w+'px;top:50px;display:block;');
	//document.getElementsByTagName("body")[0].appendChild(div)	
}

function closePopUpImg(){
	document.getElementById('zoomPopUp').style.display = 'none';
	removeBlur();
	showInterferingElements();
}
//------------------------------------------------------------------------



//---- Functions for placing / resizing / removing blur window -----------
function placeBlur(){
	if (!document.getElementById("BlurWrapper")) { 				// check if the black background exist
		var div=document.createElement("div");					// create the blur element
		div.id="BlurWrapper";
		//create and place a blur div (with z-index:9999) inside the blur wrapper 
		div.innerHTML= "<div onclick=\"closePopUpImg()\" id=\"Blur\" style=\"position:absolute;background:#000;opacity: 0.30;-moz-opacity: .3;filter: alpha(opacity=30);width:100%;height:500px;top:0;left:0;right:0;bottom:0;z-index:9999;border:0 \"> </div>";
		//more settings to put the blur in the right position in IE
	 	if (document.all) 
			div.style.width=(document.body.offsetWidth-20)+"px";
		var tt=document.createTextNode(" ");
		div.appendChild(tt);
		document.getElementsByTagName("body")[0].appendChild(div)		
		window.scroll(0,0)
		resizeBlur();
		addEvent(window, 'resize', resizeBlur, false);
	}
}
function resizeBlur(){
	var pageDimentions = getPageSize();
	document.getElementById("Blur").style.width=pageDimentions[0]+'px';
	document.getElementById("Blur").style.height=pageDimentions[1]+'px';
}
function removeBlur(){
	if (document.getElementById("BlurWrapper")) {
		popOBJ(document.getElementById("BlurWrapper"));		// here the blur is removed 
		removeEvent(window, 'resize', resizeBlur, false);
	}
}
function popOBJ(pObj){
	if (pObj)
		pObj.parentNode.removeChild(pObj);
}
//------------------------------------------------------------------------



//---- Functions for hidding / show selects and flash search -------------
function hideInterferingElements(){
	displaySelectBoxes(false);
	document.getElementById("flash_search").style.display='none';
}
function showInterferingElements(){
	displaySelectBoxes(true);
	document.getElementById("flash_search").style.display='';
}
function displaySelectBoxes(state){
	selects = document.getElementsByTagName("select");
	for (i = 0; i != selects.length; i++) {
		selects[i].style.display = (state)?"":"none";
	}
}
//------------------------------------------------------------------------



//---- Cross-browser add/remove event functions --------------------------
function addEvent(obj, evType, fn, useCapture){
  if (obj.addEventListener){
    obj.addEventListener(evType, fn, useCapture);
    return true;
  } else if (obj.attachEvent){
    return (obj.attachEvent("on"+evType, fn));
  } else 
	return false;
}
function removeEvent(obj, evType, fn, useCapture){
  if (obj.removeEventListener){
    obj.removeEventListener(evType, fn, useCapture);
    return true;
  } else if (obj.detachEvent){
    return (obj.detachEvent("on"+evType, fn));
  } else 
	return false;
} 
//------------------------------------------------------------------------



//------------------------------------------------------------------------
// getPageSize() 
// Returns array with page width, height and window width, height
// Core code from - quirksmode.org / Edit for Firefox by pHaez
function getPageSize(){
	
	var xScroll, yScroll;
	
	if (window.innerHeight && window.scrollMaxY) {	
		xScroll = document.body.scrollWidth;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else if (document.body.scrollHeight > document.body.offsetHeight){ // all but Explorer Mac
		xScroll = document.body.scrollWidth;
		yScroll = document.body.scrollHeight;
	} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari
		xScroll = document.body.offsetWidth;
		yScroll = document.body.offsetHeight;
	}
	
	var windowWidth, windowHeight;
	if (self.innerHeight) {	// all except Explorer
		windowWidth = self.innerWidth;
		windowHeight = self.innerHeight;
	} else if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode
		windowWidth = document.documentElement.clientWidth;
		windowHeight = document.documentElement.clientHeight;
	} else if (document.body) { // other Explorers
		windowWidth = document.body.clientWidth;
		windowHeight = document.body.clientHeight;
	}	
	
	// for small pages with total height less then height of the viewport
	if(yScroll < windowHeight){
		pageHeight = windowHeight;
	} else { 
		pageHeight = yScroll;
	}

	// for small pages with total width less then width of the viewport
	if(xScroll < windowWidth){	
		pageWidth = windowWidth;
	} else {
		pageWidth = xScroll;
	}
	arrayPageSize = new Array(pageWidth,pageHeight,windowWidth,windowHeight) 
	return arrayPageSize;
}
//------------------------------------------------------------------------