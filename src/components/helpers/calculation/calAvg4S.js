const calAvg4S = (avg, stdev) => {
    let result = [];

    for(let i = 0; i < avg.length ; i++){
        result.push(avg[i] + 4 * stdev[i]);
    }
    
    return result;   
}

export default calAvg4S;