<template>
    <div class="circlesignup">
        <header-bar></header-bar>
        <div class="centered-container">
            <md-content class="md-elevation-10">
                <form class="vue-form" @submit.prevent="submit">
                    <md-field>
                        <label>동아리명 </label>
                        <md-input v-model="name"></md-input>
                    </md-field>
                       <div class="md-layout-item">
                    <md-field>
                        <label>소속 학과</label>
                            <md-select v-model="department" name="department" id="department">
                            <md-optgroup label="정보통신대학">
                                <md-option value="software">소프트웨어학과</md-option>
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
                </form>
                <form>
                    <md-field>
                        <label>지도 교수</label>
                        <md-input v-model="professor" placeholder="교수님 성함"></md-input>
                    </md-field> 
                    <md-field>
                        <label>회장</label>
                        <md-input v-model="presidentin" placeholder="회장 학번"></md-input>
                    </md-field>                    
                    <md-button class="md-raised md-primary md-alignment-center" v-on:click="find()">회장찾기</md-button> 
                </form>
                    {{this.president.ID}}
                    {{exist}}
                    <md-field>
                        <label>회원수</label>
                        <md-input v-model="number" type="number"></md-input>
                    </md-field>
                    <md-field>
                        <label>동방 유무</label>
                        <md-input v-model="roomExistence" placeholder="1 or 0"></md-input>
                    </md-field> 
                    <md-field>
                        <label>다른 학과 가입 여부</label>
                        <md-input v-model="othersAccept" placeholder="1 or 0"></md-input>
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
                    <div class="actions md-layout md-alignment-center">
                        <md-button class="md-raised md-primary md-alignment-center" v-on:click="check=true">등록</md-button>
                        <md-button class="md-raised md-primary" href="/">홈으로</md-button>
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
            othersAccept: "",
            roomExistence: "",
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
            this.$http.post('http://localhost:8000/circle/register', this.circle).then((res) => {
                if(res.data === "err")
                    this.err = 1
                else
                    this.err = 0
            }).then(() => {
                if(this.err == 0)
                    this.$router.push('/circles')
                
                if(this.exist_num == 0){
                    alert("회장을 입력해주세요.")
                    onCancle()
                }
                else if(this.err == 1){
                    alert("양식을 모두 작성해주세요.")
                    onCancle();
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
            
            this.$http.get('http://localhost:8000/user/findById/' + this.presidentin).then((res) => {
                
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