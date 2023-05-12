import { boot } from "quasar/wrappers";
import golobalComponents from "src/scripts/golobalComponents.js";
import { createPinia } from "pinia";
import piniaPersist from "pinia-plugin-persist";
import { Chart, registerables } from "chart.js";
import { createI18n } from "vue-i18n";

export default boot(({ app }) => {
  console.log("Vue App 초기화: ", app.version);

  // 전역 컴포넌트 등록
  app.use(golobalComponents);

  // Pinia 사용 등록
  const pinia = createPinia();
  pinia.use(piniaPersist);
  app.use(pinia);

  //차트사용
  Chart.register(...registerables);

  // 다국어 i18n 사용 등록
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "ko-KR", // 기본 언어
  });
  app.use(i18n);

  // 퀘이사 language pack 로딩 후 전역 변수 등록
  const qLangList = import.meta.glob("../../node_modules/quasar/lang/*.mjs");
  app.config.globalProperties.qLangList = qLangList;
});
