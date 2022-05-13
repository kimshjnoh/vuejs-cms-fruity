<template>
  <div>
    <!-- for loop stock items -->
    <img :src="data.image_url" width="50" height="50" alt="" />
  </div>
</template>

<script>
export default {
  name: 'RenderImage',

  props: {
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>
