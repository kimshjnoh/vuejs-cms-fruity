<template>
  <v-form>
    <v-row :v-show="isLoading">
      <spinner></spinner>
    </v-row>
    <v-row :v-show="!isLoading">
      <v-col cols="12" md="3">
        <label for="name">ID</label>
      </v-col>

      <v-col cols="12" md="9">
        <v-text-field id="name" v-model="order.text_id" outlined dense placeholder="Name" hide-details> </v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <label for="price">Price</label>
      </v-col>

      <v-col cols="12" md="9">
        <v-text-field id="price" v-model="order.total_price" outlined dense placeholder="Price" hide-details>
        </v-text-field>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import Spinner from '../../../layouts/components/Spinner.vue'
import OrderService from '@/service/order.service'

export default {
  name: 'OrderDetailModel',
  components: {
    Spinner,
  },
  props: {
    id: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      required: true,
    },
  },
  beforeMount() {
    this.fetchOrder()
  },
  methods: {
    async fetchOrder() {
      console.log('here')
      this.isLoading = true
      const res = await OrderService.getOrder(this.id)

      this.order = res.data.order
      console.log(this.order)
      this.isLoading = false
    },
  },
}
</script>
