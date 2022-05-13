<template>
  <div>
    {{ formatPrice(price) }}
  </div>
</template>

<script>
export default {
  name: 'RenderPrice',

  methods: {
    formatPrice(x) {
      return x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
    },
  },

  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  computed: {
    price() {
      return this.data.price
    },
  },
}
</script>
