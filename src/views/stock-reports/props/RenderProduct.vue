<template>
  <div>
    <!-- for loop stock items -->
    <li v-for="item in data.stock_items" :key="item.id">
      <span>{{ item.product.name }}</span>
      <span>( Qty: {{ item.quantity }} )</span>
    </li>
  </div>
</template>

<script>
export default {
  name: 'RenderProduct',

  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>
