<template>
    <div class="card">
    <h1 class="card-title">Simple To-Do List App</h1>
        <ToDoList>eee</ToDoList>
    </div>

</template>

<script>
    import ToDoList from "./ToDoList";

    export default {
        name: "Card",
        components: { ToDoList },
        data() {
            return {
                toDoLists: []
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card {
        background-color: white;
        padding: 1em;
        width: 50%;
        max-width: 600px;
        min-width: 400px;
        min-height: 400px;
        margin: 0 auto;
        border-radius: 1em;
        flex-basis: 0;

        &-title {
            font-size: 20px;
            text-align: center;
            color: var(--color-red);
        }
    }
</style>
