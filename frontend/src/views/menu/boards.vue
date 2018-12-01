<template>
    <div id="board">
    <header-bar/>
    <br>
    <v-flex xs12 sm10 offset-sm1>
        <div class="centered-container">
            <v-card color="blue lighten-4">
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
                    class="elevation-1"
                >
                    <template slot="items" slot-scope="props">
                        <td class="text-xs-center" @click="$router.push('/boards/'+boardName+'/show_notice/'+props.item.postTitle+'/'+props.item.full_date)">{{ props.item.postNum }}</td>
                        <td class="text-xs-center" @click="$router.push('/boards/'+boardName+'/show_notice/'+props.item.postTitle+'/'+props.item.full_date)">{{ props.item.postTitle }}</td>
                        <td class="text-xs-center" @click="$router.push('/boards/'+boardName+'/show_notice/'+props.item.postTitle+'/'+props.item.full_date)">{{ props.item.postWriter }}</td>
                        <td class="text-xs-center" @click="$router.push('/boards/'+boardName+'/show_notice/'+props.item.postTitle+'/'+props.item.full_date)">{{ props.item.postDate }}</td>
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
          { text: '제목', value: 'postTitle', align: 'center' },
          { text: '작성자', value: 'postWriter', align: 'center' },
          { text: '등록일', value: 'postDate', align: 'center' },
          //{ text: '조회수', value: 'views', align: 'center' }
        ],
        boards: []
      }
    },
    components: {
        headerBar
    },
    created: function(){
        this.$http.get("http://localhost:8000/boards/"+this.boardName).then((result)=>{
            for(let i=0;i<result.data.length;i++){
                let date = result.data[i].postDate.split('T')[0]
                let board={"postTitle":result.data[i].postTitle,"postWriter":result.data[i].postWriter,"postContent":result.data[i].postContent,
                "postDate":date,"full_date":result.data[i].postDate}
                this.boards.push(board)
            }         
        })
    }
}
</script>

<style lang="scss" scoped>

</style>