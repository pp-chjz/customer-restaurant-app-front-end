<template>
    <div>
        <c-stack is-inline mt="20%">
        <c-heading color="#11225F" ml="25%"> {{ "Cancel Menu" }}</c-heading>
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
                <div v-if="menu.pivot.food_status === 'prepare' || menu.pivot.food_status === 'cancel'">

                    <c-grid w="381px" template-columns="repeat(4, 1fr)" gap="1">
                        <c-box ml="10%" w="100%" h="10" >
                            <c-text> {{  menu.name_TH }} </c-text>
                                
                        </c-box>

                        <c-box ml="78%" w="100%" h="10"  >
                            <c-text > x {{ menu.pivot.QTY }} </c-text>
                        </c-box>

                        <c-box ml="59%" w="100%" h="10"  >
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
                            <c-badge v-if="menu.pivot.food_status === 'cancel' " rounded="full" px="2" variant-color="red" ml="5">
                                cancel
                            </c-badge>
                        </c-box>                        

                        <div v-if="menu.pivot.food_status === 'cancel'" >
                            <c-button :isDisabled="disabled" @click="cancel(item.id, menu.id, menu.name_TH)" ml="8%" frontWeight="bold" width="50px" variant-color="red"  border="1px" border-color="red.500" size="xs">
                            ยกเลิก
                            </c-button> 
                        </div>

                        <div v-if="menu.pivot.food_status === 'prepare'" >
                            <c-button @click="openPopUp()" ml="8%" frontWeight="bold" width="50px" variant-color="red"  border="1px" border-color="red.500" size="xs">
                            ยกเลิก
                            </c-button> 
                        </div>

                        <vs-popup  title="ยืนยันรายการอาหารที่ต้องการยกเลิก" :active.sync="popupActivo3">
                            <p class="name">{{ menu.name_TH }} ({{ menu.name_ENG }})</p>
                            <br>
                            <c-flex align="center" mt="4%">
                                <!-- <c-flex bg="green.50" align="flex-end">
                                    <c-button @click="deCountCancel" variant-color="red" :isDisabled="disabled">-</c-button>
                                </c-flex> -->
                                <c-flex bg="blue.50" size="40px" align="center" justify="center">
                                    <c-text text-align="center">
                                    {{ menu.pivot.QTY }}
                                    </c-text>
                                </c-flex>
                                <!-- <c-box>
                                    <c-button  @click="addCountCancel" variant-color="green">+</c-button>
                                </c-box> -->
                            </c-flex>


                            <!-- เพิ่มลดจำนวนจาน -->
                            <c-flex align="center">
                                <c-button @click="closePopUp()" mt="2rem" width="full" variant-color="red" variant="solid" size="lg">
                                ยกเลิก
                            </c-button> 
                            <c-button @click="cancel(item.id, menu.id, menu.name_TH)" mt="2rem" width="full" variant-color="green" variant="solid" size="lg">
                                ยืนยัน
                            </c-button> 
                            </c-flex>
                            <!-- เพิ่มลดจำนวนจาน -->
                        </vs-popup>
                    </c-grid>
                    <c-divider class="border" borderWidth="0.1rem" borderRadius="42rem" border-color="black" mt="6%"/> 
                </div>
            </div>
        </div>

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
  CDivider, CPseudoBox, 
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
            payload:{
                menu_id:0,
                food_status:4,
                order_id:0
            },
            disabled: true,
            popupActivo3: false,
            count: 1
        }
    },
    async created(){
        console.log("Check Bill Page Created");
        this.form.table_number = JSON.parse(localStorage.getItem("table_number"));
        this.form.table_number = parseInt(this.form.table_number)
        // console.log("form = ",this.form)
        await OrderApi.dispatch("fetchUnpaidCanCancelOrder",this.form)
        this.orders = OrderApi.getters.getUnpaidCanCancelOrders
        console.log("orders = ",this.orders.data)

        for(let i = 0 ; i < this.orders.data.length ; i++)
        {
            this.total_price += this.orders.data[i].total_price
            // console.log("total_price = " , this.total_price)

            if(this.orders.data[i].order_status != 'all_served_unpaid')
            {
                this.can_check_bill = false
                // console.log("order_status = " , this.orders.data[i].order_status)
            }
        }

    },
    methods:{
        openPopUp(){
            this.popupActivo3 = true
        },
        closePopUp(){
            this.popupActivo3 = false
        },
        async cancel(order_id, menu_id, menu_name_TH){

            this.payload.menu_id = menu_id
            this.payload.order_id = order_id
            
            await OrderApi.dispatch("updateFoodStatus",this.payload)
            await OrderApi.dispatch("fetchUnpaidCanCancelOrder",this.form)
            this.orders = OrderApi.getters.getUnpaidCanCancelOrders
            console.log("payload = ",this.payload)

            this.$swal("", `ยกเลิก${menu_name_TH}สำเร็จ`, "success");
            this.popupActivo3 = false

        },
        confirm(){
            this.popupActivo3 = true
        },
        cancelMenu(){
            this.popupActivo3 = false
        },
        saveInfo() {
            this.$emit('saveInfo',returnData)   
            this.popupActivo3 = false
        },
        // addCountCancel(){
        //     this.count++
        //     if (this.count == menu.pivot.QTY) {
        //         this.disabled = false
        //     }
        // },
        // deCountCancel(){
        //     this.count++
        //     if (this.count == 0) {
        //         this.disabled = true
        //     }
        // },
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
                
                
            }
            else
            {
                this.$swal({
                    icon: 'error',
                    title: 'ไม่สามารถเช็คบิลได้',
                    text: 'รายการอาหารที่่สั่งยังได้ไม่ครบ',
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