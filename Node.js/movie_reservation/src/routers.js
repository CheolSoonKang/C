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

function makeSeats() {
    let seat = {};
    conn.query(`select seats from theaters`, (err, data) => {
        data.forEach((item, index) => {
            seat[`${index + 1}관`] = item.seats;
        });
    });
    return seat;
}
seats = makeSeats();

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
async function getUserNumberByEmail(email) {
    return new Promise((resolve, reject) => {
        conn.query(
            `select user_number from user where email="${email}"`,
            (e, d) => {
                if (e) {
                    reject(e);
                }
                if (d) {
                    resolve(d[0].user_number);
                }
            }
        );
    });
}
router.post('/signup', (req, res) => {
    const {
        body: { email, password, name, address },
    } = req;
    let flag = '0';
    conn.query(
        `insert into user(email,password,name,address)values("${email}","${hashingPasswordSha256(
            password
        )}","${name}","${address}");`,
        async (err, data) => {
            console.log(`err:${err}`);
            console.dir(`data:${data}`);
            if (err == null) {
                // success to signUp
                flag = '1';

                let userNumber = await getUserNumberByEmail(email);
                // create a table for each user's records
                conn.query(
                    //userName_userNumber_history
                    `create table ${name}_${userNumber}_history(
                                id int not null primary key auto_increment,
                                reservation_at DATETIME default current_timestamp,
                                reserved_seats varchar(30) not null
                            );`,
                    (e2, d2) => {
                        console.log(e2);
                        console.log(d2);
                    }
                );

                res.json({ result: flag });
            }
        }
    );
});

router.get('/admin', async (req, res) => {
    req.session.isAdmin = 'True';
    conn.query(`show tables;`, (err, data) => {
        if (data.hasOwnProperty('Tables_in_moviereservation')) {
            console.log('htp');
        }
        for (let i of data) {
            console.log(i.Tables_in_moviereservation);
        }
    });
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
                        `update theaters set seats=JSON_SET(seats,'$[${y}][${x}]',1)`,
                        (err, data) => {}
                    );
                }
            }
        }
        seats = makeSeats();
        console.log('Reset Seats Done');
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
            req.session.email = id;
            req.session.userName = result[0].name;
            req.session.islogged = true;
            flag = '1';
        }
        res.json({ loginResult: flag });
    });
});
//////////////////////////////////////////
router.get('/mypage', (req, res) => {
    res.render('mypage', { islogged: req.session.islogged });
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
