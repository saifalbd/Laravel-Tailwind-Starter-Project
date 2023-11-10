<template>
   <div class="dropdown-menu">
    <fwb-dropdown text="Bottom">
    <template #trigger>
     <button class="triger">
        <span>menu</span>
        <div class="ml-2"><svg data-v-e40b6242="" class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path data-v-e40b6242="" d="M19 9l-7 7-7-7" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path></svg></div>
     </button>
    </template>
    <ul>
        <slot></slot>
    </ul>
   </fwb-dropdown>
   </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { FwbDropdown} from 'flowbite-vue'
export default defineComponent({
    components:{
        FwbDropdown
    },
    setup () {
        

        return {}
    }
})
</script>

