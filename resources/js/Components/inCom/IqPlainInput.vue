<template>
  <div
    :class="`form-group relative col-span-${props.col} md-col-span-${props.md}`"
  >
    <slot name="label">
      <label v-show="!!props.label" :class="{ r: props.required }">{{
        props.label
      }}</label>
    </slot>

    <div class="input-group" :class="{focused,isInvalid:!!props.errorMessage}">

      <slot name="prefix">
      <div class="prefix" v-show="!!props.prefix" :class="{ r: props.required }">{{
        props.prefix
      }}</div>
    </slot>
      <select-vue
        v-if="props.as == 'select'"
        v-model="value"
        :valueProp="props.valueProp"
        :textProp="props.textProp"
        @focused="focusedfun"
        :items="props.items"
      ></select-vue>
      <text-area-vue
        v-else-if="props.as == 'textarea'"
    
        v-model="value"
        :placeholder="props.placeholder"
        @focused="focusedfun"
      ></text-area-vue>
      <input-vue
      v-else
        v-model="value"
        :placeholder="props.placeholder"
        :type="props.type"
        @focused="focusedfun"
      ></input-vue>
        <slot name="sufix">
      <label v-show="!!props.sufix">{{
        props.sufix
      }}</label>
    </slot>

    </div>

    <!-- start input -->

    <!-- end Input-->
   
    <slot name="isInvalid" v-bind="{ errorMessage: props.errorMessage }">
      <div v-if="props.errorMessage" class="invalid-feedback">
        {{ props.errorMessage }}
      </div>
    </slot>

    <div
      v-if="props.readonly"
      class="absolute top-0 left-0 bottom-0 right-0"
    ></div>
  </div>
</template>

<script lang="ts">


import { defineComponent, PropType, ref, watch } from "vue";
import InputVue from "./sub/Input.vue";
import SelectVue from "./sub/Select.vue";
import TextAreaVue from "./sub/TextArea.vue";

export default defineComponent({
  components: {
    InputVue,
    SelectVue,
    TextAreaVue,
  },
  emits: ["update:modelValue"],
  props: {
    modelValue: {
      type:[String,Number,null] as PropType<any>,
      default:''
    },
     label: {
      type: String,
      default: "",
    },
    prefix: {
      type: String,
      default: "",
    },
     sufix: {
      type: String,
      default: "",
    },
    errorMessage: {
      type: String,
      default: "",
    },
    readonly: {
      type: Boolean,
      default: false,
    },

    plain: {
      type: Boolean,
      default: false,
    },

    required: {
      type: Boolean,
      default: false,
    },

    textProp: {
      type: String,
      default: "name",
    },
    valueProp: {
      type: String,
      default: "id",
    },

   
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    name: {
      type: String,
      default: "",
    },
    col: {
      type: Number,
      default: 12,
    },
    md: {
      type: Number,
      default: 4,
    },
    as: {
      type: String,
      default: "input",
    },
    items: {
      type: Array,
      default: () => [],
    },
  },
  setup(props, { emit }) {
    const value = ref(props.modelValue as string);
    const focused = ref(false);
    const focusedfun = (bool:boolean)=>{
        focused.value = bool;
    }

    watch(value, function (val:any) {
      let value = val;
      if(props.type=='number'){
        if(!isNaN(value)){
          value = parseFloat(val)
        }
      }
      emit("update:modelValue", value);
    });

    return { props,focused, value,focusedfun };
  },
});
</script>

<style lang="scss" scoped></style>
