// Receive data in the format of: [[1,2], [3,4,5], [3,3,3,3,3,3,3]...]
// Output sample size: [2,3,7,...]

const calSampleSize = (array) => {
    return array.map((ele) => ele.length);
}

export default calSampleSize;