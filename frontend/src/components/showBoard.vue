    <template>
    <div>
        <header-bar/>
        <v-container class="container">

            <div style="padding : 3%;">
                <button>
                    <v-icon x-large class="material-icons" @click="onClear">
                        keyboard_backspace
                    </v-icon>
                    <p> 뒤로가기 </p>
                </button>

                <v-list class="md-elevation-3" style="min-height : 70px; margin-bottom : 1%;">
                    <v-list-tile>
                        <v-list-tile-content><h1>공지사항</h1></v-list-tile-content>
                    </v-list-tile>
                </v-list>
                <v-divider/>
                <v-list class="md-elevation-4">
                    <v-list-tile style="min-height : 70px;">
                        <v-list-tile-content><h2 class="jg">{{title}}</h2></v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile style="min-height : 10px;">
                        <v-list-tile-content><p class="jg"> {{author}}</p></v-list-tile-content>
                        <v-list-tile-content class="align-end"><p class="jg">{{date.substr(0,10)}} {{date.substr(10,10).substr(1,8)}}</p></v-list-tile-content>
                    </v-list-tile>
                    <v-divider/>

                    <v-list-tile style="min-height : 500px; padding:3%;">
                        <v-list-tile-content><p id="content">{{contents}}</p></v-list-tile-content>
                    </v-list-tile>

                    <v-btn v-if="match==true" @click="onEdit">Edit</v-btn>
                    <v-btn v-if="match==true" @click="onDelete">delete</v-btn>
                </v-list>

                <v-divider style="margin-bottom : 5%;"/>

                <div v-for="cmt in cmts" v-bind:key="cmt._id" style="margin-bottom : 5%;">
                    <div v-if="isCmtChanging!=cmt._id">
                        <v-textarea
                            box
                            readonly
                            auto-grow
                            background-color="white"
                            :label="cmt.author"
                            v-model="cmt.cmtContent"
                            class="textarea"
                            rows="1"
                            style="margin-bottom : 0.1%;"
                        />
                        <v-btn flat small color="inherit" class="button" @click="_id=cmt._id; setIsCmtChanging();"><p style="font-size : 20px;">댓글 수정</p></v-btn>
                        <v-btn flat small color="inherit" class="button" @click="_id=cmt._id; onCmtDelete();"><p style="font-size : 20px;">댓글 삭제</p></v-btn>
                    </div>
                    <div v-else style="margin-bottom : 5%;" class="ng" >
                        <v-textarea
                            auto-grow
                            background-color="light-blue lighten-5"
                            :label="cmt.author"
                            v-model="cmt.cmtContent"
                            color="blue"
                            class="textarea"
                            rows="1"
                            style="margin-bottom : 0.1%; "
                            height="100"
                        />
                        <v-btn flat small color="inherit" class="button" @click="_id=cmt._id; cmtContent=cmt.cmtContent; onCmtChange();"><p style="font-size : 20px;">수정 완료</p></v-btn>
                        <v-btn flat small color="inherit" class="button" @click="_id=cmt._id; cmtChangeCancel();"><p style="font-size : 20px;">취소</p></v-btn>
                    </div>
                </div>

                <v-textarea
                    box
                    auto-grow
                    v-model="cmtContent"
                    class="textarea"
                    rows="1"
                    placeholder="댓글을 입력해주세요."
                    style="margin-bottom : 0.1%;"
                />
                <v-btn flat small color="inherit" :disabled="cmtContent==''" @click="onCmtSubmit"><p style="font-size : 20px;">댓글 작성</p></v-btn>
            </div>
        </v-container>
    </div>
</template>

<script>
    import headerBar from './header.vue'

    export default {
        name: 'showBoard',
        data(){
            return{
                postNum: this.$route.params.postNum,
                title           : "",
                contents        : "",
                author          : "",
                date            : "",

                match           : false,

                cmts            : [],
                cmtMatch        : false,
                cmtContent      : "",
                boardName       : this.$route.params.boardName,
                userName        : this.$session.getAll().username,

                _id             : "",
                isCmtChanging   : "",
                recovery        : "",
            }
        },
        created: function(){
            console.log(this.date)
            this.$http.get("http://localhost:8000/boards/"+this.boardName+"/"+this.postNum).then((result)=>{
                this.title = result.data.title
                this.contents = result.data.contents
                this.cmts = result.data.comment
                this.author = result.data.author
                this.date = result.data.date
                this.recovery=result.data
                // console.log(this.contents)

                if(this.$session.getAll().admin==true)
                    this.match=true;
            })
        },
        components: {
            headerBar
        },
        methods:{
            onEdit: function(){
                this.$router.push("/boards/"+this.boardName+"/manage_notice/"+this.postNum);
            },
            onClear: function(){
                this.$router.push("/boards/"+this.boardName);
            },
            onDelete: function(){
                this.recovery['kind']='board'
                
                this.$http.post("http://localhost:8000/recovery",this.recovery).then(()=>{    
                    this.$http.post("http://localhost:8000/boards/"+this.boardName+"/delete",{"postNum":this.postNum}).then((data)=>{
                        this.$router.push("/boards/"+this.boardName);
                    })
                })
            },
            onCmtSubmit: function(){
                this.$http.post("http://localhost:8000/boards/"+this.boardName+"/"+this.postNum+"/cmtCreate",[{"postNum":this.postNum,
                "cmtContent":this.cmtContent,"author":this.userName,"circleName":"Home", "postType":this.boardName}]).then((data)=>{
                    this.$http.get("http://localhost:8000/boards/"+this.boardName+"/"+this.postNum+"/cmtLoad").then((result)=>{
                        this.cmts = result.data;
                        this.cmtContent = '';
                    })
                })
            },
            onCmtDelete: function(){
                console.log(this.date)
                this.$http.post("http://localhost:8000/boards/"+this.boardName+"/"+this.postNum+"/cmtDelete/"+this._id).then((data)=>{
                    this.$http.get("http://localhost:8000/boards/"+this.boardName+"/"+this.postNum+"/cmtLoad").then((result)=>{
                        this.cmts = result.data;
                        this.cmtContent = '';
                    })
                })
            },
            setIsCmtChanging: function(){
                this.isCmtChanging = this._id;
            },
            onCmtChange: function(){
                console.log(this.cmtContent)
                this.isCmtChanging = '';
                this.$http.post("http://localhost:8000/boards/"+this.boardName+"/"+this.postNum+"/cmtChange/"+this._id,
                {"cmtContent":this.cmtContent}).then((data)=>{
                    this.$http.get("http://localhost:8000/boards/"+this.boardName+"/"+this.postNum+"/cmtLoad").then((result)=>{
                        this.cmts = result.data;
                        this.cmtContent = '';
                    })
                })
            },
            cmtChangeCancel: function(){
                this.isCmtChanging = '';
                this.$http.get("http://localhost:8000/boards/"+this.boardName+"/"+this.postNum+"/cmtLoad").then((result)=>{
                    this.cmts = result.data;
                    this.cmtContent = '';
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
.container {
   align-items : center;
   margin-top : 50px; 
}
.textarea {
    margin-top: 10px;
    margin-bottom: -30px;
}
.button {
    margin-bottom: 0px;
}
</style>