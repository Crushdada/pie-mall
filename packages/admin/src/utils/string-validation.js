/**
 * 判断是否包含特殊字符串
 * @param String
 * @returns Boolean
 */
export const checkSpecialCharacter = str => {
  const p = new RegExp(
    "[`~!#$^&*()=|{}':;',\\[\\]<>/?~！#￥……&*（）——|{}【】‘；：”“'。，、？]",
  );
  if (p.test(str) || checkSpace(str)) {
    return true;
  } else {
    return false;
  }
};

/**
 * 判断是否包含空格
 * @param String
 * @returns Boolean
 */
export const checkSpace = str => {
  const reg = new RegExp(/\s/);
  return reg.test(str);
};
