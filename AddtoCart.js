import fetch from 'node-fetch';

const magentoBaseUrl = 'http://wff.demo.botstore';
const guestCartUrl = `${magentoBaseUrl}/rest/default/V1/guest-carts`;
const addToCartUrl = (cartId) => `${magentoBaseUrl}/rest/V1/guest-carts/${cartId}/items`;

// Function to create a guest cart in Magento
async function createGuestCart() {
    try {
        const response = await fetch(guestCartUrl, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer 3o7zbfaroy1le9jp1hzd44neju820ejl',
                'Content-Type': 'application/json',
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to create guest cart: ${response.status} ${response.statusText}`);
        }

        const cartId = await response.json();
        console.log('Guest Cart ID:', cartId);
        setCookie('guest_cart_id', cartId, 365);  // Store in cookie

        return cartId;
    } catch (error) {
        console.error('Error creating guest cart:', error);
        return null;
    }
}

// Function to add a product to the Magento cart
export async function addToCart(cartItem) {
    try {
        let cartId = getCookie('guest_cart_id');
        if (!cartId) {
            cartId = await createGuestCart();
            if (!cartId) {
                throw new Error('Unable to create or retrieve guest cart');
            }
        }

        console.log('Adding item to cart:', cartItem);
        const response = await fetch(addToCartUrl(cartId), {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer 3o7zbfaroy1le9jp1hzd44neju820ejl',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                cartItem: {
                    sku: cartItem.sku,
                    qty: cartItem.qty,
                    quote_id: cartId // Ensure the cart ID is included
                }
            })
        });

        if (!response.ok) {
            throw new Error(`Failed to add item to cart: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        console.log("Product added to cart successfully!", result);

        // Trigger frontend cart refresh
        refreshCartInFrontend();

        return result;
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return { error: 'Error adding item to cart' };
    }
}

// Function to refresh the frontend cart
function refreshCartInFrontend() {
    if (typeof window !== 'undefined') {
        const event = new CustomEvent('cart-refresh');
        window.dispatchEvent(event);
        console.log('Dispatched cart-refresh event to frontend.');
    }
}

function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
}

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
