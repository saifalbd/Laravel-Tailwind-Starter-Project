<template>
    <button @click.prevent="clickButton" class="flex items-center bg-yellow-200 text-yellow-900 border border-fuchsia-800 py-1 px-4 mr-2 rounded shadow hover:shadow-xl hover:bg-yellow-300 duration-300">
<svg class="w-5 h-5 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 19">
    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 15h.01M4 12H2a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h16a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-3M9.5 1v10.93m4-3.93-4 4-4-4"/>
  </svg>
  <span class="ml-2">Print</span>
    </button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    setup () {
        
        const clickButton  = ()=>{
            window.print()
        }

        return {clickButton}
    }
})
</script>

