// Lets write a function that will take product name as input and return the SKU value

import fetch from 'node-fetch';

export async function getProductResponse(productName) {
    const apiUrl = 'https://mcstaging.wiltshirefarmfoods.com/rest/V1/getProducts/';
    
    const headers = {
        'Authorization': 'Bearer eyJraWQiOiIxIiwiYWxnIjoiSFMyNTYifQ.eyJ1aWQiOjIyLCJ1dHlwaWQiOjMsImlhdCI6MTcxNzc2NTAyNSwiZXhwIjoxNzE3NzY4NjI1fQ.3-nr4fzumhAEjFtG7zfp1LZGhlFiw8PpyeRs7EYcQ3M',
        'Content-Type': 'application/json'
    };

    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: headers
        });

        // Check if the response is OK (status 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const products = await response.json();

        // Find the product by name
        const product = products.find(object => object.name === productName);

        // If product is found, return the SKU
        if (product) {
            return { sku: product.sku };
        } else {
            return { message: "Product not found" };
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return { error: 'Error fetching products' };
    }
}

