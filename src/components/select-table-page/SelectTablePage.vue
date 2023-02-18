<template>
  <div class="about">
    <h1>This is an select table page</h1>
    <br>
    <c-box >
        <p>please select your table</p>
        <c-select v-model="table_number" placeholder="Select table" size="md" borderColor="gray.800">
                <option v-for="index in table" :value="index" > {{ index }}</option>
        </c-select>

        <c-button @click="summit" mt="2rem" width="full" variant-color="yellow" variant="solid" size="lg">
            Confirm table
        </c-button>
    </c-box>
  </div>
</template>

<script>
import { CSelect , CReset , CBox , CButton } from "@chakra-ui/vue";
import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar.vue'
import AuthUser from '@/store/AuthUser.js'



export default {
  name: "App",
  components: {
    CSelect,
    CReset,
    CBox,
    CButton,
    HelloWorld,
    NavBar,
  },
  data(){
      return{
          table_number:"",
          table:['1','2','3','4'],
          form:{
              email: 'user4@hotmail.com',
              password: 'user',
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