<template>
  <Customer />
</template>

<script>
import Customer from '~/components/Customer.vue'
export default {
  layout: 'sidebar',
  name: 'ManagePage',
  components: { Customer },
}
</script>
