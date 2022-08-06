<script setup>
import useUtils from "../utils/useUtils";

const props = defineProps(["products"]);
const emits = defineEmits(["added-to-cart"]);

const { formatAmount } = useUtils();

const stocked = (qty) => qty > 0;
</script>

<template>
  <div v-if="products.length" class="products">
    <div v-for="product in products" :key="product.id" class="product-item">
      <div class="product-name">
        Name: <b>{{ product.name }}</b>
      </div>
      <div>
        Price: <b>KES {{ formatAmount(product.price) }}</b>
      </div>
      <div>
        <span :class="[stocked(product.available) ? 'stocked' : 'no-stock']">{{
          stocked(product.available) ? "In stock" : "Out of stock"
        }}</span>
      </div>
      <button
        @click="$emit('added-to-cart', product.id)"
        :disabled="!stocked(product.available)"
      >
        Add to cart
      </button>
    </div>
  </div>
  <div v-else><i>There are no products to display</i></div>
</template>

<style scoped>
.products {
  width: 650px;
  margin-left: 3rem;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: auto;
  gap: 1rem;
  border: 1px solid black;
  padding: 0.5rem;
}

.product-item {
  position: relative;
  max-width: 200px;
  background-color: white;
  border: 1px solid rgb(196, 196, 196);
  border-radius: 3px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2);
  padding: 0.5rem;
  font-size: 0.9rem;
  display: flex;
  flex-direction: column;
  height: 150px;
}

.product-name {
  font-size: 1rem;
}

b {
  font-weight: 700;
}

.product-item button {
  position: absolute;
  bottom: 0.5rem;
  left: 30%;
}

.stocked {
  color: blue;
}

.no-stock {
  color: orangered;
}
</style>
