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
                <v-list v-for="schedule in schedulelists" :key="schedule.scheduleId">
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
                <v-list v-for="notice in noticelists" :key="notice.postId">
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
                <v-list v-for="board in boardlists" :key="board.date">
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
                <v-list v-for="group in grouplists" :key="group.groupId">
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
            <v-card v-if="admin == 1">
                <v-card-title class="subheading font-weight-bold">회원등록</v-card-title>
                <v-divider></v-divider>
                <div v-if="member.circleAuth==false" v-for="member in members" :key="member.id">
                  <p>이메일 : {{member.user.ID}}</p>
                  <p>이름 : {{member.user.name}}</p>
                  <p>전공 : {{member.user.department}}</p>
                    <v-card-actions class="btn">
                        <v-btn round color="blue" large v-on:click="userin=member.user;accept()">
                            <p class="circle_button">승인</p>
                        </v-btn>
                        <v-btn round color="blue" large v-on:click="userin=member.user;reject()">
                            <p class="circle_button">거절</p>
                        </v-btn>
                    </v-card-actions>
                </div>
            </v-card>
          </v-flex>




          <v-flex 
              xs4
              d-flex>
            <v-card v-if="admin == 1">
                <v-card-title class="subheading font-weight-bold">회원관리</v-card-title>
                <v-divider></v-divider>
                  <v-card-actions class="btn">
                        <v-btn round color="blue" large v-on:click="managePage(circleName)">
                            <p class="circle_button">관리페이지</p>
                        </v-btn>
                  </v-card-actions>
            </v-card>
          </v-flex>
        </v-layout>
        <v-flex >
            <v-card>
              <v-card-title class="subheading font-weight-bold">활동</v-card-title>
              <v-divider></v-divider>
              <v-layout row wrap>
                <v-flex xs12 sm2 v-for="active in activelist" :key="active.activeId" class ='ma-3'>
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
            <v-btn icon @click="$router.push('/circle/'+circleName+'/active/show_actives')">
              <v-icon>add</v-icon>
            </v-btn>
            <v-btn @click="$router.push('/circle/'+circleName+'/active/personalActive')">
              활동내역추출
            </v-btn>
            </v-card>
          </v-flex>
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
                activelist: [],
                images: [],
                user: {},
                userName: null,
                president: {},
                circle: {},
                members: [],
                userin: {},
                admin: null
          }  
        },
        created: function(){
          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/board/notice").then((data)=>{
              for(let i=0;i<data.data.length && i<5 ;i++){
                let date = data.data[i].date.split('T')[0]
                let notice={"title":data.data[i].title,"contents":data.data[i].contents,
                "date":date,"postNum":data.data[i].postNum,"author":data.data[i].author}
                this.noticelists.push(notice)
              }
          })
          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/schedule").then((data)=>{
                    
                    for(let i=0;i<data.data.length && i<5;i++){
                        let schedule ={"start": data.data[i].start.substr(0,10)
                        ,"end":data.data[i].end.substr(0,10)
                        ,"content":data.data[i].content
                        ,"scheduleId":data.data[i].scheduleId}
                        this.schedulelists.push(schedule)
                    }
                    
          })
          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/board/board").then((data)=>{
              for(let i=0;i<data.data.length && i<5; i++){
                let date = data.data[i].date.split('T')[0]
                let board={"title":data.data[i].title,"contents":data.data[i].contents,
                "date":date,"postNum":data.data[i].postNum,"author":data.data[i].author}
                console.log(board)
                this.boardlists.push(board)
              }
          })
          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/group").then((data)=>{
              for(let i=0;i<data.data.length && i<5;i++){
                let group={"title":data.data[i].title,"contents":data.data[i].contents,
                "start":data.data[i].start.substr(0,10),"end":data.data[i].end.substr(0,10),
                "groupId":data.data[i].groupId,"teacher":data.data[i].teacher.name}
                console.log(group)
                this.grouplists.push(group)
              }
          })
          
          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/active").then((data)=>{
              
              for(let i=0;i<data.data.length && i<5;i++){
                let start = data.data[i].start.split('T')[0]
                let end = data.data[i].end.split('T')[0]
                let active={"title":data.data[i].title,"contents":data.data[i].contents,
                "date":start+" ~ "+end,"activeId":data.data[i].activeId,"image":data.data[i].image}
                this.images.push(data.data[i].image)
                this.activelist.push(active)
                console.log(active)
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
                  this.admin = 1;
                }
            })
          })
        },
        components: {
            headerBar
        },
        methods: {
          accept: function() {
            this.$http.post('http://localhost:8000/circle/'+this.circleName+'/accept', this.userin)
            this.$router.go(0)          
          },
          reject: function() {
            this.$http.post('http://localhost:8000/circle/'+this.circleName+'/reject', this.userin).then(() => {
              this.$http.post('http://localhost:8000/user/'+this.userin.name+'/reject', this.circle)
            }).then(() => {
              this.$router.go(0)
            })
          },
          managePage: function(name) {
            this.$router.push('/circle/'+name+'/circleManage')
          }
        }
    }
</script>

<style>
  #title{
    margin-top:20px;
    text-align: center;
  }

  
</style>