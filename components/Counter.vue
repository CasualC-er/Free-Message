<template>
    <p>{{ count }}</p>
    <button class="btn btn-blue" @click="count++">Add 1</button>
</template>

<script>
export default {
    data() {
        return {
            count: 0
        }
    }
}
</script>

<style scoped>
.btn {
    @apply font-bold py-2 px-4 rounded;
}

.btn-blue {
    @apply bg-blue-500 text-white;
}

.btn-blue:hover {
    @apply bg-blue-700;
}
</style>