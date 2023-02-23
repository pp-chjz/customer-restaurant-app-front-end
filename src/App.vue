<template>
  <div>
    <nav-bar/>
  <c-theme-provider>
    <c-reset />
        <router-view/>
  </c-theme-provider>
</div>
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
