// Core HTML generator logic

export const generateHTML = (config) => {
  const {
    siteTitle,
    productDescription,
    buttonText,
    primaryColor,
    stripeLink,
    enableTelegram,
    telegramBotToken,
    telegramChatId,
    workerApiEndpoint
  } = config;

  // Base HTML structure
  let html = '';
  html += '<!DOCTYPE html>';
  html += '<html lang="en">';
  html += '<head>';
  html += '<meta charset="UTF-8">';
  html += '<meta name="viewport" content="width=device-width, initial-scale=1.0">';
  html += '<title>' + siteTitle + '</title>';
  html += '<style>';
  html += ':root {';
  html += '--primary-color: ' + primaryColor + ';';
  html += '--text-color: #1f2937;';
  html += '--text-light: #6b7280;';
  html += '--bg-color: #ffffff;';
  html += '--border-color: #e5e7eb;';
  html += '}';
  html += '* {';
  html += 'margin: 0;';
  html += 'padding: 0;';
  html += 'box-sizing: border-box;';
  html += '}';
  html += 'body {';
  html += 'font-family: Inter, system-ui, sans-serif;';
  html += 'line-height: 1.6;';
  html += 'color: var(--text-color);';
  html += 'background-color: var(--bg-color);';
  html += '}';
  html += '.container {';
  html += 'max-width: 800px;';
  html += 'margin: 0 auto;';
  html += 'padding: 4rem 2rem;';
  html += 'text-align: center;';
  html += '}';
  html += 'h1 {';
  html += 'font-size: 2.5rem;';
  html += 'font-weight: 700;';
  html += 'margin-bottom: 1rem;';
  html += 'color: var(--primary-color);';
  html += '}';
  html += 'p {';
  html += 'font-size: 1.125rem;';
  html += 'color: var(--text-light);';
  html += 'margin-bottom: 2rem;';
  html += 'max-width: 600px;';
  html += 'margin-left: auto;';
  html += 'margin-right: auto;';
  html += '}';
  html += '.button {';
  html += 'display: inline-block;';
  html += 'padding: 0.75rem 1.5rem;';
  html += 'background-color: var(--primary-color);';
  html += 'color: white;';
  html += 'border: none;';
  html += 'border-radius: 0.5rem;';
  html += 'font-size: 1rem;';
  html += 'font-weight: 500;';
  html += 'text-decoration: none;';
  html += 'transition: opacity 0.2s ease;';
  html += 'cursor: pointer;';
  html += '}';
  html += '.button:hover {';
  html += 'opacity: 0.9;';
  html += '}';
  html += '.form {';
  html += 'margin-top: 2rem;';
  html += 'max-width: 400px;';
  html += 'margin-left: auto;';
  html += 'margin-right: auto;';
  html += 'text-align: left;';
  html += '}';
  html += '.form-group {';
  html += 'margin-bottom: 1rem;';
  html += '}';
  html += 'label {';
  html += 'display: block;';
  html += 'margin-bottom: 0.5rem;';
  html += 'font-weight: 500;';
  html += '}';
  html += 'input,'; 
  html += 'textarea {';
  html += 'width: 100%;';
  html += 'padding: 0.5rem;';
  html += 'border: 1px solid var(--border-color);';
  html += 'border-radius: 0.25rem;';
  html += 'font-size: 1rem;';
  html += '}';
  html += 'input:focus,';
  html += 'textarea:focus {';
  html += 'outline: none;';
  html += 'ring: 2px solid var(--primary-color);';
  html += '}';
  html += '</style>';
  html += '</head>';
  html += '<body>';
  html += '<div class="container">';
  html += '<h1>' + siteTitle + '</h1>';
  html += '<p>' + productDescription + '</p>';

  // Add Stripe payment button if link is provided
  if (stripeLink) {
    html += '<a href="' + stripeLink + '" class="button" target="_blank">' + buttonText + '</a>';
  } else {
    html += '<button class="button">' + buttonText + '</button>';
  }

  // Add data collection form if Telegram is enabled or Worker endpoint is provided
  if (enableTelegram && telegramBotToken && telegramChatId) {
    html += '<form class="form" onsubmit="handleSubmit(event)">';
    html += '<h2>Contact Form</h2>';
    html += '<div class="form-group">';
    html += '<label for="name">Name</label>';
    html += '<input type="text" id="name" name="name" required>';
    html += '</div>';
    html += '<div class="form-group">';
    html += '<label for="email">Email</label>';
    html += '<input type="email" id="email" name="email" required>';
    html += '</div>';
    html += '<div class="form-group">';
    html += '<label for="message">Message</label>';
    html += '<textarea id="message" name="message" rows="4" required></textarea>';
    html += '</div>';
    html += '<button type="submit" class="button">Send</button>';
    html += '</form>';
  } else if (workerApiEndpoint) {
    html += '<form class="form" onsubmit="handleWorkerSubmit(event)">';
    html += '<h2>Contact Form</h2>';
    html += '<div class="form-group">';
    html += '<label for="name">Name</label>';
    html += '<input type="text" id="name" name="name" required>';
    html += '</div>';
    html += '<div class="form-group">';
    html += '<label for="email">Email</label>';
    html += '<input type="email" id="email" name="email" required>';
    html += '</div>';
    html += '<div class="form-group">';
    html += '<label for="message">Message</label>';
    html += '<textarea id="message" name="message" rows="4" required></textarea>';
    html += '</div>';
    html += '<button type="submit" class="button">Send</button>';
    html += '</form>';
  }

  // Close container and body
  html += '</div>';

  // Add JavaScript for Telegram integration if enabled
  if (enableTelegram && telegramBotToken && telegramChatId) {
    html += '<script>';
    html += 'function handleSubmit(event) {';
    html += 'event.preventDefault();';
    html += 'const formData = new FormData(event.target);';
    html += 'const name = formData.get("name");';
    html += 'const email = formData.get("email");';
    html += 'const message = formData.get("message");';
    html += 'const text = "New message from " + name + "\nEmail: " + email + "\nMessage: " + message;';
    html += 'const encodedText = encodeURIComponent(text);';
    html += 'const url = "https://api.telegram.org/bot" + telegramBotToken + "/sendMessage?chat_id=" + telegramChatId + "&text=" + encodedText;';
    html += 'fetch(url)';
    html += '.then(response => response.json())';
    html += '.then(data => {';
    html += 'if (data.ok) {';
    html += 'alert("Message sent successfully!");';
    html += 'event.target.reset();';
    html += '} else {';
    html += 'alert("Failed to send message. Please try again.");';
    html += '}';
    html += '})';
    html += '.catch(error => {';
    html += 'console.error("Error:", error);';
    html += 'alert("Failed to send message. Please try again.");';
    html += '});';
    html += '}';
    html += '</script>';
  }

  // Add JavaScript for Worker integration if endpoint is provided
  if (workerApiEndpoint && !enableTelegram) {
    html += '<script>';
    html += 'function handleWorkerSubmit(event) {';
    html += 'event.preventDefault();';
    html += 'const formData = new FormData(event.target);';
    html += 'const data = {';
    html += 'name: formData.get("name"),';
    html += 'email: formData.get("email"),';
    html += 'message: formData.get("message")';
    html += '};';
    html += 'fetch("' + workerApiEndpoint + '", {';
    html += 'method: "POST",';
    html += 'headers: {';
    html += '"Content-Type": "application/json"';
    html += '},';
    html += 'body: JSON.stringify(data)';
    html += '})';
    html += '.then(response => response.json())';
    html += '.then(data => {';
    html += 'if (data.success) {';
    html += 'alert("Message sent successfully!");';
    html += 'event.target.reset();';
    html += '} else {';
    html += 'alert("Failed to send message. Please try again.");';
    html += '}';
    html += '})';
    html += '.catch(error => {';
    html += 'console.error("Error:", error);';
    html += 'alert("Failed to send message. Please try again.");';
    html += '});';
    html += '}';
    html += '</script>';
  }

  // Close HTML
  html += '</body>';
  html += '</html>';

  return html;
};
