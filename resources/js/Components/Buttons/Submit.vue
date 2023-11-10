<template>
  <button
    class="px-4 py-2 my-4 font-semibold text-sm text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 dark:from-teal-950 dark:to-teal-900 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 rounded-md shadow-sm outline outline-2 outline-offset-2 outline-indigo-500 dark:bg-slate-700 dark:text-slate-200 dark:border-transparent flex items-center"
    @click="emit('click',$event)"
  >
    <svg
      class="w-4 h-4 text-gray-800 dark:text-white"
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 18 18"
    >
      <path
        stroke="currentColor"
        stroke-linecap="round"
        stroke-linejoin="round"
        stroke-width="2"
        d="M9 1v16M1 9h16"
      ></path>
    </svg>
    <span class="ml-1">{{props.update?'Update':'Submit'}}</span>
  </button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  props:{
    update:{
      type:Boolean,
      default:false,
    }
  },
  setup(props,{emit}) {
    return {props, emit};
  },
});
</script>

