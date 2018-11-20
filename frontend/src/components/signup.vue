<template>
    <div class="signup">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>

<<<<<<< HEAD
        <md-empty-state
            md-icon="devices_other"
            md-label="page for signup"
            md-description="회원가입을 위한 페이지 입니다.">
        </md-empty-state>

        <div id="app">
        <form v-on:submit.prevent="onSubmit">
        NAME <input v-model="findin" type="text">
        <input v-on:click="findOne()" type="submit" value="FIND">
        </form>
        {{findcircle}}
        <form v-on:submit.prevent="onSubmit">
        NAME <input v-model="namein" type="text">
        PARTY <input v-model="partyin" type="text">
        ROOM <input v-model="roomin" type="boolean">
        <input v-on:click="sendCircle()" type="submit" value="동아리">
        </form>

        <form>
        NAME <input v-model="idin" type="text">
        <input v-on:click="sendUser()" type="submit" value="유저">
        </form>

        <h1>동아리 목록</h1>
        <div v-for="circle in circles" :key="circle.id">
        <h2>{{circle.name}}</h2>
        <h3>소속 : {{circle.party}}</h3>
        </div>
=======

        <div class="centered-container">

            <md-content class="md-elevation-10">
            <form class="vue-form" @submit.prevent="submit">
            <md-field>
                <label>아이디 </label>
                <md-input v-model="id" placeholder="ID(___@ajou.ac.kr)"></md-input>
            </md-field>

            <md-field>
                <label>패스워드 </label>
                <md-input v-model="password" type="password" placeholder="password"></md-input>
            </md-field>

            <md-field>
                <label>이름</label>
                <md-input v-model="name" placeholder="name"></md-input>
            </md-field>

            <md-field>
                <label>생년월일</label>
                <md-input v-model="number" type="number"  placeholder="data of birth"></md-input>
            </md-field>

            <md-field>
                <label>자기 소개</label>
                <md-textarea v-model="textarea"></md-textarea>
            </md-field>
            </form>

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

            <div class="md-layout-item">


                <md-field>
                    <label>관심분야</label>
                    <md-select v-model="selectedInterest" name="Interest" id="Interest" multiple>
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
                    <md-button class="md-raised md-primary md-alignment-center">가입하기</md-button>
                    <md-button class="md-raised md-primary" href="/">홈으로</md-button>
                </div>
            </div>
        </md-content>
>>>>>>> 0a6a6208730c201e499d571f5a6e7f4679e2e2b3
        </div>
    </div>
</template>

<script>
    import headerBar from './header.vue'

    export default {
        name: 'signup',

        components: {
            headerBar
        },

        data : () => ({
            id: null,
            password: null,
            inline: null,
            name: null,
            textarea: null,
            autogrow: null,
            disabled: null,
            department : null,

<<<<<<< HEAD
export default {
  name: 'signup',
  created () {
    this.$http.get('/circle/send').then((res) => { // this == this Vue component
      this.circles = res.data
    })
  },
  data () {
    return {
      circles: [],
      object: {name: String, party: String, roomExistence: Boolean},
      findcircle: {name: String, party: String, roomExistence: Boolean},
      user: {id: String, password: String}
    }
  },
  methods: {
    sendCircle: function () {
      this.object = {name: this.namein, party: this.partyin, roomExistence: this.roomin}
      this.$http.post('/circle/create', this.object)
    },
    sendUser: function () {
      this.user = {id: this.idin}
      this.$http.post('/user/create', this.user)
    },
    findOne: function () {
      this.$http.get('/circle/find/' + this.findin).then((res) => {
        this.findcircle = res.data
      })
    }
  },
  components: {
    headerBar
  }
}
=======
            selectedInterest: []
        })

    }
>>>>>>> 0a6a6208730c201e499d571f5a6e7f4679e2e2b3
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