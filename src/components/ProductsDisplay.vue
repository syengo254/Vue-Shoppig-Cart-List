<script setup>
import ProductComponent from "./ProductComponent.vue";
import useProduct from "../composables/useProduct";

const { products } = useProduct();
</script>

<template>
  <div v-if="products.length" class="products">
    <ProductComponent
      v-for="product in products"
      :key="product.id"
      :product="product"
    />
  </div>
  <div v-else><i>There are no products to display</i></div>
</template>

<style scoped>
.products {
  width: 650px;
  margin-left: 2rem;
  display: grid;
  grid-template-columns: repeat(3, 200px);
  grid-template-rows: auto;
  gap: 1rem;
  padding: 0.5rem;
}
</style>
