<template>
    <div id="header-bar">
        <md-toolbar class="md-primary">
            <md-button class="md-icon-button" @click="showNavigation = true">
                <md-icon>menu</md-icon>
            </md-button>
            <span class="md-title"> A-Dong </span>

            <div class="md-toolbar-offset">
                <md-tabs class="md-transparent" md-alignment="fixed">
                    <md-tab id="tab-notice" md-label="공지사항"></md-tab>
                    <md-tab id="tab-circle" md-label="동아리 정보"></md-tab>
                    <md-tab id="tab-board" md-label="자유 게시판"></md-tab>
                    <md-tab id="tab-issue" md-label="이달의 동아리"></md-tab>
                    <md-tab id="tab-posts" md-label="최근 활동 내역"></md-tab>
                </md-tabs>
            </div>

            <div class="md-toolbar-section-end">
                <md-button href="/signup">Log in</md-button>
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

        <md-drawer class="md-right" :md-active.sync="showSidepanel">
            <md-toolbar class="md-transparent" md-elevation="0">
                <span class="md-title">Favorites</span>
            </md-toolbar>

            <md-list>
                <md-list-item>
                    <span class="md-list-item-text">Eric So</span>
                    <md-button class="md-icon-button md-list-action">
                        <md-icon class="md-primary">chat_bubble</md-icon>
                    </md-button>
                </md-list-item>

                <md-list-item>
                    <span class="md-list-item-text">Jinu Jeong</span>
                    <md-button class="md-icon-button md-list-action">
                        <md-icon>chat_bubble</md-icon>
                    </md-button>
                </md-list-item>
            </md-list>
        </md-drawer>
    </div>
</template>

<script>
export default {
  name: 'headerBar',

  data: () => ({
    showNavigation: false,
    showSidepanel: false
  })
}

</script>

<style>

</style>
