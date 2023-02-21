<template>
  <div id="app">
    <c-flex
        borderTopLeftRadius="1.5rem"
        borderTopRightRadius="1.5rem"
        class="navbar"
        wrap="wrap"
        justify="center"
      >
      <nav>
        <li><a href="#/">Home</a></li>

        <li><a href="#/about">About</a></li>

        <li><a href="#/selectTable">Select Table</a></li>

        <li><a href="#/allMenuPage">All Menu</a></li>
      </nav>
    </c-flex>
    
  </div>
</template>

<script>
import { CText, CFlex, CMenu, CMenuButton, CSimpleGrid } from '@chakra-ui/vue';
export default {
  name: "app",
  components: { 
    CText, CMenu, CMenuButton,
    CSimpleGrid, CFlex
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  margin: 18px;
  list-style-type: none;
  a {
    font-weight: 10;
    color: #ffffff;

    // &.router-link-exact-active {
    //   color: #42b983;
    // }
  }
}

.navbar {
  position: fixed;
  top: 780px;
  width: 390px;
  height: 80px;
  background-color: #690505;
}

nav li {
  float: left;
  margin: 0 0 0 15px;
}

nav li a {
  text-decoration: none;
  transition: all .3s;
  border-bottom: 3px solid transparent;
}

nav li a:hover{
  color: #FFC529;
  padding-bottom: 20px;
  border-bottom: 3px solid #FFC529;
}

</style>

