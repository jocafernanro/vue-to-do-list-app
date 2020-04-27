<template>
    <div class="card">
        <header class="header" >
            <div class="header__symbol"></div>
            <div class="header__info">
                <h1 class="header__title">{{ list.name }}</h1>
                <span class="header__tasks">{{ list.items.length }} tasks</span>
            </div>
        </header>
        <section class="list">
            <ToDoListItem v-for="item in list.items" :key="item.id"
                          :isCompleted="item.isCompleted"
                          :text="item.text"
                          :isRemove="item.isRemoved"
                          :id="item.id"
                          @itemChanged="itemStatusChanged"></ToDoListItem>
        </section>
        <footer><button type="button" @click="addItem">+</button></footer>
    </div>
</template>

<script>
    import ToDoListItem from "./ToDoListItem";

    export default {
        name: "ToDoList",
        components: {ToDoListItem},
        data() {
            return {
                list: {
                    id: 1,
                    name: 'Work',
                    items: [
                        {
                            id: 1,
                            isCompleted: false,
                            text: 'Hacer la compra',
                            isRemoved: false,
                        },
                        {
                            id: 2,
                            isCompleted: false,
                            text: 'Ir al gimnasio',
                            isRemoved: false,
                        },
                        {
                            id: 3,
                            isCompleted: false,
                            text: 'Avisar a mi hermano cuando vengan los niños',
                            isRemoved: false,
                        },
                        {
                            id: 4,
                            isCompleted: false,
                            text: 'Sacar la basura',
                            isRemoved: false,
                        },
                        {
                            id: 5,
                            isCompleted: false,
                            text: 'Firmar la autorización de la excursión de los niños',
                            isRemoved: false,
                        }
                    ]
                },
            }
        },
        methods: {
            itemStatusChanged(item) {
                this.list.items.map(o => {
                    if (item.id === o.id) Object.assign(o, {isCompleted: item.status})
                })
            },
            addItem(){
                const item = {
                    id: 6,
                    isCompleted: false,
                    text: 'Firmar la autorización de la excursión de los niños',
                    isRemoved: false,
                };
                this.list.items.push(item);
            }
        }
    }
</script>

<style lang="scss" scoped>
    .card{
        background-color: white;
        width: 90%;
        max-width: 25em;
        margin: 0 auto;
        padding: 2em 0;
        border-radius: 1.5em;
        box-shadow: 0 20px 50px rgba(230,230,230, 0.7);
    }

    .header{
        display: grid;
        grid-template-columns: 20% 80%;
        padding: 2em 0;

        &__title {
            margin: 0 0 .3em 0;
            padding: 0;
        }

        &__tasks {
            color: var(--color-grey);
        }


        &__symbol {
            justify-self: center;
            margin-top: .4em;
            width: 1em;
            height: 1em;
            border: double 4px transparent;
            border-radius: .6em;
            background-image: linear-gradient(white, white), radial-gradient(circle at top left, #f00,#3020ff);
            background-origin: border-box;
            background-clip: content-box, border-box;
        }
    }
</style>
