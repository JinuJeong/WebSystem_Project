<template>
    <div>
        <header-bar></header-bar>
        
        <v-container class="container">
            <v-flex style="width:100%;">
                <button>
                <i class="material-icons" @click="onBack()">
                keyboard_backspace
                </i>
                </button>
                <h1 class="text-md-center">{{circleName}} {{kind_head}}</h1>
                <div class="centered-container">
                        <v-card color="amber" class="mt-5">
                            <v-card-title>
                                <h2>{{kind_head}}</h2>
                                <v-spacer/>
                                <v-text-field  
                                    v-model="search"
                                    append-icon="search"
                                    label="Search"
                                    single-line
                                    hide-details
                                />
                            </v-card-title>
                            <v-data-table
                                :headers="headers"
                                :items="noticelists"
                                :search="search"
                                disable-initial-sort
                                next-icon="chevron_right"
                                prev-icon ="chevron_left"
                                no-data-text="등록된 게시물이 없습니다."
                                class="elevation-1"
                                :rows-per-page-items="[]"
                            >
                                <template slot="items" slot-scope="props">
                                    <td class="text-xs-center" @click="$router.push('/circle/'+circleName+'/board/'+postType+'/show_notice/'+props.item.postNum)">{{ props.item.postNum }}</td>
                                    <td class="text-xs-center" @click="$router.push('/circle/'+circleName+'/board/'+postType+'/show_notice/'+props.item.postNum)">{{ props.item.title }}</td>
                                    <td class="text-xs-center" @click="$router.push('/circle/'+circleName+'/board/'+postType+'/show_notice/'+props.item.postNum)">{{ props.item.author }}</td>
                                    <td class="text-xs-center" @click="$router.push('/circle/'+circleName+'/board/'+postType+'/show_notice/'+props.item.postNum)">{{ props.item.date }}</td>
                                </template>
                                <v-alert slot="no-results" :value="true" color="black--text" icon="warning">
                                    Your search for "{{ search }}" found no results.
                                </v-alert>
                            </v-data-table>
                        </v-card>
                    </div>
                <v-btn v-if="auth==true" dark @click="$router.push('/circle/'+circleName+'/board/'+postType+'/manage_notice/create')">새 글 작성</v-btn>
            </v-flex>
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
                postType: this.$route.params.postType,
                kind_head: String,      //<h1>에 들어갈 제목
                search:"",
                headers: [
                { text: '번호', value: 'postNum', align: 'center'},
                { text: '제목', value: 'title', align: 'center' },
                { text: '작성자', value: 'author', align: 'center' },
                { text: '등록일', value: 'date', align: 'center' },
                //{ text: '조회수', value: 'views', align: 'center' }
                ],
                auth: false,  // 새글작성 권한
          }  
        },
        created: function(){
          if(this.$session.getAll().admin==true) this.auth=true;
          else if(this.$session.getAll().president==this.circleName) this.auth =true;
          else if(this.postType=="board" && this.$session.getAll().circles.indexOf(this.circleName)>-1) this.auth = true;

          if(this.postType=="notice") this.kind_head="공지사항"
          else if(this.postType="board") this.kind_head="게시판"

          this.$http.get("http://adong.cf:8000/circle/"+this.circleName+"/board/"+this.postType).then((data)=>{
              for(let i=0;i<data.data.length;i++){
                let date = data.data[i].date.split('T')[0]
                let notice={"title":data.data[i].title,"contents":data.data[i].contents,
                "date":date,"postNum":data.data[i].postNum,"author":data.data[i].author}
                this.noticelists.push(notice)
              }
              
          })
        },
        components:{
            headerBar
        },
        methods:{
            onBack:function(){
                history.back();
            }
        }
        
    }
</script>

<style lang="scss" scoped>
.container{
    margin-top: 100px
}

</style>
