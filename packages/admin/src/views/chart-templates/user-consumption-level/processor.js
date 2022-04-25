/**
 * 处理图表数据，完善echarts Options
 * @param {*} baseOpts
 * @returns
 */
export const processChartData = (baseOpts, oriData) => {
  const xAxisData = oriData.map(row => row.userName || '游客');
  const seriesData = oriData.map(row => row.consumption);
  baseOpts.xAxis.data = xAxisData;
  const primary = '#975FE4';
  const series = {
    type: 'bar',
    showSymbol: false,
    itemStyle: {
      color: '#00A8E8',
    },
    data: seriesData,
  };
  baseOpts.series.push(series);
  return baseOpts;
};
