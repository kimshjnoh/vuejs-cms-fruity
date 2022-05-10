<template>
  <v-form>
    <v-row :v-if="order">
      <v-col cols="12" md="3">
        <label for="name">ID</label>
      </v-col>

      <v-col cols="12" md="9">
        <v-text-field id="name" v-model="order.text_id" outlined dense placeholder="Name" hide-details> </v-text-field>
      </v-col>

      <v-col cols="12" md="3">
        <label for="price">Status</label>
      </v-col>

      <v-col cols="12" md="9">
        <v-chip small :color="statusColor[order.status]" class="font-weight-medium">
          <div>{{ order.status }}</div>
        </v-chip>
      </v-col>

      <v-col cols="12" md="3">
        <label for="price">Customer</label>
      </v-col>

      <v-col cols="12" md="9">
        <v-text-field id="price" v-model="order.user.full_name" outlined dense placeholder="Price" hide-details>
        </v-text-field>
      </v-col>
      <v-col cols="12" md="3">
        <label for="price">Seller</label>
      </v-col>

      <v-col cols="12" md="9">
        <v-text-field id="price" v-model="order.seller.name" outlined dense placeholder="Price" hide-details>
        </v-text-field>
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
import OrderService from '@/service/order.service'

export default {
  name: 'OrderDetailModel',
  components: {},
  setup() {
    const statusColor = {
      processing: 'primary',
      delivered: 'success',
      shipping: 'error',
      cancelled: 'warning',
    }

    return {
      statusColor,
    }
  },
  data() {
    return {
      isLoading: true,
      order: null,
    }
  },
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  beforeMount() {
    this.fetchOrder()
  },
  methods: {
    async fetchOrder() {
      this.isLoading = true
      const res = await OrderService.getOrder(this.id)

      this.order = res.data.order

      this.isLoading = false

      console.log(this.isLoading)
    },
  },
}
</script>
