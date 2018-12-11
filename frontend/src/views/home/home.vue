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

                        <v-btn color="blue-grey lighten-1" to="/login" bottom style="display: block; width : 90%; height:30% ">
                        <p class="circle_button" style="color : white; font-size : 3.5ch; margin-top : 10%;">A-Dong Login</p>
                        </v-btn>
                        <v-btn color="blue-grey lighten-1" to="/signup" bottom style="display: block; width : 90%; height:30% ">
                            <p class="circle_button" style="color : white; font-size : 3.5ch; margin-top : 10%;">회원가입</p>
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
                    <v-card color="white" style=" width:95%; height:85%;" >
                        <v-card-title class="home-content-title"><router-link to="/boards/notice">학사일정</router-link></v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                            <v-list-tile v-for="schedule in scheduleList">
                                <v-list-tile-content class="rank-text jg">{{schedule.content}}</v-list-tile-content>
                                <v-list-tile-content class="align-end time-text">1분전</v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-flex>
                
                <v-flex style="height : 85%; width : 20%;">
                    <v-card class="md-transparent" style="width : 100%; height:85%;">
                        <v-card-title class="home-content-title"><router-link to="/boards/notice">공지사항</router-link></v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                            <v-list-tile v-for="notice in noticeList" :key="notice._id">
                                <v-list-tile-content v-on:click="pageOn(notice.postNum)" class="rank-text jg">{{notice.title}}</v-list-tile-content>
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
                            <v-list-tile v-for="board in boardList" :key="board._id">
                                <v-list-tile-content v-on:click="pageOn(board.postNum)" class="rank-text jg">{{board.title}}</v-list-tile-content>
                                <v-list-tile-content class="align-end time-text">2분전</v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout style=" height : 400px; ">
                <v-flex style="max-width : 400px; height : 85%;">
                    <v-card dark color="white"  class="left-side-content">
                        <img src="../../assets/map.jpg" alt="Smiley face" >
                    </v-card>
                </v-flex>
                <v-flex style="height : 85%; width : 20%;">
                    <v-card class="md-transparent" style="width : 100%; height:85%;">
                        <v-card-title class="home-content-title"><router-link to="/circles" style="width : 50%;">동아리 정보</router-link></v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                            <v-list-tile v-for="circle in CircleList" :key="circle._id">
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
                            <v-list-tile v-for="circle in CircleList" :key="circle._id">
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
            }
            

            this.$http.get('http://localhost:8000/boards/home/notice').then((res) => {
                this.noticeList = res.data
            })
            this.$http.get('http://localhost:8000/boards/home/board').then((res) => {
                this.boardList = res.data
            })
            this.$http.get('http://localhost:8000/circle/Home/schedule').then((res)=>{
                this.scheduleList = res.data
            })
            var circle = await this.$http.get('http://localhost:8000/circle/send/title').then((res) => {
                this.CircleList = res.data
            })
        },
        data () {
            return {
                noticeList : [],
                boardList : [],
                CircleList : [],
                scheduleList : [],

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
            },
            pageOn: function(postNum){
                this.$router.push('/boards/board/show_notice/' + postNum)
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