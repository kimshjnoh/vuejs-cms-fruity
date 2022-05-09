<template>

    <v-row>
        <v-col cols="12" class="text-end">
            <Modal4Product :active="active" :isNew="true"></Modal4Product>
            <v-btn color="primary" v-on:click="openModel">
                Add New
            </v-btn>
        </v-col>
        <v-col cols="12">
            <data-table v-bind="paramTable" />

        </v-col>
    </v-row>
</template>

<script>
import productService from '@/service/product.service';
import Spinner from '@/layouts/components/Spinner.vue';
import ActionButtons from './props/ActionButton.vue';
import Modal4Product from './props/Modal4Product.vue';
export default {
    components: {
        Modal4Product
    },
    data() {
        return {
            isLoading: true,
            products: [],
            active: false,
        }
    },
    mounted() {
        productService.getProducts().then(res => {
            this.isLoading = false;
            this.products = res.data.products;
        });
    },
    computed: {
        paramTable() {
            return {
                showDownloadButton: false,
                data: this.products,
                actionMode: "multiple",
                loadingComponent: Spinner,
                isLoading: this.isLoading,
                columns: [
                    {
                        key: "name",
                        title: "Name",
                        sortable: false
                    },
                    {
                        key: "unit",
                        title: "Unit",
                        sortable: false
                    },
                    {
                        key: "price",
                        title: "Price",
                        sortable: false
                    }, {
                        key: "id",
                        title: "Action",
                        sortable: false,
                        component: ActionButtons
                    }
                ]
            };
        },
    },
    methods: {
        openModel() {
            this.active = true;
        }
    }
}
</script>
