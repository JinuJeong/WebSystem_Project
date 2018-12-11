<template>
    <div id="board">
        <header-bar/>
        <br>
        <v-container class="container">
            <v-flex style="width:100%;">
                <div class="centered-container">
                    <v-card color="amber">
                        <v-card-title>
                            게시판
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
                                <td class="text-xs-center" @click="$router.push('/boards/'+boardName+'/show_notice/'+props.item.postNum)">{{ props.item.postNum }}</td>
                                <td class="text-xs-center" @click="$router.push('/boards/'+boardName+'/show_notice/'+props.item.postNum)">{{ props.item.title }}</td>
                                <td class="text-xs-center" @click="$router.push('/boards/'+boardName+'/show_notice/'+props.item.postNum)">{{ props.item.author }}</td>
                                <td class="text-xs-center" @click="$router.push('/boards/'+boardName+'/show_notice/'+props.item.postNum)">{{ props.item.date }}</td>
                            </template>
                            <v-alert slot="no-results" :value="true" color="black--text" icon="warning">
                                Your search for "{{ search }}" found no results.
                            </v-alert>
                        </v-data-table>
                    </v-card>
                </div>
                <div class="text-xs-right">
                    <v-btn color="primary" dark @click="$router.push('/boards/'+boardName+'/manage_notice/create')">새 글 작성</v-btn>
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
        boardName: this.$route.params.boardName,
        headers: [
          { text: '번호', value: 'postNum', align: 'center' /*,sortable: false*/ },
          { text: '제목', value: 'title', align: 'center' },
          { text: '작성자', value: 'author', align: 'center' },
          { text: '등록일', value: 'date', align: 'center' },
          //{ text: '조회수', value: 'views', align: 'center' }
        ],
        boards: []
      }
    },
    components: {
        headerBar
    },
    created() {
        this.boardName = this.$route.params.boardName
        this.fetchData()
    },
    beforeRouteUpdate(to, from, next) {
        this.boards = []
        this.boardName = to.params.boardName
        this.search = ''
        this.fetchData()
        next()
    },
    methods: {
        fetchData() {
            this.$http.get("http://localhost:8000/boards/"+this.boardName).then((result)=>{
                for(let i=0;i<result.data.length;i++){
                    if(this.boardName == result.data[i].postType){
                        let date = result.data[i].date.split('T')[0]
                        let board={"postNum":result.data[i].postNum, "title":result.data[i].title,"author":result.data[i].author,"contents":result.data[i].contents,
                        "date":date,"full_date":result.data[i].date}
                        this.boards.push(board)
                    }
                }         
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.container {
    margin-top : 50px
}
</style>