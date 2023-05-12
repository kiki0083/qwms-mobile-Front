<template>
  <q-page class="q-pa-xl">
    <section>
      <div class="text-h4">QFrom Components</div>
      <q-separator class="q-my-md" />
    </section>
    <q-form
      ref="myForm"
      class="q-gutter-y-md q-mt-lg"
      greedy
      @submit="onSubmit"
      @reset="onReset"
    >
      <q-input
        outlined
        v-model="form.title"
        label="제목"
        hint="필수값!!"
        counter
        :rules="[(val) => !!val || '입력해주셈']"
        autofocus
      />
      <q-input
        v-model="form.content"
        filled
        type="textarea"
        label="내용"
        hint="50자 이내"
        :rules="[
          (val) => !!val || '입력해주셈',
          (val) => val.length <= 50 || '50자 초과!',
        ]"
        lazy-rules
      />
      <q-select
        v-model="form.tags"
        :options="options"
        label="사이트"
        emit-value
        multiple=""
        hint="최대2개 선택 가능"
        :rules="[
          (val) => val.length > 0 || '선택해주셈',
          (val) => val.length <= 2 || '2개까지만 선택하셈!',
        ]"
      />
      {{ form.tags }}
      <q-input
        filled
        v-model="form.date"
        mask="date"
        :rules="['date' || '날짜형식 오류']"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date v-model="form.date">
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
      <q-toggle label="동의??" v-model="form.ok" />
      {{ form.ok }}

      <div class="q-gutter-x-md">
        <q-btn label="validate" color="primary" @click="validator()" />
        <q-btn
          label="resetValidation"
          color="secondary"
          @click="resetValidation()"
        />
        <q-btn label="Submit" type="submit" color="warning" />
        <q-btn
          label="Reset"
          type="reset"
          color="primary"
          flat
          class="q-ml-sm"
        />
      </div>
    </q-form>
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
const myForm = ref(null);
const form = ref({
  title: "",
  content: "",
  tags: [],
  date: "2023/02/01",
  ok: false,
});

const cForm = unref(form);
const options = ref([
  {
    label: "구글",
    value: "Google",
  },
  { label: "페이스북", value: "Facebook" },
  { label: "트위터", value: "Twitter" },
  { label: "오라클", value: "Oracle" },
]);

const validator = () => {
  myForm.value.validate().then((success) => {
    if (success) {
      alert("성공입니다");
    } else {
      alert("실패입니다");
    }
  });
};

const resetValidation = () => {
  myForm.value.resetValidation();
};

const onSubmit = () => {
  if (form.value.ok === false) {
    alert("동의해주셈");
  } else {
    alert("성공!!");
  }
};
const onReset = () => {
  form.value.title = "";
};

onMounted(() => {
  console.log(">>>>>>>>>>>> onMounted");
});

onUnmounted(() => {
  console.log(">>>>>>>>>>>> onUnmounted");
});

onActivated(() => {
  console.log(">>>>>>>>>>>> onActivated");
});

onDeactivated(() => {
  console.log(">>>>>>>>>>>> onDeactivated");
});
</script>

<style lang="scss" scoped></style>
