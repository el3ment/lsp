<div class='page-cart span12 container'>
    <div class='head'>
        <h1>Your Cart</h1>
        <div class='ad-contact details'>Need help or have questions? <a class='contact hidden-phone' href='/contact'>Contact us anytime!</a><span class='contact visible-phone'>Give us a call! <a href='tel:18667920143'>1-866-792-0143</a></span></div>
       	<div class='icon-64-shippingAlert warning'>
		    <div class='panel'>
	            <div class='details'>Looks like some of the ...</div>
	            <div class='message'>So, at no extra charge we'll ship what we have out today</div>
	        </div>
		</div>
        <button class='b1 icon-24-lock'>Proceed to Checkout</button>
    </div>
    <table class='cart' cellpadding='0' cellspacing='0'>
        <thead>
			<!-- 
            <tr class='merchandiseTotal summary'>
				<td class='hidden-phone'></td>
                <td colspan='2'>
                    <label>Merchendise Subtotal</label>
                </td>
                <td class='subtotal'>
                    <span class='value'>$120.00</span>
                </td>
            </tr>
			-->
            <tr class='headers'>
                <td class='product'>Product</td>
                <td class='unitPrice'>Item Price</td>
                <td class='quantity'>Quantity</td>
                <td class='extendedPrice'>Total Price</td>
            </tr>
        </thead>
        <tbody>
			<?php for($i = 0; $i < 4; $i++){ ?>
            <tr class='productScope'>
                <td class='product'>
                    <div class='productImage'><img src='http://s2.lonestarpercussion.com/resize/images/Stands%20and%20Hardware/STBD36_Pearl.png.64x64' width='64' height='64' /></div>
                    <div class='properties'>
                        <div class='productName badges-text' data-badge='new'>Innovative IP240 Soloist Marimba Mallets</div>
                        <div class='details'>
                            <span class='productOptions'>Red Sparkle Finish, Chrome Hardware</span>
                            Model: <span class='productMpn'>IP240</span>
                        </div>
						<div class='notice'>Only 1 left in stock</div>
                        <div data-method='seperately' class='productAvailability'>
                            <span class='status'>Ships Seperately</span>
                            <span class='details'>1&nbsp;today,&nbsp;2&nbsp;on&nbsp;the&nbsp;way</span>
                        </div>
                    </div>
                </td>
                <td class='unitPrice'>
                    <span class='productPrice'>$23.00</span>
                </td>
                <td class='quantity'>
				   <label>Quantity:</label>
                   <input class='scroller' type='number' min='1' value='1' />
                   <button class='b5' data-action='remove'>Remove</button>
                </td>
                <td class='extendedPrice'>
                    <span class='productExtendedPrice'>$23.00</span>
                </td>
            </tr>
			<?php } ?>
        </tbody>
        <tfoot>
            <tr class='merchandiseTotal'>
				<td class='hidden-phone'></td>
                <td colspan='2'>
                    <label><span class='hidden-iphone'>Merchandise</span> Subtotal</label>
                </td>
                <td class='subtotal'>
                    <span class='value'>$120.00</span>
                </td>
            </tr>
            <tr class='shippingTotal'>
                <td colspan='3'>
					<select name='shipMethod' class='shipMethod'>
                        <option>Standard Shipping</option>
						<option>2-Day Shipping</option>
						<option>1-Day Shipping</option>
                    </select>
                    <select name='shipCountry' class='shipCountry'>
                        <option>United States</option>
                    </select>
					<input class='zipcode' type='number' name='zipcode' />
					<label>Shipping <span class='details'>Enter Your Zip Code</span></label>
                </td>
                <td>
                    <span class='value'>$2120.00</span>
                </td>
            </tr>
            <tr class='taxTotal'>
                <td colspan='3'>
                    <label>Tax</label>
                </td>
                <td>
                    <span class='value'>$0.00</span>
                </td>
            </tr>
            <tr class='orderTotal'>
				<td class='hidden-phone'></td>
                <td colspan='2'>
                    <label>Order Total</label>
                </td>
                <td>
                    <span class='value'>$1,231.00</span>
                </td>
            </tr>
        </tfoot>
    </table>
    <button class='b1 icon-24-lock'>Proceed To Checkout</button>
</div>