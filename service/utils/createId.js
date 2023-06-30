function createId() {
  const timestamp = new Date().getTime().toString(); // 获取当前时间戳
  const randomString = Math.random().toString(36).substring(2); // 生成随机字符串
  const uniqueString = timestamp + randomString; // 结合时间戳和随机字符串
  return uniqueString;
}
module.exports = createId