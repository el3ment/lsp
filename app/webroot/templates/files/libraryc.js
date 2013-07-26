var itemsCart = new Array(); 

function send(){
	var _multi = "";
	for (var i=0;i<itemsCart.length;i++){			
		var _itm = itemsCart[i];
		_multi += _itm.id.replace("chk_","")+","+_itm.qty+";";	
	}
	document.getElementById("multi").value=_multi;
	document.getElementById("adds").submit();
}
 
function setItemsCart(event){
	event = event || window.event; 
	var chk = event.target || event.srcElement; 
	if (chk.checked == true)
	{
		val=document.getElementById("qty_"+chk.id.replace("chk_","")).value
		itemsCart[itemsCart.length]={id:chk.id,qty:val};
	}
	else
	{
		popItemX_ID(chk.id)		
	}		
}


function qtyChanged(event){
	event = event || window.event; 
	var chk = event.target || event.srcElement; 
	isChecked = document.getElementById("chk_"+chk.id.replace("qty_","")).checked
	if (isChecked)
	{
		popItemX_ID("chk_"+chk.id.replace("qty_",""))		
		val=document.getElementById("qty_"+chk.id.replace("qty_","")).value
		itemsCart[itemsCart.length]={id:"chk_"+chk.id.replace("qty_",""),qty:val};		
	}
}

function popItemX_ID(parid)
{
	for(var i=0;i<itemsCart.length;i++)
	{
		if (itemsCart[i].id==parid) 
		    itemsCart.splice(i,1);
	}
}

function cart()
{
	send()				
}
function cartRelated(){
	val=document.getElementById("parent").value;
	quantity=document.getElementById("qty_"+val).value;
	itemsCart[itemsCart.length]={id:"chk_"+val,qty:quantity};
	send()				
}