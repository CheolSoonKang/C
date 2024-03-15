class movieCard {
    constructor(name, openDt, cumulativeAudience) {
        this.name = name;
        this.openDt = openDt;
        this.cumulativeAudience = cumulativeAudience;
    }
    makeCard() {
        const div = document.createElement('div');
        const poster = document.createElement('img');
        const innerDiv = document.createElement('div');

        div.classList.add('card');
        div.style.width = '18rem';

        poster.alt = '...';

        const h1 = document.createElement('h1');
    }
}

const getApi = () => {
    const date = new Date();
    const dateQuery = `${date.getFullYear()}${String(
        date.getMonth() + 1
    ).padStart(2, '0')}${String(date.getDate() - 1).padStart(2, '0')}`;
    console.log(dateQuery);

    const apiUrl = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=${dateQuery}`;

    fetch(apiUrl)
        .then((result) => {
            return result.json();
        })
        .then(({ boxOfficeResult: { dailyBoxOfficeList } }) => {
            const content = document.getElementById('contents');

            dailyBoxOfficeList.forEach((item) => {
                const divcol = document.createElement('div');
                const card = document.createElement('div');
                const poster = document.createElement('img');
                const cardBody = document.createElement('div');
                const h5 = document.createElement('h5');
                const movieName = item.movieNm;
                const cardtext = document.createElement('p');
                const kmdbServiceKey = `B2BZ9B5BHJ64RPLX1IY4`;
                const kmdbUrl = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&`;
                const kmdbMovieApi = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&title=${movieName}&ServiceKey=${kmdbServiceKey}`;

                cardBody.classList.add('card-body');
                divcol.classList.add('col');

                card.classList.add('card');
                card.classList.add('h-50');
                card.style.width = '18rem';

                fetch(kmdbMovieApi)
                    .then((result) => {
                        return result.json();
                    })
                    .then((datas) => {
                        const splited =
                            datas.Data[0].Result[0].posters.split('|');

                        poster.src = splited[0];
                    });
                // poster.src =
                //     'https://newsimg.sedaily.com/2024/03/12/2D6LVKWGAX_1.jpg';
                poster.alt = movieName;
                poster.classList.add('card-img-top');
                card.append(poster);

                h5.innerHTML = movieName;
                h5.classList.add('card-title');
                cardBody.append(h5);

                const p = Math.floor(item.audiAcc / 10000)
                    ? `누적 ${Math.floor(item.audiAcc / 10000)}만 ${
                          item.audiAcc % 10000
                      }명`
                    : `누적 ${item.audiAcc % 10000}명`;
                cardtext.innerText = p;
                cardBody.append(cardtext);
                card.append(cardBody);

                divcol.append(card);

                content.append(divcol);
            });
        });
};

getApi();
