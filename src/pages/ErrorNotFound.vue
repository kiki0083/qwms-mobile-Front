<template>
  <div class="text-center py-5">
    <h1>404 Not Found</h1>
    <q-separator />
    <h5>홈으로 이동합니다.</h5>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
const router = useRouter();
const goMain = () => {
  router.push({
    path: "/main",
  });
};
setTimeout(() => {
  goMain();
}, 500);
</script>

<style lang="scss" scoped></style>
