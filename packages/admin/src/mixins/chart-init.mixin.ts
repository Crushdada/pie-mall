import Vue from 'vue';
import Component from 'vue-class-component';

export type ChartOptions = Record<string, any>;
export type Processor = (opts: ChartOptions) => ChartOptions;
@Component
export default class ChartInitMixin extends Vue {
  private echartsInstance = null;
  /** Hooks*/
  // ===================================================================
  mounted() {
    this.getEchartsInstance();
  }
  /**
   *  初始化echarts实例
   */
  getEchartsInstance() {
    const wrapper = document.querySelector('.chart-slot');
    // const { width, height } = wrapper?.getBoundingClientRect();
    this.echartsInstance = (window as any).echarts.init(wrapper, {
      renderer: 'canvas',
    });
  }

  /**
   * 渲染echarts图表
   * @param baseOpts
   * @param processor
   */
  renderChart(baseOpts: ChartOptions, processor: Processor): void {
    const opts = processor(baseOpts);
    (this.echartsInstance as any).setOption(opts);
  }
}
