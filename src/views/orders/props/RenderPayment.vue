<template>
    <div>
        {{ getPayment() }}
    </div>
</template>

<script>
import { get } from 'lodash';
export default {
    name: 'RenderPayment',
    methods: {
        getPayment() {
            return get(this.data, 'payment.name');
        }
    },
    props: {
        data: {
            type: Object,
            required: true,
        },
    },
}
</script>
