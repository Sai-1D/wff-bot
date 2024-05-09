import * as dotenv from "dotenv";
import promptSync from 'prompt-sync';
import { fetchWebsiteData } from './data_extraction.js';
import {getMessageObject, ROLE_ASSISTANT,ROLE_USER,ROLE_SYSTEM} from './prompt_builder.js';
import OpenAIAPI from 'openai';
import * as fun from "./export_functions.js";

//makes environment variables available for our application
dotenv.config(); 

const ignoreParagraphs =["cookie", "ourData", "Policy","Added to your basket"]
const prompt = promptSync();
const openai = new OpenAIAPI({
    apiKey: process.env.OPENAI_API_KEY,
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
                "description": "the meal categories. e.g. Best Sellers, Desserts, Beef, Gulten Free",
                "items": {
                  "type": "string",
              }
            },
            "price": {
                "type": "integer",
                "description": "the meal price",
            },
          }
        }
      }
    }
  ];
  const softMealProducts=[{"name": "Fillet of Trout in Lemon Sauce"},
                        {"name": "Steak & Mushroom Casserole"},
                        {"name": "Hearty Cottage Pie"}
  ];
  const buttonData=[
    { "user": "can you give some product recommendations"},
    { "bot": "What are you interested in 1. soft meal, 2.gluten free, 3.best sellers"},
    { "user": "soft meal"},
    { "bot": "we have the following gluten free products",
    "Products":JSON.stringify(softMealProducts)},
    
  ];

  // Define initial message for ChatGPT
  const messagesList =  [
    {"role": "system", "content": "You are a virtual agent of Wiltshire Farm Foods which is a leading meal provider in UK. You are expected to answer questions about Wiltshire Farm Food' meal options and their delivery"},
    {"role": "system", "content": "you give very short answers"},
    {"role": "user",   "content":  JSON.stringify(buttonData)}
    ]

  /**
   * Function to Make API Call to Chat GPT 
   * @param {*} question 
   * @param {*} data 
   * @returns returns a response if the model is able to answer the question; Error otherwise. 
   */
  async function askChatGPT(question, data) {
    //construct prompt based on user's input and website data
    const prompt = `\n${Object.entries(data).map(([key, value]) => `${key}: ${value}`).join('\n')}`;
    //create messages list
    messagesList.push(getMessageObject(ROLE_USER,`Question: ${question}`))
    messagesList.push(getMessageObject(ROLE_ASSISTANT,`${prompt}`))
   
    // remove the chats containing website data except the initial chat
    if(JSON.stringify(messagesList).length>=10000 && (messagesList.length>10)){
        for(let message of messagesList){
          let indexToBeRemoved=messagesList.indexOf(message);
          if(message.role=="assistant" && message.content!=null && indexToBeRemoved>5){
              messagesList.splice(indexToBeRemoved,1);
          }
        }            
    }

    //invoke Chat GPT completions API
    try {
          const response = await openai.chat.completions.create({
            model:'gpt-3.5-turbo-0125',
            messages:messagesList,
            tools: tools,
          });
        let responseMessage=response.choices[0].message;

        // Push a new message to the messagesList array with response from chatgpt 
        messagesList.push(responseMessage);
        let answer =null;

        if(response.choices[0].message.content==null){

          let toolCalls=response.choices[0].message.tool_calls.length;
            if(response.choices[0].message.tool_calls[0].function.name=="meal_properties"){
              for(let i=0;i<=toolCalls-1;i++){
                const function_argument = JSON.parse(response.choices[0].message.tool_calls[i].function.arguments);
                // Extract meal_name, meal_category, and price from the function arguments
                const productName = function_argument.name;
                const productCategory=function_argument.categories;
                const productPrice=function_argument.price;

                // Get the required product response based on category and price
                const required_product= fun.getProductResponse(productName,productCategory,productPrice);

                if(required_product.length===0){
                  // Push a custom message to the messagesList array with tool information and product details for each tool call
                  messagesList.push({"role":"tool","tool_call_id":response.choices[0].message.tool_calls[i].id,"name": response.choices[0].message.tool_calls[i].function.name,"content": "Sorry no item available"});
                }else{
                  // Push a new message to the messagesList array with tool information and product details
                  messagesList.push({"role":"tool","tool_call_id":response.choices[0].message.tool_calls[i].id,"name": response.choices[0].message.tool_calls[i].function.name,"content": JSON.stringify(required_product)});
                } 
              }
                // Call OpenAI API to get the completion with updated messages list
                let second_completion = await openai.chat.completions.create({
                    model: "gpt-3.5-turbo-0125",
                    messages: messagesList,
                    tools: tools,
                    tool_choice: "auto",

                });
              answer=second_completion.choices[0].message.content;
            }           
        }else{            
          answer=response.choices[0].message.content;         
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
 async function main(){
  try{
  
   let data = await fetchWebsiteData(websiteUrl);
   if(data!=null){
    if(data.paragraphs){
      //filter uncessary paragraphs
      data = data.paragraphs.filter(
        paragraph => ignoreParagraphs
        .findIndex(ignoreParagraph=>paragraph.includes(ignoreParagraph))==-1
      )
      let userInput = -1;
      while(true){
        userInput = prompt("Enter Your question or 0 to exit ");
        if(userInput==0){
          break;
        }   
      //query ChatGPT
     let answer= await askChatGPT(userInput, data)
     console.log("Answer: ", answer)     
    }

    }
  }
} catch (error){
  console.error("Error ", error)
}

 } 

main();


  
