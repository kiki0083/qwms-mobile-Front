<template>
  <q-list>
    <!-----------------------------------------------------------------------
      MENU 상단 (메뉴, 즐겨찾기, 기능) START
    ------------------------------------------------------------------------>

    <div class="row">
      <div class="col-12">
        <q-tabs
          v-model="menu_favorites"
          dense
          class="text-grey-7 q-px-sm"
          active-class="active-02"
          indicator-color="transparent"
        >
          <q-tab name="menus" label="메뉴" />
          <q-tab name="favorites" label="열어본 페이지" />
        </q-tabs>
      </div>
      <!-- <div class="col-4 text-right">
        <q-toggle
          v-model="toggleOpen"
          label="Open"
          left-label
          size="xs"
          @click="toggleMenus"
        />
      </div> -->
    </div>

    <q-tab-panels
      v-model="menu_favorites"
      animated
      transition-prev="scale"
      transition-next="scale"
    >
      <!-----------------------------------------------------------------------
      MENU  START
    ------------------------------------------------------------------------>

      <q-tab-panel name="menus" class="q-pl-xs q-py-xs">
        <!-- Level 1 -->
        <q-expansion-item
          v-for="(level_1, idx_1) in stMenuList"
          :key="idx_1"
          expand-separator
          :label="level_1.title"
          @click.stop="openMenu(1, level_1)"
          class="text-grey-7 font-size-sm font-weight-xl"
          :hide-expand-icon="level_1.children ? false : true"
          v-model="toggleOpen1[idx_1]"
        >
          <!-- :class="setMenuSelect(level_1)" -->
          <q-separator />
          <!-- Level 2 -->
          <q-expansion-item
            v-for="(level_2, idx_2) in level_1.children"
            :key="idx_2"
            :header-inset-level="0.3"
            :label="level_2.title"
            @click="openMenu(2, level_2)"
            class="text-grey-7 font-weight-md"
            :hide-expand-icon="level_2.children ? false : true"
            v-model="toggleOpen2[idx_2]"
          >
            <q-separator />

            <!-- Level 3 -->
            <q-expansion-item
              v-for="(level_3, idx_3) in level_2.children"
              :key="idx_3"
              :header-inset-level="0.6"
              :label="level_3.title"
              @click="openMenu(3, level_3)"
              class="text-grey-7"
              :hide-expand-icon="level_3.children ? false : true"
              v-model="toggleOpen3[idx_3]"
            />
          </q-expansion-item>
        </q-expansion-item>
      </q-tab-panel>
      <!-----------------------------------------------------------------------
      즐겨찾기  START
    ------------------------------------------------------------------------>
      <q-tab-panel name="favorites" class="q-pl-xs q-py-xs">
        <q-expansion-item
          v-for="(level_1, idx_1) in stMdiList"
          :key="idx_1"
          expand-separator
          :label="level_1.title"
          @click.stop="openFavorite($event, 1, level_1, idx_1)"
          :hide-expand-icon="
            level_1.children === null || level_1.children === undefined
              ? true
              : false
          "
          switch-toggle-side
          :icon="level_1.title === 'Home' ? '' : 'delete'"
        >
          <!-- Level 2 -->
          <q-expansion-item
            v-for="(level_2, idx_2) in level_1.subMenuList"
            :key="idx_2"
            :header-inset-level="0.3"
            :label="level_2.title"
            :hide-expand-icon="level_2.children === null ? true : false"
            @click.stop="openFavorite($event, 2, level_2)"
          >
            <!-- Level 3 -->
            <q-expansion-item
              v-for="(level_3, idx_3) in level_2.subMenuList"
              :key="idx_3"
              :header-inset-level="0.6"
              :label="level_3.title"
              :hide-expand-icon="level_3.children === null ? true : false"
              @click.stop="openFavorite($event, 3, level_3)"
            />
          </q-expansion-item>
        </q-expansion-item>
      </q-tab-panel>
    </q-tab-panels>
  </q-list>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { storeToRefs } from "pinia";

import { useMenuStore, useMdiStore } from "stores/menu";

const test = (value) => {
  console.log("test: ", route.fullPath);
};
const router = useRouter();
const route = useRoute();

// 메뉴 선택 여부
// 여러번 실행되고 있는데 왜 그런지는 모르겠음.
// 우선 주석
function setMenuSelect(menu) {
  if (menu.link === undefined) return;

  console.log("route.fullPath : ", route.fullPath);
  if (menu.link === route.fullPath) return "active-menu";
  else return "";
}

// 메뉴 스토어
const menuStore = useMenuStore();
const stMenuList = storeToRefs(menuStore).getMenuList;

// MDI 스토어
const mdiStore = useMdiStore();
const stMdiList = storeToRefs(mdiStore).getMdiList;

//미구현
let toggleOpen = ref(false);
let toggleOpen1 = ref([]);
let toggleOpen2 = ref([]);
let toggleOpen3 = ref([]);
let menu_favorites = ref("menus");

let selMenu1 = ref(null);
let selMenu2 = ref(null);
let selMenu3 = ref(null);

const openFavorite = (evt, level, selMenu, idx) => {
  // 페이지 텍스트 클릭
  if (evt.srcElement.tagName === "DIV") openMenu(level, selMenu);
  // 아바타 이미지 클릭
  else if (evt.srcElement.tagName === "I") {
    closeMenu(selMenu, idx);
    //emit("closeMdi", selMenu);
  }
};

// 메뉴 클릭 시 MDI 오픈 및 페이지 오픈
// 클릭한 메뉴 클래스 지정
const openMenu = (level, selMenu) => {
  // link가 없으면 리턴
  if (selMenu.link === "") return;
  // 이미 열려있는 페이지인지 mdiList와 비교 검사
  let mdiList = mdiStore.getMdiList;
  let isOpend = false;

  for (let idx = 0; idx < mdiList.length; idx++) {
    if (Object.is(mdiList[idx], selMenu)) {
      isOpend = true;
      break;
    }
  }

  // 페이지 이동
  router.push({
    path: selMenu.link,
  });

  if (isOpend) return;
  //신규 메뉴인 경우 MDI에 추가
  mdiStore.addMdiList(selMenu);

  // 열린 메뉴 구분 표시
  selMenu1.value = "";
  selMenu2.value = "";
  selMenu3.value = "";
  if (level === 1) {
    selMenu1.value = selMenu.link;
  } else if (level === 2) {
    selMenu2.value = selMenu.link;
  } else if (level === 3) {
    selMenu3.value = selMenu.link;
  }
};

// MDI 닫기버튼 클릭 시 MDI 삭제 및 페이지 컴포넌트 캐쉬 삭제
// selMdi = menu 개체
const closeMenu = (selMenu, idx) => {
  mdiStore.removeMdiList(selMenu);

  //닫은 페이지 바로 전 페이지 오픈
  router.push({
    path: stMdiList.value[idx - 1].link,
  });
};

// 홈페이지 설정 시 오픈
const openHomePage = () => {
  const homeRoute = {
    title: "Home",
    explanation: "홈",
    link: "/main/home",
    component: "/sr/pages/hcp/Status.vue ",
    meta: {
      breadcrumbs: "Home",
    },
  };

  for (let idx = 0; idx < router.getRoutes().length; idx++) {
    let menu = router.getRoutes()[idx];

    if (menu.path === homeRoute.link) {
      // 페이지 이동
      router.push({
        path: menu.path,
      });
      // mdi list 추가
      mdiStore.addMdiList(homeRoute);
    }
  }
};

onMounted(() => {
  //초기 MDI 세팅
  openHomePage();
});

// 메뉴 기본구성 예제
// const menuList1 = [
//   {
//     title: "AMS Level 1",
//     explanation: "1레벨",
//     children: [
//       {
//         title: "Level 1-1",
//         explanation: "2레벨 1 - 텍스트",
//         link: "/main/typography",
//         component: "pages/dev/TypographyTest.vue",
//       },
//       {
//         title: "Level 1-2",
//         explanation: "2레벨 2",
//         children: [
//           {
//             title: "Level 1-2-1",
//             explanation: "3레벨 1 - 폼",
//             link: "/main/form",
//             component: "pages/dev/FormTest.vue",
//           },
//           {
//             title: "Level 1-2-2",
//             explanation: "3레벨 2 - 컬러",
//             link: "/main/color",
//             component: "pages/dev/ColorTest.vue",
//           },
//         ],
//       },
//     ],
//   },
//   {
//     title: "폼2",
//     explanation: "폼 테스트",
//     link: "/form2",
//     component: "/src/pages/dev/FormTest.vue",
//   },
// ];
</script>
