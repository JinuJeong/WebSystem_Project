<template>
    <div id="home">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>
        <div id='title'>
           <span class="md-display-3">HANTOR</span>
           </div>
     <div class="centered-container">

    <div class="viewport">
      <md-toolbar :md-elevation="1">
        <span class="md-title">동아리 공지사항</span>
      </md-toolbar>

      <md-list>
        <md-list-item>
          <md-icon>arrow_right</md-icon>
          <span class="md-list-item-text">Inbox</span>
        </md-list-item>

        <md-list-item>
          <md-icon>arrow_right</md-icon>
          <span class="md-list-item-text">Sent Mail</span>
        </md-list-item>

        <md-list-item>
          <md-icon>arrow_right</md-icon>
          <span class="md-list-item-text">Trash</span>
        </md-list-item>

        <md-list-item>
          <md-icon>arrow_right</md-icon>
          <span class="md-list-item-text">Spam</span>
        </md-list-item>

        <md-divider class="md-inset"></md-divider>
  
      </md-list>
    </div>

    <div class="viewport">
      <md-toolbar :md-elevation="1">
        <span class="md-title">활동 내역</span>
      </md-toolbar> 
      <md-list>
        <md-list-item>
          <md-icon>arrow_right</md-icon>
          <span class="md-list-item-text">Inbox</span>
        </md-list-item>

        <md-list-item>
          <md-icon>arrow_right</md-icon>
          <span class="md-list-item-text">Sent Mail</span>
        </md-list-item>

        <md-list-item>
          <md-icon>arrow_right</md-icon>
          <span class="md-list-item-text">Trash</span>
        </md-list-item>

        <md-list-item>
          <md-icon>arrow_right</md-icon>
          <span class="md-list-item-text">Spam</span>
        </md-list-item>

        <md-divider class="md-inset"></md-divider>
  
      </md-list>
    </div>

    <div class="viewport">
      <md-toolbar :md-elevation="1">
        <span class="md-title">일정</span>
      </md-toolbar>
          <md-tabs md-sync-route>
      <md-tab id="tab-home" md-label="1월" ></md-tab>
      <md-tab id="tab-pages" md-label="2월" ></md-tab>
      <md-tab id="tab-posts" md-label="3월" ></md-tab>
      <md-tab id="tab-settings" md-label="4월"></md-tab>
    </md-tabs>  
      <md-list>
        <md-list-item>
          <md-icon>arrow_right</md-icon>
          <span class="md-list-item-text">Inbox</span>
        </md-list-item>

        <md-list-item>
          <md-icon>arrow_right</md-icon>
          <span class="md-list-item-text">Sent Mail</span>
        </md-list-item>

        <md-list-item>
          <md-icon>arrow_right</md-icon>
          <span class="md-list-item-text">Trash</span>
        </md-list-item>

        <md-list-item>
          <md-icon>arrow_right</md-icon>
          <span class="md-list-item-text">Spam</span>
        </md-list-item>

        <md-divider class="md-inset"></md-divider>
  
      </md-list>
    </div>
    </div>
    </div>
</template>

<script>
    import headerBar from './header.vue'

    export default {
        name: 'home',

        components: {
            headerBar
        },
    }
</script>

<style>
 .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .centered-container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 50vh;
  }
  .viewport {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    overflow: auto;
    border: 1px solid rgba(#000, .12);
    margin-left: 10px
  }
  .md-list-item-text{
    font-size: 15px;
    
  }
  #title{
    margin-top:20px;
    text-align: center;
  }
</style>