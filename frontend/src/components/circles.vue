<template>
    <div class="circles">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>
        <md-content>
                 <md-button class="md-raised md-primary" href="/circlesignup">동아리 신청</md-button>
        </md-content>    
        <div id='all_notice'> </div>
        <md-divider/>
        <md-table>
            <md-table-row id="first_row">
                <md-table-head md-numeric>ID</md-table-head>
                <md-table-head>동아리명</md-table-head>
                <md-table-head>소속</md-table-head>
                <md-table-head>회장</md-table-head>
                <md-table-head>회원수</md-table-head>
                <md-table-head>동아리컨셉</md-table-head>                
            </md-table-row>
            </md-table-row>
            <md-table-row v-for="circle in circles" :key="circle.id">
                <md-table-cell md-numeric>{{circle.circleNum}}</md-table-cell>
                <md-table-cell>{{circle.name}}</md-table-cell>
                <md-table-cell>{{circle.party}}</md-table-cell>
                <md-table-cell>{{circle.president.name}}</md-table-cell>
                <md-table-cell>{{circle.memberNumber}}</md-table-cell>
                <md-table-cell>{{circle.concept}}</md-table-cell>
            </md-table-row>               
        </md-table>
    </div>
</template>

<script>
import headerBar from './header.vue'

export default {
    created () {//혹시 안 되면 서버 껐다 켜봐라
        this.$http.get('http://localhost:8000/circle/send').then((res) => {
            this.circles = res.data
        })
    },
    data () {
        return {
            circles: [],
            users: [],
            president: {},
            com: ""
        }
    },
    name: 'circles',
    components: {
        headerBar
    },
    methods: {
    }
}
</script>

<style lang="scss" scoped>

    #first_row {

        color : red;
    }

    #all_notice {
        margin-bottom : 100px;

    }
</style>