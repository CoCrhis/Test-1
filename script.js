async function sendMessage() {
    console.log('sendMessage called');

    const userInput = document.getElementById('userInput').value;

    if (userInput.trim() === '') {
        return; // Don't send empty messages
    }

    appendMessage('User', userInput);

    const response = await getChatGPTResponse(userInput);

    appendMessage('ChatGPT', response);

    // Clear the input field
    document.getElementById('userInput').value = '';
}

async function getChatGPTResponse(userInput) {
    console.log('getChatGPTResponse called');

    const apiKey = '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';
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                model: 'gpt-3.5-turbo',
                messages: [
                    { role: 'system', content: 'You are a helpful assistant.' },
                    { role: 'user', content: userInput }
                ]
            })
        });

        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        console.error('Error fetching response:', error);
        return 'Error fetching response';
    }
}

function appendMessage(role, content) {
    const chatDiv = document.getElementById('chat');
    const messageP = document.createElement('p');
    messageP.textContent = `${role}: ${content}`;
    chatDiv.appendChild(messageP);

    // Scroll to the bottom of the chat box
    chatDiv.scrollTop = chatDiv.scrollHeight;
}
