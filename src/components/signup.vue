<template>
    <div class="not-found">
        <!--항상 상단에 떠있는 bar-->
        <header-bar/>

        <md-empty-state
            md-icon="devices_other"
            md-label="page for signup"
            md-description="회원가입을 위한 페이지 입니다.">
        </md-empty-state>
    </div>
</template>

<script>
import headerBar from './header.vue'

export default {
  name: 'signup',

  components: {
    headerBar
  }
}
</script>

<style lang="scss" scoped>

</style>
