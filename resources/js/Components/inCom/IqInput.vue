<template>
    <div :class="`form-group mt-2 relative col-span-${props.col} md-col-span-${props.md}`">
          <slot name="label">
      <label v-show="!!props.label" :class="{ r: props.required }">{{
        props.label
      }}</label>
    </slot>

    <div class="input-group" :class="{focused,isInvalid:!!errorMessage}">

          <slot name="prefix">
      <div class="prefix" v-show="!!props.prefix" :class="{ r: props.required }">{{
        props.prefix
      }}</div>
    </slot>


        <!-- start Select -->
        <select v-if="props.as=='select'"  class="form-control" :class="{['is-invalid']:!!errorMessage}" :name="props.name" 
        v-model="value" v-on:focus="focusedfun(true)" v-on:blur="focusedfun(false)">
            <option v-for="o in props.items" :key="o[props.valueProp]" :value="o[props.valueProp]">{{o[props.textProp]}}</option>
        </select>
   <!-- end Select -->
    <!-- start textarea -->
        <textarea v-else-if="props.as=='textarea'"  class="form-control" :class="{['is-invalid']:!!errorMessage}" 
        :name="props.name" v-model="value"  v-on:focus="focusedfun(true)" v-on:blur="focusedfun(false)"></textarea>
         <!-- end textarea -->
         <!-- start input -->
        <input v-else :type="props.type"  class="form-control" :class="{['is-invalid']:!!errorMessage}" 
        :placeholder="props.placeholder" :name="props.name" v-model="value"  v-on:focus="focusedfun(true)" v-on:blur="focusedfun(false)"/>
          <!-- end Input-->
    </div>
         <div v-if="errorMessage" class="invalid-feedback">{{ errorMessage}}</div>

         <div v-if="props.readonly" class="absolute top-0 left-0 bottom-0 right-0"></div>
    </div>
</template>

<script>
import { useField } from 'vee-validate';

import {defineComponent, watch,ref} from 'vue';
export default defineComponent({
    
    props: {
        readonly:{
            type:Boolean,
            default:false
        },

        prefix: {
      type: String,
      default: "",
    },
     sufix: {
      type: String,
      default: "",
    },


        plain:{
            type:Boolean,
            default:false
        },

        required:{
              type:Boolean,
            default:false 
        },

        
         textProp:{
                type:String,
                default:'text'
            },
             valueProp:{
                type:String,
                default:'value'
            },
        
        label:{
 type: String,
            default: "",
        },
        placeholder:{
 type: String,
            default: "",
        },
        type: {
            type: String,
            default: "text",
        },
        name: {
            type: String,
            required: true,
        },
        col: {
            type: Number,
            default: 12,
        },
        md: {
            type: Number,
            default: 4,
        },
        as:{
            type:String,
            default:'input'
        },
        items:{
            type:Array,
            default:()=>[]
        }
    },
    setup(props,{emit}) {
        const { value, errorMessage } = useField(() => props.name);

        
        
        watch(value,function(val){
            emit('changeInput',val)
        })

          const focused = ref(false);
    const focusedfun = (bool)=>{
        focused.value = bool;
    }

        
        return {props,value, errorMessage,focusedfun,focused};
    },

})
</script>

<style lang="scss" scoped></style>
