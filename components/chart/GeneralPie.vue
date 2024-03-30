<script setup lang="ts">
import { Pie } from "vue-chartjs";
type ChartData = {
  label: String;
  amount: number;
};

const { data } = defineProps<{ data: ChartData[] }>();

const chartData = computed(() => ({
  labels: data.map((i) => i.label),
  datasets: [{ data: data.map((i) => i.amount) }],
}));
</script>

<template>
  <client-only>
    <pie :data="chartData" />
  </client-only>
</template>
