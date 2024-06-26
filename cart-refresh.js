require([
    'jquery',
    'Magento_Customer/js/customer-data'
], function ($, customerData) {
    alert('cart refresh');

    // Helper function to get a cookie value by name
    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    function setCookie(name, value, days) {
        var expires = "";
        if (days) {
            var date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function initializeCart() {
        const guestCartId = getCookie('guest_cart_id');
        if (!guestCartId) {
            createGuestCart();
        } else {
            updateCartUI();
        }
    }

    function createGuestCart() {
        fetch('/rest/V1/guest-carts', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer q3czixlmrvj1vcgavlt9hdhtj0fjwzdh',
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to create guest cart: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(cartId => {
            setCookie('guest_cart_id', cartId, 7);
            console.log('Guest Cart ID created and saved in cookies:', cartId);
            updateCartUI();
        })
        .catch(error => {
            console.error('Error creating guest cart:', error);
        });
    }

    window.addEventListener('cart-refresh', () => {
        console.log('Cart refresh event received. Updating cart UI...');
        updateCartUI();
    });

    function updateCartUI() {
        const guestCartId = getCookie('guest_cart_id');
        if (!guestCartId) {
            console.error('No guest_cart_id found in cookies.');
            return;
        }

        console.log(`Fetching cart items for guest_cart_id: ${guestCartId}`);

        fetch(`/rest/V1/guest-carts/${guestCartId}/items`, {
            headers: {
                'Authorization': 'Bearer q3czixlmrvj1vcgavlt9hdhtj0fjwzdh',
                'Content-Type': 'application/json',
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`Failed to fetch cart items: ${response.status} ${response.statusText}`);
            }
            return response.json();
        })
        .then(cartItems => {
            console.log('Updated Cart Items:', cartItems);
            const miniCart = document.querySelector('#minicart-content-wrapper');
            if (!miniCart) {
                console.error('#mini-cart element not found in the DOM.');
                return;
            }
            // Build HTML for the cart items
            miniCart.innerHTML = buildCartItemsHTML(cartItems);
            updateCartCounter(cartItems); // Update the cart counter
            updateCartTotal(cartItems); // Update the cart total
            customerData.reload(['cart'], false);
        })
        .catch(error => {
            console.error('Error updating cart UI:', error);
        });
    }

    function buildCartItemsHTML(cartItems) {
        if (!Array.isArray(cartItems)) {
            console.error('cartItems is not an array:', cartItems);
            return '<p>Error loading cart items.</p>';
        }

        if (cartItems.length === 0) {
            return '<p>Your cart is empty.</p>';
        }

        let html = '<button type="button" id="btn-minicart-close" class="action close"><svg class="amtheme-icon"><use xlink:href="#icon-close"></use></svg></button>';
        html += '<div class="block-title"><span class="text">Basket items</span><span class="items-total"><span class="count">1</span><span>Item</span></div>';
        html += '<div data-action="scroll" class="minicart-items-wrapper" style="height: 435px;"><ul class="minicart-items">';

        cartItems.forEach(item => {
            html += `
                <li class="item product product-item odd last" data-role="product-item">
                    <div class="product" style="position:relative;">
                        <div class="product-photo">
                            <a data-bind="attr: {href: product_url, title: product_name}" tabindex="-1" class="product-item-photo" href="https://mcstaging.wiltshirefarmfoods.com/roast-chicken-breast-with-stuffing" title="Roast Chicken Breast with Stuffing">
                                <img data-bind="attr:{src:odimage},html:odimage" src="https://mcstaging.wiltshirefarmfoods.com/media/catalog/product/5/4/549_roast_chicken_breast_with_stuffing_plated.jpg?width=294&amp;height=294&amp;canvas=294,294&amp;optimize=high&amp;bg-color=255,255,255&amp;fit=bounds">
                            </a>
                            <a data-bind="attr: {'data-post': wishlist_data, 'data-product-id': product_id, 'class': active_in_wishlist, title: $t('Add to wishlist')}" data-post="{&quot;action&quot;:&quot;https:\/\/mcstaging.wiltshirefarmfoods.com\/wishlist\/index\/add\/&quot;,&quot;data&quot;:{&quot;qty&quot;:1,&quot;currenturl&quot;:&quot;https:\/\/mcstaging.wiltshirefarmfoods.com\/ready-meals\/best-sellers&quot;,&quot;product&quot;:830,&quot;uenc&quot;:&quot;aHR0cHM6Ly9tY3N0YWdpbmcud2lsdHNoaXJlZmFybWZvb2RzLmNvbS9jdXN0b21lci9zZWN0aW9uL2xvYWQvP3NlY3Rpb25zPWNhcnQlMkNkaXJlY3RvcnktZGF0YSUyQ21lc3NhZ2VzJmZvcmNlX25ld19zZWN0aW9uX3RpbWVzdGFtcD10cnVlJl89MTcxOTMwMzMzNDg4Mw~~&quot;}}" data-product-id="830" title="Add to wishlist">
                                <svg class="amtheme-icon -hover-bg">
                                    <use xlink:href="#icon-wishlist"></use>
                                </svg>
                            </a>
                            <div class="cart_item_sku">${item.sku}</div>
                        </div>
                        <div class="product-item-details" style="margin-bottom: 30px;">
                            <strong class="product-item-name">
                                <a href="roast-chicken-breast-with-stuffing" title="">${item.name}</a>
                            </strong>
                            <div class="product-item-pricing">
                                <div class="qty_price_wrapper">
                                    <div class="cart_item_weight">${item.product_weight}</div>
                                    <div class="price-container">
                                        <span class="price-wrapper">   <span class="price-excluding-tax" data-label="Excl. Tax"> <span class="minicart-price"> <span class="price">£${item.price}</span></span> </span>  </span>
                                    </div>
                                </div>
                                <div class="details-qty qty">
                                    <label class="label" style="display: inline-block;margin-top: 3px;">Qty</label>
                                    <div class="control amtheme-qty-box">
                                        ${item.qty}
                                    </div>
                                </div>
                            </div>
                            <div class="actions">
                                <a data-bind="attr: {
                                    href: configure_url,
                                    title: $t('Edit item'),
                                    'aria-label': $t('Edit item')}" class="action edit" href="https://mcstaging.wiltshirefarmfoods.com/checkout/cart/configure/id/235544/product_id/830/" title="Edit item" aria-label="Edit item">
                                    <svg class="amtheme-icon">
                                        <use xlink:href="#icon-edit"></use>
                                    </svg>
                                </a>
                                <a data-bind="attr: {
                                    'data-cart-item': item_id,
                                    title: $t('Remove item'),
                                    'aria-label': $t('Remove item')
                                    }" class="action delete" data-cart-item="235544" title="Remove item" aria-label="Remove item">
                                    <svg class="amtheme-icon">
                                        <use xlink:href="#icon-trash"></use>
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            `;
        });

        html += '</ul></div>';
        html += `
            <div class="custom_div">
                <div class="block-content">
                    <div class="item-count">
                        <span class="item-label">Total items</span>
                        <span class="item-number">${calculateTotalItems(cartItems)}</span>
                    </div>
                    <div class="subtotal">
                        <span class="label">
                            <span>Total (Including VAT)</span>
                        </span>
                        <div class="amount price-container" id="cart-subtotal">
                            <span class="price">£${calculateCartTotal(cartItems)}</span>
                        </div>
                    </div>
                    <div class="actions">
                        <div class="primary">
                            <button id="top-cart-btn-checkout" type="button" class="action secondary checkout cart-custom-btn" data-action="close" title="Proceed to Checkout">Checkout</button>
                            <div class="extra-actions" data-bind="html: getCartParam('extra_actions')"></div>
                        </div>
                    </div>
                    <div class="actions">
                        <div class="secondary">
                            <a class="action viewcart" data-bind="attr: {href: shoppingCartUrl, title: 'View Basket'}, i18n: 'View Basket'" href="https://mcstaging.wiltshirefarmfoods.com/checkout/cart/" title="View Basket">View Basket</a>
                        </div>
                    </div>
                </div>
            </div>
            <style style="">
                .block.block-minicart .product-item .product-photo .wishlist_active .amtheme-icon.-hover-bg {
                    color: #173f35;
                }
                .addCustomPadding {
                    color: #b30000;
                }
                .addCustomStyle {
                    top: 195px;
                    left: 3px;
                    right: 5px;
                    position: absolute;
                    overflow: hidden;
                    max-width: 75ch;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    padding: 10px;
                    z-index: 1;
                    height: 35px;
                    line-height: 1.2em;
                    font-size: 1.4rem;
                    background: #fce0e0;
                    color: #070605;
                }
                .cart_item_sku {
                    background: #796e67;
                    max-width: 75px;
                    text-align: center;
                    height: 20px;
                    font-size: 12px;
                    line-height: 23px;
                    color: #fff;
                    font-family: 'Roboto','Helvetica Neue',Helvetica,Arial,sans-serif;
                    font-weight: 700;
                    padding: 0 13.5px;
                    display: inline-block;
                    margin-top: 15px;
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                }
            </style>
        `;

        return html;
    }

    function calculateTotalItems(cartItems) {
        return cartItems.reduce((total, item) => total + item.qty, 0);
    }

    function calculateCartTotal(cartItems) {
        return cartItems.reduce((total, item) => total + (item.qty * item.price), 0).toFixed(2);
    }

    function updateCartCounter(cartItems) {
        const counterQty = document.querySelector('.counter-number');
        const counterLabel = document.querySelector('.counter-label');
        const counterElement = document.querySelector('.counter.qty');
        const itemCount = calculateTotalItems(cartItems);

        if (counterQty && counterLabel && counterElement) {
            counterQty.textContent = itemCount;
            counterLabel.innerHTML = `${itemCount} <span>items</span>`;
            if (itemCount > 0) {
                counterElement.classList.remove('empty');
            } else {
                counterElement.classList.add('empty');
            }
        }
    }

    function updateCartTotal(cartItems) {
        const cartTotalElement = document.querySelector('#fetchForSubtotal .price');
        if (cartTotalElement) {
            cartTotalElement.textContent = `£${calculateCartTotal(cartItems)}`;
        }
    }

    // Initialize the cart when the script is loaded
    initializeCart();
});
