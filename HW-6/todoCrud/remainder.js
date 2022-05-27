import fs from "fs/promises";
import path from "path";
import { JSON_PATH } from "./constants.js";

export function remaind(task){
    console.log(">>>>>>>Notification : ",task.description);
    fs.readFile(path.resolve(JSON_PATH), 'utf-8')
    .then(data => {
    const jsonData = JSON.parse(data);
    let filteredIndex;
    jsonData.forEach((element, index) => {
        if (element.id === task.id){
            filteredIndex = index;
        }
    });
    jsonData[filteredIndex].done = true;
    jsonData[filteredIndex].status = 'done';
    fs.writeFile(JSON_PATH, JSON.stringify(jsonData, null, 2))
    });
}