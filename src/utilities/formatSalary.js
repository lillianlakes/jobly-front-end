/**
 * If there is a salary present, convert it from a plain number
 * into one formatted in USD
 * 
 * 1234 --> $1,234
 */

function formatSalary(num) {
    if(typeof(num) !== "number") return;
   
    // convert the num into an array 
    const numArr = Array.from(num.toString());

    // figure out where to start inserting commas. If the array's length is 
    // evenly divisible by 3, start at index 3 rather than 0 so there is no
    // extra comma at the beginning. 
    const startIdx = numArr.length % 3 === 0 ? 3 : numArr.length % 3;

    // insert a comma every 3 numbers beginning at the start index, 
   
    for(let i = startIdx; i < numArr.length; i += 3) {
        numArr.splice(i, 0, ',');
        // and slide i by one on each loop to compensate for the extra index in 
        // the array that the comma inserts
        i++;
    }

    // reassign integral to be the string with inserted commas, after
    // joining it, and converting it back to a string
    let numToCurr = numArr.join('').toString();

    // add a $ in front and return 
    return `$${numToCurr}`;
}

export default formatSalary;