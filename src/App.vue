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

        /* GRADIENT */
        --color-gradient-top: linear-gradient(0deg, #90f1efff, #ffd6e0ff, #ffef9fff, #c1fba4ff, #7bf1a8ff);
        --color-gradient-right: linear-gradient(90deg, #90f1efff, #ffd6e0ff, #ffef9fff, #c1fba4ff, #7bf1a8ff);
        --color-gradient-bottom: linear-gradient(180deg, #90f1efff, #ffd6e0ff, #ffef9fff, #c1fba4ff, #7bf1a8ff);
        --color-gradient-left: linear-gradient(270deg, #90f1efff, #ffd6e0ff, #ffef9fff, #c1fba4ff, #7bf1a8ff);
        --color-gradient-top-right: linear-gradient(45deg, #90f1efff, #ffd6e0ff, #ffef9fff, #c1fba4ff, #7bf1a8ff);
        --color-gradient-bottom-right: linear-gradient(135deg, #90f1efff, #ffd6e0ff, #ffef9fff, #c1fba4ff, #7bf1a8ff);
        --color-gradient-top-left: linear-gradient(225deg, #90f1efff, #ffd6e0ff, #ffef9fff, #c1fba4ff, #7bf1a8ff);
        --color-gradient-bottom-left: linear-gradient(315deg, #90f1efff, #ffd6e0ff, #ffef9fff, #c1fba4ff, #7bf1a8ff);
        --color-gradient-radial: radial-gradient(#90f1efff, #ffd6e0ff, #ffef9fff, #c1fba4ff, #7bf1a8ff);

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

