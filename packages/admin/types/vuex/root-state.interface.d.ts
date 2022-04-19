import { VuexModuleName } from './enums/module-name.enum';
import { AuthModuleState } from './modules/auth/module-state.interface';
import { GoodsModuleState } from './modules/goods/module-state.interface';
import { UserModuleState } from './modules/user/module-state.interface';
import { OrderModuleState } from './modules/order/module-state.interface';

export declare interface VuexRootState {
  [VuexModuleName.AUTH]: AuthModuleState;
  [VuexModuleName.USER]: UserModuleState;
  [VuexModuleName.GOODS]: GoodsModuleState;
  [VuexModuleName.ORDER]: OrderModuleState;
}
