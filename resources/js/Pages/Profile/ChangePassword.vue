<script lang="ts">
import { Head } from '@inertiajs/vue3';
import { useForm} from '@inertiajs/vue3';
import { defineComponent, PropType } from 'vue';

import {SubmitBtn,MediaUpload,IqPlainInput,AppLayout,BBar,FormLayout} from '../../iqComponent';






export default defineComponent({
    components:{SubmitBtn,MediaUpload,IqPlainInput,FormLayout,AppLayout,BBar,Head
    },
    props:{
mustVerifyEmail:{
    type:Boolean as PropType<boolean>,
    default:false
},
    status:{

    }
    },

    setup(){


const form = useForm({
    oldPassword:'',
    password:'',
    password_confirmation:'',
   
});

return {form}


    }
    
})

</script>

<template>
    <Head title="Profile" />

    <app-layout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">Profile</h2>
        </template>

         <b-bar
            one="User"
            two="Profile" > </b-bar>

            <FormLayout title="Logged User Password Information">
                  <form @submit.prevent="form.post(route('profile.resetPassword.store'))" class=" grid grid-cols-12 gap-2">

<iq-plain-input  label="Old Password" v-model="form.oldPassword" :errorMessage="form.errors.oldPassword" :md="6"></iq-plain-input>

<iq-plain-input  label="Password" v-model="form.password" :errorMessage="form.errors.password" :md="6"></iq-plain-input>
<iq-plain-input  label="Confirm Password" v-model="form.password_confirmation" :errorMessage="form.errors.password_confirmation" :md="6"></iq-plain-input>

<div class="col-span-12 flex justify-center">
    <SubmitBtn :update="true"/>
</div>


          

                  </form>


            </FormLayout>




       
    </app-layout>
</template>
