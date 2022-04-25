/**
 * ecahrts实例基本配置
 */
export const baseOptions = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'line',
    },
  },
  grid: {
    width: '100%',
    height: '100%',
    x: 0,
    y: 0,
    x2: 0,
    y2: 0,
    containLabel: false,
  },
  splitLine: {
    show: false,
  },
  legend: {
    show: false,
  },
  xAxis: {
    show: false,
    type: 'category',
    data: [],
  },
  yAxis: { show: false },
  series: [],
};
