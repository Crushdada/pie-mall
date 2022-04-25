import Vue from 'vue';
import Component from 'vue-class-component';

type ChartOptions = Record<string, any>;
type Processor = (opts: ChartOptions, oriData: any) => ChartOptions;
interface RenderChartInterface {
  baseOpts: ChartOptions;
  oriData: any;
  processor: Processor;
}
@Component
export default class ChartInitMixin extends Vue {
  private echartsInstance = null;

  /**
   *  初始化echarts实例
   */
  getEchartsInstance(elementId: string) {
    const wrapper = document.querySelector(elementId);
    this.echartsInstance = (window as any).echarts.init(wrapper, {
      renderer: 'canvas',
    });
  }

  /**
   * 渲染echarts图表
   * @param baseOpts
   * @param processor
   */
  renderChart({ baseOpts, oriData, processor }: RenderChartInterface): void {
    const opts = processor(baseOpts, oriData);
    (this.echartsInstance as any).setOption(opts);
  }
}
