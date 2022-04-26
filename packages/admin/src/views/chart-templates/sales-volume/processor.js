import { GoodsCategory } from '../../../../../types/goods/goods-categories.enum.ts';

/**
 * 处理图表数据，完善echarts Options
 * @param {*} baseOpts
 * @returns
 */
export const processChartData = (baseOpts, oriData) => {
  const header = oriData.shift();
  header.shift(); // 去掉t
  const seriesNums = header.length;
  const xAxisData = oriData.map(row => row[0]);
  const colorList = [
    '#3fb1e3',
    '#6be6c1',
    '#626c91',
    '#a0a7e6',
    '#c4ebad',
    '#96dee8',
  ];
  const seriesArr = [];
  for (let i = 0; i < seriesNums; i++) {
    const seriesData = oriData.map(row => row[i + 1]);
    const colorIdx = (i % colorList.length) - 1;
    const series = {
      name: GoodsCategory[header[i]],
      type: 'bar',
      itemStyle: {
        color: colorList[colorIdx],
      },
      // barWidth: 18,
      data: seriesData,
    };
    baseOpts.xAxis.data = xAxisData;
    seriesArr.push(series);
  }
  baseOpts.series = seriesArr;
  return baseOpts;
};
