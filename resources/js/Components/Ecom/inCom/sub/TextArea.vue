<template>
  <textarea v-on:focus="emit('focused',true)" v-on:blur="emit('focused',false)"
    :type="props.type"
    class="form-control"
 
    :placeholder="props.placeholder"
    v-model="value"
    :required="props.required"
  ></textarea>
</template>

<script lang="ts">
import { defineComponent, watch, ref, PropType } from "vue";


export default defineComponent({
  emits: ["update:modelValue", "focused"],
  props: {
   
    placeholder: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "text",
    },
    modelValue: {
  type:String as PropType<any>,
      default: "",
    },
    required: {
      type: Boolean,
      default: false,
    },
  },
  setup(props, { emit }) {
    const value = ref(props.modelValue);

   
    watch(value, function (val) {
      emit("update:modelValue", val);
    });

    return { props,emit, value };
  },
});
</script>