<template>
    <v-form>
        <v-row :v-if="order">
            <v-col cols="12" md="12">
                <ul class="leftx" style="list-style: none;">
                    <li>
                        <vs-radio color="success" v-model="currentStatus" vs-value="processing">Processing</vs-radio>
                    </li>
                    <li>
                        <vs-radio color="danger" v-model="currentStatus" vs-value="delivered">Delivered</vs-radio>
                    </li>
                    <li>
                        <vs-radio color="warning" v-model="currentStatus" vs-value="shipping">Shipping</vs-radio>
                    </li>
                    <li>
                        <vs-radio color="dark" v-model="currentStatus" vs-value="cancelled">Cancelled</vs-radio>
                    </li>
                </ul>
            </v-col>

            <v-col cols="12" md="12" style="text-align: center">
                <v-btn class="mx-2 " outlined>
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
        data: {
            type: String,
            required: true,
        },
    },
    data() {
        return {
            newStatus: ''
        }
    },
    computed: {
        currentStatus: {
            get() {
                return cloneDeep(this.data.status)
            },
            set(value) {
                this.newStatus = value
                return value
            }
        }
    },
    methods: {
        handleUpdateStatus() {
            if(!newStatus) {
                return
            }
            OrderService.updateStatus(this.data.id, this.data.newStatus).then(res => {
                this.$emit('reload')
            })
        }
    }
}
</script>
