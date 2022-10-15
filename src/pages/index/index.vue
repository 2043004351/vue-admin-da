<template>
    <p>index</p>
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
onMounted(() => {
//   setTimeout(() => {
//     router.push("/system/user")
//     // debugger
//   }, 5000);
});
</script>

<style scoped></style>
