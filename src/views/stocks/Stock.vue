<template>

    <v-row>
        <v-col cols="12">
            <data-table v-bind="paramTable" />

        </v-col>
    </v-row>
</template>

<script>
import stockService from '@/service/stock.service';
import Spinner from '@/layouts/components/Spinner.vue';
import ActionButtonCategory from './props/ActionButton.vue';
import RenderName from './props/RenderName.vue';
export default {
    data() {
        return {
            isLoading: true,
            stocks: [],
            active: false,
        }
    },
    mounted() {
        stockService.getStocks().then(res => {
            this.isLoading = false;
            this.stocks = res.data.stocks;
            console.log(this.stocks);
        });
    },
    computed: {
        paramTable() {
            return {
                showDownloadButton: false,
                data: this.stocks,
                actionMode: "multiple",
                loadingComponent: Spinner,
                isLoading: this.isLoading,
                columns: [
                    {
                        key: "product",
                        title: "Name",
                        sortable: true,
                        searchable: true,
                        component: RenderName,
                    },
                    {
                        key: "quantity",
                        title: "Quantity",
                        sortable: true
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
