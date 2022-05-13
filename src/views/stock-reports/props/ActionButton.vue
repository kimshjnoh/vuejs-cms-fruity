<template>
    <div class="action-buttons">
        <button class="btn btn-outline-primary" @click="handleAction('edit')">
            <i class="fa fa-edit"></i>
        </button>
         <ModalStockReport :data="data" :active="activeEdit" :isNew="false"></ModalStockReport>
    </div>

</template>
<script>
import stockService from '@/service/stock.service';
import ModalStockReport from './ModalStockReport.vue';
export default {
    name: "ActionButtonStock",
    components: {
        ModalStockReport,
    },
    data() {
        return {
            activeEdit: false,
            value: ''
        }
    },
    methods: {
        handleAction(actionName) {
            switch (actionName) {
                case 'edit':
                    this.activeEdit = true;
                    break;
                default:
                    break;
            }
        },
        handleSubmit() {
            stockService.updateQuantity(this.data.id, this.value).then(res => {
                this.activeEdit = false;
                this.$emit('reload')
            })
        }
    },
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
};
</script>