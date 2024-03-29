const btn = document.getElementById('button');

btn.addEventListener('click', () => {
    fetch('/moviereservation/resetSeat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            value: 'reset',
        }),
    });
});
