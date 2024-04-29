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

      // Append li to ul
      ul.appendChild(li);

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