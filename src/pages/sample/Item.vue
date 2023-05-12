<template>
  <q-page class="q-py-xl q-px-sm">
    <!-----------------------------------------------------------------------
      HEADER START
     ------------------------------------------------------------------------>
    <QVPageHeader/>

    <!-----------------------------------------------------------------------
      검색창 영역 START
    ------------------------------------------------------------------------>
    <q-card class="searchArea" flat bordered>
      <!-- 검색창 버튼 영역 ------------------------------------------------>
      <q-card-actions align="right">
        <q-btn
          label="Search"
          dense
          color="primary"
          icon="search"
          @click="searchConfirm"
        />
        <q-btn label="Reset" dense color="secondary" icon="restart_alt" @click="resetFn"/>
        <q-btn
          color="grey"
          round
          flat
          dense
          :icon="seachExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
          @click="seachExpanded = !seachExpanded"
        />

      </q-card-actions>

      <!-- 검색창 아이템 영역 ------------------------------------------------>
      <!-- 센터 코드 -->
      <q-slide-transition :duration="200" v-show="seachExpanded">
      <div class="column border">
        <div>
          <div class="col-xs-12 col-sm-6 col-md-4 q-pa-sm border">
            <QVSelect
                v-model="params.param.ctKey"
                :options="code.ctkeyList"
                headerOption="ALL"
                title="센터코드"
                multiple
                searchName="ctKey"
              />
          </div>
          <!-- 상품명 -->
          <div class="col-xs-12 col-sm-6 col-md-4 q-pa-sm border">
            <QVInput
              v-model="params.param.icname"
              title="상품명"
              searchName="icname"
            />
          </div>

          <!-- 사용유무 -->
          <div class="col-xs-12 col-sm-6 col-md-4 q-pa-sm border">
            <QVSelect
              v-model="params.param.useYn"
              :options="code.useYnList"
              title="사용유무"
              hint="1개 선택"
              searchName="useYn"
            />
          </div>
        </div>
      </div>
      </q-slide-transition>
    </q-card>

    <!-----------------------------------------------------------------------
      Contents 영역 START
    ------------------------------------------------------------------------>
    <br />
    <q-table
      class="my-sticky-header-column-table"
      title="상품정보리스트"
      :rows="rows"
      :columns="columns"
      row-key="name"
      rows-per-page-label="조회 rows"
      pagination-label=""
    >
    <!--
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
    -->
    </q-table>
  </q-page>
</template>


<script setup>
import {ref, reactive, onMounted} from "vue";
import { useAxios } from "src/boot/axios";
import { useQuasar} from 'quasar'
import commonStatic from 'src/scripts/commonStatic'


/*-----------------------------------------------------
검색영역 컨트롤
-----------------------------------------------------*/
let seachExpanded = ref(true);

const $q = useQuasar();
const ERROR_NOTIFY = commonStatic.ERROR_NOTIFY;
const SEARCH_SUCCESS_NOTIFY = commonStatic.SEARCH_SUCCESS_NOTIFY;

const code = reactive({
  ctkeyList : [],
  useYnList : []
});

//파라메터
const params = reactive({
            pageNum: 1,
            pageSize: 99999,
            navigatePages: 10,
            param: {
              //센터코드
              ctkeyList: [], // 센터 리스트
              owkeyList: null, // 화주 리스트
              icname: null,
              useyn: 'Y',  //사용유무
            }
})


const resetFn = () =>{
  params.param.ctKey = [];
  params.param.useYn = "Y";
  params.param.icname = null;
  rows.value = [];
};

// const columns = [
//   {name: "name", required: true, label: "Dessert (100g serving)", align: "left", field: (row) => row.name, format: (val) => `<q-btn>${val}</q-btn>`, sortable: true, },
//   {name: "calories", align: "center", label: "Calories", field: "calories", sortable: true, },
//   {name: "fat", label: "Fat (g)", field: "fat", sortable: true },
//   {name: "carbs", label: "Carbs (g)", field: "carbs" },
//   {name: "protein", label: "Protein (g)", field: "protein" },
//   {name: "sodium", label: "Sodium (mg)", field: "sodium" },
//   {name: "calcium", label: "Calcium (%)", field: "calcium",sortable: true,sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),},
//   {name: "iron", label: "Iron (%)", field: "iron", sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10),},
// ];


const columns = [
  {name: "ickey",        label: "상품코드", field: "ickey", align: "center", sortable: true},
  {name: "icname",       label: "상품명",   field: "icname",align: "center", sortable: true },
  {name: "ctname",       label: "사업자등록번호", field: "ctname",align: "center" },
  {name: "owname",       label: "화주명", field: "owname",align: "center" },
  {name: "barcode",      label: "바코드", field: "barcode",align: "center" },
  {name: "width",        label: "넓이", field: "width",align: "center" },
  {name: "height",       label: "높이", field: "height",align: "center" },
  {name: "length",       label: "수량", field: "length",align: "center" },
  {name: "volume",       label: "부피", field: "volume",align: "center" },
  {name: "insertdate",   label: "등록일자", field: "insertdate",align: "center" },
  {name: "inserturkey",  label: "등록자", field: "inserturkey",align: "center" },
  {name: "updatedate",   label: "수정일자", field: "updatedate",align: "center" },
  {name: "updateurkey",  label: "수정자", field: "updateurkey",align: "center" },
];
const rows = ref([]);


const searchConfirm = () => {
      $q.dialog({
        title: '조회',
        message: '조회 하시겠습니까?',
        cancel: true,
        persistent: true
      }).onOk(() => {
        search();
      }).onOk(() => {
        // console.log('>>>> second OK catcher')
      }).onCancel(() => {
        // console.log('>>>> Cancel')
      }).onDismiss(() => {
        // console.log('I am triggered on both OK and Cancel')
      })
    }


const search = ()=>{

      useAxios('post','/inf/Item/searchItemInfos', params).then((data)=>{
        rows.value = data.list;
        seachExpanded.value = false;
        $q.notify(SEARCH_SUCCESS_NOTIFY);

      }).catch((error)=>{

        ERROR_NOTIFY.message = error.message;
        $q.notify(ERROR_NOTIFY);

      }).finally(()=>{

      });

};


onMounted(()=>{

  const param = {
    useYn: { group: 'useYn' },
    ctkeyList: {tableNm:'tadmin_mst_ct'},
  };

  useAxios('post','/code',param).then((data)=>{

      //던져진 파라메터를 기준으로
      //전체 name->label 전환
      //각각에 넣어준다
      Object.keys(param).forEach((rootEl)=>{
          data[rootEl].forEach((subEl)=>{
            delete Object.assign(subEl, {label: subEl.name})['name'];
          });
      });

      code.ctkeyList = data.ctkeyList;
      code.useYnList = data.useYn;

  }).catch((error)=>{

    //에러메세지
    ERROR_NOTIFY.message = error.message;
    $q.notify(ERROR_NOTIFY);

  }).finally(()=>{

  });

});

</script>

<style lang="scss" scoped>
// .border {
//   border: 1px solid $primary;
// }
.searchArea {
  width: 100%;
}
</style>

<style lang="sass">
.my-sticky-header-column-table
  /* height or max-height is important */
  height: 500px

  /* specifying max-width so the example can
    highlight the sticky column on any browser window */
  max-width: 100%

  td:first-child
    /* bg color is important for td; just specify one */
    background-color: #c1f4cd !important

  tr th
    position: sticky
    /* higher than z-index for td below */
    z-index: 2
    /* bg color is important; just specify one */
    background: #fff

  /* this will be the loading indicator */
  thead tr:last-child th
    /* height of all previous header rows */
    top: 48px
    /* highest z-index */
    z-index: 3
  thead tr:first-child th
    top: 0
    z-index: 1
  tr:first-child th:first-child
    /* highest z-index */
    z-index: 3

  td:first-child
    z-index: 1

  td:first-child, th:first-child
    position: sticky
    left: 0
</style>

