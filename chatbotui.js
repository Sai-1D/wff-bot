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
        const optionContainer = document.createElement("p");
        optionContainer.classList.add("option-container"); // Unique class name
        optionContainer.style.display = "none"; // Initially hide the option container

        // Create button elements
        const buttonNames = [
            "Product Recommendations",
            "Order a Broucher",
            "Repeat order",
        ];

        // Function to disable all buttons in the option container
        function disableAllOptionButtons() {
            const buttons = optionContainer.querySelectorAll("button");
            buttons.forEach(button => button.disabled = true);
        }

        // Function to disable all buttons in the button container
        function disableAllButtons() {
            const buttons = buttonContainer.querySelectorAll("button");
            buttons.forEach(button => button.disabled = true);
        }

        // Function to show button label and option container as incoming chat
        function showButtonLabel(label) {
            const buttonLabel = document.createElement("li");
            buttonLabel.classList.add("chat", "outgoing");
            buttonLabel.innerHTML = `<p>${label}</p>`;
            ul.appendChild(buttonLabel);

            // Create a new incoming message to contain the option container
            const optionMessage = document.createElement("li");
            optionMessage.classList.add("chat", "incoming");

            const optionSymbolSpan = document.createElement("span");
            optionSymbolSpan.classList.add("material-symbols-outlined");
            optionSymbolSpan.textContent = "smart_toy";

            const optionMessageContent = document.createElement("div");
            optionMessageContent.appendChild(optionSymbolSpan);
            optionMessageContent.appendChild(optionContainer);

            optionMessage.appendChild(optionMessageContent);
            ul.appendChild(optionMessage);

            optionContainer.style.display = "inline-flex"; // Show the option container
            saveChatHistory(); // Save chat history after adding button label
        }

        // Function to show option button label as outgoing chat
        function showOptionButtonLabel(label) {
            const buttonLabel = document.createElement("li");
            buttonLabel.classList.add("chat", "outgoing");
            buttonLabel.innerHTML = `<p>${label}</p>`;
            ul.appendChild(buttonLabel);
            saveChatHistory(); // Save chat history after adding option button label
        }

        // Function to add thinking dots
        function addThinkingDots() {
            const thinkingDotsLi = document.createElement("li");
            thinkingDotsLi.classList.add("chat", "incoming");

            const thinkingDots = document.createElement("div");
            thinkingDots.classList.add("thinking-dots");
            thinkingDots.innerHTML = '<span></span><span></span><span></span>';

            const thinkingSymbolSpan = document.createElement("span");
            thinkingSymbolSpan.classList.add("material-symbols-outlined");
            thinkingSymbolSpan.textContent = "smart_toy";

            thinkingDotsLi.appendChild(thinkingSymbolSpan);
            thinkingDotsLi.appendChild(thinkingDots);
            ul.appendChild(thinkingDotsLi);

            // Save chat history
            saveChatHistory();

            return thinkingDotsLi;
        }

        buttonNames.forEach((name) => {
            const button = document.createElement("button");
            button.textContent = name;
            if (name === "Order a Broucher" || name === "Repeat order") {
                button.disabled = true; // Disable buttons
            } else {
                button.addEventListener("click", async () => {
                    // Disable all buttons in the button container
                    disableAllButtons();

                    // Show button label and option container as incoming chat
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

                            optionButton.addEventListener("click", async () => {
                                disableAllOptionButtons();
                                const thinkingDotsLi = addThinkingDots(); // Add thinking dots

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

                                try {
                                    const response = await fetch(url, requestOptions);
                                    if (!response.ok) {
                                        throw new Error('Network response was not ok');
                                    }
                                    const data = await response.json();
                                    // Process the response data here
                                    console.log(data); // Check the structure of the response data in the console

                                    if (data && data.length > 0) {
                                        const ul = document.querySelector(".chatbox");

                                        // Create a single <li> element for all products
                                        const productLi = document.createElement("li");
                                        productLi.classList.add("chat", "incoming");

                                        const optionSymbolSpan = document.createElement("span");
                                        optionSymbolSpan.classList.add("material-symbols-outlined");
                                        optionSymbolSpan.textContent = "smart_toy";

                                        // Create a <div> element as a wrapper
                                        const productWrapper = document.createElement("div");
                                        productWrapper.classList.add("product-wrapper");

                                        // Show option button label as outgoing chat
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
                                            productLink.target = "_blank";

                                            // Add click event listener to product link
                                            productLink.addEventListener("click", () => {
                                                // Disable all other product links
                                                const productLinks = document.querySelectorAll(".chatbox .chat.incoming a");
                                                productLinks.forEach(link => {
                                                    link.classList.add("disabled");
                                                });
                                                const redirectMessage = `You have selected ${productName} and we are redirecting to Product detail`;
                                                showOptionButtonLabel(redirectMessage);
                                            });

                                            // Append the <a> element to the wrapper
                                            productWrapper.appendChild(productLink);
                                        }

                                        // Append the single <li> element to the <ul> element
                                        productLi.appendChild(optionSymbolSpan);
                                        productLi.appendChild(productWrapper);

                                        ul.appendChild(productLi);
                                        saveChatHistory(); // Save chat history after adding product details
                                    } else {
                                        console.log("No products found");
                                    }
                                } catch (error) {
                                    console.error('There was a problem with your fetch operation:', error);
                                } finally {
                                    // Remove thinking dots
                                    ul.removeChild(thinkingDotsLi);
                                    saveChatHistory(); // Save chat history after removing thinking dots
                                }
                            });
                            optionContainer.appendChild(optionButton);
                        });
                    }
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

    // Check if the 'zipcode_availability' cookie is set
    const allCookies = document.cookie;
    console.log('All Cookies:', allCookies);

    chatbotToggler.addEventListener('click', () => {
        const zipcode = getCookie('zipcode_availability');
        if (!zipcode) {
            console.log('Zipcode Availability cookie not found.');
            // Show the zipcode form and overlay
            document.querySelector('.zipcode-form').style.display = 'block';
            document.querySelector('.overlay').style.display = 'block';
            document.querySelector('.zipcode-header').classList.add('chatbotzipcodemain');
            document.body.classList.add('disabled'); // Disable the rest of the screen
        } else {
            console.log('Zipcode Availability:', zipcode);
            // Proceed with opening the chatbot normally
            document.querySelector('.chatbot').classList.toggle('active');
            document.querySelector('.zipcode-header').classList.remove('chatbotzipcodemain');
            document.querySelector('.overlay').style.display = 'none';
            document.querySelector('.zipcode-form').style.display = 'none';
        }
    });
    
}

// Function to read a cookie by name
function getCookie(name) {
    function escape(s) { return s.replace(/([.*+?\^$(){}|\[\]\/\\])/g, '\\$1'); }
    var match = document.cookie.match(RegExp('(?:^|;\\s*)' + escape(name) + '=([^;]*)'));
    return match ? match[1] : null;
}

initializechatui();
