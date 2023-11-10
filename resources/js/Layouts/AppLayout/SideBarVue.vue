<template>
  <aside class="side-nav">
    <div class="mobile-overly" @click="close"></div>
    <div class="content">
      <ul ref="list" class="list">
        <li :class="{ active: active('dashboard') }">
          <a class="drop-btn" :href="route('dashboard')">
            <svg
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M2 10a8 8 0 018-8v8h8a8 8 0 11-16 0z"></path>
              <path d="M12 2.252A8.014 8.014 0 0117.748 8H12V2.252z"></path>
            </svg>
            <span class="title">Dashboard</span>
          </a>
        </li>
        <li
          :class="{
            active: active(['setting.']),
          }"
        >
          <button type="button" class="drop-btn">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <title>shape</title>
              <path
                d="M11,13.5V21.5H3V13.5H11M12,2L17.5,11H6.5L12,2M17.5,13C20,13 22,15 22,17.5C22,20 20,22 17.5,22C15,22 13,20 13,17.5C13,15 15,13 17.5,13Z"
              />
            </svg>
            <span class="title"> Settings </span>
            <arrow-down-icon class="arrow-icon"></arrow-down-icon>
          </button>
          <ul class="dropdown">
            <li :class="{ active: active('setting.system') }">
              <a :href="route('setting.system')">System Setting</a>
            </li>
            <li :class="{ active: active('setting.system') }">
              <a :href="route('setting.system')">System Option</a>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script  lang="ts">
import { onMounted, ref, defineComponent } from "vue";
import { usePage } from "@inertiajs/vue3";
import ArrowDownIcon from "../../Components/Icon/ArrowDownIcon.vue";

export default defineComponent({
  components: {
    ArrowDownIcon,
  },
  setup() {
    const page = usePage();
    const currentRouteName = page.props.currentRouteName;
    const list = ref<HTMLElement>(document.createElement("div"));

    const active = (slugs: string | string[]) => {
      if (Array.isArray(slugs)) {
        return slugs.findIndex((e) => currentRouteName.search(e) > -1) > -1;
      } else {
        return currentRouteName.search(slugs) > -1;
      }
    };

    const close = () => {
      (document.getElementById("layout") as HTMLElement).classList.toggle(
        "open"
      );
    };

    onMounted(() => {
      const liList = list.value.children;
      Array.prototype.forEach.call(liList, (li: HTMLLIElement) => {
        const dropdown = li.querySelector(".dropdown");
        if (dropdown) {
          li.classList.add("has-dropdown");
          const dropBtn = li.querySelector(".drop-btn");
          const title = dropBtn.querySelector(".title");
          const titleLi = document.createElement("li");
          titleLi.classList.add("title");
          titleLi.textContent = title.textContent;
          dropdown.prepend(titleLi);
        }
      });

      const lis = (list.value as HTMLElement).querySelectorAll("li");
      Array.prototype.forEach.call(lis, (li: HTMLElement) => {
        const button = li.querySelector("button");
        const isActive = li.classList.contains("active");
        if (isActive) {
          li.querySelector("ul")?.classList.remove("hidden");
        }
        button?.addEventListener("click", () => {
          li.querySelector("ul")?.classList.toggle("hidden");
        });
      });
    });

    return { list, close, active };
  },
});
</script>

