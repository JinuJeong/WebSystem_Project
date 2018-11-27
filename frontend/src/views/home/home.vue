<template>
    <div id="home">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>

        <v-container class="first-container" >

            <div class="group">
                <v-card class="md-transparent" style="max-width : 500px;">
                    <v-card-title class="home-content-title"><router-link to="/board">자유게시판</router-link></v-card-title>
                    <v-divider></v-divider>
                    <v-list dense>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">BEAT 동아리 공연봤냐?</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">공부하기에 ANSI가 나음? HANTOR가 나음?</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">구학생회관좀 고쳐줬으면...</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">동방 바뀌는거 언제임</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">오늘날씨개춥네</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </div>

            <div class="group">
                <v-card class="md-transparent" style="max-width : 500px;">
                    <v-card-title class="home-content-title"><router-link to="/board">New동아리</router-link></v-card-title>
                    <v-divider></v-divider>
                    <v-list dense>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">ANSI</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">HANTOR</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">WHOIS</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">BEAT</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">SOUL</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </div>

            <div class="group">
                <v-card class="md-transparent" style="max-width : 500px;">
                    <v-card-title class="home-content-title" ><router-link to="/board">자유게시판</router-link></v-card-title>
                    <v-divider></v-divider>
                    <v-list dense>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">BEAT 동아리 공연봤냐?</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">공부하기에 ANSI가 나음? HANTOR가 나음?</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">구학생회관좀 고쳐줬으면...</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">동방 바뀌는거 언제임</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">오늘날씨개춥네</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </div>

            <div class="group">
                <v-card class="md-transparent" style="max-width : 550px;">
                    <v-card-title class="home-content-title"><router-link to="/board">자유게시판</router-link></v-card-title>
                    <v-divider></v-divider>
                    <v-list dense>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">BEAT 동아리 공연봤냐?</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">공부하기에 ANSI가 나음? HANTOR가 나음?</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">구학생회관좀 고쳐줬으면...</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">동방 바뀌는거 언제임</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">오늘날씨개춥네</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </div>
        </v-container>

        <v-container class="second-container">
            <div class="second-group">
                <v-card class="md-transparent" style="width:100%;">
                    <v-card-title class="home-content-title"><router-link to="/notice">공지사항</router-link></v-card-title>
                    <v-divider></v-divider>
                    <v-list dense>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">BEAT 동아리 공연봤냐?</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">공부하기에 ANSI가 나음? HANTOR가 나음?</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">구학생회관좀 고쳐줬으면...</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">동방 바뀌는거 언제임</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">오늘날씨개춥네</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </div>
        </v-container>

        <v-container class="last-container">
            <div class="second-group">
                <v-card class="md-transparent" style="width:100%;">
                    <v-card-title class="home-content-title"><router-link to="/notice">이달의동아리</router-link></v-card-title>
                    <v-divider></v-divider>
                    <v-list dense>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">BEAT 동아리 공연봤냐?</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">공부하기에 ANSI가 나음? HANTOR가 나음?</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">구학생회관좀 고쳐줬으면...</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">동방 바뀌는거 언제임</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                        <v-list-tile>
                            <v-list-tile-content class="rank-text">오늘날씨개춥네</v-list-tile-content>
                            <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </v-card>
            </div>

        </v-container>

        <v-divider></v-divider>
        <footerBar></footerBar>
    </div>
</template>

<script>
    import headerBar from '../../components/header'
    import footerBar from '../../components/footer'

    export default {
        name: 'home',

        components: {
            headerBar,
            footerBar
        },
    }
</script>

<style>
    .first-container {
        display : flex;
        flex-direction : row;
        justify-content: center;
        align-items: center;
        padding-top : 3%;
        flex-wrap : nowrap;
        height : 320px;
        width : 80%;
        max-width : 2000px;
        background-color :white;
    }

    .second-container {
        display : flex;
        flex-direction : row;
        justify-content: center;
        align-items: center;
        margin-top : 0.5px;
        flex-wrap : nowrap;
        height : 320px;
        width : 80%;
        max-width : 2000px;
    }

    .last-container {
        display : flex;
        flex-direction : row;
        justify-content: center;
        align-items: center;
        margin-top : 0.5%;
        margin-bottom : 5%;
        flex-wrap : nowrap;
        height : 100%;
        width : 80%;
        max-width : 2000px;
    }

    .second-group {
        width : 100%;
        height : 50%;
        margin-right: 1%;
        margin-bottom : 3%;
    }

    .group {
        width : 100%;
        height : 50%;
        margin-right: 1%;
        margin-bottom : 3%;
    }

    .home-content-title{
        font-family: 'Noto Sans KR', sans-serif;
        font-size: 20px;
        color : #e63c74;
    }

    .time-text {
        color : darkgray;
    }

    .rank-text {
        font-size : 18px;
    }

</style>