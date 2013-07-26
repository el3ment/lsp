var SC_Quickview = {

	buttons : [],
	contents : [],
	online : false,
	
	getMouse : function(e)	{
		var wevent = e || window.event;
		SC_Quickview.mouseX = wevent.pageX || wevent.clientX;
		SC_Quickview.mouseY = wevent.pageY || wevent.clientY;
		window.status = SC_Quickview.mouseX;
		try	{
			if(document.addEventListener)	{
				SC_Quickview.movingDiv.style.left = (SC_Quickview.mouseX - SC_Quickview.valueX) + "px";
				SC_Quickview.movingDiv.style.top = (SC_Quickview.mouseY - SC_Quickview.valueY) + "px";
				wevent.preventDefault();
			}
			else	{
				var top = SC_Quickview.mouseY - (SC_Quickview.valueY + document.documentElement.scrollTop);
				SC_Quickview.movingDiv.style.left = (SC_Quickview.mouseX - SC_Quickview.valueX) + "px";
				SC_Quickview.movingDiv.style.top = top + "px";
				wevent.cancelBubble = true;
				wevent.returnValue = false;
			}
		}
		catch(e)	{}
	},
	
	start : function(buttons, contents)	{
		this.buttons = buttons;
		this.contents = contents;
		if(document.addEventListener)	{
			document.addEventListener("mousemove", SC_Quickview.getMouse, null);
			if(!SC_Quickview.online)	{
				window.addEventListener("load", SC_Quickview.setQuickview, null);
			}
			else	{
				this.setQuickview();
			}
		}
		else if(document.attachEvent)	{
			document.attachEvent("onmousemove", SC_Quickview.getMouse);
			if(!SC_Quickview.online)	{
				window.attachEvent("onload", SC_Quickview.setQuickview);
			}
			else	{
				this.setQuickview();
			}
		}
	},
	
	setQuickview : function()	{
		SC_Quickview.online = true;
		if(window.getComputedStyle)
			var ns = true;
		else if(document.body.currentStyle)
			var ns = false;
			
		var closeLink;
		var i = SC_Quickview.contents.length;
		while(i--)	{
			if(ns && getComputedStyle(SC_Quickview.contents[i].parentNode, null).getPropertyValue("position") == "static")	{
				SC_Quickview.contents[i].parentNode.style.position = "relative";
			}
			else if(!ns && SC_Quickview.contents[i].parentNode.currentStyle["position"] == "static")	{
				SC_Quickview.contents[i].parentNode.style.position = "relative";
			}
			closeLink = document.createElement("a");
			closeLink.innerHTML = "Close";
			closeLink.className = "quickviewClose";
			closeLink.quickview = SC_Quickview.contents[i];
			closeLink.parent = SC_Quickview.contents[i].parentNode;
			closeLink.onclick = function()	{
				this.quickview.parentNode.style.zIndex = "";
				this.hide();
			};
			closeLink.hide = function()	{
				this.quickview.style.display = "none";
				this.parent.appendChild(this.quickview);
			};
			SC_Quickview.contents[i].appendChild(closeLink);
			
			moveLink = document.createElement("a");
			moveLink.innerHTML = "Move";
			moveLink.className = "quickviewMove";
			moveLink.quickview = SC_Quickview.contents[i];
			moveLink.onmousedown = function()	{
				SC_Quickview.valueX = this.offsetLeft + 15;
				SC_Quickview.valueY = this.offsetTop + 7;
				SC_Quickview.movingDiv = this.quickview;
				return false;
			};
			moveLink.onmouseup = function()	{
				SC_Quickview.movingDiv = null;
			}
			SC_Quickview.contents[i].appendChild(moveLink);
			
			SC_Quickview.contents[i].style.position = "absolute";
			SC_Quickview.contents[i].style.width = "585px";
			SC_Quickview.contents[i].style.height = "300px";
			SC_Quickview.contents[i].style.left = "-262px";
			SC_Quickview.contents[i].style.display = "none";
			
		}
		
		i = SC_Quickview.buttons.length;
		while(i--)	{
			SC_Quickview.buttons[i].style.visibility = "visible";
			SC_Quickview.buttons[i].parent = SC_Quickview.contents[i].parentNode;
			SC_Quickview.buttons[i].quickview = SC_Quickview.contents[i];
			SC_Quickview.buttons[i].onclick = function()	{
				this.show();
			};
			SC_Quickview.buttons[i].show = function()	{
				document.body.appendChild(this.quickview);
				this.quickview.style.display = "block";
				if(SC_Quickview.mouseX - (this.quickview.offsetWidth / 2) > 0)	{
					this.quickview.style.left = (SC_Quickview.mouseX - (this.quickview.offsetWidth / 2)) + "px";
				}
				else	{
					this.quickview.style.left = "0px";
				}
				if(SC_Quickview.mouseY - (this.quickview.offsetHeight / 2) > 0)	{
					if(document.addEventListener)	{
						this.quickview.style.top = (SC_Quickview.mouseY - (this.quickview.offsetHeight / 2)) + "px";
					}
					else	{
						this.quickview.style.top = (SC_Quickview.mouseY - (this.quickview.offsetHeight / 2) + document.documentElement.scrollTop) + "px";
					}
				}
				else	{
					this.quickview.style.top = "0px";
				}
			}
		}
	}

}