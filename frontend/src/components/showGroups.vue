<template>
    <div>
        <header-bar></header-bar>
        
        <v-container class="container">
            <button>
            <i class="material-icons" @click="$router.push('/circle/'+circleName)">
            keyboard_backspace
            </i>
            </button>
            <h1 class="text-md-center">{{circleName}} Group</h1>
            <md-table class="mt-5">
                <md-table-row>
                    <md-table-head>제목</md-table-head>
                    <md-table-head>날짜</md-table-head>
                    <md-table-head>주최자</md-table-head>
                </md-table-row>
                <md-table-row v-for="group in grouplist" :key="group.groupId" 
                @click="$router.push('/circle/'+circleName+'/group/show_group/'+group.groupId)">
                    <md-table-cell>{{group.title}}</md-table-cell>
                    <md-table-cell>{{group.date}}</md-table-cell>
                    <md-table-cell>{{group.teacher}}</md-table-cell>
                </md-table-row>
            </md-table>
            <v-btn color="blue" @click="$router.push('/circle/'+circleName+'/manage_group/create')">새글작성</v-btn>
        </v-container>
        
    </div>
</template>
<script>
    import headerBar from './header.vue'

    export default {
        data(){
          return{
                circleName: this.$route.params.circleName,
                grouplist: [],
          }  
        },
        created: function(){
          console.log(this.circleName)

          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/group").then((data)=>{
              for(let i=0;i<data.data.length;i++){
                let date = data.data[i].date.split('T')[0]
                let group={"title":data.data[i].title,"contents":data.data[i].contents,
                "date":date,"postNum":data.data[i].groupId,"author":data.data[i].teacher}
                this.grouplist.push(group)
              }
              
          })
        },
        components:{
            headerBar
        }
    }
</script>

<style lang="scss" scoped>
.container{
    margin-top: 100px
}

</style>