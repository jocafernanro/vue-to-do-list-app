<template>
    <div class="modal">
        <font-awesome-icon class="modal__close" icon="times" @click="closeAddNewItemModal"/>
        <h2 class="modal__title">Add new task</h2>
        <input :class="['modal__name', error.onEmptyTaskName && 'modal__name--error']" placeholder="Task name" type="text" v-model="name">
        <span v-if="error.onEmptyTaskName" class="modal__error">Enter a valid task name</span>
        <select :class="['modal__list', error.onEmptyListName && 'modal__list--error']" name="add-new-item" v-model="list">
            <option value="" selected disabled hidden>Select a task...</option>
            <option >{{ this.listName }}</option>
        </select>
        <span v-if="error.onEmptyListName" class="modal__error">Enter a valid list</span>
        <button class="modal__button" type="button" @click="addNewItem"> Add task</button>
    </div>
</template>

<script>
    export default {
        name: "AddToDo",
        props: {
          listName: String
        },
        data() {
            return {
                name: '',
                list: '',
                error: {
                    onEmptyTaskName: false,
                    onEmptyListName: false
                }

            }
        },
        methods: {
            addNewItem() {
                !!this.name && !!this.list
                    ? this.$emit('addNewTask', {name: this.name, list: this.list })
                    : this.manageError();
            },
            closeAddNewItemModal() {
                this.$emit('closeAddNewItemModal')
            },
            manageError() {
                this.error.onEmptyTaskName = !this.name;
                this.error.onEmptyListName = !this.list;
            }
        }
    }
</script>

<style lang="scss" scoped>
    .modal {
        background-color: white;
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
            margin: 0;
            border: none;
            padding: 1em;
            width: 60%;
            display: block;
            border-radius: 1.5em;
            box-shadow: 0 3px 6px var(--color-grey-lighter), 0 3px 6px var(--color-grey-lighter);
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

            &--error {
                border: 1px solid red;
            }
        }

        &__list {
            margin: 1em 0 0 0;
            width: 68%;
            padding: 1em;
            border: none;
            border-radius: 1.5em;
            box-shadow: 0 3px 6px var(--color-grey-lighter), 0 3px 6px var(--color-grey-lighter);
            display: block;
            outline: none !important;
            color: var(--color-grey);

            &--error {
                border: 1px solid red;
            }
        }

        &__button {
            margin: 1em 0 1em 0;
            border: none;
            padding: 1em;
            background-color: var(--color-green);
            color: white;
            outline: none !important;
            cursor: pointer;
            border-radius: 1.3em;
            box-shadow: 0 0 1em var(--color-green) ;
            &:hover {
                font-size: 17px;
            }
            &:active {
                font-size: 15px;
            }

        }

        &__close {
            position: absolute;
            top: 11%;
            right: 18%;
        }

        &__error {
            color: red;
            font-size: 0.6em;
            display: block;
            margin: 1em 0;
        }

    }
</style>
