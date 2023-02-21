<template>
  <div class="about">
    <c-text font-weight="bold" fontSize="xl" mt="4%" ml="5%"> Welcome </c-text>
    <c-heading ml="5%" color="#B30F0F"> {{ "Saengchai Phochana" }}</c-heading>

    <c-box mt="10%">
      <c-text font-weight="bold" fontSize="md" mt="4%" ml="5%"> Please select your table </c-text>
      <c-box w="88%" ml="5%" mt="3%">
        <c-select v-model="table_number" placeholder="Select table" size="md" borderColor="gray.800">
          <option v-for="index in table" :value="index" > {{ index }}</option>
        </c-select>
      </c-box>

      <c-flex justify="center" mt="13%">
        <img class="image" src="@/assets/saeng.png"/>
      </c-flex>
      <c-flex justify="center">
        <c-button @click="summit" borderRadius="1.5rem" mt="50%" width="295px" color="black" variant-color="yellow" variant="solid" size="lg">
            Confirm Table
        </c-button>
      </c-flex>
        
    </c-box>
  </div>
</template>

<script>
import { CSelect , CReset , CBox , CButton,
         CText, CHeading, CFlex } from "@chakra-ui/vue";
import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar.vue'
import AuthUser from '@/store/AuthUser.js'



export default {
  name: "App",
  components: {
    CSelect, CReset, CBox,
    CButton, HelloWorld, NavBar,
    CText, CHeading, CFlex
  },
  data(){
      return{
          table_number:"",
          table:['1','2','3','4'],
          form:{
              email: 'baitoey@hotmail.com',
              password: 'bt',
          }
      }
  },
  async created(){
      console.log("select table page created");
  },
  methods:{
    async summit(){
      let res = await AuthUser.dispatch('login',this.form)
      console.log(res)


    }
  }
};
</script>