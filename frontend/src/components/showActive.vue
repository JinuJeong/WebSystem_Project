<template>
    <div>
            <header-bar></header-bar><br/>
            <v-container class="mt-5"
            align-center>
            <h1 class="text-md-center">{{circleName}} {{title}}</h1>
            <v-list>
                
             <v-divider></v-divider>
            <v-img :src="image" class="ma-5" aspect-ratio="3" contain></v-img>
            <v-subheader>CONTENTS</v-subheader>
            <v-list-tile>
            <v-list-tile-content>
                <p>{{contents}}</p>
            </v-list-tile-content>
            </v-list-tile>
            <v-subheader>Date</v-subheader>
            <v-list-tile>
            <v-list-tile-content>
                <p>{{date}}</p>
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
        
        </v-container>
    </div>
</template>
<script>
    import headerBar from './header.vue'

    export default {
        name: 'notice',
        data(){
            return{
                circleName: this.$route.params.circleName,
                contents: "",
                title:"",
                date:"",
                activeId: this.$route.params.activeId,
                userName:this.$session.getAll().username,
                match: Boolean,
                image: "",
            }
        },
        created: function(){
                    
                    this.$http.get("http://localhost:8000/circle/"+this.circleName+"/active/"+this.activeId).then((data)=>{
                        console.log(data.data)
                        let info=data.data
                        this.title=info.title
                        this.date = info.start.substr(0,10)+" ~ "+info.end.substr(0,10)
                        this.contents=info.contents
                        this.image = info.image
                        if(this.userName==data.data.author) this.match=true;
                    })
            }
        ,
        components: {
            headerBar
        },
        methods:{
            onEdit: function(){
                this.$router.push("/circle/"+this.circleName+"/manage_active/update/"+this.activeId);
            },
            onClear: function(){
                this.$router.push("/circle/"+this.circleName);
            },
            onDelete: function(){
                this.$http.post("http://localhost:8000/circle/"+this.circleName+"/active/delete/"+this.activeId).then((data)=>{
                    this.$router.push("/circle/"+this.circleName);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>