import { Server } from 'socket.io';
import conn from './db.js';
import { seats } from './routers.js';

export default function socketIOServer(app) {
    const SIS = new Server(app);
    SIS.on('connection', (socket) => {
        socket.on('reserve', ({ x_list, y_list, theaterNumber }) => {
            for (let i = 0; i < x_list.length; i++) {
                seats[`${theaterNumber}관`][y_list[i]][x_list[i]] = 2;
                conn.query(
                    `update movies set seats=JSON_SET(seats,'$[${y_list[i]}][${x_list[i]}]',2) where movie="${theaterNumber}"`,
                    (err, data) => {
                        console.log('err:' + err);
                        console.dir(`data: ${data}`);
                    }
                );
            }

            SIS.sockets.emit('reserve', {
                x_list: x_list,
                y_list: y_list,
                theaterNumber: theaterNumber,
            });
        });
    });
}
