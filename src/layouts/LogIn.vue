<template>
  <div class="window-height window-width row justify-center items-center">
    <div class="column bg-green-1">
      <div class="column text-center q-my-md">
        <q-img
          class="shadow-1"
          src="/img/QLogic.jpg"
          style="height: 150px; width: 400px"
        />
        <h4 class="text-h6 q-my-md">
          <span class="text-green-5">QLOGIC</span
          ><span class="text-grey-6"> Mobile</span>
        </h4>
      </div>
      <div class="row" style="margin: 10px 65px">
        <q-card square bordered class="q-pa-md shadow-1">
          <q-card-section>
            <q-form class="q-gutter-md">
              <q-input
                square
                filled
                clearable
                v-model="id"
                type="text"
                label="id"
              />
              <q-input
                square
                filled
                clearable
                v-model="passWord"
                type="password"
                label="password"
              />
            </q-form>
          </q-card-section>
          <q-card-actions class="q-px-md">
            <q-btn
              unelevated
              color="green-5"
              size="lg"
              class="full-width"
              label="Login"
              @click="login"
            />
          </q-card-actions>
          <!--
          <q-card-section class="text-center q-pa-none">
            <p class="text-grey-6">!!!로그인 페이지!!!</p>
          </q-card-section>
          -->
        </q-card>
      </div>
    </div>
  </div>
</template>

<script></script>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAxios } from "boot/axios";
import { QSpinnerGears, useQuasar, Cookies } from "quasar";
import commonStatic from "src/scripts/commonStatic";
import { useSession } from "stores/session";

//아이디,패스워드
const id = ref("");
const passWord = ref("");

const $q = useQuasar();
const ERROR_NOTIFY = commonStatic.ERROR_NOTIFY;

//세션세팅
const sessionStore = useSession();
//접속구분
const apKey = import.meta.env.VITE_APP_APKEY;

/**
 * 로그인
 */
const login = () => {
  const param = {
    PARAM: {
      urKey: id.value,
      urPw: passWord.value,
      appkey: "WM",
    },

    COMMON: {
      APKEY: apKey,
      SESSION_USERINFO: {},
    },
  };

  useAxios(
    "post",
    "/ams/loginController/actionLogin.do",
    param,
    true,
    QSpinnerGears
  )
    .then((data) => {
      console.log("보기", JSON.stringify(data, null, 2));
      //로그인이 성공하면 메인페이지로 이동
      if (data.COMMON.ERROR_CODE === "0000") {
        //세션세팅
        sessionStore.setSession(data.MAP.USER_INFO);
        //메세지 테스트
        getMessage();
        //getCommonCode();
        //메인으로 점프
        //getConfig();
        mainPage();
      } else if (data.COMMON.ERROR_CODE === "9999") {
        ERROR_NOTIFY.message = data.COMMON.MESSAGE;
        $q.notify(ERROR_NOTIFY);
      }
    })
    .catch((error) => {
      ERROR_NOTIFY.message = error.message;
      $q.notify(ERROR_NOTIFY);
    });
};

/* 다국어 가져오기 테스트*/
const getMessage = () => {
  const param = {
    PARAM: {
      apkey: "WM",
      lakey: "KOR",
      ctkey: sessionStore.ctKey, //자신의 센터코드
    },

    COMMON: {
      ACTIVE_APP: "WM",
      USER_INFO: { urKey: sessionStore.urKey },
    },
  };

  useAxios(
    "post",
    "/ams/commonController/selectAppMessage.do",
    param,
    true
  ).then((data) => {
    console.log("다국어1", JSON.stringify(data, null, 2));
  });
};

/* 공통코드 */
const getCommonCode = () => {
  const param = {
    PARAM: {
      // urKey: id.value,
      // urPw: passWord.value,
      // apkey: "ADMIN",
      // lakey: "KOR",
      searchid: "50",
      activeApp: "WM",
    },

    COMMON: {
      DEVICE: "MOBILE",
      ACTIVE_APP: "WM",
      USER_INFO: { urKey: id.value },
    },
  };

  useAxios(
    "post",
    "/ams/commonController/selectCommonCode.do",
    param,
    true
  ).then((data) => {
    console.log("code", JSON.stringify(data, null, 2));
  });
};

/* 정보입력 */
const getConfig = () => {
  const param = {
    PARAM: {
      ctkey: "Q1000",
      //다국어
      apkey: "WM",
      lakey: "KOR",
    },

    COMMON: {
      //ACTIVE_APP: "WM", //다국어
      USER_INFO: { urKey: id.value },
    },
  };

  useAxios(
    "post",
    "/ams/commonController/selectModuleConfig.do",
    param,
    true
  ).then((data) => {
    console.log("code", JSON.stringify(data, null, 2));
  });
};

/**
 * 라우터 메인으로 점프
 */
const router = useRouter();
const mainPage = () => {
  router.push("/main");
};
</script>

<style>
.q-card {
  width: 270px;
}
</style>
