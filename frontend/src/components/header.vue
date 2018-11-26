<template>
    <div id="header-bar" >

        <v-toolbar color="blue accent-1" >
            <v-icon color="white" @click="showNavigation=true">menu</v-icon>
            <router-link :to="{path : '/'}" id="header_title" class="jg">A-Dong</router-link>

            <v-toolbar-items class="toolbar-items-list">
                <v-btn class="toolbar-item" flat to="/notice"><p class="item-p">공지사항</p></v-btn>
                <v-btn class="toolbar-item" flat to="/circles" ><p class="item-p">동아리 정보</p></v-btn>
                <v-btn class="toolbar-item" flat to="/board"><p class="item-p">자유 게시판</p></v-btn>
                <v-btn class="toolbar-item" flat><p class="item-p">이달의 동아리</p></v-btn>
                <v-btn class="toolbar-item" flat to="/timeline"><p class="item-p">최근 활동 내역</p></v-btn>
                <v-btn class="toolbar-item" flat to="/circle/HANTOR"><p class="item-p">HANTOR</p></v-btn>
            </v-toolbar-items>

            <v-spacer></v-spacer>
            <search/>
            <v-btn flat v-if="beforeLogin" to="/login"><p class="item-p">Login</p></v-btn>
            <p class="item-p" v-if="!beforeLogin">{{userName}} 님</p>
        </v-toolbar>

        <md-drawer :md-active.sync="showNavigation">
            <md-toolbar class="md-transparent" md-elevation="0">
                <p class="md-title">My page</p>
            </md-toolbar>

            <md-list>
                <md-list-item>
                    <md-icon>send</md-icon>
                    <p class="md-list-item-text">가입 동아리</p>

                </md-list-item>

                <md-list-item>
                    <md-icon>move_to_inbox</md-icon>
                    <p class="md-list-item-text">내 정보</p>
                </md-list-item>
                <md-list-item v-if="!beforeLogin" v-on:click="logout">
                    <md-icon>cached</md-icon>
                    <span class="md-list-item-text">Logout</span>
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
    showSidepanel: false,
    beforeLogin: true,
    userName: "",
  }),
  created () {
    if (this.$session.exists()) {
      this.beforeLogin=false
      this.userName=this.$session.getAll().username;

    }
  },
  components: {
    search
  },
  methods: {
      logout: function(){
          this.$session.destroy();
          this.$router.push('/')
          window.location.reload();
      }
  }
}

</script>

<style>

    .toolbar-items-list{
        margin-left : 30px;
    }

    .toolbar-item {
        width : 250px;

    }

    .item-p{
        color : white;
        margin-top : 15px;
        font-size : 15px;
    }

    a:hover {
        text-decoration : none !important;
    }

    .tab-list{
        color : white;
    }

    #md-a{
        background-color : cornflowerblue;
    }

    #header_title {
        margin-left : 30px;
        text-decoration:none;
        color : white;
        font-size : 23px;
    }
</style>
