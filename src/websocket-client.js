import home from './home.js';
import map from 'lodash.map';
import moment from 'moment';
import io from 'socket.io-client';
import { setInterval, setTimeout } from 'timers';

const client = {
    init: function () {
        client.socket = io(process.env.HOST + `:` + process.env.HTTP_PORT);

        client.socket.emit(`question`);

        client.socket.on(`question`, function (data) {
            let i = data[Symbol.iterator]();
            let currentTimer;
            (function changeTextContent() {
                let next = i.next();
                if (!next.done) {
                    home.category.textContent = next.value.category;
                    home.question.textContent = next.value.question;
                    home.answer.textContent = next.value.answer;
                    home.answer.style.opacity = 0;
                    let answerTimer = setTimeout(function () {
                        home.answer.style.opacity = 1.0;
                    }, 10000)
                }

                let timeout = next.done === false ? changeTextContent : function () { client.socket.emit(`question`); };
                currentTimer = setTimeout(timeout, 15000)
            })();
        });

        client.socket.on(`disconnect`, function (data) {
            console.log(`Host websocket has disconnected...`)
            socket.disconnect();
        });
    }
};

export default client;