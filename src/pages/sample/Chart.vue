<template>
  <q-page class="q-py-md q-px-sm">
    <!-----------------------------------------------------------------------
      HEADER START
    ------------------------------------------------------------------------>
    <QVPageHeader />

    <div class="row q-pa-md q-gutter-md">
      <div class="q-pa-sd rounded-borders bg-grey-3">
        <DoughnutChart
          ref="doughnutRef"
          :chartData="doughnutData"
          :options="doughnutOptions"
        />
        <button @click="shuffleData">Shuffle</button>
      </div>
      <div class="q-pa-sd rounded-borders bg-grey-3">
        <BarChart ref="barRef" :chartData="barData" :options="barOptions" />
        <button @click="shuffleData">Shuffle</button>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { shuffle } from "lodash";
import { computed, defineComponent, ref } from "vue";
import { DoughnutChart, BarChart, BubbleChart } from "vue-chart-3";

const data = ref([30, 40, 60, 70, 5]);
//----------------------------------------
// 예제 우선 라이브러리만
// 우선 따로 컴포넌트를 만들지 않고
// 예제로
//----------------------------------------

//-----------------------------------------
// 도넛차트
//-----------------------------------------
const doughnutRef = ref();
const doughnutOptions = ref({
  responsive: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "도넛 차트",
    },
  },
});
const doughnutData = computed(() => ({
  labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
  datasets: [
    {
      data: data.value,
      backgroundColor: ["#77CEFF", "#0079AF", "#123E6B", "#97B0C4", "#A5C8ED"],
    },
  ],
}));

//-----------------------------------------
// 바차트
//-----------------------------------------
const barRef = ref();
const barOptions = ref({
  responsive: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "바 차트",
    },
  },
});
const barData = computed(() => ({
  labels: ["Paris", "Nîmes", "Toulon", "Perpignan", "Autre"],
  datasets: [
    {
      data: data.value,
      backgroundColor: ["#77CEFF", "#0079AF", "#123E6B", "#97B0C4", "#A5C8ED"],
    },
  ],
}));

const shuffleData = () => {
  data.value = shuffle(data.value);
};
</script>
