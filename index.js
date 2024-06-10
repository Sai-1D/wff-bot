import { fetchstaticwebsitedata } from './data_extraction.js';
import {getMessageObject, ROLE_ASSISTANT,ROLE_USER,ROLE_SYSTEM} from './prompt_builder.js';
import OpenAIAPI from './node_modules/openai';
import { getProductResponse } from "./SkuExport.js";
import { addToCart } from "./AddtoCart.js";

//makes environment variables available for our application
//dotenv.config(); 

const ignoreParagraphs =["cookie", "ourData", "Policy","Added to your basket"]
const openai = new OpenAIAPI({
    apiKey: '',
    dangerouslyAllowBrowser: true,
    engine: 'gpt-3.5-turbo-0125',  // or your preferred ChatGPT model
  });

  const websiteUrl = 'https://mcstaging.wiltshirefarmfoods.com/about-our-food'; 
  let websiteData = {}

  // Define tools for ChatGPT interactions
  const tools = [
    {
      "type": "function",
      "function": {
        "name": "meal_properties",
        "description": "get meal properties from the user prompt",
        "parameters": {
          "type": "object",
          "properties": {
            "name": {
              "type": "array",
              "description": "the meal name",
              "items": {
                "type": "string",
              }
            },
            "categories": {
              "type": "array",
              "description": "the meal categories. e.g. Best Sellers, Desserts, Beef, Gluten Free",
              "items": {
                "type": "string",
              }
            },
            "price": {
              "type": "integer",
              "description": "the meal price",
            },
            "quantity": {
              "type": "integer",
              "description": "the quantity of the meal",
            }
          }
        }
      }
    }
  ];
  const softMealProducts = [
    { "name": "Fillet of Trout in Lemon Sauce","sku":733},
    { "name": "Steak & Mushroom Casserole" ,"sku":214},
    { "name": "Hearty Cottage Pie","sku":7100}
  ];
  const buttonData = [
    { "user": "can you give some product recommendations" },
    { "bot": "What are you interested in 1. soft meal, 2.gluten free, 3.best sellers" },
    { "user": "soft meal" },
    { "bot": "we have the following gluten free products", "Products": JSON.stringify(softMealProducts) },
  ];
  const messagesList = [
    { "role": "system", "content": "You are a virtual agent of Wiltshire Farm Foods which is a leading meal provider in UK. You are expected to answer questions about Wiltshire Farm Food' meal options and their delivery" },
    { "role": "system", "content": "you give very short answers" },
    { "role": "user", "content": JSON.stringify(buttonData) }
  ];

  function extractProductDetails(question) {
    const productNameMatch = question.match(/(?:add|buy|order|purchase|have|get)\s+(\d+)\s+(.*)/i);
    
    if (productNameMatch && productNameMatch[1]) {
      const quantity = parseInt(productNameMatch[1], 10);
      const productName = productNameMatch[2].trim();
      return { name: productName, quantity: quantity };
    } else {
      const productNameMatch = question.match(/(?:add|buy|order|purchase|have|get)\s+(.*)/i);
      if (productNameMatch && productNameMatch[1]) {
        const productName = productNameMatch[1].trim();
        return { name: productName, quantity: 1 };
      } else {
        return { name: question.trim(), quantity: 1 };
      }
    }
  }
  function matchProductName(extractedName) {
    const lowerCasedExtractedName = extractedName.toLowerCase();
    const matchedProduct = softMealProducts.find(product => product.name.toLowerCase().includes(lowerCasedExtractedName));
    return matchedProduct
  }
  

  /**
   * Function to Make API Call to Chat GPT 
   * @param {*} question 
   * @param {*} data 
   * @returns returns a response if the model is able to answer the question; Error otherwise. 
   */
  export async function askChatGPT(question, data) {
    const prompt = `\n${Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n')}`;
    messagesList.push(getMessageObject(ROLE_USER, `Question: ${question}`));
    messagesList.push(getMessageObject(ROLE_ASSISTANT, `${prompt}`));
  
    if (JSON.stringify(messagesList).length >= 10000 && (messagesList.length > 10)) {
      for (let message of messagesList) {
        let indexToBeRemoved = messagesList.indexOf(message);
        if (message.role == "assistant" && message.content != null && indexToBeRemoved > 5) {
          messagesList.splice(indexToBeRemoved, 1);
        }
      }
    }
  
    try {
      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0125',
        messages: messagesList,
        temperature: 0.5,
        max_tokens: 100,
      });
  
      let responseMessage = response.choices[0].message;
      messagesList.push(responseMessage);
      let answer = response.choices[0].message.content;
  
      // Analyzing intent to determine if it is an add-to-cart request
      const context = `
      User's question: "${question}"
      Response: "${answer}"
      Determine if the user's question is requesting to add an item to the cart, and if so, extract the product details and quantity.
      Respond with "add_to_cart" if the intent is to add an item to the cart, otherwise respond with "no_add_to_cart".
      `;
  
      const intentResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo-0125',
        messages: [
          { role: ROLE_USER, content: context },
        ],
        temperature: 0.5,
        max_tokens: 100,
      });
  
      const intentMessage = intentResponse.choices[0].message.content.trim();
  
      if (intentMessage === "add_to_cart") {
        const productDetails = extractProductDetails(question);
        const matchedProduct = matchProductName(productDetails.name);
        const sku = matchedProduct.sku;
        const matchedProductName = matchedProduct.name;
        console.log("Extracted Product Name:", matchedProductName);
        console.log("Extracted Quantity:", productDetails.quantity);
        console.log("SKU:",sku);
  
        // const skuResponse = await getProductResponse(matchedProductName);
  
        const cartItem = {
          sku: sku,
          qty: productDetails.quantity
        };
  
        const result = await addToCart(cartItem);
  
        answer = `Added ${productDetails.quantity} of ${matchedProductName} to the cart. SKU: ${sku}`;
      }
  
      return answer;
    } catch (error) {
      console.error('Error:', error);
      throw error;
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






  