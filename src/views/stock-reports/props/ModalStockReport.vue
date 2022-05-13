<template>
    <vs-popup fullscreen :title="isNew ? 'New Stock Report' : 'Edit Stock Report'" :active.sync="active">
        <v-row>
            <v-col cols="12" md="3">
                <label for="content">Content</label>
            </v-col>

            <v-col cols="12" md="9">
                <v-text-field id="content" v-model="stockReport.content" outlined dense placeholder="content"
                    hide-details>
                </v-text-field>
            </v-col>

            <v-col cols="12" md="3">
                <label for="product">Add product</label>
            </v-col>

            <v-col cols="12" md="9">
                <div style="height: 300px">
                    <autocomplete aria-label="Search Product" placeholder="Search Product" :search="search"
                        :get-result-value="getResultValue" @submit="handleChoose">
                        <template #result="{ result, props }">
                            <li v-bind="props" class="autocomplete-result wiki-result">
                                <vs-card actionable class="cardx">
                                    <div slot="header">
                                        <v-row>
                                            <v-col cols="12" md="3">
                                                <img :src="result.imageUrl" style="width: 70px; height: 70px;">
                                            </v-col>
                                            <v-col cols="12" md="9">
                                                <h4>
                                                    {{ result.name }}
                                                </h4>
                                                <span>{{ formatPrice(result.price) }}</span>
                                            </v-col>
                                        </v-row>
                                    </div>

                                </vs-card>

                            </li>
                        </template>
                    </autocomplete>
                </div>
            </v-col>

            <v-col cols="12" md="3">
                <label for="price">Products </label>
            </v-col>
            <v-col cols="12" md="9">
                <vs-table stripe :data="products" noDataText="Chưa có sản phẩm nào, thêm sản phẩm ở trên nhé">
                    <template slot="thead">
                        <vs-th>
                            #
                        </vs-th>
                        <vs-th>
                            Name
                        </vs-th>
                        <vs-th>
                            Quantity
                        </vs-th>
                        <vs-th>
                            Note
                        </vs-th>
                        <vs-th>
                            Action
                        </vs-th>
                    </template>

                    <template slot-scope="{ data }">
                        <vs-tr :key="indextr" v-for="(tr, indextr) in data">
                            <vs-td>
                                {{ indextr + 1 }}
                            </vs-td>

                            <vs-td>
                                {{ data[indextr].name }}
                            </vs-td>

                            <vs-td>
                                {{ data[indextr].quantity }}
                                <button class="btn btn-outline-primary" @click="handleEdit(indextr, 'quantity')">
                                    <i class="fa fa-edit"></i>
                                </button>
                            </vs-td>
                            <vs-td>
                                {{ data[indextr].note }}
                                <button class="btn btn-outline-primary" @click="handleEdit(indextr, 'note')">
                                    <i class="fa fa-edit"></i>
                                </button>
                            </vs-td>
                            <vs-td>
                                <button class="btn btn-outline-dark" @click="handleDelete(indextr)">
                                    <i class="fa fa-trash"></i>
                                </button>
                            </vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </v-col>

            <v-col offset-md="3" cols="12" class="text-center">
                <v-btn class="mx-2 " outlined @click="submit()">
                    Submit
                </v-btn>
            </v-col>
        </v-row>
    </vs-popup>
</template>
<script>
import stockReportService from "@/service/stock-report.service";
import searchProductService from "@/service/search-product.service";
import { isFinite } from 'lodash'
export default {
    name: "ModalStockReport",
    data() {
        return {
            products: []
        }
    },
    props: {
        data: {
            type: Object,
            required: false,
        },
        active: {
            type: Boolean,
            required: true,
        },
        isNew: {
            type: Boolean,
            required: true,
        },
    },
    mounted() {
        this.products = this.isNew ? [] : this.convertStockItems(this.data.stock_items)
    },
    computed: {
        stockReport() {
            return this.data ? this.data : {};
        },
    },
    methods: {
        search(input) {
            return new Promise(resolve => {
                if (input.length < 3) {
                    return resolve([])
                }
                searchProductService.search(input).then(res => {
                    resolve(this.convertResponeElastic(res.data.hits.hits));
                });
            })
        },
        convertStockItems(stock_items) {
            return stock_items.map(item => {
                return {
                    product_id: item.product.id,
                    name: item.product.name,
                    quantity: item.quantity,
                    note: item.note,
                }
            })
        },
        convertResponeElastic(data) {
            return data.map(item => {
                return {
                    id: item._source.id,
                    name: item._source.name,
                    imageUrl: item._source.imageUrl,
                    price: item._source.price,
                }
            })
        },
        handleChoose(product) {
            this.products.push({
                product_id: product.id,
                name: product.name,
                quantity: 1,
                note: '',
            });
        },
        getResultValue() {
            return ""
        },
        submit() {
            if (this.isNew) {
                this.stockReport.stock_items = this.products
                stockReportService.createStockReport(this.stockReport).then(res => {
                    this.active = false;
                    this.$emit('reload');
                    this.$vs.notify({
                        title: 'Success created',
                        text: `SR ${this.stockReport.content} has been created`,
                        color: 'success',
                        icon: 'check'
                    })
                }).catch(err => {
                    this.$vs.notify({
                        title: 'Error',
                        text: err.response.data.message,
                        color: 'danger',
                        icon: 'error'
                    })
                })
            } else {
                stockReportService.editStockReport(this.stockReport.id, this.stockReport).then(res => {
                    this.active = false;
                    this.$emit('reload');
                    this.$vs.notify({
                        title: 'Success updated',
                        text: `SR ${this.stockReport.content} has been updated`,
                        color: 'success',
                        icon: 'check'
                    })
                }).catch(err => {
                    this.$vs.notify({
                        title: 'Error',
                        text: err.response.data.message,
                        color: 'danger',
                        icon: 'error'
                    })
                })
            }
        },
        formatPrice(x) {
            return x.toLocaleString('it-IT', { style: 'currency', currency: 'VND' })
        },
        handleEdit(indextr, type) {
            let data = prompt("Please enter value:");
            switch (type) {
                case 'quantity':
                    if (isFinite(+data)) {
                        this.products[indextr].quantity = +data;
                    } else {
                        this.$vs.notify({
                            title: 'Error',
                            text: 'Please enter number',
                            color: 'danger',
                            icon: 'error'
                        })
                    }
                    break;
                case 'note':
                    this.products[indextr].note = data;
                    break;
                default:
                    break;
            }
        },
        handleDelete(indextr) {
            this.products.splice(indextr, 1);
        },
    }
}
</script>
<style>
.wiki-result {
    border-top: 1px solid #eee;
    padding: 16px;
    background: transparent;
}

.wiki-title {
    font-size: 20px;
    margin-bottom: 8px;
}

.wiki-snippet {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.54);
}
</style>