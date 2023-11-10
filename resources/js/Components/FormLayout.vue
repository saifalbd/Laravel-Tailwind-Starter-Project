<template>
    <div class="px-1 bg-fuchsia-800 mt-4 relative hover:z-40" ref="dom">
        <div class="bg-white dark:bg-black p-4">
            <loader-vue :busy="props.busy">
                <h2 class="flex items-center text-2xl font-semibold dark:text-yellow-50">
                    <svg
                        class="w-6 h-6"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z"
                        />
                    </svg>
                    <span class="ml-2">{{ props.title }}</span>
                </h2>
                <slot name="note"></slot>
                <div class="mt-4 relative z-0">
                    <slot></slot>
                </div>
            </loader-vue>
        </div>
    </div>
</template>

<script lang="ts">
import loaderVue from "./loader.vue";
import { defineComponent, onMounted, ref } from "vue";
export default defineComponent({
    components: {
        loaderVue,
    },
    props: {
        busy: {
            type: Boolean,
            default: false,
        },
        title: {
            type: String,
            default: "",
        },
    },
    setup(props) {
        const dom = ref<HTMLDivElement|null>(null);

        onMounted(() => {});

        return { props, dom };
    },
});
</script>
