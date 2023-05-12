<template>
  <q-dialog
    v-if="$props.modalVis"
    v-model="$props.modalVis"
    persistent
    no-refocus
  >
    <q-card
      :style="{
        position: 'absolute',
        top: $props.top,
        left: $props.left,
        width: $props.width,
        height: $props.height,
        ...modalStyle,
      }"
    >
      <q-bar v-touch-pan.prevent.mouse="openModal" style="cursor: move">
        <slot name="header"><div>#Header</div></slot>

        <q-space />

        <q-btn dense flat icon="close" @click="closeModal()">
          <q-tooltip>Close</q-tooltip>
        </q-btn>
      </q-bar>

      <q-card-section>
        <slot name="body"><div>#Body</div></slot>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useQuasar } from "quasar";

const emit = defineEmits(["closeModal"]);
const $q = useQuasar();
var props = defineProps({
  modalVis: {
    type: Boolean,
    required: true,
    default: false,
  },
  top: {
    type: String,
    required: false,
    default: "100px",
  },
  left: {
    type: String,
    required: false,
    default: "100px",
  },
  width: {
    type: String,
    required: false,
    default: "50%",
  },
  height: {
    type: String,
    required: false,
    default: "50%",
  },
});

let modalPos = ref({
  x: 0,
  y: 0,
});

const modalStyle = computed(() => {
  return {
    transform: `translate(${modalPos.value.x}px, ${modalPos.value.y}px)`,
  };
});

let _log = ref("");
//const openModal = ({ evt, ...info }) => {
const openModal = (evt) => {
  if (
    evt.position.top < 20 ||
    evt.position.left < 20 ||
    evt.position.top + 20 > $q.screen.height ||
    evt.position.left + 20 > $q.screen.width
  )
    return;
  modalPos.value.x += evt.delta.x;
  modalPos.value.y += evt.delta.y;
  //console.log(evt.offset.x + " / " + evt.offset.y);
  // console.log(evt.position.top + " / " + evt.position.left);
  // console.log(JSON.stringify($q.screen, null, "\t"));
};

const closeModal = () => {
  modalPos.value.x = 0;
  modalPos.value.y = 0;
  emit("closeModal", false);
};

const myModal = ref(null);

onMounted(() => {
  // modalPos.value.x = 0;
  // modalPos.value.y = 0;
});
</script>

<style scoped>
.q-dialog__inner--minimized > div {
  max-width: 100%;
}
</style>
