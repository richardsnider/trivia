import moment from 'moment'

export default function (text) {
    console.log(moment().format(`M/D/YY HH:mm:ss`) + ` ` + text);
}