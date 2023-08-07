/*
 * @Author: fujunling 2984387807@qq.com
 * @Date: 2023-08-07 10:55:38
 * @LastEditors: fujunling 2984387807@qq.com
 * @LastEditTime: 2023-08-07 11:32:04
 * @FilePath: \vue2-admin-template\src\utils\color.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */
/*
 * @Author: fujunling 2984387807@qq.com
 * @Date: 2023-08-07 10:55:38
 * @LastEditors: fujunling 2984387807@qq.com
 * @LastEditTime: 2023-08-07 11:03:08
 * @FilePath: \vue2-admin-template\src\utils\color.js
 * @Description: 关于颜色的配置
 */
/**
 * @description: 16进制颜色转rgb颜色
 * @param {String} hex ：16进制颜色
 * @return {String}  rgb颜色
 */
function hexToRgb(hex) {
  // 移除输入的颜色值中的 # 符号
  hex = hex.replace('#', '');

  // 将颜色值分割成红、绿、蓝三个部分
  var r = parseInt(hex.substr(0, 2), 16);
  var g = parseInt(hex.substr(2, 2), 16);
  var b = parseInt(hex.substr(4, 2), 16);

  // 构造RGB颜色表示
  return `rgb(${r},${g},${b})`
}
/**
 * @description: rgb颜色取反
 * @param {String} color
 * @return {String}
 */
function getComplementaryColorRGB(color) {
  var r = 255 - color.r
  var g = 255 - color.g
  var b = 255 - color.b
  return `rgb(${r},${g},${b})`
}

export default {
  getComplementaryColorRGB,
  hexToRgb
}
