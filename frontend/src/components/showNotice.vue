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
        name: 'notice',
        data(){
            return{
                title: this.$route.params.title,
                date: this.$route.params.date,
                contents: "",
                match: false,
                circleName: this.$route.params.circleName,
                userName: this.$session.getAll().username,
                kind: this.$route.params.kind,
            }
        },
        created: function(){
                    console.log(this.date)
                    this.$http.get("http://localhost:8000/circle/"+this.circleName+"/board/"+this.kind+"/"
                    +this.title+"/"+this.date).then((data)=>{
                        this.contents=data.data.contents
                        console.log(this.contents)
                        if(this.userName==data.data.author) this.match=true;
                    })
            }
        ,
        components: {
            headerBar
        },
        methods:{
            onEdit: function(){
                this.$router.push("/circle/"+this.circleName+"/board/"+this.kind+"/manage_notice/"+this.title+"/"+this.date);
            },
            onClear: function(){
                this.$router.push("/circle/"+this.circleName);
            },
            onDelete: function(){
                this.$http.post("http://localhost:8000/circle/"+this.circleName+"/board/"+this.kind+"/delete",{"title":this.title,
                "contents":this.contents,"author":this.userName}).then((data)=>{
                    this.$router.push("/circle/"+this.circleName);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>