<template>
  <EntranceLayout>
    <form class="login-box" @submit.prevent="submit">
      <div class="left relative" >
        <div id="loginLotte" class=" absolute left-0 top-0 right-0 bottom-0"></div>
      </div>
      <div class="right">
        <div>
          <div class="avatar-box">
            <img
              src="https://e7training.com/assets/img/model/1695882561.jpg"
              alt=""
              srcset=""
            />
          </div>
          <div class="w-full flex justify-center my-4">
            <h1 class="text-2xl font-extrabold">Login</h1>
          </div>
        </div>
        <div>
          <div class="form-group">
            <label for="">User Email</label>
            <input type="email" v-model="form.email" placeholder="User Email Here ...."/>
            <div class=" text-rose-400">{{form.errors.email}}</div>
          </div>
          <div class="form-group mt-4">
            <label for="">Password</label>
            <div class="input-group">
              <input :type="passType" v-model="form.password" placeholder="Password Type Here ...."/>
              
              <button type="button" class="eye-btn" @click="clickEye">
                <svg v-show="passType=='password'"
                  class="open"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 14"
                >
                  <g
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                  >
                    <path d="M10 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                    <path
                      d="M10 13c4.97 0 9-2.686 9-6s-4.03-6-9-6-9 2.686-9 6 4.03 6 9 6Z"
                    />
                  </g>
                </svg>
                <svg  v-show="passType=='text'"
                  class="close"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    d="m2 13.587 3.055-3.055A4.913 4.913 0 0 1 5 10a5.006 5.006 0 0 1 5-5c.178.008.356.026.532.054l1.744-1.744A8.973 8.973 0 0 0 10 3C4.612 3 0 8.336 0 10a6.49 6.49 0 0 0 2 3.587Z"
                  />
                  <path
                    d="m12.7 8.714 6.007-6.007a1 1 0 1 0-1.414-1.414L11.286 7.3a2.98 2.98 0 0 0-.588-.21l-.035-.01a2.981 2.981 0 0 0-3.584 3.583c0 .012.008.022.01.033.05.204.12.401.211.59l-6.007 6.007a1 1 0 1 0 1.414 1.414L8.714 12.7c.189.091.386.162.59.211.011 0 .021.007.033.01a2.981 2.981 0 0 0 3.584-3.584c0-.012-.008-.023-.011-.035a3.05 3.05 0 0 0-.21-.588Z"
                  />
                  <path
                    d="M17.821 6.593 14.964 9.45a4.952 4.952 0 0 1-5.514 5.514L7.665 16.75c.767.165 1.55.25 2.335.251 6.453 0 10-5.258 10-7 0-1.166-1.637-2.874-2.179-3.407Z"
                  />
                </svg>
              </button>
            </div>
            <div class=" text-rose-400">{{form.errors.password}}</div>
          </div>
        </div>
        <div class="mt-4 flex justify-between items-center">
          <div class="flex items-center">
            <input
              
              id="checked-checkbox"
              type="checkbox"
              @change="change"
              class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              for="checked-checkbox"
              class="ml-2 font-medium text-gray-900 dark:text-gray-300"
              >Remember Me</label
            >
          </div>

          <a
            href="#"
            class="hover:text-green-800 font-medium hover:underline dark:text-primary-500"
            >Forgot password?</a
          >
        </div>
        <div class="mt-6 flex justify-center items-center">
          <button class="btn">
            <svg
              class="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 18"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 16.5c0-1-8-2.7-9-2V1.8c1-1 9 .707 9 1.706M10 16.5V3.506M10 16.5c0-1 8-2.7 9-2V1.8c-1-1-9 .707-9 1.706"
              />
            </svg>
            <span class="ml-2">Login</span>
          </button>
        </div>
          <div class="flex justify-end mt-4">
     
        </div>
      </div>
    </form>
  </EntranceLayout>
</template>

<script lang="ts">
import { defineComponent, ref,onMounted } from "vue";
import { EntranceLayout } from "../../../iqComponent";
import { useForm, usePage } from "@inertiajs/vue3";

export default defineComponent({
  components: {
    EntranceLayout,
  },
  setup() {
    const page = usePage();
    const passType = ref('password');
    const logo = ref(page.props.rLogo);

    const form = useForm({
    email: '',
    password: '',
    remember: false,
});
const submit = () => {
    form.post(route('login'), {
        onFinish: () => {
            form.reset('password');
        },
    });
};

    const clickEye = ()=>{
        passType.value = passType.value=='text'?'password':'text';
    }

    const change = (event:Event)=>{
      const target = event.target as HTMLInputElement;
      form.remember = target.checked
    }

    onMounted(()=>{
        const dom = document.getElementById('loginLotte');
   
    lottie.loadAnimation({
        container: dom, // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: true,
        path: '/assets/web/lotte/login.json' // the path to the animation json
        });
    })

    return {form, logo,passType,clickEye,submit,change };
  },
});
</script>


