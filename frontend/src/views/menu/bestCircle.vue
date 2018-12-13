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
            <div style="display:flex; align-items:center; justify-content:center;">
            <v-progress-circular v-if="progress==true"
                :size="350"
                :width="30"
                color="blue"
                indeterminate
            />
            </div>
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
            <bars
                :data="actives[active['index']]"
                :gradient="['#ffbe88', '#ff93df']"
                :barWidth="5"
                :growDuration="1">
            </bars>
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
                actives: [],
                images: [],
                auth: false,
                progress: true,
          }  
        },
        created: function(){
          this.$http.get("http://adong.cf:8000/circle/active/get").then((data)=>{
              let actives = data.data;
              let templist=[];
            console.log(data.data)
              for(let i =0; i<actives.length; i++){
                  if(!(actives[i].circleName in templist)){
                      this.actives.push([])
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
                  templist[sortlist[i]]["index"]=i;
                  this.activelist.push(templist[sortlist[i]]);
                  this.actives.push([]);
                  this.actives[i].push(0)
                  for(let j=0; j<actives.length; j++){
                      if(templist[sortlist[i]]["name"]==actives[j].circleName){
                        this.actives[i].push(actives[j].members.length)
                      }
                  }
                  console.log(this.actives)
              }
              
              
          }).then((data)=>{
              this.progress = false;
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
.v-progress-circular{
    margin: 1rem;
    margin-top: 100px;
    align-items: center;
}
</style>
