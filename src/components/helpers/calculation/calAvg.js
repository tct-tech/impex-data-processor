/**
 * @Author: Your name
 * @Date:   2023-08-07 11:10:21
 * @Last Modified by:   Your name
 * @Last Modified time: 2023-08-07 14:32:42
 */
// print Average of array

const calAvg = (array) => {
    let result = [];
    for(let i = 0; i < array.length ; i++){
        result.push(array[i].reduce((sum, ele) => sum + ele, 0) / array[i].length);
    }
    return result;
}

export default calAvg;