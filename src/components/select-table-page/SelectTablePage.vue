<template>
  <div class="content">
    <c-text font-weight="bold" fontSize="xl" mt="16%" ml="5%"> Welcome </c-text>
    <c-heading ml="5%" color="#B30F0F"> {{ "Saengchai Phochana" }}</c-heading>

    <c-box mt="10%">
      <c-text font-weight="bold" fontSize="md" mt="4%" ml="5%"> Please select your table </c-text>
      <c-box w="88%" ml="5%" mt="3%">
        <c-select v-model="table_number" placeholder="Select table" size="md" borderColor="gray.800">
          <option v-for="index in table" :value="index" > {{ index }}</option>
        </c-select>
      </c-box>

      <c-text fontWeight="bold" mt="5%" ml="5%">จำนวนลูกค้า</c-text>
      <c-box mt="1%" w="30%" ml="5%">
        <c-number-input :default-value="1" :max="40" :min="0">
        <c-number-input-field type="number" borderColor="gray.800" />
        <c-number-input-stepper>
        <c-numberIncrement-stepper/>
        <c-number-decrement-stepper />
        </c-number-input-stepper>
        </c-number-input>
      </c-box>
       

      <c-flex justify="center" mt="13%">
        <img class="image" src="@/assets/saeng.png"/>
      </c-flex>
      <c-flex justify="center">
        <c-button @click="summit" borderRadius="1.5rem" mt="20%" mb="10%" width="295px" color="black" variant-color="yellow" variant="solid" size="lg">
            Confirm Table
        </c-button>
      </c-flex>
        
    </c-box>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld.vue'
import NavBar from '@/components/NavBar.vue'
import AuthUser from '@/store/AuthUser.js'
import { CSelect , CReset , CBox , CButton,
         CText, CHeading, CFlex,
         CInput, CNumberInput,
         CNumberInputField,
         CNumberInputStepper,
         CNumberIncrementStepper,
         CNumberDecrementStepper, } from "@chakra-ui/vue";

export default {
  name: "App",
  components: {
    CSelect, CReset, CBox,
    CButton, HelloWorld, NavBar,
    CText, CHeading, CFlex,
    CInput, CNumberInput,
         CNumberInputField,
         CNumberInputStepper,
         CNumberIncrementStepper,
         CNumberDecrementStepper,
  },
  data(){
      return{
          table_number:"",
          table:['1','2','3','4'],
          form:{
              email: 'user4@hotmail.com',
              password: 'user',
          },
      }
  },
  async created(){
      console.log("select table page created");
  },
  methods:{
    async summit() {
      if (this.table_number == "") {
        this.$swal({
          icon: 'error',
          title: 'ผิดพลาด',
          text: 'กุณณาเลือกโต๊ะของท่าน!',
          footer: '<a href="">Why do I have this issue?</a>'
        })
      }
      else if (this.table_number != "") {
        console.log("form = ", this.form);
        let res = await AuthUser.dispatch('login',this.form)
        if (res.success) {
          this.$swal("สำเร็จ" , `ยินดีต้อนรับคุณ ${res.user.name}`, "success");
          localStorage.setItem('table_number', JSON.stringify(this.table_number));

          this.$router.push("/allMenuPage");
        }
        console.log(res)
      }
      
    }
  }
};
</script>