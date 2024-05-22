// Function to retrieve product data based on product category and price
export function getProductResponse(productName,productCategory,productPrice){
    
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
        },
        {
            "id": "643",
            "name": "Pur\u00e9e Petite Chicken & Vegetable Casserole ",
            "sku": "7046",
            "price": "5.290000",
            "shortDescription": "Pur\u00e9e Petite Chicken & Vegetable Casserole ",
            "productmadewithout": [
                "Cheese",
                "Soya",
                "Alcohol",
                "Fish",
                "Beef",
                "Celery",
                "Crustacean",
                "Egg & Egg Derivatives",
                "Garlic",
                "Lupin",
                "Milk & Milk Derivatives",
                "Mollusc",
                "Mushroom",
                "Mustard",
                "Nuts",
                "Onion",
                "Sesame",
                "Tomato",
                "Yeast",
                "Almond",
                "Brazil",
                "Cashew",
                "Hazlenut",
                "Macadamia",
                "Peanut",
                "Pecan",
                "Pistachio",
                "Queensland",
                "Walnut",
                "Rye",
                "Barley",
                "Oats"
            ],
            "suitableFor": [
                "Gluten Free",
                "Low Salt",
                "Vegetarian",
                "Low Sugars",
                "1 of 5 a Day",
                "Energy Dense",
                "Easy Chew"
            ],
            "productFreefrom": [
                "Gluten",
                "Sulphur Dioxide \/ Sulphites > 10mg\/KG",
                "Wheat",
                "Rye",
                "Barley",
                "Oats"
            ],
            "allergens": [
                "Celery",
                "Fish",
                "Garlic",
                "Lupin",
                "Mollusc",
                "Mustard",
                "Nuts",
                "Egg & Egg Derivatives"
            ],
            "categories": [
                "Mini Meals Extra",
                "Cold Desserts",
                "Mini Meals",
                "Vegetarian",
                "Italian & Mediterranean",
                "Best Sellers",
                "Gluten Free",
                "Level 4 Puree Petite"
            ]
        },{
            "id": "644",
            "name": " Pur\u00e9e Petite Salmon Fillet (Oven Cook Only)",
            "sku": "7047",
            "price": "5.550000",
            "shortDescription": " Pur\u00e9e Petite Salmon Fillet (Oven Cook Only)",
            "productmadewithout": [
                "Cheese",
                "Soya",
                "Alcohol",
                "Fish",
                "Beef",
                "Celery",
                "Crustacean",
                "Egg & Egg Derivatives",
                "Garlic",
                "Lupin",
                "Milk & Milk Derivatives",
                "Mollusc",
                "Mushroom",
                "Mustard",
                "Nuts",
                "Onion",
                "Sesame",
                "Tomato",
                "Yeast",
                "Almond",
                "Brazil",
                "Cashew",
                "Hazlenut",
                "Macadamia",
                "Peanut",
                "Pecan",
                "Pistachio",
                "Queensland",
                "Walnut",
                "Rye",
                "Barley",
                "Oats"
            ],
            "suitableFor": [
                "Gluten Free",
                "Low Salt",
                "Vegetarian",
                "Low Sugars",
                "1 of 5 a Day",
                "Energy Dense",
                "Easy Chew"
            ],
            "productFreefrom": [
                "Gluten",
                "Sulphur Dioxide \/ Sulphites > 10mg\/KG",
                "Wheat",
                "Rye",
                "Barley",
                "Oats"
            ],
            "allergens": [
                "Celery",
                "Fish",
                "Garlic",
                "Lupin",
                "Mollusc",
                "Mustard",
                "Nuts",
                "Egg & Egg Derivatives"
            ],
            "categories": [
                "Mini Meals Extra",
                "Cold Desserts",
                "Mini Meals",
                "Vegetarian",
                "Italian & Mediterranean",
                "Best Sellers",
                "Gluten Free",
                "Level 4 Puree Petite"
            ]
        },
        {
            "id": "645",
            "name": "Pur\u00e9e Petite Lamb Chop ",
            "sku": "7048",
            "price": "5.450000",
            "shortDescription": "Pur\u00e9e Petite Lamb Chop ",
            "productmadewithout": [
                "Cheese",
                "Soya",
                "Alcohol",
                "Fish",
                "Beef",
                "Celery",
                "Crustacean",
                "Egg & Egg Derivatives",
                "Garlic",
                "Lupin",
                "Milk & Milk Derivatives",
                "Mollusc",
                "Mushroom",
                "Mustard",
                "Nuts",
                "Onion",
                "Sesame",
                "Tomato",
                "Yeast",
                "Almond",
                "Brazil",
                "Cashew",
                "Hazlenut",
                "Macadamia",
                "Peanut",
                "Pecan",
                "Pistachio",
                "Queensland",
                "Walnut",
                "Rye",
                "Barley",
                "Oats"
            ],
            "suitableFor": [
                "Gluten Free",
                "Low Salt",
                "Vegetarian",
                "Low Sugars",
                "1 of 5 a Day",
                "Energy Dense",
                "Easy Chew"
            ],
            "productFreefrom": [
                "Gluten",
                "Sulphur Dioxide \/ Sulphites > 10mg\/KG",
                "Wheat",
                "Rye",
                "Barley",
                "Oats"
            ],
            "allergens": [
                "Celery",
                "Fish",
                "Garlic",
                "Lupin",
                "Mollusc",
                "Mustard",
                "Nuts",
                "Egg & Egg Derivatives"
            ],
            "categories": [
                "Mini Meals Extra",
                "Cold Desserts",
                "Mini Meals",
                "Vegetarian",
                "Italian & Mediterranean",
                "Best Sellers",
                "Gluten Free",
                "Level 4 Puree Petite"
            ]
        },{
            "id": "609",
            "name": "Chicken Curry with Rice",
            "sku": "264",
            "price": "3.550000",
            "shortDescription": "Chicken Curry with Rice",
            "productmadewithout": [
                "Cheese",
                "Soya",
                "Alcohol",
                "Fish",
                "Beef",
                "Celery",
                "Crustacean",
                "Egg & Egg Derivatives",
                "Lupin",
                "Milk & Milk Derivatives",
                "Mollusc",
                "Mushroom",
                "Nuts",
                "Sesame",
                "Yeast",
                "Almond",
                "Brazil",
                "Cashew",
                "Hazlenut",
                "Macadamia",
                "Peanut",
                "Pecan",
                "Pistachio",
                "Queensland",
                "Walnut"
            ],
            "suitableFor": [
                "Gluten Free",
                "Low Fat",
                "Low Sugars"
            ],
            "productFreefrom": [
                "Gluten",
                "Sulphur Dioxide \/ Sulphites > 10mg\/KG",
                "Wheat",
                "Rye",
                "Barley",
                "Oats"
            ],
            "allergens": [
                "Celery",
                "Fish",
                "Lupin",
                "Mollusc",
                "Nuts",
                "Egg & Egg Derivatives"
            ],
            "categories": [
                "Indian & Chinese",
                "Best Sellers",
                "Gluten Free"
            ]
        },
        {
            "id": "610",
            "name": "Sweet & Sour Chicken Mini Meal",
            "sku": "044",
            "price": "3.150000",
            "shortDescription": "Sweet & Sour Chicken Mini Meal",
            "productmadewithout": [
                "Cheese",
                "Soya",
                "Alcohol",
                "Fish",
                "Beef",
                "Celery",
                "Crustacean",
                "Egg & Egg Derivatives",
                "Garlic",
                "Lupin",
                "Milk & Milk Derivatives",
                "Mollusc",
                "Mushroom",
                "Mustard",
                "Nuts",
                "Onion",
                "Sesame",
                "Yeast",
                "Almond",
                "Brazil",
                "Cashew",
                "Hazlenut",
                "Macadamia",
                "Peanut",
                "Pecan",
                "Pistachio",
                "Queensland",
                "Walnut"
            ],
            "suitableFor": [
                "Gluten Free",
                "Low Fat",
                "Low Sugars",
                "1 of 5 a Day"
            ],
            "productFreefrom": [
                "Gluten",
                "Sulphur Dioxide \/ Sulphites > 10mg\/KG",
                "Wheat",
                "Rye",
                "Barley",
                "Oats"
            ],
            "allergens": [
                "Celery",
                "Fish",
                "Garlic",
                "Lupin",
                "Mollusc",
                "Mustard",
                "Nuts",
                "Egg & Egg Derivatives"
            ],
            "categories": [
                "Mini Meals",
                "Indian & Chinese",
                "Best Sellers",
                "Gluten Free"
            ]
        },
        {
            "id": "611",
            "name": "Cr\u00e8me Caramel",
            "sku": "477",
            "price": "1.990000",
            "shortDescription": "Cr\u00e8me Caramel",
            "productmadewithout": [
                "Cheese",
                "Soya",
                "Alcohol",
                "Fish",
                "Beef",
                "Celery",
                "Crustacean",
                "Egg & Egg Derivatives",
                "Garlic",
                "Lupin",
                "Milk & Milk Derivatives",
                "Mollusc",
                "Mushroom",
                "Mustard",
                "Nuts",
                "Onion",
                "Sesame",
                "Tomato",
                "Yeast",
                "Almond",
                "Brazil",
                "Cashew",
                "Hazlenut",
                "Macadamia",
                "Peanut",
                "Pecan",
                "Pistachio",
                "Queensland",
                "Walnut"
            ],
            "suitableFor": [
                "Gluten Free",
                "Low Fat",
                "Low Salt",
                "Vegetarian",
                "Low Sugars",
                "1 of 5 a Day"
            ],
            "productFreefrom": [
                "Gluten",
                "Sulphur Dioxide \/ Sulphites > 10mg\/KG",
                "Wheat",
                "Rye",
                "Barley",
                "Oats"
            ],
            "allergens": [
                "Celery",
                "Fish",
                "Garlic",
                "Lupin",
                "Mollusc",
                "Mustard",
                "Nuts",
                "Egg & Egg Derivatives"
            ],
            "categories": [
                "Mini Meals",
                "Indian & Chinese",
                "Best Sellers",
                "Gluten Free"
            ]
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
