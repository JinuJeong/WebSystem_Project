<template>
    <div class="notice">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>

        <md-empty-state
                md-icon="devices_other"
                md-label="page for notice"
                md-description="공지사항을 위한 페이지입니다.">
        </md-empty-state>
    </div>
</template>

<script>
    import headerBar from '../../components/header'
    export default {
        name: 'notice',
        components: {
            headerBar
        },
    }
</script>

<style lang="scss" scoped>
</style>