/**
 * @Author: Your name
 * @Date:   2023-08-10 15:23:06
 * @Last Modified by:   Your name
 * @Last Modified time: 2023-08-10 15:23:20
 */
const calMedian = (array) => { 
    const copy = [...array].sort((a, b) => a - b);
    const midpoint = Math.floor(array.length / 2);
    const median = array.length % 2 === 1 ?
        copy[midpoint] :
        (copy[midpoint - 1] + copy[midpoint]) / 2;
    return median;
}

export default calMedian;