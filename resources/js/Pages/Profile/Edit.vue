<script lang="ts">
import { Head } from "@inertiajs/vue3";
import {
    AppLayout,
    BBar,
    SubmitBtn,
    IqPlainInput,
    MediaUpload,
    FormLayout
} from "../../iqComponent";


import { Link, useForm, usePage } from "@inertiajs/vue3";
import { defineComponent, PropType } from "vue";

export default defineComponent({
    components: {
        AppLayout,
        FormLayout,
        IqPlainInput,
        MediaUpload,
        BBar,
        SubmitBtn,
        Head,
    },
    props: {
        mustVerifyEmail: {
            type: Boolean as PropType<boolean>,
            default: false,
        },
        status: {},
    },

    setup() {
        const user = usePage().props.auth.user;

        const form = useForm({
            name: user.name,
            email: user.email,
            avatar_id: user.avatar_id,
        });

        return { form };
    },
});
</script>

<template>
    <Head title="Profile" />

    <AppLayout>
        <template #header>
            <h2 class="font-semibold text-xl text-gray-800 leading-tight">
                Profile
            </h2>
        </template>

        <b-bar one="User" two="Profile"> </b-bar>

        <FormLayout title="Profile Information">
            <form
                @submit.prevent="form.put(route('profile.update'))"
                class="grid grid-cols-12 gap-2"
            >
                <iq-plain-input
                    name="fullName"
                    label="Name"
                    v-model="form.name"
                    :errorMessage="form.errors.name"
                    :md="6"
                ></iq-plain-input>

                <iq-plain-input
                    name="email"
                    label="Email"
                    v-model="form.email"
                    :errorMessage="form.errors.email"
                    :md="6"
                ></iq-plain-input>
               
                <div class="col-span-12">
                    <media-upload
                        name="avatar_id"
                        v-model="form.avatar_id"
                        :errorMessage="form.errors.avatar_id"
                    ></media-upload>
                </div>
                <div class="col-span-12 flex justify-center">
                    <SubmitBtn />
                </div>
            </form>
        </FormLayout>
    </AppLayout>
</template>
