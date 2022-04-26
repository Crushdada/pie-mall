/**
 * 用户数据分析接口
 */
export interface UserAnalysisInterface {
  diffRoleUserNums: Array<{
    role: string;
    userNums: string | number;
  }>;
  dailyNewNums: string | number;
}
