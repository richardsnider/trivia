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
            let i = 0;
            let questionTimer, answerTimer, opacityTimer;

            function changeTextContent() {
                if (i >= data.length) {
                    client.socket.emit(`question`);
                    return;
                }

                home.category.textContent = data[i].category;
                home.question.textContent = data[i].question;
                home.answer.style.opacity = 0;
                home.answer.textContent = data[i].answer;

                answerTimer = setTimeout(showAnswer, 30000);
                questionTimer = setTimeout(changeTextContent, 40000);
                i++;
            }

            function showAnswer() {
                home.answer.style.opacity = 1.0;
            }

            changeTextContent();
        });

        client.socket.on(`disconnect`, function (data) {
            console.log(`Host websocket has disconnected...`)
            socket.disconnect();
        });
    }
};

export default client;