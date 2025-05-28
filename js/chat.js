const token = localStorage.getItem('jwtToken');
const ws = new WebSocket(`wss://localhost:7157/ws?access_token=${encodeURIComponent(token)}`);
const myMessages = new Set();

let clientId = localStorage.getItem('clientId');
if (!clientId) {
    clientId = crypto.randomUUID();
    localStorage.setItem('clientId', clientId);
}

const username = localStorage.getItem('username') || 'Anonymous';

ws.onopen = () => {
    console.log('Connected to chat server');
};

ws.onmessage = (event) => {
    const chatMessages = document.getElementById('chatMessages');
    const msg = document.createElement('div');
    let data;
    try {
        data = JSON.parse(event.data);
    } catch {
        data = { text: event.data, clientId: null };
    }
    if (data.ClientId === clientId) {
        msg.className = 'chat-message me';
    } else {
        msg.className = 'chat-message other';
    }
    msg.textContent = `${data.Name || 'Unknown'}: ${data.Text}`;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};

ws.onclose = () => {
    console.log('Disconnected from chat server');
};

document.getElementById('sendBtn').addEventListener('click', () => {
    const input = document.getElementById('chatInput');
    if (input.value.trim() !== '') {
        const message = JSON.stringify({ text: input.value, clientId, name: username });
        ws.send(message);
        input.value = '';
    }
});

document.getElementById('chatInput').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        document.getElementById('sendBtn').click();
    }
});
