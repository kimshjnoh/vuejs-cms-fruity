<template>
  <v-form>
    <v-row :v-if="order">
      <v-col cols="12" md="3">
        <label for="name">ID</label>
      </v-col>

      <v-col cols="12" md="9">
        <p class="subtitle-1 text-truncate mb-0"> {{ order.text_id }} </p>
      </v-col>

      <v-col cols="12" md="3">
        <label for="price">Status</label>
      </v-col>

      <v-col cols="12" md="9">
        <p class="subtitle-1 text-truncate mb-0"> {{ order.status }} </p>
      </v-col>

      <v-col cols="12" md="3">
        <label for="price">Customer</label>
      </v-col>

      <v-col cols="12" md="9">
        <p class="subtitle-1 text-truncate mb-0"> {{ order.user.full_name }} </p>
      </v-col>
      <v-col cols="12" md="3">
        <label for="price">Seller</label>
      </v-col>

      <v-col cols="12" md="9">
        <p class="subtitle-1 text-truncate mb-0"> {{ order.seller.name }} </p>
      </v-col>
      <v-col cols="12" md="3">
        <label for="price">Price</label>
      </v-col>

      <v-col cols="12" md="9">
        <p class="subtitle-1 text-truncate mb-0"> {{ formatPrice(order.total_price) }} </p>
      </v-col>
      <v-col cols="12" md="3">
        <label for="price">Payment Method</label>
      </v-col>

      <v-col cols="12" md="9">
        <p class="subtitle-1 text-truncate mb-0"> {{ getPayment() }} </p>
      </v-col>
      <v-col cols="12" md="3">
        <label for="order">Products</label>
      </v-col>

      <v-col cols="12" md="9">
        <vs-table stripe :data="order.order_items">
          <template slot="thead">
            <vs-th>
              #
            </vs-th>
            <vs-th>
              Product
            </vs-th>
            <vs-th>
              Quantity
            </vs-th>
            <vs-th>
              Note
            </vs-th>
          </template>

          <template slot-scope="{data}">
            <vs-tr :key="indextr" v-for="(tr, indextr) in data">
              <vs-td>
                {{ indextr + 1 }}
              </vs-td>

              <vs-td>
                {{ data[indextr].product.name }}
              </vs-td>

              <vs-td>
                {{ data[indextr].quantity }} ({{ data[indextr].product.unit }})
              </vs-td>

              <vs-td>
                {{ data[indextr].note }}
              </vs-td>
            </vs-tr>
          </template>
        </vs-table>
      </v-col>
    </v-row>
  </v-form>
</template>
<script>
import OrderService from '@/service/order.service'
import { get } from 'lodash'
export default {
  name: 'OrderDetailModel',
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
    },
    formatPrice(x) {
      return x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
    },
    getPayment() {
      return get(this.order, 'payment.name');
    }
  },
}
</script>
