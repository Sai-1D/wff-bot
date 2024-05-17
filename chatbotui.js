function initializechatui() {
    // Create button element for chatbot toggler
    const chatbotToggler = document.createElement("button");
    chatbotToggler.classList.add("chatbot-toggler");
  
    // Create span element for chatbot icon
    const chatbotIconSpan = document.createElement("span");
    chatbotIconSpan.classList.add("material-symbols-rounded");
    chatbotIconSpan.textContent = "mode_comment";
  
    // Create span element for close icon
    const closeIconSpan = document.createElement("span");
    closeIconSpan.classList.add("material-symbols-outlined");
    closeIconSpan.textContent = "close";
  
    // Append icons to the button
    chatbotToggler.appendChild(chatbotIconSpan);
    chatbotToggler.appendChild(closeIconSpan);
  
    // Append the button to the parent element
    document.querySelector(".chatbotnew").appendChild(chatbotToggler);
  
    const header = document.createElement("header");
  
    // Create h2 element
    const h2 = document.createElement("h2");
    h2.textContent = "Chatbot";
  
    // Create span element for close button
    const closeBtnSpan = document.createElement("span");
    closeBtnSpan.classList.add("close-btn", "material-symbols-outlined");
    closeBtnSpan.textContent = "close";
  
    // Append h2 and closeBtnSpan to header
    header.appendChild(h2);
    header.appendChild(closeBtnSpan);
  
    // Create ul element for chatbox
    const ul = document.createElement("ul");
    ul.classList.add("chatbox");
  
    // Load chat history from sessionStorage
    const savedChatHistory = sessionStorage.getItem("chatHistory");
    if (savedChatHistory) {
        ul.innerHTML = savedChatHistory;
    } else {
        // Create li element for chat message
        const li = document.createElement("li");
        li.classList.add("chat", "incoming");
  
        // Create span element for symbol
        const symbolSpan = document.createElement("span");
        symbolSpan.classList.add("material-symbols-outlined");
        symbolSpan.textContent = "smart_toy";
  
        // Create p element for message
        const p = document.createElement("p");
        p.innerHTML = "Hi there 👋<br>How can I help you today?";
  
        // Append symbolSpan and p to li
        li.appendChild(symbolSpan);
        li.appendChild(p);
  
        // Create a div to contain the buttons with a unique class name
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container"); // Unique class name
  
        // Create a container for options
        const optionContainer = document.createElement("div");
        optionContainer.classList.add("option-container"); // Unique class name
        optionContainer.style.display = "none"; // Initially hide the option container
  
        // Create button elements
        const buttonNames = [
            "Product Recommendations",
            "Order a Broucher",
            "Repeat order",
        ];
  
        // Function to show button label after button-container div
        function showButtonLabel(label) {
            const buttonLabel = document.createElement("div");
            buttonLabel.classList.add("button-clicked");
            buttonLabel.textContent = label;
            document.querySelector(".button-container").insertAdjacentElement("afterend", buttonLabel);
            saveChatHistory(); // Save chat history after adding button label
        }
  
        // Function to show option button label after option-container div
        function showOptionButtonLabel(label) {
            const buttonLabel = document.createElement("div");
            buttonLabel.classList.add("option-button-clicked");
            buttonLabel.textContent = label;
            document.querySelector(".option-container").insertAdjacentElement("afterend", buttonLabel);
            saveChatHistory(); // Save chat history after adding option button label
        }
  
        buttonNames.forEach((name) => {
            const button = document.createElement("button");
            button.textContent = name;
            if (name === "Order a Broucher" || name === "Repeat order") {
                button.disabled = true; // Disable buttons
            } else {
                button.addEventListener("click", () => {
                    // Show button label after button-container div
                    showButtonLabel(`You have selected ${name}`);
  
                    // Clear existing options
                    optionContainer.innerHTML = "";
                    // Populate optionContainer with options based on the clicked button
                    const options = getOptionsForButton(name);
                    if (options) {
                        // Check if options exist
                        options.forEach((option) => {
                            const optionButton = document.createElement("button");
                            optionButton.textContent = option;
                            // Set IDs for option buttons
                            if (option === "Soft meal") {
                                optionButton.id = "softMealOption"; // Set ID for Soft meal option button
                            } else if (option === "Gluten free") {
                                optionButton.id = "glutenFreeOption"; // Set ID for Gluten free option button
                            } else if (option === "Best sellers") {
                                optionButton.id = "bestSellersOption"; // Set ID for Best sellers option button
                            }
  
                            optionButton.addEventListener("click", () => {
                                const requestOptions = {
                                    method: 'GET',
                                    headers: {
                                        'Authorization': 'Bearer q3czixlmrvj1vcgavlt9hdhtj0fjwzdh',
                                        'Content-Type': 'application/json'
                                    }
                                };
  
                                let categoryId;
                                if (option === "Gluten free") {
                                    categoryId = 38; // Assuming 1 is the category ID for Gluten Free
                                } else if (option === "Best sellers") {
                                    categoryId = 34; // Assuming 2 is the category ID for Best Sellers
                                } else if (option === "Soft meal") {
                                    categoryId = 28; // Assuming 2 is the category ID for Best Sellers
                                }
  
                                // Update the URL with the category ID
                                const url = `http://wff.demo.botstore/rest/V1/appRanking/${categoryId}/products`;
  
                                fetch(url, requestOptions)
                                    .then(response => {
                                        if (!response.ok) {
                                            throw new Error('Network response was not ok');
                                        }
                                        return response.json();
                                    })
                                    .then(data => {
                                        // Process the response data here
                                        console.log(data); // Check the structure of the response data in the console
  
                                        if (data && data.length > 0) {
                                            const ul = document.querySelector(".chatbox");
  
                                            // Create a single <li> element for all products
                                            const productLi = document.createElement("li");
                                            productLi.classList.add("chat", "incoming");
                                            // Show option button label after option-container div
                                            showOptionButtonLabel(`You have selected ${option}`);
                                            // Iterate over the first three products or fewer if there are less than three
                                            for (let i = 0; i < Math.min(data.length, 3); i++) {
                                                const product = data[i];
  
                                                // Construct the product URL
                                                const productId = product.id;
                                                const productName = product.name;
                                                const productUrl = `http://wff.demo.botstore/catalog/product/view/id/${productId}/category/${categoryId}`;
  
                                                // Create a <a> element for each product name
                                                const productLink = document.createElement("a");
                                                productLink.textContent = productName;
                                                productLink.href = productUrl;
                                              
  
                                                // Append the <a> element to the <li> element
                                                productLi.appendChild(productLink);
                                                productLi.appendChild(document.createElement("br"));
                                            }
  
                                            // Append the single <li> element to the <ul> element
                                            ul.appendChild(productLi);
                                            saveChatHistory(); // Save chat history after adding product details
  
                                        } else {
                                            console.log("No products found");
                                        }
                                    })
                                    .catch(error => {
                                        console.error('There was a problem with your fetch operation:', error);
                                    });
  
                            });
                            optionContainer.appendChild(optionButton);
                        });
                    }
                    optionContainer.style.display = "flex"; // Show the option container
                    saveChatHistory(); // Save chat history after showing options
                });
            }
            buttonContainer.appendChild(button);
        });
  
        // Append the button container and option container to the list item
        li.appendChild(buttonContainer);
        li.appendChild(optionContainer);
  
        // Append li to ul
        ul.appendChild(li);
    }
  
    // Function to save chat history to sessionStorage
    function saveChatHistory() {
        sessionStorage.setItem("chatHistory", ul.innerHTML);
    }
  
    // Function to get options for a specific button
    function getOptionsForButton(buttonName) {
        switch (buttonName) {
            case "Product Recommendations":
                return ["Soft meal", "Gluten free", "Best sellers"];
            default:
                return null; // Return null for buttons without options
        }
    }
  
    // Create div element for chat input
    const div = document.createElement("div");
    div.classList.add("chat-input");
  
    // Create textarea element
    const textarea = document.createElement("textarea");
    textarea.setAttribute("id", "textareaInput");
    textarea.setAttribute("placeholder", "Enter a message...");
    textarea.setAttribute("spellcheck", "false");
    textarea.setAttribute("required", "");
  
    // Create span element for send button
    const sendBtnSpan = document.createElement("span");
    sendBtnSpan.setAttribute("id", "send-btnid");
    sendBtnSpan.setAttribute("id", "send-btn");
    sendBtnSpan.classList.add("material-symbols-rounded");
    sendBtnSpan.textContent = "send";
  
    // Append textarea and sendBtnSpan to div
    div.appendChild(textarea);
    div.appendChild(sendBtnSpan);
  
    // Create a container div for all the chatbot elements
    const chatbotContainer = document.createElement("div");
    chatbotContainer.classList.add("chatbot");
  
    // Append header, ul, and div to the chatbot container
    chatbotContainer.appendChild(header);
    chatbotContainer.appendChild(ul);
    chatbotContainer.appendChild(div);
  
    // Append the chatbot container to the parent div with class "chatbot"
    document.querySelector(".chatbotnew").appendChild(chatbotContainer);
  }
  
  initializechatui();
  