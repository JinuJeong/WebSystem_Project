<template>
    <div class="circles">
        <!--항상 상단에 떠있는 bar-->
        <header-bar class="mb-5"></header-bar>


        <!--바탕이 되는 container-->
        <div class="centered-container">
            <h1 class="jg ajou-title"> 동아리/소학회 정보 </h1>

            <!--그 위에 올려지는 하얀 container (elevation : 10)-->
            <md-content class="md-elevation-15">

                <div class="content-end container-two" style="display : flex; justify-content : flex-end; flex-direction : row">

                    <v-form style="display : flex; justify-content: flex-end; flex-direction : row; width : 50%;">

                        <md-field>
                            <label> search_category</label>
                            <md-select v-model="search_select" name="search" id="search">
                                <md-option value="name">동아리이름</md-option>
                                <md-option value="professor">지도교수님</md-option>
                                <md-option value="president">회장</md-option>
                                <md-option value="subject">학과</md-option>
                            </md-select>
                        </md-field>

                        <v-text-field v-model="search_value" required style="margin-top : 0.9%; margin-left : 3%;width : 70%;"></v-text-field>

                        <v-btn @click="search()" style="width : 250px; margin-top : 1%;"> 검색 </v-btn>
                    </v-form>
                </div>

                <div class="container-one">
                    <md-card v-for="circle in calData" :key="circle.id" class = "md-elevation-8" style="max-width : 50%; height : 500px;">

                        <md-card-header>
                            <div class="md-title jg" style="font-size : 30px;">{{circle.name}}</div>
                        </md-card-header>

                        <md-card-content>
                            <p class="content-circle">분류 : {{circle.party}}</p>
                            <p v-if="circle.roomExistence == 1" class="content-circle">동방 : 있어요</p>
                            <p v-if="circle.roomExistence == 0" class="content-circle">동방 : 없어요</p>
                            <p class="content-circle">회장 이름 : {{circle.president.name}}</p>
                            <p class="content-circle">회장 연락처 : {{circle.president.call}}</p>
                            <p v-if="circle.othersAccept === 1" class="content-circle">다른 학과 가입 여부 : 가능해요</p>
                            <p v-if="circle.othersAccept === 0" class="content-circle">다른 학과 가입 여부 : 불가해요</p>
                            <p class="content-circle">동아리(소학회) 규모 : {{circle.memberNumber}}</p>
                            <p class="content-circle">지도 교수님 :  {{circle.professor}}</p>
                            <p class="content-circle">동아리 컨셉 : {{circle.concept}}</p>
                            <p class="content-circle" v-if="circle.introduce.length > 91">한줄 소개 : {{circle.introduce.substr(0,90)}}...</p>
                            <p class="content-circle" v-if="circle.introduce.length <= 91">한줄 소개 : {{circle.introduce.substr(0,90)}}</p>
                            <p class="content-circle"></p>
                        </md-card-content>

                        <v-card-actions>
                            <v-btn color="blue-grey lighten-1" bottom  :to="'/circle/' + circle.name" style="width : 45%; margin : auto">
                                <p class="circle_button">더 자세히</p>
                            </v-btn>
                            <v-btn v-on:click="check=true; signcircle=circle" color="blue-grey lighten-1" bottom style="width : 45%; margin : auto">
                                <p class="circle_button">가입 신청</p>
                            </v-btn>
                        </v-card-actions>
                        <md-dialog-confirm
                                :md-active.sync="check"
                                md-title="사전 공지"
                                md-content="동아리 회장의 승인 후 이용 가능합니다."
                                md-confirm-text="Check"
                                md-cancle-text="Cancle"
                                @md-cancle="onCancle"
                                @md-confirm="onCheck" />
                    </md-card>
                </div>
                <md-dialog-confirm
                        :md-active.sync="check"
                        md-title="Check"
                        md-content="정말 동아리에 가입하시겠습니까?"
                        md-confirm-text="Check"
                        md-cancel-text="Cancle"
                        @md-cancel="onCancle"
                        @md-confirm="onCheck" />

                <div class="content-end container-two" style="display : flex; justify-items : center; flex-direction : column">
                    <v-pagination
                            v-model="curPage"
                            :length="numOfPages"
                            color="blue-grey darken-2"
                            bottom
                            next-icon="chevron_right"
                            prev-icon ="chevron_left"
                    ></v-pagination>
                </div>
            </md-content>

            <v-btn v-on:click="circleSignup()">동아리 등록</v-btn>
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
        created (){
            this.$http.get('http://adong.cf:8000/circle/send').then((res) => {
                this.allCircles = res.data
            }).then(() => {

                for(var i = 0; i < this.allCircles.length; i++){
                    if(this.allCircles[i].auth == true)
                        this.circles.push(this.allCircles[i])
                }
            })
            this.userName = this.$session.getAll().username
            this.userstudentId = this.$session.getAll().userstudentId;
            this.$http.get('http://adong.cf:8000/user/findById/' + this.userstudentId).then((res) => {
                this.user = res.data
            })
        },
        data() {
            return {
                userName: null,
                curPage : 1,
                dataPerPage : 6,
                food1 : null,
                search_value : '',
                search_category : ['name', 'professor'],
                search_select : null,
                items: ['Foo', 'Bar', 'Fizz', 'Buzz'],
                allCircles: [],
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
            onCheck: function() {
                this.userSignup()
            },
            onCancle: function(){
                this.check = false
            },
            userSignup: function() {
                this.$http.post('http://adong.cf:8000/user/' + this.userstudentId + '/signupCircle', this.signcircle)
                    .then((res) => {
                        if(res.data !== "err"){
                            this.$http.post('http://adong.cf:8000/circle/' + this.signcircle.name + '/signupCircle/', this.user)
                        }
                        else{
                            if(this.$session.exists())
                                alert("이미 동아리에 가입하셨습니다.")
                            else
                                alert("로그인해주세요.")
                        }
                    })
            },
            search: function() {
                this.$http.post('http://adong.cf:8000/circle/send/search',
                    {"search_value": this.search_value, "search_select" : this.search_select})
                    .then((res) => {
                        this.circles = res.data
                        this.search_value = ""
                        this.search_select = ""
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
            flex-direction: column;
            .container-one {
                z-index: 1;
                padding: 15px;
                width: 100%;
                height : 300%;
                position: relative;
                display : flex;
                justify-content : center;
                align-items: center;
                flex-wrap: wrap;
                /*각각의 동아리를 나타내는 card*/
                .md-card {
                    width: 45%;
                    height: 40%;
                    margin-left: 2%;
                    margin-bottom: 3%;
                    vertical-align: top;
                    /*(더 자세히), (가입 신청) 버튼*/
                    .circle_button {
                        color: white;
                        margin-top: 10px;
                    }
                    .content-circle {
                        font-size: 17px;
                    }
                }
            }
            .container-two {
                z-index: 1;
                padding: 10px;
                width: 100%;
                height : 100%;
                position: relative;
                display : flex;
                justify-content : center;
                align-items: center;
                flex-wrap: wrap;
            }
        }
    }
</style>