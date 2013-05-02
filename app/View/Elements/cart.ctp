<div class='page-cart span12 container'>
    <div class='head'>
        <h1>Your Cart</h1>
        <div class='ad-contact details'>Need help or have questions? <a href='/contact'>Contact us anytime!</a></div>
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
            <tr class='merchandiseTotal summary'>
				<td class='hidden-phone'></td>
                <td colspan='2'>
                    <label>Subtotal</label>
                </td>
                <td class='subtotal'>
                    <span class='value'>$120.00</span>
                </td>
            </tr>
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
                    <div class='productImage' data-badge='new'><img src='http://placehold.it/64x64' width='64' height='64' /></div>
                    <div class='properties'>
                        <div class='productName'>Innovative IP240</div>
                        <div class='details'>
                            <span class='productOptions'>Red Sparkle Finish, Chrome Hardware</span>
                            Model Number <span class='productMpn'>IP240</span>
                        </div>
                        <div data-method='seperately' class='productAvailability'>
                            <span class='status'>Ships Seperately</span>
                            <span class='details'>1 today, 2 on the way</span>
                        </div>
                        <div class='notice'>Only 1 left in stock</div>
                    </div>
                </td>
                <td class='unitPrice'>
                    <span class='productPrice'>$23.00</span>
                </td>
                <td class='quantity'>
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
                    <label>Subtotal</label>
                </td>
                <td class='subtotal'>
                    <span class='value'>$120.00</span>
                </td>
            </tr>
            <tr class='shippingTotal'>
                <td colspan='3'>
					<select name='shipMethod' class='shipMethod'>
                        <option>UPS Second Day Air</option>
                    </select>
                    <select name='shipCountry' class='shipCountry'>
                        <option>United States of America</option>
                    </select>
					<input class='zipcode' type='number' name='zipcode' />
					<label>Shipping <span class='details'>Enter your Zip Code</span></label>
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
                    <span class='value'>$1231.00</span>
                </td>
            </tr>
        </tfoot>
    </table>
    <button class='b1 icon-24-lock'>Proceed To Checkout</button>
</div>