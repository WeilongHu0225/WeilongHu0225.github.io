// 实时同步聊天应用 - 连接到消息中继服务器
document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatContainer = document.getElementById('chat-container');
    const typingIndicator = document.getElementById('typing-indicator');
    
    // 连接到消息中继服务器
    const ws = new WebSocket('ws://47.109.60.180:8080');
    
    ws.onopen = () => {
        console.log('Connected to Jarvis message relay');
        addMessage('✅ 已连接到贾维斯服务器，可以开始聊天了！', 'ai');
    };
    
    ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.type === 'message') {
            addMessage(data.content, data.sender === 'user' ? 'user' : 'ai');
            typingIndicator.style.display = 'none';
        }
    };
    
    ws.onclose = () => {
        console.log('Disconnected from server');
        addMessage('❌ 与服务器连接断开，请刷新页面重试。', 'ai');
    };
    
    ws.onerror = (error) => {
        console.error('WebSocket error:', error);
        addMessage('⚠️ 连接服务器时出现错误。', 'ai');
    };
    
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
            // 发送消息到服务器
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ 
                    type: 'message', 
                    content: content,
                    sender: 'user'
                }));
                messageInput.value = '';
            } else {
                addMessage('无法连接到服务器，请检查网络。', 'ai');
            }
        }
    }
    
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // 页面可见性优化
    document.addEventListener('visibilitychange', () => {
        if (!document.hidden && ws.readyState === WebSocket.OPEN) {
            // 页面重新激活时可以发送心跳
        }
    });
});
