<template>
    <div class="action-buttons">
        <button class="btn btn-outline-success" @click="handleAction('view')">
            <i class="fa fa-eye"></i>
        </button>
        <button class="btn btn-outline-primary" @click="handleAction('edit')">
            <i class="fa fa-edit"></i>
        </button>
        <button class="btn btn-outline-dark" @click="handleAction('delete')">
            <i class="fa fa-trash"></i>
        </button>
        <vs-popup fullscreen title="Description" :active.sync="activeView">
            <p v-html="data.description">

            </p>
        </vs-popup>
        <Modal4Product :data="data" :active="activeEdit" :isNew="false"></Modal4Product>
    </div>

</template>
<script>
import Modal4Product from "./Modal4Product.vue";
import productService from '@/service/product.service';
export default {
    components: {
        Modal4Product
    },
    name: "ActionButtons",
    data() {
        return {
            activeView: false,
            activeEdit: false
        }
    },
    methods: {
        handleAction(actionName) {
            switch (actionName) {
                case 'view':
                    this.activeView = true;
                    break;
                case 'edit':
                    this.activeEdit = true;
                    break;
                case 'delete':
                    this.delete()
                    break;
                default:
                    break;
            }
        },
        delete() {
            this.$vs.dialog({
                type: "confirm",
                color: "danger",
                title: "Are you sure?",
                text: `You want to delete this product ${this.data.name}?`,
                accept: this.handleDelete,
            })
        },
        handleDelete() {
            productService.deleteProduct(this.data.id).then(res => {
                this.$vs.notify({
                    title: 'Success deleted',
                    text: `Product ${this.data.name} has been deleted`,
                    color: 'success',
                    icon: 'check'
                })
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