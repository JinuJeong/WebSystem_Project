<template>
    <div class="circles">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>
<<<<<<< HEAD
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
=======

        <!--바탕이 되는 container-->
        <div class="centered-container">

            <h1 class="hn ajou_title"> 아주대학교 동아리 정보 </h1>

            <!--그 위에 올려지는 Login form box (elevation : 10)-->
            <md-content class="md-elevation-15">

                <md-card>
                    <md-card-header>
                        <div class="md-title">ANSI</div>
                    </md-card-header>

                    <md-card-content>
                        <p>분류 : 소학회</p>
                        <p>소속 : 소프트웨어학과</p>
                        <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                        <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                        <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                        <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>

                    </md-card-content>

                    <v-card-actions>
                        <v-btn color="blue" bottom style="width : 270px;">
                            <p class="circle_button">더 자세히</p>
                        </v-btn>
                        <v-btn color="blue" bottom style="width : 270px;">
                            <p class="circle_button">가입 신청</p>
                        </v-btn>
                    </v-card-actions>
                </md-card>

                <md-card>
                        <md-card-header>
                             <div class="md-title jg">HANTOR</div>
                        </md-card-header>

                        <md-card-content>
                            <p class="jg">분류 : 소학회</p>
                            <p class="jg">소속 : 소프트웨어학과</p>
                            <p class="jg">소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                            <p class="jg">소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                            <p class="jg">소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                            <p class="jg">소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                        </md-card-content>

                        <md-card-actions>
                            <v-btn color="blue" bottom style="width : 270px;">
                                <p class="circle_button">더 자세히</p>
                            </v-btn>
                            <v-btn color="blue" bottom style="width : 270px;">
                                <p class="circle_button">가입 신청</p>
                            </v-btn>
                        </md-card-actions>
                    </md-card>

                    <md-card>
                        <md-card-header>
                            <div class="md-title">HANTOR</div>
                        </md-card-header>

                        <md-card-content>
                            <p>분류 : 소학회</p>
                            <p>소속 : 소프트웨어학과</p>
                            <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                            <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                            <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                            <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                        </md-card-content>

                        <md-card-actions>
                            <v-btn color="blue" bottom style="width : 270px;">
                                <p class="circle_button">더 자세히</p>
                            </v-btn>
                            <v-btn color="blue" bottom style="width : 270px;">
                                <p class="circle_button">가입 신청</p>
                            </v-btn>

                        </md-card-actions>
                    </md-card>

                    <md-card>
                        <md-card-header>
                            <div class="md-title">HANTOR</div>
                        </md-card-header>

                        <md-card-content>
                            <p>분류 : 소학회</p>
                            <p>소속 : 소프트웨어학과</p>
                            <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                            <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                            <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                            <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                        </md-card-content>

                        <md-card-actions>
                            <v-btn color="blue" bottom style="width : 270px;">
                                <p class="circle_button">더 자세히</p>
                            </v-btn>
                            <v-btn color="blue" bottom style="width : 270px;">
                                <p class="circle_button">가입 신청</p>
                            </v-btn>
                        </md-card-actions>
                    </md-card>

                    <md-card>
                         <md-card-header>
                            <div class="md-title">HANTOR</div>
                        </md-card-header>

                         <md-card-content>
                             <p>분류 : 소학회</p>
                             <p>소속 : 소프트웨어학과</p>
                             <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                             <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                             <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                             <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                        </md-card-content>

                        <md-card-actions>
                            <v-btn color="blue" bottom style="width : 270px;">
                                <p class="circle_button">더 자세히</p>
                            </v-btn>
                            <v-btn color="blue" bottom style="width : 270px;">
                                <p class="circle_button">가입 신청</p>
                            </v-btn>
                         </md-card-actions>
                    </md-card>

                    <md-card>
                        <md-card-header>
                            <div class="md-title">HANTOR</div>
                        </md-card-header>

                        <md-card-content>
                            <p>분류 : 소학회</p>
                            <p>소속 : 소프트웨어학과</p>
                            <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                            <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                            <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                            <p>소개 : 소프트웨어학과 소속 학술 소학회입니다. 주로 알고리즘을 푸는 시간을 갖습니다. </p>
                        </md-card-content>

                        <md-card-actions>
                            <v-btn color="blue" bottom style="width : 270px;">
                                <p class="circle_button">더 자세히</p>
                            </v-btn>
                            <v-btn color="blue" bottom style="width : 270px;">
                                <p class="circle_button">가입 신청</p>
                            </v-btn>
                        </md-card-actions>
                    </md-card>

                <v-pagination
                        v-model="page"
                        :length="6"
                        color="blue"
                ></v-pagination>
            </md-content>

        </div>
>>>>>>> 44447c1db9ba21807504d57946a6c1601b56dc86
    </div>
</template>

<script>
import headerBar from './header.vue'

<<<<<<< HEAD
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
=======
        data() {
            return {
                page : 1
            }
        },

        components: {
            headerBar
        },
>>>>>>> 44447c1db9ba21807504d57946a6c1601b56dc86
    }
}
</script>

<style lang="scss" scoped>

    .centered-container {
        display: flex;
        align-items: center;
        flex-direction : column;
        justify-content: center;
        position: relative;
        height: 180vh;

        .v-card{
            width : 500px;
            height : 500px;
        }

        .md-card {
            width : 600px;
            height : 400px;

            margin-left : 50px;
            vertical-align: top;


            .md-button{
                margin-bottom : 10px;
                width : 500px;

            }
        }

        .md-content {
            padding: 40px;
            width: 100%;
            height : 200%;
            max-width: 1700px;
            max-height : 1500px;
            position: relative;
            display : flex;
            justify-content : center;
            flex-wrap: wrap;
        }
    }

    .circle_button{
        color : white;
        margin-top : 10px;
    }

    .ajou_title{
        margin-bottom : 30px;
        font-size : 40px;
    }

    #first_row {

        color : red;
    }

    #all_notice {
        margin-bottom : 100px;

    }

</style>