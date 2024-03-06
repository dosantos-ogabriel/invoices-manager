<script setup>
const links = [
  [
    {
      label: "Pagamentos",
      icon: "material-symbols:payments-outline",
      to: "/pagamentos",
    },
    {
      label: "Faturas",
      icon: "material-symbols:order-approve-outline",
      to: "/faturas",
    },
  ],
  [
    {
      label: "Perfil",
      avatar: {
        src: "https://avatars.githubusercontent.com/u/739984?v=4",
      },
    },
  ],
];
</script>

<template>
  <header class="border-b border-gray-200 dark:border-gray-700">
    <u-container>
      <UHorizontalNavigation :links="links" />
    </u-container>
  </header>
</template>
