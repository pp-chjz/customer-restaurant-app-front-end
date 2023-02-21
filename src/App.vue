<template>
  <c-theme-provider>
    <c-reset />
        <nav-bar/>
        <router-view/>
  </c-theme-provider>
</template>

<script>
import { CThemeProvider, CReset } from "@chakra-ui/vue";
import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar.vue'


export default {
  name: "App",
  components: {
    CThemeProvider, CReset,
    HelloWorld,
    NavBar,
  }
};
</script>
