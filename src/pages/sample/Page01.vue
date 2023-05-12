<template>
  <q-page class="q-py-xl q-px-sm">
    <!-----------------------------------------------------------------------
      HEADER START
     ------------------------------------------------------------------------>
    <QVPageHeader :showSearch="showSearch" />

    <!-----------------------------------------------------------------------
      검색창 영역 START
     ------------------------------------------------------------------------>
    <div
      class="q-pa-md relative-position rounded-borders bg-grey-3"
      _style="height: 280px; max-height: 80vh"
    >
      <q-btn
        v-morph:btn:boxes:200.resize="morphGroupModel"
        class="absolute-bottom-right q-ma-md"
        color="primary"
        size="sm"
        icon="shopping_cart"
        @click="toggleSearch()"
      />
      <q-form
        v-morph:card1:boxes:200.resize="morphGroupModel"
        ref="myForm"
        greedy
        autofocus
        @submit="onSubmit"
        @reset="onReset"
      >
        <div class="row q-gutter-y-md">
          <div class="q-px-sm col-12 col-sm-6 col-md-4 col-lg-3">
            <QVInput
              v-model="testInput1"
              :title="$t('prodName')"
              hint="yyyyyyy"
              searchName="TEST"
              mandatory
            />
          </div>
          <div class="q-px-sm col-12 col-sm-6 col-md-4 col-lg-3">
            <QVInput
              v-model="testInput2"
              type="textarea"
              title="Label 2 (Component)"
              hint="yyyyyyy"
              :rules="[
                (val) => !!val || 'testInput2 입력해주셈',
                (val) => val.length <= 10 || '너무 크다',
              ]"
              searchName="TEST1"
            />
          </div>

          <div class="q-px-sm col-12 col-sm-6 col-md-4 col-lg-3">
            <QVSelect
              v-model="selectBox"
              :options="options"
              title="사이트"
              hint="최대2개 선택 가능"
              multiple
              :rules="[
                (val) => (val !== null && val.length > 0) || '선택해주셈',
                (val) =>
                  (val !== null && val.length <= 2) || '2개까지만 선택하셈!',
              ]"
              searchName="TEST_SELECT"
            />
            {{ selectBox }}
          </div>

          <div class="q-px-sm col-12 col-sm-6 col-md-4 col-lg-3">
            <QVCheckbox
              title="체크박스!"
              :datas="options"
              v-model="checkBox"
              searchName="TEST_CHECKBOX"
            />

            {{ checkBox }}
          </div>

          <div class="q-px-sm col-12 col-sm-6 col-md-4 col-lg-3">
            <QVRadio
              title="라디오!"
              :datas="options"
              v-model="radioBtn"
              searchName="TEST_RADIO"
              mandatory
            />

            {{ radioBtn }}
          </div>

          <div class="q-px-sm col-12 col-sm-6 col-md-4 col-lg-3">
            <q-file outlined multiple v-model="upFiles" label="Outlined" />
          </div>

          <div class="q-px-sm col-12 col-sm-6 col-md-4 col-lg-3">
            <QVToggle
              v-model="form.ok"
              label="동의??"
              searchName="TEST_TOGGLE"
            />
          </div>

          <div class="q-px-sm col-12 col-sm-6 col-md-4 col-lg-3">
            <QVCalendar
              v-model="form.date"
              title="Label (단일일자)"
              mask="date"
              :rules="['date' || '날짜형식 오류']"
              searchName="TEST_CALENDAR"
              mandatory
            />

            {{ form.date }}
          </div>

          <div class="q-px-sm col-12 col-sm-8 col-md-6 col-lg-5">
            <QVCalendarPeriod
              v-model="datePeriod"
              mask="date"
              title="Label (기간)"
              :rules="['date' || '날짜형식 오류']"
              searchName="TEST_PERIOD"
              mandatory
            />
            {{ datePeriod }}
          </div>
        </div>

        <div class="row q-gutter-y-md q-gutter-x-md justify-end">
          <q-btn label="Alert" color="primary" @click="pageAlertVis = true" />
          <q-btn
            label="Confirm"
            color="primary"
            @click="pageConfirmVis = true"
          />

          <q-btn
            label="Submit"
            type="submit"
            color="green"
            dense
            @click="showSearch = false"
          />
        </div>
      </q-form>
    </div>

    <!-----------------------------------------------------------------------
      Contents 영역 START
     ------------------------------------------------------------------------>
    <br />
    <q-table
      class="my-sticky-header-column-table"
      title="Treats"
      :rows="rows"
      :columns="columns"
      row-key="name"
      @row-click="rowClick"
    >
      <template v-slot:body-cell-sodium="props">
        <q-td :props="props">
          <span>{{ props.row.sodium }}</span>
          <q-btn
            dense
            round
            flat
            color="grey"
            @click.stop="editRow(props)"
            icon="edit"
          ></q-btn>
          <q-btn
            dense
            round
            flat
            color="grey"
            @click.stop="rowClick(props)"
            icon="delete"
          ></q-btn>
        </q-td>
      </template>
    </q-table>

    <!--
    <q-splitter v-model="splitterModel" horizontal style="height: 500px">
      <template v-slot:before>
        <Page02 />
      </template>
      <template v-slot:separator>
        <q-avatar size="40px" icon="density_large" />
      </template>
      <template v-slot:after> <Page02 /> </template>
    </q-splitter>

    <q-splitter v-model="splitterModel" style="height: 500px">
      <template v-slot:before>
        <Page02 />
      </template>
      <template v-slot:separator>
        <q-avatar size="40px" icon="more_vert" />
      </template>
      <template v-slot:after> <Page02 /> </template>
    </q-splitter>

    <q-splitter v-model="splitterModel" style="height: 400px">
      <template v-slot:before>
        <Page02 />
      </template>
      <template v-slot:separator>
        <q-avatar size="40px" icon="more_vert" />
      </template>
      <template v-slot:after>
        <q-splitter v-model="insideModel" horizontal>
          <template v-slot:before>
            <Page02 />
          </template>
          <template v-slot:separator>
            <q-avatar size="40px" icon="density_large" />
          </template>
          <template v-slot:after>
            <Page02 />
          </template>
        </q-splitter>
      </template>
    </q-splitter> -->
    <span>
      <QVAlert v-model="pageAlertVis">
        <template #header>Alert </template>
        <template #body>
          <q-card-section> Alter Message~!! </q-card-section>
        </template>
      </QVAlert>
    </span>
    <QVConfirm v-model="pageConfirmVis" @confirmOk="onOK()">
      <template #header>Confirm </template>
      <template #body>
        <q-card-section> Confirm Message~!! </q-card-section>
      </template>
    </QVConfirm>
  </q-page>
</template>

<script setup>
import {
  ref,
  unref,
  onMounted,
  onUnmounted,
  onActivated,
  onDeactivated,
} from "vue";

//import QVPageHeader from "src/components/QVPageHeader.vue";
// import QVInput from "src/components/QVInput.vue";
// import QVSelect from "src/components/QVSelect.vue";
// import QVCheckbox from "src/components/QVCheckbox.vue";
// import QVRadio from "src/components/QVRadio.vue";
// import QVToggle from "src/components/QVToggle.vue";
// import QVCalendar from "src/components/QVCalendar.vue";
// import QVCalendarPeriod from "src/components/QVCalendarPeriod.vue";

import QVAlert from "src/components/dialog/QVAlert.vue";
import QVConfirm from "src/components/dialog/QVConfirm.vue";
import Page02 from "src/pages/dev/sample/Page02.vue";
//import { useCounterStore } from "src/stores/menu.js";

//import * as cf from "src/composables/alert.js";
//let { c } = cf.plus(2, 4);
import { plus } from "src/scripts/commonFuncions.js";
let { c } = plus(2, 4);
console.log("공통함수 실행: ", c);

let _temp = [];
let menu1 = { title: "aaa", menuList: "menuList1" };
let menu2 = { title: "bbb", menuList: "menuList2" };
_temp.push(menu1);
_temp.push(menu2);

console.log(">>>", JSON.stringify(_temp));

let _temp2 = {};
let menu11 = [1, 2, 3];
let menu12 = [11, 22, 33];
_temp2["ams"] = menu11;
_temp2["cms"] = menu12;
console.log(">>>>>>>1", JSON.stringify(_temp2));
console.log(">>>>>>>2", JSON.stringify(_temp2["ams"]));

// 스토어 테스트
//const counter = useCounterStore();

const testInput1 = ref("testInput1");
const testInput2 = ref("");
const showSearch = ref(true);
const myForm = ref(null);
const form = ref({
  title: "",
  content: "",
  //tags: ["Twitter", "Oracle"],
  tags: [],
  date: "",
  ok: false,
});

//const checkBox = ref(["Facebook", "Twitter"]);
const checkBox = ref([]);
//const radioBtn = ref("Google");
const radioBtn = ref("");
const selectBox = ref(["Twitter"]);

const datePeriod = ref({ from: "", to: "" });

const upFiles = ref(null);
const splitterModel = ref(50); // start at 50%
const insideModel = ref(50); // start at 50%

const pageAlertVis = ref(false);
const pageConfirmVis = ref(false);
const cForm = unref(form);
const options = ref([
  {
    label: "구글",
    value: "Google",
    color: "teal",
  },
  { label: "페이스북", value: "Facebook", color: "orange" },
  { label: "트위터", value: "Twitter", color: "red" },
  { label: "오라클", value: "Oracle", color: "cyan" },
]);
const morphGroupModel = ref("card1");

const nextMorphStep = {
  btn: "card1",
  card1: "btn",
};
const toggleSearch = () => {
  morphGroupModel.value = nextMorphStep[morphGroupModel.value];
};

const onOK = () => {
  alert("Confirm Componet OK!!");
};
// const validator = () => {
//   myForm.value.validate().then((success) => {
//     if (success) {
//       alert("성공입니다");
//     } else {
//       alert("실패입니다");
//     }
//   });
// };

const resetValidation = () => {
  myForm.value.resetValidation();
};

const onSubmit = () => {
  myForm.value.validate().then((success) => {
    if (success) {
      alert("성공입니다");
    } else {
      alert("실패입니다");
    }
  });

  if (form.value.ok === false) {
    alert("동의해주셈");
  } else {
    alert("성공!!");
  }
  toggleSearch();
};
const onReset = () => {
  form.value.title = "";
};

function editRow(props) {
  console.log("editRow: ", JSON.stringify(props.row).split(",").join(", "));
}

function rowClick(evt, row, index) {
  console.log("evt: ", evt);
  console.log("row: ", row);
  console.log("index: ", index);
}

const columns = [
  {
    name: "name",
    required: true,
    label: "Dessert (100g serving)",
    align: "left",
    field: (row) => row.name,
    format: (val) => `<q-btn>${val}</q-btn>`,
    sortable: true,
  },
  {
    name: "calories",
    align: "center",
    label: "Calories",
    field: "calories",
    sortable: true,
  },
  { name: "fat", label: "Fat (g)", field: "fat", sortable: true },
  { name: "carbs", label: "Carbs (g)", field: "carbs" },
  { name: "protein", label: "Protein (g)", field: "protein" },
  { name: "sodium", label: "Sodium (mg)", field: "sodium" },
  {
    name: "calcium",
    label: "Calcium (%)",
    field: "calcium",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
  {
    name: "iron",
    label: "Iron (%)",
    field: "iron",
    sortable: true,
    sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),
  },
];

const rows = [
  {
    name: "Frozen Yogurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
    sodium: 87,
    calcium: "14%",
    iron: "1%",
  },
  {
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
    sodium: 129,
    calcium: "8%",
    iron: "1%",
  },
  {
    name: "Eclair",
    calories: 262,
    fat: 16.0,
    carbs: 23,
    protein: 6.0,
    sodium: 337,
    calcium: "6%",
    iron: "7%",
  },
  {
    name: "Cupcake",
    calories: 305,
    fat: 3.7,
    carbs: 67,
    protein: 4.3,
    sodium: 413,
    calcium: "3%",
    iron: "8%",
  },
  {
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
    sodium: 327,
    calcium: "7%",
    iron: "16%",
  },
  {
    name: "Jelly bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
    sodium: 50,
    calcium: "0%",
    iron: "0%",
  },
  {
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0,
    sodium: 38,
    calcium: "0%",
    iron: "2%",
  },
  {
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
    sodium: 562,
    calcium: "0%",
    iron: "45%",
  },
  {
    name: "Donut",
    calories: 452,
    fat: 25.0,
    carbs: 51,
    protein: 4.9,
    sodium: 326,
    calcium: "2%",
    iron: "22%",
  },
  {
    name: "KitKat",
    calories: 518,
    fat: 26.0,
    carbs: 65,
    protein: 7,
    sodium: 54,
    calcium: "12%",
    iron: "6%",
  },
];

onMounted(() => {});

onUnmounted(() => {});

onActivated(() => {});

onDeactivated(() => {});
</script>
