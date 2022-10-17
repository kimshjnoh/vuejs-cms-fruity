<template>
  <div class="action-buttons">
    <button class="btn btn-outline-primary" @click="handleAction('edit')">
      <i class="fa fa-edit"></i>
    </button>
    <vs-popup title="Edit Quantity" :active.sync="activeEdit">
      <div class="centerx labelx">
        <vs-input label="Quantity" placeholder="123" v-model="value" />
      </div>

      <v-btn class="mx-2 " outlined @click="handleSubmit()">
        Submit
      </v-btn>
    </vs-popup>
  </div>
</template>
<script>
import stockService from '@/service/stock.service'
export default {
  name: 'ActionButtonStock',
  data() {
    return {
      activeEdit: false,
      value: '',
    }
  },
  methods: {
    handleAction(actionName) {
      switch (actionName) {
        case 'edit':
          this.activeEdit = true
          break
        default:
          break
      }
    },
    handleSubmit() {
      stockService
        .editStock(this.data.id, {
          quantity: +this.value,
        })
        .then(res => {
          console.log(res)
          this.activeEdit = false
          this.$emit('reload')
        })
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
