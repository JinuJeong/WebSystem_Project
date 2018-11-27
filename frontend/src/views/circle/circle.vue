<template>
    <div id="home">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>
        <div id='title'>
           <span class="md-display-3">{{ $route.params.name }}</span>
        </div>
          <v-container fluid grid-list-md>
          <v-flex
        xs12
        sm6
        md4
        lg3
      >
      <v-card>
          <v-card-title class="subheading font-weight-bold">일정</v-card-title>
          <v-divider></v-divider>
          <v-list dense>
            <v-list-tile>
              <v-list-tile-content>MT</v-list-tile-content>
              <v-list-tile-content class="align-end">11일</v-list-tile-content>
            </v-list-tile>
          </v-list>
      </v-card>
    </v-flex>

  </v-container>

    </div>
</template>

<script>
    import headerBar from '../../components/header'

    export default {
        name: 'home',
        data(){
          return{
              links: [
                  'Home',
                  'About Us',
                  'Team',
                  'Services',
                  'Blog',
                  'Contact Us'
              ],

              items:[{name:"jinu"}]
          }  
        },
        components: {
            headerBar
        },
    }
</script>

<style>
 .md-card {
    width: 320px;
    margin: 4px;
    display: inline-block;
    vertical-align: top;
  }
  .centered-container {
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

  }
  .viewport {
    width: 320px;
    max-width: 100%;
    display: inline-block;
    vertical-align: top;
    overflow: auto;
    margin-left: 10px
  }
  .md-list-item-text{
    font-size: 15px;
    
  }
  #title{
    margin-top:20px;
    text-align: center;
  }
</style>