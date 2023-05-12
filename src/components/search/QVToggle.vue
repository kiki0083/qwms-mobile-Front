<template>
  <q-toggle
    :model-value="props.value"
    @update:model-value="onEmit($event)"
    :label="getLabel"
  />
</template>

<script setup>
import { useQuasar } from "quasar";
import { onMounted, useAttrs, computed } from "vue";

const $q = useQuasar();
const attrs = useAttrs();
const searchNamePrefix = "SV_";
let searchNameStorage = "";

const getLabel = computed(
  () => attrs.title + (attrs.mandatory === undefined ? "" : "(※)")
);
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
// 검색값 저장을 설정한 경우 onBlur시 스토리지에 값 저장
const onEmit = (evtVal) => {
  emit("update:model-value", evtVal);

  if (!props.searchName) return;
  $q.localStorage.set(searchNameStorage, evtVal);
};

onMounted(() => {
  // console.log("props.searchName: ", props.searchName);
  // console.log("attrs.modelValue: ", attrs.modelValue);
  //검색어 설정 없으면 return
  if (props.searchName === undefined || props.searchName === "") return;

  searchNameStorage = searchNamePrefix + props.searchName;

  //검색어가 없으면 스토리지에서 세팅
  if (attrs.modelValue !== undefined && attrs.modelValue.length > 0) return;

  // 세팅된 검색값을 부모 컴포넌트에  emit
  emit("update:model-value", $q.localStorage.getItem(searchNameStorage));
});
</script>
