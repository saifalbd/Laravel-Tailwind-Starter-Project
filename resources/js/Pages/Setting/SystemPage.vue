<template>
    <AppLayout>
        <b-bar one="Settings" two="System Information" :add="false" > </b-bar>
        <form-layout title="System App Information">

            
           
            <form @submit.prevent="form.post(route('setting.system.store'))" class="grid grid-cols-12 gap-2">
               
              <iq-input class="grid grid-cols-[150px_auto] items-center hover:bg-gray-100 py-2" v-model="form.name" 
              :sm="12" :md="8"  required :errorMessage="form.errors.name">
              <template #label><label for="" class="r text-right pr-4">Institute</label></template>
                <template  v-slot:isInvalid="{errorMessage}"> 
                    <div v-if="errorMessage" class="invalid-feedback col-span-2 text-right" >{{errorMessage}}</div>
                </template>
              </iq-input>

              


                <iq-input class="grid grid-cols-[150px_auto] items-center hover:bg-gray-100 py-2" v-model="form.tagline" 
              :sm="12" :md="8"  required :errorMessage="form.errors.tagline">
              <template #label><label for="" class="r text-right pr-4">Proprietor/Slogan</label></template>
                <template  v-slot:isInvalid="{errorMessage}"> 
                    <div v-if="errorMessage" class="invalid-feedback col-span-2 text-right" >{{errorMessage}}</div>
                </template>
              </iq-input>

                 <iq-input class="grid grid-cols-[150px_auto] items-center hover:bg-gray-100 py-2" v-model="form.address" 
              :sm="12" :md="8"  required :errorMessage="form.errors.address">
                <template #label><label for="" class="r text-right pr-4">Address</label></template>
                <template  v-slot:isInvalid="{errorMessage}"> 
                    <div v-if="errorMessage" class="invalid-feedback col-span-2 text-right" >{{errorMessage}}</div>
                </template>
              </iq-input>

                <iq-input class="grid grid-cols-[150px_auto] items-center hover:bg-gray-100 py-2" v-model="form.mobile" 
              :sm="12" :md="8"  required :errorMessage="form.errors.mobile">
               <template #label><label for="" class="r text-right pr-4">Phone</label></template>
                <template  v-slot:isInvalid="{errorMessage}"> 
                    <div v-if="errorMessage" class="invalid-feedback col-span-2 text-right" >{{errorMessage}}</div>
                </template>
              </iq-input>

               <iq-input class="grid grid-cols-[150px_auto] items-center hover:bg-gray-100 py-2" v-model="form.email" 
              :sm="12" :md="8"  required :errorMessage="form.errors.email">
                <template #label><label for="" class="r text-right pr-4">Email</label></template>
                <template  v-slot:isInvalid="{errorMessage}"> 
                    <div v-if="errorMessage" class="invalid-feedback col-span-2 text-right" >{{errorMessage}}</div>
                </template>
              </iq-input>

               <iq-input class="grid grid-cols-[150px_auto] items-center hover:bg-gray-100 py-2" v-model="form.facebook" 
              :sm="12" :md="8"   :errorMessage="form.errors.facebook">
                <template #label><label for="" class="text-right pr-4">FaceBook</label></template>
                <template  v-slot:isInvalid="{errorMessage}"> 
                    <div v-if="errorMessage" class="invalid-feedback col-span-2 text-right" >{{errorMessage}}</div>
                </template>
              </iq-input>

               <iq-input class="grid grid-cols-[150px_auto] items-center hover:bg-gray-100 py-2" v-model="form.twitter" 
              :sm="12" :md="8"   :errorMessage="form.errors.twitter">
                <template #label><label for="" class="text-right pr-4">Twitter</label></template>
                <template  v-slot:isInvalid="{errorMessage}"> 
                    <div v-if="errorMessage" class="invalid-feedback col-span-2 text-right" >{{errorMessage}}</div>
                </template>
              </iq-input>
               <iq-input class="grid grid-cols-[150px_auto] items-center hover:bg-gray-100 py-2" v-model="form.linkedin" 
              :sm="12" :md="8"   :errorMessage="form.errors.linkedin">
                <template #label><label for="" class="text-right pr-4">Linkedin</label></template>
                <template  v-slot:isInvalid="{errorMessage}"> 
                    <div v-if="errorMessage" class="invalid-feedback col-span-2 text-right" >{{errorMessage}}</div>
                </template>
              </iq-input>

               <iq-input class="grid grid-cols-[150px_auto] items-center hover:bg-gray-100 py-2" v-model="form.instagram" 
              :sm="12" :md="8"   :errorMessage="form.errors.instagram">
                <template #label><label for="" class="text-right pr-4">Instagram</label></template>
                <template  v-slot:isInvalid="{errorMessage}"> 
                    <div v-if="errorMessage" class="invalid-feedback col-span-2 text-right" >{{errorMessage}}</div>
                </template>
              </iq-input>



              <div class="col-span-12">
                <media-upload id="mediaupload-1" v-model="form.logo_id" :errorMessage="form.errors.logo_id" title="Upload Logo"></media-upload>
              </div>
         


          
   

                     <div class="col-span-12 mt-2 flex justify-center">
                        <submit-btn></submit-btn>
                     </div>


            </form>
            
        </form-layout>
    </AppLayout>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import {AppLayout,BBar,FormLayout,IqPlainInput,SubmitBtn,MediaUpload} from '@/iqComponent';
import {useForm} from "@inertiajs/vue3";

type  Setting =  {
  institute: string
  tagline: string
  address: string
  mobile: string
  email: string
  logo_id: number
  facebook:string
  twitter:string
  linkedin:string
  instagram:string
}


export default defineComponent({
    components:{
   AppLayout,BBar,FormLayout,IqInput:IqPlainInput,SubmitBtn,MediaUpload
    },
    props:{
        s:{
            type:Object as PropType<Setting>,
            required:true
        },
       
    },
    setup (props) {
       
        const form = useForm(props.s)
     

       
      
        return {form,props}
    }
})
</script>


