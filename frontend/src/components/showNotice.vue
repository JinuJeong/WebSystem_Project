<template>
    <div>
            <header-bar></header-bar>
            <v-container class="mt-5"
            align-center>
            <div>
                <v-list>
            <v-subheader>TITLE</v-subheader>
            <v-list-tile>
            <v-list-tile-content>
              <p>{{title}}</p>
            </v-list-tile-content>
            </v-list-tile>
             <v-divider></v-divider>
            <v-subheader>CONTENTS</v-subheader>
            <v-list-tile>
            <v-list-tile-content>
                <p>{{contents}}</p>
            </v-list-tile-content>
            </v-list-tile>
            
            </v-list>
           <v-btn v-if="match==true"
            @click="onEdit"
            >
            Edit
            </v-btn>
            
           <v-btn @click="onClear">close</v-btn>
           <v-btn v-if="match==true" @click="onDelete">delete</v-btn>
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
                date: "",
                contents: "",
                match: false,
                circleName: this.$route.params.circleName,
                userName: this.$session.getAll().username,
                postType: this.$route.params.postType,
                postNum: this.$route.params.postNum,
                recovery : "",
            }
        },
        created: function(){
                    this.$http.get("http://localhost:8000/circle/"+this.circleName+"/board/"+this.postType+"/"
                    +this.postNum).then((data)=>{
                        this.contents=data.data.contents
                        this.title=data.data.title
                        this.recovery=data.data

                        if(this.$session.getAll().president ==this.circleName || this.$session.getAll().admin==true) this.match=true;
                        console.log(this.match)
                    })
            }
        ,
        components: {
            headerBar
        },
        methods:{
            onEdit: function(){
                this.$router.push("/circle/"+this.circleName+"/board/"+this.postType+"/manage_notice/"+this.postNum);
            },
            onClear: function(){
                history.back()
            },
            onDelete: function(){
                this.$http.post("http://localhost:8000/recovery",this.recovery).then(()=>{
                    this.$http.post("http://localhost:8000/circle/"+this.circleName+"/board/"+this.postType+"/"+this.postNum+"/delete").then((data)=>{
                    this.$router.push("/circle/"+this.circleName);
                })
                })
                
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>