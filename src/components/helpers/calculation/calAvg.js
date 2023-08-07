// print Average of array

const calAvg = (array) => {
    let result = [];
    for(let i = 0; i < array.length ; i++){
        result.push(array[i].reduce((sum, ele) => sum + ele) / array[i].length);
    }
    return result;
}

export default calAvg;