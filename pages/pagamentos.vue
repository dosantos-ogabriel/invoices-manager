<script setup>
import { formatDate } from "~/utils";
import importNubank from "~/utils/fileImport/importNubank";

const { pending, data: payments } = useAsyncData(async () => $fetch("/api/payments"));

const tableData = computed(() => {
  if (!payments.value) return [];
  return payments.value.map((i) => ({ ...i, amount: i.amount.toFixed(2), date: formatDate(new Date(i.date)) }));
});

const columns = [
  {
    key: "date",
    label: "Data",
  },
  {
    key: "amount",
    label: "Valor",
  },
  {
    key: "title",
    label: "Título",
  },
  {
    key: "category",
    label: "Categoria",
  },
];

const importModal = ref(false);

const files = ref([]);

const importFiles = async () => {
  try {
    const payments = await importNubank(files.value[0]);

    Promise.all(payments.map((payment) => $fetch("/api/payments/create", { method: "post", body: payment })));

    $nuxt.refresh();
  } catch (e) {
    console.log(e);
  }
};
</script>

<template>
  <div class="invoices-page">
    <h1 class="text-xl font-semibold">Pagamentos</h1>
    <u-divider class="mb-6 mt-2" />

    <div class="flex justify-between mb-6">
      <span></span>
      <u-button icon="material-symbols:drive-folder-upload-outline" label="Importar" @click="importModal = true" />
    </div>

    <div v-if="pending">Carregando...</div>

    <u-table
      v-else-if="payments && payments.length"
      :columns="columns"
      :rows="tableData"
      :sort="{ column: 'date', direction: 'desc' }"
    />

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

        <input-file v-model="files" :multiple="true" />

        <template #footer>
          <div class="flex items-center justify-end gap-4">
            <u-button color="gray" label="Cancelar" @click="importModal = false" />
            <u-button label="Importar" :disabled="!files.length" @click.prevent="importFiles" />
          </div>
        </template>
      </u-card>
    </u-modal>
  </div>
</template>
