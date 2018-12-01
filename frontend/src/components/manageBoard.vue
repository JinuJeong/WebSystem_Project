<template>
    <div class="notice">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>
        <v-container
        align-center style="padding : 5%">
        <div>
        <v-form ref="form">
            <v-text-field
            v-model="title"
            label="Title"
            required
            ></v-text-field>
                 
            <v-textarea
            box
            v-model="contents"
            label="내용"
            placeholder="Type.."
            height="500"
            required
            ></v-textarea>
            
            <v-btn v-if="match==true"
            @click="onModify"
            >
            modify
            </v-btn>
            <v-btn v-if="match==false"
            @click="onSubmit"
            >
            Submit
            </v-btn>
           <v-btn @click="onClear">close</v-btn>
           <v-btn v-if="match==true" @click="onDelete">delete</v-btn>
        </v-form>
        </div>

        </v-container>

    </div>
</template>

<script>
    import headerBar from './header.vue'

    export default {
        name: 'notice',
        data(){
            return{
                postTitle: this.$route.params.postTitle,
                postDate: this.$route.params.postDate,
                postContent: "",
                match: false,
                boardName: this.$route.params.boardName,
                userName: this.$session.getAll().username,
            }
        },
        created: function(){
            if(this.postTitle!=undefined){
                console.log(this.postDate)
                this.$http.get("http://localhost:8000/boards/"+this.boardName+"/"
                +this.postTitle+"/"+this.postDate).then((data)=>{
                    this.postContent=data.data.postContent
                    console.log(this.postContent)
                    if(this.userName==data.data.postWriter) this.match=true;
                })
            }
        },
        components: {
            headerBar
        },
        methods:{
            onModify: function(){       
                this.$http.post("http://localhost:8000/boards/"+this.boardName+"/update",{"postTitle":this.postTitle,
                "postContent":this.postContent,"postDate":this.postDate}).then((data)=>{
                    this.$router.push("/boards/"+this.boardName);
                })
            },
            onClear: function(){
                this.$router.push("/boards/"+this.boardName);
            },
            onDelete: function(){
                this.$http.post("http://localhost:8000/boards/"+this.boardName+"/delete",{"postTitle":this.postTitle,
                "postContent":this.postContent,"postWriter":this.userName}).then((data)=>{
                    this.$router.push("/boards/"+this.boardName);
                })
            },
            onSubmit: function(){
                this.$http.post("http://localhost:8000/boards/"+this.boardName+"/create",{"postTitle":this.title,
                "postContent":this.contents,"postWriter":this.userName}).then((data)=>{
                    this.$router.push("/boards/"+this.boardName);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .centered-container {

        display : flex;
        align-items: center;
        justify-content: center;
        position: relative;
        height: 120vh;

        .md-content {
            z-index: 0;
            padding: 150px;
            width: 100%;
            height : 200%;
            max-width: 1000px;
            max-height : 1000px;
            position: relative;

            .actions {
                margin-top : 100px;
            }
        }
    }
    .guest{
        font-size: 30px;
    }
</style>