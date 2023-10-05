<template>
  <Item />
</template>

<script>
import Item from '~/components/Item.vue'
export default {
  layout: 'sidebar',
  name: 'ManagePage',
  components: { Item },
}
</script>
