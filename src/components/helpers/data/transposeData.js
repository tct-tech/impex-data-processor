// receive data in the format of: [ [1,2,3], [4,5,6], [7,8,9], ... ]
// output the data in the format of: [ [1,4,7], [2,5,8], [3,6,9], ... ]

const transposeData = (data) => {
    return data[0].map((_, colIndex) => data.map(row => row[colIndex]));
}

export default transposeData;