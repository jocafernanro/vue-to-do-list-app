<template>
    <div class="card">
        <header class="header" >
            <div class="header__symbol"></div>
            <div class="header__info">
                <h1 class="header__title">{{ list.name }}</h1>
                <div class="">
                    <span class="header__tasks">{{ list.items.length }} tasks</span>
                    <span class="header__tasks">{{ remaining }} remaining</span>
                    <span :class="['header__tasks', completed !== 0 && 'header__tasks--completed']">{{ completed }} completed</span>
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
        <transition name="slide-in-blurred-top">
            <section v-if="showAddNewItemModal" class="dialog">
                <AddToDo @addNewTask="addNewItem" @closeAddNewItemModal="closeAddNewItemModal"></AddToDo>
            </section>
        </transition>
        <footer class="footer"><button class="footer__button" type="button" @click="showNewItemModal">+</button></footer>
    </div>
</template>

<script>
    import ToDoListItem from "./ToDoListItem";
    import AddToDo from "./AddToDo";

    export default {
        name: "ToDoList",
        components: {ToDoListItem, AddToDo},
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
                showAddNewItemModal: false
            }
        },
        methods: {
            itemStatusChanged(item) {
                this.list.items.map(o => {
                    if (item.id === o.id) Object.assign(o, {isCompleted: item.status})
                })
            },
            showNewItemModal() {
                this.showAddNewItemModal = true
            },
            addNewItem(item){
                if (!item || typeof item === undefined) return;
                const newItem = {
                    id: this.list.items.length + 1,
                    isCompleted: false,
                    text: item.name,
                    isRemoved: false,
                };
                this.list.items.push(newItem);
                this.showAddNewItemModal = false
            },
            closeAddNewItemModal() {
                this.showAddNewItemModal = false
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
        position: absolute;
        background-color: white;
        width: 90%;
        max-width: 25em;
        left: 0;
        right: 0;
        margin-left: auto;
        margin-right: auto;
        padding: 2em 0;
        border-radius: 1.5em;
        box-shadow: 0 1.2em 3em rgba(230,230,230, 0.7);
        overflow: hidden;
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
                transition: ease .5s;
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

    .dialog {
        position: absolute;
        width: 100%;
        height: 100%;
        background: black;
        top: 0;
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
            box-shadow: 0 0 1em var(--color-blue) ;
            outline: none !important;

            &:hover {
                font-size: 16px;
            }

            &:active {
                font-size: 14px;
            }
        }
    }

    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
        opacity: 0;
    }

    .slide-in-blurred-top-enter, .slide-in-blurred-top-enter-active, .slide-in-blurred-top-leave-active {
        -webkit-animation: slide-in-blurred-top 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
        animation: slide-in-blurred-top 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
    }

    .slide-in-blurred-top-leave-to, .slide-in-blurred-top-leave-active {
        -webkit-animation: slide-out-blurred-top 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both;
        animation: slide-out-blurred-top 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both;
    }


    /**
     * ----------------------------------------
     * animation slide-in-blurred-top
     * ----------------------------------------
     */
    @-webkit-keyframes slide-in-blurred-top {
        0% {
            -webkit-transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
            transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
            -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
            -webkit-filter: blur(40px);
            filter: blur(40px);
            opacity: 0;
        }
        100% {
            -webkit-transform: translateY(0) scaleY(1) scaleX(1);
            transform: translateY(0) scaleY(1) scaleX(1);
            -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
            -webkit-filter: blur(0);
            filter: blur(0);
            opacity: 1;
        }
    }
    @keyframes slide-in-blurred-top {
        0% {
            -webkit-transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
            transform: translateY(-1000px) scaleY(2.5) scaleX(0.2);
            -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
            -webkit-filter: blur(40px);
            filter: blur(40px);
            opacity: 0;
        }
        100% {
            -webkit-transform: translateY(0) scaleY(1) scaleX(1);
            transform: translateY(0) scaleY(1) scaleX(1);
            -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
            -webkit-filter: blur(0);
            filter: blur(0);
            opacity: 1;
        }
    }

    /**
     * ----------------------------------------
     * animation slide-out-blurred-top
     * ----------------------------------------
     */
    @-webkit-keyframes slide-out-blurred-top {
        0% {
            -webkit-transform: translateY(0) scaleY(1) scaleX(1);
            transform: translateY(0) scaleY(1) scaleX(1);
            -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
            -webkit-filter: blur(0);
            filter: blur(0);
            opacity: 1;
        }
        100% {
            -webkit-transform: translateY(-1000px) scaleY(2) scaleX(0.2);
            transform: translateY(-1000px) scaleY(2) scaleX(0.2);
            -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
            -webkit-filter: blur(40px);
            filter: blur(40px);
            opacity: 0;
        }
    }
    @keyframes slide-out-blurred-top {
        0% {
            -webkit-transform: translateY(0) scaleY(1) scaleX(1);
            transform: translateY(0) scaleY(1) scaleX(1);
            -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
            -webkit-filter: blur(0);
            filter: blur(0);
            opacity: 1;
        }
        100% {
            -webkit-transform: translateY(-1000px) scaleY(2) scaleX(0.2);
            transform: translateY(-1000px) scaleY(2) scaleX(0.2);
            -webkit-transform-origin: 50% 0%;
            transform-origin: 50% 0%;
            -webkit-filter: blur(40px);
            filter: blur(40px);
            opacity: 0;
        }
    }



</style>
