<template>
    <div id="home">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>

        <v-btn color="blue-grey lighten-1" bottom style="width : 15px; margin : auto" to='/login'>
            <p class="circle_button" style="color : white;">A-Dong Login</p>
        </v-btn>

        <v-container style="margin-top : 2%; height : 1300px;">
            <v-layout style=" height : 300px;">
                <v-flex style="width : 1px; max-width : 400px; height : 90%;">
                    <v-card dark color="white"  class="left-side-content"  v-if="beforeLogin">
                        <v-card-text style="color : black; font-size : 4ch; text-align: center; "> <p >커뮤니티 이용을 위해 </p><p>Login을 해주세요</p></v-card-text>
                        <v-btn color="blue-grey lighten-1" to="/login" bottom style="display: block; width : 70%; ">
                        <p class="circle_button" style="color : white; font-size : 2.5ch; margin-top : 4%;">A-Dong Login</p>
                        </v-btn>
                        <v-btn color="blue-grey lighten-1" to="/signup" bottom style="width : 70%;">
                            <p class="circle_button" style="color : white; font-size : 2.5ch; margin-top : 4%;">회원가입</p>
                        </v-btn>
                    </v-card>
                    <v-card dark color="white"  class="left-side-content" v-if="!beforeLogin">
                        <v-card-text style="color : black; font-size : 25px; text-align: center;"> <p> {{userDepartment}} {{userName}}님 </p></v-card-text>
                        <v-btn color="blue-grey lighten-1" to="/mypage" bottom style="display: block; width : 70%; ">
                            <p class="circle_button" style="color : white; font-size : 2.5ch; margin-top : 4%;">My page</p>
                        </v-btn>
                        <v-btn color="blue-grey lighten-1" v-on:click="logout" bottom style="width : 70%;">
                            <p class="circle_button" style="color : white; font-size : 2.5ch; margin-top : 4%; ">로그아웃</p>
                        </v-btn>
                    </v-card>
                </v-flex>

                <v-flex>
                    <v-carousel style="height : 90%;">
                        <v-carousel-item
                                v-for="(item,i) in items"
                                :key="i"
                                :src="item.src"
                        ></v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
            <v-layout style=" height : 400px;">
                <v-flex style="max-width : 400px; height : 85%;">
                    <v-card dark color="white" style=" width:95%; height:85%;" >
                        <v-card-title style="color : black; font-size : 27px; text-align: center;"> <p> 학사 일정</p></v-card-title>

                        <ul style="text-align : left;">
                            <li style="color : black;"><p>2019-1학기 재입학신청  12.03 (월) ~ 01.04 (금)</p> </li>
                            <li style="color : black;"><p>2학기 수업평가 12.03 (월) ~ 12.28 (금)</p>  </li>
                            <li style="color : black;"><p>보강일 12.17 (월) ~ 12.17 (월)</p></li>
                            <li style="color : black;"><p>2학기 기말시험 12.18 (화)  ~ 12.24 (월)</p></li>
                            <li style="color : black;"><p>동계방학 시작 2019-1 12.26 (수) ~ 12.26 (수)</p></li>
                        </ul>
                    </v-card>
                </v-flex>
                <v-flex style="height : 85%; width : 20%;">
                    <v-card class="md-transparent" style="width : 100%; height:85%;">
                        <v-card-title class="home-content-title"><router-link to="/boards/notice">공지사항</router-link></v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                            <v-list-tile v-for="notice in noticeList">
                                <v-list-tile-content class="rank-text jg">{{notice.title}}</v-list-tile-content>
                                <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-flex>
                <v-flex style="height : 85%; width : 25%;" >
                    <v-card class="md-transparent" style="width : 100%; height:85%;">
                        <v-card-title class="home-content-title"><router-link to="/boards/board">자유게시판</router-link></v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                            <v-list-tile v-for="board in boardList">
                                <v-list-tile-content class="rank-text jg">{{board.title}}</v-list-tile-content>
                                <v-list-tile-content class="align-end time-text">2분전</v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout style=" height : 400px; ">
                <v-flex style="max-width : 400px; height : 85%;">
                    <v-card dark color="blue-grey lighten-4"  class="left-side-content">
                        <v-card-text style="color : black; font-size : 4ch; text-align: center;"> <p> 동아리방 사진</p></v-card-text>

                    </v-card>
                </v-flex>
                <v-flex style="height : 85%; width : 20%;">
                    <v-card class="md-transparent" style="width : 100%; height:85%;">
                        <v-card-title class="home-content-title"><router-link to="/circles" style="width : 50%;">동아리 정보</router-link></v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                            <v-list-tile v-for="circle in CircleList">
                                <v-list-tile-content class="rank-text jg">{{circle.name}}</v-list-tile-content>
                                <v-list-tile-content class="align-end time-text">3분전</v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-flex>
                <v-flex style="height : 85%; width:25%;" >
                    <v-card class="md-transparent" style="width : 100%; height:85%;">
                        <v-card-title class="home-content-title"><router-link to="/circles" style="width : 50%;">이달의 동아리</router-link></v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                            <v-list-tile v-for="circle in CircleList">
                                <v-list-tile-content class="rank-text jg">{{circle.name}}</v-list-tile-content>
                                <v-list-tile-content class="align-end time-text">4분전</v-list-tile-content>
                            </v-list-tile>
                        </v-list>
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
        async created() {
            if (this.$session.exists()) {
                this.beforeLogin = false;
                this.showMenu = true;
                this.userName = this.$session.getAll().username;
                this.userDepartment = this.$session.getAll().userDepartment;

                this.$http.get('http://localhost:8000/boards/notice').then((res) => {
                    this.noticeList = res.data
                })
                this.$http.get('http://localhost:8000/boards/board').then((res) => {
                    this.boardList = res.data
                })
                var circle = await this.$http.get('http://localhost:8000/circle/send/title').then((res) => {
                    this.CircleList = res.data
                })
            }
        },
        data () {
            return {
                noticeList : [],
                boardList : [],
                CircleList : [],

                beforeLogin : true,
                userName : "",
                userDepartment : "",
                items: [
                    {
                        src: "http://www.ajou.ac.kr/_resources/main/img/intro/UI/slogan_img01.png"
                    }
                ]
            }
        },

        components: {
            headerBar,
            footerBar
        },

        methods : {
            logout: function(){
                this.$session.destroy();
                this.$router.push('/');
                window.location.reload();
            }
        }
    }
</script>

<style>
    .left-side-content{
        border:1px black solid;
        width:95%;
        height:85%;
        display:flex;
        flex-direction : column;
        align-items : center;
        justify-content : center;
        position: relative;
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