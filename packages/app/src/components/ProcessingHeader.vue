<template>
  <el-header
    class="header flex flex-row flex-nowrap justify-between items-center"
    style="height: 100px; padding: 0 160px; color: #757575"
  >
    <div
      class="flex flex-row flex-nowrap justify-around items-center space-x-4"
    >
      <img
        class="mr-6 object-cover object-center cursor-pointer"
        style="width: 56px; height: 56px"
        src="@/assets/pie-app-logo.svg"
        alt="pie mall logo"
      />
      <h1 style="font-size: 28px">{{ title }}</h1>
      <span class="text-xs self-end pb-3">
        {{desc}}
      </span>
    </div>

    <div class="right-tab text-xs">
      <PersonalDropdownMenu style="color: #757575" />
      <span class="divider">|</span>
      <a class="pl-4" @click="() => $router.push({ name: 'order' })">
        我的订单
      </a>
    </div>
  </el-header>
</template>

<script lang="ts">
import Vue from 'vue';
import Component from 'vue-class-component';
import PersonalDropdownMenu from './home/personal-dropdown-menu.vue';
import { Prop } from 'vue-property-decorator';

@Component({
  components: { PersonalDropdownMenu },
})
export default class ProcessingHeader extends Vue {
  @Prop({ type: String, default: 'Pie-Mall' }) readonly title!: string;
  @Prop({ type: String }) readonly desc!: string;

  /** Hooks*/
  // ===================================================================
  /** Methods*/
  // ===================================================================
}
</script>
<style lang="scss" scoped>
@import '@/styles/base.scss';
h1 {
  color: $dark-text;
}
.header {
  box-shadow: 0 2px 5px 0 hsl(0deg 0% 24% / 10%);
  border-bottom: 2px $primary solid;
}
</style>
