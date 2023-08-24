import cleanupData from "./helpers/data/cleanupData"; 
import deviationScore from "./helpers/data/deviationScore";
import calSampleSize from "./helpers/data/calSampleSize";

import calAvg from "./helpers/calculation/calAvg";
import calAvg4S from "./helpers/calculation/calAvg4S";
import calCPK from "./helpers/calculation/calCPK";
import calMax from "./helpers/calculation/calMax";
import calSTDEV from "./helpers/calculation/calSTDEV";

import * as XLSX from "xlsx";

const DataProcessor = (props) => {
    const tolP = 0.20; // Percentage Tolerance for CMM Dia (+/-)
    const processFile = () => {
        if(!props.file || !props.steps || !props.specLimit){
            alert('Missing parameters, all fields are required');
            return;
        }

        const data = cleanupData(props.file, props.steps, props.filter, tolP);
        const cleanXdev = data[0];
        const cleanYdev = data[1];
        const cleanDia = data[2];

        if(data[3] % props.steps !== 0){
            alert('Please input a proper Step number.');
            return;
        }

        // 1. Calculate sample size for each array (result#1)
        const XdevSampleSize = calSampleSize(cleanXdev);
        const YdevSampleSize = calSampleSize(cleanYdev);
        const DiaSampleSize = calSampleSize(cleanDia);
        const sampleSize = XdevSampleSize;

        // 2. Deviation Score
        const DS = deviationScore(cleanXdev, cleanYdev, cleanDia);
        const XDS = DS[0];
        const YDS = DS[1];
        const RDS = DS[2];

        // 3. calMax: Max of XDS, YDS, RDS (result#2)
        const XDS_Max = calMax(XDS);
        const YDS_Max = calMax(YDS);
        const RDS_Max = calMax(RDS);
        const max = [XDS_Max, YDS_Max, RDS_Max];

        // 4. calAvg: Avg of XDS, YDS, RDS (result#3)
        const XDS_Avg = calAvg(XDS);
        const YDS_Avg = calAvg(YDS);
        const RDS_Avg = calAvg(RDS);
        const avg = [XDS_Avg, YDS_Avg, RDS_Avg];

        // 5. calSTDEV: XDS, YDS, RDS (result#4)
        const XDS_STDEV = calSTDEV(XDS, XDS_Avg);
        const YDS_STDEV = calSTDEV(YDS, YDS_Avg);
        const RDS_STDEV = calSTDEV(RDS, RDS_Avg);
        const STDEV = [XDS_STDEV, YDS_STDEV, RDS_STDEV];

        // 6. calAvg4S: XDS, YDS, RDS (result#5)
        const XDS_Avg4S = calAvg4S(XDS_Avg, XDS_STDEV);
        const YDS_Avg4S = calAvg4S(YDS_Avg, YDS_STDEV);
        const RDS_Avg4S = calAvg4S(RDS_Avg, RDS_STDEV);
        const avg4s = [XDS_Avg4S, YDS_Avg4S, RDS_Avg4S];

        // 7. calCPK: XDS, YDS, RDS (result#6)
        let spec = Number(props.specLimit);
        const XDS_CPK = calCPK(spec, XDS_Avg, XDS_STDEV);
        const YDS_CPK = calCPK(spec, YDS_Avg, YDS_STDEV);
        const RDS_CPK = calCPK(spec, RDS_Avg, RDS_STDEV);
        const cpk = [XDS_CPK, YDS_CPK, RDS_CPK];

        // console.log([sampleSize, max, avg, STDEV, avg4s, cpk]);
        downloadExcelFile([sampleSize, max, avg, STDEV, avg4s, cpk]);
    }

    const downloadExcelFile = (data) => {
        let aoa = [];
        let row1 = [''];
        let row2 = ['Sample Size'];
        let row3 = [''];
        let row4 = ['Max Deviation'];
        let row5 = ['Avg Deviation'];
        let row6 = ['Std Deviation'];
        let row7 = ['Avg + 4S'];
        let row8 = ['CPK'];
        let row9 = [''];
        let row10 = [''];
        let row11 = [];
        let row12 = [];
        for(let i = 0; i < data[0].length; i++){
            row1.push(props.steps * i + 1 + '-' + props.steps * (i + 1), '', '');
            row2.push(data[0][i] + '/' + props.steps, '', '');
            row3.push('X-Axis', 'Y-Axis', 'Radial');
            row4.push(data[1][0][i], data[1][1][i], data[1][2][i]);
            row5.push(data[2][0][i], data[2][1][i], data[2][2][i]);
            row6.push(data[3][0][i], data[3][1][i], data[3][2][i]);
            row7.push(data[4][0][i], data[4][1][i], data[4][2][i]);
            row8.push(data[5][0][i], data[5][1][i], data[5][2][i]);

            row11.push(data[0][i]);
            row12.push(Math.min(data[5][0][i], data[5][1][i], data[5][2][i]));
        }
        
        aoa.push(row1, row2, row3, row4, row5, row6, row7, row8, row9, row10, row11, row12);
         /* create worksheet */
        const worksheet = XLSX.utils.aoa_to_sheet(aoa);
        /* create workbook and export */
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "raw data");
        
        XLSX.writeFile(workbook, "_ImpexData.xlsx");
    }

    return(
        <>
            <button onClick={() => {processFile()}}>Process Data</button>
        </>
    );
}

export default DataProcessor;