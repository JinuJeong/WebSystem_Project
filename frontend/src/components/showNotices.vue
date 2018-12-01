<template>
    <div>
        <header-bar></header-bar>
        
        <v-container class="container">
            <button>
            <i class="material-icons" @click="$router.push('/circle/'+circleName)">
            keyboard_backspace
            </i>
            </button>
            <h1 class="text-md-center">{{circleName}} {{kind_head}}</h1>
            <md-table class="mt-5">
                <md-table-row>
                    <md-table-head>제목</md-table-head>
                    <md-table-head>날짜</md-table-head>
                    <md-table-head>작성자</md-table-head>
                </md-table-row>
                <md-table-row v-for="notice in noticelists" :key="notice.full_date " 
                @click="$router.push('/circle/'+circleName+'/show_notice/'+notice.title+'/'+notice.full_date)">
                    <md-table-cell>{{notice.title}}</md-table-cell>
                    <md-table-cell>{{notice.date}}</md-table-cell>
                    <md-table-cell>{{notice.author}}</md-table-cell>
                </md-table-row>
            </md-table>
            <v-btn color="blue" @click="$router.push('/circle/'+circleName+'/board/'+kind+'/manage_notice/create')">새글작성</v-btn>
        </v-container>
        
    </div>
</template>
<script>
    import headerBar from './header.vue'

    export default {
        data(){
          return{
                circleName: this.$route.params.circleName,
                noticelists: [],
                kind: this.$route.params.kind,
                kind_head: String,      //<h1>에 들어갈 제목
          }  
        },
        created: function(){
          console.log(this.circleName)

          if(this.kind=="notice") this.kind_head="공지사항"
          else if(this.kind="board") this.kind_head="게시판"

          this.$http.get("http://localhost:8000/circle/"+this.circleName+"/board/"+this.kind).then((data)=>{
              for(let i=0;i<data.data.length;i++){
                let date = data.data[i].date.split('T')[0]
                let notice={"title":data.data[i].title,"contents":data.data[i].contents,
                "date":date,"full_date":data.data[i].date,"author":data.data[i].author}
                this.noticelists.push(notice)
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