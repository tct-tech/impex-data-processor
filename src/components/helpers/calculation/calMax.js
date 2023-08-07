// print maximum number out of the array

const calMax = (array) => {
    let result = [];
    for(let i = 0; i < array.length ; i++){
        result.push(Math.max(...array[i]));
    }
    return result;
}

export default calMax;