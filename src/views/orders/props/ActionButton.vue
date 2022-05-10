<template>
  <div class="action-buttons">
    <button class="btn btn-outline-success" v-on:click="handleAction('view')">
      <i class="fa fa-eye"></i>
    </button>
    <vs-popup fullscreen title="Order Detail" :active.sync="activeView">
      <order-detail-model v-show="activeView" :id="data.id"></order-detail-model>
    </vs-popup>
  </div>
</template>

<script>
import OrderDetailModel from './OrderDetailModel.vue'

export default {
  components: {
    OrderDetailModel,
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
      console.log(this.data.id)
      switch (actionName) {
        case 'view':
          this.activeView = true
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
