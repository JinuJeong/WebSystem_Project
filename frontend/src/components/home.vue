<template>
    <div id="home">
        <!--항상 상단에 떠있는 bar-->
        <header-bar/>

        <md-empty-state
                md-icon="devices_other"
                md-label="게시물이 없습니다"
                md-description="게시글을 올려 동아리 활동을 업데이트하세요.">
            <md-button class="md-primary md-raised">게시물 올리기</md-button>
        </md-empty-state>
        <md-divider></md-divider>
        <md-empty-state
                md-icon="thumb_up"
                md-label="이달의 동아리"
                md-description="HANTOR">
            <md-button class="md-primary md-raised">자세히</md-button>
        </md-empty-state>
    </div>
</template>

<script>
import headerBar from './header.vue'

export default {
  name: 'home',

  components: {
    headerBar
  }
}
</script>

<style>

</style>
