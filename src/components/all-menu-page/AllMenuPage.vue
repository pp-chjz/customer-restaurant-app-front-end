<template>
  <div class="about">
    <h1>This is an all menu page</h1>
    <vs-button @click="popupActivo=true" color="primary" type="border">Open Default popup</vs-button>
    <vs-popup class="holamundo"  title="Lorem ipsum dolor sit amet" :active.sync="popupActivo">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

      </p>
    </vs-popup>
    <!-- <div v-for="item in menus">
        {{ item }}
    </div> -->  
    <div v-for="item in menus.data">
        <!-- ใส่ border ไว้จะได้ดูง่าย -->
        <c-flex border="2px" borderRadius="md" borderColor="black.200" align="center">

            <c-flex bg="red.50" size="150px" align="center" justify="center">
                <c-image src="gibberish.png" size="120px" rounded="lg" fallback-src="https://via.placeholder.com/150" />
            </c-flex>


            <c-flex bg="blue.50" size="150px" align="center" justify="center">
                <c-grid
                size="150px"    
                template-rows="repeat(3, 1fr)"
                gap="1"
                >
                    <c-text text-align="center" bg="orange.50">
                    {{ item.name_TH }}
                    </c-text>
                    <c-text text-align="center" bg="orange.50">
                    {{ item.name_ENG }}
                    </c-text>
                    <c-badge v-if="item.menu_status === 'in stock'" mx="2" variant-color="green">In Stock</c-badge>
                    <c-badge v-if="item.menu_status === 'out of stock'"  mx="2" variant-color="red">Our Of Stock</c-badge>
                </c-grid>
            </c-flex>

            <c-flex bg="yellow.50" size="150px" align="center" justify="center">
                <c-grid
                size="150px"
                gap="1"
                >
                    <c-text bg="tomato" color="white">
                        ราคา {{ item.price }} THB
                    </c-text>
                    <!-- <a @click='edit(index.id)' v-bind="index" align="center"> 
                        <c-icon name="add"/>
                    </a> -->
                    <vs-button @click="popupActivo2=true" color="primary" type="filled">เลือก</vs-button>


                    <!-- ส่วนของ pop up ที่เด้งขึ้นมาเมื่อกดปุ่ม -->
                    <vs-popup  title="เมนูที่ต้องการเลือก" :active.sync="popupActivo2">
                        <c-image src="gibberish.png" size="300px" rounded="lg" fallback-src="https://via.placeholder.com/150" />
                        <p class="name">{{ item.name_TH }} ({{ item.name_ENG }})</p>
                        <br>
                        <p class="name">หมายเหตุถึงร้านอาหาร (ไม่จำเป็นต้องระบุ)</p>

                        <vs-input class="inputx" size="large" placeholder="ระบุรายละเอียดคำขอ" v-model="value1"/>

                        <!-- เพิ่มลดจำนวนจาน -->
                        <c-flex align="center">
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
                        </c-flex>
                        <!-- เพิ่มลดจำนวนจาน -->


                        <c-button @click="summit" mt="2rem" width="full" variant-color="yellow" variant="solid" size="lg">
                            เพิ่มเมนูนี้
                        </c-button> 
                    </vs-popup>
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
import { CInput,CSelect,CNumberInput,
  CNumberInputField,
  CNumberInputStepper,
  CNumberIncrementStepper,
  CNumberDecrementStepper,
  CButton, CImage, CSimpleGrid, CBox,
  CBadge, CFlex, CText, CHeading, CIcon,  CGrid, CGridItem ,
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
        CNumberDecrementStepper,
        CButton, CText, CHeading, CIcon,
        CImage, CSimpleGrid ,CBox ,CBadge ,CFlex ,
        CGrid, CGridItem 

    },
    data(){
        return{
            menus:[],
            menu:[{menu_id:'not show'}],
            popupActivo:false,
            value1:'',
            value2:'',
            popupActivo2:false,
            popupActivo3:false,
            count:0,
        }
    },
    async created(){
        console.log("All Menu Page Created");
        await this.fetchMenu()
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
        edit(id){
            console.log("index.id = ", id)
            console.log("menu = ", this.menu)
        },
        summit(){
            console.log("summit")
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
.name{
    font-size: 25px;
}
</style>
