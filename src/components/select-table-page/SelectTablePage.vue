<template>
  <div class="about">
    <h1>This is an select table page</h1>
    <br>
    <c-box >
        <p>please select your table</p>
        <c-select v-model="table_number" placeholder="Select table" size="md" borderColor="gray.800">
                <option v-for="index in table" :value="index" > {{ index }}</option>
        </c-select>
    </c-box>
  </div>
</template>

<script>
import { CSelect , CReset , CBox } from "@chakra-ui/vue";
import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar.vue'


export default {
  name: "App",
  components: {
    CSelect,
    CReset,
    CBox,
    HelloWorld,
    NavBar,
  },
  data(){
      return{
          table_number:"",
          table:['1','2','3','4']
      }
  },
  async created(){
      console.log("select table page created");
  },
  methods:{

  }
};
</script>