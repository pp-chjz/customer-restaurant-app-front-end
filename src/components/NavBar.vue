<template>
  <div id="navbar">
    <!-- <a class="active" href="#">Home</a>
    <a href="#/about">About</a> -->
    <a href="#/selectTable">Home</a>
    <a class="button" href="#/">Menu</a>
    <!-- <a href="#/allMenuPage">All Menu</a> -->
</div>
</template>

<script>
import { CText, CFlex, CMenu, CMenuButton, CSimpleGrid, CBox, CImage } from '@chakra-ui/vue';

export default {
  name: "app",
  components: { 
    CText, CMenu, CMenuButton,
    CSimpleGrid, CFlex, CBox,
    CImage
  }
  

}

</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#navbar {
  position: fixed;
  top: 0;
  left: 0;
  height: 3em;
  overflow: hidden;
  width: 100%;
  background-color: #690505;
  box-sizing: border-box;
  box-shadow: 0px 4px 7px #777;
  transition: background-color 0.4s ease-out;
  z-index: 99;
}

#nav.scroll {
  background-color: #A1572F;
  color: #eef;
}

#navbar a {
  float: left;
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
  font-size: 17px;
}

#navbar a:hover {
  color: #FFC529;
  padding-bottom: 15px;
  border-bottom: 5px solid #FFC529;
}

.sticky {
  position: fixed;
  top: 0;
  width: 100%;
}

</style>

