<template>
    <div>
        <header-bar></header-bar>
        
        <v-container class="container">
            <button>
            <i class="material-icons" @click="$router.push('/circle/'+circleName)">
            keyboard_backspace
            </i>
            </button>
            <h1 class="text-md-center">{{circleName}} Active</h1>
            
            <v-layout row wrap>
            <v-flex xs12 sm3 v-for="active in activelist" :key="active.activeId" class ='ma-3'>
            <v-card @click="$router.push('/circle/'+circleName+'/active/show_active/'+active.activeId)">
                <v-img :src="active.image" aspect-ratio="1" contain></v-img>
                <v-card-title>
                    <div>
                        <h3>{{active.title}}</h3>
                        <span>{{active.date}}</span>
                    </div>
                </v-card-title>
            </v-card>
            </v-flex>
            </v-layout>
            <v-btn color="blue" @click="$router.push('/circle/'+circleName+'/manage_active/create')">새글작성</v-btn>
        </v-container>
        
    </div>
</template>
<script>
    import headerBar from './header.vue'

    export default {
        data(){
          return{
                circleName: this.$route.params.circleName,
                activelist: [],
                images: [],
          }  
        },
        created: function(){
          console.log(this.circleName)

          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/active").then((data)=>{
              for(let i=0;i<data.data.length;i++){
                let start = data.data[i].start.split('T')[0]
                let end = data.data[i].start.split('T')[0]
                let active={"title":data.data[i].title,"contents":data.data[i].contents,
                "date":start+" ~ "+end,"activeId":data.data[i].activeId,"image":data.data[i].image}
                this.images.push(data.data[i].image)
                this.activelist.push(active)
                console.log(active)
              }
              
          })
        },
        components:{
            headerBar
        }
    }
</script>

<style lang="scss" scoped>
.container{
    margin-top: 100px
}

</style>