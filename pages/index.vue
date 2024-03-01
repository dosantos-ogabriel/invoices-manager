<script setup lang="ts">
const { pending, data: payments } = useAsyncData(async () => $fetch("/api/payments"));

// const form = reactive({
//   amount: 0,
//   date: "",
// });

// const submit = async () => {
//   if (!payments.value) return;
//   if (!form.amount || !form.date) return;

//   const payment = await $fetch("/api/payments/create", {
//     method: "post",
//     body: {
//       amount: form.amount,
//       date: form.date,
//     },
//   });

//   payments.value.push(payment);
// };
</script>

<template>
  <div>
    <h1 class="text-xl">Faturas</h1>
    <u-divider class="mb-6 mt-2" />

    <div class="flex justify-between mb-6">
      <span></span>
      <u-button icon="material-symbols:drive-folder-upload-outline" label="Importar" />
    </div>

    <div v-if="pending">Carregando...</div>
    <u-table v-else-if="payments && payments.length" :rows="[...payments]" />
    <div v-else>Nenhum pagamento</div>

    <!-- <form @submit.prevent>
      <u-input id="amount" v-model="form.amount" type="number" name="amount" />
      <u-input id="date" v-model="form.date" type="date" name="date" />
      <u-button @click="submit">Enviar</u-button>
    </form> -->
  </div>
</template>

<style lang="scss" scoped></style>
