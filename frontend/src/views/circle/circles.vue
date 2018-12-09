<template>
    <div class="circles">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>

        <!--바탕이 되는 container-->
        <div class="centered-container" >
            <h1 class="jg ajou-title"> 동아리/소학회 정보 </h1>

            <!--그 위에 올려지는 하얀 container (elevation : 10)-->
            <md-content class="md-elevation-15">
                <md-card v-for="circle in circles" :key="circle.id" class = "md-elevation-8">

                    <v-img v-if="circle.name === 'ANSI'"
                            src="https://cdn.vuetifyjs.com/images/cards/desert.jpg"
                            aspect-ratio="2.75"
                    ></v-img>

                    <img src="../../assets/A-dong.png" v-if="circle.name === '한터'" style="resize:both; max-height:268px; margin-left: 20%;">

                    <md-card-header>
                        <div class="md-title jg" style="font-size : 30px;">{{circle.name}}</div>
                    </md-card-header>

                    <md-card-content>
                        <p class="content-circle">분류 : {{circle.party}}</p>
                        <p class="content-circle">동방 : {{circle.roomExistence}}</p>
                        <p class="content-circle">회장 이름 : {{circle.president.name}}</p>
                        <p class="content-circle">회장 연락처 : {{circle.president.call}}</p>
                        <p class="content-circle">다른 학과 가입 여부 : {{circle.othersAccept}}</p>
                        <p class="content-circle">동아리(소학회) 규모 : {{circle.memberNumber}}</p>
                        <p class="content-circle">지도 교수님 :  {{circle.professor}}</p>
                        <p class="content-circle">한줄 소개 : {{circle.introduce}}</p>
                    </md-card-content>

                    <v-card-actions>
                        <v-btn color="blue-grey lighten-1" bottom style="width : 45%; margin : auto">
                            <p class="circle_button">더 자세히</p>
                        </v-btn>
                        <v-btn color="blue-grey lighten-1" bottom style="width : 45%; margin : auto">
                            <p class="circle_button" v-on:click="check=true;signcircle=circle">가입 신청</p>
                        </v-btn>
                    </v-card-actions>
                    <md-dialog-confirm
                        :md-active.sync="check"
                        md-title="사전 공지"
                        md-content="동아리 회장의 승인 후 이용 가능합니다."
                        md-confirm-text="Check"
                        md-cancel-text="Cancle"
                        @md-cancel="onCancel"
                        @md-confirm="onCheck" />
    

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
        <v-btn v-on:click="circleSignup()">동아리 등록</v-btn>

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
        created (){
            this.$http.get('http://localhost:8000/circle/send').then((res) => {
                this.circles = res.data
            })
            this.userName = this.$session.getAll().username
            this.$http.get('http://localhost:8000/user/find/' + this.userName).then((res) => {
                this.user = res.data
            })
        },
        data() {
            return {
                userName: null,
                curPage : 1,
                dataPerPage : 6,
                circles: [],
                signcircle: {},
                user: {},
                check: false
            }
        },

        components: {
            headerBar,
            footerBar,
        },

        computed: {
            numOfPages() {
                return Math.ceil(this.circles.length / this.dataPerPage);
            },
            startOffset() {
                return ((this.curPage - 1) * this.dataPerPage);
            },
            endOffset() {
                return (this.startOffset + this.dataPerPage);
            },
            calData() {
                return this.circles.slice(this.startOffset, this.endOffset)
            }
        },
        methods: {
            circleSignup(){
                this.$router.push('/circlesignup')
            },
            onCheck: async function() {
                await this.userSignup()
                this.check = false
            },
            onCancle: function(){
                this.check = false
            },
            userSignup: function() {
                this.$http.post('http://localhost:8000/user/' + this.user.name + '/signupCircle', this.signcircle)
                .then((res) => {
                    console.log()
                    if(res.data != "err"){
                        this.$http.post('http://localhost:8000/circle/' + this.signcircle.name + '/signupCircle/', this.user)
                    }
                    else{
                        alert("이미 동아리에 가입하셨습니다.")
                    }
                })
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
            font-size : 40px;
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
