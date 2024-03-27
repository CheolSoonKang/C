import express from 'express';
import conn from './db.js';
const router = express.Router();
let seats = {
    '1관': [
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    ],
    '2관': [
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    ],
    '3관': [
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    ],
    '4관': [
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
    ],
};
let receivedDailyBoxOfficeList = {};
let moviePosterUrl = {};
let movieUrls = {};
const getDailyBoxOfficeList = () => {
    receivedDailyBoxOfficeList = {};
    moviePosterUrl = {};
    const date = new Date();
    const dateQuery = `${date.getFullYear()}${String(
        // fitting format YYYYMMDD
        date.getMonth() + 1 //왜인지는 모르겠지만,getMonth()는 +1 해줘야 한다.
    ).padStart(2, '0')}${String(date.getDate() - 1).padStart(2, '0')}`;
    //당일은 아직 집계되지 않아 검색일을 하루 전으로 한다.
    const apiUrl = `https://kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json?key=f5eef3421c602c6cb7ea224104795888&targetDt=${dateQuery}`;
    fetch(apiUrl)
        .then((result) => {
            return result.json();
        })
        .then(({ boxOfficeResult: { dailyBoxOfficeList } }) => {
            receivedDailyBoxOfficeList = dailyBoxOfficeList;
            dailyBoxOfficeList.forEach((item) => {
                const movieName = item.movieNm;
                const kmdbServiceKey = `B2BZ9B5BHJ64RPLX1IY4`;
                const kmdbMovieApi = `https://api.koreafilm.or.kr/openapi-data2/wisenut/search_api/search_json2.jsp?collection=kmdb_new2&title=${movieName}&ServiceKey=${kmdbServiceKey}`;

                fetch(kmdbMovieApi)
                    .then((result) => {
                        return result.json();
                    })
                    .then((datas) => {
                        const splited = datas.Data[0].Result[0].posters
                            ? datas.Data[0].Result[0].posters.split('|')
                            : datas.Data[0].Result[1].posters.split('|');
                        moviePosterUrl[movieName] = splited[0];

                        movieUrls[movieName] = datas.Data[0].Result[0].posters
                            ? datas.Data[0].Result[0].kmdbUrl
                            : datas.Data[0].Result[1].kmdbUrl;
                    });
            });
            console.log('getApis done');
        });
};
getDailyBoxOfficeList();
setInterval(getDailyBoxOfficeList, 3600 * 24 * 1000);
function hashingPasswordSha256(password) {
    return crypto
        .createHmac('sha256', secretCryptokey)
        .update(password)
        .digest('hex');
}

router.get('/', (req, res) => {
    if (!req.session.islogged) {
        req.session.islogged = false;
    }
    console.dir(req.session);
    const data = {
        receivedDailyBoxOfficeList: JSON.stringify(receivedDailyBoxOfficeList),
        moviePosterUrl: JSON.stringify(moviePosterUrl),
        movieUrls: JSON.stringify(movieUrls),
    };
    res.render(`index`, { data: data, islogged: req.session.islogged });
});

router.get('/reservation', (req, res) => {
    res.render('reservation', {
        islogged: req.session.islogged,
        theaters: Object.keys(seats).length,
    });
});
router.post('/seats/:theaterNumber', (req, res) => {
    const {
        params: { theaterNumber },
    } = req;

    res.send(seats[`${Number(theaterNumber)}관`]);
});

router.get('/signup', (req, res) => {
    res.render('signup');
});

router.post('/signup', (req, res) => {
    res.render('signup');
});

router.get('/login', (req, res) => {
    res.render('login', { islogged: 'not yet' });
});
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/');
});

router.post('/loginCheck', (req, res) => {
    const { id, password } = req.body;
    console.log(`id:${id} password:${password}`);
    conn.query(`select * from user where email='${id}'`, (err, result) => {
        let flag = '0';
        if (
            result.length &&
            result[0].password == hashingPasswordSha256(password)
        ) {
            console.log('im here');
            req.session.ids = id;
            req.session.islogged = true;
            flag = '1';
        }
        res.json({ loginResult: flag });
    });
});

//for 주소를 받아오기 위한 도로명주소api////////////////////////////////////////
router.get('/popup/jusoPopup', (req, res) => {
    res.render('jusoPopup');
});
router.post('/popup/jusoPopup', (req, res) => {
    // 새로 추가
    console.log(req.body);
    res.render('jusoPopup', { locals: req.body });
});

router.get('/movies/:movieName', (req, res) => {
    const {
        params: { movieName },
    } = req;
    res.send(`${movieName}`);
});

export { seats, router };
