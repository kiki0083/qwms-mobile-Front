<template>
  <div class="row inline">
    <div class="col-5">
      <q-input
        :model-value="attrs.modelValue.from"
        @update:model-value="onEmitFrom($event)"
        @blur="chkValidation('from', $event)"
        class="search-input"
        outlined
        dense
        hide-hint
        mask="date"
        lazy-rules
        :label="makeLabel()"
        :rules="periodRules"
        :error="fromError"
        :error-message="fromErrMsg"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                :model-value="attrs.modelValue.from"
                @update:model-value="onEmitFrom($event)"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
    <div class="col-1"><span class="flex flex-center">~</span></div>

    <div class="col-5">
      <q-input
        :model-value="attrs.modelValue.to"
        @update:model-value="onEmitTo($event)"
        @blur="chkValidation('to', $event)"
        class="search-"
        mask="date"
        outlined
        dense
        hide-hint
        lazy-rules
        :rules="periodRules"
        :error="toError"
        :error-message="toErrMsg"
      >
        <template v-slot:append>
          <q-icon name="event" class="cursor-pointer">
            <q-popup-proxy
              cover
              transition-show="scale"
              transition-hide="scale"
            >
              <q-date
                :model-value="attrs.modelValue.to"
                @update:model-value="onEmitTo($event)"
              >
                <div class="row items-center justify-end">
                  <q-btn v-close-popup label="Close" color="primary" flat />
                </div>
              </q-date>
            </q-popup-proxy>
          </q-icon>
        </template>
      </q-input>
    </div>
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
};
</script>

<script setup>
import { useQuasar } from "quasar";
import { onMounted, useAttrs, ref } from "vue";
import { date } from "quasar";

const $q = useQuasar();
const attrs = useAttrs();
let periodRules = ref([]);
const searchNamePrefix = "SV_";
let searchNameStorage = "";
let _datePeriod = { from: "", to: "" };

// 필수값인 경우 해더명 변경
function makeLabel() {
  if (attrs.mandatory === undefined) return attrs.title;
  else return attrs.title + " (※)";
}

// 필수값인 경우 룰 추가 변경
function makeRule() {
  if (attrs.mandatory === undefined) return;
  // rules 미지정시 필수 rule 추가
  if (attrs.validate === undefined)
    return [(val) => !!val || "필수입력값입니다."];
  else {
    attrs.validate[attrs.validate.length] = (val) =>
      !!val || "필수입력값입니다.";
    return attrs.validate;
  }
}

// 기간 전후 체크
const fromError = ref(false);
const toError = ref(false);
const fromErrMsg = ref("");
const toErrMsg = ref("");
function chkValidation(flag, evt) {
  const fromDadate = new Date(attrs.modelValue.from);
  const toDate = new Date(attrs.modelValue.to);
  const unit = "days";

  const diff = date.getDateDiff(toDate, fromDadate, unit);

  if (diff < 0) {
    if (flag === "from") {
      fromError.value = true;
      fromErrMsg.value = "시작일이 종료일보다 작습니다.";
    } else {
      toError.value = true;
      toErrMsg.value = "종료일이 시작일보다 큽니다.";
    }
  } else {
    fromError.value = false;
    fromErrMsg.value = "시작일이 종료일보다 작습니다.";
    toError.value = false;
    toErrMsg.value = "종료일이 시작일보다 큽니다.";
  }
}
const props = defineProps({
  value: {
    type: Object,
    required: false,
  },
  searchName: {
    type: String,
    required: false,
  },
});

// v-model 구현을 위한 emit
const emit = defineEmits(["update:model-value"]);

// 부모 컴포넌트에 value emit
// 검색값 저장을 설정한 경우 onBlur시 스토리지에 값 저장
const onEmitFrom = (evtVal) => {
  _datePeriod.from = evtVal;
  emit("update:model-value", _datePeriod);

  if (!props.searchName) return;
  $q.localStorage.set(searchNameStorage, _datePeriod);
};
const onEmitTo = (evtVal) => {
  _datePeriod.to = evtVal;
  emit("update:model-value", _datePeriod);

  if (!props.searchName) return;
  $q.localStorage.set(searchNameStorage, _datePeriod);
};

onMounted(() => {
  periodRules.value = makeRule();
  _datePeriod = attrs.modelValue;

  //검색어 설정 없으면 return
  if (props.searchName === undefined || props.searchName === "") return;

  searchNameStorage = searchNamePrefix + props.searchName;
  //검색어가 없으면 스토리지에서 세팅
  if (
    attrs.modelValue === undefined ||
    attrs.modelValue.from === undefined ||
    attrs.modelValue.from === ""
  ) {
    if ($q.localStorage.getItem(searchNameStorage) !== null)
      _datePeriod.from = $q.localStorage.getItem(searchNameStorage).from;
    // 세팅된 검색값을 부모 컴포넌트에  emit
    // emit("update:from", $q.localStorage.getItem(searchNameStorage));
  }

  //검색어가 없으면 스토리지에서 세팅
  if (
    attrs.modelValue === undefined ||
    attrs.modelValue.to === undefined ||
    attrs.modelValue.to === ""
  ) {
    if ($q.localStorage.getItem(searchNameStorage) !== null)
      _datePeriod.to = $q.localStorage.getItem(searchNameStorage).to;
    // 세팅된 검색값을 부모 컴포넌트에  emit
  }
  emit("update:model-value", _datePeriod);
});
</script>
