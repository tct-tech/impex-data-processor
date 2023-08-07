// There will be incidents that the holes weren't measured, resulting in '' in array
// This function will remove the '' elements from array

const removeEmptyElements = (array) => {
    let result = [];
    for(let i = 0; i < array.length ; i++){
        result.push(array[i].filter(ele => typeof ele === 'number'));
    }
    return result;
}

export default removeEmptyElements;