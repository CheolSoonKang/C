const id = document.getElementById('id');
const password = document.getElementById('password');
const submitBtn = document.getElementById('submitBtn');

submitBtn.addEventListener('click', () => {
    if (id.value == '' || password.value == '') {
        alert('아이디 혹은 비밀번호를 입력해주세요');
    } else {
        fetch('/loginCheck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id: id.value,
                password: password.value,
            }),
        })
            .then((result) => {
                return result.json();
            })
            .then(({ loginResult }) => {
                if (loginResult == '1') {
                    window.location = '/moviereservation';
                } else {
                    password.value = '';
                    alert('아이디 혹은 비밀번호를 확인해주세요.');
                }
            });
    }
});
