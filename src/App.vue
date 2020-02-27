<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

div, body, h1, h2, h3, h4 {
  margin: 0px;
  padding: 0px;
}
h1 {
  font-size: 2.5em;
}
h2 {
  font-size: 2em;
}
h3 {
  font-size: 1em;
}
h4 {
  font-size: 0.8em;
}
body, html {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
body {
  overflow-y: auto;
}
#app {
  font-family: 'Roboto', sans-serif;
  color: #fff;
  font-size: 16px;
  width: 100%;
  min-height: 100% !important;
}
</style>
