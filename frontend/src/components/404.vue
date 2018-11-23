<template>
  <div class="not-found">
    <!--항상 상단에 떠있는 bar-->
    <header-bar></header-bar>

    <md-empty-state
      md-icon="devices_other"
      md-label="404_Not_Found"
      md-description="없는 페이지입니다.">
    </md-empty-state>
  </div>
</template>

<script>
    import headerBar from './header.vue'

    export default {
        name: '404',

        components: {
            headerBar
        },
    }
</script>

<style lang="scss" scoped>

</style>