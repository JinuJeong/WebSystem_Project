<template>
    <div class="signup">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>

        <div class="centered-container">
            <md-content class="md-elevation-10">
                <form class="vue-form" @submit.prevent="submit">

                    <v-layout>
                        <v-flex style="margin-right : 3%;">
                             <md-field>
                                <label>아이디 </label>
                                <md-input v-model="id" placeholder="ID(___@ajou.ac.kr)"></md-input>
                            </md-field>

                        </v-flex>

                    </v-layout>
                    <v-layout>
                        <v-flex style="margin-right : 3%;">
                            <md-field>
                                <label>패스워드 </label>
                                <md-input v-model="password" type="password" placeholder="password"></md-input>
                            </md-field>
                        </v-flex>
                        <v-flex >
                            <md-field>
                                <label>패스워드 확인 </label>
                                <md-input v-model="password" type="password" placeholder="password"></md-input>
                            </md-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex style="margin-right : 3%;">
                            <md-field>
                                <label>이름</label>
                                <md-input v-model="name" placeholder="name"></md-input>
                            </md-field>
                        </v-flex>
                        <v-flex>
                            <md-field>
                                <label>연락처</label>
                                <md-input v-model="call" placeholder="call"></md-input>
                            </md-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex style="margin-right : 3%;">
                                <md-field>
                                    <label>별명</label>
                                    <md-input v-model="nickname" placeholder="nickname"></md-input>
                                </md-field>
                        </v-flex>
                        <v-flex>
                                <md-field>
                                    <label>생년월일</label>
                                    <md-input v-model="birth" type="number"  placeholder="data of birth"></md-input>
                                </md-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <md-field>
                            <label>자기 소개</label>
                            <md-textarea v-model="textarea"></md-textarea>
                        </md-field>
                    </v-layout>
                </form>

                <div class="md-layout-item">
                    <md-field>
                        <label>소속 학과</label>
                        <md-select v-model="department" name="department" id="department">
                            <md-optgroup label="정보통신대학">
                                <md-option value="소프트웨어학과">소프트웨어학과</md-option>
                                <md-option value="security">사이버보안학과</md-option>
                                <md-option value="electric">전자공학과</md-option>
                                <md-option value="media">미디어학과</md-option>
                                <md-option value="Defense_digital">국방디지털융합학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="공과대학">
                                <md-option value="mechanical">기계공학과</md-option>
                                <md-option value="Chemical">화학공학과</md-option>
                                <md-option value="environmental">환경공학과</md-option>
                                <md-option value="Advanced_Materials">신소재공학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="자연과학대학">
                                <md-option value="mathematical">수학과</md-option>
                                <md-option value="Physics">물리학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="경영대학">
                                <md-option value="business">경영학과</md-option>
                                <md-option value="e-business">e-business 학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="인문대학">
                                <md-option value="korean">국어국문학과</md-option>
                                <md-option value="english">영어영문학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="사회과학대학">
                                <md-option value="Psychology">심리학과</md-option>
                                <md-option value="Economics">경제학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="의과대학">
                                <md-option value="medicine">의예과</md-option>
                            </md-optgroup>
                            <md-optgroup label="간호대학">
                                <md-option value="nursing">간호학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="약학대학">
                                <md-option value="Pharmacy">약학과</md-option>
                            </md-optgroup>
                        </md-select>
                    </md-field>
            </div>

            <div class="md-layout-item">
                <md-field>
                    <label>관심분야</label>
                    <md-select v-model="selectedInterest" name="interest" id="interest" multiple>
                        <md-option value="music">음악</md-option>
                        <md-option value="study">공부(Study)</md-option>
                        <md-option value="exercise">운동</md-option>
                        <md-option value="dance">춤</md-option>
                        <md-option value="movie">영화 & 만화</md-option>
                        <md-option value="trip">여행</md-option>
                        <md-option value="contest">공모전</md-option>
                    </md-select>
                </md-field>

                <div class="actions md-layout md-alignment-center">
                    <v-btn raised class="action-button jg" color="blue-grey lighten-1" v-on:click="check=true">가입하기</v-btn>
                    <v-btn raised class="action-button jg" color="blue-grey lighten-1" to="/">홈으로</v-btn>
                </div>
            </div>
        </md-content>

        <!--alert operation -->
        <md-dialog-alert
            :md-active.sync="fail"
            md-title="ALERT"
            md-content="SignUp Failed"
            md-confirm-text="DONE"/>

        <md-dialog-confirm
            :md-active.sync="check"
            md-title="Check"
            md-content="가입한 이메일을 통해 이메일 인증을 진행해 주세요. "
            md-confirm-text="Check"
            md-cancel-text="Cancle"
            @md-cancel="onCancel"
            @md-confirm="onCheck" />
        </div>
    </div>
</template>

<script>
    import headerBar from '../../components/header'

    export default {
        name : 'signup',

        components : {
            headerBar
        },

        data : () => ({
            id          : null,
            password    : null,
            birth       : null,
            name        : null,
            textarea    : null,
            department  : null,
            selectedInterest : [],
            call        : null,
            fail        : false,
            check       : false,
            nickname    : null,
            birth       : null
        }),
        
        methods:{
            signup:function(){
                this.$http.post("http://localhost:8000/user/signup",
                    {"ID":this.id, "password":this.password, "name":this.name, "department":this.department, "nickname":this.nickname,
                    "call":this.call, "interest": this.selectedInterest, "birth": this.birth}).then((res)=>{
                        console.log(res);

                        if(res.data.errmsg){
                            this.fail = true;
                            return res.status;
                }
                        else{
                            this.$router.push('/login');
                        }
                     })
            },

            onCheck: function() {
                this.signup()
            },
            onCancle: function(){
                return 0;
            }
        }

    }
</script>

<style lang="scss" scoped>
    .centered-container {
        display : flex;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 120vh;

        .md-content {
            z-index: 0;
            padding: 150px;
            width: 100%;
            height : 200%;
            max-width: 1000px;
            max-height : 1000px;
            position: relative;

            .md-field {
                margin-bottom : 5%;
            }

            .actions {
                margin-top : 100px;

                .action-button{
                    width : 30%;
                    color : white;
                }
            }
        }
    }
</style>