<template>
    <label :class="['todo-list-container', this.isCompleted && 'item-checked']" :for="id">
        <input class="todo-list-container__checkbox"
               type="checkbox"
               :id="id"
               v-model="itemStatus"
               @change="itemStatusChanged()">
        <span class="todo-list-container__text">{{ text }}</span>
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
        padding: .8em 1em .8em 3em;
        margin-bottom: 12px;
        cursor: pointer;
        font-size: 1.1em;
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
        border-radius: .5em;
        letter-spacing: .05em;
        color: #6C5B7B;

        &:hover{
            background-color: aliceblue;
        }
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
        top: 0.8em;
        left: 0.8em;
        height: 1.2em;
        width:1.2em;
        border-radius: 0.2em;
        border: 1px solid var(--color-pink);
    }

    /* On mouse-over, add a grey background color */
    .todo-list-container:hover input ~ .todo-list-container__custom-checkbox {
        background-color: #eeeeee;
    }

    /* When the checkbox is checked, add a blue background */
    .todo-list-container input:checked ~ .todo-list-container__custom-checkbox {
        background-color: var(--color-pink-clear);
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
        top: 0.3em;
        left: 0.4em;
        width: 0.2em;
        height: .4em;
        border: solid white;
        border-width: 0 3px 3px 0;
        -webkit-transform: rotate(45deg);
        -ms-transform: rotate(45deg);
        transform: rotate(45deg);
    }

    .item-checked {
        text-decoration: line-through;

    }


</style>
