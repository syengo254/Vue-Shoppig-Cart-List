<script setup>
import axios from "axios";
import ProductsDisplay from "./components/ProductsDisplay.vue";
import CartDisplay from "./components/CartDisplay.vue";
import { onMounted, reactive, ref } from "vue";

const products = ref([]);
const cartItems = reactive({});

onMounted(() => {
  axios
    .get("/products.json")
    .then((res) => (products.value = res.data.products))
    .catch((e) => console.log(e));
});

const addTocart = (productId) => {
  const product = products.value.find(({ id }) => id === productId);
  if (cartItems[productId]) {
    cartItems[productId].quantity += 1;
  } else {
    cartItems[productId] = {
      ...product,
      quantity: 1,
      total: function () {
        return this.price * this.quantity;
      },
      canAdd: function () {
        return this.available > this.quantity;
      },
    };
  }
};

const decreaseItem = (productId) => {
  if (cartItems[productId].quantity > 1) {
    cartItems[productId].quantity -= 1;
  } else {
    delete cartItems[productId];
  }
};

const clearCart = () => {
  if (confirm("Are you sure?")) {
    Object.keys(cartItems).forEach((key) => delete cartItems[key]);
  }
};
</script>

<template>
  <h1>Vue Shopping List</h1>
  <div class="container">
    <ProductsDisplay :products="products" @added-to-cart="addTocart" />
    <CartDisplay
      :cartItems="cartItems"
      @add-to-cart="addTocart"
      @decrement-cart="decreaseItem"
      @clear-cart="clearCart"
    />
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

