function $SC(stringSelector)	{
	
	var node = document.getElementById(stringSelector);
	
	function getElements(element, stringSelector)	{
		var selector = stringSelector.substring(0, 1);
		var value = stringSelector.substring(1);
		switch(selector)	{
			case "." :
				var newArray = [];
				var elements = element.getElementsByTagName("*");
				var i = elements.length;
				var a = 0;
				for(a; a < i; a++)	{
					if(elements[a].className.indexOf(value) != -1)	{
						newArray[newArray.length] = elements[a];
					}
				}
				return newArray;
				break;
			default : 
				var newArray = [];
				var elements = element.getElementsByTagName(stringSelector);
				var i = elements.length;
				var a = 0;
				for(a; a < i; a++)	{
					newArray[newArray.length] = elements[a];
				}
				return newArray;
				break;
		}
	};
	
	node.quickview = function(buttons, contents)	{
		SC_Quickview.start(getElements(this, buttons), getElements(this, contents));
	};
	
	return node;
	
}