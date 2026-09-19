import {parse, format} from "date-fns";
import {Locator, Page} from '@playwright/test';

// 1. get current date by using Date object
function getCurrentDateTime() : Date {
    // const date = new Date();
    // console.log(date);
    return new Date();
}
// console.log(getCurrentDateTime());

// 2. Convert DD-MM-YYYY → MM/DD/YYYY 
function convertDateFormat(date : string) : string {
    const dateParts : string[] = date.split("-");

    const day : string = dateParts[0];
    const month : string = dateParts[1];
    const year : string = dateParts[2];

    return `${month}/${day}/${year}`;
}

let date : string = "25-08-2026";

// console.log(date);

// date = convertDateFormat(date);

// console.log(date);

// 3. Creating a specific date with Date

function createDate(date : string) : Date {
    const dateArr : string[] = date.split("-");
    const day : number = parseInt(dateArr[0]);
    const month : number = parseInt(dateArr[1]);
    const year : number = parseInt(dateArr[2]);

    return new Date(year, month -1, day); 
}

const newDate : Date = createDate(date);
// console.log(newDate);
// console.log(newDate.toLocaleDateString());
// console.log(newDate.getFullYear()); // returns fullyear
// console.log(newDate.getDay() - 1); // returns day of the week and day start with 0
// console.log(newDate.getMonth() + 1); // returns month and month starts with 0
// console.log(newDate.getDate()); // returns the day of the month
// console.log(newDate.getHours()); // returns hours
// console.log(newDate.getMinutes()); // returns Minutes
// console.log(newDate.getSeconds()); // returns Seconds
// console.log(newDate.getMilliseconds()); // returns Milliseconds
// console.log(newDate.getTime()); // returns Time

// ex:
// function createDate(
//     year: number,
//     month: number,
//     day: number
// ): Date {

//     return new Date(year, month - 1, day);
// }

// 4. convert Date to MM/DD/YYYY
function formatDateAsMMDDYYYY(date : Date) : string {
    const month : string = String(date.getMonth() + 1).padStart(2, '0');
    const day : string = String(date.getDate()).padStart(2,"0");
    const year : string = String(date.getFullYear());

    return `${month}/${day}/${year}`;
}

// Intl.DateTimeFormat
function formatDateUS(date : Date) : string {
    return new Intl.DateTimeFormat("en-US", {
        // month : "2-digit",
        // day : "2-digit",
        // year : "numeric"
        // month : "long", // long gives full month name and short gives shorthand of the month
        month : "short",
        day : "numeric",
        year : "numeric"
    }).format(date);
}

// date = formatDateUS(newDate);
// console.log(date);

function replaceMethod(date : string) : string {

    // date = date.replace(/-/g, "/"); // convererting date to MM/DD/YYYY format

    // date = date.replace("-", "/"); // replaces the first occurance

    // date = date.replace(/[-.]/g, "/"); // replaces multiple seperators

    date = date.replaceAll("-", "/");

    return date;
}

// date = replaceMethod(date);
// console.log(date);

// -----------------------

// date-fns

// install date-fns 
// cmd -> npm install date-fns

function parseDate(date : string) : string {
    const dateParse = parse(date, "dd-MM-yyyy", new Date());

    return format(dateParse, "MM/dd/yyyy") // 08/25/2026
    // return format(dateParse, "dd/MM/yyyy"); // 25/08/2026
    // return format(dateParse, "yyyy/MM/dd"); // 2026/08/25
    // return format(dateParse, "MMMM dd yyyy"); //August 25 2026  
    // return format(dateParse, "MMM dd yyyy"); // Aug 25 2026
}

// const dateFormat : string = parseDate("25-08-2026");
// console.log(dateFormat);

function convertMonth(month : string) : string {

    const months : Record<string, string> = {};

    months["01"] = "January";
    months["02"] = "February";
    months["03"] = "March";
    months["04"] = "April";
    months["05"] = "May";
    months["06"] = "June";
    months["07"] = "July";
    months["08"] = "August";
    months["09"] = "September";
    months["10"] = "October";
    months["11"] = "November";
    months["12"] = "December";


    return months[month];
}

async function selectDate(requiredYear:string, requiredMonth:string, requiredDay:string, isFuture:boolean, page : Page) {
     while(true) {
        const currentmonth = await page.locator(".ui-datepicker-month").textContent();
        const currentYear = await page.locator(".ui-datepicker-year").textContent();

        if (currentmonth?.trim() == requiredMonth && currentYear?.trim() == requiredYear) {
            break;
        }

        if (isFuture) {
            // select future date
            await page.getByText("Next").click();
        } else {
            // select past date
            await page.getByText("Prev").click();
        }  
    }

    const days : Locator[] = await page.locator(".ui-datepicker-calendar td").all();

    for (let dayLoc of days) {
        const dayinMonth = await dayLoc.innerText();

        // console.log("Day", dayinMonth);
        

        if (Number(dayinMonth) === Number(requiredDay)) {
            await dayLoc.click();
            break;
        }
    }
}



export{parseDate, convertMonth, selectDate};