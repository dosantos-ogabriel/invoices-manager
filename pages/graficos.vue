<script setup lang="ts">
const { data: payments } = useAsyncData(async () => $fetch("/api/charts/pie"));

const generalPieData = computed(() => {
  if (!payments.value) return [];
  return payments.value.map((p) => ({
    label: capitalize(p.category),
    amount: p._sum.amount ?? 0,
  }));
});
</script>

<template>
  <div class="charts-page">
    <h1 class="text-xl font-semibold">Gráficos</h1>
    <u-divider class="mb-6 mt-2" />

    <chart-general-pie :data="generalPieData" />
  </div>
</template>
