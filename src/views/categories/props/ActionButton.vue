<template>
    <div class="action-buttons">
        <button class="btn btn-outline-primary" @click="handleAction('edit')">
            <i class="fa fa-edit"></i>
        </button>
        <button class="btn btn-outline-dark" @click="handleAction('delete')">
            <i class="fa fa-trash"></i>
        </button>
        <vs-popup fullscreen title="Order Detail" :active.sync="activeEdit">
            <CategoryDetailModal v-if="activeEdit" :data="data"></CategoryDetailModal>
        </vs-popup>
    </div>

</template>
<script>
import Modal4Category from './CategoryDetail.vue';
import categoryService from '@/service/category.service';
export default {
    components: {
        CategoryDetailModal: Modal4Category
    },
    name: "ActionButtonCategory",
    data() {
        return {
            activeEdit: false
        }
    },
    methods: {
        handleAction(actionName) {
            switch (actionName) {
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
                text: `You want to delete this category ${this.data.name}?`,
                accept: this.handleDelete,
            })
        },
        handleDelete() {
            console.log(this.data.id)
            // categoryService.delete(this.data.id).then(res => {
            //     this.$vs.notify({
            //         title: 'Success deleted',
            //         text: `Product ${this.data.name} has been deleted`,
            //         color: 'success',
            //         icon: 'check'
            //     })
            // })
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