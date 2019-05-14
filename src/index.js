// import {lessToJson} from 'less-to-json'
const lessToJson = require("less-to-json");
const fs = require("fs");
const path = require("path");

let filePath = path.resolve(__dirname + "/lessDir");

// debugger
const tempObj = lessToJson(path.dirname(__filename) + "/theme.less"); // key - 颜色

const mapObj = {};
Object.keys(tempObj).forEach(value => {
  // 把value转换为key
  mapObj[tempObj[value]] = value.toLowerCase();
});

fs.readdir(filePath, "utf-8", function(err, data) {
  data.forEach(function(item, index) {
    if (/.less/.test(item)) {
      replaceColor(filePath + "/" + item,filePath);
    }
  });
});

function replaceColor(url,baseUrl) {
  console.log(url);
  fs.readFile(url, "utf8", function(err, data) {
    if (err) {
      console.log(err);
    }
    const result = data.replace(/#{1}[a-zA-Z0-9]{5}[a-zA-Z0-9]/g, function(
      value
    ) {
      // console.log(mapObj);
      if (mapObj[value.toLowerCase()]) {
        console.log(mapObj[value.toLowerCase()]);
        return "@" + mapObj[value];
      }
      return value;
    });
    fs.writeFile(baseUrl + "/result.less", result, "utf8", function(err) {
      if (err) return console.log(err);
    });
  });
}

// console.log(Object.keys(mapObj));
