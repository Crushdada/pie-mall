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
    data: [
      '4月18日',
      '4月19日',
      '4月20日',
      '4月21日',
      '4月22日',
      '4月23日',
      '4月24日',
      '4月25日',
      '4月26日',
      '4月27日',
      '4月28日',
    ],
  },
  yAxis: { show: false },
  series: [],
};
