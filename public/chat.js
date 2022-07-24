const outMessages = document.getElementById('outMessages');
const chatBottom = document.getElementById('chatBottom');
const inMessage = document.getElementById('inMessage');
const btSend = document.getElementById('btSend');

let user = false;

do {

    user = prompt('Digite seu nome de usuário:');

} while (!user);

const token = Math.ceil(Math.random() * 1000000);

const socket = io('http://localhost:3000');

socket.on('update_msgs', (messages) => {

    renderMessages(messages);

});

function renderMessages(messages) {

    outMessages.innerHTML = '';

    messages.forEach(message => {
        const className = message.token == token ? 'myMessage' : 'message';

        outMessages.innerHTML +=
            `<div class="${className}">
                <h3>${message.user}</h3>
                <span>${message.msg}</span>
            </div>`;
    });

    chatBottom.scrollIntoView();
}

function sendMessage() {

    const message = inMessage.value;

    if(message == ''){
        return;
    }

    socket.emit('new_msg', { msg: message, user, token });

    inMessage.value = '';
    inMessage.focus();

}

inMessage.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
        return false;
    }
});

btSend.addEventListener('click', (e) => {
    e.preventDefault();
    sendMessage();
});