import { computed, reactive, readonly } from "vue";

const cartItems = reactive({});

const cartEmpty = computed(() => Object.keys(cartItems).length === 0);
const totalCost = computed(() => {
  return Object.values(cartItems).reduce((p, c) => p + c.total(), 0);
});

const getters = {};

const setters = {
  addTocart(product) {
    if (cartItems[product.id]) {
      cartItems[product.id].quantity += 1;
    } else {
      cartItems[product.id] = {
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
  },

  decreaseItem(productId) {
    if (cartItems[productId].quantity > 1) {
      cartItems[productId].quantity -= 1;
    } else {
      delete cartItems[productId];
    }
  },

  clearCart() {
    if (confirm("Are you sure?")) {
      Object.keys(cartItems).forEach((key) => delete cartItems[key]);
    }
  },
};

export default function () {
  return {
    cartItems: readonly(cartItems),
    cartEmpty,
    totalCost,
    ...getters,
    ...setters,
  };
}
