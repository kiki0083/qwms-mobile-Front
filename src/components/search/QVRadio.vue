<template>
  <q-field
    outlined
    class="search-input"
    dense
    stack-label
    lazy-rules
    :label="makeLabel()"
    :rules="makeRule()"
  >
    <template v-slot:control>
      <q-radio
        v-for="(item, idx) in props.options"
        :key="idx"
        :val="item.value"
        :label="item.label"
        :color="item.color"
        v-model="userCheckedbox"
        @update:model-value="onEmit(userCheckedbox)"
        dense
      />
    </template>
  </q-field>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, onMounted, useAttrs, computed } from "vue";

const $q = useQuasar();
const attrs = useAttrs();
const searchNamePrefix = "SV_";
let searchNameStorage = "";
let userCheckedbox = ref("");

// 필수값인 경우 해더명 변경
function makeLabel() {
  if (attrs.mandatory === undefined) return attrs.title;
  else return attrs.title + " (※)";
}

// 필수값인 경우 룰 추가 변경
function makeRule() {
  if (attrs.mandatory === undefined) return;
  // rules 미지정시 필수 rule 추가
  if (attrs.rules === undefined)
    return [(val) => (val !== null && val.length > 0) || "필수선택값입니다."];
  else {
    attrs.validate[attrs.validate.length] = (val) =>
      (val !== null && val.length > 0) || "필수선택값입니다.";
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
  options: {
    type: Array,
    required: true,
  },
});

// v-model 구현을 위한 emit
const emit = defineEmits(["update:model-value"]);

// 부모 컴포넌트에 value emit
// 검색값 저장을 설정한 경우 onBlur시 스토리지에 값 저장
const onEmit = (evtVal) => {
  emit("update:model-value", evtVal);

  if (!props.searchName) return;
  $q.localStorage.set(searchNameStorage, evtVal);
};

onMounted(() => {
  if (attrs.modelValue !== undefined) userCheckedbox.value = attrs.modelValue;
  // console.log("props.searchName: ", props.searchName);
  // console.log("attrs.modelValue: ", attrs.modelValue);
  //검색어 설정 없으면 return
  if (props.searchName === undefined || props.searchName === "") return;

  searchNameStorage = searchNamePrefix + props.searchName;

  //검색어가 없으면 스토리지에서 세팅
  if (attrs.modelValue !== undefined && attrs.modelValue.length > 0) return;

  // 세팅된 검색값을 부모 컴포넌트에  emit
  emit("update:model-value", $q.localStorage.getItem(searchNameStorage));
  //v-model에 값 바인딩
  userCheckedbox.value = $q.localStorage.getItem(
    searchNamePrefix + props.searchName
  );
});
</script>
