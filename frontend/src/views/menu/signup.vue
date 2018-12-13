<template>
    <div class="signup">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>

        <div class="centered-container">
            <md-content class="md-elevation-10">
                <form class="vue-form" @submit.prevent="submit">
                    <v-layout>
                        <v-flex style="margin-bottom : 3%;">
                                <v-text-field
                                        label="ID"
                                        v-model="id"
                                        placeholder="please write email address"
                                        :rules="emailRules"
                                        ></v-text-field>
                        </v-flex>
                     <v-btn @click="onDup">중복 확인</v-btn>
                    </v-layout>
                   
                    <v-layout>
                        <v-flex style=" margin-bottom : 3%;">
                            <v-text-field
                                    label="password"
                                    v-model="password"
                                    type="password"
                                    placeholder="password"
                                    :rules="passwordRules"
                            ></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex style="margin-right : 3%;">
                            <v-text-field label="이름" v-model="name" type="text" placeholder="name" ></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field     label="학번" v-model="studentId" type="number" placeholder="studentId"></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout style="margin-bottom : 5%;">
                        <v-flex style="margin-right : 3%;">
                            <v-text-field label="별명" v-model="nickname" type="text" placeholder="nickname"></v-text-field>
                        </v-flex>
                        <v-flex>
                            <v-text-field label="연락처" v-model="call" type="tel" placeholder="tel"></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-textarea
                                solo
                                v-model="textarea"
                                placeholder="introduce yourself"
                                auto-grow
                        ></v-textarea>
                    </v-layout>
                </form>

                <div class="md-layout-item">
                    <md-field>
                        <label>소속 학과</label>
                        <md-select v-model="department" name="department" id="department">
                            <md-optgroup label="정보통신대학">
                                <md-option value="소프트웨어학과">소프트웨어학과</md-option>
                                <md-option value="사이버보안학과">사이버보안학과</md-option>
                                <md-option value="전자공학과">전자공학과</md-option>
                                <md-option value="미디어학과">미디어학과</md-option>
                                <md-option value="국방디지털융합학과">국방디지털융합학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="공과대학">
                                <md-option value="기계공학과">기계공학과</md-option>
                                <md-option value="화학공학과">화학공학과</md-option>
                                <md-option value="환경공학과">환경공학과</md-option>
                                <md-option value="신소재공학과">신소재공학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="자연과학대학">
                                <md-option value="수학과">수학과</md-option>
                                <md-option value="물리학과">물리학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="경영대학">
                                <md-option value="경영학과">경영학과</md-option>
                                <md-option value="e-business 학과">e-business 학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="인문대학">
                                <md-option value="국어국문학과">국어국문학과</md-option>
                                <md-option value="영어영문학과">영어영문학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="사회과학대학">
                                <md-option value="심리학과">심리학과</md-option>
                                <md-option value="경제학과">경제학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="의과대학">
                                <md-option value="의예과">의예과</md-option>
                            </md-optgroup>
                            <md-optgroup label="간호대학">
                                <md-option value="간호학과">간호학과</md-option>
                            </md-optgroup>
                            <md-optgroup label="약학대학">
                                <md-option value="약학과">약학과</md-option>
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
            md-content="회원가입 실패"
            md-confirm-text="DONE"/>

        <md-dialog-confirm
            :md-active.sync="check"
            md-title="Check"
            md-content="가입한 이메일을 통해 이메일 인증을 진행해 주세요."
            md-confirm-text="Check"
            md-cancle-text="Cancle"
            @md-cancle="onCancle"
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
            name        : null,
            department  : null,
            call        : null,
            nickname    : null,
            studentId   : null,
            selectedInterest : [],

            fail        : false,
            check       : false,

            passwordRules: [
                v => !!v || 'Name is required',
                v => (v && v.length >= 6) || 'password must be less than 10 characters'
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid'
            ],
        }),
        
        methods:{
            signup:function(){
                this.$http.post("http://localhost:8000/user/signup",
                    {"ID":this.id, "password":this.password, "name":this.name, "department":this.department,"studentId":this.studentId,
                     "nickname":this.nickname, "call":this.call, "interest": this.selectedInterest, "birth": this.birth}).
                then((res)=>{
                        
                        if(res.data.errors){
                            let errors = res.data.errors

                            for(let error in errors){
                                alert(error+"를 입력해주세요")
                                return ;
                            }
                            return;
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
            },
            onDup: function(){
                this.$http.get("http://localhost:8000/user/dup/"+this.id).then((data)=>{
                    console.log(data.data)
                    if(!data.data){
                        alert("사용가능한 아이디입니다.")
                    }
                    else{
                        alert("중복된 아이디입니다.")
                    }
                })
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
            max-height : 1100px;
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