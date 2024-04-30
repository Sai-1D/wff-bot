import * as root from "./index.js";
import { fetchstaticwebsitedata } from './data_extraction.js';

//const root = require ("./index.js");
const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const API_KEY = ""; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    // Create a chat <li> element with passed message and className
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi; // return chat <li> element
}

const generateResponse = (chatElement) => {
    const API_URL = "/getResponse";
    const messageElement = chatElement.querySelector("p");

    // Define the properties and message for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            userInput: userMessage,
        })
    }

    // Send POST request to API, get response and set the reponse as paragraph text
    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        console.log('userInput',data);
         messageElement.textContent = data.responseContent.trim();
    }).catch((err) => {
        console.log(err);
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = async () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Append the user's message to the chatbox
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    // Create a reference to the "Thinking..." message element
    const thinkingMessage = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(thinkingMessage);
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(async () => {
        const question = userMessage;
        let data = fetchstaticwebsitedata();
        const ignoreParagraphs = ["cookie", "ourData", "Policy", "Added to your basket"]

        if (data != null) {
            if (data.paragraphs) {
                data = data.paragraphs.filter(
                    paragraph => ignoreParagraphs.findIndex(ignoreParagraph => paragraph.includes(ignoreParagraph)) == -1
                );
            }
        }

        try {
            // Call askChatGPT function to get the response
            const answer = await root.askChatGPT(question, data);

            // Remove the "Thinking..." message element from the DOM
            if (thinkingMessage.parentNode) {
                thinkingMessage.parentNode.removeChild(thinkingMessage);
            }

            if (!answer) {
                // If there's no answer, prompt the user to ask the next question
                const noAnswerMessage = "I'm sorry, I couldn't find an answer to your question. Please ask another question.";
                chatbox.appendChild(createChatLi(noAnswerMessage, "incoming"));
                chatbox.scrollTo(0, chatbox.scrollHeight);
                return;
            }

            // Append the answer to the chatbox
            chatbox.appendChild(createChatLi(answer, "incoming"));
            chatbox.scrollTo(0, chatbox.scrollHeight);
        } catch (error) {
            console.error('Error:', error);
        }
    }, 10);
}


chatInput.addEventListener("input", () => {
    // Adjust the height of the input textarea based on its content
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    // If Enter key is pressed without Shift key and the window 
    // width is greater than 800px, handle the chat
    if(e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
       handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));