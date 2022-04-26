import { GoodsCategory } from '../../../../../types/goods/goods-categories.enum.ts';

/**
 * 处理图表数据，完善echarts Options
 * @param {*} baseOpts
 * @returns
 */
export const processChartData = (baseOpts, oriData) => {
  const colorList = [
    '#516b91',
    '#59c4e6',
    '#edafda',
    '#93b7e3',
    '#a5e7f0',
    '#cbb0e3',
  ];
  const seriesData = oriData.map((el, idx) => {
    const colorIdx = (idx % colorList.length) - 1;
    return {
      name: GoodsCategory[el.category],
      value: el.consumption,
      itemStyle: {
        color: colorList[colorIdx],
      },
    };
  });
  const series = {
    data: seriesData,
    type: 'pie',
    emphasis: {
      label: {
        show: true,
        fontSize: '20',
        fontWeight: 'bold',
      },
    },
    labelLine: {},
    radius: ['40%', '70%'],
    avoidLabelOverlap: false,
    itemStyle: {
      borderRadius: 8,
      borderColor: '#fff',
      borderWidth: 2,
    },
    label: {
      show: false,
      position: 'center',
    },
  };
  baseOpts.series = series;
  return baseOpts;
};
