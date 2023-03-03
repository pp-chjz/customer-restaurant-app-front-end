<template>
    <div>
        <c-stack  should-wrap-children is-inline ml="3%" mt="16%">
            <p> test </p>
        </c-stack>
        <div v-for="item in orders.data" :key="item.id" mt="10%">

            <!-- <c-box bg="tomato" w="100%" p="4" color="white" mt="10%">
                {{ item }}
            </c-box> -->
            <div v-for="menu in item.menus" :key="menu.id">
                    
                <c-flex align="center">
                    {{  menu.name_TH }}
                    x {{ menu.pivot.QTY }}
                    <c-badge v-if="menu.pivot.food_status === 'prepare' " rounded="full" px="2" variant-color="green" ml="2">
                        Prepare
                    </c-badge>
                    <c-badge v-if="menu.pivot.food_status === 'cooking' " rounded="full" px="2" variant-color="yellow" ml="2">
                        Cooking
                    </c-badge>
                    <c-badge v-if="menu.pivot.food_status === 'served' " rounded="full" px="2" variant-color="red" ml="2">
                        served
                    </c-badge>
                    {{ menu.pivot.price }} บาท


                </c-flex>

                ราคาทั้งหมด {{ total_price }} บาท
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
  CTextarea, CIconButton ,CFormControl ,
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
        SelectMenuPopup

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

</style>