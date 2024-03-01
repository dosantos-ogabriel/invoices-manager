<script setup>
const links = [
  [
    {
      label: "Faturas",
      icon: "material-symbols:order-approve-outline",
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
  <header class="border-b border-gray-200 dark:border-gray-800">
    <u-container>
      <UHorizontalNavigation :links="links" />
    </u-container>
  </header>
</template>
