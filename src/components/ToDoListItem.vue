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
        <transition name="slide-blurred-left">
            <font-awesome-icon v-if="isCompleted" class="list-item__remove" icon="minus" @click="removeItem"/>
        </transition>
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
        padding: .8em 3em .8em 1.8em;
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
                    color: var(--color-grey-light);
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
            color: var(--color-red);
            transition: ease 1s;
            align-self: flex-start;
            padding: .9em 2em 0 0;
            cursor: pointer;
        }

    }


    /* Animations */
    .slide-blurred-left-enter, .slide-blurred-left-enter-active {
        -webkit-animation: slide-in-blurred-left 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
        animation: slide-in-blurred-left 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) both;
    }
    .slide-blurred-left-leave-to, .slide-blurred-left-leave-active {
        -webkit-animation: slide-out-blurred-left 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both;
        animation: slide-out-blurred-left 0.45s cubic-bezier(0.755, 0.050, 0.855, 0.060) both;
    }

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


</style>
