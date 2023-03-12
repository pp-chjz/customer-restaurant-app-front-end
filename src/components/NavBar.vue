<template>
  <div id="navbar" >
    <a href="#/selectTable">Home</a>
    <a class="button" href="#/allMenuPage">Menu</a>
    <!-- <a class="button" href="#/checkBillPage">Notice</a> -->

    <div>
      <a @click="open" >Notice</a>
      <c-modal
        :size="size"
        :is-open="isOpen"
        :on-close="close"
        :block-scroll-on-mount="blockScrollOnMount"
      >
      
        <c-modal-content >
          <img class="checkbill" src="@/assets/money.png" style="width:25%;" />
            <c-link as="router-link" to="/checkBillPage" align="center" mt="10%" font-weight="bold"> 
              Check Bill
            </c-link>
            <c-link as="router-link" to="/cancelOrderPage" align="center" mt="10%" font-weight="bold"> 
              Cancel Order
            </c-link>
            <c-modal-close-button />
            <c-modal-footer>
            </c-modal-footer>
          </c-modal-content>
          <c-modal-overlay />
        </c-modal>
      </div>
    
</div>
</template>

<script>
import AuthUser from "../store/AuthUser";
import { CText, CFlex, CMenu, CMenuButton, CSimpleGrid, CBox, CImage,
         CModal, CModalContent, CModalOverlay, CModalCloseButton, 
         CModalBody, CLink, CModalFooter, CButton } from '@chakra-ui/vue';
         

export default {
  name: "app",
  components: { 
    CText, CMenu, CMenuButton,
    CSimpleGrid, CFlex, CBox,
    CImage, CModal, CModalContent, CModalOverlay, 
    CModalCloseButton, CModalBody,
    CLink, CModalFooter, CButton
  },
  data () {
    return {
      isOpen: false,
      size: 'xs',
    }
  },
  methods: {
    open() {
      this.isOpen = true
    },
    close() {
      this.isOpen = false
    },
    
  },
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

.checkbill {
  margin-left: 37%;
  margin-top: 14%;
}

</style>

