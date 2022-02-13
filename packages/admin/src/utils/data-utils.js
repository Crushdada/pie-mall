import XLSX from 'xlsx';

/**
 *
 * @param {*} uint8Array
 * @returns JSON
 */
export const uint8Array2JSON = rawData => {
  if (!rawData) return undefined;
  // 如果是已经处理后的
  if (Object.prototype.toString.call(rawData[0]) === '[object Array]')
    return rawData;

  const workbook = XLSX.read(rawData, {
    type: 'array',
  });

  const { SheetNames, Sheets } = workbook;

  const parsedJSON = XLSX.utils.sheet_to_json(Sheets[SheetNames[0]]);

  return parsedJSON;
  // transform to dataset
  //   const keys = Object.keys(parsedJSON[0]);
  //   return parsedJSON.map(ele => {
  //     return keys.map(el => {
  //       return ele[el];
  //     });
  //   });
};
