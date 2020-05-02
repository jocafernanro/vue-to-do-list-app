<template>
    <div class="card">

        <!--  Header Section  -->
        <header class="header">
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

        <!--  List Section  -->
        <section class="list">
            <div class="empty-panel" v-if="this.list.items.length <= 0">
                <span class="empty-panel__info">Your list is empty.</span>
            </div>
            <transition-group name="slide-blurred-left">
                <ToDoListItem v-for="item in list.items" :key="item.id"
                              :isCompleted="item.isCompleted"
                              :text="item.text"
                              :isRemove="item.isRemoved"
                              :id="item.id"
                              @itemChanged="itemStatusChanged"
                              @removeItem="removeItem"></ToDoListItem>
            </transition-group>
        </section>

        <!--   Add New Item Modal   -->
        <transition name="slide-in-blurred-top">
            <section v-if="showAddNewItemModal" class="dialog">
                <AddToDo @addNewTask="addNewItem" @closeAddNewItemModal="closeAddNewItemModal"
                         :listName="this.list.name"></AddToDo>
            </section>
        </transition>

        <!--  Footer/Button section   -->
        <footer class="footer">
            <button class="footer__button" type="button" @click="showNewItemModal">+</button>
        </footer>
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
                    name: 'Personal',
                    items: [
                        {
                            id: 1,
                            isCompleted: false,
                            text: 'Your first item :D You can create more! Click over it to complete the task, and then, click the red icon to remove it from the list.',
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
            addNewItem(item) {
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
            },
            removeItem(itemId) {
                this.list.items = this.list.items.filter(item => Number(item.id) !== Number(itemId))
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
    .card {
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
        box-shadow: 0 1.2em 3em rgba(230, 230, 230, 0.7);
        overflow: hidden;
    }

    .header {
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

            &--completed {
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
            box-shadow: 0 0 1em var(--color-blue);
            outline: none !important;

            &:hover {
                font-size: 16px;
            }

            &:active {
                font-size: 14px;
            }
        }
    }

    .empty-panel {
        padding: 0 0 0 5em;
        transition: ease-in-out 3s;

        &__info {
            color: var(--color-grey);
            line-height: .5em;
        }
    }


    /* Animations */
    .fade-enter-active, .fade-leave-active {
        transition: opacity .5s;
    }

    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */
    {
        opacity: 0;
    }

    .slide-in-blurred-top-enter, .slide-in-blurred-top-enter-active {
        -webkit-animation: slide-in-blurred-top 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
        animation: slide-in-blurred-top 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
    }

    .slide-in-blurred-top-leave-to, .slide-in-blurred-top-leave-active {
        -webkit-animation: slide-out-blurred-top 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both;
        animation: slide-out-blurred-top 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both;
    }

    .slide-blurred-left-enter, .slide-blurred-left-enter-active {
        -webkit-animation: slide-in-blurred-left 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
        animation: slide-in-blurred-left 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
    }

    .slide-blurred-left-leave-to, .slide-blurred-left-leave-active {
        -webkit-animation: slide-out-blurred-left 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both;
        animation: slide-out-blurred-left 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both;
    }

    .flicker-in-enter, .flicker-in-enter-active, .flicker-in-leave-to, .flicker-in-leave-active {
        -webkit-animation: flicker-in-1 2s linear both;
        animation: flicker-in-1 2s linear both;
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


    /**
     * ----------------------------------------
     * animation slide-in-blurred-left
     * ----------------------------------------
     */
    @-webkit-keyframes slide-in-blurred-left {
        0% {
            -webkit-transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
            transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
            -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
            -webkit-filter: blur(40px);
            filter: blur(40px);
            opacity: 0;
        }
        100% {
            -webkit-transform: translateX(0) scaleY(1) scaleX(1);
            transform: translateX(0) scaleY(1) scaleX(1);
            -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
            -webkit-filter: blur(0);
            filter: blur(0);
            opacity: 1;
        }
    }

    @keyframes slide-in-blurred-left {
        0% {
            -webkit-transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
            transform: translateX(-1000px) scaleX(2.5) scaleY(0.2);
            -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
            -webkit-filter: blur(40px);
            filter: blur(40px);
            opacity: 0;
        }
        100% {
            -webkit-transform: translateX(0) scaleY(1) scaleX(1);
            transform: translateX(0) scaleY(1) scaleX(1);
            -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
            -webkit-filter: blur(0);
            filter: blur(0);
            opacity: 1;
        }
    }

    /**
     * ----------------------------------------
     * animation slide-out-blurred-left
     * ----------------------------------------
     */
    @-webkit-keyframes slide-out-blurred-left {
        0% {
            -webkit-transform: translateX(0) scaleY(1) scaleX(1);
            transform: translateX(0) scaleY(1) scaleX(1);
            -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
            -webkit-filter: blur(0);
            filter: blur(0);
            opacity: 1;
        }
        100% {
            -webkit-transform: translateX(-1000px) scaleX(2) scaleY(0.2);
            transform: translateX(-1000px) scaleX(2) scaleY(0.2);
            -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
            -webkit-filter: blur(40px);
            filter: blur(40px);
            opacity: 0;
        }
    }

    @keyframes slide-out-blurred-left {
        0% {
            -webkit-transform: translateX(0) scaleY(1) scaleX(1);
            transform: translateX(0) scaleY(1) scaleX(1);
            -webkit-transform-origin: 50% 50%;
            transform-origin: 50% 50%;
            -webkit-filter: blur(0);
            filter: blur(0);
            opacity: 1;
        }
        100% {
            -webkit-transform: translateX(-1000px) scaleX(2) scaleY(0.2);
            transform: translateX(-1000px) scaleX(2) scaleY(0.2);
            -webkit-transform-origin: 100% 50%;
            transform-origin: 100% 50%;
            -webkit-filter: blur(40px);
            filter: blur(40px);
            opacity: 0;
        }
    }

    /**
     * ----------------------------------------
     * @animation flicker-in-1
     * ----------------------------------------
     */
    @-webkit-keyframes flicker-in-1 {
        0% {
            opacity: 0;
        }
        10% {
            opacity: 0;
        }
        10.1% {
            opacity: 1;
        }
        10.2% {
            opacity: 0;
        }
        20% {
            opacity: 0;
        }
        20.1% {
            opacity: 1;
        }
        20.6% {
            opacity: 0;
        }
        30% {
            opacity: 0;
        }
        30.1% {
            opacity: 1;
        }
        30.5% {
            opacity: 1;
        }
        30.6% {
            opacity: 0;
        }
        45% {
            opacity: 0;
        }
        45.1% {
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        55% {
            opacity: 1;
        }
        55.1% {
            opacity: 0;
        }
        57% {
            opacity: 0;
        }
        57.1% {
            opacity: 1;
        }
        60% {
            opacity: 1;
        }
        60.1% {
            opacity: 0;
        }
        65% {
            opacity: 0;
        }
        65.1% {
            opacity: 1;
        }
        75% {
            opacity: 1;
        }
        75.1% {
            opacity: 0;
        }
        77% {
            opacity: 0;
        }
        77.1% {
            opacity: 1;
        }
        85% {
            opacity: 1;
        }
        85.1% {
            opacity: 0;
        }
        86% {
            opacity: 0;
        }
        86.1% {
            opacity: 1;
        }
        100% {
            opacity: 1;
        }
    }

    @keyframes flicker-in-1 {
        0% {
            opacity: 0;
        }
        10% {
            opacity: 0;
        }
        10.1% {
            opacity: 1;
        }
        10.2% {
            opacity: 0;
        }
        20% {
            opacity: 0;
        }
        20.1% {
            opacity: 1;
        }
        20.6% {
            opacity: 0;
        }
        30% {
            opacity: 0;
        }
        30.1% {
            opacity: 1;
        }
        30.5% {
            opacity: 1;
        }
        30.6% {
            opacity: 0;
        }
        45% {
            opacity: 0;
        }
        45.1% {
            opacity: 1;
        }
        50% {
            opacity: 1;
        }
        55% {
            opacity: 1;
        }
        55.1% {
            opacity: 0;
        }
        57% {
            opacity: 0;
        }
        57.1% {
            opacity: 1;
        }
        60% {
            opacity: 1;
        }
        60.1% {
            opacity: 0;
        }
        65% {
            opacity: 0;
        }
        65.1% {
            opacity: 1;
        }
        75% {
            opacity: 1;
        }
        75.1% {
            opacity: 0;
        }
        77% {
            opacity: 0;
        }
        77.1% {
            opacity: 1;
        }
        85% {
            opacity: 1;
        }
        85.1% {
            opacity: 0;
        }
        86% {
            opacity: 0;
        }
        86.1% {
            opacity: 1;
        }
        100% {
            opacity: 1;
        }
    }


</style>
