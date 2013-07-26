// JavaScript Document

// confirm there's at least one image to zoom
if(document.getElementById('linkZoomGallery')) {
	var hasEnlarged = false;
	for (h=0;h<ZoomImg.length;h++) {
		if (ZoomImg[h]!="")
			hasEnlarged = true;
	}
	document.getElementById('linkZoomGallery').style.display=(hasEnlarged)?'block':'none'; 	
}


function generateGallery(){
	// loop for initializing thumb cells
	for (i=0; i<=NewImg.length-1; i++) {
		if (NewImg[i] && NewImg[i]!=''){
			// img has no thumb? assign itself
			if (!(Thumbs[i])||(Thumbs[i]=="")) Thumbs[i] = NewImg[i];					
			// separator between thumbs
			separator = (i!=maxThumbsPerRow-1)?'<td width="'+thumbsSep+'"> </td>':'';	
			// alt title according to the enlargement
			altTitle = (ZoomImg[i] && ZoomImg[i]!="")?'title="click to see enlarged"':'title="no zoom available"'; 	
			document.getElementById("thumbCell_"+i).innerHTML = '<table border="0" cellpadding="0" cellspacing="0"><tr><td valing="middle" aling="center"><a href="javascript:zoomImage()" '+altTitle+' onMouseOver="displayImage('+i+')"><img src="'+Thumbs[i]+'" width="'+thumbW+'" height="'+thumbH+'" border="0" id="thumb_'+i+'" class="thumb-off" /></a></td>'+separator+'</tr></table>';
		}
		else 	
			document.getElementById("thumbCell_"+i).style.display = 'none';				
	}
	if (NewImg[0] && NewImg[0]!="")	displayImage(0);							// display first image
}

var current_image=0;															// global var stores image being showed
function displayImage(id) {
	if (id < NewImg.length) {
		current_image = id;														// keeps 'num id' of image showed
		document.getElementById('mainImage').src = NewImg[id]+resizeURL; 		// changes main image and resizes it
		for (i=0; i < NewImg.length; i++)	{
			document.getElementById('thumbCell_'+i).className = (current_image!=i)?'thumb-off':'thumb-on';
		}
	}
}
	

// initialize the image gallery 
generateGallery();