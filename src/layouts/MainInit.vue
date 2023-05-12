<template>
  <div></div>
</template>

<script setup>
import { onMounted } from "vue";

import { api } from "boot/axios";
import { useI18n } from "vue-i18n";

const i18n = useI18n({ useScope: "global" }); // 다국어 세팅

/**
 * 다국어 세팅
 */
const setI18n = () => {
  // axios로 가져올 언어 셋
  let i18nMessage = {
    isoName: "ko-KR",
    nativeName: "한국어",
    prodName: "퀘이사!!",
    label: {
      clear: "초기화",
      ok: "확인",
      cancel: "취소",
    },
  };

  i18n.setLocaleMessage("ko-KR", i18nMessage);
};

onMounted(() => {
  setI18n();
});
</script>
