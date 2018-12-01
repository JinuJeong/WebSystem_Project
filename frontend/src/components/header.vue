<template>
    <div id="header-bar">
        <v-toolbar color="black" class="header-toolbar" fixed>
            <v-icon color="white" v-if="showMenu" @click="showNavigation=true">menu</v-icon>
            <router-link :to="{path : '/'}" id="header_title" class="jg" style="width:auto">A-Dong</router-link>
            <v-toolbar-items class="toolbar-items-list">
                <v-btn class="toolbar-item" flat to="/boards/notice"><p class="item-p">공지사항</p></v-btn>
                <v-btn class="toolbar-item" flat to="/circles" ><p class="item-p">동아리 정보</p></v-btn>
                <v-btn class="toolbar-item" flat to="/boards/board"><p class="item-p">자유 게시판</p></v-btn>
                <v-btn class="toolbar-item" flat><p class="item-p">이달의 동아리</p></v-btn>
                <v-btn class="toolbar-item" flat to="/timeline"><p class="item-p">최근 활동 내역</p></v-btn>
                <v-btn class="toolbar-item" flat href="https://mportal.ajou.ac.kr/main.do"><p class="item-p">아주 Portal</p></v-btn>
                <span v-for="circle in circleManage" :key="circle.id">    
                <v-btn v-if="exist==true" class="toolbar-item" flat to="/circle/HANTOR"><p class="item-p">{{circle.name}}</p></v-btn>
                </span>
            </v-toolbar-items>

            <v-spacer></v-spacer>
            <search/>
            <v-btn flat v-if="beforeLogin" to="/login"><p class="item-p">Login</p></v-btn>
            <p class="item-p" v-if="!beforeLogin">{{userName}} 님</p>
        </v-toolbar>

        <md-drawer :md-active.sync="showNavigation" >
            <md-toolbar class="md-transparent" md-elevation="0">
                <p class="md-title">{{userDepartment}} {{userName}}님</p>
            </md-toolbar>

            <md-list>
                <md-list-item>
                    <md-icon>send</md-icon>
                    <p class="md-list-item-text">가입 동아리</p>
                </md-list-item>
                <md-list-item v-on:click="mypage()">
                    <md-icon>move_to_inbox</md-icon>
                    <p class="md-list-item-text">내 정보</p>
                </md-list-item>
                <md-list-item v-if="!beforeLogin" v-on:click="logout">
                    <md-icon>cached</md-icon>
                    <p class="md-list-item-text">Logout</p>
                </md-list-item>
                <md-list-item>
                    <md-icon>error</md-icon>
                    <p class="md-list-item-text">오류 신고</p>
                </md-list-item>
            </md-list>
        </md-drawer>
    </div>
</template>

<script>
import search from './search.vue'
export default {
  name: 'headerBar',

  data: () => ({
    showNavigation: false,
    showMenu : false,
    showSidepanel: false,
    beforeLogin: true,
    userName: "",
    userDepartment : "",
    circles: [],
    user: {},
    circleManage: [],
    exist: false,
  }),
  created () {
    if (this.$session.exists()) {
      this.beforeLogin = false;
      this.showMenu = true;
      this.userName = this.$session.getAll().username;
      this.userDepartment = this.$session.getAll().userDepartment;
      this.$http.get('http://localhost:8000/circle/send').then((res) => {
        this.circles = res.data
      }).then(() => {
          for(var i = 0; i < this.circles.length; i++){
              if(this.circles[i].president.name == this.userName){
                //this.circle = this.circles[i]
                this.circleManage.push(this.circles[i])
                this.exist = true
              }
          }
      })
    }
    
  },
  components: {
    search
  },
  methods: {
      logout: function(){
          this.$session.destroy();
          this.$router.push('/');
          window.location.reload();
      },
      mypage: function(){
          this.$router.push('/mypage');
      }
  }
}

</script>

<style>

    .toolbar-items-list{
        margin-left : 30px;
        height : 100%;
    }

    .toolbar-item {
        width : 250px;
    }

    .item-p{
        color : white;
        margin-top : 15px;
        font-size : 15px;
    }

    .md-list-item-text{
        margin-top : 13px;
    }

    a:hover {
        text-decoration : none !important;
    }

    #header_title {
        margin-left : 30px;
        text-decoration:none;
        color : white;
        font-size : 23px;
    }
</style>
