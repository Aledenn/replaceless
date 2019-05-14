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


/**
 * 文件遍历方法
 * @param filePath 需要遍历的文件路径
 */
function fileDisplay(filePath){
  //根据文件路径读取文件，返回文件列表
  fs.readdir(filePath,function(err,files){
      if(err){
          console.warn(err)
      }else{
          //遍历读取到的文件列表
          files.forEach(function(filename){
              //获取当前文件的绝对路径
              const filedir = path.join(filePath,filename);
              //根据文件路径获取文件信息，返回一个fs.Stats对象
              fs.stat(filedir,function(eror,stats){
                  if(eror){
                      console.warn('获取文件stats失败');
                  }else{
                      const isFile = stats.isFile();//是文件
                      const isDir = stats.isDirectory();//是文件夹
                      if(isFile){
                          wrap(filedir,filePath)
                      }
                      if(isDir){
                          fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
                      }
                  }
              })
          });
      }
  });
}

function wrap(filePath,baseUrl){
  if (/(.less)$/.test(filePath)) {
    replaceColor(filePath,baseUrl);
  }
}
// fs.readdir(filePath, "utf-8", function(err, data) {
//   data.forEach(function(item, index) {
//     if (/.less/.test(item)) {
//       replaceColor(filePath + "/" + item,filePath);
//     }
//   });
// });

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
fileDisplay(filePath)
