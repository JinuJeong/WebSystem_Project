<template>
    <div id="board">
        <header-bar/>
        <br>
        <v-container class="container">
            <v-flex style="width:100%;">
            <button>
            <i class="material-icons" @click="onBack()">
            keyboard_backspace
            </i>
            </button>
            <h1 class="text-md-center">A-dong {{kind_head}}</h1>
                <div class="mt-5">
                    <v-card color="amber">
                        <v-card-title>
                            <h2 v-if="postType == 'notice'">공지사항</h2>
                            <h2 v-else-if="postType == 'board'">자유 게시판</h2>
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
                            :items="boards"
                            :search="search"
                            disable-initial-sort
                            class="elevation-1"
                            no-data-text="등록된 게시물이 없습니다."
                            prev-icon="chevron_left"
                            next-icon="chevron_right"
                            :rows-per-page-items="[10]"
                        >
                            <template slot="items" slot-scope="props">
                                <td class="text-xs-center" @click="$router.push('/boards/'+postType+'/show_notice/'+props.item.postNum)">{{ props.item.postNum }}</td>
                                <td class="text-xs-center" @click="$router.push('/boards/'+postType+'/show_notice/'+props.item.postNum)">{{ props.item.title }}</td>
                                <td class="text-xs-center" @click="$router.push('/boards/'+postType+'/show_notice/'+props.item.postNum)">{{ props.item.author }}</td>
                                <td class="text-xs-center" @click="$router.push('/boards/'+postType+'/show_notice/'+props.item.postNum)">{{ props.item.date }}</td>
                            </template>
                            <v-alert slot="no-results" :value="true" color="black--text" icon="warning">
                                Your search for "{{ search }}" found no results.
                            </v-alert>
                        </v-data-table>
                    </v-card>
                </div>
                <div class="text-xs-right">
                    <v-btn v-if="postType == 'notice'&&match==true" dark @click="$router.push('/boards/'+postType+'/manage_notice/create')">새 글 작성</v-btn>
                    <v-btn v-if="postType == 'board'" dark @click="$router.push('/boards/'+postType+'/manage_notice/create')">새 글 작성</v-btn>
                </div>
            </v-flex>
        </v-container>
    </div> 
</template>

<script>
import headerBar from '../../components/header'
export default {
    data () {
      return {
        dialog: false,
        notifications: false,
        sound: true,
        widgets: false,
        checkbox: true,
        search: '',
        match: false,
        postType: this.$route.params.postType,
        headers: [
          { text: '번호', value: 'postNum', align: 'center' /*,sortable: false*/ },
          { text: '제목', value: 'title', align: 'center' },
          { text: '작성자', value: 'author', align: 'center' },
          { text: '등록일', value: 'date', align: 'center' },
          //{ text: '조회수', value: 'views', align: 'center' }
        ],
        boards: [],
        kind_head: "",
      }
    },
    components: {
        headerBar
    },
    created() {
        this.postType = this.$route.params.postType
        this.fetchData()
    },
    beforeRouteUpdate(to, from, next) {
        this.boards = []
        this.postType = to.params.postType
        this.search = ''
        this.fetchData()
        next()
    },
    methods: {
        fetchData() {
            this.$http.get("http://adong.cf:8000/boards/"+this.postType).then((result)=>{
                for(let i=0;i<result.data.length;i++){
                    if(this.postType == result.data[i].postType){
                        let date = result.data[i].date.split('T')[0]
                        let board={"postNum":result.data[i].postNum, "title":result.data[i].title,"author":result.data[i].author,"contents":result.data[i].contents,
                        "date":date,"full_date":result.data[i].date}
                        this.boards.push(board)
                    }
                }         
            })
            if(this.postType == 'notice') this.kind_head="공지사항"
            else this.kind_head="게시판"
            this.match=false
            if(this.$session.getAll().admin==true) this.match=true;
            else if(this.$session.exists() && this.postType=="board") this.match=true;    
        },
        onBack: function(){
            this.$router.push('/')
        }
    }
}
</script>

<style lang="scss" scoped>
.container {
    margin-top : 50px
}
</style>
