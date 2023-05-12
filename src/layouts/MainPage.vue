<template>
  <q-page>
    <!-----------------------------------------------------------------------
      PAGE ROUTER START
     ------------------------------------------------------------------------>
    <router-view v-slot="{ Component }">
      <transition>
        <keep-alive :include="stCacheComponentList">
          <component :is="Component" />
        </keep-alive>
      </transition>
    </router-view>
    <!-----------------------------------------------------------------------
      MDI TABS START
     ------------------------------------------------------------------------>
    <q-page-sticky expand position="top-left" class="tab-bg" v-if="useMdi">
      <q-tabs
        v-model="router.currentRoute.value.fullPath"
        dense
        outside-arrows
        mobile-arrows
        indicator-color="green-5"
      >
        <div class="row tab" v-for="(mdi, idx) in stMdiList" :key="idx">
          <div class="col-10 full first">
            <q-tab
              :name="mdi.link"
              :label="mdi.title"
              no-caps
              class="text-grey-8"
              @click="openMdi(mdi)"
            />
          </div>
          <div class="col-2 flex flex-center second">
            <q-btn
              v-if="mdi.title !== 'Home'"
              size="xs"
              icon="close"
              :flat="true"
              padding="xs"
              color="grey-10"
              class="close"
              @click="closeMdi(mdi, idx)"
            />
          </div>
        </div>
      </q-tabs>
      <q-separator />
    </q-page-sticky>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useMdiStore } from "stores/menu";

// MDI 스토어
const mdiStore = useMdiStore();
// keep-alive 에 배열로 컴포넌트명을 문자 배열로 설정하면 컴포넌트 캐쉬가 됨
const stCacheComponentList = storeToRefs(mdiStore).getCacheComponentList;
const stMdiList = storeToRefs(mdiStore).getMdiList;

// MDI 사용여부
const useMdi = ref(false);
if (import.meta.env.VITE_MDI_USE === "true") useMdi.value = true;
else useMdi.value = false;

const router = useRouter();

// MDI 클릭 시 페이지 컴포넌트 오픈
// selMdi = menu 개체
const openMdi = (selMdi) => {
  router.push({
    path: selMdi.link,
  });
};

// MDI 닫기버튼 클릭 시 MDI 삭제 및 페이지 컴포넌트 캐쉬 삭제
// selMdi = menu 개체
const closeMdi = (selMdi, idx) => {
  mdiStore.removeMdiList(selMdi);

  //닫은 페이지 바로 전 페이지 오픈
  router.push({
    path: stMdiList.value[idx - 1].link,
  });
};
</script>
