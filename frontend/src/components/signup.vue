<template>
    <div class="signup">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>

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
        </div>
    </div>
</template>

<script>
    import headerBar from './header.vue'
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
