<template>
    <div>
        <check-bill></check-bill>
    </div>
  </template>
  
  <script>
  // @ is an alias to /src
  import CheckBillPage from '@/components/check-bill-apge/CheckBillPage.vue'
  
  export default {
    name: 'CheckBill',
    components: {
      'check-bill':CheckBillPage,
    }
  }
  </script>
  