// Function to retrieve product data based on product category and price
export function getProductResponse(productName,productCategory,productPrice,productDiscount){
    
    // Array of products with their details
    const products=[
        {
            "id": "612",
            "name": "Fillet of Trout in Lemon Sauce",
            "sku": "733",
            "price": "7.050000",
            "shortDescription": " Trout fillet in a lemon sauce served with mashed potato, broccoli, green beans and peas.",
            "productmadewithout": [
                "Cheese",
                "Eggs",
                "Soya"
            ],
            "suitableFor": [
                "Low Fat",
                "Low Salt",
                "Vegetarian",
                "Vegan"
            ],
            "productFreefrom": [
                "Gluten",
                "Sulphur Dioxide / Sulphites > 10mg/KG",
                "Wheat",
                "Rye",
                "Barley",
                "Oats"
            ],
            "allergens": "Fish",
            "categories": [
                "Fish",
                "Chef's Favourites",
                "Best Sellers",
                "Gluten Free"
            ],
            "discount":true,
        },{
            "id": "614",
            "name": "Plaice in Breadcrumbs",
            "sku": "563",
            "price": "6.590000",
            "shortDescription": "Plaice fillet coated in golden breadcrumbs. Served with boiled potatoes and peas.",
            "productmadewithout": [
                "Milk",
                "Cheese",
                "Eggs",
                "Soya"
            ],
            "suitableFor": [
                "Low Fat",
                "Low Salt",
                "Low Sugars",
                "1 of 5 a Day"
            ],
            "allergens": [
                "Celery",
                "Eggs",
                "Garlic",
                "Lupin",
                "Milk",
                "Mustard",
                "Nuts"
            ],
            "categories": [
                "Fish",
                "Best Sellers"
            ],
            "discount":false,
        },
        {
            "id": "615",
            "name": "Steak & Mushroom Casserole",
            "sku": "214",
            "price": "5.250000",
            "shortDescription": "Tender chunks of steak with mushrooms and mixed vegetables. Served with mashed potato, broccoli and mashed carrot.",
            "productmadewithout": [
                "Cheese",
                "Eggs",
                "Soya",
                "Fish"
            ],
            "suitableFor": [
                "Gluten Free",
                "Low Salt",
                "Low Sugars",
                "2 of 5 a Day"
            ],
            "productFreefrom": [
                "Gluten",
                "Sulphur Dioxide / Sulphites > 10mg/KG",
                "Wheat",
                "Rye",
                "Barley",
                "Oats"
            ],
            "allergens": [
                "Celery",
                "Eggs",
                "Fish",
                "Garlic",
                "Lupin",
                "Mustard",
                "Nuts"
            ],
            "categories": [
                "Beef",
                "Best Sellers",
                "Gluten Free"
            ],
            "discount":true,
        },
        {
            "id": "625",
            "name": "Steak & Kidney Pie",
            "sku": "211",
            "price": "4.790000",
            "shortDescription": "Beef steak, pork kidney, shortcrust pastry and gravy make for a classic. Served with mashed potato, carrots and peas.",
            "productmadewithout": [
                "Cheese",
                "Eggs",
                "Soya",
                "Fish"
            ],
            "suitableFor": [
                "Low Sugars",
                "1 of 5 a Day",
                "Energy Dense"
            ],
            "allergens": [
                "Celery",
                "Eggs",
                "Fish",
                "Garlic",
                "Lupin",
                "Mustard",
                "Nuts"
            ],
            "categories": [
                "Beef"
            ],
            "discount":false,
        },
        {
            "id": "623",
            "name": "Hearty Cottage Pie",
            "sku": "7100",
            "price": "6.290000",
            "shortDescription": "Minced beef cooked in a savoury sauce and topped with mashed potato. Served with carrots and peas.",
            "productmadewithout": [
                "Milk",
                "Cheese",
                "Eggs",
                "Soya",
                "Fish"
            ],
            "suitableFor": [
                "Gluten Free",
                "Low Sugars",
                "2 of 5 a Day"
            ],
            "productFreefrom": [
                "Gluten",
                "Sulphur Dioxide / Sulphites > 10mg/KG",
                "Wheat",
                "Rye",
                "Barley",
                "Oats"
            ],
            "allergens": [
                "Celery",
                "Eggs",
                "Fish",
                "Lupin",
                "Milk",
                "Mustard",
                "Nuts"
            ],
            "categories": [
                "Beef",
                "Hearty Meals",
                "Gluten Free"
            ],
            "discount":false,
        },
        {
            "id": "1102",
            "name": "Fruit Cocktail",
            "sku": "419",
            "price": "1.190000",
            "shortDescription": "A fruity mix of pineapple, papaya, mango, melon and grapes in apple juice.",
            "productmadewithout": [
                "Milk",
                "Cheese",
                "Eggs",
                "Soya",
                "Fish"
            ],
            "suitableFor": [
                "Gluten Free",
                "Low Fat",
                "Low Salt",
                "Vegetarian",
                "Vegan"
            ],
            "productFreefrom": [
                "Gluten",
                "Sulphur Dioxide / Sulphites > 10mg/KG",
                "Wheat",
                "Rye",
                "Barley",
                "Oats"
            ],
            "allergens": [
                "Celery",
                "Eggs",
                "Fish",
                "Garlic",
                "Lupin",
                "Milk",
                "Mustard",
                "Nuts"
            ],                
            "categories": [
                "Cold Desserts"
            ],
            "discount":true,
        }
    
    ];

    // Filter products 
   const product_data=products.filter((object) =>{            
                
                let filterCriteria=[];
                
                //filter Name
                if(productName!=null){
                    let productNameIncluded=productName.filter((name) =>{
                        return object.name.includes(name);
                    });             
                          
                    if(JSON.stringify(productName)==JSON.stringify(productNameIncluded)){
                        filterCriteria.push(true);
                    }else{
                        filterCriteria.push(false);
                    }
                }
                //filter category
                if (productCategory != null) {
                    let productCategoryIncluded = productCategory.filter((category) => {                       
                        return object.categories.includes(category);
                    });
                    if (JSON.stringify(productCategory)==JSON.stringify(productCategoryIncluded)) {
                        filterCriteria.push(true);
                    } else {
                        filterCriteria.push(false);
                    }
                }
                //filter price
                if(productPrice!=null){
                    filterCriteria.push(object.price.includes(productPrice));
                }
                //filter discount
                if(productDiscount!=null){
                    filterCriteria.push(object.discount);
                }    

                return filterCriteria.every(element => element === true);

     });

        return product_data;

}

// Function to capitalize the first letter of each word in a sentence

export function capitalizeFirstLetter(sentence) {
    // Check if the input is a string
    if (typeof sentence !== 'string' || sentence.trim() === '') {
        return ''; // Return an empty string if input is not valid
    }
    
    // Split the sentence into words
    var words = sentence.split(" ");
    
    // Capitalize the first character of each word
    for (var i = 0; i < words.length; i++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    
    // Join the words back into a sentence
    var capitalizedSentence = words.join(" ");
    
    return capitalizedSentence;
}
