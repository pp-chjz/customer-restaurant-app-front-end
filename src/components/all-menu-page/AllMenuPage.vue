<template>
  <div class="about">
    <c-stack  should-wrap-children is-inline ml="3%" mt="16%">
        <c-grid template-columns="repeat(2, fr)">
            <c-text font-weight="bold"  fontSize="xl" > Welcome </c-text>
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
            <c-text class="text_table" ml="13%" py="23px" fontSize="sm"> โต๊ะที่ {{ this.table_number }}</c-text>
        </c-box>
    </c-stack>
    <c-form-control>
        <c-stack should-wrap-children is-inline ml="3%" mt="2%">
            <c-input 
                v-model="payload_search.menu_name"
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
        <c-select v-model="menu_catagory" placeholder="Select catagory" w="45%">
            <option value="0">All</option>
            <option value="1">Food</option>
            <option value="2" bg="yellow">Drink</option>
            <option value="3" bg="yellow">Dessert</option>
        </c-select>
    </c-stack>
    <c-button @click="search()" mt="2rem" width="full" variant-color="yellow" variant="solid" size="lg">
        ค้นหา
    </c-button> 
    <c-button @click="clear()" mt="2rem" width="full" variant-color="yellow" variant="solid" size="lg">
        clear
    </c-button> 

    <c-button class="getOrder" @click="order()" mt="2rem" width="full" variant-color="yellow" variant="solid" size="lg">
        สั่งอาหาร
    </c-button> 

    <!-- Show All Menus -->
    <div v-for="item in menus.data" :key="item.id">
        <c-flex mt="4%"  borderBottom="2px" borderRadius="xl" borderColor="#2D3748" borderBottomWidth="2px" align="center">
            <c-flex  w="200px" size="150px" align="center" justify="center">
                <c-image src="gibberish.png" size="120px" rounded="lg" fallback-src="https://via.placeholder.com/150" />
            </c-flex>
            <c-flex  w="200px" size="150px" align="center" justify="center">
                <c-grid
                    size="150px"    
                    template-rows="repeat(3, 1fr)"
                    gap="1"
                >
                    <c-text text-align="center">
                    {{ item.name_TH }}
                    </c-text>
                    <c-text fontWeight="bold" text-align="center">
                    {{ item.name_ENG }}
                    </c-text>

                    <c-badge v-if="item.menu_status === 'in stock'" mx="10" mt="5%"  variant-color="green">In Stock</c-badge>
                    <c-badge v-if="item.menu_status === 'out of stock'"  mx="2" variant-color="red">Our Of Stock</c-badge>
                </c-grid>
            </c-flex>
            
            <c-flex  size="150px" align="center" justify="center">
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
                v-bind:status="item.menu_status"
                @saveInfo="addMenu"></select-menu-popup>
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
            },
            disabled: true,
            table_number:0,
            menu_catagory:"",
            payload_search:{
                menu_name:"",
                menu_catagory:0,
            }
        }
    },
    async created(){
        console.log("All Menu Page Created");
        await this.fetchMenu()
        this.form.table_number = JSON.parse(localStorage.getItem("table_number"));
        this.table_number = JSON.parse(localStorage.getItem("table_number"));

        console.log("this.form.table_number = ", this.form.table_number)
        parseInt(this.form.table_number)

    },
    methods:{
        async search(){
            console.log("search")
                if(this.payload_search.menu_name == "" && this.menu_catagory == ""  )
                {
                    this.$swal({
                        icon: 'error',
                        title: 'ไม่สามารถค้นหาได้',
                        text: 'กรุณาเลือกรายการที่จะค้นหา',
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                }
                else
                {
                    this.payload_search.menu_name = "%" + this.payload_search.menu_name + "%" 
                    if(this.menu_catagory != "")
                        this.payload_search.menu_catagory = parseInt(this.menu_catagory);
                    console.log("payloadSearch df = " ,this.payload_search)
                    await MenuApi.dispatch("fetchSearchMenu", this.payload_search)
                    this.menus = MenuApi.getters.getSearchMenus
                    this.menus = this.menus.data
                    this.menu=[{menu_id:'not show'}],

                    console.log("this.menuuuuuuuuuuuuuu = " ,this.menu)

                    for(let i = 0; i<this.menus.data.length ; i++){
                        this.menu.push(this.menus.data[i])
                    }
                    this.menu[0].menu_id = 'true';
                    this.payload_search.menu_catagory = 0
                    this.payload_search.menu_name = ""
                    this.menu_catagory = "",

                    this.$forceUpdate()
                }
        },
        async clear(){
            this.menu=[{menu_id:'not show'}],
            this.payload_search.menu_catagory = 0
                    this.payload_search.menu_name = ""
                    this.menu_catagory = "",
            await this.fetchMenu()


        },
        getNow() {
            const today = new Date();
            const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
            const dateTime = date +' '+ time;
            this.form.order_time = dateTime;
        },
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
            console.log("menus = ", this.form.menus)
            for(let i = 0; i< this.form.menus.length ; i++){
                this.form.total_price += this.form.menus[i].price
                // console.log("this.form.menus.price = ",this.form.menus)

                // console.log("this.form.total_price = ",this.form.total_price)
                // console.log("loop")
            }
            
            if (this.form.menus == "") {
                this.$swal({
                    icon: 'error',
                    title: 'ผิดพลาด',
                    text: 'ยังไม่มีรายการอาหาร',
                    footer: '<a href="">Why do I have this issue?</a>'
                })
            }
            else if (this.form.menus != "") {
                    this.$swal("สั่งรายการอาหารสำเร็จ", ` โต๊ะที่ ${this.form.table_number}` , "success");
                    this.getNow()
                    await OrderApi.dispatch("createOrder" , this.form)
                    this.form.cancel_status = 1
                    this.form.order_status = 1
                    this.form.total_price = 0
                    this.form.order_time = "1985-08-05 13:25:30"
                    this.form.menus = []

                //     this.form = {
                //     "cancel_status":1,
                //     "order_status":1,
                //     "total_price": 0,
                //     "order_time":"1985-08-05 13:25:30",
                //     "menus":[]
                // }
            }

            
            // await OrderApi.dispatch("addOrderToTable" , this.form)


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
.box {
    border: dashed 3px #EA7C69;
}

.circle {
    border-radius: 100%;
}

.menu_name {
    font-size: medium;
    font-weight: bold;
    margin-top: 4%;
}

.optional {
    margin-bottom: 2%;
    font-size: small;
}

.input {
    margin-bottom: 4%;
}

.getOrder {
    position: fixed;
    top: 90%;
    right: 10%;
    height: 2em;
    overflow: hidden;
    width: 80%;
    box-sizing: border-box;
    box-shadow: 0px 4px 7px #777;
    transition: background-color 0.4s ease-out;
    z-index: 99;
}
</style>
