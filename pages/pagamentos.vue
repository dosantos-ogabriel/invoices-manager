<script setup lang="ts">
import { formatDate } from "#imports";

const { pending, data: payments } = useAsyncData(async () => $fetch("/api/payments"));

const tableData = computed(() => {
  if (!payments.value) return [];
  return payments.value.map((i) => ({ ...i, amount: i.amount.toFixed(2), date: formatDate(new Date(i.date)) }));
});

const columns = [
  {
    key: "title",
    label: "Título",
  },
  {
    key: "category",
    label: "Categoria",
  },
  {
    key: "amount",
    label: "Valor",
  },
  {
    key: "date",
    label: "Data",
  },
];

const importModal = ref(false);
const file = ref(null);
</script>

<template>
  <div class="invoices-page">
    <h1 class="text-xl font-semibold">Faturas</h1>
    <u-divider class="mb-6 mt-2" />

    <div class="flex justify-between mb-6">
      <span></span>
      <u-button icon="material-symbols:drive-folder-upload-outline" label="Importar" @click="importModal = true" />
    </div>

    <div v-if="pending">Carregando...</div>

    <u-table v-else-if="payments && payments.length" :columns="columns" :rows="tableData" />

    <div v-else>Nenhum pagamento</div>

    <u-modal v-model="importModal">
      <u-card>
        <template #header>
          <div class="flex items-center justify-between">
            <h3 class="font-semibold">Modal</h3>
            <UButton
              color="gray"
              class="-my-1"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              @click="importModal = false"
            />
          </div>
        </template>

        <input type="file" accept=".csv" />

        <template #footer>
          <div class="flex items-center justify-end gap-4">
            <u-button color="gray" label="Cancelar" @click="importModal = false" />
            <u-button label="Importar" disabled />
          </div>
        </template>
      </u-card>
    </u-modal>
  </div>
</template>

<style lang="scss" scoped>
.invoices-page {
}
</style>
