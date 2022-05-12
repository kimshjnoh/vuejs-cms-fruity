<template>
    <div>
        {{ data.product.name }}
    </div>
</template>

<script>

export default {
    name: 'RenderName',

    props: {
        data: {
            type: Object,
            required: true,
        },
    },
}
</script>
