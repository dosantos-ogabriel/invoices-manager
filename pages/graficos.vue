<script setup>
const { data: payments } = useAsyncData(async () => $fetch("/api/payments"));
</script>

<template>
  <div class="charts-page">
    <client-only> </client-only>
  </div>
</template>
