<template>
  <QVModal
    :modalVis="pageModalVis"
    left="40px"
    top="60px"
    width="80%"
    height="45%"
    @closeModal="closeModal(modalVis)"
  >
    <template #header>비밀번호 변경</template>
    <template #body>
      <q-card-actions align="right">
        <q-btn
          label="변경"
          dense
          color="primary"
          icon="save"
          @click="onSubmit"
        />
      </q-card-actions>

      <q-form
        class="column q-gutter-md"
        ref="passwdForm"
        greedy
        autofocus
        @submit="onSubmit"
      >
        <div class="column border">
          <!-- 1번 줄 ---------------------------------------->
          <div class="row border">
            <div class="col-xs-12 col-sm-6 col-md-4 q-pa-sm border">
              <QVInput v-model="formVal.userNm" title="사용자명" mandatory />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 q-pa-sm border">
              <QVInput v-model="formVal.userId" title="사용자ID" mandatory />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 q-pa-sm border">
              <QVInput
                v-model="formVal.passwd1"
                title="새비밀번호"
                type="password"
                mandatory
              />
            </div>
            <div class="col-xs-12 col-sm-6 col-md-4 q-pa-sm border">
              <QVInput
                v-model="formVal.passwd2"
                title="새비밀번호(확인)"
                type="password"
                mandatory
              />
            </div>
          </div>
        </div>
      </q-form>
    </template>
  </QVModal>
</template>

<script setup>
import { ref } from "vue";

// 검색폼 변수
const formVal = ref({
  userNm: "",
  userId: "",
  passwd1: "",
  passwd2: "",
});

// 검색 버튼
const passwdForm = ref(null);
const onSubmit = () => {
  //여기 체크할 것
  passwdForm.value.validate().then((success) => {
    // 유효성 체크
    if (success) {
      // axios 호출
      console.log("formVal: ", formVal.value);

      closeModal();
    }
  });
};

/* 모달창 구현을 위한 기본 세팅 START --------------------- */
let pageModalVis = ref(false);
// 모달창 오픈(부모 컴포넌트에서 호출함)
const openModal = () => {
  pageModalVis.value = true;
};

const closeModal = () => {
  pageModalVis.value = false;

  formVal.value.userNm = "";
  formVal.value.userId = "";
  formVal.value.passwd1 = "";
  formVal.value.passwd2 = "";
};

// defineExpose를 통하여 함수를 내보낸다.
defineExpose({
  openModal,
});
/* 모달창 구현을 위한 기본 세팅 FINISH --------------------- */
</script>
