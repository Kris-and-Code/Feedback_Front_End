document.addEventListener('DOMContentLoaded', () => {
    const chatForm = document.getElementById('chatForm');
    const chatMessages = document.getElementById('chatMessages');
    const userInput = document.getElementById('userInput');
    const newChatButton = document.querySelector('.new-chat');

    let conversationHistory = [];

    // Auto-resize textarea
    function autoResizeTextarea() {
        userInput.style.height = 'auto';
        userInput.style.height = Math.min(userInput.scrollHeight, 200) + 'px';
    }

    userInput.addEventListener('input', autoResizeTextarea);

    // Handle form submission
    chatForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const message = userInput.value.trim();
        if (!message) return;

        // Add user message
        addMessage(message, 'user');
        conversationHistory.push({ role: 'user', content: message });

        // Clear and reset input
        userInput.value = '';
        userInput.style.height = 'auto';

        // Simulate AI response (replace with actual API call)
        const loadingMessage = addLoadingMessage();
        
        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            const response = "This is a simulated AI response. Replace this with your actual API integration.";
            
            // Remove loading message and add AI response
            loadingMessage.remove();
            addMessage(response, 'bot');
            conversationHistory.push({ role: 'assistant', content: response });
        } catch (error) {
            loadingMessage.remove();
            addMessage('Sorry, there was an error processing your request.', 'error');
        }
    });

    // Handle special key combinations
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            chatForm.dispatchEvent(new Event('submit'));
        }
    });

    // New chat button
    newChatButton.addEventListener('click', () => {
        conversationHistory = [];
        chatMessages.innerHTML = `
            <div class="welcome-message">
                <h1>AI Chat Assistant</h1>
                <p>How can I help you today?</p>
            </div>
        `;
    });

    function addMessage(text, type) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', `${type}-message`);
        messageDiv.textContent = text;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return messageDiv;
    }

    function addLoadingMessage() {
        const loadingDiv = document.createElement('div');
        loadingDiv.classList.add('message', 'bot-message');
        loadingDiv.textContent = 'Thinking...';
        chatMessages.appendChild(loadingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        return loadingDiv;
    }
}); 