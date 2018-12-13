<template>
    <div id="board">
        <header-bar/>
        <br>
        <v-container class="container">

            <button>
                <v-icon x-large class="material-icons" @click="$router.push('/')">
                    keyboard_backspace
                </v-icon>
                <p> 홈으로 </p>
            </button>

            <h1 class="text-md-center">복구</h1>
            <v-flex style="width:100%;">
                <div class="mt-5">
                    <v-card color="amber">
                        <v-card-title>
                            복구
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
                            :items="recoverylist"
                            :search="search"
                            disable-initial-sort
                            class="elevation-1"
                            no-data-text="등록된 게시물이 없습니다."
                            prev-icon="chevron_left"
                            next-icon="chevron_right"
                            :rows-per-page-items="[10]"
                        >
                            <template slot="items" slot-scope="props">
                                <td class="text-xs-center" >{{ props.item.recoveryId }}</td>
                                <td class="text-xs-center" >{{ props.item.kind }}</td>
                                <td class="text-xs-center" >{{ props.item.title }}</td>
                                <td class="text-xs-center" >{{ props.item.contents }}</td>
                                <td class="text-xs-center" >{{ props.item.author }}</td>
                                <td class="text-xs-center" >{{ props.item.removeTime }}</td>
                                <td class="text-xs-center"  @click="onRecovery(props.item.recoveryId)">
                                    <md-button class="md-icon-button">
                                        <md-icon>restore</md-icon>
                                    </md-button>
                                </td>
                            </template>
                            <v-alert slot="no-results" :value="true" color="black--text" icon="warning">
                                Your search for "{{ search }}" found no results.
                            </v-alert>
                        </v-data-table>
                    </v-card>
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
        search: '',
        math: false,
        recoverylist: [],
        headers: [
          { text: '번호', value: 'postNum', align: 'center' /*,sortable: false*/ },
          { text: '종류', value: 'kind', align: 'center'},
          { text: '제목', value: 'title', align: 'center' },
          { text: '내용', value: 'contents', align: 'center'},
          { text: '작성자', value: 'author', align: 'center' },
          { text: '삭제 시간', value: 'date', align: 'center' },
          { text: '복구' , align: 'center'}
          //{ text: '조회수', value: 'views', align: 'center' }
        ],
        recoverys: [],
      }
    },
    components: {
        headerBar
    },
    created() {
        if(this.$session.getAll().admin==true) this.match=true;
        this.postType = this.$route.params.postType
        this.fetchData()
    },
    methods: {
        fetchData() {
            this.$http.get("http://localhost:8000/recovery/get").then((data)=>{
                let info =data.data
                let contents
                
                for(let i =0; i<info.length;i++){
                    
                    if(info.contents != undefined) contents=info[i].contents;
                    else contents=info[i].content
                    console.log(info[i])
                    this.recoverylist.push({"recoveryId":info[i].recoveryId,"title":info[i].title,"contents":contents,
                    "removeTime": info[i].removeTime.substr(0,10),"author":info[i].author,"kind":info[i].kind})
                    this.recoverys.push(info[i])
                    console.log(this.recoverylist)
                }       
            })
        },
        onRecovery: function(id){
            let restore;
            for(let i =0; i<this.recoverys.length;i++){
                if(this.recoverys[i].recoveryId==id){
                    restore = this.recoverys[i]
                    break
                }
            }

            this.$http.post("http://localhost:8000/recovery/restore",restore).then(()=>{
                window.location.reload()
            })
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