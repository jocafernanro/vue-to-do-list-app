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
        --color-blue: #90f1efff;
        --color-pink: #ffd6e0ff;
        --color-yellow: #ffef9fff;
        --color-green-lighter: #c1fba4ff;
        --color-green: #7bf1a8ff;
        --color-red: #EE4540;
        --color-grey: #bfbfbf;
        --color-grey-light: #f2f2f2;
        --color-grey-lighter: #f3f3f3;

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

    body {
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

