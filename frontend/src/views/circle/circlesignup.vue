<template>
    <div class="circlesignup">
        <header-bar></header-bar>
        <div class="centered-container">
            <md-content class="md-elevation-10">

                <v-layout>
                    <v-flex style="text-align : center; margin-bottom : 5%;">
                        <h1> 동아리 등록 </h1>
                    </v-flex>
                </v-layout>

                <form class="vue-form" @submit.prevent="submit">
                    <v-layout>
                        <v-flex style="margin-bottom : 3%;">
                            <v-text-field label="동아리명" v-model="name"></v-text-field>
                        </v-flex>
                    </v-layout>

                    <v-layout>
                        <v-flex style="margin-right : 3%;">
                            <v-text-field label="지도 교수" v-model="professor" type="text"></v-text-field>
                        </v-flex>
                        <v-flex d-inline-flex>
                            <v-text-field label="회장 학번" v-model="presidentin" type="text" style="width:100%;"></v-text-field>
                            <v-btn v-on:click="find()" style="width:15%;">회장찾기</v-btn>
                            {{this.president.ID}}
                            {{exist}}
                        </v-flex>
                    </v-layout>

                    <v-layout style="margin-bottom : 5%;">
                        <v-flex style="margin-right : 3%;">
                            <v-checkbox on-icon="radio_button_checked" off-icon="radio_button_unchecked" label="동방 여부" v-model="roomExistence"></v-checkbox>
                        </v-flex>
                        <v-flex>
                            <v-checkbox on-icon="radio_button_checked" off-icon="radio_button_unchecked" label="타과 가입여부" v-model="othersAccept"></v-checkbox>
                        </v-flex>
                        <v-flex>
                            <v-text-field label="회원수" v-model="number" type="number" style="width:100%;"></v-text-field>
                        </v-flex>
                    </v-layout>

                    <div class="md-layout-item">
                        <md-field>
                            <label>소속 학과</label>
                                <md-select v-model="department" name="department" id="department">
                                <md-optgroup label="정보통신대학">
                                    <md-option value="소프트웨어학과">소프트웨어학과</md-option>
                                    <md-option value="사이버보안학과">사이버보안학과</md-option>
                                    <md-option value="전자공학과">전자공학과</md-option>
                                    <md-option value="미디어학과">미디어학과</md-option>
                                    <md-option value="국방디지털학과">국방디지털융합학과</md-option>
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

                        <md-field>
                            <label>동아리컨셉</label>
                            <md-select v-model="concept" multiple>
                                <md-option value="music">음악</md-option>
                                <md-option value="study">공부(Study)</md-option>
                                <md-option value="exercise">운동</md-option>
                                <md-option value="dance">춤</md-option>
                                <md-option value="movie">영화 & 만화</md-option>
                                <md-option value="trip">여행</md-option>
                                <md-option value="contest">공모전</md-option>
                            </md-select>
                        </md-field>
                        <md-field>
                            <label>동아리소개</label>
                            <md-textarea v-model="introduce"></md-textarea>
                        </md-field>
                    </div>
                </form>

                <div class="actions md-layout md-alignment-center">
                    <v-btn raised class="action-button jg" color="blue-grey lighten-1" v-on:click="check=true">등록</v-btn>
                    <v-btn raised class="action-button jg" color="blue-grey lighten-1" to="/" style="color : white;">홈으로</v-btn>
                </div>
            </md-content>
        </div>

        <md-dialog-confirm
        :md-active.sync="check"
        md-title="Check"
        md-content="동아리는 관리자의 승인 후 웹페이지에 등록됩니다."
        md-confirm-text="Check"
        md-cancle-text="Cancle"
        @md-cancle="onCancle"
        @md-confirm="onCheck" />
    </div>
</template>

<script>
import headerBar from '../../components/header'
    
export default {
    name: 'circlesignup',
    data () {
        return {
            circle: {},
            president: {},
            exist: "",
            exist_num: 0,
            name: null,
            autogrow: null,
            check: false,
            concept: [],
            err: Number,
            introduce: "",
            othersAccept: false,
            roomExistence: false,
            number: "",
            presidentin: "",
            professor: "",
            department: "",
        }
    },
    components: {
        headerBar
    },
    methods: {
        register: function () {
            this.circle = {name: this.name, party: this.department, memberNumber: this.number
            , concept: this.concept, introduce: this.introduce, president: this.president, professor: this.professor
            , roomExistence: this.roomExistence, othersAccept: this.othersAccept}
            this.$http.post('http://adong.cf:8000/circle/register', this.circle).then((res) => {
                if(res.data === "err")
                    this.err = 1
                else
                    this.err = 0
            }).then(() => {
                if(this.err == 0)
                    this.$router.push('/circles')
                
                if(this.exist_num == 0){
                    alert("회장을 입력해주세요.")
                    this.onCancle()
                }
                else if(this.err == 1){
                    alert("양식을 모두 작성해주세요.")
                    this.onCancle();
                }
            })
        },
        onCheck: function() {
                this.register()
        },
        onCancle: function() {
            this.check = false
        },
        find: function () {
            
            this.$http.get('http://adong.cf:8000/user/findById/' + this.presidentin).then((res) => {
                
                this.president = res.data
            }).then(() => {
                if(this.president){
                    this.exist = "위 아이디로 회원이 등록되어 있습니다."
                    this.exist_num = 1
                }
                else{
                    this.exist = "해당하는 아이디가 존재하지 않습니다."
                    this.exist_num = 0
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
            max-height : 1000px;
            position: relative;

            .actions {
                margin-top : 100px;
            }
        }
    }


</style>
