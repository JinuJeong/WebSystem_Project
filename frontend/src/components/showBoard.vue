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
            <v-textarea
                outline
                auto-grow
                v-model="cmtContent"
                class="textarea"
                rows="1"
                label="새 댓글 작성"
            />
            <v-btn flat small color="inherit" v-if="cmtMatch==false" @click="onCmtSubmit">댓글 작성</v-btn>
            <v-btn flat small color="inherit" v-if="cmtMatch==true" @click="onCmtSubmit">댓글 수정</v-btn>
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
            }
        },
        created: function(){
            console.log(this.date)
            this.$http.get("http://localhost:8000/boards/"+this.boardName+"/"+this.postNum).then((result)=>{
                this.title = result.data.title
                this.contents = result.data.contents
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
                    //this.$router.push("/boards/"+this.boardName);
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
    margin-top: 20px;
    margin-bottom: -30px;
}
</style>