<script setup>
import useCart from "../composables/useCart";
import useUtils from "../utils/useUtils";
import { computed } from "@vue/reactivity";

const props = defineProps({
  product: {
    type: Object,
    default: {
      name: "",
      price: 0,
    },
  },
});

const { addTocart, cartItems } = useCart();
const { formatAmount } = useUtils();
const stocked = () => props.product.available > 0;
const itemInCart = computed(() => (id) => cartItems[id]);
</script>

<template>
  <div class="product-item">
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
      @click="addTocart(product)"
      :disabled="!stocked()"
      :class="[itemInCart(product.id) && 'added']"
    >
      {{ itemInCart(product.id) ? "Added to cart" : "Add to cart" }}
    </button>
  </div>
</template>

<style scoped>
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

b {
  font-weight: 700;
}

.product-item button {
  position: absolute;
  bottom: 0.5rem;
  left: 30%;
}

.product-item button.added {
  background: blue;
  color: white;
  outline: none;
  border: 1px solid #eee;
  padding: 0.2rem 0.4rem;
  border-radius: 3px;
  font-weight: 600;
}
.product-name {
  font-size: 1rem;
}
.stocked {
  color: blue;
}

.no-stock {
  color: orangered;
}
</style>
