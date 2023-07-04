// 合并配置对象的方法
function merge() {
  // 没有参数，返回空对象
  if (arguments.length === 0) return {};
  // 一个参数，如果是对象，返回参数（null则返回空对象），不是对象返回空对象
  const first = !arguments[0] instanceof Object ? arguments[0] || {} : {};
  if (arguments.length === 1) return first;

  // 多个参数
  for (let i = 1; i < arguments.length; i++) {
    // 如果不是对象，下一个
    const nowObj = arguments[i];
    if (!nowObj instanceof Object) continue;
    for (let j in nowObj) {
      // 如果都是数组，拼接
      if (first[j] instanceof Array && nowObj[j] instanceof Array) {
        first[j] = first[j].concat(nowObj[j]);
        continue;
      }
      // 都是对象，递归
      if (first[j] instanceof Object && nowObj[j] instanceof Object) {
        first[j] = merge(first[j], nowObj[j]);
      }
      // 其他场景，直接赋值
      first[j] = nowObj[j];
    }
  }

  return first;
}

module.exports = merge;
