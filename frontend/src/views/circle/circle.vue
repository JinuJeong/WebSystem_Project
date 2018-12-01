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
          style="padding : 5%"
        >
        <v-layout row wrap>
          <v-flex 
              xs4
              d-flex>
            <v-card>
                <v-card-title class="subheading font-weight-bold">일정</v-card-title>
                <v-divider></v-divider>
                
            </v-card>
          </v-flex>

          <v-flex 
              xs4
              d-flex>
            <v-card>
                <v-card-title class="subheading font-weight-bold">공지사항</v-card-title>
                <v-divider></v-divider>
                <v-list v-for="notice in noticelists" :key="notice.full_date" dense>
                  <v-list-tile
                  @click="$router.push('/circle/'+circleName+'/board/notice/show_notice/'+notice.title+'/'+notice.full_date)">
                    <v-list-tile-title v-text="notice.title"></v-list-tile-title>
                    <v-list-tile-action>
                    <v-list-tile-action-text>{{notice.author}}</v-list-tile-action-text>
                    <v-list-tile-action-text>{{notice.date}}</v-list-tile-action-text>
                    </v-list-tile-action>
                            
                </v-list-tile>
                </v-list>
                  <v-btn icon @click="$router.push('/circle/'+circleName+'/board/notice/show_notices')">
                    <v-icon>add</v-icon>
                  </v-btn>
               
            </v-card>
          </v-flex>

          <v-flex 
              xs4
              d-flex>
            <v-card>
                <v-card-title class="subheading font-weight-bold">게시판</v-card-title>
                <v-divider></v-divider>
                <v-list v-for="board in boardlists" :key="board.date" dense>
                  <v-list-tile
                  @click="$router.push('/circle/'+circleName+'/board/board/show_notice/'+board.title+'/'+board.full_date)">
                    <v-list-tile-title v-text="board.title"></v-list-tile-title>
                    <v-list-tile-action>
                    <v-list-tile-action-text>{{board.author}}</v-list-tile-action-text>
                    <v-list-tile-action-text>{{board.date}}</v-list-tile-action-text>
                    </v-list-tile-action>
                            
                </v-list-tile>
                </v-list>
                <v-btn icon @click="$router.push('/circle/'+circleName+'/board/board/show_notices')">
                    <v-icon>add</v-icon>
                  </v-btn>
            </v-card>
          </v-flex>

        </v-layout>
        </v-container>
    </div>
</template>

<script>
    import headerBar from '../../components/header'

    export default {
        name: 'home',
        data(){
          return{
                circleName: this.$route.params.circleName,
                schedulelists: [],
                boardlists: [],
                noticelists: [],
          }  
        },
        created: function(){
          console.log(this.circleName)
          
          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/board/notice").then((data)=>{
              for(let i=0;i<data.data.length;i++){
                let date = data.data[i].date.split('T')[0]
                let notice={"title":data.data[i].title,"contents":data.data[i].contents,
                "date":date,"full_date":data.data[i].date,"author":data.data[i].author}
                this.noticelists.push(notice)
              }
          })
          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/board/schedule").then((data)=>{
              for(let i=0;i<data.data.length;i++){
                let schedule={"title":data.data[i].title,"contents":data.data[i].contents,
                "date":data.data[i].date}
                this.schedulelists.push(schedule)
              }
          })
          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/board/board").then((data)=>{
              for(let i=0;i<data.data.length;i++){
                let date = data.data[i].date.split('T')[0]
                let board={"title":data.data[i].title,"contents":data.data[i].contents,
                "date":date,"full_date":data.data[i].date,"author":data.data[i].author}
                this.boardlists.push(board)
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