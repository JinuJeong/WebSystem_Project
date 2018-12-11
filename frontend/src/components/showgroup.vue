<template>
    <div>
            <header-bar></header-bar>
            <v-container class="mt-5"
            align-center>
            <h1 class="text-md-center">{{circleName}} {{title}}</h1>
            <v-list>
                <v-layout row wrap>
                    <v-flex xs3 v-for="(item, index) in datalist" :key="index">
                        <v-subheader>{{titlelist[index]}}</v-subheader>
                        <v-list-tile>
                        <v-list-tile-content>
                        <p>{{item}}</p>
                        </v-list-tile-content>
                        </v-list-tile>
                    </v-flex>

                </v-layout>
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
                match: false,
                groupId: this.$route.params.groupId,
                titlelist: ["제목","제한수","시작","종료","동아리 이름","활동 분야","주최자","참여 수","최대 인원 수"],
                datalist: []
            }
        },
        created: function(){
                    
                    this.$http.get("http://localhost:8000/circle/"+this.circleName+"/group/"+this.groupId).then((data)=>{
                        let info=data.data
                        this.title=info.title
                        this.datalist=[info.title,info.maxNumber,info.start.substr(0,10),info.end.substr(0,10),info.circleName,info.groupType,
                        info.teacher.name,info.memberNumber,info.maxNumber]
                        this.contents=info.contents
                       
                        if(this.userName==data.data.author&&this.userName!=undefined) this.match=true;
                    })
            }
        ,
        components: {
            headerBar
        },
        methods:{
            onEdit: function(){
                this.$router.push("/circle/"+this.circleName+"/manage_group/update/"+this.groupId);
            },
            onClear: function(){
                this.$router.push("/circle/"+this.circleName);
            },
            onDelete: function(){
                this.$http.post("http://localhost:8000/circle/"+this.circleName+"/group/delete/"+this.groupId).then((data)=>{
                    this.$router.push("/circle/"+this.circleName);
                })
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>