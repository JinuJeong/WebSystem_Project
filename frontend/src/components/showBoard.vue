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
            <div v-for="cmt in cmts" v-bind:key="cmt.id">
                <v-textarea
                    readonly
                    auto-grow
                    box
                    :label="cmt.author"
                    v-model="cmt.cmtContent"
                    class="textarea"
                    rows="1"
                />
            </div>
            <v-textarea
                outline
                auto-grow
                v-model="cmtContent"
                counter="10"
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
                boardName: this.$route.params.boardName,
                userName: this.$session.getAll().username,
                recovery: "",
                cmts: []
            }
        },
        created: function(){
            console.log(this.date)
            this.$http.get("http://localhost:8000/boards/"+this.boardName+"/"+this.postNum).then((result)=>{
                this.title = result.data.title
                this.contents = result.data.contents
                this.cmts = result.data.comment
                console.log(this.contents)
                this.recovery=result.data
                if(this.userName==result.data.author) this.match=true;
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
                this.$http.post("http://localhost:8000/recovery",this.recovery).then(()=>{    
                    this.$http.post("http://localhost:8000/boards/"+this.boardName+"/delete",{"title":this.title,
                    "contents":this.contents,"author":this.userName}).then((data)=>{
                        this.$router.push("/boards/"+this.boardName);
                    })
                })
            },
            onCmtSubmit: function(){
                this.$http.post("http://localhost:8000/boards/"+this.boardName+"/"+this.postNum+"/cmtCreate",[{"postNum":this.postNum,
                "cmtContent":this.cmtContent,"author":this.userName,"circleName":"Home", "postType":this.boardName}]).then((data)=>{
                    this.$http.get("http://localhost:8000/boards/"+this.boardName+"/"+this.postNum+"/cmtLoad",).then((result)=>{
                        this.cmts = result.data;
                        this.cmtContent = '';
                    })
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
</style>