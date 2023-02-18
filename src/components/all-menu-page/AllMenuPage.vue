<template>
  <div class="about">
    <h1>This is an all menu page</h1>
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
                    <a @click='edit(index.id)' v-bind="index" align="center"> 
                        <c-icon name="add"/>
                    </a>
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
        }
    }
}
</script>

<style>
.box {
        border: dashed 3px #EA7C69;
    }
</style>
