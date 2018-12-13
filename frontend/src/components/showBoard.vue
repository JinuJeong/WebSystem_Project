    <template>
    <div>
        <header-bar/>
        <v-container class="container">
        <div>
            <v-list>
                <v-subheader>TITLE</v-subheader>
                <v-list-tile>
                    <v-list-tile-content>
                        <p>{{title}}</p>
                    </v-list-tile-content>
                </v-list-tile>
                <v-divider/>
                <v-subheader>CONTENTS</v-subheader>
                <v-list-tile>
                    <v-list-tile-content>
                        <p id="content">{{contents}}</p>
                    </v-list-tile-content>
                </v-list-tile>
                <v-btn v-if="match==true" @click="onEdit">Edit</v-btn>
                <v-btn @click="onClear">close</v-btn>
                <v-btn v-if="match==true" @click="onDelete">delete</v-btn>    
            </v-list>
            <v-divider/>
            <div v-for="cmt in cmts" v-bind:key="cmt._id">
                <div v-if="isCmtChanging!=cmt._id">
                    <v-textarea
                        readonly
                        auto-grow
                        box
                        :label="cmt.author"
                        v-model="cmt.cmtContent"
                        class="textarea"
                        rows="1"
                    />
                    <v-btn v-if="match==true" flat small color="inherit" class="button" @click="_id=cmt._id; setIsCmtChanging();">댓글 수정</v-btn>
                    <v-dialog
                        v-model="dialog"
                        width="500"
                    >
                    <v-btn v-if="match==true" flat small slot="activator" color="inherit" class="button" @click="_id=cmt._id;">댓글 삭제</v-btn>
                    <v-card>
                        <v-card-title
                            class="headline blue lighten-2"
                            primary-title
                        >
                        댓글 삭제
                        </v-card-title>

                        <v-card-text>
                        정말로 삭제하시겠습니까?
                        </v-card-text>

                        <v-divider/>

                        <v-card-actions>
                        <v-spacer/>
                        <v-btn color="primary" flat @click="dialog = false;">취소</v-btn>
                        <v-btn color="primary" flat @click="dialog = false; onCmtDelete();">삭제</v-btn>
                        </v-card-actions>
                    </v-card>
                    </v-dialog>
                    
                </div>
                <div v-else>
                    <v-textarea
                        auto-grow
                        box
                        :label="cmt.author"
                        v-model="cmt.cmtContent"
                        color="blue"
                        class="textarea"
                        rows="1"
                    />
                    <v-btn flat small color="inherit" class="button" @click="_id=cmt._id; cmtContent=cmt.cmtContent; onCmtChange();">수정 완료</v-btn>
                    <v-btn flat small color="inherit" class="button" @click="_id=cmt._id; cmtChangeCancel();">취소</v-btn>
                </div>
            </div>
            <v-textarea
                outline
                auto-grow
                v-model="cmtContent"
                color="blue"
                class="textarea"
                rows="1"
                placeholder="새 댓글 작성"
            />
            <v-btn flat small color="inherit" :disabled="cmtContent==''" @click="onCmtSubmit">댓글 작성</v-btn>      
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
                title: "",
                contents: "",
                match: false,
                cmtMatch: false,
                cmtContent: "",
                postType: this.$route.params.postType,
                userName: this.$session.getAll().username,
                recovery: "",
                cmts: [],
                _id: "",
                isCmtChanging: "",
                dialog: false
            }
        },
        created: function(){
            console.log(this.date)
            this.$http.get("http://adong.cf:8000/boards/"+this.postType+"/"+this.postNum).then((result)=>{
                this.title = result.data.title
                this.contents = result.data.contents
                this.cmts = result.data.comment
                console.log(this.contents)
                this.recovery=result.data
                if(this.$session.getAll().admin==true) this.match=true;
            })
        },
        components: {
            headerBar
        },
        methods:{
            onEdit: function(){
                this.$router.push("/boards/"+this.postType+"/manage_notice/"+this.postNum);
            },
            onClear: function(){
                this.$router.push("/boards/"+this.postType);
            },
            onDelete: function(){
                this.recovery['kind']='board'
                
                this.$http.post("http://adong.cf:8000/recovery",this.recovery).then(()=>{    
                    this.$http.post("http://adong.cf:8000/boards/"+this.postType+"/delete",{"postNum":this.postNum}).then((data)=>{
                        this.$router.push("/boards/"+this.postType);
                    })
                })
            },
            onCmtSubmit: function(){
                this.$http.post("http://adong.cf:8000/boards/"+this.postType+"/"+this.postNum+"/cmtCreate",[{"postNum":this.postNum,
                "cmtContent":this.cmtContent,"author":this.userName,"circleName":"Home", "postType":this.postType}]).then((data)=>{
                    this.$http.get("http://adong.cf:8000/boards/"+this.postType+"/"+this.postNum+"/cmtLoad").then((result)=>{
                        this.cmts = result.data;
                        this.cmtContent = '';
                    })
                })
            },
            onCmtDelete: function(){
                console.log(this.date)
                this.$http.post("http://adong.cf:8000/boards/"+this.postType+"/"+this.postNum+"/cmtDelete/"+this._id).then((data)=>{
                    this.$http.get("http://adong.cf:8000/boards/"+this.postType+"/"+this.postNum+"/cmtLoad").then((result)=>{
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
                this.$http.post("http://adong.cf:8000/boards/"+this.postType+"/"+this.postNum+"/cmtChange/"+this._id,
                {"cmtContent":this.cmtContent}).then((data)=>{
                    this.$http.get("http://adong.cf:8000/boards/"+this.postType+"/"+this.postNum+"/cmtLoad").then((result)=>{
                        this.cmts = result.data;
                        this.cmtContent = '';
                    })
                })
            },
            cmtChangeCancel: function(){
                this.isCmtChanging = '';
                this.$http.get("http://adong.cf:8000/boards/"+this.postType+"/"+this.postNum+"/cmtLoad").then((result)=>{
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
