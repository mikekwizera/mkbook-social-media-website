<script setup>
import {computed, ref} from 'vue'
import {XMarkIcon, CheckCircleIcon, CameraIcon} from '@heroicons/vue/24/solid'
import {TabGroup, TabList, Tab, TabPanels, TabPanel} from '@headlessui/vue'
import {usePage} from "@inertiajs/vue3";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.vue";
import TabItem from "@/Pages/Profile/Partials/TabItem.vue";
import Edit from "@/Pages/Profile/Edit.vue";
import {useForm} from '@inertiajs/vue3'
import CreatePost from "@/Components/app/CreatePost.vue";
import PostList from "@/Components/app/PostList.vue";
import UserListItem from "@/Components/app/UserListItem.vue";
import TabPhotos from "@/Pages/Profile/TabPhotos.vue";
import IndigoButton from '@/Components/app/IndigoButton.vue';
import GrayButton from '@/Components/app/GrayButton.vue';

const imagesForm = useForm({
    avatar: null,
    cover: null,
})

const showNotification = ref(true)
const coverImageSrc = ref('')
const avatarImageSrc = ref('')
const authUser = usePage().props.auth.user;
const showFollowersModal = ref(false);
const showFollowingsModal = ref(false);

const isMyProfile = computed(() => authUser && authUser.id === props.user.id)

const props = defineProps({
    errors: Object,
    mustVerifyEmail: {
        type: Boolean,
    },
    status: {
        type: String,
    },
    success: {
        type: String,
    },
    isCurrentUserFollower: Boolean,
    followerCount: Number,
    user: {
        type: Object
    },
    posts: Object,
    followers: Array,
    followings: Array,
    photos: Array
});

function onCoverChange(event) {
    imagesForm.cover = event.target.files[0]
    if (imagesForm.cover) {
        const reader = new FileReader()
        reader.onload = () => {
            coverImageSrc.value = reader.result;
        }
        reader.readAsDataURL(imagesForm.cover)
    }
}

function onAvatarChange(event) {
    imagesForm.avatar = event.target.files[0]
    if (imagesForm.avatar) {
        const reader = new FileReader()
        reader.onload = () => {
            avatarImageSrc.value = reader.result;
        }
        reader.readAsDataURL(imagesForm.avatar)
    }
}

function resetCoverImage() {
    imagesForm.cover = null;
    coverImageSrc.value = null
}

function resetAvatarImage() {
    imagesForm.avatar = null;
    avatarImageSrc.value = null
}

function submitCoverImage() {
    imagesForm.post(route('profile.updateImages'), {
        preserveScroll: true,
        onSuccess: (user) => {
            showNotification.value = true
            resetCoverImage()
            setTimeout(() => {
                showNotification.value = false
            }, 3000)
        },
    })
}

function submitAvatarImage() {
    imagesForm.post(route('profile.updateImages'), {
        preserveScroll: true,
        onSuccess: (user) => {
            showNotification.value = true
            resetAvatarImage()
            setTimeout(() => {
                showNotification.value = false
            }, 3000)
        },
    })
}

function followUser() {
    const form = useForm({
        follow: !props.isCurrentUserFollower
    })

    form.post(route('user.follow', props.user.id), {
        preserveScroll: true
    })
}

function toggleFollowersModal() {
    showFollowersModal.value = !showFollowersModal.value;
}

function toggleFollowingsModal() {
    showFollowingsModal.value = !showFollowingsModal.value;
}

</script>

<template>
    <AuthenticatedLayout>
        <div class="max-w-[768px] mx-auto h-full overflow-auto">
            <div class="px-4">
                <div
                    v-show="showNotification && success"
                    class="my-2 py-2 px-3 font-medium text-sm bg-emerald-500 text-white"
                >
                    {{ success }}
                </div>
                <div
                    v-if="errors.cover"
                    class="my-2 py-2 px-3 font-medium text-sm bg-red-400 text-white"
                >
                    {{ errors.cover }}
                </div>

                <div class="group relative bg-white dark:bg-black dark:text-gray-100">
                    <img :src="coverImageSrc || user.cover_url || '/img/default-cover.jpg'"
                         class="w-full h-[200px] object-cover">
                    <div class="absolute top-2 right-2 ">
                        <button
                            v-if="!coverImageSrc"
                            class="bg-gray-50 hover:bg-gray-100 text-gray-800 py-1 px-2 text-xs flex items-center opacity-0 group-hover:opacity-100 rounded-full">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                 stroke="currentColor" class="w-3 h-3 mr-2">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"/>
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"/>
                            </svg>

                            <input type="file" class="absolute left-0 top-0 bottom-0 right-0 opacity-0"
                                   @change="onCoverChange"/>
                        </button>
                        <div v-else class="flex gap-2 bg-white p-2 opacity-0 group-hover:opacity-100">
                            <button
                                @click="resetCoverImage"
                                class="bg-gray-150 hover:bg-gray-100 text-gray-800 py-1 px-2 text-xs flex items-center">
                                <XMarkIcon class="h-3 w-3 mr-2"/>
                                Cancel
                            </button>
                            <button
                                @click="submitCoverImage"
                                class="bg-green-800 hover:bg-green-900 text-gray-100 py-1 px-2 text-xs flex items-center rounded-full">
                                <CheckCircleIcon class="h-3 w-3 mr-2"/>
                                Submit
                            </button>
                        </div>
                    </div>

                    <div class="flex">
                        <div
                            class="flex items-center justify-center relative group/avatar -mt-[64px] ml-[48px] w-[128px] h-[128px] rounded-full">
                            <img :src="avatarImageSrc || user.avatar_url || '/img/default_avatar.jpg'"
                                 class="w-full h-full object-cover rounded-full">
                            <button
                                v-if="!avatarImageSrc"
                                class="absolute left-0 top-0 right-0 bottom-0 bg-black/50 text-gray-200 rounded-full opacity-0 flex items-center justify-center group-hover/avatar:opacity-100">
                                <CameraIcon class="w-8 h-8"/>

                                <input type="file" class="absolute left-0 top-0 bottom-0 right-0 opacity-0"
                                       @change="onAvatarChange"/>
                            </button>
                            <div v-else class="absolute top-1 right-0 flex flex-col gap-2">
                                <button
                                    @click="resetAvatarImage"
                                    class="w-7 h-7 flex items-center justify-center bg-red-500/80 text-white rounded-full">
                                    <XMarkIcon class="h-5 w-5"/>
                                </button>
                                <button
                                    @click="submitAvatarImage"
                                    class="w-7 h-7 flex items-center justify-center bg-emerald-500/80 text-white rounded-full">
                                    <CheckCircleIcon class="h-5 w-5"/>
                                </button>
                            </div>
                        </div>
                        <div class="flex justify-between items-center flex-1 p-4">
                            <div>
                                <h2 class="font-bold text-lg">{{ user.name }}</h2>
                                <span class="text-sm cursor-pointer text-gray-500 hover:text-blue-500" @click="toggleFollowersModal">
                                    {{ followerCount }} follower(s)
                                </span>
                                &middot;
                                <span class="text-sm cursor-pointer text-gray-500 hover:text-blue-500" @click="toggleFollowingsModal">
                                    {{ followings.length }} following
                                </span>
                            </div>

                            <div v-if="!isMyProfile">
                                <IndigoButton v-if="!isCurrentUserFollower" @click="followUser">
                                    Follow
                                </IndigoButton>
                                <GrayButton v-else @click="followUser">
                                    Unfollow
                                </GrayButton>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="border-t m-4 mt-0">
                <TabGroup>
                    <TabList class="flex bg-white dark:bg-black dark:text-white">
                        <Tab v-slot="{ selected }" as="template">
                            <TabItem text="Posts" :selected="selected"/>
                        </Tab>
                        <Tab v-slot="{ selected }" as="template">
                            <TabItem text="Photos" :selected="selected"/>
                        </Tab>
                        <Tab v-if="isMyProfile" v-slot="{ selected }" as="template">
                            <TabItem text="Edit Profile" :selected="selected"/>
                        </Tab>
                    </TabList>

                    <TabPanels class="mt-2">
                        <TabPanel>
                            <template v-if="posts">
                                <CreatePost />
                                <PostList :posts="posts.data" class="flex-1"/>
                            </template>
                        </TabPanel>
                        <TabPanel>
                            <TabPhotos :photos="photos" />
                        </TabPanel>
                        <TabPanel v-if="isMyProfile">
                            <Edit :must-verify-email="mustVerifyEmail" :status="status"/>
                        </TabPanel>
                    </TabPanels>
                </TabGroup>
            </div>

            <div v-if="showFollowersModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div class="bg-white p-4 rounded-lg w-96">
                    <h2 class="text-lg font-bold mb-2">Followers</h2>
                    <div v-if="followers.length">
                        <UserListItem v-for="user in followers" :key="user.id" :user="user" />
                    </div>
                    <div v-else class="text-center">User does not have followers.</div>
                    <button @click="toggleFollowersModal" class="mt-4 bg-gray-500 text-white px-4 py-2 rounded">Close</button>
                </div>
            </div>

            <div v-if="showFollowingsModal" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                <div class="bg-white p-4 rounded-lg w-96">
                    <h2 class="text-lg font-bold mb-2">Following</h2>
                    <div v-if="followings.length">
                        <UserListItem v-for="user in followings" :key="user.id" :user="user" />
                    </div>
                    <div v-else class="text-center">The user is not following anybody.</div>
                    <button @click="toggleFollowingsModal" class="mt-4 bg-gray-500 text-white px-4 py-2 rounded">Close</button>
                </div>
            </div>
        </div>
    </AuthenticatedLayout>
</template>

<style scoped>

</style>