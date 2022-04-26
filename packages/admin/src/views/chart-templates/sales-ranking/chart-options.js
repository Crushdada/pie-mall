/**
 * ecahrts实例基本配置
 */
export const baseOptions = {
  tooltip: {
    formatter: '{b0}: ￥{c0}',
  },
  grid: {
    width: '90%',
    height: '80%',
    left: 20,
    bottom: 20,
    containLabel: false,
  },
  splitLine: {
    show: false,
  },
  legend: {},
  xAxis: {
    show: false,
    type: 'value',
    data: [],
  },
  yAxis: {
    show: false,
    type: 'category',
  },
  series: [],
};
