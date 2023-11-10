<template>
   <input v-on:focus="emit('focused',true)" v-on:blur="emit('focused',false)" :type="props.type"  class="form-control"  :placeholder="props.placeholder" 
    v-model="value" :required="props.required"/>
</template>

<script lang="ts">
import { defineComponent ,watch,ref, PropType} from 'vue';
import { useFocus } from '@vueuse/core'

export default defineComponent({
    emits: ['update:modelValue','focused'],
    props:{
       
         placeholder:{
 type: String,
            default: "",
        },
        type: {
            type: String,
            default: "text",
        },
        modelValue: {
      type:[String,Number,null] as PropType<any>,
      default:''
    },
         required:{
              type:Boolean,
            default:false 
        },
          
    },
    setup (props,{emit}) {
        
          const value = ref<string | number | unknown|null>(props.modelValue);
        watch(value,function(val){
           emit('update:modelValue',val)
        })

        return {props,value,emit}
    }
})
</script>