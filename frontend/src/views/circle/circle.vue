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
                <v-list v-for="schedule in schedulelists" :key="schedule.full_date">
                <v-list-tile>
                  <v-list-tile-title>{{schedule.content}}</v-list-tile-title>
                  <v-list-tile-action>
                  <v-list-tile-action-text>{{schedule.start}}</v-list-tile-action-text>
                  <v-list-tile-action-text>{{schedule.start}}</v-list-tile-action-text>
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

          <v-flex 
              xs4
              d-flex>
            <v-card>
                <v-card-title class="subheading font-weight-bold">스터디</v-card-title>
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
                <v-card-title class="subheading font-weight-bold">활동</v-card-title>
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
            <v-card v-if="this.president">
                <v-card-title class="subheading font-weight-bold">회원관리</v-card-title>
                <v-divider></v-divider>
                <div v-for="member in members" :key="member.id">
                  {{member.name}} {{member.department}}
                    <v-card-actions class="btn">
                        <v-btn round color="blue" large v-on:click="change4=true">
                            <p class="circle_button">승인</p>
                        </v-btn>
                        <v-btn round color="blue" large v-on:click="change4=true">
                            <p class="circle_button">거절</p>
                        </v-btn>
                    </v-card-actions>
                </div>
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
                user: {},
                userName: null,
                president: {},
                circle: {},
                members: []

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
          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/schedule").then((data)=>{
                    
                    for(let i=0;i<data.data.length;i++){
                        let date ={"start": data.data[i].start.substr(0,10)
                        ,"end":data.data[i].end.substr(0,10)
                        ,"content":data.data[i].content
                        ,"full_date":data.data[i].start}
                        this.schedulelists.push(date)
                    }
                    console.log(this.schedulelists[0]);
                    
          })
          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/board/board").then((data)=>{
              for(let i=0;i<data.data.length;i++){
                let date = data.data[i].date.split('T')[0]
                let board={"title":data.data[i].title,"contents":data.data[i].contents,
                "date":date,"full_date":data.data[i].date,"author":data.data[i].author}
                this.boardlists.push(board)
              }
          })
          this.userName = this.$session.getAll().username
          this.$http.get('http://localhost:8000/user/find/' + this.userName).then((res) => {
              this.user = res.data
          }).then(() => {
            this.$http.get('http://localhost:8000/circle/find/' + this.circleName).then((res) => {
                this.circle = res.data
                if(this.circle.president.name === this.user.name){
                  this.president = this.user
                  this.members = this.circle.members
                }
            })
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