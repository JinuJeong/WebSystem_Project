<template>
    <div class="board">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>

        <md-empty-state
                md-icon="verified_user"
                md-label="page for board"
                md-description="자유게시판을 위한 페이지입니다.">
        </md-empty-state>
    </div>
</template>

<script>
    import headerBar from './header.vue'

    export default {
        name: 'board',

        components: {
            headerBar
        },
    }
</script>

<style lang="scss" scoped>

</style>