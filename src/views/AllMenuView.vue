<template>
  <div>
      <all-menu></all-menu>
  </div>
</template>

<script>
// @ is an alias to /src
import AllMenuPage from '@/components/all-menu-page/AllMenuPage.vue'

export default {
  name: 'All',
  components: {
    'all-menu':AllMenuPage,
  }
}
</script>
