<template>
  <QVModal
    :modalVis="pageModalVis"
    left="40px"
    top="60px"
    width="80%"
    height="30%"
    @closeModal="
      (modalVis) => {
        pageModalVis = modalVis;
      }
    "
  >
    <template #header>ProFile</template>
    <template #body>
      <div class="q-pa-md row items-start q-gutter-md">
        <q-card class="my-card">
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img src="/img/lubentis.svg" />
              </q-avatar>
            </q-item-section>
            <q-item-section>
              <q-item-label>{{ sessionStore.userNm }}</q-item-label>
              <q-item-label caption>{{ sessionStore.userId }}</q-item-label>
              <q-item-label caption>{{ sessionStore.userHp }}</q-item-label>
              <q-item-label caption>{{ sessionStore.userEmail }}</q-item-label>
              <q-item-label caption>{{ sessionStore.userTel }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-card>
      </div>
    </template>
  </QVModal>
</template>

<script setup>
import QVModal from "src/components/popup/QVModal.vue";
import { useSession } from "stores/session";
import { ref } from "vue";

const sessionStore = useSession(); //세션세팅

/* 모달창 구현을 위한 기본 세팅 START --------------------- */
let pageModalVis = ref(false);
// 모달창 오픈(부모 컴포넌트에서 호출함)
const openModal = () => {
  pageModalVis.value = true;
};
// defineExpose를 통하여 함수를 내보낸다.
defineExpose({
  openModal,
});
/* 모달창 구현을 위한 기본 세팅 FINISH --------------------- */
</script>

<style lang="scss" scoped></style>
