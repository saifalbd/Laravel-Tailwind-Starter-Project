<template>
  <div
    class="media-input-layout my-2"
    :class="{ 'is-invalid': !!errorMessage }"
  >
    <div class="image-box">
      <img :class="ratio" :src="fileUrl" alt="" srcset="" />
    </div>
    <div class="info">
      <div class="info-inner" :id="id">
        <div>
          <svg
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              d="M.188 5H5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707c-.358.362-.617.81-.753 1.3C.148 5.011.166 5 .188 5ZM14 8a6 6 0 1 0 0 12 6 6 0 0 0 0-12Zm2 7h-1v1a1 1 0 0 1-2 0v-1h-1a1 1 0 0 1 0-2h1v-1a1 1 0 0 1 2 0v1h1a1 1 0 0 1 0 2Z"
            />
            <path
              d="M6 14a7.969 7.969 0 0 1 10-7.737V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H.188A.909.909 0 0 1 0 6.962V18a1.969 1.969 0 0 0 1.933 2h6.793A7.976 7.976 0 0 1 6 14Z"
            />
          </svg>
          <span>{{ props.title }}</span>
        </div>
        <div class="foot">
          <div v-if="errorMessage" class="invalid-feedback">
            {{ errorMessage }}
          </div>
          <i v-else>Allowed File JPJ,PNG,JPEX,WEBP ONLY</i>
        </div>
        <input type="number" :name="props.name" v-model="value" />
      </div>
      <button type="button" class="empty-btn">Do Empty</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, computed } from "vue";
import { usePage } from "@inertiajs/vue3";

export default defineComponent({
  emits: ["update:modelValue"],
  props: {
    name: {
      type: String,
      default: "",
    },
    id: {
      type: String,
      default: "mediaUpload",
    },
    title: {
      type: String,
      default: "Upload Your Attach",
    },
    errorMessage: {
      type: String,
      default: "",
    },
    model_id: {
      type: [String , Number],
      default: "",
    },
    model_type: {
      type: String,
      default: "",
    },

    modelValue: {},
  },
  setup(props, { emit }) {
    let value = ref(props.modelValue);
    let errorMessage = computed(() => props.errorMessage);

    const page = usePage();
    const fileUrl = ref(page.props.noImgUrl);
    const ratio = ref<Number | String>("aspect-1");

    const fetchUrl = async (attachment: number) => {
      try {
        const url = route("api.attach.show", { attachment });
        const { data } = await window.axios.get(url);
        fileUrl.value = data.url;
      } catch (error) {
        console.error(error);
      }
    };
    if (value.value) {
      let attachment = value.value as number;

      fetchUrl(attachment);
    }

    const onSelect = (o: Image) => {
      value.value = o.id;
      emit("update:modelValue", o.id);

      fileUrl.value = o.url;
      ratio.value = `aspect-${o.ratio}`;
    };

    onMounted(() => {
      window.mediaManager({
        triger: document.getElementById(props.id),
        onSelect: onSelect,
        withRequest:{
          model_id:props.model_id?props.model_id:null,
          model_type:props.model_type?props.model_type:null
        }
      });
    });

    return { props, fileUrl, value, errorMessage, ratio };
  },
});
</script>