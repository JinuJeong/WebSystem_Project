<template>
    <div id="home">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>

        <v-container fluid grid-list-md style="padding : 5%">
            <v-layout row wrap>

                <v-flex xs4 d-flex style="width : 50px;">
                    <v-btn color="blue-grey lighten-1" bottom style="width : 15px; margin : auto">
                        <p class="circle_button" style="color : white;">가입 신청</p>
                    </v-btn>
                </v-flex>

                <v-flex xs4 d-flex>
                    <v-card>
                        <v-card-title class="subheading font-weight-bold">공지사항</v-card-title>
                        <v-divider></v-divider>
                        <v-list v-for="notice in noticelists" :key="notice.postId">
                            <v-list-tile
                                    @click="$router.push('/circle/'+circleName+'/board/notice/show_notice/'+notice.postNum)">
                                <v-list-tile-title v-text="notice.title"></v-list-tile-title>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>{{notice.author}}</v-list-tile-action-text>
                                    <v-list-tile-action-text>{{notice.date}}</v-list-tile-action-text>
                                </v-list-tile-action>

                            </v-list-tile>
                        </v-list>
                        <v-btn icon @click="$router.push('/circle/'+circleName+'/board/notice/show_notices')">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-card>
                </v-flex>

                <v-flex xs4 d-flex>
                    <v-card>
                        <v-card-title class="subheading font-weight-bold">게시판</v-card-title>
                        <v-divider></v-divider>
                        <v-list v-for="board in boardlists" :key="board.date">
                            <v-list-tile
                                    @click="$router.push('/circle/'+circleName+'/board/board/show_notice/'+board.postNum)">
                                <v-list-tile-title v-text="board.title"></v-list-tile-title>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>{{board.author}}</v-list-tile-action-text>
                                    <v-list-tile-action-text>{{board.date}}</v-list-tile-action-text>
                                </v-list-tile-action>

                            </v-list-tile>
                        </v-list>
                        <v-btn icon @click="$router.push('/circle/'+circleName+'/board/board/show_notices')">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-card>
                </v-flex>

                <v-flex xs4 d-flex>
                    <v-card>
                        <v-card-title class="subheading font-weight-bold">스터디</v-card-title>
                        <v-divider></v-divider>
                        <v-list v-for="group in grouplists" :key="group.groupId">
                            <v-list-tile
                                    @click="$router.push('/circle/'+circleName+'/group/show_group/'+group.groupId)">
                                <v-list-tile-title v-text="group.title"></v-list-tile-title>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>{{group.start}}</v-list-tile-action-text>
                                    <v-list-tile-action-text>{{group.end}}</v-list-tile-action-text>
                                </v-list-tile-action>

                            </v-list-tile>
                        </v-list>
                        <v-btn icon @click="$router.push('/circle/'+circleName+'/group/show_groups')">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-card>
                </v-flex>

                <v-flex xs4 d-flex>
                    <v-card>
                        <v-card-title class="subheading font-weight-bold">활동</v-card-title>
                        <v-divider></v-divider>
                        <v-list v-for="notice in noticelists" :key="notice.postId">
                            <v-list-tile
                                    @click="$router.push('/circle/'+circleName+'/board/notice/show_notice/'+notice.postNum)">
                                <v-list-tile-title v-text="notice.title"></v-list-tile-title>
                                <v-list-tile-action>
                                    <v-list-tile-action-text>{{notice.author}}</v-list-tile-action-text>
                                    <v-list-tile-action-text>{{notice.date}}</v-list-tile-action-text>
                                </v-list-tile-action>
                            </v-list-tile>
                        </v-list>
                        <v-btn icon @click="$router.push('/circle/'+circleName+'/board/notice/show_notices')">
                            <v-icon>add</v-icon>
                        </v-btn>
                    </v-card>
                </v-flex>

                <v-flex xs4 d-flex>
                    <v-card v-if="this.president">
                        <v-card-title class="subheading font-weight-bold">회원관리</v-card-title>
                        <v-divider></v-divider>
                        <div v-for="member in members" :key="member.id">
                            {{member.name}} {{member.department}}
                            <v-card-actions class="btn">
                                <v-btn round color="blue" large v-on:click="change4=true">
                                    <p class="circle_button">승인</p>
                                </v-btn>
                                <v-btn round color="blue" large v-on:click="change4=true">
                                    <p class="circle_button">거절</p>
                                </v-btn>
                            </v-card-actions>
                        </div>
                    </v-card>
                </v-flex>
            </v-layout>
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

        created() {
            if (this.$session.exists()) {
                this.beforeLogin = false;
            }
        },

        data () {
            return {
                beforeLogin : true
            }
        },

        components: {
            headerBar,
            footerBar
        },
    }
</script>

<style>
    .centered-container {
        display: flex;
        align-items : center;
        flex-direction: row;
        position: relative;
        padding: 5%;
        justify-content: space-around;
        height: 80%;
        width: 100%;
    }

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