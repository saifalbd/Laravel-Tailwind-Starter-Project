<template>
   <div>
    <img class="w-10 h-10" :src="src" >
   </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { usePage } from '@inertiajs/vue3'

export default defineComponent({
    props:{
        avatar_id:{
            type:Number,
            required:true
        }
    },
    setup (props) {
        const page = usePage();
       const src =  ref(page.props.noImgUrl);
          const fetchUrl =async (attachment:number)=>{
try {
   const url = route('api.attach.show',{attachment})
   const {data} = await window.axios.get(url);
 src.value = data.url;
} catch (error) {
  console.error(error)
}
          }
fetchUrl(props.avatar_id);

      
        return {src}
    }
})
</script>