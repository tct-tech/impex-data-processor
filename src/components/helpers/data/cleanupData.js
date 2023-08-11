/**
 * @Author: Your name
 * @Date:   2023-08-07 11:10:21
 * @Last Modified by:   Your name
 * @Last Modified time: 2023-08-11 11:31:52
 */
import trimData from "./trimData"; 
import transposeData from "./transposeData";
import removeEmptyElements from "./removeEmptyElements";
import filterData from "./filterData";

const cleanupData = (file, steps, tolP) => {
    // Keeping only column 5(Xdev), 10(Ydev), 14(Dia)
    let trimmedData = trimData(file);
    // Transpose matrix
    let sortedData = transposeData(trimmedData);

    // Split the sortedData into N chunks with props.steps
    let chunkSize = Number(steps);
    let Xdev = []; 
    let Ydev = [];
    let Dia = [];

    for(let i = 0; i < sortedData[0].length; i+=chunkSize){
        const XdevChunk = sortedData[0].slice(i, i + chunkSize);
        const YdevChunk = sortedData[1].slice(i, i + chunkSize);
        const DiaChunk = sortedData[2].slice(i, i + chunkSize);
        Xdev.push(XdevChunk);
        Ydev.push(YdevChunk);
        Dia.push(DiaChunk);
    }

    // Filter Data 
    const filteredData = filterData(removeEmptyElements(Xdev), removeEmptyElements(Ydev), removeEmptyElements(Dia), tolP);
    const filteredXdev = filteredData[0];
    const filteredYdev = filteredData[1];
    const filteredDia = filteredData[2];

    // Remove empty elements before doing calculations
    const cleanXdev = removeEmptyElements(filteredXdev);
    const cleanYdev = removeEmptyElements(filteredYdev);
    const cleanDia = removeEmptyElements(filteredDia);

    return[cleanXdev, cleanYdev, cleanDia, trimmedData.length];
}

export default cleanupData;