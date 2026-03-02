// 最简化的PWA交互逻辑 - 清除所有旧代码
document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatContainer = document.getElementById('chat-container');
    const typingIndicator = document.getElementById('typing-indicator');
    
    // 清空聊天容器
    chatContainer.innerHTML = '';
    
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
            
            // 立即显示确认消息（不再有延迟）
            addMessage('✅ 消息已发送！\n\n💡 注意：PWA目前作为备用界面。请通过原始网页界面进行真实对话以获得完整功能。', 'ai');
        }
    }
    
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // 页面加载时的欢迎消息
    addMessage('📱 贾维斯PWA已就绪！\n\n这是你的备用访问界面。所有真实功能请通过原始网页界面使用。', 'ai');
});
