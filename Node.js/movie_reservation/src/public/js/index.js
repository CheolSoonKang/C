//서버에서 JSON.stringify 하여ejs에서 받은 데이터는 string타입이며,
//특수문자가 HTMLCode로 바뀌어있다. 이를 다시 Object로 변환하기 위한 전처리 함수이다.
function removeSpecialCharacters(strings) {
    return JSON.parse(strings.replace(/[&#]+34+;/g, '"'));
}

let parsedMoviePosterUrl = removeSpecialCharacters(moviePosterUrl);

let parsedReceivedDailyBoxOfficeList = removeSpecialCharacters(
    receivedDailyBoxOfficeList
);

let parsedMovieUrls = removeSpecialCharacters(movieUrls);

console.log(parsedMovieUrls);
const content = document.getElementById('contents');

parsedReceivedDailyBoxOfficeList.forEach((item) => {
    const divcol = document.createElement('div');
    const card = document.createElement('div');
    const poster = document.createElement('img');
    const cardBody = document.createElement('div');
    const h5 = document.createElement('h5');
    const movieName = item.movieNm;
    const cardtext = document.createElement('p');

    cardBody.classList.add('card-body');
    divcol.classList.add('col');

    card.classList.add('card');
    card.classList.add('h-50');
    card.style.width = '13rem';

    poster.src = parsedMoviePosterUrl[item.movieNm];
    poster.style.cursor = 'pointer';
    poster.addEventListener('click', () => {
        window.location = parsedMovieUrls[item.movieNm];
    });
    poster.alt = movieName;
    poster.classList.add('card-img-top');

    card.append(poster);

    h5.innerHTML = movieName;
    h5.classList.add('card-title');
    cardBody.append(h5);

    const p = Math.floor(item.audiAcc / 10000)
        ? `누적 ${Math.floor(item.audiAcc / 10000)}만 ${item.audiAcc % 10000}명`
        : `누적 ${item.audiAcc % 10000}명`;
    cardtext.innerText = p;
    cardBody.append(cardtext);
    card.append(cardBody);

    divcol.append(card);

    content.append(divcol);
});
