<template>
  <SudokuBoard />
</template>

<script>
import SudokuBoard from './components/SudokuBoard.vue'

export default {
  name: 'App',
  components: {
    SudokuBoard
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
