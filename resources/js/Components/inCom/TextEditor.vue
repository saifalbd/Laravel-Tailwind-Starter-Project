<template>
    <div class="form-group col-span-12" >

            <slot name="label">
      <label v-show="!!props.label" :class="{ r: props.required }">{{
        props.label
      }}</label>
    </slot>

 
    <div class="quil-box" :class="{isInvalid:!!props.errorMessage}">
        <QuillEditor
   
      contentType="html"
      theme="snow"
      :placeholder="props.placeholder"
      :toolbar="toolbar"
      :content="content"
      @update:content="change"
    />

    </div>
    <div v-if="errorMessage" class="invalid-feedback">{{ errorMessage}}</div>

<div v-if="props.readonly" class="absolute top-0 left-0 bottom-0 right-0"></div>

  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { QuillEditor } from "@vueup/vue-quill";

export default defineComponent({
  emits: ["update:modelValue"],
  components: {
    QuillEditor,
  },
  props: {
   
    modelValue: {
      type: String,
      default: "",
    },
     label: {
      type: String,
      default: "",
    },
     errorMessage: {
      type: String,
      default: "",
    },
     required:{
              type:Boolean,
            default:false 
        },
         readonly:{
            type:Boolean,
            default:false
        },
         placeholder: {
      type: String,
      default: "Content Write Here...",
    },
  },
  setup(props,{emit}) {
    const content = ref(props.modelValue);
    const toolbar = reactive([
      ["bold", "italic", "underline"], // toggled buttons
      ["blockquote", "code-block"],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }],
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],
      ["clean"], // remove formatting button
    ]);

    const change = (value:string)=>{
        emit('update:modelValue',value)
    }

    return {props, content, toolbar,change };
  },
});
</script>