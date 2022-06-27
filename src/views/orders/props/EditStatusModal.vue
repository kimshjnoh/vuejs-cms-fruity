<template>
    <v-form>
        <v-row :v-if="order">
            <v-col cols="12" md="12">
                <ul class="leftx" style="list-style: none;">
                    <li>
                        <vs-radio color="success" v-model="status" vs-value="processing">Processing
                        </vs-radio>
                    </li>
                    <li>
                        <vs-radio color="danger" v-model="status" vs-value="delivered">Delivered</vs-radio>
                    </li>
                    <li>
                        <vs-radio color="warning" v-model="status" vs-value="shipping">Shipping</vs-radio>
                    </li>
                    <li>
                        <vs-radio color="dark" v-model="status" vs-value="cancelled">Cancelled</vs-radio>
                    </li>
                </ul>
            </v-col>

            <v-col cols="12" md="12" style="text-align: center">
                <v-btn class="mx-2 " outlined v-on:click="handleUpdateStatus()">
                    Submit
                </v-btn>
            </v-col>
        </v-row>
    </v-form>


</template>
<script>
import OrderService from '@/service/order.service'
import { cloneDeep } from 'lodash'
export default {
    name: 'EditStatusModal',

    props: {
        status: {
            type: String,
            required: true,
        },
        id: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            status: cloneDeep(this.status),
        }
    },
    // computed: {
    //     currentStatus
    // },
    methods: {
        handleUpdateStatus() {
            if (!this.status) {
                return
            }
            OrderService.updateStatus(this.id, this.status).then(res => {
                this.$emit('reload')
            })
        }
    }
}
</script>
