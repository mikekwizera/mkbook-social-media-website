<script setup>
import PostItem from "@/Components/app/PostItem.vue";
import PostModal from "@/Components/app/PostModal.vue";
import {ref} from "vue";
import {usePage} from "@inertiajs/vue3";
defineProps({
    posts: Array
})

const authUser = usePage().props.auth.user;
const showEditModal = ref(false)
const editPost = ref({})
function openEditModal(post) {
    editPost.value = post;
    showEditModal.value = true;
}
function onModalHide() {
    editPost.value = {
        id: null,
        body: '',
        user: authUser
    }
}
</script>

<template>
    <div class="overflow-auto">
        <PostModal :post="editPost" v-model="showEditModal" @hide="onModalHide"/>
        <PostModal :post="editPost" v-model="showEditModal"/>
    </div>
</template>

<style scoped>
</style>
