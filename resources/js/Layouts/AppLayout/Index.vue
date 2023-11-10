<template>
  <div class="page-layout" id="layout">
    <SideBar></SideBar>
    <top-nav></top-nav>
    <main
      id="main"
      class="p-4  bg-[#4caf5005] dark:bg-gray-600 min-h-screen relative"
    >
      <div class="min-h-full">
        <slot />
      </div>
    </main>
  </div>
</template>



<script lang="ts">
import { defineComponent } from "vue";
import SideBar from "./SideBarVue.vue";
import TopNav from "./HeaderVue.vue";

export default defineComponent({
  components: {
    SideBar,
    TopNav,
  },
  setup() {
    return {};
  },
});
</script>


