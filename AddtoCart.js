// Macnica API we have to use to add the product to the cart list

import fetch from 'node-fetch';

export async function addToCart(cartItem) {
    const apiUrl = 'https://mcstaging.wiltshirefarmfoods.com/rest/V1/carts/mine/items';
    
    const headers = {
      'Authorization': 'Bearer eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjIyLCJ1dHlwaWQiOjMsImlhdCI6MTcxNzc2NTAyNSwiZXhwIjoxNzE3NzY4NjI1fQ.3-nr4fzumhAEjFtG7zfp1LZGhlFiw8PpyeRs7EYcQ3M',
      'Content-Type': 'application/json'
    };
  
    const body = JSON.stringify({
      cartItem: {
        sku: cartItem.sku,
        qty: cartItem.qty
      }
    });
  
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: headers,
        body: body
      });
  
      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        throw new Error(`HTTP error status: ${response.status}`);
      }
  
      const result = await response.json();
      console.log("Product added to cart successfully!");
      return result;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      return { error: 'Error adding item to cart' };
    }
  }

