/**
 * 处理图表数据，完善echarts Options
 * @param {*} baseOpts
 * @returns
 */
export const processChartData = (baseOpts, oriData) => {
  oriData.reverse();
  const colorList = ['#5B74E9', '#1DB498', '#55c3d7', '#f8cd6b', '#f06438'];
  const borderRadius = 25;
  const seriesData = oriData.reduce((dict, { goodsName, consumption }, idx) => {
    const dataItem = {
      name: goodsName,
      value: consumption,
      itemStyle: {
        color: colorList[idx],
        borderRadius: borderRadius,
      },
    };
    dict.push(dataItem);
    return dict;
  }, []);
  const series = {
    type: 'bar',
    showSymbol: false,
    barWidth: 15,
    data: seriesData,
  };
  baseOpts.series.push(series);
  return baseOpts;
};
