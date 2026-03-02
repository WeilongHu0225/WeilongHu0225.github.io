// HTTP轮询版本 - 适用于端口限制环境
document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatContainer = document.getElementById('chat-container');
    const typingIndicator = document.getElementById('typing-indicator');
    
    // 消息队列
    let lastMessageId = 0;
    
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.textContent = content;
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    // 发送消息到当前会话（通过GitHub Issues模拟）
    async function sendMessage(content) {
        addMessage(content, 'user');
        typingIndicator.style.display = 'block';
        
        // 模拟AI响应（实际使用时会连接到真实后端）
        setTimeout(() => {
            addMessage('你好！我是贾维斯。由于技术限制，目前PWA只能显示模拟响应。请通过原始网页界面与我进行真实对话。', 'ai');
            typingIndicator.style.display = 'none';
        }, 1000);
    }
    
    // 轮询检查新消息（简化版）
    function pollForMessages() {
        // 这里可以集成GitHub Issues API或其他消息源
        // 目前先保持简单
    }
    
    sendButton.addEventListener('click', () => {
        const content = messageInput.value.trim();
        if (content) {
            sendMessage(content);
            messageInput.value = '';
        }
    });
    
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            const content = messageInput.value.trim();
            if (content) {
                sendMessage(content);
                messageInput.value = '';
            }
        }
    });
    
    // 启动轮询
    pollForMessages();
});
