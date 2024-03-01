<script setup lang="ts">
const { pending, data: payments } = useAsyncData(async () => $fetch("/api/payments"));

const form = reactive({
  amount: 0,
  date: "",
});

const submit = async () => {
  if (!payments.value) return;
  if (!form.amount || !form.date) return;

  const payment = await $fetch("/api/payments/create", {
    method: "post",
    body: {
      amount: form.amount,
      date: form.date,
    },
  });

  payments.value.push(payment);
};
</script>

<template>
  <main>
    <form @submit.prevent>
      <u-input id="amount" v-model="form.amount" type="number" name="amount" />
      <u-input id="date" v-model="form.date" type="date" name="date" />
      <button @click="submit">Enviar</button>
    </form>
    <div v-if="pending">Carregando...</div>
    <div v-else-if="payments && payments.length">
      <ul>
        <li v-for="payment in payments" :key="payment.id">
          {{ payment }}
        </li>
      </ul>
    </div>
    <div v-else>Nenhum pagamento</div>
  </main>
</template>

<style lang="scss" scoped>
main {
  padding: 16px;
}
</style>
