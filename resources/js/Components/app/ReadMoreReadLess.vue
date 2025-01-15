<script setup>

import {Disclosure, DisclosureButton, DisclosurePanel} from "@headlessui/vue";
defineProps({
    content: String,
    contentClass: String
})

</script>

<template>
    <Disclosure v-slot="{ open }">
        <div class="ck-content-output" :class="contentClass" v-if="!open" v-html="content.substring(0, 200)"/>
        <template v-if="content && content.length > 200" >
            <DisclosurePanel>
                <div class="ck-content-output" :class="contentClass" v-html="content"/>
            </DisclosurePanel>
            <div class="mt-0 flex justify-end">
                <DisclosureButton class="text-blue-500 hover:underline">
                    {{ open ? 'See less' : 'See more' }}
                </DisclosureButton>
            </div>
        </template>
    </Disclosure>

</template>

<style scoped>

</style>
