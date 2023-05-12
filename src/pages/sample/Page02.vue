<template>
  <QVModal
    :modalVis="pageModalVis"
    width="100%"
    height="50%"
    @closeModal="(modalVis) => (pageModalVis = modalVis)"
  >
    <template #header>열어본 페이지</template>
    <template #body>
      <q-card-section>
        <div class="q-gutter-sm">
          <div
            v-for="(mdi, idx) in stMdiList"
            :key="idx"
            class="row ma-lg rounded-borders text-white cursor-pointer"
          >
            <q-chip
              style="width: 500px; height: 40px; border: 1px solid primary"
              square
              removable
              @remove="closeMdi(mdi)"
              color="secondary"
              text-color="white"
              icon="bookmark"
              clickable
              @click="goOpendMenu(mdi)"
            >
              {{ mdi.title }}
            </q-chip>
          </div>
        </div>
      </q-card-section>
    </template>
  </QVModal>
</template>

<script setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";

import { useMdiStore } from "stores/menu";

// MDI 스토어
const mdiStore = useMdiStore();
const stMdiList = storeToRefs(mdiStore).getMdiList;

// 열어본 페이지 클릭
const goOpendMenu = (mdi) => {
  openMenu(mdi);
  pageModalVis2.value = false;
};

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
