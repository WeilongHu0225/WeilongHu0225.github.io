// 简单的客户端逻辑（实际会连接到OpenClaw）
document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatContainer = document.getElementById('chat-container');
    const typingIndicator = document.getElementById('typing-indicator');
    
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = content;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    function sendMessage() {
        const content = messageInput.value.trim();
        if (content) {
            addMessage(content, 'user');
            messageInput.value = '';
            typingIndicator.style.display = 'block';
            
            // 模拟AI响应（实际会连接到后端）
            setTimeout(() => {
                addMessage('你好！我是贾维斯，你的AI工作管家。请通过GitHub Issues或直接联系我来发送实际消息。', 'ai');
                typingIndicator.style.display = 'none';
            }, 1000);
        }
    }
    
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});
