import home from './home.js';
import map from 'lodash.map';
import moment from 'moment';
import io from 'socket.io-client';
import { setInterval, setTimeout } from 'timers';

const websocket = {
    init: function () {
        this.socket = io(process.env.HOST + `:` + process.env.HTTP_PORT);

        this.socket.emit(`question`);

        this.socket.on(`question`, function (data) {
            let i = data[Symbol.iterator]();
            let currentTimer;
            (function changeTextContent() {
                let next = i.next();
                home.category.textContent = next.value.category;
                home.question.textContent = next.value.question;
                home.answer.textContent = next.value.answer;
                home.answer.style.opacity = 0;
                let answerTimer = setTimeout(function() {
                    home.answer.style.opacity = 1.0;
                }, 10000)
                let timeout = next.done === false ? changeTextContent : function() { socket.emit(`question`); };
                currentTimer = setTimeout(timeout, 15000)
            })();
        });

        this.socket.on(`disconnect`, function(data) {
            console.log(`Host websocket has disconnected...`)
            socket.disconnect();
        });
    }
};

export default websocket;