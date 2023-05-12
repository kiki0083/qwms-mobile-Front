<template>
  <q-toolbar>
    <q-btn
      flat
      dense
      round
      icon="menu"
      aria-label="Menu"
      @click="toggleLeftDrawer"
    />

    <!-- 시스템 메뉴 탭 영역 ----------------------------->
    <q-toolbar-title>
      <q-tabs
        align="left"
        v-model="selSystem"
        indicator-color="transparent"
        active-class="active-menu"
        outside-arrows
        mobile-arrows
      >
        <q-tab
          v-for="system in systemList"
          :key="system.app_cd"
          :name="system.app_nm"
          :label="system.app_nm"
          @click="changeMenu(system)"
        />
      </q-tabs>
    </q-toolbar-title>

    <!-- 기능버튼 영역 패스워드 수정 우선기능 제어를 막음----------->
    <!--
    <q-btn flat round dense icon="settings" class="headerButton">
      <q-menu :offset="[0, 10]" style="min-width: 150px">
        <q-list style="min-width: 150px">
          <q-item clickable v-close-popup @click="profile()">
            <q-item-section>My Page</q-item-section>
          </q-item>
          <q-separator />
          <q-item clickable v-close-popup @click="chgPasswd()">
            <q-item-section> 비밀번호 변경</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-btn>
    -->
    <!-- <q-btn flat round dense icon="logout" @click="opendMeuns()" /> -->
    <q-btn
      flat
      round
      dense
      icon="logout"
      class="headerButton"
      @click="logout()"
    />
  </q-toolbar>

  <!-- My Page -->
  <MyProfile ref="refProfile" />
  <!-- 비밀번호 변경 -->
  <Page02 ref="refChgPasswd" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useAxios } from "boot/axios";
import { useRouter } from "vue-router";
import { useMenuStore } from "stores/menu";
import { useSession } from "stores/session";
import { useQuasar } from "quasar";

import commonStatic from "src/scripts/commonStatic";
import MyProfile from "pages/MyProfile.vue";
import Page02 from "pages/ChgPasswd.vue";

const $q = useQuasar();
const ERROR_NOTIFY = commonStatic.ERROR_NOTIFY;

const sessionStore = useSession(); //세션

const router = useRouter();
const emit = defineEmits(["toggleLeftDrawer"]);

const apKey = import.meta.env.VITE_APP_APKEY; //접속정봅
const laKey = import.meta.env.VITE_APP_LAKEY; //사용언어
const deviceGub = import.meta.env.VITE_APP_DEVICE; //사용기기

// 시스템 메뉴 리스트
var systemList = ref([]);
const selSystem = ref("");

const menuStore = useMenuStore(); //시스템 하위 메뉴 스토어

// 메뉴 on/off 처리
const toggleLeftDrawer = () => {
  emit("toggleLeftDrawer");
};

// 모달
const refProfile = ref();
const profile = () => {
  refProfile.value.openModal();
};
const refChgPasswd = ref();
const chgPasswd = () => {
  refChgPasswd.value.openModal();
};

// 시스템 탭 클릭 시 하위 메뉴 리스트 변경
const changeMenu = () => {
  const param = {
    PARAM: {
      ctkey: sessionStore.ctKey,
      apkey: apKey,
      urkey: sessionStore.urKey,
      eqtype: deviceGub,
    },

    COMMON: {
      //LAKEY: "ENG",
      LAKEY: laKey,
      USER_INFO: {
        urKey: sessionStore.urKey,
      },
    },
  };
  //console.log(JSON.stringify(param));
  useAxios("post", "/ams/commonController/selectMenuMobile.do", param, true)
    .then((data) => {
      let menu = makeTree(data.LIST.MENU_LIST, [], "0");
      //console.log(JSON.stringify(menu, null, 2));
      menuStore.setMenuList(convertMenu(menu)); //메뉴 세팅
      makeRoute(menuStore.getMenuList);

      //console.log(JSON.stringify(menuStore.getMenuList, null, 2));
    })
    .catch((error) => {
      ERROR_NOTIFY.message = error.message;
      $q.notify(ERROR_NOTIFY);
    });
};

/* 메뉴를 계층 구조로 만듬*/
const makeTree = (menus, returnMenu, id) => {
  let tempMenu = [];
  tempMenu = menus.filter((row) => {
    return row.uppermekey === id;
  });

  for (let i = 0; i < tempMenu.length; i++) {
    let subMenu = [];
    subMenu = menus.filter((row) => {
      return row.uppermekey === tempMenu[i].mekey;
    });
    if (subMenu.length > 0) {
      tempMenu[i].children = [];
    }

    makeTree(menus, tempMenu[i].children, tempMenu[i].mekey);
    returnMenu.push(tempMenu[i]);
  }

  //제일 상위는 제외
  //메뉴는 3단으로 처리
  return menus[0].children;
};

/* 시스템 메뉴 구조를 프레임워크 메뉴 구조로 변경 */
const convertMenu = (menus) => {
  menus.forEach((menu) => {
    menu.title = menu.mename;
    menu.explanation = menu.mename;
    menu.link = menu.uspath ? "/main/" + menu.mekey : ""; //link URL의 경우 유니크하기만 하면된다.
    menu.component = menu.uspath;

    // 하위 메뉴가 존재할 경우 라우터 추가 함수 실행
    if (menu.children) {
      convertMenu(menu.children);
    }
  });

  return menus;
};

/**  Vue Router에 routes 추가 (routes.js)
    MainLayout 하위의 children[] 에 추가함
    menu.component 는 컴포넌트의 절대경로로 입력해야 함.
   재귀함수
**/
const makeRoute = (menus) => {
  const modules = import.meta.glob("/src/pages/**/*.vue");
  menus.forEach((menu) => {
    if (menu.link) {
      let _link = menu.link;
      router.addRoute("MainLayout", {
        path: _link,
        name: _link,
        meta: {
          breadcrumbs: menu.breadcrumbs,
        },
        component: modules[menu.component],
      });
    }
    // 하위 메뉴가 존재할 경우 라우터 추가 함수 실행
    if (menu.children) {
      makeRoute(menu.children);
    }
  });
};

// 로그아웃
const logout = () => {
  const param = {
    CPMMON: {
      USER_INFO: { urKey: sessionStore.urKey },
    },
  };
  useAxios("post", "/ams/loginController/actionLogout.do", param, true)
    .then(function (data) {})
    .catch(function (error) {
      console.log(error.message);
    })
    .finally(function () {
      sessionStore.dispenseSession(); //세션삭제
      alert("로그아웃 되었습니다.");
      document.location.href = "/";
    });
};

onMounted(() => {
  changeMenu();
});
</script>

<style lang="scss" scoped></style>
