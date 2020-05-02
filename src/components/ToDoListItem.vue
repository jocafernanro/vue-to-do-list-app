<template>
    <div class="list-item-container">
        <label :for="id" class="list-item">
            <input class="list-item__checkbox"
                   type="checkbox"
                   :id="id"
                   v-model="itemStatus"
                   @change="itemStatusChanged()">
            <label class="list-item__text" :for="id">{{ text }}</label>
        </label>
        <font-awesome-icon v-if="isCompleted" class="list-item__remove" icon="minus" @click="removeItem"/>
    </div>
</template>

<script>
    export default {
        name: "ToDoListItem",
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
            },
            removeItem() {
                this.$emit('removeItem', this.id)
            }
        }
    }
</script>

<style lang="scss" scoped>

    .list-item-container {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
    }

    .list-item {
        padding: .8em 2em .8em 1.8em;
        cursor: pointer;
        display: flex;
        width: 100%;

        input[type="checkbox"] {
            opacity: 0;
            position: absolute;
            width: 0;
            height: 0;
            z-index: -1;

            &:checked {
                + label:after {
                    content: "";
                }

                + label:before {
                    display: none;
                }

                + label {
                    text-decoration: line-through;
                    color: var(--color-green-lighter);
                    transition: ease .5s;
                }
            }
        }

        &__text {
            position: relative;
            display: inline-block;
            padding-left: 3em;
            cursor: pointer;
            transition: ease 2s;

            &:before,
            &:after {
                position: absolute;
                left: 0;
                top: 0;
            }

            &:before {
                content: "";
                display: inline-block;
                height: 9px;
                width: 16px;
                border-bottom: 2px solid;
            }

            &:after {
                content: none;
                height: 5px;
                width: 9px;
                border-left: 2px solid;
                border-bottom: 2px solid;
                transform: rotate(-45deg);
                left: 4px;
                top: 4px;
            }
        }

        &__remove {
            color: var(--color-pink);
            transition: ease 1s;
            align-self: flex-start;
            padding: .9em 2em 0 0;
            cursor: pointer;
        }

    }


</style>
