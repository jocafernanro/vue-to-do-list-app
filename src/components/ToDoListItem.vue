<template>
    <label :class="['list-item', this.isCompleted && 'item-checked']" :for="id">
        <input class="list-item__checkbox"
               type="checkbox"
               :id="id"
               v-model="itemStatus"
               @change="itemStatusChanged()">
        <span class="list-item__text">{{ text }}</span>
        <span class="list-item__custom-checkbox"></span>
    </label>
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
            }
        }
    }
</script>

<style lang="scss" scoped>
    .list-item{
        &__checkbox {
            justify-self: center;
        }
    }

</style>
