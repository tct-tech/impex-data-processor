const calCPK = (specLimit, avg, stdev) => {
    let result = [];

    for(let i = 0; i < avg.length ; i++){
        let CPKU = (specLimit - avg[i]) / (3 * stdev[i]);
        let CPKL = (avg[i] + specLimit) / (3 * stdev[i]);
        result.push(Math.min(CPKU, CPKL));
    }

    return result;
}

export default calCPK;