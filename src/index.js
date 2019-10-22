const { getRandomWordSync, getRandomWord } = require('word-maker');
const fs = require('fs');

/* Set FALSE to console.log output */
const WRITE_TO_FILE = false;


/* Uncomment each function to see the results for corresponding task. */

taskOne();
// taskTwo();
// taskThree_A();
// taskThree_B();
// taskFour_A();
// taskFour_B();


function fizzBuzz(index, getWord, params = {}) {
    const multipleOfThree = index % 3 === 0;
    const multipleOfFive = index % 5 === 0;

    if (multipleOfFive && multipleOfThree) {
        return 'FizzBuzz';
    } else if (multipleOfThree) {
        return 'Fizz';
    } else if (multipleOfFive) {
        return 'Buzz';
    } else {
        return typeof getWord === 'function' ? getWord(params) : getWord;
    }
}

function writeOutput(text) {
    if (WRITE_TO_FILE) {
        fs.appendFileSync('output.txt', `${text}\n`, function (err) {
            if (err) throw err;
        });
    } else {
        console.log(text);
    }
}

function sortByIndex(resultArray) {
    return resultArray.sort((a, b) => { return a.index - b.index });
}

function formatOutput(item) {
    return `${item.index}: ${item.word}`;
}

/////////////////////////// TASK 1 /////////////////////////
function taskOne() {
    for (let i = 1; i <= 100; i++) {
        writeOutput(`${i}: ${getRandomWordSync()}`);
    }
}


/////////////////////////// TASK 2 //////////////////////////
function taskTwo() {
    for (let i = 1; i <= 100; i++) {
        writeOutput(`${i}: ${fizzBuzz(i, getRandomWordSync)}`);
    }
}


/////////////////////////// TASK 3 (A) //////////////////////
function taskThree_A() {
    const asyncOutputPromises = [];

    for (let i = 1; i <= 100; i++) {
        asyncOutputPromises.push(new Promise((resolve, reject) => {
            getRandomWord().then(word => {
                resolve({ index: i, word });
            });
        }));
    }

    Promise.all(asyncOutputPromises).then(result => {
        sortByIndex(result).forEach(line => writeOutput(formatOutput(line)));
    });
}


/////////////////////////// TASK 3 (B) //////////////////////
function taskThree_B() {
    const asyncOutputFizzBuzzPromises = [];

    for (let i = 1; i <= 100; i++) {
        asyncOutputFizzBuzzPromises.push(new Promise((resolve, reject) => {
            getRandomWord().then(word => {
                resolve({ index: i, word: fizzBuzz(i, word) });
            });
        }));
    }

    Promise.all(asyncOutputFizzBuzzPromises).then(result => {
        sortByIndex(result).forEach(line => writeOutput(formatOutput(line)));
    });
}


/////////////////////////// TASK 4 (A) //////////////////////
function taskFour_A() {
    for (let i = 1; i <= 100; i++) {
        try {
            writeOutput(`${i}: ${fizzBuzz(i, getRandomWordSync, { withErrors: true })}`);
        } catch (error) {
            writeOutput(`${i}: It shouldn't break anything!`);
        }
    }
}


/////////////////////////// TASK 4 (B) //////////////////////
function taskFour_B() {
    const asyncOutputFizzBuzzPromises = [];

    for (let i = 1; i <= 100; i++) {
        asyncOutputFizzBuzzPromises.push(new Promise((resolve, reject) => {
            getRandomWord({ withErrors: true, slow: true }).then(word => {
                resolve({ index: i, word: fizzBuzz(i, word) });
            }).catch(() => {
                resolve({ index: i, word: `It shouldn't break anything!` });
            });
        }));
    }

    Promise.all(asyncOutputFizzBuzzPromises).then(result => {
        sortByIndex(result).forEach(line => writeOutput(formatOutput(line)));
    });
}
