/**
 * 处理图表数据，完善echarts Options
 * @param {*} baseOpts
 * @returns
 */
export const processChartData = (baseOpts, oriData) => {
  const colorList = ['#30a8e8', '#7D3AC1'];
  const stackName = 'role-stack';
  oriData.forEach(({ role, userNums }, idx) => {
    const seriesData = [{ name: role, value: userNums }];
    const borderRadius = {
      0: [25, 0, 0, 25],
      [oriData.length - 1]: [0, 25, 25, 0],
    }[idx];

    const series = {
      type: 'bar',
      showSymbol: false,
      itemStyle: {
        color: colorList[idx],
        borderRadius: borderRadius || 0,
      },
      barWidth: 18,
      stack: stackName,
      data: seriesData,
    };
    baseOpts.series = series;
  });

  return baseOpts;
};
