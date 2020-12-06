import * as fs from 'fs'
import * as readLine from 'readline'

let array = [];

const lineReader = readLine.createInterface({
    input: fs.createReadStream('some/file/path/to-input.txt')
});

lineReader.on('line', function (line) {
    array.push(line)
});