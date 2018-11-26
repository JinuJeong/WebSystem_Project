<template>
    <div id="home">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>
        <div id='title'>
           <span class="md-display-3">{{ $route.params.name }}</span>
        </div>

        <v-container
          fluid
          grid-list-md
        >
        <v-layout row wrap>
          <v-flex 
              xs4
              d-flex>
            <v-card>
                <v-card-title class="subheading font-weight-bold">일정</v-card-title>
                <v-divider></v-divider>
                <v-list>
                  <v-list-tile>
                    <v-list-tile-content>MT</v-list-tile-content>
                    <v-list-tile-content class="align-end">11일</v-list-tile-content>
                  </v-list-tile>
                </v-list>
            </v-card>
          </v-flex>

          <v-flex 
              xs4
              d-flex>
            <v-card>
                <v-card-title class="subheading font-weight-bold">공지사항</v-card-title>
                <v-divider></v-divider>
                <v-list v-for="notice in noticelists" :key="notice.full_date">
                  <v-list-tile
                  @click="$router.push('/circle/'+circleName+'/show_notice/'+notice.title+'/'+notice.full_date)">
                  <v-list-tile-content>
                    <v-list-tile-title v-text="notice.title"></v-list-tile-title>
                    <v-list-tile-sub-title v-text="notice.date"></v-list-tile-sub-title>
                  </v-list-tile-content>
                
                </v-list-tile>
                </v-list>
                  <v-btn icon @click="$router.push('/circle/'+circleName+'/manage_notice/create')">
                    <v-icon>add</v-icon>
                  </v-btn>
               
            </v-card>
          </v-flex>
        </v-layout>
        </v-container>
      
    


    </div>
</template>

<script>
    import headerBar from './header.vue'

    export default {
        name: 'home',
        data(){
          return{
                circleName: this.$route.params.circleName,
                noticelists: [],
          }  
        },
        created: function(){
          console.log(this.circleName)
          
          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/notice").then((data)=>{
              for(let i=0;i<data.data.length;i++){
                let date = data.data[i].date.split('T')[0]
                let notice={"title":data.data[i].title,"contents":data.data[i].contents,
                "date":date,"full_date":data.data[i].date}
                this.noticelists.push(notice)
              }
              
          })
        }
        ,
        components: {
            headerBar
        },
    }
</script>

<style>
  #title{
    margin-top:20px;
    text-align: center;
  }
</style>