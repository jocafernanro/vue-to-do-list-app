<template>
  <div id="app">
    <ToDoList></ToDoList>
  </div>
</template>

<script>
import ToDoList from "./components/ToDoList";

export default {
  name: 'App',
  components: {
    ToDoList
  }
}
</script>

<style>
  :root {
    --color-pink-clear: #F8B195;
    --color-pink: #F67280;
    --color-magenta: #C06C84;
    --color-purple: #6C5B7B;
    --color-blue: #355C7D;
    --color-grey: #bfbfbf;
    --color-grey-clear: #f3f3f3;

    --font-weight-regular: 500;
    --font-weight-bold: 700;
  }

  @media screen and (max-width: 750px) {
    :root {
      --me: red;

    }
  }

  @media screen and (max-width: 375px) {
    :root {
      --me: red;

    }
  }

  body{
    font-family: neue-haas-grotesk-display, sans-serif;
    background: white;
    font-size: 16px;
  }
</style>

<style lang="scss" scoped>
  #app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
</style>

