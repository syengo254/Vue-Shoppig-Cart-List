<script setup>
import ProductsDisplay from "./components/ProductsDisplay.vue";
import CartDisplay from "./components/CartDisplay.vue";
</script>

<template>
  <h1>Vue Shopping List</h1>
  <div class="container">
    <ProductsDisplay />
    <CartDisplay />
  </div>
</template>

<style scoped>
.container {
  display: flex;
  gap: 0.5rem;
  align-items: flex-start;
  border: 1px solid black;
}
</style>

