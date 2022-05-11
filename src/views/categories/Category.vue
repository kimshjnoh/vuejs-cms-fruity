<template>

    <v-row>
        <v-col cols="12" class="text-end">
            <vs-popup title="New Category" :active.sync="active">
                <modal-category v-if="active"></modal-category>
            </vs-popup>
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
import categoryService from '@/service/category.service';
import Spinner from '@/layouts/components/Spinner.vue';
import ActionButtonCategory from './props/ActionButton.vue';
import ModalCategory from './props/ModalCategory.vue';
export default {
    components: {
        ModalCategory
    },
    data() {
        return {
            isLoading: true,
            categories: [],
            active: false,
        }
    },
    mounted() {
        categoryService.getCategories().then(res => {
            this.isLoading = false;
            this.categories = res.data.categories;
            console.log(this.categories);
        });
    },
    computed: {
        paramTable() {
            return {
                showDownloadButton: false,
                data: this.categories,
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
                        key: "image_url",
                        title: "Image Url",
                        sortable: false
                    },
                    {
                        key: "id",
                        title: "Action",
                        sortable: false,
                        component: ActionButtonCategory
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
