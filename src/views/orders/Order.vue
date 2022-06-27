<template>
  <v-row>
    <v-col cols="12" class="text-end"> </v-col>
    <v-col cols="12">
      <data-table v-bind="paramTable" />
    </v-col>
  </v-row>
</template>

<script>
import OrderService from '@/service/order.service'
import Spinner from '@/layouts/components/Spinner.vue'
import ActionButtonsOrder from './props/ActionButton.vue'
import RenderPrice from './props/RenderPrice.vue'
import RenderStatus from './props/RenderStatus.vue'
import RenderPayment from './props/RenderPayment.vue'
import RenderTime from './props/RenderTime.vue'
export default {
  data() {
    return {
      isLoading: true,
      orders: [],
      active: false,
    }
  },
  mounted() {
    OrderService.getOrders().then(res => {
      this.isLoading = false
      console.log(res.data.orders)
      this.orders = res.data.orders
    })
  },
  computed: {
    paramTable() {
      return {
        showDownloadButton: false,
        data: this.orders,
        actionMode: 'multiple',
        loadingComponent: Spinner,
        isLoading: this.isLoading,
        columns: [
          {
            key: 'text_id',
            title: 'ID',
            sortable: false,
          },
          {
            key: 'status',
            title: 'Status',
            sortable: true,
            component: RenderStatus,
          },
          {
            key: 'total_price',
            title: 'Price',
            sortable: false,
            component: RenderPrice,
          },
          {
            key: 'payment',
            title: 'Payment Method',
            sortable: false,
            component: RenderPayment,
          },
          {
            key: 'created_at',
            title: 'Created At',
            sortable: true,
            component: RenderTime,
          },
          {
            key: 'id',
            title: 'Action',
            sortable: false,
            component: ActionButtonsOrder,
          },
        ],
      }
    },
  },
  methods: {
    openModel() {
      this.active = true
    },
  },
}
</script>
