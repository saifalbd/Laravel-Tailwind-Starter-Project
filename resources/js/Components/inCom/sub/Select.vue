<template>
   <select v-on:focus="emit('focused',true)" v-on:blur="emit('focused',false)"  class="form-control"   v-model="value">
            <option v-for="o in props.items" :key="o[props.valueProp]" :value="o[props.valueProp]">{{o[props.textProp]}}</option>
        </select>
</template>

<script lang="ts">
import { defineComponent, PropType ,watch,ref} from 'vue';
import { useFocus } from '@vueuse/core'

export default defineComponent({
    emits: ['update:modelValue','focused'],
    props:{
       
        items:{
            type:Array as PropType<Array<Record<string,any>>>,
            required:true
        },
        modelValue:{
                type:[String,Number,null] as PropType<string|number|null>,
            default:''
        },
          textProp:{
                type:String,
                default:'text'
            },
             valueProp:{
                type:String,
                default:'value'
            },
    },
    setup (props,{emit}) {

          const value = ref(props.modelValue);
        
        watch(value,function(val){
           emit('update:modelValue',val)
        })

        return {props,emit,value}
    }
})
</script>