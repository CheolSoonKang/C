const btn = document.getElementById('button');
const sock = document.getElementById('sock');
const socket = io();
btn.addEventListener('click', () => {
    fetch('/resetSeat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            value: 'reset',
        }),
    });
});

sock.addEventListener('click', () => {
    socket.emit('reqSessionCheck', {
        data: '1',
    });
});
