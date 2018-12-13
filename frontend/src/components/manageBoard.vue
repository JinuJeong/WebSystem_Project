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
            
                <v-btn v-if="match==true" @click="onModify">modify</v-btn>
                <v-btn v-if="match==false" @click="onSubmit">Submit</v-btn>
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
                postNum: this.$route.params.postNum,
                title: "",
                contents: "",
                match: false,
                postType: this.$route.params.postType,
                userName: this.$session.getAll().username,
            }
        },
        created: function(){
            if(this.title!=undefined){
                console.log(this.postDate)
                this.$http.get("http://adong.cf:8000/boards/"+this.postType+"/"+this.postNum).then((result)=>{
                    this.title=result.data.title
                    this.contents=result.data.contents
                    console.log(result.data.author)
                    if(this.userName==result.data.author) this.match=true;
                })
            }
        },
        components: {
            headerBar
        },
        methods:{
            onModify: function(){       
                this.$http.post("http://adong.cf:8000/boards/"+this.postType+"/"+this.postNum+"/update",{"title":this.title,
                "contents":this.contents,"date":this.date}).then((data)=>{
                    this.$router.push("/boards/"+this.postType);
                })
            },
            onClear: function(){
                history.back()
            },
            onDelete: function(){
            
                this.$http.post("http://adong.cf:8000/boards/"+this.postType+"/delete",{"title":this.title,
                "contents":this.contents,"author":this.userName}).then((data)=>{
                    this.$router.push("/boards/"+this.postType);
                })
            },
            onSubmit: function(){
                this.$http.post("http://adong.cf:8000/boards/"+this.postType+"/create",{"title":this.title,
                "contents":this.contents,"author":this.userName,"circleName":"Home", "postType":this.postType}).then((data)=>{
                    this.$router.push("/boards/"+this.postType);
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
