<script setup>
import { getInvoice, getPayments } from "~/utils/fileImport/importNubank";

const { data: payments } = useAsyncData(async () => $fetch("/api/payments"));
const { data: invoices } = useAsyncData(async () => $fetch("/api/invoices"));
const { data: categories } = useAsyncData(async () => $fetch("/api/payments/categories"));

const filters = reactive({
  invoice: { id: "", label: "Todas as faturas" },
  category: { id: "", label: "Todas as categorias" },
});

const invoicesOptions = computed(() => {
  if (!invoices.value) return [];
  return [
    { id: "", label: "Todas as faturas" },
    ...invoices.value.map(({ id, bank, month, year }) => ({ id, label: `${bank} - ${month}/${year}` })),
  ];
});
const categoryOptions = computed(() => {
  if (!categories.value) return [];
  return categories.value.map((c) => ({ id: c, label: c }));
});

watch(filters, async ({ invoice, category }) => {
  const query = clearObject({ invoiceId: invoice.id, category: category.id });

  payments.value = await $fetch("/api/payments", { query });
});

const importModal = ref(false);
const files = ref([]);
const fileNames = ref([]);
const importFiles = async () => {
  files.value.forEach(async (file, index) => {
    const fileName = fileNames.value[index];
    const invoiceData = await getInvoice(fileName);
    const invoice = await $fetch("/api/invoices/create", { method: "post", body: invoiceData });

    const payments = await getPayments(file);

    Promise.all(
      payments.map((payment) =>
        $fetch("/api/payments/create", { method: "post", body: { ...payment, invoiceId: invoice.id } }),
      ),
    );
  });
};

const currentPage = ref(1);
const tableData = computed(() => {
  if (!payments.value) return [];
  return paginate(payments.value, currentPage.value).map((i) => ({
    ...i,
    amount: formatMoney(i.amount),
    date: formatDate(new Date(i.date)),
  }));
});
const columns = [
  { key: "date", label: "Data" },
  { key: "amount", label: "Valor" },
  { key: "title", label: "Título" },
  { key: "category", label: "Categoria" },
];
</script>

<template>
  <div class="payments-page">
    <h1 class="text-xl font-semibold">Pagamentos</h1>
    <u-divider class="mb-6 mt-2" />

    <div class="flex items-end justify-between mb-6">
      <div class="flex items-center gap-2">
        <u-form-group label="Selecionar fatura">
          <u-select-menu v-if="invoices && invoices.length" v-model="filters.invoice" :options="invoicesOptions" />
        </u-form-group>

        <u-form-group label="Selecionar categoria">
          <u-select-menu v-model="filters.category" :options="categoryOptions" />
        </u-form-group>
      </div>
      <u-button icon="material-symbols:drive-folder-upload-outline" label="Importar" @click="importModal = true" />
    </div>

    <u-table v-if="payments && payments.length" :columns="columns" :rows="tableData" />

    <div v-else>Nenhum pagamento</div>

    <div class="flex justify-center my-5">
      <u-pagination v-model="currentPage" :page-count="20" :total="payments.length" />
    </div>

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

        <input-file v-model="files" :multiple="true" @update:file-name="(v) => (fileNames = v)" />

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
