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
  font-family: 'MiSans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  color: $primary;
}

</style>
