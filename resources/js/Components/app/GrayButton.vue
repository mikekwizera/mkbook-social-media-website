<script setup>

defineProps({
    type: {
        type: String,
        default: 'button'
    }
})

</script>

<template>
    <button
        :type="type"
        class="flex items-center justify-center rounded-md bg-gray-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600 relative"
    >
        <slot></slot>
    </button>
</template>

<style scoped>

</style>
