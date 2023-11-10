<template>
  <div ref="dom" class="iq-table-box">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";

export default defineComponent({
  setup() {
    const dom = ref<HTMLDivElement>(document.createElement("div"));
    const isLeftScrolling = ref(false);
    const isSet = ref(false);
    const tdList = reactive<HTMLTableColElement[]>([]);

    onMounted(() => {

    
    dom.value.addEventListener('scroll',function(){
        const left = this.scrollLeft;
     
        if(left>10){
           if(!isSet.value){
             const list = isLeftScrolling.value?tdList:document.querySelectorAll('table .sticky-col');
            isLeftScrolling.value = true;
            Array.prototype.forEach.call(list,(td:HTMLTableColElement)=>{
                td.classList.add('bg');
                tdList.push(td)
            })
           }
            isSet.value = true;
           
        }else{
            if(isLeftScrolling.value){
              tdList.forEach((td)=>{
                td.classList.remove('bg');
            }) 
            isLeftScrolling.value = false;
            isSet.value = false;
            }
        }
    })
      window.addEventListener("scroll", function () {
        const height = window.innerHeight;
        let rect = dom.value.getBoundingClientRect();
        const top = rect.top;
        if (top < 4) {
          dom.value.style.height = `${height}px`;
          dom.value.classList.add('pt-4');
        } else {
          dom.value.style.height = `auto`;
            dom.value.classList.remove('pt-4');
        }
      });
    });

    return { dom };
  },
});
</script>