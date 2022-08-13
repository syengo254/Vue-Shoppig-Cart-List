import axios from "axios";
import { onMounted, readonly, ref } from "vue";

const products = ref([]);

export default function () {
  onMounted(() => {
    axios
      .get("/products.json")
      .then((res) => (products.value = res.data.products))
      .catch((e) => console.log(e));
  });

  return {
    products: readonly(products),
  };
}
