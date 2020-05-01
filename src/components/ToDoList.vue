<template>
    <div class="card">
        <header class="header" >
            <div class="header__symbol"></div>
            <div class="header__info">
                <h1 class="header__title">{{ list.name }}</h1>
                <div class="">
                    <span class="header__tasks">{{ list.items.length }} tasks</span>
                    <span class="header__tasks">{{ remaining }} remaining</span>
                    <span class="header__tasks header__tasks--completed">{{ completed }} completed</span>
                </div>
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
        <footer class="footer"><button class="footer__button" type="button" @click="addItem">+</button></footer>
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
        },
        computed: {
            remaining() {
                return this.list.items.filter(todo => !todo.isCompleted).length || 0
            },
            completed() {
                return this.list.items.filter(todo => todo.isCompleted).length || 0
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
        box-shadow: 0 1.2em 3em rgba(230,230,230, 0.7);
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
            padding: 0 .5em 0 0;
            color: var(--color-grey);
            &--completed{
                color: var(--color-green-lighter);
            }
        }

        &__symbol {
            justify-self: center;
            margin-top: .4em;
            width: 1em;
            height: 1em;
            border: double 4px transparent;
            border-radius: .6em;
            background-image: linear-gradient(white, white), radial-gradient(circle at top left, var(--color-green), var(--color-blue));
            background-origin: border-box;
            background-clip: content-box, border-box;
        }
    }

    .list {
        overflow-y: scroll;
        height: 20em;
        &::-webkit-scrollbar {
            width: .5em;
            height: .5em;
            display: compact;
        }

        &::-webkit-scrollbar-thumb {
            background: #ccc;
            border-radius: 4px;
        }

        &::-webkit-scrollbar-thumb:hover {
            background: #b3b3b3;
            box-shadow: 0 0 2px 1px rgba(0, 0, 0, 0.2);
        }

        &::-webkit-scrollbar-thumb:active {
            background-color: #999999;
        }

        &::-webkit-scrollbar-track {
            background: #e1e1e1;
            border-radius: 4px;
        }

        &::-webkit-scrollbar-track:hover,
        &::-webkit-scrollbar-track:active {
            background: #d4d4d4;
        }
    }

    .footer {
        padding: 1em 0 0 2em;
        height: 2.5em;
        &__button {
            cursor: pointer;
            font-size: 15px;
            color: white;
            background-color: var(--color-blue);
            border: none;
            border-radius: 1.2em;
            width: 3em;
            height: 3em;

            &:hover {
                background-color: rgba(86,0,243, 0.8);
            }

            &:active {
                font-size: 14px;
            }
        }
    }

</style>
