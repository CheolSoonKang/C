import express from 'express';
import conn from './db.js';
import crypto from 'crypto';
const router = express.Router();
const secretCryptokey = 'thisIsMyNodeJSFirstApp';
// let seats = {
//     '1관': [
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//     ],
//     '2관': [
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//     ],
//     '3관': [
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//     ],
//     '4관': [
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//         [1, 1, 0, 1, 1, 1, 1, 0, 1, 1],
//     ],
// };
let seats = {};

function makeSeats(seat) {
    conn.query(`select seats from movies`, (err, data) => {
        data.forEach((item, index) => {
            seat[`${index + 1}관`] = item.seats;
        });
    });
    return seat;
}
seats = makeSeats(seats);

let receivedDailyBoxOfficeList = {};
let moviePosterUrl = {};
let movieUrls = {};
const getDailyBoxOfficeList = () => {
    receivedDailyBoxOfficeList = {};
    moviePosterUrl = {};
    movieUrls = {};
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
                        if (datas.Data[0].Result) {
                            let i = 0;
                            while (!datas.Data[0].Result[i].posters) {
                                i++;
                            }
                            const splited =
                                datas.Data[0].Result[i].posters.split('|');
                            moviePosterUrl[movieName] = splited[0];
                            movieUrls[movieName] =
                                datas.Data[0].Result[i].kmdbUrl;
                        }
                    });
            });
        })
        .then(() => {
            console.log('getApis done');
        });
};
getDailyBoxOfficeList();
setInterval(getDailyBoxOfficeList, 1000 * 60 * 60 * 24);

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
    console.log(seats[`1관`][0][2]);
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
// for signUp route//////////////////////
router.get('/signup', (req, res) => {
    res.render('signup');
});
router.post('/signup', (req, res) => {
    const {
        body: { email, password, name, address },
    } = req;
    conn.query(
        `insert into user(email,password,name,address)values("${email}","${hashingPasswordSha256(
            password
        )}","${name}","${address}");`,
        (err, data) => {
            let flag = '0';
            if (err == null) {
                // success to signUp
                flag = '1';
            }
            res.json({ result: flag });
        }
    );
});
router.get('/admin', (req, res) => {
    res.render('admin');
});
router.post('/resetSeat', (req, res) => {
    const {
        body: { value },
    } = req;
    if (value == 'reset') {
        for (let y = 0; y < 10; y++) {
            for (let x = 0; x < 10; x++) {
                if (!(x == 2) && !(x == 7)) {
                    conn.query(
                        `update movies set seats=JSON_SET(seats,'$[${y}][${x}]',1)`,
                        (err, data) => {
                            console.log(`err:${err}`);
                            console.log(`data:${data}`);
                        }
                    );
                }
            }
        }
    }
});
router.post('/idCheck', (req, res) => {
    const {
        body: { email },
    } = req;
    conn.query(`select * from user where email='${email}'`, (err, data) => {
        let flag = '0';
        if (data.length === 0) {
            flag = '1';
        }
        res.json({ result: flag });
    });
});
//////////////////////////////////////////
router.get('/login', (req, res) => {
    res.render('login', { islogged: 'not yet' });
});
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/moviereservation');
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
