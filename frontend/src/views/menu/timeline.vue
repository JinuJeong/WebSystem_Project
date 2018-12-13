<template>
    <div>
        <header-bar></header-bar>
        
        <v-container class="container">
            <button>
            <i class="material-icons" @click="$router.push('/')">
            keyboard_backspace
            </i>
            </button>
            <h1 class="text-md-center">{{circleName}} Active</h1>
            <div style="display:flex; align-items:center; justify-content:center;">
            <v-progress-circular v-if="progress==true"
                :size="350"
                :width="30"
                color="red"
                indeterminate
            />
            </div>
            <v-layout row wrap>
            <v-flex xs12 sm3 v-for="active in activelist" :key="active.activeId" class ='ma-3'>
            <v-card @click="$router.push('/circle/'+active.circleName+'/active/show_active/'+active.activeId)">
                <v-img :src="active.image" aspect-ratio="1" contain></v-img>
                <v-card-title>
                    <div>
                        <h3>{{active.circleName}} 동아리 : {{active.title}}</h3>
                        <span>{{active.date}}</span>
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
                progress: true
          }  
        },
        created: function(){
          if(this.$session.getAll().admin==true) this.auth=true;
          else if(this.$session.getAll().president==this.circleName) this.auth =true;
          else if(this.postType=="board" && this.$session.getAll().circles.indexOf(this.circleName)>-1) this.auth = true;

          this.$http.get("http://adong.cf:8000/circle/Home/active").then((data)=>{
              for(let i=0;i<data.data.length;i++){
                let start = data.data[i].start.split('T')[0]
                let end = data.data[i].start.split('T')[0]
                
                let active;
                active=data.data[i]
                active['date'] = start+ " ~ " + end;
                this.images.push(data.data[i].image)
                this.activelist.push(active)
                console.log(active)
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
