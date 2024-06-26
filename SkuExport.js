// Lets write a function that will take product name as input and return the SKU value

import fetch from 'node-fetch';

export async function SKU(productName) {
    const apiUrl = 'http://wff.demo.botstore/rest/V1/getProducts/';
    
    const headers = {
        'Authorization': 'Bearer q3czixlmrvj1vcgavlt9hdhtj0fjwzdh',
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

