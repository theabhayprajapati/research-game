/* convert arr
[
    {
        testNumbers: 1,
        reactionTime :400,
    },
    {
        testNumbers: 2,
        reactionTime :345,
    },{
        testNumbers: 3,
        reactionTime :645,
    },
]
*/
// to csv

import { TUser } from "./types";

const convertToCSV = (objArray: any, ObjArray2: any, user: TUser) => {
    console.log(user);
    const array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    const array2 = typeof ObjArray2 != 'object' ? JSON.parse(ObjArray2) : ObjArray2;
    let str = "";
    str = 'Simple Reaction Test \rTest Number,Reaction Time\r';
    for (let i = 0; i < array.length; i++) {
        let line = '';
        console.log(str);
        for (let index in array[i]) {
            if (line != '') line += ','
            line += array[i][index];
        }
        str += line + ' \r'
    }
    // add space two rows between two arrays
    str += ' \r \r';
    str += 'Double Reaction Test \rTest Number,Reaction Time\r';
    for (let i = 0; i < array2.length; i++) {
        let line = '';
        console.log(str);
        for (let index in array2[i]) {
            if (line != '') line += ','
            line += array2[i][index];
        }
        str += line + ' \r'
    }
    console.log(str);
    return `Name: ${user.name} \rAge: ${user.age} \r \r${str}`
}
export { convertToCSV };


// Path: globals\DownloadCSV.ts 