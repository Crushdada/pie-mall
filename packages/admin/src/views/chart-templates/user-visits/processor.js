const originalData = [15, 33, 2, 17, 36, 44, 29, 0, 23, 38, 19, 57];

/**
 * 处理图表数据，完善echarts Options
 * @param {*} baseOpts
 * @returns
 */
export const processChartData = (baseOpts, oriData) => {
  const primary = '#FF455F';
  const series = {
    type: 'line',
    showSymbol: false,
    lineStyle: {
      color: primary,
    },
    itemStyle: {
      color: primary,
    },
    areaStyle: {
      color: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: primary, // 0% 处的颜色
          },
          {
            offset: 1,
            color: '#FFC0CB', // 100% 处的颜色
          },
        ],
        global: false, // 缺省为 false
      },
      opacity: 0.5,
    },
    data: originalData,
  };
  baseOpts.series = series;
  return baseOpts;
};
