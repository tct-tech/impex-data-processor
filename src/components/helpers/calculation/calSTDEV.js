const calSTDEV = (array, avg) => {
    let result = [];

    for(let i = 0; i < array.length ; i++){
        array[i] = array[i].map(ele => {
            return (ele - avg[i]) ** 2;
        });
    
        let sum = array[i].reduce((acc, curr) => acc + curr, 0);
        
        result.push(Math.sqrt(sum / ( array[i].length - 1 )));
    
    }

    return result;
}

export default calSTDEV;