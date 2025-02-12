<script setup>
import {onMounted, ref} from 'vue';
import ApplicationLogo from '@/Components/ApplicationLogo.vue';
import Dropdown from '@/Components/Dropdown.vue';
import DropdownLink from '@/Components/DropdownLink.vue';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink.vue';
import {Link, router, usePage} from '@inertiajs/vue3';
import {MoonIcon} from '@heroicons/vue/24/solid'

const showingNavigationDropdown = ref(false);
const keywords = ref(usePage().props.search || '')

const authUser = usePage().props.auth.user;

function search() {
    router.get(route('search', encodeURIComponent(keywords.value)))
}

function toggleDarkMode(){
    const html = window.document.documentElement
    if (html.classList.contains('dark')) {
        html.classList.remove('dark')
        localStorage.setItem('darkMode', '0')
    } else {
        html.classList.add('dark')
        localStorage.setItem('darkMode', '1')
    }
}
</script>

<template>
    <div class="h-full overflow-hidden flex flex-col bg-gray-100 dark:bg-black/25">
        <nav class="bg-white dark:bg-black border-b border-gray-100 dark:border-gray-800">
            <!-- Primary Navigation Menu -->
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div class="flex items-center justify-between gap-4 h-16">
                    <div class="flex">
                        <!-- Logo -->
                        <div class="shrink-0 flex items-center">
                            <Link :href="route('dashboard')">
                                <ApplicationLogo
                                    class="block h-9 w-auto fill-current text-gray-800 dark:text-gray-200"
                                />
                            </Link>
                        </div>

                    </div>

                    <div class="relative mt-3 md:mt-0">
                       <input v-model="keywords" wire:model.debounce.500ms="search" type="text" class="bg-gray-800 text-sm text-gray-100 rounded-full w-64 px-10 pl-10 py-1 focus:outline-none focus:shadow-outline" placeholder="Search" @keyup.enter="search">
                       <div class="absolute top-0">
                          <svg class="fill-current w-4 text-gray-500 mt-2 ml-2" viewBox="0 0 24 24"><path class="heroicon-ui" d="M16.32 14.9l5.39 5.4a1 1 0 01-1.42 1.4l-5.38-5.38a8 8 0 111.41-1.41zM10 16a6 6 0 100-12 6 6 0 000 12z"/></svg>
                      </div>
                    </div>
                    <!-- <div class="flex-1">
                        <TextInput v-model="keywords" placeholder="Search on the website" class="w-full"
                                   @keyup.enter="search"/>
                    </div> -->


                    <div class="hidden sm:flex sm:items-center">
                        <!-- Settings Dropdown -->
                        <div class="ms-3 relative">
                                <Dropdown v-if="authUser" align="right" width="48">
                                    <template #trigger>
                                        <span class="inline-flex rounded-md">

                                            <button @click="toggleDarkMode" class="dark:text-white mr-3">
                                                  <MoonIcon class="w-5 h-5"/>
                                            </button>
                                            
                                            <button
                                                type="button"
                                                class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 dark:text-gray-400 bg-white dark:bg-black hover:text-gray-700 dark:hover:text-gray-300 focus:outline-none transition ease-in-out duration-150"
                                            >
                                                <!-- {{ authUser.name }} -->


                                                    <Link :href="route('profile', authUser.username)">
                                                       <img :src="authUser.avatar_url"
                                                         class="w-[25px] border border-2 transition-all hover:border-blue-700 rounded-full"/>
                                                   </Link>

                                                <svg
                                                    class="ms-2 -me-0.5 h-4 w-4"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                        clip-rule="evenodd"
                                                    />
                                                </svg>
                                            </button>
                                        </span>
                                    </template>

                                    <template #content>
                                        <DropdownLink :href="route('profile', {username: authUser.username })">
                                            Profile
                                        </DropdownLink>
                                        <DropdownLink :href="route('logout')" method="post" as="button">
                                            Log Out
                                        </DropdownLink>
                                    </template>
                                </Dropdown>
                                <div v-else>
                                    <Link :href="route('login')" class="dark:text-gray-100">
                                        Login
                                    </Link>
                                </div>
                        </div>
                    </div>

                    <!-- Hamburger -->
                    <div class="-me-2 flex items-center sm:hidden">
                        <button
                            @click="showingNavigationDropdown = !showingNavigationDropdown"
                            class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 dark:text-gray-500 hover:text-gray-500 dark:hover:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-900 focus:outline-none focus:bg-gray-100 dark:focus:bg-gray-900 focus:text-gray-500 dark:focus:text-gray-400 transition duration-150 ease-in-out"
                        >
                            <svg class="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path
                                    :class="{
                                            hidden: showingNavigationDropdown,
                                            'inline-flex': !showingNavigationDropdown,
                                        }"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                />
                                <path
                                    :class="{
                                            hidden: !showingNavigationDropdown,
                                            'inline-flex': showingNavigationDropdown,
                                        }"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <!-- Responsive Navigation Menu -->
            <div
                :class="{ block: showingNavigationDropdown, hidden: !showingNavigationDropdown }"
                class="sm:hidden"
            >

                <!-- Responsive Settings Options -->
                <div class="pt-4 pb-1 border-t border-gray-200 dark:border-gray-600">
                            <template v-if="authUser">
                                <div class="px-4">
                                    <div class="font-medium text-base text-gray-800 dark:text-gray-200">
                                        {{ authUser.name }}
                                    </div>

                                <div class="font-medium text-sm text-gray-500">{{ $page.props.auth.user.email }}</div>
                        </div>

                        <div class="mt-3 space-y-1">
                            <ResponsiveNavLink :href="route('profile', {username: authUser.username })"> Profile
                            </ResponsiveNavLink>
                            <ResponsiveNavLink :href="route('logout')" method="post" as="button">
                                Log Out
                            </ResponsiveNavLink>
                        </div>
</template>
<template>
    Login button
</template>
</div>
</div>
</nav>

<!-- Page Heading -->
<header class="bg-white dark:bg-gray-800 shadow" v-if="$slots.header">
<div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
    <slot name="header"/>
</div>
</header>

<!-- Page Content -->
<main class="flex-1 overflow-hidden">
<slot/>
</main>
</div>
</template>
