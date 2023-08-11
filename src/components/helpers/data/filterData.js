/**
 * @Author: Your name
 * @Date:   2023-08-10 15:24:37
 * @Last Modified by:   Your name
 * @Last Modified time: 2023-08-11 11:30:51
 */
import calMedian from '../calculation/calMedian';
const isDiaValid = (value, Dia, tolP) => {
    const diaMedian = calMedian(Dia);
    const upLimit = (1 + tolP) * diaMedian;
    const downLimit = (1 - tolP) * diaMedian;
    if(value > upLimit || value < downLimit || value < 0){
        return false;
    }else{
        return true;
    }
}

const isDevValid = (value, Dia) => {
    const avgDia = Dia.reduce((sum, ele) => sum + Number(ele), 0) / Dia.length;   
    return avgDia - Math.abs(value) > 0;
}

const filterData = (Xdev, Ydev, Dia, tolP) => {
    // Data format: [[...], [...], [...], ...]
    let filteredXdev = [];
    let filteredYdev = [];
    let filteredDia = [];
    for(let i = 0; i < Xdev.length; i++){
        let _filteredXdev = [];
        let _filteredYdev = [];
        let _filteredDia = [];
        for(let j = 0; j < Xdev[i].length; j++){
            if(
                isDevValid(Xdev[i][j], Dia[i])
                && isDevValid(Ydev[i][j], Dia[i])
                && isDiaValid(Dia[i][j], Dia[i], tolP)
            ){
                _filteredXdev.push(Xdev[i][j]);
                _filteredYdev.push(Ydev[i][j]);
                _filteredDia.push(Dia[i][j]);
            }else{
                // replace out-of-tolerance data to ''
                _filteredXdev.push('');
                _filteredYdev.push('');
                _filteredDia.push('');
            }
        }
        filteredXdev.push(_filteredXdev);
        filteredYdev.push(_filteredYdev);
        filteredDia.push(_filteredDia);
    }

    return [filteredXdev, filteredYdev, filteredDia]
}

export default filterData;