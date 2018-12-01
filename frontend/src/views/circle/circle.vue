<template>
    <div id="home">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>
        

        <v-container
          fluid
          grid-list-md
          style="padding : 5%"
        >
        <div id='title'>
           <span class="md-display-3">{{circleName}}</span>
        </div><br/>
        <v-layout row wrap>
          <v-flex 
              xs4
              d-flex>
            <v-card>
                <v-card-title class="subheading font-weight-bold">일정</v-card-title>
                <v-divider></v-divider>
                <v-list v-for="schedule in schedulelists" :key="schedule.scheduleId" dense>
                <v-list-tile>
                  <v-list-tile-title v-text="schedule.content"></v-list-tile-title>
                  <v-list-tile-action>
                  <v-list-tile-action-text>{{schedule.start}}</v-list-tile-action-text>
                  <v-list-tile-action-text>{{schedule.end}}</v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                </v-list>
                <v-btn icon @click="$router.push('/circle/'+circleName+'/schedule/show_schedules')">
                    <v-icon>add</v-icon>
                </v-btn>
            </v-card>
          </v-flex>

          <v-flex
              xs4
              d-flex>
            <v-card>
                <v-card-title class="subheading font-weight-bold">공지사항</v-card-title>
                <v-divider></v-divider>
                <v-list v-for="notice in noticelists" :key="notice.postId" dense>
                  <v-list-tile
                  @click="$router.push('/circle/'+circleName+'/board/notice/show_notice/'+notice.postNum)">
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
                  @click="$router.push('/circle/'+circleName+'/board/board/show_notice/'+board.postNum)">
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

          <v-flex 
              xs4
              d-flex>
            <v-card>
                <v-card-title class="subheading font-weight-bold">스터디</v-card-title>
                <v-divider></v-divider>
                <v-list v-for="group in grouplists" :key="group.groupId" dense>
                  <v-list-tile
                  @click="$router.push('/circle/'+circleName+'/group/show_group/'+group.groupId)">
                    <v-list-tile-title v-text="group.title"></v-list-tile-title>
                    <v-list-tile-action>
                    <v-list-tile-action-text>{{group.start}}</v-list-tile-action-text>
                    <v-list-tile-action-text>{{group.end}}</v-list-tile-action-text>
                    </v-list-tile-action>
                            
                </v-list-tile>
                </v-list>
                  <v-btn icon @click="$router.push('/circle/'+circleName+'/group/show_groups')">
                    <v-icon>add</v-icon>
                  </v-btn>
               
            </v-card>
          </v-flex>
            <v-flex 
              xs4
              d-flex>
            <v-card>
                <v-card-title class="subheading font-weight-bold">활동</v-card-title>
                <v-divider></v-divider>
                <v-list v-for="notice in noticelists" :key="notice.postId" dense>
                  <v-list-tile
                  @click="$router.push('/circle/'+circleName+'/board/notice/show_notice/'+notice.postNum)">
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
                grouplists: [],
          }  
        },
        created: function(){
          console.log(this.circleName)
          
          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/board/notice").then((data)=>{
              for(let i=0;i<data.data.length;i++){
                let date = data.data[i].date.split('T')[0]
                let notice={"title":data.data[i].title,"contents":data.data[i].contents,
                "date":date,"postNum":data.data[i].postNum,"author":data.data[i].author}
                this.noticelists.push(notice)
              }
          })
          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/schedule").then((data)=>{
                    
                    for(let i=0;i<data.data.length;i++){
                        let date ={"start": data.data[i].start.substr(0,10)
                        ,"end":data.data[i].end.substr(0,10)
                        ,"content":data.data[i].content
                        ,"scheduleId":data.data[i].scheduleId}
                        this.schedulelists.push(date)
                    }
                    
          })
          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/board/board").then((data)=>{
              for(let i=0;i<data.data.length;i++){
                let date = data.data[i].date.split('T')[0]
                let board={"title":data.data[i].title,"contents":data.data[i].contents,
                "date":date,"postNum":data.data[i].postNum,"author":data.data[i].author}
                console.log(board)
                this.boardlists.push(board)
              }
          })
          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/group").then((data)=>{
              for(let i=0;i<data.data.length;i++){
                let group={"title":data.data[i].title,"contents":data.data[i].contents,
                "start":data.data[i].start.substr(0,10),"end":data.data[i].end.substr(0,10),
                "groupId":data.data[i].groupId,"teacher":data.data[i].teacher.name}
                console.log(group)
                this.grouplists.push(group)
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