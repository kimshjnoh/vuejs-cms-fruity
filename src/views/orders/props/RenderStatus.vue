<template>
    <v-chip :color="statusColor[data.status]">
        {{ data.status }}
    </v-chip>
</template>

<script>

export default {
    name: 'RenderStatus',
    setup() {
        const statusColor = {
            processing: 'primary',
            delivered: 'success',
            shipping: 'error',
            cancelled: 'warning',
        }
        return {
            statusColor,
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
