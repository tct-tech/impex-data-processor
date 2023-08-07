// Deviation Score: X - Xbar

import calAvg from "../calculation/calAvg";

const deviationScore = (cleanXdev, cleanYdev, cleanDia) => {
    // calculate Avg of Xdev and Ydev
    const _XdevAvg = calAvg(cleanXdev);
    const _YdevAvg = calAvg(cleanYdev); 

    // calculate Deviation Score
    // Xdev Ydev (XDS = x - avg)
    // Radius (RDS = (XDS ** 2 + YDS ** 2) ^ 0.5)
    const XDS = [];
    const YDS = [];
    const RDS = [];
    for(let i = 0; i < cleanXdev.length; i++){
        let _XDStemp = cleanXdev[i].map(x => x - _XdevAvg[i]);
        let _YDStemp = cleanYdev[i].map(y => y - _YdevAvg[i]);

        XDS.push(_XDStemp);
        YDS.push(_YDStemp);
        
        let sqrX = _XDStemp.map(x => x ** 2);
        let sqrY = _YDStemp.map(y => y ** 2);
        
        let _RDStemp = [];
        for(let j = 0; j < sqrX.length; j++){
            _RDStemp.push(Math.sqrt(sqrX[j] + sqrY[j]));
        }
        RDS.push(_RDStemp);
    }

    return [XDS, YDS, RDS]
}

export default deviationScore;