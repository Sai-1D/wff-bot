import * as root from "./index.js";
import { fetchstaticwebsitedata } from './data_extraction.js';

const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; // Variable to store user's message
const API_KEY = ""; // Paste your API key here
const inputInitHeight = chatInput.scrollHeight;

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);

    if (message.includes("**")) {
        message = message.replace(/\*\*(.*?)\*\*(?=\s|$)/g, '<b>$1</b>');
        
        const productNameIndex = message.indexOf("</b>") + 4;
        const dataAfterProductName = message.substring(productNameIndex);

        const lines = dataAfterProductName.split('\n').filter(line => line.trim() !== '');
        message = message.substring(0, productNameIndex) + '<ul>';
        lines.forEach(line => {
            const colonIndex = line.indexOf(":");
            let title = line.substring(0, colonIndex).trim();
            let data = line.substring(colonIndex + 1).trim();

            if (title !== "Product") {
                title = title.replace(/[-\s]/g, '');
            }
            
            message += `<li><b>${title}</b>: ${data}</li>`;
        });
        message += '</ul>';
    }

    chatLi.innerHTML = `<span class="material-symbols-outlined">smart_toy</span><div class="chatlicont">${message}</div>`;
    return chatLi;
}

const saveChatHistory = () => {
    sessionStorage.setItem("chatHistory", chatbox.innerHTML);
}

const loadChatHistory = () => {
    const savedChatHistory = sessionStorage.getItem("chatHistory");
    if (savedChatHistory) {
        chatbox.innerHTML = savedChatHistory;
    }
}

const generateResponse = (chatElement) => {
    const API_URL = "/getResponse";
    const messageElement = chatElement.querySelector("p");

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

    fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
        console.log('userInput', data);
        messageElement.textContent = data.responseContent.trim();
        saveChatHistory();
    }).catch((err) => {
        console.log(err);
        messageElement.classList.add("error");
        messageElement.textContent = "Oops! Something went wrong. Please try again.";
        saveChatHistory();
    }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}

const handleChat = async () => {
    userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);
    saveChatHistory();

    const thinkingMessage = createChatLi("Thinking...", "incoming");
    chatbox.appendChild(thinkingMessage);
    chatbox.scrollTo(0, chatbox.scrollHeight);
    saveChatHistory();

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
            const answer = await root.askChatGPT(question, data);

            if (thinkingMessage.parentNode) {
                thinkingMessage.parentNode.removeChild(thinkingMessage);
            }

            if (!answer) {
                const noAnswerMessage = "I'm sorry, I couldn't find an answer to your question. Please ask another question.";
                chatbox.appendChild(createChatLi(noAnswerMessage, "incoming"));
                chatbox.scrollTo(0, chatbox.scrollHeight);
                saveChatHistory();
                return;
            }

            chatbox.appendChild(createChatLi(answer, "incoming"));
            chatbox.scrollTo(0, chatbox.scrollHeight);
            saveChatHistory();
        } catch (error) {
            console.error('Error:', error);
            const errorMessage = "Oops! Something went wrong. Please try again or refresh the page.";
            chatbox.appendChild(createChatLi(errorMessage, "incoming"));
            chatbox.scrollTo(0, chatbox.scrollHeight);
            saveChatHistory();
        } finally {
            if (thinkingMessage.parentNode) {
                thinkingMessage.parentNode.removeChild(thinkingMessage);
            }
        }
    }, 10);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);

// Event listener for click event on close button
closeBtn.addEventListener("click", () => {
    document.body.classList.remove("show-chatbot");
    // Store the chatbot state as closed in session storage
    sessionStorage.setItem("chatbotState", "closed");
});

// Event listener for click event on chatbot toggler button
chatbotToggler.addEventListener("click", () => {
    document.body.classList.toggle("show-chatbot");
    if (document.body.classList.contains("show-chatbot")) {
        // Store the chatbot state as open in session storage
        sessionStorage.setItem("chatbotState", "open");
    } else {
        // Store the chatbot state as closed in session storage
        sessionStorage.setItem("chatbotState", "closed");
    }
});

// Event listener for DOMContentLoaded event to load chat history
//document.addEventListener("DOMContentLoaded", () => {
$(document).ready(function () {
    loadChatHistory();
    // Restore chatbot state on page load
    const chatbotState = sessionStorage.getItem("chatbotState");
    if (chatbotState === "open") {
        document.body.classList.add("show-chatbot");
        chatbox.scrollTo(0, chatbox.scrollHeight);
    }
});


