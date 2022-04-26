/**
 * ecahrts实例基本配置
 */
export const baseOptions = {
  tooltip: {
    trigger: 'item',
  },
  legend: {},
  grid: {
    top: 80,
    left:'auto',
    bottom: 20,
    width: '80%',
    height: '75%',
    containLabel: false,
  },
  axisLine: { show: true },
  axisTick: {
    show: true,
  },
  xAxis: {
    show: true,
    type: 'category',
    data: [],
  },
  yAxis: { show: true, type: 'value' },
  series: [],
};
