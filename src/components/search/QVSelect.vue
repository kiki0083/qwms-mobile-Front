<template>
  <q-select
    :model-value="props.value"
    @update:model-value="onEmit($event)"
    class="search-input"
    outlined
    dense
    hide-hint
    emit-value
    map-options
    lazy-rules
    :label="makeLabel()"
    :rules="makeRule()"
  />
</template>

<script setup>
import { useQuasar } from "quasar";
import { onMounted, useAttrs, computed } from "vue";

const $q = useQuasar();
const attrs = useAttrs();
const searchNamePrefix = "SV_";
let searchNameStorage = "";

// 배열 최상단에 헤더 옵션 추가
const addOption = () => {
  if (attrs.headerOption !== undefined && attrs.options !== undefined) {
    let headerName = "";
    if (attrs.headerOption === "SELECT") headerName = "[SELECT]";
    else if (attrs.headerOption === "ALL") headerName = "[ALL]";
    attrs.options.unshift({
      label: headerName,
      value: "",
    });
  }
};

// 다중선택인 경우 chip 사용
// function makeChips() {
//   if (attrs.multiple === "")
//     console.log("attrs.multiple11111: ", attrs.multiple);
//   else console.log("attrs.multiple222: ", attrs.multiple);
//   if (attrs.multiple === "") return false;
//   else return true;
// }

// 필수값인 경우 해더명 변경
function makeLabel() {
  if (attrs.mandatory === undefined) return attrs.title;
  else return attrs.title + " (※)";
}

// 필수값인 경우 룰 추가 변경
function makeRule() {
  if (attrs.mandatory === undefined) return;
  // rules 미지정시 필수 rule 추가
  if (attrs.validate === undefined) {
    let _validate = [(val) => val !== null || "필수선택값입니다."];
    return _validate;
  } else {
    attrs.validate[attrs.validate.length] = (val) =>
      val !== null || "필수선택값입니다.";
    return attrs.validate;
  }
}

const props = defineProps({
  value: {
    type: String,
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
const onEmit = (evtVal) => {
  emit("update:model-value", evtVal);

  if (!props.searchName) return;
  $q.localStorage.set(searchNameStorage, evtVal);
};

onMounted(() => {
  addOption();
  //검색어 설정 없으면 return
  if (props.searchName === undefined || props.searchName === "") return;

  searchNameStorage = searchNamePrefix + props.searchName;

  //검색어가 없으면 스토리지에서 세팅
  if (
    attrs.modelValue !== undefined &&
    attrs.modelValue !== null &&
    attrs.modelValue.length > 0
  )
    return;

  // 세팅된 검색값을 부모 컴포넌트에  emit
  emit("update:model-value", $q.localStorage.getItem(searchNameStorage));
});
</script>
