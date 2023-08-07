// receive data in the format of: [ [1,2,3...], [4,5,6...], [7,8,9...], ... ]
// In our use case, only keeping Column 5(Xdev), 10(Ydev), 14(Dia)

const trimData = (data) => {
    let trimmedData = [];
    for(let i = 1; i < data.length; i++){
        let trimmedData_single = [];
        trimmedData_single.push(data[i].at(4));
        trimmedData_single.push(data[i].at(9));
        trimmedData_single.push(data[i].at(13));
        trimmedData.push(trimmedData_single);
    }
    return trimmedData;
}

export default trimData;