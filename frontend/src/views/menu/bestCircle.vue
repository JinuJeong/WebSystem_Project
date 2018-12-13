<template>
    <div>
        <header-bar></header-bar>
        
        <v-container class="container">
            <button>
            <i class="material-icons" @click="$router.push('/')">
            keyboard_backspace
            </i>
            </button>
            <h1 class="text-md-center">이달의 동아리</h1>
            
            <v-layout row wrap>
            <v-flex xs12 sm12 v-for="active in activelist" v-bind:key="active['num_members']" class ='ma-3'>
            <v-card>
                <v-card-title>
                    <div>
                        <h3>동아리 : {{active['name']}} </h3>
                        <span>총 활동 참여 맴버 : {{active['num_members']}}</span><br/>
                        <span>총 활동 수 : {{active['num_actives']}}</span>
                    </div>
                </v-card-title>
            </v-card>
            </v-flex>
            </v-layout>
            
        </v-container>
        
    </div>
</template>
<script>
    import headerBar from '../../components/header'

    export default {
        data(){
          return{
                circleName: this.$route.params.circleName,
                activelist: [],
                images: [],
                auth: false,
          }  
        },
        created: function(){
          this.$http.get("http://localhost:8000/circle/active/get").then((data)=>{
              let actives = data.data;
              let templist=[]
              for(let i =0; i<actives.length; i++){
                  if(!(actives[i].circleName in templist)){
                      let obj = {"num_members": actives[i].members.length,"num_actives":1}
                      templist[actives[i].circleName] = obj
                  }else{
                      templist[actives[i].circleName]["num_members"] += actives[i].members.length;
                      templist[actives[i].circleName]["num_actives"] += 1
                  }
              }
              
              
              let sortlist=Object.keys(templist).sort((a,b)=>{
                  return templist[a]["num_members"] < templist[b]["num_members"] ? 1 : 
                  templist[a]["num_members"] > templist[b]["num_members"]? -1 : 0;
              })
              
              for(let i =0; i<sortlist.length&& i<5;i++){
                  templist[sortlist[i]]["name"]=sortlist[i];
                  this.activelist.push(templist[sortlist[i]]);
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