/**
 * ecahrts实例基本配置
 */
export const baseOptions = {
  tooltip: {
    formatter: '￥{c}  ({d}%)',
  },
  grid: {},
  splitLine: {
    show: false,
  },
  legend: {
    orient: 'vertical',
    right: 0,
  },
  xAxis: {
    show: false,
    type: 'category',
    data: [],
  },
  yAxis: {
    show: false,
    type: 'value',
  },
  series: [],
};
