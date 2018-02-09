import elemancer from './elemancer.js'

const home = {
    category: elemancer.add({
        tagName: `h1`,
        style: {
            'text-align': `center`
        },
        textContent: `heyyooo`
    }),

    question: elemancer.add({
        tagName: `h1`,
        style: {
            'text-align': `center`
        },
        textContent: `heyyooo`
    }),

    answer: elemancer.add({
        tagName: `h1`,
        style: {
            'text-align': `center`,
            'opacity': 0
        },
        textContent: `heyyooo`
    })
}

export default home;