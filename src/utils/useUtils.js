export default function () {
  return {
    formatAmount(amount) {
      return new Intl.NumberFormat("en-US", {
        style: "decimal",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(amount);
    },
  };
}
