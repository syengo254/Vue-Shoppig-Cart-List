<script setup>
import useCart from "../composables/useCart";
import useUtils from "../utils/useUtils";

const { formatAmount } = useUtils();

const { cartItems, totalCost, cartEmpty, decreaseItem, addTocart, clearCart } =
  useCart();
</script>

<template>
  <div class="cart-container">
    <h4>Your cart items</h4>
    <div>
      <table>
        <thead>
          <tr>
            <th style="width: 30px !important">#</th>
            <th style="min-width: 200px">Item</th>
            <th>Price (KES)</th>
            <th>Available</th>
            <th>Quantity</th>
            <th>Actions</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody v-if="!cartEmpty">
          <tr
            v-for="(item, idx) in Object.values(cartItems)"
            :key="[`item-${item.id}`]"
          >
            <td style="width: 30px !important">{{ idx + 1 }}.</td>
            <td>{{ item.name }}</td>
            <td>{{ formatAmount(item.price) }}</td>
            <td>{{ item.available }}</td>
            <td>{{ item.quantity }}</td>
            <td>
              <button @click="decreaseItem(item.id)">-</button>
              <button @click="addTocart(item)" :disabled="!item.canAdd()">
                +
              </button>
            </td>
            <td>{{ formatAmount(item.total()) }}</td>
          </tr>
          <tr class="totals">
            <td colspan="5">TOTAL COST</td>
            <td>KES {{ formatAmount(totalCost) }}</td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr>
            <td colspan="6"><p>There are no items in your cart.</p></td>
          </tr>
        </tbody>
      </table>
      <button v-if="!cartEmpty" @click="clearCart()">Clear cart</button>
    </div>
  </div>
</template>

<style scoped>
.cart-container {
  margin-left: 1rem;
}
h4 {
  margin: 0.5rem;
}
table {
  min-width: 600px;
  border: 1px solid black;
  border-collapse: collapse;
}

th,
td {
  padding: 0 1rem;
  font-size: 1rem;
  border: 1px solid black;
}
td {
  font-size: 0.9rem;
  text-align: center;
  padding: 0.3rem;
}

tr.totals {
  font-weight: 800;
  font-size: 1rem !important;
}

td > button {
  padding: 0.2rem 0.4rem;
  margin-inline: 0.5rem;
  font-size: 1rem;
  font-family: inherit;
  cursor: pointer;
  min-width: 30px;
}
</style>
