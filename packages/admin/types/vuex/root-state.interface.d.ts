import { VuexModuleName } from './enums/module-name.enum';
import { AuthModuleState } from './modules/auth/module-state.interface';

export declare interface VuexRootState {
  [VuexModuleName.AUTH]: AuthModuleState;
}
