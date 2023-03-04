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
                <c-grid w="381px" template-columns="repeat(4, 1fr)" gap="1">
                    <c-box ml="10%" w="100%" h="10" >
                        <c-text> {{  menu.name_TH }} </c-text>
                            
                    </c-box>

                    <c-box ml="78%" w="100%" h="10"  >
                        <c-text > x {{ menu.pivot.QTY }} </c-text>
                    </c-box>

                    <c-box ml="45%" w="100%" h="10"  >
                        <c-text> {{ menu.pivot.price }}.00</c-text>
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
        <c-text align="center" mt="15%" fontWeight="bold" color="#C72319">
            Total Price : {{ total_price }} THB
        </c-text>
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
            this.total_price += this.orders.data[i].total_price
        }

    },
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