/**
 * admin请求订单分析数据接口
 */
export interface OrderAnalysisInterface {
  recentOrders: Array<{ create_at: string; orderCounts: number }>;
  totalOrderCounts: number;
}
