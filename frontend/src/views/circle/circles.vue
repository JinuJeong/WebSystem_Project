<template>
    <div class="circles">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>

        <!--바탕이 되는 container-->
        <div class="centered-container" >
            <h1 class="jg ajou-title"> 동아리/소학회 정보 </h1>

            <!--그 위에 올려지는 하얀 container (elevation : 10)-->
            <md-content class="md-elevation-15">
                <md-card v-for="data in calData" class = "md-elevation-8">

                    <v-img v-if="data.name === 'ANSI'"
                            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                            aspect-ratio="2.75"
                    ></v-img>

                    <img src="../../assets/A-dong.png" v-if="data.name === 'HANTOR'" style="resize:both; max-height:268px; margin-left: 20%;">

                    <md-card-header>
                        <div class="md-title jg" style="font-size : 30px;">{{data.name}}</div>
                    </md-card-header>

                    <md-card-content>
                        <p class="content-circle">분류 : {{data.category}} </p>
                        <p class="content-circle">동방 : {{data.roomexist}}</p>
                        <p class="content-circle">회장 이름 및 연락처 : {{data.president}}</p>
                        <p class="content-circle">다른 학과 가입 여부 : {{data.diff_join}}</p>
                        <p class="content-circle">동아리(소학회) 규모 : {{data.size}}</p>
                        <p class="content-circle">지도 교수님 : {{data.teach_professor}} </p>
                        <p class="content-circle">한줄 소개 : {{data.intro}} </p>
                    </md-card-content>

                    <v-card-actions>
                        <v-btn color="blue-grey lighten-1" bottom style="width : 45%; margin : auto">
                            <p class="circle_button">더 자세히</p>
                        </v-btn>
                        <v-btn color="blue-grey lighten-1" bottom style="width : 45%; margin : auto">
                            <p class="circle_button">가입 신청</p>
                        </v-btn>
                    </v-card-actions>
                </md-card>

                <div class="content-end">
                        <v-pagination
                            v-model="curPage"
                            :length="numOfPages"
                            color="blue-grey darken-2"
                            bottom
                            style="align-self : flex-end"
                     ></v-pagination>
                </div>
            </md-content>
        </div>
        <div>
            <footer-bar style="margin-top:17%"></footer-bar>
        </div>
    </div>
</template>

<script>
    import headerBar from '../../components/header'
    import footerBar from '../../components/footer'

    export default {
        name: 'circles',

        data() {
            return {
                curPage : 1,
                dataPerPage : 6,

                listData : [
                    {   category : "소프트웨어학과 소속 소학회", roomexist : "신학생회관 100호", name : "ANSI",
                        president : "홍길동 010-1234-5678", diff_join : "O",
                        size : "회원 30명", teach_professor : "오상윤 교수님",
                        intro : "소프트웨어학과 소속 학술 소학회입니다. 알고리즘을 푸는 시간을 갖습니다."},

                    {   category : "소프트웨어학과 소속 소학회", roomexist : "신학생회관 101호", name : "HANTOR",
                        president : "김고수 010-7874-5234", diff_join : "O",
                        size : "회원 27명", teach_professor : "오상윤 교수님",
                        intro : "소프트웨어학과 소속 학술 소학회입니다. C+, JAVA을 공부하는 시간을 갖습니다."},

                    {   category : "소프트웨어학과 소속 소학회", roomexist : "신학생회관 102호", name : "THIS",
                        president : "박의사 010-3333-7777", diff_join : "O",
                        size : "회원 13명", teach_professor : "오상윤 교수님",
                        intro : "소프트웨어학과 소속 음악 소학회입니다. 일주일에 한번 모임을 갖습니다."},

                    {   category : "소프트웨어학과 소속 소학회", roomexist : "신학생회관 103호", name : "Computer Club",
                        president : "고길동 017-3234-1238", diff_join : "O",
                        size : "회원 30명", teach_professor : "오상윤 교수님",
                        intro : "소프트웨어학과 소속 학술 소학회입니다. C와 C++을 공부하는 시간을 갖습니다."},

                    {   category : "미디어학과 소속 소학회", roomexist : "신학생회관 104호", name : "Dream",
                        president : "고경표 010-3434-1111", diff_join : "없음",
                        size : "회원 30명", teach_professor : "오상윤 교수님",
                        intro : "미디어학과 소속 학술 소학회입니다. 음악을 부르며 시간을 갖습니다."},

                    {   category : "중앙동아리", roomexist : "신학생회관 105호", name : "SOUL",
                        president : "민정도 010-1211-4563", diff_join : "O",
                        size : "회원 30명", teach_professor : "오상윤 교수님",
                        intro : "흑인음악을 주로 하는 음악동아리입니다. 자유롭게 가입 신청해주세요"},

                    {   category : "사이버보안학과 소속 소학회", roomexist : "신학생회관 106호", name : "Hamor",
                        president : "안박사 010-1321-3232", diff_join : "O",
                        size : "회원 30명", teach_professor : "오상윤 교수님",
                        intro : "사이버보안학과 소속 학술 소학회입니다. 보안과 해킹에 대해 공부합니다."},

                    {   category : "중앙동아리", roomexist : "신학생회관 107호", name : "BEAT",
                        president : "김민정 010-3412-3434", diff_join : "O",
                        size : "회원 30명", teach_professor : "오상윤 교수님",
                        intro : "힙합을 하는 음악동아리입니다. 매 달 한번씩 랩경연을 합니다."},

                    {   category : "중앙동아리", roomexist : "신학생회관 108호", name : "고슴도치",
                        president : "홍길동 010-1234-5678", diff_join : "O",
                        size : "회원 30명", teach_professor : "오상윤 교수님",
                        intro : "소프트웨어학과 소속 학술 소학회입니다. 알고리즘을 푸는 시간을 갖습니다."},

                    {   category : "기계 공학과 소속 소학회", roomexist : "신학생회관 109호", name : "웹사모",
                        president : "민종혁 010-1334-3478", diff_join : "O",
                        size : "회원 30명", teach_professor : "오상윤 교수님",
                        intro : "기계공학과 소속 학술 소학회입니다. 웹을 사랑하는 사람들 모임입니다."},

                    {   category : "전자공학과 소속 소학회 ", roomexist : "신학생회관 110호", name : "하늘음표",
                        president : "박카시 010-4563-5689", diff_join : "O",
                        size : "회원 30명", teach_professor : "오상윤 교수님",
                        intro : "전자공학과 소속 음악 소학회입니다. 2주에 한번씩 노래를 부르는 시간을 갖습니다."},

                    {   category : "소프트웨어학과 소속 소학회", roomexist : "신학생회관 111호", name : "플라타너스",
                        president : "홍길동 010-1234-5678", diff_join : "O",
                        size : "회원 30명", teach_professor : "오상윤 교수님",
                        intro : "소프트웨어학과 소속 음악 소학회입니다. 한달에 한번씩 정기모임을 갖습니다."},

                    {   category : "중앙동아리", roomexist : "신학생회관 112호", name : "5분쉼표",
                        president : "홍길동 010-1234-5678", diff_join : "O",
                        size : "회원 30명", teach_professor : "오상윤 교수님",
                        intro : "소프트웨어학과 소속 학술 소학회입니다. 알고리즘을 푸는 시간을 갖습니다."},

                    {   category : "중앙동아리", roomexist : "신학생회관 112호", name : "ABC",
                        president : "홍길동 010-1234-5678", diff_join : "O",
                        size : "회원 30명", teach_professor : "오상윤 교수님",
                        intro : "농구를 하는 중앙동아리입니다. 매달 1번씩 정기 대회를 갖습니다."}
                ],
            }
        },

        components: {
            headerBar,
            footerBar,
        },

        computed: {
            numOfPages() {
                return Math.ceil(this.listData.length / this.dataPerPage);
            },
            startOffset() {
                return ((this.curPage - 1) * this.dataPerPage);
            },
            endOffset() {
                return (this.startOffset + this.dataPerPage);
            },
            calData() {
                return this.listData.slice(this.startOffset, this.endOffset)
            }
        }
    }
</script>

<style lang="scss" scoped>

    /*가장 밑에 깔리는 container*/
    .centered-container {
        display: flex;
        align-items: center;
        flex-direction : column;
        padding : 5%;
        justify-content: center;
        position: relative;
        height: 80%;
        width : 100%;

        /*동아리정보 Title*/
        .ajou-title{
            margin-bottom : 2%;
            font-size : 20px;
            position : relative;
        }

        /*그 위에 올려지는 하얀 container (elevation : 10)*/
        .md-content {
            z-index: 1;
            padding: 40px;
            width: 100%;
            height : 700%;
            max-width: 1700px;
            max-height : 3000px;
            position: relative;
            display : flex;
            justify-content : center;
            align-items: center;
            flex-wrap: wrap;


            /*각각의 동아리를 나타내는 card*/
            .md-card {
                width : 45%;
                height : 40%;
                margin-left : 2%;
                margin-bottom : 3%;
                vertical-align: top;

                /*(더 자세히), (가입 신청) 버튼*/
                .circle_button{
                    color : white;
                    margin-top : 10px;
                }

                .content-circle{
                    font-size : 17px;
                }
            }
        }

    }

</style>
