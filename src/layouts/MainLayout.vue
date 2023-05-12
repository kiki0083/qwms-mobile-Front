<template>
  <MainInit />
  <q-layout view="lHh Lpr lFf">
    <!-----------------------------------------------------------------------
      HEADER START
    ------------------------------------------------------------------------>
    <q-header reveal :reveal-offset="100" elevated>
      <MainHeader @toggleLeftDrawer="toggleLeftDrawer()" />
    </q-header>

    <!-----------------------------------------------------------------------
      MENU START
    ------------------------------------------------------------------------>
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-scroll-area class="fit">
        <q-item-label header class="drawer">
          <q-img src="/img/QLogic.jpg" width="70px" />
        </q-item-label>
        <MainMenu />
      </q-scroll-area>
    </q-drawer>

    <!-----------------------------------------------------------------------
      CONTENTS START
    ------------------------------------------------------------------------>
    <q-page-container>
      <MainPage />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";

import commonStatic from "src/scripts/commonStatic";

import MainInit from "src/layouts/MainInit.vue";
import MainHeader from "src/layouts/MainHeader.vue";
import MainMenu from "src/layouts/MainMenu.vue";
import MainPage from "src/layouts/MainPage.vue";

const $q = useQuasar();

const ERROR_NOTIFY = commonStatic.ERROR_NOTIFY;

// 환경설정 .env 파일
const appName = import.meta.env.VITE_APP_NAME;

// 메뉴 on/off 처리
const leftDrawerOpen = ref(false);
const toggleLeftDrawer = () => {
  leftDrawerOpen.value = !leftDrawerOpen.value;
};
</script>

<style></style>
