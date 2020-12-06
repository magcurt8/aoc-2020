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

    let partOneAnswer = calculateProduct(sortedArray, 0, sortedArray.length - 1)

    let middle = Math.floor(sortedArray.length / 2) - 1;
    let partTwoAnswer = threesACrowd(sortedArray, 0, middle, sortedArray.length - 1)

    console.log(`Here be the answer to Part One: ${partOneAnswer} \nHere be the answer to Part Two: ${partTwoAnswer}`)
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

// I'm probably overdoing something here but I'm drunk so ¯\_(ツ)_/¯
const threesACrowd = (arr: number[], first: number, middle: number, last: number) => {
    let sum = arr[first] + arr[middle] + arr[last]
    let firstValue = arr[first]
    let middleValue = arr[middle]
    let lastValue = arr[last]
    let product = firstValue * middleValue * lastValue

    if (sum > 2020) {
        if ((2020 - (firstValue + lastValue)) < firstValue) {
            return threesACrowd(arr, first, middle, last - 1)
        }
        if (middleValue + lastValue > 2020) {
            return threesACrowd(arr, first, middle - 1, last)
        }
        if (2020 % (sum) > firstValue) {
            return threesACrowd(arr, first, middle, last - 1)
        }
    } else if (sum === 2020) {
        return product;
    }
}