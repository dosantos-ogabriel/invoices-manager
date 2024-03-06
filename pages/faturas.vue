<script setup>
const { data: invoices } = useAsyncData(async () => $fetch("/api/invoices"));

const columns = [
  { key: "year", label: "Ano" },
  { key: "month", label: "Mês" },
  { key: "bank", label: "Banco" },
];
</script>

<template>
  <div class="invoices-page">
    <h1 class="text-xl font-semibold">Faturas</h1>
    <u-divider class="mb-6 mt-2" />

    <u-table
      v-if="invoices && invoices.length"
      :columns="columns"
      :rows="invoices"
      :sort="{ column: 'date', direction: 'desc' }"
    />
  </div>
</template>
