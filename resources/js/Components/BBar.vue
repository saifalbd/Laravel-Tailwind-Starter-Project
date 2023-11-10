<template>
 <div class="border-x-4 py-1 border-red-500 dark:border-black flex justify-end sm:justify-between items-center
 bg-neutral-50 gradient-to-r dark:bg-slate-700 dark:from-teal-600 dark:to-teal-900 dark:text-white print:hidden">
    <div class="hidden sm:flex justify-start items-center">
        <svg class="w-5 h-5 mx-3 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
            <path fill="currentColor" d="M1 8a1 1 0 0 0 0 2V8Zm18 2a1 1 0 1 0 0-2v2ZM2 2h16V0H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v10h2V2h-2Zm0 10v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 12H0a2 2 0 0 0 2 2v-2Zm0 0V2H0v10h2ZM2 2V0a2 2 0 0 0-2 2h2Zm0 4h17V4H2v2Zm9 7V6H9v7h2ZM1 10h18V8H1v2Z"/>
          </svg>
         <b>{{one}}</b>
      
          <svg v-if="two" class="w-4 h-4 mx-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"/>
          </svg>
         
          <b>{{two}}</b>
    </div>

    <div class="flex items-center">
      
      <a v-if="url" :href="url" :class="{'add-btn':add,'list-btn':!add}">
       <slot name="icon">
       
        <svg v-if="add" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
          <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10ZM17 13h-2v-2a1 1 0 0 0-2 0v2h-2a1 1 0 0 0 0 2h2v2a1 1 0 0 0 2 0v-2h2a1 1 0 0 0 0-2Z"/>
        </svg>
       
        <svg v-else aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 14">
           <path fill="currentColor" 
           d="M1 8a1 1 0 0 0 0 2V8Zm18 2a1 1 0 1 0 0-2v2ZM2 2h16V0H2v2Zm16 0h2a2 2 0 0 0-2-2v2Zm0 0v10h2V2h-2Zm0 10v2a2 2 0 0 0 2-2h-2Zm0 0H2v2h16v-2ZM2 12H0a2 2 0 0 0 2 2v-2Zm0 0V2H0v10h2ZM2 2V0a2 2 0 0 0-2 2h2Zm0 4h17V4H2v2Zm9 7V6H9v7h2ZM1 10h18V8H1v2Z"/>
         </svg>
      
       </slot>
         
          <span class="whitespace-nowrap pr-3">
            <slot></slot>
          </span>
          </a>
        
  

<slot name="moreBtn"></slot>
         
    </div>
</div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
    props:{
        one:{
   type:String,
            default:''
        },
        two:{
   type:String,
            default:''
        },
        url:{
            type:String,
            default:''
        },
        add:{
            type:Boolean,
            default:false,
        }
    },
    setup (props) {
        const one = ref(props.one);
        const two = ref(props.two);
        const url = ref(props.url);
        const add = ref(props.add);
        

        return {one,two,url,add}
    }
})
</script>