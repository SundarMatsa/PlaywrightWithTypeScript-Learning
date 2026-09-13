
function getCurrentDateTime() : Date {
    // const date = new Date();
    // console.log(date);
    return new Date();
}
console.log(getCurrentDateTime());

// Convert DD-MM-YYYY → MM/DD/YYYY 
function convertDateFormat(date : string) : string {
    const dateParts : string[] = date.split("-");

    const day : string = dateParts[0];
    const month : string = dateParts[1];
    const year : string = dateParts[2];

    return `${month}/${day}/${year}`;
}

let date : string = "25-08-2026";

console.log(date);

date = convertDateFormat(date);

console.log(date);