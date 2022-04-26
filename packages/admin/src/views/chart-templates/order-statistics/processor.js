/**
 * 处理图表数据，完善echarts Options
 * @param {*} baseOpts
 * @returns
 */
export const processChartData = (baseOpts, oriData) => {
  const xAxisData = oriData.map(row => row.create_at);
  const seriesData = oriData.map(row => row.orderCounts);
  baseOpts.xAxis.data = xAxisData;
  const primary = '#975FE4';
  const series = {
    type: 'line',
    smooth: true,
    showSymbol: false,
    labelLine: 'smooth',
    lineStyle: {
      color: primary,
    },
    itemStyle: {
      color: primary,
    },
    areaStyle: {
      color: primary,
      opacity: 1,
    },
    data: seriesData,
  };
  baseOpts.series = series;
  return baseOpts;
};
