<template>
    <div class="modal">
        <font-awesome-icon class="modal__close" icon="times" @click="closeAddNewItemModal"/>
        <h2 class="modal__title">Add new task</h2>
        <input class="modal__name" placeholder="task name" type="text" v-model="name">
        <select class="modal__list" name="add-new-item" v-model="list">
            <option selected>Work</option>
        </select>
        <button class="modal__button" type="button" @click="addNewItem"> Add task</button>
    </div>
</template>

<script>
    export default {
        name: "AddToDo",
        data() {
            return {
                name: '',
                list: ''
            }
        },
        methods: {
            addNewItem() {
                this.$emit('addNewTask', {name: this.name, list: this.list });
            },
            closeAddNewItemModal() {
                this.$emit('closeAddNewItemModal')
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal {
        background-color: #f3f3f3;
        width: 100%;
        height: 100%;
        opacity: 1;
        padding: 40% 15%;

        &__title {
            margin: 0;
            padding: 1em 0 1em 0;
            font-weight: var(--font-weight-bold);
        }

        &__name {
            color: var(--color-grey);
            margin: 0 0 1em 0;
            border: none;
            padding: 1em;
            width: 60%;
            display: block;
            border-radius: 1em;
            outline: none !important;
            &::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
                color: var(--color-grey);;
                opacity: 1; /* Firefox */
            }

            &:-ms-input-placeholder { /* Internet Explorer 10-11 */
                color: var(--color-grey);;
            }

            &::-ms-input-placeholder { /* Microsoft Edge */
                color: var(--color-grey);;
            }
        }
        &__list {
            margin: 0 0 1em 0;
            width: 68%;
            padding: 1em;
            border: none;
            border-radius: 1em;
            display: block;
            outline: none !important;
            color: var(--color-grey);
        }
        &__button {
            margin: 0 0 1em 0;
            border: none;
            border-radius: 1em;
            padding: 1em;
            background-color: var(--color-green);
            color: white;
            outline: none !important;
            cursor: pointer;
            &:hover {
                font-size: 17px;
            }
            &:active {
                font-size: 15px;
            }

        }
        &__close {
            cursor: pointer;

        }
    }
</style>
