<template>
  <div class="page-container md-layout-column">
    <md-toolbar class="md-primary">
      <md-button class="md-icon-button" @click="showNavigation = true">
        <md-icon>menu</md-icon>
      </md-button>
      <span class="md-title">A Dong</span>

      <div class="md-toolbar-section-end">
        <md-button @click="showSidepanel = true">Drawer 연습</md-button>
      </div>
    </md-toolbar>

    <md-drawer :md-active.sync="showNavigation">
      <md-toolbar class="md-transparent" md-elevation="0">
        <span class="md-title">A Dong</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>move_to_inbox</md-icon>
          <span class="md-list-item-text">Inbox</span>
        </md-list-item>

        <md-list-item>
          <md-icon>send</md-icon>
          <span class="md-list-item-text">Sent Mail</span>
        </md-list-item>

        <md-list-item>
          <md-icon>delete</md-icon>
          <span class="md-list-item-text">Trash</span>
        </md-list-item>

        <md-list-item>
          <md-icon>error</md-icon>
          <span class="md-list-item-text">Spam</span>
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

    <md-tabs class="md-accent" md-alignment="centered">
      <md-tab id="tab-home" md-label="공지사항"></md-tab>
      <md-tab id="tab-pages" md-label="Hot Issue"></md-tab>
      <md-tab id="tab-posts" md-label="최근 활동 내역"></md-tab>
    </md-tabs>

    <md-content>
      <md-avatar class="md-large">
        <img src="./assets/logo.png" alt="People">
      </md-avatar>
      아주대학교 동아리 관리 시스템
      <md-dialog :md-active.sync="showDialog">
        <md-dialog-title>Dialog 연습</md-dialog-title>

        <md-tabs md-dynamic-height>
          <md-tab md-label="Tab 1">
            <p>aaabbb</p>
            <p>cccddd</p>
            <p>eeefff</p>
          </md-tab>
          <md-tab md-label="Tab 2">
            <p>Hello World</p>
            <p>Hello Vue</p>
          </md-tab>
        </md-tabs>
        <md-dialog-actions>
          <md-button class="md-primary" @click="showDialog = false">종료</md-button>
          <md-button class="md-primary" @click="showDialog = false">계속</md-button>
        </md-dialog-actions>
      </md-dialog>
      <md-button class="md-accent md-raised" @click="showDialog = true">Dialog 연습</md-button>
    </md-content>

    <md-empty-state
      md-icon="devices_other"
      md-label="게시물이 없습니다"
      md-description="게시글을 올려 동아리 활동을 업데이트하세요.">
      <md-button class="md-primary md-raised">게시물 올리기</md-button>
    </md-empty-state>
  </div>
</template>

<script>
  export default {
    name: 'Temporary',
    data: () => ({
      showNavigation: false,
      showSidepanel: false,
      showDialog: false
    })
  }
</script>

<style lang="scss" scoped>
  .page-container {
    min-height: 700px;
    overflow: hidden;
    position: relative;
    border: 1px solid rgba(#000, .12);
  }

   // Demo purposes only
  .md-drawer {
    width: 230px;
    max-width: calc(100vw - 125px);
  }

  .md-content {
    padding: 16px;
  }
</style>