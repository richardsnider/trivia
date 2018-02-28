import home from './home.js';
import io from 'socket.io-client';
import log from './utility/log.js';
import map from 'lodash.map';
import moment from 'moment';
import timers from 'timers';

const client = {
    init: function () {
        client.socket = io(process.env.HOST + `:` + process.env.HTTP_PORT);

        client.socket.on(`connect`, function (data) {
            log(`Websocket ` + client.socket.id + ` connected to namespace: ` + client.socket.nsp);
        });

        client.socket.emit(`question`);

        client.socket.on(`question`, function (data) {
            let i = 0;

            function changeTextContent() {
                if (i >= data.length) {
                    client.socket.emit(`question`);
                    return;
                }

                home.category.textContent = data[i].category;
                home.question.textContent = data[i].question;
                home.answer.style.opacity = 0;
                home.answer.textContent = data[i].answer;
                client.answerTimer = timers.setTimeout(showAnswer, 30000);
                client.questionTimer = timers.setTimeout(changeTextContent, 40000);
                i++;
            }

            function showAnswer() {
                home.answer.style.opacity = 1.0;
            }

            changeTextContent();
        });

        client.socket.on(`disconnect`, function (data) {
            log(`Host websocket has disconnected.`);
            timers.clearTimeout(client.answerTimer);
            timers.clearTimeout(client.answerTimer);
            socket.disconnect();
        });
    }
};

export default client;