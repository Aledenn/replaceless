// import {lessToJson} from 'less-to-json'
const lessToJson = require('less-to-json');
const fs = require('fs')
const path = require('path')

function isJsonString(str) {
  try {
      if (typeof JSON.parse(str) == "object") {
          return true;
      }
  } catch(e) {
  }
  return false;
}
// debugger
const mapJson = lessToJson(path.dirname(__filename)+'/theme.less')
// console.log(typeof mapJson);
Object.keys(mapJson).forEach((value) => {
  console.log(value)
})
// const mapObj = JSON.parse(mapJson)
// console.log(mapObj);
// fs.readFile(path.dirname(__filename)+'/text.less','utf8',function(err,data){
//   if(err){
//     console.log(err);
//   }
//   const result = data
// })



// console.log(Object.keys(mapObj));