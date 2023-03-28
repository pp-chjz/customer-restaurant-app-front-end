<template>
    <div>
        <c-stack is-inline mt="20%">
            <img class="bill" src="@/assets/bill.png" style="width:35%;" />
        <c-heading class="head" align="center" mb="5%" color="#11225F"> {{ "Bill" }}</c-heading>
    </c-stack>

        <c-box>
            <c-stack :spacing="12" is-inline mt="8%">
                <c-text ml="3%" color="#CC2D2D">Order Items</c-text>
                <c-text ml="6%" color="#CC2D2D">QTY</c-text>
                <c-text color="#CC2D2D">Price</c-text>
                <c-text color="#CC2D2D">Status</c-text>
            </c-stack>
            <c-divider class="border" borderWidth="0.1rem" borderRadius="42rem" border-color="black" />
        </c-box>

        <div v-for="item in orders.data" :key="item.id" mt="10%">
            
            <div v-for="menu in item.menus" :key="menu.id">
                <div v-if="menu.pivot.food_status !== 'cancel' ">
                    <c-grid w="381px" template-columns="repeat(4, 1fr)" gap="1">
                        <c-box ml="10%" w="100%" h="10" >
                            <c-text> {{  menu.name_TH }} </c-text>
                                
                        </c-box>

                        <c-box ml="78%" w="100%" h="10"  >
                            <c-text > x {{ menu.pivot.QTY }} </c-text>
                        </c-box>

                        <c-box ml="45%" w="100%" h="10"  >
                            <c-text> {{ menu.pivot.price }}</c-text>
                        </c-box>

                        <c-box ml="13%" w="100%" h="10"  >
                            <c-badge v-if="menu.pivot.food_status === 'prepare' " rounded="full" px="2" variant-color="green" ml="3">
                                Prepare
                            </c-badge>
                            <c-badge v-if="menu.pivot.food_status === 'cooking' " rounded="full" px="2" variant-color="yellow" ml="3">
                                Cooking
                            </c-badge>
                            <c-badge v-if="menu.pivot.food_status === 'served' " rounded="full" px="2" variant-color="red" ml="5">
                                served
                            </c-badge>
                        </c-box>
                        
                    </c-grid>
                    <c-divider class="border" borderWidth="0.1rem" borderRadius="42rem" border-color="black" mt="6%"/> 
                </div>
            </div>
        </div>
        <c-text align="center" mt="15%" fontWeight="bold" color="#C72319">
            Total Price : {{ total_price }} THB
        </c-text>
        <c-button @click="popupActivo2=true" variant-color="yellow" ml="35%" mt="10%">check bill</c-button>


    <!-- <vs-button @click="popupActivo2=true" color="green" type="filled">เลือก</vs-button>
    <vs-button color="red" type="filled" isDisabled>เลือก</vs-button> -->

        <!-- ส่วนของ pop up ที่เด้งขึ้นมาเมื่อกดปุ่ม -->
        <vs-popup class="pop-up"  title="เมนูที่ต้องการเลือก" :active.sync="popupActivo2">
            <c-text class="name">กรุณาชำระเงินที่เคาเตอร์</c-text>
            <br>
            <c-text class="name">หรือ ชำระผ่านธนาคาร</c-text>

            <img class="image" src="@/assets/qr.png"/>


                <!-- เพิ่มลดจำนวนจาน -->
                <c-flex align="center">
                    <c-button @click="popupActivo2=false" mt="2rem" width="full" variant-color="red" variant="solid" size="lg">
                        ยกเลิก
                    </c-button> 
                    <c-button @click="checkbill" width="full" variant-color="green" ml="35%" mt="10%">ยืนยัน</c-button>

                </c-flex>
                <!-- เพิ่มลดจำนวนจาน -->

                
        </vs-popup>
        <!-- ส่วนของ pop up ที่เด้งขึ้นมาเมื่อกดปุ่ม -->

    </div>
    
</template>

<script>
import AuthUser from '@/store/AuthUser.js'
import MenuApi from "@/store/MenuApi.js"
import OrderApi from "@/store/OrderApi.js"
import SelectMenuPopup from "@/components/select-menu-popup/SelectMenuPopup.vue"
import { CInput,CSelect,CNumberInput,
  CNumberInputField,
  CNumberInputStepper,
  CNumberIncrementStepper,
  CNumberDecrementStepper, CStack,
  CButton, CImage, CSimpleGrid, CBox,
  CBadge, CFlex, CText, CHeading, CIcon,  CGrid, CGridItem,
  CTextarea, CIconButton ,CFormControl, span,
  CDivider, CPseudoBox
  } from "@chakra-ui/vue";

export default {
    name: 'CheckBill',
    props: {
        msg: String
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
        SelectMenuPopup, span, CDivider, CPseudoBox

    },
    data(){
        return{
            table_number:0,
            popupActivo2:false,
            orders:[],
            form:{
                table_number:0,
            },
            total_price:0,
            can_check_bill:true,
            payload_order_status:{
                order_id: 0,
                order_status:0
            },
            popupActivo2:false,
        }
    },
    async created(){
        console.log("Check Bill Page Created");
        this.form.table_number = JSON.parse(localStorage.getItem("table_number"));
        this.form.table_number = parseInt(this.form.table_number)
        console.log("form = ",this.form)
        await OrderApi.dispatch("fetchUnpaidOrder",this.form)
        this.orders = OrderApi.getters.getUnpaidOrders
        console.log("orders = ",this.orders.data)

        for(let i = 0 ; i < this.orders.data.length ; i++)
        {

            for(let j = 0 ; j < this.orders.data[i].menus.length ; j++)
            {
                // console.log("food_status = ",this.orders.data[i].menus[j].pivot.food_status)
                if(this.orders.data[i].menus[j].pivot.food_status != "cancel")
                    // console.log("this.total_price" , this.total_price)
                    // console.log("this.orders.data[i].total_price" , this.orders.data[i].menus[j].pivot.price)

                    this.total_price += this.orders.data[i].menus[j].pivot.price
            }
            

            if(this.orders.data[i].order_status != 'all_served_unpaid')
            {
                this.can_check_bill = false
                // console.log("order_status = " , this.orders.data[i].order_status)
            }
        }

    },
    methods:{
        async checkbill(){
            if(this.can_check_bill)
            {
                this.$swal({
                    icon: 'success',
                    title: 'กรุณาชำระเงินที่เคาเตอร์',
                    confirmButtonText: 'es, I am sure',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
                console.log("can check bill")
                for(let i = 0 ; i < this.orders.data.length ; i++)
                {
                    this.payload_order_status.order_id = this.orders.data[i].id

                    this.payload_order_status.order_status = 3
                    await OrderApi.dispatch("updateOrderStatus",this.payload_order_status)
                }
                popupActivo2=false
                
                
            }
            else
            {
                this.$swal({
                    icon: 'error',
                    title: 'ไม่สามารถเช็คบิลได้',
                    text: 'รายการอาหารที่สั่งยังได้ไม่ครบ',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            }
        }
    }
}
</script>

<style>
.border {
    margin-left: 2%;
    width: 370px;
}

.bill {
    margin-left: 5%;
    /* margin-top: 19%; */
}

.head {
    margin-right: 44%;
    margin-top: 7%;
}
</style>