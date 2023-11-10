<template>
  <nav class="top-nav">
    <div class="flex flex-wrap items-center justify-between mx-auto">
      <button class="left-mini-menu" id="leftMiniBtn">
        <svg
          class="w-8 h-8"
          aria-hidden="true"
          fill="currentColor"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <title>backburger</title>
          <path
            d="M5,13L9,17L7.6,18.42L1.18,12L7.6,5.58L9,7L5,11H21V13H5M21,6V8H11V6H21M21,16V18H11V16H21Z"
          />
        </svg>
        <svg   class="w-8 h-8"
          aria-hidden="true"
          fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>forwardburger</title><path d="M19,13H3V11H19L15,7L16.4,5.6L22.8,12L16.4,18.4L15,17L19,13M3,6H13V8H3V6M13,16V18H3V16H13Z" /></svg>
      </button>
      <button id="mobile-menu-btn" type="button" class="left-menu-btn">
        <span class="sr-only">Open sidebar</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            clip-rule="evenodd"
            fill-rule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>
      <a :href="route('dashboard')" class="flex items-center">
        <!-- <img
          :src="page.props.rLogo.url"
          class="h-8 mr-3"
          alt="{{ page.props.appName }}"
        /> -->
        <span
          class="self-center text-2xl font-semibold whitespace-nowrap text-white"
          >{{ page.props.appName }}</span
        >
      </a>
      <button type="button" class="right-menu-btn" id="rightMenuBtn">
        <span class="sr-only">Open main menu</span>
        <svg
          class="w-6 h-6"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
      </button>

      <div class="right-list">
        <ul class="menu-list">
          <li class="top-nav-avatar">
            <fwb-dropdown text="Bottom">
              <template #trigger>
                <button class="triger-avatar-btn">
                  <img
                    type="button"
                    class="w-6 h-6 rounded-full cursor-pointer ring-2 ring-gray-300 dark:ring-gray-500"
                    :src="page.props.auth.user.avatar.url"
                    alt="User dropdown"
                  />
                  <span class="ml-2">{{ page.props.auth.user.name }}</span>

                  <svg
                    class="w-5 h-5 ml-1"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                </button>
              </template>
              <ul class="drop-down-content">
                <div
                  class="px-4 py-3 text-sm text-gray-900 dark:text-white capitalize"
                >
                  <div>{{ page.props.auth.user.name }}</div>
                  <div class="font-medium truncate">
                    {{ page.props.auth.user.email }}
                  </div>
                </div>
                <a class="item" :href="route('profile.edit')">
                  <div class="mr-2">
                    <svg
                      class="w-4 h-4 fill-current"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill-rule="evenodd"
                        d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                        clip-rule="evenodd"
                      ></path>
                    </svg>
                  </div>
                  User Profile
                  <!---->
                </a>

                <a class="item" :href="route('profile.resetPassword')">
                  <div class="mr-2">
                    <svg
                      class="w-4 h-4 fill-current"
                      fill="currentColor"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 22 20"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M20 10a28.076 28.076 0 0 1-1.091 9M6.231 2.37a8.994 8.994 0 0 1 12.88 3.73M1.958 13S2 12.577 2 10a8.949 8.949 0 0 1 1.735-5.307m12.84 3.088c.281.706.426 1.46.425 2.22a30 30 0 0 1-.464 6.231M5 10a6 6 0 0 1 9.352-4.974M3 19a5.964 5.964 0 0 1 1.01-3.328 5.15 5.15 0 0 0 .786-1.926m8.66 2.486a13.96 13.96 0 0 1-.962 2.683M6.5 17.336C8 15.092 8 12.846 8 10a3 3 0 1 1 6 0c0 .75 0 1.521-.031 2.311M11 10.001c0 3 0 6-2 9"
                      />
                    </svg>
                  </div>
                  Change Password
                  <!---->
                </a>
                <div class="item">
                  <Link
                    :href="route('logout')"
                    method="post"
                    as="button"
                    type="button"
                    class="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                    >Logout</Link
                  >
                </div>
              </ul>
            </fwb-dropdown>
          </li>

          <li>
            <a
              :href="route('clear')"
              class="text-purple-700 hover:text-white border border-purple-700 hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-3 py-1 text-center mr-2 dark:border-purple-400 dark:text-purple-400 dark:hover:text-white dark:hover:bg-purple-500 dark:focus:ring-purple-900"
              >Clear Cache</a
            >
          </li>
        </ul>
        <ul class="menu-mobile-list hidden" id="mobileMenuList">
          <li class="flex items-center py-2">
            <img
              class="h-14 w-14 rounded-md border"
              :src="page.props.auth.user.avatar.url"
              alt=""
              srcset=""
            />
            <div class="ml-2">
              <div class="font-bold capitalize text-lg">
                {{ page.props.auth.user.name }}
              </div>
              <div class="text-slate-600">{{ page.props.auth.user.name }}</div>
            </div>
          </li>

          <a class="item" :href="route('profile.edit')">
            <div class="mr-2">
              <svg
                class="w-4 h-4 fill-current"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            User Profile
            <!---->
          </a>

          <a class="item" :href="route('profile.resetPassword')">
            <div class="mr-2">
              <svg
                class="w-4 h-4 fill-current"
                fill="currentColor"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 22 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M20 10a28.076 28.076 0 0 1-1.091 9M6.231 2.37a8.994 8.994 0 0 1 12.88 3.73M1.958 13S2 12.577 2 10a8.949 8.949 0 0 1 1.735-5.307m12.84 3.088c.281.706.426 1.46.425 2.22a30 30 0 0 1-.464 6.231M5 10a6 6 0 0 1 9.352-4.974M3 19a5.964 5.964 0 0 1 1.01-3.328 5.15 5.15 0 0 0 .786-1.926m8.66 2.486a13.96 13.96 0 0 1-.962 2.683M6.5 17.336C8 15.092 8 12.846 8 10a3 3 0 1 1 6 0c0 .75 0 1.521-.031 2.311M11 10.001c0 3 0 6-2 9"
                />
              </svg>
            </div>
            Change Password
            <!---->
          </a>
          <div class="item">
            <Link
              :href="route('logout')"
              method="post"
              as="button"
              type="button"
              class="block w-full px-4 font-bold py-2 text-lg text-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
              >Logout</Link
            >
          </div>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { usePage, Link } from "@inertiajs/vue3";
import { FwbDropdown, FwbListGroup, FwbListGroupItem } from "flowbite-vue";

export default defineComponent({
  components: {
    Link,
    FwbDropdown,
    FwbListGroup,
    FwbListGroupItem,
  },

  setup() {
    const page = usePage();

    onMounted(() => {
      const mobileMenuBtn = document.getElementById("mobile-menu-btn");
      const leftMiniBtn = document.getElementById('leftMiniBtn');
      const rightMenuBtn = document.getElementById("rightMenuBtn");
      leftMiniBtn.addEventListener('click',()=>{
            (document.getElementById("layout") as any).classList.toggle("mini");
            leftMiniBtn.classList.toggle('hide');
      })
      if (mobileMenuBtn && rightMenuBtn) {
        mobileMenuBtn.addEventListener("click", () => {
          (document.getElementById("layout") as any).classList.toggle("open");
        });

        rightMenuBtn.addEventListener("click", () => {
          (document.getElementById("mobileMenuList") as any).classList.toggle(
            "hidden"
          );
        });
      }
    });
    return { page };
  },
});
</script>

