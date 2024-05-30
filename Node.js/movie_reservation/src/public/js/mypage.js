console.log(islogged);

if (!JSON.parse(islogged)) {
    alert('로그인 먼저 해주세요');
    window.location = '/login';
}
