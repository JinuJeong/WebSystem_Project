<template>
<div id="app">
    <form v-on:submit.prevent="onSubmit">
      NAME <input v-model="namein" type="text">
      PARTY <input v-model="partyin" type="text">
      ROOM <input v-model="roomin" type="boolean">
      <input v-on:click="sendCircle()" type="submit" value="ADD">
    </form>
    <h1>동아리 목록</h1>
    <div v-for="circle in circles" :key="circle.id">
      <h2>{{circle.name}}</h2>
      <h3>소속 : {{circle.party}}</h3>
    </div>

</div>
</template>

<script>
// :key="xx" is essential.
export default {
  created () {
    this.$http.get('/circle/send').then((res) => { // this == this Vue component
      this.circles = res.data
    })
  },
  data () {
    return {
      circles: [],
      object: {name: String, party: String, roomExistence: Boolean}
    }
  },
  methods: {
    sendCircle: function () {
      this.object = {name: this.namein, party: this.partyin, roomExistence: this.roomin}
      this.$http.post('/circle/create', this.object)
    }
  }
}
</script>
