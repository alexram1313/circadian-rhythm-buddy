const cr_calc = require('./index');

const dataLow = [
    {
        hour: 5,
        heart_rate: 65
    },
    {
        hour: 5.1,
        heart_rate: 70
    },
    {
        hour: 5.2,
        heart_rate: 69
    },
    {
        hour: 5.3,
        heart_rate: 65
    },
    {
        hour: 5.4,
        heart_rate: 64
    },
    {
        hour: 5.5,
        heart_rate: 57
    },
    {
        hour: 5.6,
        heart_rate: 52
    }
];

// Low state
console.log('START TEST\nAnticipated state: low');
let result_low = cr_calc.determine_state(dataLow, 21, 'male');
console.log('Result state:', result_low);
console.log('Pass:', result_low == 'low');

console.log('');


const dataMed = [
    {
        hour: 5,
        heart_rate: 65
    },
    {
        hour: 5.1,
        heart_rate: 70
    },
    {
        hour: 5.2,
        heart_rate: 69
    },
    {
        hour: 5.3,
        heart_rate: 65
    },
    {
        hour: 5.4,
        heart_rate: 64
    },
    {
        hour: 5.5,
        heart_rate: 69
    },
    {
        hour: 5.6,
        heart_rate: 72
    }
];

// Low state
console.log('START TEST\nAnticipated state: medium');
let result_med = cr_calc.determine_state(dataMed, 21, 'male');
console.log('Result state:', result_med);
console.log('Pass:', result_med == 'medium');
