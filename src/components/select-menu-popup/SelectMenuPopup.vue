<template>
  <div>
    <vs-button @click="popupActivo2=true" color="green" type="filled">เลือก</vs-button>


        <!-- ส่วนของ pop up ที่เด้งขึ้นมาเมื่อกดปุ่ม -->
        <vs-popup  title="เมนูที่ต้องการเลือก" :active.sync="popupActivo2">
            <c-image src="gibberish.png" size="300px" rounded="lg" fallback-src="https://via.placeholder.com/150" />
            <p class="name">{{ name_TH }} ({{ name_ENG }})</p>
            <br>
            <p class="name">หมายเหตุถึงร้านอาหาร (ไม่จำเป็นต้องระบุ)</p>

            <vs-input class="inputx" size="large" placeholder="ระบุรายละเอียดคำขอ" v-model="comment"/>

            <!-- เพิ่มลดจำนวนจาน -->
            <c-flex align="center">
                <c-flex bg="green.50" align="flex-end">
                    <c-button @click="deCount" variant-color="red" :isDisabled="disabled">-</c-button>
                </c-flex>
                <c-flex bg="blue.50" size="40px" align="center" justify="center">
                    <c-text text-align="center">
                    {{ count }}
                    </c-text>
                </c-flex>
                <c-box>
                    <c-button  @click="addCount" variant-color="green">+</c-button>
                </c-box>
            </c-flex>
            <!-- เพิ่มลดจำนวนจาน -->


            <c-button @click="saveInfo()" mt="2rem" width="full" variant-color="yellow" variant="solid" size="lg">
                เพิ่มเมนูนี้
            </c-button> 
        </vs-popup>
        <!-- ส่วนของ pop up ที่เด้งขึ้นมาเมื่อกดปุ่ม -->
  </div>
</template>

<script>
import { CInput,CSelect,CNumberInput,
  CNumberInputField,
  CNumberInputStepper,
  CNumberIncrementStepper,
  CNumberDecrementStepper, CStack,
  CButton, CImage, CSimpleGrid, CBox,
  CBadge, CFlex, CText, CHeading, CIcon,  CGrid, CGridItem,
  CTextarea, CIconButton ,CFormControl ,
  } from "@chakra-ui/vue";
export default {
    props:{
        name_TH: String,
        name_ENG: String,
        id: Number,
        price: Number,
        form: Array,
    },
    components: {
        CInput,
        CSelect,
        CNumberInput,
        CNumberInputField,
        CNumberInputStepper,
        CNumberIncrementStepper,
        CNumberDecrementStepper, CIconButton,
        CButton, CText, CHeading, CIcon,
        CImage, CSimpleGrid ,CBox ,CBadge ,CFlex ,
        CGrid, CGridItem, CStack, CTextarea , CFormControl ,

    },
    data(){
        return{
            comment:'',
            popupActivo2:false,
            popupActivo3:false,
            count:0,
            total_price:0,
            timestamp:"",
            form_payload:{
                "cancel_status":1,
                "order_status":1,
                "total_price": 0,
                "order_time":"1985-08-05 13:25:30",
                "menus":[]
            },
            disabled: true
        }
    },
    async created(){
        console.log("Select Menu Pop Up Created");
        console.log("form = ", this.form)

    },
    methods:{
        getNow() {
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +' '+ time;
            this.timestamp = dateTime;
        },
        saveInfo() {
            this.total_price = this.price * this.count
            this.getNow()
            let returnData = {
                menu_id: this.id,
                comment: this.comment,
                status: 1,
                food_status: 1,
                order_time: this.timestamp,
                QTY: this.count,
                price: this.total_price,
                complete_at: "1985-08-05 13:25:30",
            }
            this.name_TH = ""
            this.name_ENG = ""
            this.id = 0
            this.price = 0
            this.comment = ""
            this.count = 0

            console.log("returndata = ", returnData)
            this.form.push(returnData)
            console.log("form after = ", this.form)

            this.$emit('saveInfo',returnData)
            this.popupActivo2 =false

        },
        edit(id){
            console.log("index.id = ", id)
            console.log("menu = ", this.menu)
        },
        summit(){
            console.log("id =" ,this.id)
        },
        addCount(){
            this.count++
            if (this.count >= 1) {
                this.disabled = false
            }
        },
        deCount(){
            this.count--
            if (this.count == 0) {
                this.disabled = true
            }
        }
    }
}
</script>

<style>

</style>