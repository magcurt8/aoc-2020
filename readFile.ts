import * as fs from 'fs'
import * as readLine from 'readline'

let array = [];

const lineReader = readLine.createInterface({
    input: fs.createReadStream('/Users/magcurt08/Desktop/input-day-1.txt')
});

lineReader.on('line', function (line) {
    let numeric:number = parseInt(line);
    array.push(numeric)
});


lineReader.on('close', function () {
    const sortedArray: number[] = array.sort((n1,n2) => n1 - n2)

    let answer = calculateProduct(sortedArray, 0, sortedArray.length - 1)

    console.log(`Here be the answer: ${answer}`)
});


// Less optimal solution
// const calculateWorstYearEver = (arr) => {
//     const sortedArray: number[] = arr.sort((n1,n2) => n1 - n2)
//     let sum
//
//     for (let i = 0; i < sortedArray.length; i++) {
//         for (let j = sortedArray.length-1; j > 0; j--){
//             sum = sortedArray[i] + sortedArray[j]
//             if (sum === 2020){
//                 return sortedArray[i] * sortedArray[j];
//             }
//         }
//     }
// }

const calculateProduct = (arr: number[], first: number, last: number) => {
    let sum = arr[first] + arr[last]

    if (sum > 2020) {
        return calculateProduct(arr, first, last - 1)
    } else if (sum < 2020) {
        return calculateProduct(arr, first + 1, last)
    } else {
        return arr[first] * arr[last]
    }
}