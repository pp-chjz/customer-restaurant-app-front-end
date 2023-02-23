<template>
  <div class="about">
    <c-stack should-wrap-children is-inline ml="3%" mt="5%">
        <c-grid template-columns="repeat(2, fr)">
            <c-text  fontSize="xl" > Welcome </c-text>
            <c-heading color="#B30F0F"> {{ "Saengchai Phochana" }}</c-heading>
        </c-grid>
        <c-box  
            class="circle" 
            height="70px"
            width="70px"
            roundedTopLeft="100px"
            roundedTopRight="100px"
            borderBottomRightRadius="100px"
            borderBottomLeftRadius="100px"
            bg="#FFC529"
        > 
            <c-text class="text_table" ml="13%" py="23px" fontSize="sm"> โต๊ะที่ 2</c-text>
        </c-box>
    </c-stack>
    
    <!-- Search Foods (Version 1 use c-textarea) -->
    <!-- <c-box
        ml="3%"
        mt="7%"
        width="360px"
        height="45px"
        borderWidth="0.1rem"
        borderRadius="42rem"
        bg="#2F383A"
        color="#A7A7A7"
    > 
    <c-stack should-wrap-children is-inline ml="3%" mt="2%">
        <c-flex w="30px" >
            <img  src="@/assets/icon_search.png"/>
        </c-flex>
        <c-flex w="100px" >
            <c-textarea ml="3%" py="4px" fontSize="sm">Search Foods</c-textarea>
        </c-flex>
        
    </c-stack>
    </c-box> -->

    <!-- Search Foods (Version 2 use c-input) -->
    <c-form-control>
        <c-stack should-wrap-children is-inline ml="3%" mt="2%">
            <c-input 
                mr="33%"
                mt="7%"
                width="360px"
                height="45px"
                borderWidth="0.1rem"
                borderRadius="42rem"
                bg="#2F383A"
                color="#A7A7A7" 
                placeholder="Search Foods"  />
        </c-stack>
    </c-form-control>

    <!-- Categories -->
    <c-text fontSize="2xl" mt="8%" ml="3%"> Categories </c-text>
    <c-stack should-wrap-children is-inline ml="3%" mt="3%">
        <c-button 
            width="100px"
            height="33px"
            borderWidth="0.1rem"
            borderRadius="42rem"
            bg="#F58BF8"
        > Popular </c-button>

        <c-button 
            width="100px"
            height="33px"
            borderWidth="0.1rem"
            borderRadius="42rem"
            color="#A7A7A7"
            bg="#2F383A"
        > All Foods </c-button>

        <c-button 
            width="100px"
            height="33px"
            borderWidth="0.1rem"
            borderRadius="42rem"
            color="#A7A7A7"
            bg="#2F383A"
        > Seafood </c-button>
    </c-stack>

    <c-button @click="order()" mt="2rem" width="full" variant-color="yellow" variant="solid" size="lg">
        สั่งอาหาร
    </c-button> 

    <!-- Show All Menus -->
    <div v-for="item in menus.data" :key="item.id">
        <c-flex mt="4%" ml="3%" borderBottom="2px" borderRadius="md" borderColor="black.200" align="center">
            <c-flex bg="blue.50" w="200px" size="150px" align="center" justify="center">
                <c-image src="gibberish.png" size="120px" rounded="lg" fallback-src="https://via.placeholder.com/150" />
            </c-flex>
            <c-flex bg="pink.100" w="200px" size="150px" align="center" justify="center">
                <c-grid
                    size="150px"    
                    template-rows="repeat(3, 1fr)"
                    gap="1"
                >
                    <c-text text-align="left">
                    {{ item.name_TH }}
                    </c-text>
                    <c-text fontWeight="bold" text-align="left">
                    {{ item.name_ENG }}
                    </c-text>

                    <c-badge v-if="item.menu_status === 'in stock'" mx="2" mt="5%"  variant-color="green">In Stock</c-badge>
                    <c-badge v-if="item.menu_status === 'out of stock'"  mx="2" variant-color="red">Our Of Stock</c-badge>

                </c-grid>
            </c-flex>
            
            <c-flex bg="indigo.100" size="150px" align="center" justify="center">
                <c-grid
                size="150px"
                gap="1"
                >
                    <c-text fontWeight="bold" color="black">
                        {{ item.price }} THB
                    </c-text>
                    <select-menu-popup
                    v-bind:name_TH="item.name_TH"
                    v-bind:name_ENG="item.name_ENG"
                    v-bind:id="item.id"
                    v-bind:price="item.price"
                    v-bind:form="form.menus"
                    @saveInfo="addMenu"></select-menu-popup>

                    <!-- <a @click='edit(index.id)' v-bind="index" align="center"> 
                        <c-icon name="add"/>
                    </a> -->
                    <!-- <vs-button @click="popupActivo2=true" color="primary" type="filled">เลือก</vs-button> -->


                    <!-- ส่วนของ pop up ที่เด้งขึ้นมาเมื่อกดปุ่ม -->
                    <!-- <vs-popup  title="เมนูที่ต้องการเลือก" :active.sync="popupActivo2">
                        <c-image src="gibberish.png" size="300px" rounded="lg" fallback-src="https://via.placeholder.com/150" />
                        <p class="name">{{ item.name_TH }} ({{ item.name_ENG }})</p>
                        <br>
                        <p class="name">หมายเหตุถึงร้านอาหาร (ไม่จำเป็นต้องระบุ)</p>

                        <vs-input class="inputx" size="large" placeholder="ระบุรายละเอียดคำขอ" v-model="value1"/> -->

                        <!-- เพิ่มลดจำนวนจาน -->
                        <!-- <c-flex align="center">
                            <c-flex bg="green.50" align="flex-end">
                                <c-button @click="deCount" variant-color="red">-</c-button>
                            </c-flex>
                            <c-flex bg="blue.50" size="40px" align="center" justify="center">
                                <c-text text-align="center">
                                {{ count }}
                                </c-text>
                            </c-flex>
                            <c-box>
                                <c-button  @click="addCount" variant-color="green">+</c-button>
                            </c-box>
                        </c-flex> -->
                        <!-- เพิ่มลดจำนวนจาน -->


                        <!-- <c-button @click="summit(item.name_TH)" mt="2rem" width="full" variant-color="yellow" variant="solid" size="lg">
                            เพิ่มเมนูนี้
                        </c-button> 
                    </vs-popup> -->
                    <!-- ส่วนของ pop up ที่เด้งขึ้นมาเมื่อกดปุ่ม -->



                </c-grid>
            </c-flex>

        </c-flex>
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
    name: 'AllMenu',
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
            menus:[],
            menu:[{menu_id:'not show'}],
            menu_test:[],
            popupActivo:false,
            value1:'',
            value2:'',
            popupActivo2:false,
            popupActivo3:false,
            count:0,
            form:{
                "cancel_status":1,
                "order_status":1,
                "total_price": 0,
                "order_time":"1985-08-05 13:25:30",
                "table_number":0,
                "menus":[]
            },
            menu_payload:{
                "menu_id":0,
                "comment":"",
                "status":0,
                "QTY":0,
                "food_status":0,
                "price":0,
                "order_time":"1985-08-05 13:25:30",
                "complete_at":"1985-08-05 13:25:30"
            }
        }
    },
    async created(){
        console.log("All Menu Page Created");
        await this.fetchMenu()
        this.form.table_number = JSON.parse(localStorage.getItem("table_number"));

    },
    methods:{
        async fetchMenu(){
            // console.log("fetchMenu")
            await MenuApi.dispatch("fetchMenu")
            this.menus = MenuApi.getters.getMenus
            console.log(this.menus)
            for(let i = 0; i<this.menus.data.length ; i++){
                this.menu.push(this.menus.data[i])
            }
            this.menu[0].menu_id = 'true';
        },
        async order(){
            console.log("payload = ", this.form)
            await OrderApi.dispatch("createOrder" , this.form)


        },
        async addMenu({ menu_id,comment,QTY,status,food_status,order_time,complete_at,total_price }){
            // this.table_number = JSON.parse(localStorage.getItem("table_number"));
            // this.menu_payload.menu_id = menu_id
            // this.menu_payload.comment = comment
            // this.menu_payload.QTY = QTY
            // this.menu_payload.status = status
            // this.menu_payload.food_status = food_status
            // this.menu_payload.order_time = order_time
            // this.menu_payload.complete_at = complete_at
            // this.menu_payload.total_price = total_price
            // console.log("this.menu_payload = ", this.menu_payload)
            console.log("this.form.menus = ", this.form.menus)
            // console.log("this.table_number = ", this.table_number)

        },
        edit(id){
            console.log("index.id = ", id)
            console.log("menu = ", this.menu)
        },
        summit(id){
            console.log("id =" ,id)
        },
        addCount(){
            this.count++
        },
        deCount(){
            this.count--
        }
    }
}
</script>

<style>
.box {
    border: dashed 3px #EA7C69;
}

.circle {
    border-radius: 100%;
}

/* .text_table {
} */
</style>
