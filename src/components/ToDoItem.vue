<template>
    <label class="todo-list-container" :for="id">
        <span class="todo-list-container__text">{{ text }}</span>
        <input class="todo-list-container__checkbox"
               type="checkbox"
               :id="id"
               v-model="itemStatus"
               @change="itemStatusChanged()">
        <span class="todo-list-container__custom-checkbox"></span>
    </label>
</template>

<script>
    export default {
        name: "ToDoItem",
        props: {
            id: Number,
            isCompleted: Boolean,
            text: String,
            isRemoved: Boolean
        },
        data() {
            return {
                itemStatus: this.isCompleted
            }
        },
        methods: {
            itemStatusChanged() {
                this.$emit('itemChanged', {id: this.id, status: this.itemStatus});
            }
        }
    }
</script>

<style lang="scss" scoped>
    input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Customize the label (the container) */
    .todo-list-container {
        display: block;
        position: relative;
        padding-left: 35px;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 22px;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    /* Hide the browser's default checkbox */
    .todo-list-container input {
        position: absolute;
        opacity: 0;
        cursor: pointer;
        height: 0;
        width: 0;
    }

    /* Create a custom checkbox */
    .todo-list-container__custom-checkbox {
        position: absolute;
        top: 0;
        left: 0;
        height: 25px;
        width: 25px;
        background-color: #eee;
    }

    /* On mouse-over, add a grey background color */
    .todo-list-container:hover input ~ .todo-list-container__custom-checkbox {
        background-color: #ccc;
    }

    /* When the checkbox is checked, add a blue background */
    .todo-list-container input:checked ~ .todo-list-container__custom-checkbox {
        background-color: #2196F3;
    }

    .todo-list-container__checkbox:checked ~ .todo-list-container {
        color: red;
        text-decoration:line-through;
    }

    /* Create the checkmark/indicator (hidden when not checked) */
    .todo-list-container__custom-checkbox:after {
        content: "";
        position: absolute;
        display: none;
    }

    /* Show the checkmark when checked */
    .todo-list-container input:checked ~ .todo-list-container__custom-checkbox:after {
        display: block;
    }

    /* Style the checkmark/indicator */
    .todo-list-container .todo-list-container__custom-checkbox:after {
        left: 9px;
        top: 5px;
        width: 5px;
        height: 10px;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }


</style>
