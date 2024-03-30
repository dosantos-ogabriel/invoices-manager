<script setup lang="ts">
type ChartData = {
  label: String;
  amount: number;
};

const { data } = defineProps<{ data: ChartData[] }>();
</script>

<template>
  <client-only> </client-only>
</template>
