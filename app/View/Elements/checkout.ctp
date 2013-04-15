 <div class='page-checkout container'>
	<div id='stepSlider' class='steps'>
		<ul>
			<li class='start completed active'><span class='label icon-24-user'>Start</span></li>
			<li class='shipping'><span class='label icon-24-box'>Shipping</span></li>
			<li class='billing'><span class='label icon-24-card'>Payment</span></li>
			<li class='review'><span class='label icon-24-check'>Review &amp; Place Order</span></li>
		</ul>
	</div>
	<div id='loginPanels' class='login row'>
		<div class='guest panel engaged span5 offset1'>
			<h2>New Customers</h2>
			<p>You can checkout as a guest, and after you place your order you'll have a chance to create an account</p>
			<button class='b1' data-controller='checkout' data-action='loginAsGuest'>Continue as Guest</button>
		</div>
		<div class='returning panel disengaged span5'>
			<h2>Returning Customers</h2>
			<form data-action='login' data-controller='checkout'>
				<fieldset>
					<div class='field'>
						<label>Email Address</label>
						<input type='email' name='email' />
					</div>
					<div class='field'>
						<label>Password</label>
						<input type='password' name='password' />
					</div>
					<a href='/forgot'>Forgot your password?</a>
					<button class='b1' type='submit'>Sign In</button>
				</fieldset>
			</form>
		</div>
	</div>
	
	
	<div class='row'>
		<div id='checkoutSummary' class='summary span5 pull-right'></div>
		<div class='process span7'>
			<form id='checkoutForm'>
				<div id='shippingSummary'></div>
				<div id='shippingInputPanel' class='shipping engaged panel row-fluid hide'>
					<fieldset class='shippingAddress'>
						<h2>Shipping Address</h2>
						<ul>
							<li class='country span8 field'>
								<label>Country</label>
								<select name='shipping.country' data-controller='checkout' data-action='updateCountry'>
									<option>Select a Country</option>
									<option>United States</option>
								</select>
							</li>
							<li class='name span8 field'>
								<label>Full Name</label>
								<input type='text' name='shipping.name' />
							</li>
							<li class='address1 span8 field'>
								<label>Street Address</label>
								<input type='text' name='shipping.address1' />
							</li>
							<li class='address2 span8 field'>
								<label>Optional Address</label>
								<input type='text' name='shipping.address2' />
							</li>
							<li class='city span8 field'>
								<label>City</label>
								<input type='text' name='shipping.city' />
							</li>
							<li class='state span4 field'>
								<label>State</label>
								<select name='shipping.state'>
									<option>Texas</option>
								</select>
							</li>
							<li class='zipcode span4 field'>
								<label>Zip Code</label>
								<input type='text' name='shipping.zipcode' data-controller='checkout' data-action='updateZipcode'/>
							</li>
							<li class='phone span8 field'>
								<label>Phone Number</label>
								<input type='tel' name='shipping.phone' />
							</li>
							<li class='promo field'>
								<input id='insertPromoCode' type='checkbox' data-reveal-children='checkout-insertPromoCode' />
								<label for='insertPromoCode'>Do you have a promo code?</label>
								<div id='checkout-insertPromoCode' class='hide span8 '>
									<label>Promotional Code</label>
									<input type='text' name='promo' />
									<button class='b2' data-controller='checkout' data-action='applyPromoCode'>Apply</button>
									<a href=''>Where can I get a promo code?</a>
								</div>
							</li>
						</ul>
					</fieldset>
					<fieldset class='orderTracking'>
						<h2>Order Tracking</h2>
						<ul>
							<li class='email span8 field'>
								<label>Email Address <span class='details'>(for order tracking information)</span></label>
								<input type='email' name='shipping.email' />
							</li>
							<li class='newsletter field'>
								<input id='signUpForNewsletter' type='checkbox' name='signUpForNewsletter' />
								<label for='signUpForNewsletter'>Sign up for our newsletter maybe? <span class='details'>Each week we send out an email with coupons and discounts</span></label>
							</li>
						</ul>
					</fieldset>
					<fieldset class='shippingMethod'>
						<h2>Shipping Method</h2>
						<div id='shippingMethods'></div>
					</fieldset>
					<button class='b5 hide' data-controller='checkout' data-action='saveShipping'>Save Shipping</button>
					<div class='proceed'>
						<button class='b1' data-controller='checkout' data-action='saveShipping'>Continue Checkout</button>
					</div>
				</div>
		
				<div id='billingSummary' class=''></div>
				<div id='billingInputPanel' class='billing engaged panel hide row-fluid'>
					<fieldset class='billingAddress'>
						<h2>Billing Address</h2>
						<ul>
							<li class='sameAsShipping field'>
								<input id='sameBillingAddress' type='checkbox' data-controller='checkout' data-action='updateBillingAddress' data-reveal-children='billingAddress' checked />
								<label for='sameBillingAddress'>Same as shipping address</label>
							</li>
						</ul>
						<ul id="billingAddress">
							<li class='country span8 field'>
								<label>Country</label>
								<select name='billing.country' data-controller='checkout' data-action='updateCountry'>
									<option>Select a Country</option>
									<option>United States</option>
								</select>
							</li>
							<li class='name span8 field'>
								<label>Full Name</label>
								<input type='text' name='billing.name' class='validation-required' />
							</li>
							<li class='address1 span8 field'>
								<label>Street Address</label>
								<input type='text' name='billing.address1' class='validation-required' />
							</li>
							<li class='address2 span8 field'>
								<label>Optional Address</label>
								<input type='text' name='billing.address2' />
							</li>
							<li class='city span8 field'>
								<label>City</label>
								<input type='text' name='billing.city' />
							</li>
							<li class='state span8 field'>
								<label>State</label>
								<select name='billing.state'>
									<option>Texas</option>
								</select>
							</li>
							<li class='zipcode span8 field'>
								<label>Zip Code</label>
								<input type='text' name='billing.zipcode' data-controller='checkout' data-action='updateZipcode' class='validation-required' />
							</li>
							<li class='phone span8 field'>
								<label>Phone Number</label>
								<input type='tel' name='billing.phone' class='validation-required' />
							</li>
						</ul>
					</fieldset>
					<fieldset class='payment'>
						<h2>Payment</h2>
						<div class='secureBlock'>
							<ul class='panel'>
								<li class='name span8 field'>
									<label>Name on Card</label>
									<input type='text' name='billing.name' />
								</li>
								<li class='creditCardNumber span5 field'>
									<label>Number</label>
									<input type='text' name='billing.creditCardNumber' class='validation-creditCardNumber' />
								</li>
								<li class='creditCardType span3 field'>
									<label>Type</label>
									<select name='billing.creditCardType'>
										<option value='visa'>Visa</option>
									</select>
								</li>
								<li class='creditCardCVS field'>
									<label>CVS Code</label>
									<input type='text' name='billing.creditCardCVS' />
									<div class='image-creditCardCSV-visa'></div>
								</li>
								<li class='creditCardExpirationMonth span5 field'>
									<label>Expiration Month</label>
									<select name='billing.creditCardExpirationMonth'>
										<option value='visa'>09 - September</option>
									</select>
								</li>
								<li class='creditCardExpirationYear span3 field'>
									<label>Expiration Year</label>
									<select name='billing.creditCardExpirationYear'>
										<option value='visa'>2012</option>
									</select>
								</li>
							</ul>
							<div class='image-nortonSecurity hidden-phone'></div>
						</div>
					</fieldset>
					<fieldset class='giftCard'>
						<h2>Gift Card</h2>
						<ul>
							<li class='promo field'>
								<input name='hasGiftCard' type='checkbox' data-reveal-children='checkout-insertGiftCard' />
								<label for='hasGiftCard'>
									Do you want to use your Gift Card?
									<span class='details'>Redeeming a gift card is easy!</span>
								</label>
								<div id='checkout-insertGiftCard' class='hide span8'>
									<label for='giftCardNumber'>Gift Card Number</label>
									<input type='text' name='giftCardNumber' />
									<button class='b2'>Apply</button>
								</div>
							</li>
						</ul>
					</fieldset>
					<button class='b5 hide' data-controller='checkout' data-action='saveBilling'>Save Billing</button>
					<div class='proceed'>
						<div class='notice'>You won't be charged yet.<span class='details'>You can review and place your order on the next page</span></div>
						<button class='b1' data-controller='checkout' data-action='saveBilling'>Continue Checkout</button>
					</div>
				</div>
			</form>
		</div>
	</div> <!-- end row -->

	<script id='templates-shipping-summary' type='text/html'>
		<div class='shipping disengaged panel'>
			<h2>Shipping</h2>
			<ul>
				<li>
					<label>Ship To</label>
					<div class='name value'><#=this.shipping.name #></div>
					<div class='address value'><#=this.shipping.address1 #></div>
					<div class='city value'><#=this.shipping.city #></div>
					<div class='state value'><#=this.shipping.state #></div>
					<div class='zipcode value'><#=this.shipping.zip #></div>
					<div class='phone value'><#=this.shipping.phone #></div>
				</li>
				<li>
					<label>Order Tracking</label>
					<div class='email value'><#=this.shipping.email #></div>
				</li>
				<li>
					<label>Shipping Method</label>
					<div class='email value'>Standard Shipping <span class='details'>(Will arrive by Thursday Night)</span></div>
				</li>
			</ul>
			<button class='b5' data-controller='checkout' data-action='editShipping'>Edit</button>
		</div>
	</script>
	
	<script id='templates-billing-summary' type='text/html'>
		<div class='billing disengaged panel'>
			<h2>Payment</h2>
			<ul>
				<li>
					<label>Billing Address</label>
					<div class='name value'><#=this.billing.name #></div>
					<div class='address value'><#=this.billing.address1 #></div>
					<div class='city value'><#=this.billing.city #></div>
					<div class='state value'><#=this.billing.state #></div>
					<div class='zipcode value'><#=this.billing.zip #></div>
					<div class='phone value'><#=this.billing.phone #></div>
				</li>
				<li>
					<label>Card Information Tracking</label>
					<div class='name value'>Robert Pottorff</div>
					<div class='creditCardNumber value'>Ending in 8989 (VISA)</div>
					<div class='creditCardExpirationMonth value'>January</div>
					<div class='creditCardExpirationYear value'>2013</div>
				</li>
				<li>
					<label>Shipping Method</label>
					<div class='email value'>Standard Shipping <span class='details'>(Will arrive by Thursday Night)</span></div>
				</li>
			</ul>
			<button class='b5' data-controller='checkout' data-action='editBilling'>Edit</button>
		</div>
	</script>
	
	<script id='templates-checkout-summary' type='text/html'>
		<table class='panel cart' cellpadding='0' cellspacing='0'>
			<thead>
				<tr>
					<td colspan='2'><h2>Order Summary</h2></td>
				</tr>
			</thead>
			<tbody class="hidden-phone">
				<# for(var i = 0; i < this.products.length; i++){ #>
				<tr class='productScope'>
					<td class='product'>
						<div class='properties'>
							<div class='productName'><#=this.products[i].title #></div>
							<div class='details productOptions'><span class='productMpn'><#=this.products[i].mpn #></span> <#=this.products[i].options #></div>
							<div class='quantity'>Quantity: <span class='data'><#=this.products[i].quantity #></span></div>
							<div data-method='<#=this.products[i].status.slug #>' class='productAvailability'><span class='status'><#=this.products[i].status.description #></span></div>
						</div>
					</td>
					<td class='extendedPrice'>
						<span class='productExtendedPrice'><#=_util.parseCurrency(this.products[i].extendedPrice) #></span>
					</td>
				</tr>
				<# } #>
			</tbody>
			<tfoot>
				<tr class='merchandiseTotal'>
					<td><label>Merchandise</label></td>
					<td><span class='value'><#=_util.parseCurrency(this.totals.merchandise.value) #></span></td>
				</tr>
				<# if(this.totals.shipping){ #>
					<tr class='shippingTotal'>
						<td><label><#=this.totals.shipping.method #></label></td>
						<td><span class='value'><#=_util.parseCurrency((this.totals.shipping ? "0.00" : this.totals.shipping.value)) #></span></td>
					</tr>
				<# } #>
				<tr class='taxTotal'>
					<td><label>Tax</label></td>
					<td><span class='value'><#=_util.parseCurrency(this.totals.tax ? "0.00" : this.totals.tax.value) #></span></td>
				</tr>
				<tr class='orderTotal'>
					<td><label>Order Total</label></td>
					<td><span class='value'><#=_util.parseCurrency(this.totals.total.value) #></span></td>
				</tr>
			</tfoot>
	
		</table>
		<button class='b1 hide' data-controller='checkout' data-action='finishOrder'>Finish Order</button>
		<div class='advertisement hidden-phone ad-noHassleReturns'>Advertisement</div>
	</script>
	
	<script id='template-checkout-shippingMethods' type='text/html'>
		<ul data-controller='checkout'>
			<li class='field'>
				<input id='shippingMethod-0' type='radio' name='shipping.method' value='standard' data-action='updateShippingMethod' />
				<label for='shippingMethod-0'>
					Standard Shipping - <span class='cost'>$3.29</span>
					<span class='details'>3-5 Business days, <em>will arrive by Friday</em></span>
				</label>
			</li>
			<li class='field'>
				<input id='shippingMethod-1' type='radio' name='shipping.method' value='express' data-action='updateShippingMethod' />
				<label for='shippingMethod-1'>
					Overnight - <span class='cost'>$13.29</span>
					<span class='details'>1 Business days, <em>will arrive by Friday</em></span>
				</label>
			</li>
			<li class='field'>
				<input id='shippingMethod-2' type='radio' name='shipping.method' value='overnight' data-action='updateShippingMethod' />
				<label for='shippingMethod-2'>
					2nd Day Air - <span class='cost'>$23.29</span>
					<span class='details'>2 Business days, <em>will arrive by Friday</em></span>
				</label>
			</li>
		</ul>
	</script>
</div>