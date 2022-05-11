<template>
  <div class="action-buttons">
    <button class="btn btn-outline-success" v-on:click="handleAction('view')">
      <i class="fa fa-eye"></i>
    </button>
    <button class="btn btn-outline-success" v-on:click="handleAction('edit')">
      <i class="fa fa-edit"></i>
    </button>
    <vs-popup title="Order Detail" :active.sync="activeView">
      <order-detail-model v-if="activeView" :id="data.id"></order-detail-model>
    </vs-popup>
    <vs-popup title="Status" :active.sync="activeEdit" >
      <edit-status-modal v-if="activeEdit" :status="data.status"></edit-status-modal>
    </vs-popup>
  </div>
</template>

<script>
import OrderDetailModel from './OrderDetailModel.vue'
import EditStatusModal from './EditStatusModal.vue'
export default {
  components: {
    OrderDetailModel,
    EditStatusModal
  },
  name: 'ActionButtonsOrder',
  data() {
    return {
      activeView: false,
      activeEdit: false,
    }
  },
  methods: {
    handleAction(actionName) {
      switch (actionName) {
        case 'view':
          this.activeView = true
          break
        case 'edit':
          this.activeEdit = true
          break
        default:
          break
      }
    },
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>
