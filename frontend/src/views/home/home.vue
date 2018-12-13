<template>
    <div id="home">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>

        <v-container style="margin-top : 2%; height : 1300px; padding : 2%;">
            <v-layout style=" height : 300px;">
                <v-flex style=" max-width : 23%; height : 90%;">
                    <v-card dark color="white"  class="left-side-content"  v-if="beforeLogin">

                        <v-btn color="blue-grey lighten-1" to="/login" bottom style="display: block; width : 90%; height:30% ">
                        <p class="circle_button" style="color : white; font-size : 5ch; margin-top : 10%;">A-Dong Login</p>
                        </v-btn>
                        <v-btn color="blue-grey lighten-1" to="/signup" bottom style="display: block; width : 90%; height:30% ">
                            <p class="circle_button" style="color : white; font-size : 5ch; margin-top : 10%;">회원가입</p>
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
                        <v-carousel-item width="100%" auto-height
                                         v-for="(item,i) in items"
                                :key="i"
                                :src="item.src"
                        >
                        </v-carousel-item>
                    </v-carousel>
                </v-flex>
            </v-layout>
            <v-layout style=" height : 400px;">
                <v-flex style="max-width : 23.5%; height : 85%;">
                    <v-card color="white" style=" width:95%; height:85%;" >
                        <v-card-title class="home-content-title"><router-link to="/schedules">학사일정</router-link></v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                            <v-list-tile v-for="schedule in scheduleList">
                                <v-list-tile-content class="rank-text jg">{{schedule.content}}</v-list-tile-content>
                                <v-list-tile-content class="align-end time-text">{{schedule.start.substr(0,10)}} ~ {{schedule.end.substr(0,10)}}</v-list-tile-content>
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
                                <v-list-tile-content class="align-end time-text">{{notice.date.substr(0,10)}}</v-list-tile-content>
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
                                <v-list-tile-content class="align-end time-text">{{board.date.substr(0,10)}}</v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-flex>
            </v-layout>
            <v-layout style=" height : 400px; ">
                <v-flex style="max-width : 23.5%; height : 85%;">

                    <v-carousel style="height : 85%; width: 93%;">
                        <v-carousel-item
                                v-for="(map) in maps"
                                :key="i"
                        ><img :src="map.src" :alt="map.src"/>
                        </v-carousel-item>
                    </v-carousel>

                </v-flex>
                <v-flex style="height : 85%; width : 20%;">
                    <v-card class="md-transparent" style="width : 100%; height:85%;">
                        <v-card-title class="home-content-title"><router-link to="/circles" style="width : 50%;">동아리 정보</router-link></v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                            <v-list-tile v-for="circle in CircleList" :key="circle._id">
                                <v-list-tile-content class="rank-text jg">{{circle.name}}</v-list-tile-content>
                                <v-list-tile-content class="align-end time-text"></v-list-tile-content>
                            </v-list-tile>
                        </v-list>
                    </v-card>
                </v-flex>
                <v-flex style="height : 85%; width:25%;" >
                    <v-card class="md-transparent" style="width : 100%; height:85%;">
                        <v-card-title class="home-content-title"><router-link to="/circles" style="width : 50%;">추천 동아리</router-link></v-card-title>
                        <v-divider></v-divider>
                        <v-list dense>
                            <v-list-tile-content class="rank-text jg">당신의 관심사 : {{user.interest}}</v-list-tile-content>
                            <v-list-tile v-for="circle in recommendCircles" :key="circle._id">
                                <v-list-tile-content class="rank-text jg">{{circle.name}}</v-list-tile-content>
                                <v-list-tile-content class="align-end time-text">{{circle.concept}}</v-list-tile-content>
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
                this.userstudentId = this.$session.getAll().userstudentId;
                this.$http.get('http://localhost:8000/user/findById/' + this.userstudentId).then((res) => {
                    this.user = res.data
                }).then(() => {
                    this.userInterest = this.user.interest.split(',')
                })
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

            this.$http.get('http://localhost:8000/circle/send').then((res) => {
                this.allCircles = res.data
            }).then(() => {
                for(var i = 0; i < this.allCircles.length; i++){
                    if(this.allCircles[i].auth == true)
                        this.circles.push(this.allCircles[i])
                }
            }).then(() => {
                var out

                for(var i = 0; i < this.circles.length; i++){
                    this.circleInterest = this.circles[i].concept.split(',')
                    for(var j = 0; j < this.circleInterest.length; j++){
                       for(var k = 0; k < this.userInterest.length; k++){
                           if(this.circleInterest[j] == this.userInterest[k]){
                              this.recommendCircles.push(this.circles[i])
                              out = 1
                              break;
                           }
                        }
                        if(out == 1){
                            out = 0;
                            break;
                        }
                    }
                }
            })

        },
        data () {
            return {
                noticeList : [],
                boardList : [],
                CircleList : [],
                scheduleList : [],
                allCircles: [],
                circles: [],
                beforeLogin : true,
                userName : "",
                userDepartment : "",
                userInterest: [],
                circleInterest: [],
                recommendCircles: [],
                user: {},
                items: [
                    {
                        src: "http://www.ajou.ac.kr/_resources/main/img/intro/UI/slogan_img01.png",
                    },
                ],
                maps: [
                    {
                        src: "https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/42058394_2001371916593546_1375700702336122880_n.jpg?_nc_cat=104&_nc_ht=scontent-icn1-1.xx&oh=d020f81b674fd90f797a9b2d104e8297&oe=5C98AE84"
                    },
                    {
                        src: "https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/42108749_2001371933260211_8212318537599942656_n.jpg?_nc_cat=109&_nc_ht=scontent-icn1-1.xx&oh=4bf1c27f20581da825f39de928c5cd92&oe=5C9834F3"
                    },
                    {
                        src: "https://scontent-icn1-1.xx.fbcdn.net/v/t1.0-9/42059611_2001371856593552_9159164122615513088_n.jpg?_nc_cat=102&_nc_ht=scontent-icn1-1.xx&oh=bf818ffd61df242293a98e9453ebdd1a&oe=5C98F94F",
                    },
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
        width: 93%;
        height:100%;
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