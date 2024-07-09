import fetch from 'node-fetch';
import { SKU } from "./SkuExport.js";

const magentoBaseUrl = 'http://wff.demo.botstore';
const guestCartUrl = `${magentoBaseUrl}/rest/default/V1/guest-carts`;
const addToCartUrl = (cartId) => `${magentoBaseUrl}/rest/V1/guest-carts/${cartId}/items`;
const cartItemUrl = (cartId, itemId) => `${magentoBaseUrl}/rest/V1/guest-carts/${cartId}/items/${itemId}`;

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

        // Trigger frontend cart refresh and redirect to cart page
        refreshCartInFrontend();
        redirectToCartPage();

        return result;
    } catch (error) {
        console.error('Error adding item to cart:', error);
        return { error: 'Error adding item to cart' };
    }
}

export async function updateCartQuantity(cartItem) {
    const number = cartItem.qty;
    try {
        let cartId = getCookie('guest_cart_id');
        if (!cartId) {
            cartId = await createGuestCart();
            if (!cartId) {
                throw new Error('Unable to create or retrieve guest cart');
            }
        }

        // Fetch existing cart items
        const cartItemsResponse = await fetch(addToCartUrl(cartId), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer 3o7zbfaroy1le9jp1hzd44neju820ejl',
                'Content-Type': 'application/json'
            }
        });

        if (!cartItemsResponse.ok) {
            throw new Error(`Failed to fetch cart items: ${cartItemsResponse.status} ${cartItemsResponse.statusText}`);
        }

        const cartItems = await cartItemsResponse.json();
        const existingCartItem = cartItems.find(item => item.sku === cartItem.sku);

        let result;
        let updatedQuantity;

        if (existingCartItem) {
            const newQuantity = existingCartItem.qty + cartItem.qty;
            if (newQuantity <= 0) {
                const deleteResponse = await fetch(cartItemUrl(cartId, existingCartItem.item_id), {
                    method: 'DELETE',
                    headers: {
                        'Authorization': 'Bearer 3o7zbfaroy1le9jp1hzd44neju820ejl',
                        'Content-Type': 'application/json'
                    }
                });

                if (!deleteResponse.ok) {
                    throw new Error(`Failed to remove item from cart: ${deleteResponse.status} ${deleteResponse.statusText}`);
                }

                result = await deleteResponse.json();
                updatedQuantity = 0;
                console.log("Product removed from cart successfully!");
            } else {
                const updateBody = JSON.stringify({
                    cartItem: {
                        item_id: existingCartItem.item_id,
                        sku: cartItem.sku,
                        qty: newQuantity,
                        quote_id: cartId
                    }
                });

                const updateResponse = await fetch(cartItemUrl(cartId, existingCartItem.item_id), {
                    method: 'PUT',
                    headers: {
                        'Authorization': 'Bearer 3o7zbfaroy1le9jp1hzd44neju820ejl',
                        'Content-Type': 'application/json'
                    },
                    body: updateBody
                });

                if (!updateResponse.ok) {
                    throw new Error(`Failed to update item in cart: ${updateResponse.status} ${updateResponse.statusText}`);
                }

                result = await updateResponse.json();
                updatedQuantity = newQuantity;
                console.log("Product quantity updated in cart successfully!");
            }
        } else {
            if (cartItem.qty <= 0) {
                throw new Error('Quantity must be greater than 0');
            }

            const addBody = JSON.stringify({
                cartItem: {
                    sku: cartItem.sku,
                    qty: cartItem.qty,
                    quote_id: cartId
                }
            });

            const addResponse = await fetch(addToCartUrl(cartId), {
                method: 'POST',
                headers: {
                    'Authorization': 'Bearer 3o7zbfaroy1le9jp1hzd44neju820ejl',
                    'Content-Type': 'application/json'
                },
                body: addBody
            });

            if (!addResponse.ok) {
                throw new Error(`Failed to add item to cart: ${addResponse.status} ${addResponse.statusText}`);
            }

            result = await addResponse.json();
            updatedQuantity = cartItem.qty;
            console.log("Product added to cart successfully!");
        }

        refreshCartInFrontend();
        return { result, updatedQuantity };
    } catch (error) {
        console.error('Error updating cart quantity:', error);
        return { error: 'Error updating cart quantity' };
    }
}

// Function to delete an item from the cart
export async function deleteItemFromCart(productName, quantity) {
    try {
        let cartId = getCookie('guest_cart_id');
        if (!cartId) {
            cartId = await createGuestCart();
            if (!cartId) {
                throw new Error('Unable to create or retrieve guest cart');
            }
        }

        // Fetch existing cart items
        const cartItemsResponse = await fetch(addToCartUrl(cartId), {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer 3o7zbfaroy1le9jp1hzd44neju820ejl',
                'Content-Type': 'application/json'
            }
        });

        if (!cartItemsResponse.ok) {
            throw new Error(`HTTP error status: ${cartItemsResponse.status}`);
        }

        const cartItems = await cartItemsResponse.json();
        // Find if the item is already in the cart
        const existingCartItem = cartItems.find(item => item.name === productName);

        if (!existingCartItem) {
            return "Item doesn't exist in your cart!";
        }

        // Check the quantity
        if (quantity !== 0) {
            // Get SKU from the SKU function
            const skuResponse = await SKU(productName);
            const sku = skuResponse.sku;
            const cartItem = {
                sku: sku,
                qty: -quantity
            };
            const result = await updateCartQuantity(cartItem);
            return result;
        }

        const deleteResponse = await fetch(cartItemUrl(cartId, existingCartItem.item_id), {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer 3o7zbfaroy1le9jp1hzd44neju820ejl',
                'Content-Type': 'application/json'
            }
        });

        if (!deleteResponse.ok) {
            throw new Error(`HTTP error status: ${deleteResponse.status}`);
        }

        const result = await deleteResponse.json();
        console.log("Product removed from cart successfully!");

        // Trigger frontend cart refresh
        refreshCartInFrontend();

        return result;
    } catch (error) {
        console.error('Error deleting item from cart:', error);
        return { error: 'Error deleting item from cart' };
    }
}

export async function viewCart() {
    try {
        let cartId = getCookie('guest_cart_id');
        if (!cartId) {
            throw new Error('No guest cart ID found. Please add items to the cart first.');
        }

        const cart_contents = addToCartUrl(cartId);
        const headers = {
            'Authorization': 'Bearer 3o7zbfaroy1le9jp1hzd44neju820ejl',
            'Content-Type': 'application/json'
        };

        // Fetch existing cart items
        const cartItemsResponse = await fetch(cart_contents, {
            method: 'GET',
            headers: headers
        });

        if (!cartItemsResponse.ok) {
            throw new Error(`HTTP error status: ${cartItemsResponse.status}`);
        }

        const cartItems = await cartItemsResponse.json();

        // Create an object to hold summarized cart information
        const cartSummary = {
            totalQuantity: 0,
            totalPrice: 0,
            items: [] // Array to store summarized item details
        };

        // Loop through cart items and populate cartSummary
        for (const item of cartItems) {
            cartSummary.totalQuantity += item.qty;
            cartSummary.totalPrice += item.qty * item.price;

            // Create a summarized item object with relevant details
            const summarizedItem = {
                quantity: item.qty,
                name: item.name,
                price: item.price
            };

            cartSummary.items.push(summarizedItem);
        }

        console.log("Cart contents fetched successfully!");
        return cartSummary; // Return the summarized cart object
    } catch (error) {
        console.error('Error fetching cart contents:', error);
        return { error: 'Error fetching cart contents' };
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

// Function to redirect to the cart page
function redirectToCartPage() {
    if (typeof window !== 'undefined') {
        window.location.href = 'http://wff.demo.botstore/checkout/cart/';
    }
}
