//Review Form Dsiplay
function reviewsFormDisplay( itemInternalId, onlineFormExternalUrl )	{	
	var loadCount = 0;
	//Review form display
	function formOnload()	{
		var reviewForm = document.getElementById( 'review_form_container' ).getElementsByTagName( 'iframe' )[0];
		reviewForm.style.display = 'block';
		loadCount++;
		reviewForm.parentNode.style.background = 'none';
		if( loadCount > 1 )	{
			reviewForm.parentNode.style.height = '20px';
		}
	}
	//Show Review Form
	function showReviewForm()	{
		var writeReviewLink = document.getElementById( 'add_review' );
		var formContainer = document.getElementById( 'review_form_container' )
		var reviewFormIframe = formContainer.getElementsByTagName( 'iframe' )[0];
		if( reviewFormIframe == null )	{
			var iframe = document.createElement( 'iframe' );
			iframe.frameborder = "0";
			iframe.id = "newreviewiframe";
			iframe.src = onlineFormExternalUrl + "&redirect_count=1&did_javascript_redirect=T&custrecordreviewnsitemid=" + itemInternalId;
			
			if( iframe.attachEvent )	{
				iframe.attachEvent( 'onload', formOnload );
			}
			else if( iframe.addEventListener )	{
				iframe.addEventListener( 'load', formOnload, true );
			}
			formContainer.appendChild( iframe );
			formContainer.style.display = 'none';
		}
		
		if( formContainer.style.display == 'none' )	{
			writeReviewLink.innerHTML = writeReviewLink.innerHTML.replace( '+', '-' );
			formContainer.style.display = 'block';
		}
		
		else if( formContainer.style.display == 'block' )	{
			writeReviewLink.innerHTML = writeReviewLink.innerHTML.replace( '-', '+' );
			formContainer.style.display = 'none';
		}
	}
	var writeReviewLink = document.getElementById( 'add_review' );
	if( writeReviewLink.attachEvent )	{
		writeReviewLink.attachEvent( 'onclick', showReviewForm );
	}
	else if( writeReviewLink.addEventListener )	{
		writeReviewLink.addEventListener( 'click', showReviewForm, true );
	}
}