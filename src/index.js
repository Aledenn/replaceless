// import {lessToJson} from 'less-to-json'
const lessToJson = require("less-to-json");
const fs = require("fs");
const path = require("path");

// debugger
const tempObj = lessToJson(path.dirname(__filename) + "/theme.less"); // key - 颜色

const mapObj = {};
Object.keys(tempObj).forEach(value => {
  // 把value转换为key
  mapObj[tempObj[value]] = value.toLowerCase();
});
// const mapObj = JSON.parse(mapObj)
// console.log(mapObj);
fs.readFile(path.dirname(__filename) + "/text.less", "utf8", function(
  err,
  data
) {
  if (err) {
    console.log(err);
  }
  const result = data.replace(/#{1}[a-zA-Z0-9]{5}[a-zA-Z0-9]/g, function(
    value
  ) {
    // debugger
    console.log(value);
    // console.log(mapObj);
    if (mapObj[value.toLowerCase()]) {
      console.log(mapObj[value.toLowerCase()]);
      return "@" + mapObj[value];
    }
    return value;
  });
  fs.writeFile(
    path.dirname(__filename) + "/result.less",
    result,
    "utf8",
    function(err) {
      if (err) return console.log(err);
    }
  );
  // console.log(result);
});

// console.log(Object.keys(mapObj));
