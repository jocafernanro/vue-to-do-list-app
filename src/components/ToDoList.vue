<template>
    <div class="to-do-list">
        <ToDoItem class="to-do-list"
                  v-for="item in toDoItemList" :key="item.id"
                  :isCompleted="item.isCompleted"
                  :text="item.text"
                  :isRemove="item.isRemoved"
                  :id="item.id"
                  @itemChanged="itemStatusChanged"></ToDoItem>
    </div>
</template>

<script>
    import ToDoItem from "./ToDoItem";

    export default {
        name: "ToDoList",
        components: {ToDoItem},
        data() {
            return {
                toDoItemList: [
                    {
                        id: 0,
                        isCompleted: false,
                        text: 'Hacer la compra',
                        isRemoved: false,
                    },
                    {
                        id: 1,
                        isCompleted: false,
                        text: 'Ir al gimnasio',
                        isRemoved: false,
                    }
                ]
            }
        },
        methods: {
            itemStatusChanged(item) {
                this.toDoItemList.map(o => {
                    if (item.id === o.id) Object.assign(o, {isCompleted: item.status})
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .to-do-list {
        display: block;
        width: 80%;
        margin: 0 auto;
        cursor: pointer;
    }
</style>
