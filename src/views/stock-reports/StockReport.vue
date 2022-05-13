<template>
  <v-row>
    <v-col cols="12" class="text-end">
      <ModalStockReport :active="active" :isNew="true"></ModalStockReport>
      <v-btn color="primary" v-on:click="active = true">
        Add New
      </v-btn>
    </v-col>
    <v-col cols="12">
      <data-table v-bind="paramTable" />
    </v-col>
  </v-row>
</template>

<script>
import stockReportService from '@/service/stock-report.service'
import Spinner from '@/layouts/components/Spinner.vue'
import ActionButtonCategory from './props/ActionButton.vue'
import RenderProduct from './props/RenderProduct.vue'
import RenderTimeVue from '../orders/props/RenderTime.vue'
import ModalStockReport from './props/ModalStockReport.vue'
export default {
  data() {
    return {
      isLoading: true,
      stockReports: [],
      active: false,
    }
  },
  components: {
    ModalStockReport
  },
  mounted() {
    stockReportService.getStockReports().then(res => {
      this.isLoading = false
      this.stockReports = res.data.stock_reports
      console.log(this.stockReports)
    })
  },
  computed: {
    paramTable() {
      return {
        showDownloadButton: false,
        data: this.stockReports,
        actionMode: 'multiple',
        loadingComponent: Spinner,
        isLoading: this.isLoading,
        columns: [
          {
            key: 'content',
            title: 'Content',
            sortable: true,
          },
          {
            key: 'created_at',
            title: 'Created At',
            sortable: true,
            component: RenderTimeVue,
          },
          {
            key: 'stock_items',
            title: 'Items',
            sortable: true,
            component: RenderProduct,
          },
          {
            key: 'id',
            title: 'Action',
            sortable: false,
            component: ActionButtonCategory,
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
