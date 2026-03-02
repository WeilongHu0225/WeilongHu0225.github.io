// 优化版交互逻辑
document.addEventListener('DOMContentLoaded', () => {
    const messageInput = document.getElementById('message-input');
    const sendButton = document.getElementById('send-button');
    const chatContainer = document.getElementById('chat-container');
    const typingIndicator = document.getElementById('typing-indicator');
    const connectionStatus = document.getElementById('connection-status');
    
    // 添加时间戳函数
    function getCurrentTime() {
        return new Date().toLocaleTimeString('zh-CN', { 
            hour: '2-digit', 
            minute: '2-digit' 
        });
    }
    
    function addMessage(content, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = content.replace(/\n/g, '<br>');
        
        // 添加时间戳
        const timeDiv = document.createElement('div');
        timeDiv.className = 'message-time';
        timeDiv.textContent = getCurrentTime();
        messageDiv.appendChild(timeDiv);
        
        chatContainer.appendChild(messageDiv);
        chatContainer.scrollTop = chatContainer.scrollHeight;
    }
    
    function sendMessage() {
        const content = messageInput.value.trim();
        if (content) {
            addMessage(content, 'user');
            messageInput.value = '';
            typingIndicator.style.display = 'block';
            
            // 智能响应（基于用户消息内容）
            setTimeout(() => {
                let response = '';
                const lowerContent = content.toLowerCase();
                
                if (lowerContent.includes('你好') || lowerContent.includes('hello')) {
                    response = '你好龙哥！很高兴见到你。有什么工作需要我帮忙处理吗？';
                } else if (lowerContent.includes('任务') || lowerContent.includes('task')) {
                    response = '我可以帮你管理飞书任务。请告诉我具体的任务内容、截止日期和优先级。';
                } else if (lowerContent.includes('采购') || lowerContent.includes('purchase')) {
                    response = '采购工作方面，我可以帮你管理供应商信息、跟踪合同和监控付款状态。';
                } else if (lowerContent.includes('项目') || lowerContent.includes('project')) {
                    response = '项目管理功能包括进度跟踪、风险识别、资源分配和里程碑监控。';
                } else if (lowerContent.includes('数据') || lowerContent.includes('data')) {
                    response = '数据台账管理支持数据资产登记、质量监控、血缘追踪和合规性检查。';
                } else if (lowerContent.includes('软件') || lowerContent.includes('software')) {
                    response = '离线软件开发技能可以帮助你打包跨平台应用，管理依赖并创建安装程序。';
                } else {
                    response = '📱 贾维斯提醒：\n\n为了获得最佳体验和完整功能，请通过原始网页界面与我进行真实对话！\n\nPWA目前作为备用访问方式，所有高级功能在原始界面中完整可用。';
                }
                
                addMessage(response, 'ai');
                typingIndicator.style.display = 'none';
            }, 1500);
        }
    }
    
    sendButton.addEventListener('click', sendMessage);
    messageInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // 页面加载完成提示
    setTimeout(() => {
        addMessage('✅ PWA已成功加载！\n\n💡 小贴士：长按消息可以复制内容，点击输入框可以直接开始输入。', 'ai');
    }, 1000);
});
