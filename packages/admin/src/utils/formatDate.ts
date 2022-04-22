/**
 * 格式化时间类型对象
 * @param t 时间对象
 * @param fmt 格式
 * @returns formattedTime
 */
export const format = function (t: Date, fmt: string) {
  const o = {
    'M+': t.getMonth() + 1, //月份
    'd+': t.getDate(), //日
    'h+': t.getHours(), //小时
    'm+': t.getMinutes(), //分
    's+': t.getSeconds(), //秒
    'q+': Math.floor((t.getMonth() + 3) / 3), //季度
    S: t.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (t.getFullYear() + '').substr(4 - RegExp.$1.length),
    );
  }
  for (const k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length),
      );
    }
  }
  return fmt;
};
