import { fetchstaticwebsitedata } from './data_extraction.js';
import {getMessageObject, ROLE_ASSISTANT,ROLE_USER,ROLE_SYSTEM} from './prompt_builder.js';
import OpenAIAPI from './node_modules/openai';
import { SKU } from "./SkuExport.js";
import { addToCart } from "./AddtoCart.js";

//makes environment variables available for our application
//dotenv.config(); 

const ignoreParagraphs =["cookie", "ourData", "Policy","Added to your basket"]
const openai = new OpenAIAPI({
    apiKey: '',
    dangerouslyAllowBrowser: true,
    engine: 'gpt-3.5-turbo-0125',  // or your preferred ChatGPT model
  });

  const websiteUrl = 'http://wff.demo.botstore/about-our-food'; 
  const checkoutUrl = 'http://wff.demo.botstore/checkout/';
  let websiteData = {}

  // Define tools for ChatGPT interactions
  const tools = [
    {
        "type": "function",
        "function": {
            "name": "add_to_cart",
            "description": "Add a product to the cart",
            "parameters": {
                "type": "object",
                "properties": {
                    "product_name": {
                        "type": "string",
                        "description": "The name of the product to add to the cart"
                    },
                    "quantity": {
                        "type": "integer",
                        "description": "The quantity of the product to add to the cart"
                    }
                },
                "required": ["product_name", "quantity"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "find_similar_products",
            "description": "Find products similar to the user's query",
            "parameters": {
                "type": "object",
                "properties": {
                    "query": {
                        "type": "string",
                        "description": "The user's search query"
                    }
                },
                "required": ["query"]
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "go_to_Checkout_page",
            "description": "Open the checkout URL for the user",
        }
    }
];
const softMealProducts = [
  { "name": "Fillet of Trout in Lemon Sauce" },
  { "name": "Steak & Mushroom Casserole" },
  { "name": "Hearty Cottage Pie" }
];
const buttonData = [
  { "user": "can you give some product recommendations" },
  { "bot": "What are you interested in 1. soft meal, 2.gluten free, 3.best sellers" },
  { "user": "soft meal" },
  {
      "bot": "we have the following gluten free products",
      "Products": JSON.stringify(softMealProducts)
  },
];
const messagesList = [
  { "role": "system", "content": "You are a virtual agent of Wiltshire Farm Foods which is a leading meal provider in the UK. You are expected to answer questions about Wiltshire Farm Foods' meal options and their delivery." },
  { "role": "system", "content": "You give very short answers" },
  { "role": "user", "content": JSON.stringify(buttonData) }
];

  /**
   * Function to Make API Call to Chat GPT 
   * @param {*} question 
   * @param {*} data 
   * @returns returns a response if the model is able to answer the question; Error otherwise. 
   */
export async function askChatGPT(question, data) {
    // Construct prompt based on user's input and website data
    const prompt = `\n${Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n')}`;
    // Create messages list
    messagesList.push(getMessageObject(ROLE_USER, `Question: ${question}`));
    messagesList.push(getMessageObject(ROLE_ASSISTANT, `${prompt}`));

    // Remove the chats containing website data except the initial chat
    if (JSON.stringify(messagesList).length >= 10000 && (messagesList.length > 10)) {
        for (let message of messagesList) {
            let indexToBeRemoved = messagesList.indexOf(message);
            if (message.role == "assistant" && message.content != null && indexToBeRemoved > 5) {
                messagesList.splice(indexToBeRemoved, 1);
            }
        }
    }

    // Invoke Chat GPT completions API
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-3.5-turbo-0125',
            messages: messagesList,
            tools: tools,
        });
        let responseMessage = response.choices[0].message;

        // Push a new message to the messagesList array with response from chatgpt 
        messagesList.push(responseMessage);
        let answer = null;

        if (response.choices[0].message.content == null) {
            let toolCalls = response.choices[0].message.tool_calls.length;
            for (let i = 0; i <= toolCalls - 1; i++) {
                const function_call = response.choices[0].message.tool_calls[i];
                const function_argument = JSON.parse(function_call.function.arguments);

                // if (function_call.function.name === "meal_properties") {
                //     // Extract meal_name, meal_category, and price from the function arguments
                //     const productName = function_argument.name;
                //     const productCategory = function_argument.categories;
                //     const productPrice = function_argument.price;

                //     // Get the required product response based on category and price
                //     const required_product = fun.getProductResponse(productName, productCategory, productPrice);

                //     if (required_product.length === 0) {
                //         // Push a custom message to the messagesList array with tool information and product details for each tool call
                //         messagesList.push({ "role": "tool", "tool_call_id": function_call.id, "name": function_call.function.name, "content": "Sorry no item available with your requirement" });
                //     } else {
                //         // Push a new message to the messagesList array with tool information and product details
                //         messagesList.push({ "role": "tool", "tool_call_id": function_call.id, "name": function_call.function.name, "content": JSON.stringify(required_product) });
                //     }
                // }

                if (function_call.function.name === "add_to_cart") {
                    const productName = function_argument.product_name;
                    const quantity = function_argument.quantity;
                    // Log product name and quantity
                    console.log(`Added to cart: ${productName} (Quantity: ${quantity})`);
                    
                    // Assuming matchedProductName is the name extracted from the function arguments
                    const matchedProductName = productName;

                    // Get SKU from the SKU function
                    const skuResponse = await SKU(matchedProductName);
                    const sku = skuResponse.sku;

                    // Create cart item with SKU and quantity
                    const cartItem = {
                        sku: sku,
                        qty: quantity
                    };

                    // Add item to cart
                    const result = await addToCart(cartItem);

                    // Update answer with confirmation message
                    answer = `Added ${quantity} of ${matchedProductName} to the cart. SKU: ${sku}`;
                    // Push confirmation message to messagesList
                    messagesList.push({ "role": "tool", "tool_call_id": function_call.id, "name": function_call.function.name, "content": answer });
                }

                else if (function_call.function.name === "find_similar_products") {
                    const query = function_argument.query;
                    console.log("I understood as it is a Similarity check Query");

                    // Make a request to the Express server to find similar products
                    const similarProducts = await findSimilarProductsFromServer(query);

                    messagesList.push({ "role": "tool", "name": function_call.function.name, "tool_call_id": function_call.id, "content": `Similar products: ${JSON.stringify(similarProducts)}` });
                    answer = `Similar products: ${similarProducts}`;
                }
                else if (function_call.function.name === "go_to_Checkout_page") {
                    answer = `Opening the Checkout Page.`;
                    messagesList.push({ "role": "tool", "tool_call_id": function_call.id, "name": function_call.function.name, "content": answer });
                    window.location.href =`${checkoutUrl}`;
                }
            }
            let second_completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo-0125",
                messages: messagesList,
                tools: tools,
                tool_choice: "auto",
            });
            answer = second_completion.choices[0].message.content;
        } else {
            answer = response.choices[0].message.content;
        }

        return answer;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
}
async function findSimilarProductsFromServer(query) {
    try {
        const response = await fetch(`http://localhost:5000/find-similar?q=${encodeURIComponent(query)}`);
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            console.error('Failed to fetch similar products from server:', response.statusText);
            return [];
        }
    } catch (error) {
        console.error('Error fetching similar products:', error);
        return [];
    }
}
  
 
 /**
  * Main function: Program execution starts here
  */

 async function main() {
    try {
        let data = fetchstaticwebsitedata();
        if (data != null) {
            if (data.paragraphs) {
                // Filter unnecessary paragraphs
                data = data.paragraphs.filter(
                    paragraph => ignoreParagraphs.findIndex(ignoreParagraph => paragraph.includes(ignoreParagraph)) == -1
                );
  
                // Get the textarea element by its id
                const textarea = document.getElementById("textareaInput");
                let userInput = textarea.value.trim(); 
                
                while (true) {
                    if (!userInput || userInput === "0") {
                        break;
                    }
  
                    // Query ChatGPT
                    let answer = await askChatGPT(userInput, data);
                    console.log("Answer: ", answer);
  
                    // Clear textarea for next input
                    textarea.value = "";
  
                    // Read the value from the textarea again
                    userInput = textarea.value.trim(); // Trim whitespace
                }
            }
        }
    } catch (error) {
        console.error("Error ", error);
    }
  }
  
  main();






  
