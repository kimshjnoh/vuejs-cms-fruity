<template>

    <v-row>
        <v-col cols="12">
            <data-table v-bind="paramTable" />

        </v-col>
    </v-row>
</template>

<script>
import stockReportService from '@/service/stock-report.service';
import Spinner from '@/layouts/components/Spinner.vue';
import ActionButtonCategory from './props/ActionButton.vue';
import RenderName from './props/RenderName.vue';
export default {
    data() {
        return {
            isLoading: true,
            stockReports: [],
            active: false,
        }
    },
    mounted() {
        stockReportService.getStockReports().then(res => {
            this.isLoading = false;
            this.stockReports = res.data.stockReports;
            console.log(this.stockReports);
        });
    },
    computed: {
        paramTable() {
            return {
                showDownloadButton: false,
                data: this.stockReports,
                actionMode: "multiple",
                loadingComponent: Spinner,
                isLoading: this.isLoading,
                columns: [
                    {
                        key: "product",
                        title: "Name",
                        sortable: true,
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
