<template>
    <div id="header-bar">
        <md-toolbar class="md-transparent" id="md-a">
            <md-button class="md-icon-button" @click="showNavigation = true">
                <md-icon>menu</md-icon>
            </md-button>
            <router-link :to="{path : '/'}" id="header_title">A-Dong</router-link>

            <div class="md-toolbar-section-end">
                <div class="md-toolbar-offset">
                <md-tabs class="md-transparent" md-alignment="fixed">
                    <md-tab class="tab-list" to="/notice" md-label="공지사항"> </md-tab>
                    <md-tab class="tab-list" to="/circles" md-label="동아리 정보"></md-tab>
                    <md-tab class="tab-list" to="/board" md-label="자유 게시판"></md-tab>
                    <md-tab class="tab-list" md-label="이달의 동아리"></md-tab>
                    <md-tab class="tab-list" md-label="최근 활동 내역"></md-tab>
                </md-tabs>
                </div>
            </div>
            <div class="md-toolbar-section-end">
                <search/>
                <md-button href="/login">Log in</md-button>
            </div>
        </md-toolbar>

        <md-drawer :md-active.sync="showNavigation">
            <md-toolbar class="md-transparent" md-elevation="0">
                <span class="md-title">My page</span>
            </md-toolbar>

            <md-list>
                <md-list-item>
                    <md-icon>send</md-icon>
                    <span class="md-list-item-text">가입 동아리</span>

                </md-list-item>

                <md-list-item>
                    <md-icon>move_to_inbox</md-icon>
                    <span class="md-list-item-text">내 정보</span>
                </md-list-item>

                <md-list-item>
                    <md-icon>error</md-icon>
                    <span class="md-list-item-text">오류 신고</span>
                </md-list-item>
            </md-list>
        </md-drawer>
    </div>
</template>

<script>
<<<<<<< HEAD
import search from './search.vue'
export default {
  name: 'headerBar',

  data: () => ({
    showNavigation: false,
    showSidepanel: false
  }),
  components: {
    search
  }
}
=======
    export default {
        name: 'headerBar',

        data: () => ({
            showNavigation: false,
        })
    }
>>>>>>> c3854110605ad385dd6c6952cb78712e1c3d1578

</script>

<style>
<<<<<<< HEAD
</style>
=======
    .tab-list{
        color : white;
    }

    #md-a{
        background-color : #F52985;
    }

    #header_title {
        text-decoration:none;
        color : white;
        font-size : 23px;
    }
</style>
>>>>>>> c3854110605ad385dd6c6952cb78712e1c3d1578
