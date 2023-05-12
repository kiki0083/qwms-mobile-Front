<template>
  <q-dialog :model-value="props.value" @update:model-value="onEmit($event)">
    <q-card>
      <q-card-section>
        <slot name="header"><div>#Header</div></slot>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <slot name="body"><div>#Body</div></slot>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="OK" color="primary" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
const emit = defineEmits(["update:model-value"]);

const props = defineProps({
  value: {
    type: String,
    required: false,
  },
});

// 부모 컴포넌트에 value emit
const onEmit = (evtVal) => {
  emit("update:model-value", evtVal);
};
</script>
