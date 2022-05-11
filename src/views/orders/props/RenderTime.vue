<template>
    <div>
        {{ formatTime(data.created_at) }}
    </div>
</template>

<script>
import moment from 'moment';
export default {
    name: 'RenderTime',

    methods: {
        formatTime(x) {
            return moment(x).format('DD/MM/YYYY HH:mm');
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
