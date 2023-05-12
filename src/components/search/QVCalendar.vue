<template>
  <q-input
    :model-value="props.value"
    @update:model-value="onEmit($event)"
    class="search-input"
    outlined
    dense
    hide-hint
    mask="date"
    lazy-rules
    :label="makeLabel()"
    :rules="makeRule()"
  >
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy cover transition-show="scale" transition-hide="scale">
          <q-date
            :model-value="attrs.modelValue"
            @update:model-value="onEmit($event)"
          >
            <div class="row items-center justify-end">
              <q-btn v-close-popup label="Close" color="primary" flat />
            </div>
          </q-date>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script setup>
import { useQuasar } from "quasar";
import { onMounted, useAttrs, computed } from "vue";

const $q = useQuasar();
const attrs = useAttrs();
const searchNamePrefix = "SV_";
let searchNameStorage = "";

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
    return [(val) => !!val || "필수입력값입니다."];
  } else {
    attrs.validate[attrs.validate.length] = (val) =>
      !!val || "필수입력값입니다.";
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
// 검색값 저장을 설정한 경우 onBlur시 스토리지에 값 저장
const onEmit = (evtVal) => {
  emit("update:model-value", evtVal);

  if (!props.searchName) return;
  $q.localStorage.set(searchNameStorage, evtVal);
};

onMounted(() => {
  //검색어 설정 없으면 return
  if (props.searchName === undefined || props.searchName === "") return;

  searchNameStorage = searchNamePrefix + props.searchName;
  //검색어가 없으면 스토리지에서 세팅
  if (attrs.modelValue !== undefined && attrs.modelValue !== "") return;

  // 세팅된 검색값을 부모 컴포넌트에  emit
  emit("update:model-value", $q.localStorage.getItem(searchNameStorage));
});
</script>
