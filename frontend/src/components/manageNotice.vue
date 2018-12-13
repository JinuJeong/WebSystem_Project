<template>
    <div class="notice">
        <!--항상 상단에 떠있는 bar-->
        <header-bar></header-bar>
        <v-container class="container">
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
                title: "",
                contents: "",
                match: false,
                circleName: this.$route.params.circleName,
                userName: this.$session.getAll().username,
                postType: this.$route.params.postType,
                postNum: this.$route.params.postNum,
            }
        },
        created: function(){
                if(this.postNum!=undefined){
                    
                    this.$http.get("http://adong.cf:8000/circle/"+this.circleName+"/board/"+this.postType+"/"
                    +this.postNum).then((data)=>{
                        this.title=data.data.title;
                        this.contents=data.data.contents
                        if(this.userName==data.data.author) this.match=true;
                    })
                }
            }
        ,
        components: {
            headerBar
        },
        methods:{
            onModify: function(){
                
                this.$http.post("http://adong.cf:8000/circle/"+this.circleName+"/board/"+this.postType+"/"+this.postNum+"/update",{"title":this.title,
                "contents":this.contents,"date":this.date}).then((data)=>{
                    console.log(this.title)
                    this.$router.push("/circle/"+this.circleName);
                })
            },
            onClear: function(){
                history.back()
            },
            onSubmit: function(){
                if(this.userName==undefined){
                    alert("로그인이 필요합니다")
                    return;
                }
                this.$http.post("http://adong.cf:8000/circle/"+this.circleName+"/board/"+this.postType+"/create",{"title":this.title,
                    "contents":this.contents,"author":this.userName}).then((data)=>{
                        alert("게시글이 업로드 됐습니다.")
                        this.$router.push("/circle/"+this.circleName);
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .container{
        margin-top: 100px
    }
</style>
