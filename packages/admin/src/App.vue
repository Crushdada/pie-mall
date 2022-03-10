<template>
  <div id="app">
    <!-- <router-link to="/"></router-link> -->
    <!-- <router-link to="/about">About</router-link> -->
    <router-view />
  </div>
</template>

<style lang="scss">
@import '@/styles/base.scss';

#app {
  margin: 0;
  padding: 0;
  border: 0;
  font-family: 'MiSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  color: $primary;
}

* {
  touch-action: pan-x;
}

/* 
 * 解决element-ui 表格篡位的问题 👇 
 */
body .el-table th.gutter {
  display: table-cell !important;
}
.el-table th {
  display: table-cell !important;
}
::v-deep .el-table th.gutter {
  display: table-cell !important;
}
</style>
