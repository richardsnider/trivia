import elemancer from './elemancer.js'

const home = {
    category: elemancer.add({
        style: {
            'grid-column-start': 2,
            'grid-column-end': 12,
            'grid-row': 2
        },
    }),

    question: elemancer.add({
        style: {
            'grid-column-start': 2,
            'grid-column-end': 12,
            'grid-row-start': 4,
            'grid-row-end': 7
        },
    }),

    answer: elemancer.add({
        style: {
            'grid-column-start': 2,
            'grid-column-end': 12,
            'grid-row': 10,
            'opacity': 0
        },
    })
}

export default home;