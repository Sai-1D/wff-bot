// Function to retrieve product data based on product category and price
export function getProductResponse(productCategory,productPrice){

    // Capitalize the first letter of the product category
    productCategory = capitalizeFirstLetter(productCategory);
    
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
            ]
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
            ]
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
            ]
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
            ]
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
            ]
        }
    
    ];

    // Filter products based on category and price
    const product_data=products.filter((object) =>{
        if(productCategory!=null){
            //filter product cateogyr
            return object.categories.includes(productCategory);
        }
        if(productPrice!=null){
            //filter price
            return object.price.includes(""+productPrice);
        }
       //return object.categories.includes(productCategory) && object.price.includes(""+productPrice)
    });

    return product_data;
}

// Function to capitalize the first letter of each word in a sentence
function capitalizeFirstLetter(sentence) {
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