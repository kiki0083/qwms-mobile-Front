import QVInput from "src/components/search/QVInput.vue";
import QVSelect from "src/components/search/QVSelect.vue";
import QVCheckbox from "src/components/search/QVCheckbox.vue";
import QVRadio from "src/components/search/QVRadio.vue";
import QVToggle from "src/components/search/QVToggle.vue";
import QVCalendar from "src/components/search/QVCalendar.vue";
import QVCalendarPeriod from "src/components/search/QVCalendarPeriod.vue";

import QVPageHeader from "src/components/page/QVPageHeader.vue";
import QVModal from "src/components/popup/QVModal.vue";

export default {
  install(app) {
    /*
    1. 폼 아이템 컴포넌트 등록
    */
    app.component("QVInput", QVInput);
    app.component("QVSelect", QVSelect);
    app.component("QVCheckbox", QVCheckbox);
    app.component("QVRadio", QVRadio);
    app.component("QVToggle", QVToggle);
    app.component("QVCalendar", QVCalendar);
    app.component("QVCalendarPeriod", QVCalendarPeriod);

    /*
    2. 페이지 컴포넌트 등록
    */
    app.component("QVPageHeader", QVPageHeader);

    /*
    3. 유틸 컴포넌트 등록
    */
    app.component("QVModal", QVModal);
  },
};
