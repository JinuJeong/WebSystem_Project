<template>
    <div>
            <header-bar></header-bar>
            <v-container
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
        name: 'showBoard',
        data(){
            return{
                title: this.$route.params.title,
                date: this.$route.params.date,
                contents: "",
                match: false,
                boardName: this.$route.params.boardName,
                userName: this.$session.getAll().username,
            }
        },
        created: function(){
            console.log(this.date)
            this.$http.get("http://localhost:8000/boards/"+this.boardName+"/"+this.title+"/"+this.date).then((result)=>{
                this.contents=result.data.postContent
                console.log(this.contents)
                if(this.userName==result.data.postWriter) this.match=true;
            })
        },
        components: {
            headerBar
        },
        methods:{
            onEdit: function(){
                this.$router.push("/boards/"+this.boardName+"/manage_notice/"+this.title+"/"+this.date);
            },
            onClear: function(){
                this.$router.push("/boards/"+this.boardName);
            },
            onDelete: function(){
                this.$http.post("http://localhost:8000/boards/"+this.boardName+"/delete",{"title":this.title,
                "contents":this.contents,"author":this.userName}).then((data)=>{
                    this.$router.push("/boards/"+this.boardName);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>